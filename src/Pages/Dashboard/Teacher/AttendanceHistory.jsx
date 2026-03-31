import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceHistory = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Calendar date
  const [className, setClassName] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!className || !selectedDate) return;

    setLoading(true);

    // সঠিক লোকাল ডেট ফরম্যাট (YYYY-MM-DD)
    const dateStr = selectedDate.toLocaleDateString('en-CA');

    axios
      .get("http://localhost:5000/attendance", {
        params: { className, date: dateStr },
      })
      .then((res) => {
        setAttendanceData(res.data);
      })
      .catch(() => {
        setAttendanceData([]);
      })
      .finally(() => setLoading(false));
  }, [className, selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Attendance History
        </h2>

        {/* 🔥 Filter */}
        <div className="flex gap-4 mb-6 flex-wrap items-center">

          {/* Class */}
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Class</option>
            {[...Array(10)].map((_, i) => (
              // value হিসেবে শুধু সংখ্যা পাঠান: "1", "2" ইত্যাদি
              <option key={i} value={`${i + 1}`}>
                Class {i + 1}
              </option>
            ))}
          </select>

          {/* Calendar */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border p-3 rounded-lg"
            placeholderText="Select Date"
            dateFormat="yyyy-MM-dd"
          />

        </div>

        {/* Loading */}
        {loading && <p className="text-center">Loading...</p>}

        {/* No Data */}
        {!loading && attendanceData.length === 0 && className && selectedDate && (
          <p className="text-center text-red-500">No attendance found ❌</p>
        )}

        {/* Result */}
        {attendanceData.map((item, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg">

            <h3 className="font-bold mb-2">
              Class: {item.className} | Subject: {item.subject} | Date:{" "}
              {new Date(item.date).toLocaleDateString()}
            </h3>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Roll</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {item.students.map((student, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{student.name}</td>
                    <td
                      className={`p-2 font-semibold ${student.status === "present"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AttendanceHistory;