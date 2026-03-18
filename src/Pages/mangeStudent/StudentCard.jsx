// import React, { useState } from 'react';
// import {
//   FaUserGraduate,
//   FaEnvelope,
//   FaFingerprint,
//   FaRegCommentDots,
//   FaRegCommentAlt,
// } from 'react-icons/fa';
// import FeedBack from './FeedBack';

// const StudentCard = ({ studentData }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isStudent, setStudent] = useState();
//   const handleClick = id => {
//     const singleStudent = studentData.find(s => id === s._id);

//     setStudent(singleStudent);

//     setIsOpen(true);
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="table">
//         {/* head */}
//         <thead>
//           <tr className=" text-white">
//             <th>Name</th>
//             <th>Department</th>
//             <th>Address</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* row 2 */}
//           {studentData.map(student => (
//             <tr key={student._id} className="">
//               <td>{student?.name}</td>
//               <td>{student?.department}</td>
//               <td>{student?.address}</td>
//               <td>
//                 {/* Feedback Button */}
//                 <button
//                   onClick={() => handleClick(student?._id)}
//                   className="mt-8 flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all active:scale-95 group/btn cursor-pointer"
//                 >
//                   <FaRegCommentDots className="group-hover/btn:rotate-12 transition-transform" />

//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* modal */}
//       <FeedBack
//         isStudent={isStudent}
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//       ></FeedBack>

//     </div>
//   );
// };

// export default StudentCard;

import React, { useState } from 'react';
import {
  FaRegCommentDots,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUserAlt,
} from 'react-icons/fa';
import FeedBack from './FeedBack';

const StudentCard = ({ studentData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudent, setStudent] = useState(null);

  const handleClick = id => {
    const singleStudent = studentData.find(s => id === s._id);
    setStudent(singleStudent);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="w-full relative overflow-hidden rounded-[2rem] border border-slate-800  backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* --- Table Head --- */}
            <thead className="bg-blue-600/10 border-b border-slate-800">
              <tr className="text-blue-400 uppercase text-[11px] tracking-[0.2em] font-black">
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <FaUserAlt className="text-xs" /> Student Name
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap size={14} /> Department
                  </div>
                </th>
                <th className="py-5 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt size={13} /> Location
                  </div>
                </th>
                <th className="py-5 px-6 text-center">Engagement</th>
              </tr>
            </thead>

            {/* --- Table Body --- */}
            <tbody className="divide-y divide-slate-800/50">
              {studentData.length > 0 ? (
                studentData.map(student => (
                  <tr
                    key={student._id}
                    className="hover:bg-blue-500/5 transition-colors group/row"
                  >
                    {/* Name with Dynamic Avatar */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20 group-hover/row:scale-110 transition-transform">
                          {student?.name?.charAt(0) || 'S'}
                        </div>
                        <span className="font-semibold text-slate-200 group-hover/row:text-blue-400 transition-colors">
                          {student?.name || 'Anonymous Student'}
                        </span>
                      </div>
                    </td>

                    {/* Department Badge */}
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700 uppercase tracking-tighter">
                        {student?.department || 'No'}
                      </span>
                    </td>

                    {/* Address / Location */}
                    <td className="py-4 px-6">
                      <span className="text-slate-400 text-sm italic">
                        {student?.address || 'Region Not Specified'}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleClick(student?._id)}
                        className="relative inline-flex items-center justify-center p-3 rounded-xl bg-slate-800 text-blue-400 border border-slate-700 hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all active:scale-90 group/btn shadow-lg"
                      >
                        <FaRegCommentDots
                          size={18}
                          className="group-hover/btn:scale-110 transition-transform"
                        />
                        {/* Pulse Notification Effect */}
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* --- Dummy Fallback Row --- */
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <p className="text-slate-500 font-medium italic">
                      No active student records found...
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* --- Modal Component --- */}
      <FeedBack isStudent={isStudent} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default StudentCard;