// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import NexusLoader from '../../components/Nexusloader/Nexusloader';
// import useAuth from '../../Hooks/useAuth';
// import {
//   HiOutlineDownload,
//   HiOutlineClock,
//   HiOutlineUser,
//   HiOutlineBookOpen,
// } from 'react-icons/hi';

// const ClassRoutine = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: studentData = [] } = useQuery({
//     queryKey: ['students'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/student`);
//       return res.data.result;
//     },
//   });

//   const findSingleStudent = studentData.find(s => s?.email === user?.email);

//   const { data: routine = [], isLoading } = useQuery({
//     queryKey: ['routine', findSingleStudent?.department],
//     enabled: !!findSingleStudent?.department,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/routine?className=${findSingleStudent?.department}`,
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

//   const getClass = (day, period) => {
//     const item = routine.filter(r => r.day === day && r.period == period);

//     if (!item)
//       return (
//         <div >
//           <span >No Class</span>
//         </div>
//       );

//     return (
//       <div >
//         <div >
//           <div>
//             <div >
//               <HiOutlineBookOpen  />
//               <p >
//                 {item.subject}
//               </p>
//             </div>
//             <div >
//               <HiOutlineUser  />
//               <p >
//                 {item.teacherName}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 py-1.5 px-3 bg-blue-500/10 rounded-xl border border-blue-500/20 w-fit">
//             <HiOutlineClock className="text-blue-400 text-xs" />
//             <span className="text-blue-300 text-[10px] font-bold font-mono">
//               {item.time}
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleDownload = () => {
//     window.print();
//   };

//   if (isLoading)
//     return (
//       <div >
//         <NexusLoader />
//       </div>
//     );

//   return (
//     <div >
//       <div >
//         {/* Header Section */}
//         <div >
//           <div >
//             <h2 >
//               CLASS{' '}
//               <span >
//                 ROUTINE
//               </span>
//             </h2>
//             <div >
//               <span ></span>
//               <p >
//                 {findSingleStudent?.department || 'Academic'} Department
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={handleDownload}
//             className='btn'
//           >
//             <HiOutlineDownload className="text-lg transition-transform group-hover:-translate-y-1" />
//             Download PDF
//           </button>
//         </div>

//         {/* Main Grid Container */}
//         <div >
//           <div >
//             <table >
//               <thead>
//                 <tr>
//                   <th >
//                     Timeline
//                   </th>
//                   {periods.map(p => (
//                     <th key={p} >
//                       <div >
//                         <span >
//                           0{p}
//                         </span>
//                         <span >
//                           Period
//                         </span>
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {days.map(day => (
//                   <tr key={day}>
//                     <td >
//                       <div >
//                         <span >
//                           {day}
//                         </span>
//                       </div>
//                     </td>

//                     {periods.map(period => (
//                       <td key={period} className="min-w-[240px]">
//                         {getClass(day, period)}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ClassRoutine;

// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import NexusLoader from '../../components/Nexusloader/Nexusloader';
// import useAuth from '../../Hooks/useAuth';
// import {
//   HiOutlineDownload,
//   HiOutlineClock,
//   HiOutlineUser,
//   HiOutlineBookOpen,
//   HiOutlineAcademicCap,
// } from 'react-icons/hi';

// const ClassRoutine = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: studentData = [] } = useQuery({
//     queryKey: ['students'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/student`);
//       return res.data.result;
//     },
//   });

//   const findSingleStudent = studentData.find(s => s?.email === user?.email);

//   const { data: routine = [], isLoading } = useQuery({
//     queryKey: ['routine', findSingleStudent?.department],
//     enabled: !!findSingleStudent?.department,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/routine?className=${findSingleStudent?.department}`,
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

//   const getClass = (day, period) => {
//     // Using .find() instead of .filter() since we want one specific class
//     const item = routine.find(
//       r => r.day === day && Number(r.period) === Number(period),
//     );

//     if (!item) {
//       return (
//         <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
//           <span className="text-gray-400 text-sm italic font-medium">
//             No Class Scheduled
//           </span>
//         </div>
//       );
//     }

//     return (
//       <div className="p-4 bg-white border border-blue-100 rounded-xl shadow-sm hover:border-blue-400 transition-colors duration-200">
//         <div className="space-y-3">
//           <div className="flex items-start gap-3">
//             <div className="p-2 bg-blue-50 rounded-lg">
//               <HiOutlineBookOpen className="text-blue-600 text-lg" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-gray-800 leading-tight uppercase tracking-tight">
//                 {item.subject}
//               </p>
//               <div className="flex items-center gap-1.5 mt-1 text-gray-500">
//                 <HiOutlineUser className="text-xs" />
//                 <p className="text-xs font-medium">{item.teacherName}</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 py-1 px-3 bg-blue-600 rounded-md w-fit">
//             <HiOutlineClock className="text-white text-xs" />
//             <span className="text-white text-[11px] font-bold">
//               {item.time}
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleDownload = () => {
//     window.print();
//   };

//   if (isLoading)
//     return (
//       <div className="h-screen flex items-center justify-center bg-white">
//         <NexusLoader />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
//           <div className="space-y-2">
//             <div className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-sm uppercase">
//               <HiOutlineAcademicCap className="text-xl" />
//               <span>Academic Schedule</span>
//             </div>
//             <h2 className="text-4xl font-black text-gray-900">
//               CLASS <span className="text-blue-600">ROUTINE</span>
//             </h2>
//             <p className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full w-fit text-sm">
//               {findSingleStudent?.department || 'General'} Department
//             </p>
//           </div>

//           <button
//             onClick={handleDownload}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
//           >
//             <HiOutlineDownload className="text-xl" />
//             Download PDF
//           </button>
//         </div>

//         {/* Routine Table */}
//         <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xl shadow-gray-100">
//           <table className="w-full border-collapse bg-white">
//             <thead>
//               <tr className="bg-blue-600">
//                 <th className="p-5 text-left text-white font-bold text-sm uppercase tracking-wider border-b border-blue-700">
//                   Timeline
//                 </th>
//                 {periods.map(p => (
//                   <th
//                     key={p}
//                     className="p-5 text-left text-white font-bold text-sm uppercase tracking-wider border-b border-blue-700"
//                   >
//                     <div className="flex flex-col">
//                       <span className="text-blue-200 text-[10px]">
//                         Slot 0{p}
//                       </span>
//                       <span>Period {p}</span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {days.map(day => (
//                 <tr key={day} className="hover:bg-blue-50/30 transition-colors">
//                   <td className="p-5 align-middle border-r border-gray-50 bg-gray-50/50">
//                     <span className="text-gray-900 font-black text-sm uppercase tracking-tighter">
//                       {day}
//                     </span>
//                   </td>

//                   {periods.map(period => (
//                     <td key={period} className="p-4 min-w-[280px]">
//                       {getClass(day, period)}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer info */}
//         <div className="mt-6 flex justify-between items-center text-gray-400 text-xs font-medium px-2">
//           <p>© {new Date().getFullYear()} Campus Nexus Management System</p>
//           <p>Generated for: {user?.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassRoutine;

// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import NexusLoader from '../../components/Nexusloader/Nexusloader';
// import useAuth from '../../Hooks/useAuth';
// import {
//   HiOutlineDownload,
//   HiOutlineClock,
//   HiOutlineUser,
//   HiOutlineBookOpen,
//   HiOutlineCalendar,
// } from 'react-icons/hi';

// const ClassRoutine = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: studentData = [] } = useQuery({
//     queryKey: ['students'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/student`);
//       return res.data.result;
//     },
//   });

//   const findSingleStudent = studentData.find(s => s?.email === user?.email);

//   const { data: routine = [], isLoading } = useQuery({
//     queryKey: ['routine', findSingleStudent?.department],
//     enabled: !!findSingleStudent?.department,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/routine?className=${findSingleStudent?.department}`,
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

//   const getClass = (day, period) => {

//     const items = routine.filter(
//       r => r.day === day && Number(r.period) === Number(period),
//     );

//     if (items.length === 0) {
//       return (
//         <div className="py-4 bg-gray-50/50 rounded border border-dashed border-gray-200 flex items-center justify-center">
//           <span className="text-gray-300 text-[10px] font-medium uppercase">
//             No Class
//           </span>
//         </div>
//       );
//     }

//     return (
//       <div className="flex flex-col gap-2">
//         {items.map((item, idx) => (
//           <div
//             key={idx}
//             className="p-2 bg-white border-l-4 border-blue-600 shadow-sm border-t border-r border-b border-gray-100 rounded-r-md"
//           >
//             <div className="flex flex-col gap-1">
//               <div className="flex items-center gap-1.5">
//                 <HiOutlineBookOpen className="text-blue-600 text-xs shrink-0" />
//                 <p className="text-[11px] font-bold text-gray-800 uppercase truncate">
//                   {item.subject}
//                 </p>
//               </div>

//               <div className="flex items-center gap-1.5">
//                 <HiOutlineUser className="text-gray-400 text-[10px] shrink-0" />
//                 <p className="text-[10px] text-gray-500 font-medium truncate">
//                   {item.teacherName}
//                 </p>
//               </div>

//               <div className="flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-blue-50 rounded">
//                 <HiOutlineClock className="text-blue-600 text-[10px]" />
//                 <span className="text-blue-700 text-[9px] font-bold">
//                   {item.time}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const handleDownload = () => {
//     window.print();
//   };

//   if (isLoading)
//     return (
//       <div className="h-96 flex items-center justify-center">
//         <NexusLoader />
//       </div>
//     );

//   return (
//     <div className="bg-white w-full mx-auto    p-2 md:p-6">
//       <div className="w-full ">
//         {/* Header - Compact */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-blue-100 pb-4">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <HiOutlineCalendar className="text-blue-600" />
//               <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">
//                 Schedule
//               </span>
//             </div>
//             <h2 className="text-2xl font-black text-gray-900 leading-none">
//               CLASS <span className="text-blue-600">ROUTINE</span>
//             </h2>
//             <p className="text-gray-500 text-xs mt-1 font-semibold">
//               Dept: {findSingleStudent?.department || 'N/A'}
//             </p>
//           </div>

//           <button
//             onClick={handleDownload}
//             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
//           >
//             <HiOutlineDownload />
//             Download
//           </button>
//         </div>

//         {/* Routine Table - Minimalist & Compact */}
//         <div className="overflow-auto border border-gray-200 rounded-lg shadow-sm">
//           <table className="max-w-[700px] border-collapse ">
//             <thead>
//               <tr className="bg-blue-600 text-white">
//                 <th className=" p-1 md:p-3 text-left text-[11px] font-bold uppercase tracking-wider border-b border-blue-700 ">
//                   Day
//                 </th>
//                 {periods.map(p => (
//                   <th
//                     key={p}
//                     className="p-3 text-left text-[11px] font-bold uppercase tracking-wider border-b border-blue-700"
//                   >
//                     Period 0{p}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {days.map(day => (
//                 <tr key={day} className="hover:bg-blue-50/20 transition-colors">
//                   <td className="p-3 bg-gray-50 border-r border-gray-100">
//                     <span className="text-gray-700 font-bold text-[11px] uppercase tracking-tighter">
//                       {day}
//                     </span>
//                   </td>

//                   {periods.map(period => (
//                     <td key={period} className="p-2 w-24 align-top">
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
  HiOutlineCalendar,
  HiAcademicCap,
} from 'react-icons/hi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SecendLoader from '../../components/Nexusloader/SecendLoader';

const ClassRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: studentData = [] } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/students`);
      return res.data.result;
    },
  });
 
  const findSingleStudent = studentData.find(
    s => s?.email === user?.email,
  );

  const { data: routine = [], isLoading } = useQuery({
    queryKey: ['routine', findSingleStudent?.class_name],
    // enabled: !!findSingleStudent?.class_name,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/routine?class_name=${findSingleStudent?.class_name}`,
      );
      return res.data;
    },
  });
console.log(routine, 'is routine');
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
    const items = routine.filter(
      r => r.day === day && Number(r.period) === Number(period),
    );

    const formatTime = timeString => {
     

      const [hour, minute] = timeString.split(':')
      const hours = parseInt(hour, 10) ;
      const fixHours = hours >= 12 ? 'pm' : 'am'
      const h = hours % 12 || 12
      
       return `${h}:${minute} ${fixHours}`
    };

    if (items.length === 0) {
      return (
        <div className="h-full min-h-[80px] bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
          <span className="text-slate-300 text-[9px] font-bold uppercase tracking-widest">
           No Class
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-white border border-blue-100 rounded shadow-sm hover:border-blue-400 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-600 p-1 rounded">
                  <HiOutlineBookOpen className="text-white text-[10px]" />
                </div>
                <p className="text-[11px] font-bold text-slate-800 uppercase leading-tight">
                  {item.subject}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <HiOutlineUser className="text-[11px]" />
                  <p className="text-[10px] font-medium">{item.teacherName}</p>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                  <HiOutlineClock className="text-[11px]" />
                  <span className="text-[10px]">{formatTime(item.time)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleDownload = (result) => {
   const doc = new jsPDF();
   const primaryBlue = [30, 64, 175]; // #1E40AF
   const accentBlue = [235, 245, 255]; // Light blue for rows

   // --- Header ---
   doc.setFillColor(...primaryBlue);
   doc.rect(0, 0, 210, 30, 'F');

   doc.setTextColor(255, 255, 255);
   doc.setFontSize(18);
   doc.setFont('helvetica', 'bold');
   doc.text('Nexus School Class Routine', 20, 15);

   doc.setFontSize(10);
   doc.setFont('helvetica', 'normal');
   doc.text(`Department: ${result[0]?.department || 'N/A'}`, 20, 22);

   // --- Process Data: Grouping/Sorting ---
   // Sort by day and then by period
   const sortedData = [...result].sort((a, b) => {
     const days = [
       'Sunday',
       'Monday',
       'Tuesday',
       'Wednesday',
       'Thursday',
       'Friday',
       'Saturday',
     ];
     return days.indexOf(a.day) - days.indexOf(b.day) || a.period - b.period;
   });

   // --- Table Generation ---
   autoTable(doc, {
     startY: 40,
     head: [['Day', 'Period', 'Subject', 'Teacher', 'Time']],
     body: sortedData.map(item => [
       item.day,
       `P-${item.period}`,
       item.subject,
       item.teacherName,
       // Format time if it's an ISO string or just use the string
       item.time.includes('T')
         ? new Date(item.time).toLocaleTimeString([], {
             hour: '2-digit',
             minute: '2-digit',
           })
         : item.time,
     ]),
     theme: 'grid',
     headStyles: {
       fillColor: primaryBlue,
       textColor: [255, 255, 255],
       fontStyle: 'bold',
       halign: 'center',
     },
     bodyStyles: {
       fontSize: 10,
       halign: 'center',
       textColor: [40, 40, 40],
     },
     alternateRowStyles: {
       fillColor: accentBlue,
     },
     
     margin: { left: 15, right: 15 },
   });

   // --- Footer ---
   const finalY = doc.lastAutoTable.finalY || 200;
   doc.setFontSize(8);
   doc.setTextColor(150, 150, 150);
   doc.text('Generated by Nexus School Management System', 15, finalY + 10);

   doc.save(`School_Routine_${result[0]?.department}.pdf`);
  };

  

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
       <SecendLoader></SecendLoader>
      </div>
    );

  return (
    <div className="bg-white min-h-screen p-4 md:p-8 rounded-xl ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Blue & White High Contrast */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b-2 border-blue-600">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-4 rounded-xl shadow-lg shadow-blue-100">
              <HiAcademicCap className="text-white text-3xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HiOutlineCalendar className="text-blue-600 text-sm" />
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em]">
                  Academic Management
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 leading-none uppercase">
                Class <span className="text-blue-600">Routine</span>
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-100">
                  Dept: {findSingleStudent?.department || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={()=>handleDownload(routine)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-slate-900 text-white cursor-pointer px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-lg active:scale-95 uppercase tracking-wider"
          >
            <HiOutlineDownload className="text-lg" />
            Download PDF
          </button>
        </div>

        {/* Routine Table - Clean Grid */}
        <div className="overflow-hidden border border-slate-200 rounded-xl shadow-xl shadow-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900">
                  <th className="p-4 text-left text-[11px] font-black text-white uppercase tracking-widest border-r border-slate-800 w-32">
                    Weekday
                  </th>
                  {periods.map(p => (
                    <th
                      key={p}
                      className="p-4 text-left text-[11px] font-black text-white uppercase tracking-widest border-r border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 px-2 py-0.5 rounded text-[9px]">
                          Slot {p}
                        </span>
                        <span>Period 0{p}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {days.map(day => (
                  <tr
                    key={day}
                    className="group hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="p-4 bg-slate-50 border-r border-slate-200 align-middle">
                      <span className="text-slate-900 font-black text-xs uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                        {day}
                      </span>
                    </td>

                    {periods.map(period => (
                      <td
                        key={period}
                        className="p-3 min-w-[200px] align-top border-r border-slate-100 last:border-r-0"
                      >
                        {getClass(day, period)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex justify-between items-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Nexus Academic System</p>
          <p>User: {user?.displayName || 'Student'}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassRoutine;