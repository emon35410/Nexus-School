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
      const scale = 2; // to make high quality pdf
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
