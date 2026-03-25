// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';

// import StudentCard from './StudentCard';
// import NexusLoader from '../../components/Nexusloader/Nexusloader';
// import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

// const ManageStudents = () => {
//   const axiosSecure = useAxiosSecure();
//   const [isDepartment, setIsDepartment] = useState('');
//   // const [isAllStudent, setIsAllStudent] = useState(0);
//   const [isAllPage, setIsAllPage] = useState(0);
//   const [currentPage,setCurrentPage]=useState(0)
//   const limit = 8;
//   const { data: studentData =[], isLoading } = useQuery({
//     queryKey: ['all-students',isDepartment,limit,currentPage],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/student?department=${isDepartment}&limit=${limit}&skip=${currentPage * limit}`);
//       const totalStudent = res.data.allStudent / limit
//       setIsAllPage(Math.ceil(totalStudent));
//       return res.data.result;
//     }
//   });

//   if (isLoading) {
//    return <NexusLoader></NexusLoader>
//  }
//   return (
//     <div>
//       <div>
//         {/* title and subtitle */}
//         <div className=" text-center mb-8 space-y-2 ">
//           <h1 className=" text-2xl font-bold">Today’s Feedback</h1>
//           <p>Teachers can provide one feedback per subject each day</p>
//         </div>
//         {/* select with class */}
//         <div className="md:max-w-[350px] w-full mb-3">
//           <select
//             name="department"
//             value={isDepartment}
//             onChange={e => setIsDepartment(e.target.value)}
//             className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all"
//           >
//             <option value="">Not Set</option>
//             <option value="class-6">Class 6</option>
//             <option value="class-7">Class 7</option>
//             <option value="class-8">Class 8</option>
//             <option value="class-9">Class 9</option>
//             <option value="class-10">Class 10</option>
//           </select>
//         </div>
//         {/* select with subject */}
//       </div>
//       <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

//           <StudentCard

//             studentData={studentData}
//           ></StudentCard>

//       </div>

//       <div className=" text-center my-4 space-x-2">
//         {currentPage === 0 || (
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             className=" btn btn-xs"
//           >
//             <SlArrowLeft />
//           </button>
//         )}

//         {Array(isAllPage)
//           .keys()
//           .map(i => (
//             <button
//               onClick={() => setCurrentPage(i)}
//               className={`btn  btn-xs  ${currentPage === i && 'btn-info text-white'}`}
//             >
//               {i + 1}
//             </button>
//           ))}

//         {currentPage < isAllPage - 1 && (
//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             className="btn btn-xs"
//           >
//             <SlArrowRight />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageStudents;
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import StudentCard from './StudentCard';

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineUsers,
} from 'react-icons/hi2';
import SecendLoader from '../../components/Nexusloader/SecendLoader';

const ManageStudents = () => {
  const axiosSecure = useAxiosSecure();
  const [isDepartment, setIsDepartment] = useState('');
  const [isAllPage, setIsAllPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 8;

  const { data: studentData = [], isLoading } = useQuery({
    queryKey: ['all-students', isDepartment, limit, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/student?department=${isDepartment}&limit=${limit}&skip=${currentPage * limit}`,
      );
      const totalStudent = (res?.data?.allStudent || 0) / limit;
      setIsAllPage(Math.ceil(totalStudent) || 1);
      return res.data.result;
    },
  });

  if (isLoading) {
    return <SecendLoader></SecendLoader>;
  }

  return (
    <div className="min-h-screen bg-[#020617]  from-blue-900/20 via-slate-950 to-black p-4 md:p-10 text-slate-200 rounded-xl">
      {/* --- Unique Decorative Background Element --- */}
      <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-blue-600/10 blur-[120px] rounded-full" />

      {/* --- Header Section --- */}
      <header className="relative mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-800/50 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-blue-400">
              <HiOutlineUsers size={28} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              Student <span className="text-blue-500">Nexus</span>
            </h1>
          </div>
          <p className="text-slate-400 font-medium max-w-lg italic">
            "Empowering educators with real-time feedback loops and departmental
            insights."
          </p>
        </div>

        {/* --- Unique Filter Box --- */}
        <div className="relative w-full max-w-sm group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex items-center bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden">
            <span className="pl-4 text-blue-400">
              <HiOutlineAdjustmentsHorizontal size={20} />
            </span>
            <select
              name="department"
              value={isDepartment}
              onChange={e => {
                setIsDepartment(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full bg-transparent p-4 text-white outline-none text-sm font-semibold cursor-pointer"
            >
              <option className="bg-slate-900" value="">
                All Academic Departments
              </option>
              <option className="bg-slate-900" value="class-6">
                Standard VI (Class 6)
              </option>
              <option className="bg-slate-900" value="class-7">
                Standard VII (Class 7)
              </option>
              <option className="bg-slate-900" value="class-8">
                Standard VIII (Class 8)
              </option>
              <option className="bg-slate-900" value="class-9">
                Standard IX (Class 9)
              </option>
              <option className="bg-slate-900" value="class-10">
                Standard X (Class 10)
              </option>
            </select>
          </div>
        </div>
      </header>

      {/* --- Student Grid / Dummy Content --- */}
      <main className="relative">
        {studentData.length > 0 ? (
          <div className="">
            <StudentCard studentData={studentData} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 rounded-[2rem] bg-slate-900/30 border border-slate-800 backdrop-blur-sm">
            <div className="w-20 h-20 mb-6 rounded-full bg-slate-800 animate-pulse flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-300">
              No Student Records Found
            </h3>
            <p className="text-slate-500 mt-2">
              Try adjusting your filters or checking back later.
            </p>
          </div>
        )}
      </main>

      {/* --- Futuristic Pagination --- */}
      {isAllPage > 0 && (
        <footer className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center p-1.5 bg-slate-900/50 rounded-full border border-slate-800 shadow-2xl backdrop-blur-md">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-3 rounded-full transition-all disabled:opacity-20 hover:bg-blue-600 hover:text-white text-blue-400"
            >
              <SlArrowLeft size={20} />
            </button>

            <div className="hidden md:flex items-center px-4 gap-2">
              {[...Array(isAllPage)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-full text-xs font-bold transition-all duration-300 ${
                    currentPage === i
                      ? 'bg-blue-600 text-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                      : 'hover:bg-slate-800 text-slate-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Mobile View Page Indicator */}
            <span className="md:hidden px-6 font-bold text-blue-500 text-sm">
              {currentPage + 1} / {isAllPage}
            </span>

            <button
              disabled={currentPage >= isAllPage - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-3 rounded-full transition-all disabled:opacity-20 hover:bg-blue-600 hover:text-white text-blue-400"
            >
              <SlArrowRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1 w-1 bg-blue-500 rounded-full animate-ping"></div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">
              System Live • Page {currentPage + 1}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ManageStudents;