// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';

// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import SeeResultTable from './SeeResultTable';

// const ResultSheet = () => {
//   const[className,setClassName]=useState('')
//   const[studentRoll,setStudentRoll]=useState('')
//   const[examOption,setExamOption]=useState('')
//   const [studentEmail, setStudentEmail] = useState('')
//   const axiosSecure=useAxiosSecure()
//   const { data: resultSheet } = useQuery({
//     queryKey: ['resultSheet', className, studentRoll, examOption, studentEmail],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/result?studentRoll=${studentRoll}&className=${className}&examOption=${examOption}&studentEmail=${studentEmail}`,
//       );
//       return res.data
//     }
//   })

//   console.log(resultSheet)

//   return (
//     <div>
//       <fieldset className=" fieldset">
//         {/* student class roll */}
//         <label className="label">Class Roll</label>
//         <input
//           type="number"
//           value={studentRoll}
//           onChange={e => setStudentRoll(e.target.value)}
//           className="input text-blue-600 w-full"
//           placeholder="input student class roll"
//         />
//         {/* student class Name */}
//         <label className="label">Class Name</label>
//         <select
//           className="select text-blue-600 w-full"
//           value={className}
//           onChange={e => setClassName(e.target.value)}
//         >
//           <option value={''}>Select Class</option>
//           <option value={'class-6'}>Class 6</option>
//           <option value={'class-7'}>Class 7</option>
//           <option value={'class-8'}>Class 8</option>
//           <option value={'class-9'}>Class 9</option>
//           <option value={'class-10'}>Class 10</option>
//         </select>
//         {/* student class Name */}
//         <label className="label ">Select Exam</label>
//         <select
//           className="select text-blue-600 w-full"
//           value={examOption}
//           onChange={e => setExamOption(e.target.value)}
//         >
//           <option value={''}>Select Exam Option</option>
//           <option value={'test-1'}>Test 1</option>
//           <option value={'test-2'}>Test 2</option>
//           <option value={'final'}>Final Exam</option>
//         </select>
//         {/* student Student Email */}
//         <label className="label">Student Email</label>
//         <input
//           type="email"
//           className="input text-blue-600 w-full"
//           placeholder="input student Email"
//           value={studentEmail}
//           onChange={e => setStudentEmail(e.target.value)}
//         />
//       </fieldset>

//       <div>
//         <SeeResultTable resultSheet={resultSheet}></SeeResultTable>
//       </div>
//     </div>
//   );
// };

// export default ResultSheet;

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SeeResultTable from './SeeResultTable';

const ResultSheet = () => {
  const [className, setClassName] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  const [examOption, setExamOption] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: resultSheet, isLoading } = useQuery({
    queryKey: ['resultSheet', className, studentRoll, examOption, studentEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/result?studentRoll=${studentRoll}&className=${className}&examOption=${examOption}&studentEmail=${studentEmail}`,
      );
      return res.data;
    },
  });
  
  console.log(resultSheet)
  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-200">
      {/* Search Header Section */}
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Student Result Sheet
          </h1>
          <p className="text-slate-400 mt-2">
            Filter and view individual student performance
          </p>
        </header>

        {/* Filter Panel */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 mb-8 shadow-xl shadow-blue-900/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Class Roll */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
                Class Roll
              </label>
              <input
                type="number"
                value={studentRoll}
                onChange={e => setStudentRoll(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                placeholder="Roll (e.g. 05)"
              />
            </div>

            {/* Class Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
                Class Name
              </label>
              <select
                className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
                value={className}
                onChange={e => setClassName(e.target.value)}
              >
                <option value={''}>Select Class</option>
                <option value={'class-6'}>Class 6</option>
                <option value={'class-7'}>Class 7</option>
                <option value={'class-8'}>Class 8</option>
                <option value={'class-9'}>Class 9</option>
                <option value={'class-10'}>Class 10</option>
              </select>
            </div>

            {/* Exam Option */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
                Exam Type
              </label>
              <select
                className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
                value={examOption}
                onChange={e => setExamOption(e.target.value)}
              >
                <option value={''}>Select Exam</option>
                <option value={'test-1'}>Test 1</option>
                <option value={'test-2'}>Test 2</option>
                <option value={'final'}>Final Exam</option>
              </select>
            </div>

            {/* Student Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-400 ml-1">
                Student Email
              </label>
              <input
                type="email"
                placeholder="student@school.com"
                value={studentEmail}
                onChange={e => setStudentEmail(e.target.value)}
                className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Results Content Area */}
        <div className="relative bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden min-h-[300px]">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-400 animate-pulse font-medium">
                Fetching Records...
              </p>
            </div>
          ) : resultSheet?.subjects?.length !== 0 ? (
            <div className="p-1">
              <SeeResultTable resultSheet={resultSheet} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="bg-slate-800 p-4 rounded-full mb-4">
                <svg
                  className="w-8 h-8 opacity-20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p>No results found. Adjust your filters to search again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultSheet;