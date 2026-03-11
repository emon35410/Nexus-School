import React from "react";
import { Calendar, Download, BookOpen, Clock } from "lucide-react";
import AddExamShedule from "./AddExamShedule";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DownloadExamRoutine from "../../components/UI/DownloadExamRoutine";

const ExamShedule = () => {
  const axiosSecure = useAxiosSecure();

  const { data: examSchedule = [], refetch } = useQuery({
    queryKey: ["exam-shedule"],
    queryFn: async () => {
      const res = await axiosSecure.get("/exam-routine");
      return res.data;
    },
  });

  console.log(examSchedule);

  return (
    <>
      <div className="p-6 md:p-10 min-h-screen space-y-8">
        <AddExamShedule refetch={refetch} />

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            Nexus School <span className="text-emerald-500">Exam Schedule</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium tracking-[0.2em] uppercase">
            Academic Year 2026
          </p>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {examSchedule.map((e, i) => (
            <div
              key={i}
              className="bg-[#1E293B] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
            >
              {/* Decorative background circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>

              {/* Class Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-700">
                    <BookOpen size={24} className="text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Class -{" "}
                    <span className="text-emerald-500">
                      {e.class.split("-")[1]}
                    </span>
                  </h2>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-800">
                  Final Term
                </span>
              </div>

              {/* Subjects Table-like List */}
              <div className="space-y-3 mb-8">
                {e.subjects.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-slate-500" />
                      <span className="text-sm font-semibold text-slate-200">
                        {s.subjectName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-emerald-500/70" />
                      <span className="text-xs font-mono text-slate-400">
                        {s.examDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <DownloadExamRoutine e={e} />
            </div>
          ))}
        </div>
      </div>{" "}
    </>
  );
};

export default ExamShedule;
