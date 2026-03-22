import React, { useState } from "react";
import useStudent from "../../Hooks/useStudent";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DownloadExamRoutine from "../../components/UI/DownloadExamRoutine";
import { BookOpen, Clock, Edit, Trash, X } from "lucide-react";

const MyExamSchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { student, studentLoading } = useStudent(); // Destructuring for cleaner code
  const [selectedExam, setSelectedExam] = useState(null);

  const { data: myExamSchedule, isLoading: isQueryLoading } = useQuery({
    // Include the department in the key so it refetches if the student changes
    queryKey: ["exam-schedule", student?.department],
    enabled: !!student?.department,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/exam-routine?className=${student?.department}`,
      );
      return res.data;
    },
  });

  // Handle Loading States
  if (studentLoading || isQueryLoading) {
    return (
      <div className="text-center p-10 text-emerald-500">
        Loading Schedule...
      </div>
    );
  }

  // Handle Empty States
  if (!myExamSchedule || myExamSchedule.length === 0) {
    return (
      <div className="text-center p-10 text-slate-400">
        No exam routine found for your class.
      </div>
    );
  }

  return (
    <div className="">
      {/* Professional Heading Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center lg:text-left">
        {/* Top Badge / Status */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">
            Academic Records
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          My Exam <span className="text-emerald-500">Schedule</span>
        </h1>

        {/* Subheading / Description */}
        <p className="text-slate-400 text-lg max-w-2xl">
          View your upcoming exams and download your schedule for easy
          reference. Stay organized and never miss an important exam date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {myExamSchedule.map((e, i) => (
          <div
            key={e._id || i}
            className="bg-[#1E293B] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-700">
                  <BookOpen size={24} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Class -{" "}
                  <span className="text-emerald-500">
                    {e.class?.split("-")[1]}
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-emerald-400 hover:bg-emerald-950/30 rounded-lg transition-all">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-rose-500 hover:bg-rose-950/30 rounded-lg transition-all">
                  <Trash size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {e.subjects?.slice(0, 2).map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-slate-500" />
                    <span className="text-sm font-semibold text-slate-200">
                      {s.subjectName}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {s.examDate}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-5">
              <DownloadExamRoutine e={e} />
              <button
                onClick={() => setSelectedExam(e)}
                className="w-full py-3 border border-slate-600 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all uppercase text-[11px] tracking-wider"
              >
                See All
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1E293B] border border-slate-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                Full Routine: {selectedExam.exam}
              </h2>
              <button
                onClick={() => setSelectedExam(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {selectedExam.subjects.map((s, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-slate-900 rounded-xl border border-slate-800"
                >
                  <span className="text-sm font-medium text-slate-200">
                    {s.subjectName}
                  </span>
                  <span className="text-xs font-mono text-emerald-500">
                    {s.examDate}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <DownloadExamRoutine e={selectedExam} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyExamSchedule;
