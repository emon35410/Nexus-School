// {
/* Content */
// }
// {
//   /* <div className="max-w-6xl px-4 md:px-6 mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-base-100 rounded-xl shadow-xl p-6 border border-base-300"
//         >
//           <h3 className="font-bold text-lg mb-4 text-primary">
//             Student Information
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//             <div>
//               <p className="text-sm opacity-70">Student Name</p>
//               <p className="font-semibold">
//                 Mohhammad Abu Faysal Urbe Hanif Suvo
//               </p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Father's Name</p>
//               <p className="font-semibold">
//                 Mohhammad Abu Faysal Urbe Hanif Suvo
//               </p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Mother's Name</p>
//               <p className="font-semibold">
//                 Mohhammad Abu Faysal Urbe Hanif Suvo
//               </p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Class</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Student Roll</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Student Address</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Total Present</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Total Absent</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Present Percentage</p>
//               <p className="font-semibold">---</p>
//             </div>
//           </div>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="bg-base-100 rounded-xl shadow-xl p-6 border border-base-300"
//         >
//           <h3 className="font-bold text-lg mb-4 text-accent">
//             Result Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <p className="text-sm opacity-70">1stTerm Result</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">2ndTerm Result</p>
//               <p className="font-semibold text-success">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Final Result</p>
//               <p className="font-semibold text-error">---</p>
//             </div>
//           </div>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="bg-base-100 rounded-xl shadow-xl p-6 border border-base-300 h-fit"
//         >
//           <h3 className="font-bold text-lg mb-4 text-secondary">
//             Payment Information
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//             <div>
//               <p className="text-sm opacity-70">Total Payment</p>
//               <p className="font-semibold">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Total Given</p>
//               <p className="font-semibold text-success">---</p>
//             </div>

//             <div>
//               <p className="text-sm opacity-70">Total Due</p>
//               <p className="font-semibold text-error">---</p>
//             </div>
//           </div>
//         </motion.div>
//       </div> */
// }

import React, { useRef, useState } from "react";
import logoimg from "../../assets/NS1.png";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

const UserInfoDownload = () => {
  const reportRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    const element = reportRef.current;

    try {
      const scale = 2; // হাই কোয়ালিটির জন্য
      const options = {
        width: element.clientWidth * scale,
        height: element.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: element.clientWidth + "px",
          height: element.clientHeight + "px",
          outline: "none",
          border: "none",
        },
        bgcolor: "#ffffff",
      };

      const dataUrl = await domtoimage.toPng(element, options);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.clientHeight * pdfWidth) / element.clientWidth;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Clean_Report.pdf");
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* মেইন কন্টেন্ট এলাকা - এখান থেকে সব বর্ডার সরানো হয়েছে
          Shadow বা Border ক্লাস একদম বাদ দেওয়া হয়েছে
      */}
      <div
        ref={reportRef}
        className="bg-white mx-auto p-8"
        style={{ border: "none", outline: "none" }}
      >
        {/* Header - No Border Bottom */}
        <div className="flex items-center justify-between mb-12">
          <div className="h-25 w-25">
            <img
              className="w-full h-full object-contain rounded-2xl"
              src={logoimg}
              alt="Logo"
            />
          </div>
          <div className="text-right flex flex-col items-end">
            <h1
              style={{ color: "#2563eb" }}
              className="text-2xl font-black uppercase tracking-tighter whitespace-nowrap"
            >
              Student Information
            </h1>
            <p style={{ color: "#3b82f6" }} className="text-lg font-bold">
              REPORT
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-10">
          {/* Section 1 */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#f9fafb" }}
          >
            <h3
              style={{ color: "#2563eb" }}
              className="font-bold text-sm uppercase mb-4 tracking-widest"
            >
              Student Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl">
                <p
                  style={{ color: "#3b82f6" }}
                  className="text-[10px] uppercase font-bold mb-1"
                >
                  Student Name
                </p>
                <p className="font-semibold text-gray-800">
                  Mohhammad Abu Faysal Urbe Hanif Suvo
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <p
                  style={{ color: "#3b82f6" }}
                  className="text-[10px] uppercase font-bold mb-1"
                >
                  Class
                </p>
                <p className="font-semibold text-gray-800">---</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "#f9fafb" }}
          >
            <h3
              style={{ color: "#db2777" }}
              className="font-bold text-sm uppercase mb-4 tracking-widest"
            >
              Payment Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl">
                <p
                  style={{ color: "#ec4899" }}
                  className="text-[10px] uppercase font-bold mb-1"
                >
                  Total Given
                </p>
                <p className="font-bold text-green-600">---</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <p
                  style={{ color: "#ec4899" }}
                  className="text-[10px] uppercase font-bold mb-1"
                >
                  Total Due
                </p>
                <p className="font-bold text-red-600">---</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleDownloadPDF}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all active:scale-95"
        >
          {isLoading ? "Generating Clean PDF..." : "Download Report"}
        </button>
      </div>
    </div>
  );
};

export default UserInfoDownload;
