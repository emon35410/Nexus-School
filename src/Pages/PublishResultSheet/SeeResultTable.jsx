// import React from 'react';

// const SeeResultTable = ({ resultSheet }) => {

//   if (!resultSheet?.subjects) {
//     return []
//   }

//   const validResult = resultSheet?.subjects.filter(m => m.mark !== null);

//   const getSubjectGrad = (mark) => {
//     if (mark >= 80) {
//       return 'A+'
//     } else if (mark >= 70) {
//       return 'A'
//     } else if (mark >= 60) {
//       return 'A-'
//     } else if (mark >= 50) {
//       return 'B'
//     } else if (mark >= 40) {
//       return 'C'
//     } else if (mark >= 33) {
//       return 'D'
//     }
//     return 'F'
//   }

//    const getPoint = mark => {
//      if (mark >= 80) return 5;
//      if (mark >= 70) return 4;
//      if (mark >= 60) return 3.5;
//      if (mark >= 50) return 3;
//      if (mark >= 40) return 2;
//      if (mark >= 33) return 1;
//      return 0;
//   };

//   const totalPoint = validResult.reduce((sum, sub) => sum + getPoint(sub.mark), 0);

//   const gpa = (totalPoint / validResult.length).toFixed(2);

//   return (
//     <div>
//       <div>
//         <h2>Result Sheet</h2>

//         <p>Name: {resultSheet?.studentName}</p>
//         <p>Roll: {resultSheet?.studentRoll}</p>
//         <p>Exam: {resultSheet?.examOption}</p>

//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Marks</th>
//               <th>Grade</th>
//             </tr>
//           </thead>

//           <tbody>
//             {validResult.map((sub, index) => (
//               <tr key={index}>
//                 <td>{sub.name}</td>
//                 <td>{sub.mark}</td>
//                 <td>{getSubjectGrad(sub.mark)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <h3>GPA: {gpa}</h3>
//       </div>
//     </div>
//   );
// };

// export default SeeResultTable;

import React from 'react';

const SeeResultTable = ({ resultSheet }) => {
  if (!resultSheet?.subjects) {
    return null;
  }

  const validResult = resultSheet?.subjects.filter(m => m.mark !== null);

  const getSubjectGrad = mark => {
    if (mark >= 80) return 'A+';
    if (mark >= 70) return 'A';
    if (mark >= 60) return 'A-';
    if (mark >= 50) return 'B';
    if (mark >= 40) return 'C';
    if (mark >= 33) return 'D';
    return 'F';
  };

  const getGradeColor = grade => {
    if (grade === 'A+' || grade === 'A') return 'text-emerald-400';
    if (grade === 'F') return 'text-red-400';
    return 'text-blue-300';
  };

  const getPoint = mark => {
    if (mark >= 80) return 5;
    if (mark >= 70) return 4;
    if (mark >= 60) return 3.5;
    if (mark >= 50) return 3;
    if (mark >= 40) return 2;
    if (mark >= 33) return 1;
    return 0;
  };

  const totalPoint = validResult.reduce(
    (sum, sub) => sum + getPoint(sub.mark),
    0,
  );
  const gpa = (totalPoint / validResult.length).toFixed(2);

  return (
    <div className="p-1">
      <div className="bg-slate-900/40 border border-blue-500/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 p-6 border-b border-blue-500/20">
          <h2 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-4">
            Academic Transcript
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <span className="text-xs uppercase text-slate-500 block">
                Student Name
              </span>
              <span className="text-blue-100 font-medium">
                {resultSheet?.studentName}
              </span>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <span className="text-xs uppercase text-slate-500 block">
                Class Roll
              </span>
              <span className="text-blue-100 font-medium">
                #{resultSheet?.studentRoll}
              </span>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <span className="text-xs uppercase text-slate-500 block">
                Exam Term
              </span>
              <span className="text-blue-100 font-medium capitalize">
                {resultSheet?.examOption?.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-blue-400 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Marks</th>
                <th className="px-6 py-4 font-semibold text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {validResult.map((sub, index) => {
                const grade = getSubjectGrad(sub.mark);
                return (
                  <tr
                    key={index}
                    className="hover:bg-blue-900/10 even:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-300 font-medium italic">
                      {sub.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-700/50 px-3 py-1 rounded-full text-sm text-blue-200 border border-slate-600">
                        {sub.mark}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold text-lg ${getGradeColor(grade)}`}
                    >
                      {grade}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="p-6 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between border-t border-blue-500/20 gap-4">
          <div className="text-slate-400 text-sm italic">
            * Generated automatically by the Result Management System
          </div>
          <div className="bg-blue-600/20 border border-blue-500 px-8 py-3 rounded-xl flex items-center gap-4">
            <span className="text-blue-400 font-bold uppercase tracking-tighter">
              Final GPA
            </span>
            <span className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              {gpa}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeResultTable;