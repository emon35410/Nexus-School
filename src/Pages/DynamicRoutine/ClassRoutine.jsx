// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import NexusLoader from '../../components/Nexusloader/Nexusloader';
// import useAuth from '../../Hooks/useAuth';

// const ClassRoutine = () => {
//   const axiosSecure = useAxiosSecure();
//   const {user}=useAuth()
//   const { data: studentData = [], } = useQuery({
//       queryKey: ['students'],
//       queryFn: async () => {
//         const res = await axiosSecure.get(`/student`);
//         return res.data.result;
//       }
//   });

//   const findSingleStudent = studentData.find(s => s?.email === user?.email);

//   const { data:routine=[], isLoading } = useQuery({
//     queryKey: ['routine',findSingleStudent?.department],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/routine?className=${findSingleStudent?.department}`,
//       );
//       return res.data;
//     },
//   });

//   const days = [
//     'Saturday',
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//   ];
//   const periods = [1, 2, 3];
//     const getClass = (day, period) => {
//       const item = routine.find(r => r.day == day && r.period == period);

//       if (!item) {
//         return ''
//       }
//       if (item) {
//         return (
//           <div>
//             <div>
//               <p className="font-semibold">{item.subject}</p>
//               <p className="text-xs text-gray-500">{item.teacherName}</p>
//             </div>
//             <div>
//               <span>
//                 Time :
//                 {new Date(item.time).toLocaleString()}
//               </span>
//             </div>
//           </div>
//         );
//       }
//   };

//     const handleDownload = () => {
//       window.print();
//     };

//  if (isLoading) {
//     return <NexusLoader></NexusLoader>;
//   }
//   return (
//     <div className=" w-full bg-black  p-2 rounded-2xl">
//       <div className="p-2 w-full   rounded-xl shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Class Routine</h2>

//           <button
//             onClick={handleDownload}
//             className=" text-white btn btn-info hover:bg-blue-700"
//           >
//             Download
//           </button>
//         </div>

//         <div className="overflow-x-auto  rounded-box border ">
//           <table className="  text-center table ">
//             <thead className="">
//               <tr>
//                 <th className="border p-2 text-white">Day</th>
//                 {periods.map(p => (
//                   <th key={p} className="border p-2 text-white">
//                     Period {p}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {days.map(day => (
//                 <tr key={day} className="hover:bg-blue-400">
//                   <td className="border p-2 font-semibold">{day}</td>

//                   {periods.map(period => (
//                     <td key={period} className="border p-3">
//                       {getClass(day, period)}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassRoutine;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import useAuth from '../../Hooks/useAuth';
import {
  HiOutlineDownload,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineBookOpen,
} from 'react-icons/hi';

const ClassRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: studentData = [] } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student`);
      return res.data.result;
    },
  });

  const findSingleStudent = studentData.find(s => s?.email === user?.email);

  const { data: routine = [], isLoading } = useQuery({
    queryKey: ['routine', findSingleStudent?.department],
    enabled: !!findSingleStudent?.department,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/routine?className=${findSingleStudent?.department}`,
      );
      return res.data;
    },
  });

  const days = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  const periods = [1, 2, 3];

  const getClass = (day, period) => {
    const item = routine.find(r => r.day === day && r.period == period);

    if (!item)
      return (
        <div className="h-full min-h-[80px] flex items-center justify-center border border-dashed border-slate-800 rounded-2xl opacity-20">
          <span className="text-xs">No Class</span>
        </div>
      );

    return (
      <div className="h-full p-4 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group shadow-lg">
        <div className="flex flex-col h-full justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiOutlineBookOpen className="text-blue-500 text-sm" />
              <p className="text-blue-100 font-bold text-sm md:text-base tracking-tight leading-tight uppercase">
                {item.subject}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <HiOutlineUser className="text-[10px]" />
              <p className="text-[11px] md:text-xs font-medium italic">
                {item.teacherName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 py-1.5 px-3 bg-blue-500/10 rounded-xl border border-blue-500/20 w-fit">
            <HiOutlineClock className="text-blue-400 text-xs" />
            <span className="text-blue-300 text-[10px] font-bold font-mono">
              {item.time}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const handleDownload = () => {
    window.print();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950">
        <NexusLoader />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 print:hidden">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              CLASS{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                ROUTINE
              </span>
            </h2>
            <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="h-1 w-8 bg-blue-600 rounded-full"></span>
              <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">
                {findSingleStudent?.department || 'Academic'} Department
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="group cursor-pointer relative flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-black text-sm uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <HiOutlineDownload className="text-lg transition-transform group-hover:-translate-y-1" />
            Download PDF
          </button>
        </div>

        {/* Main Grid Container */}
        <div className="bg-slate-900/20 rounded-[2rem] border border-slate-800/60 p-2 md:p-6 backdrop-blur-3xl">
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <table className="w-full border-separate border-spacing-3">
              <thead>
                <tr>
                  <th className="p-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-left">
                    Timeline
                  </th>
                  {periods.map(p => (
                    <th key={p} className="p-4 min-w-[220px]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs">
                          0{p}
                        </span>
                        <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">
                          Period
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="group">
                    <td className="sticky left-0 z-10">
                      <div className="w-24 md:w-32 py-8 px-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl transition-all group-hover:border-blue-500/50 group-hover:bg-slate-800">
                        <span className="text-slate-200 font-black text-xs md:text-sm rotate-0 uppercase tracking-widest">
                          {day}
                        </span>
                      </div>
                    </td>

                    {periods.map(period => (
                      <td key={period} className="min-w-[240px]">
                        {getClass(day, period)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print Styling Utilities */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; color: black !important; padding: 0 !important; }
          .max-w-7xl { max-width: 100% !important; }
          table { border-spacing: 5px !important; }
          .bg-slate-900, .bg-slate-800, .bg-slate-900\\/20 { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; }
          .text-white, .text-blue-100, .text-blue-400, .text-slate-200 { color: #0f172a !important; }
          .rounded-3xl, .rounded-2xl { border-radius: 8px !important; }
          .shadow-lg, .shadow-xl { box-shadow: none !important; }
        }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

export default ClassRoutine;