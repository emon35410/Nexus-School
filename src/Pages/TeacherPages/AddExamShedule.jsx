import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Calendar, Clock, BookOpen, Save } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AddExamSchedule = () => {
    const axiosSecure = useAxiosSecure();
    const{ user} = useAuth()
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      class: "",
      exam: "Third Semester",
      startDate: "",
      endDate: "",
      subjects: [{ subjectName: "", examDate: "", startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

    const onSubmit = (data) => {
        data.email = user.email;
        data.createdAt = new Date();
        
        // এখানে আপনার axiosSecure.post logic বসবে
      const res = axiosSecure.post('/exam-routine', data);
      console.log(res)
      
      
  };

  const classOptions = [6, 7, 8, 9, 10];

  return (
    <div className="min-h-screen p-6 md:p-10 flex justify-center">
      <div className="w-full bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600/20 rounded-2xl">
            <Calendar className="text-blue-500" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create Exam Routine</h2>
            <p className="text-slate-400 text-sm">Set schedules for specific classes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Top Section: Class & Overall Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Select Class</label>
              <select
                {...register("class", { required: true })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500 transition-all"
              >
                <option value="">-- Class --</option>
                {classOptions.map((c) => (
                  <option key={c} value={`class-${c}`}>Class {c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Start Date</label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">End Date</label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Subjects Dynamic Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen size={18} className="text-emerald-500" /> Subjects List
              </h3>
            </div>

            <div className="space-y-3">
              {fields.map((sub, idx) => (
                <div key={sub.id} className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800 group relative">
                  
                  {/* Subject Name */}
                  <div className="lg:col-span-4">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      {...register(`subjects.${idx}.subjectName`, { required: true })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Exam Date */}
                  <div className="lg:col-span-3">
                    <input
                      type="date"
                      {...register(`subjects.${idx}.examDate`, { required: true })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Start Time */}
                  <div className="lg:col-span-2">
                    <input
                      type="time"
                      {...register(`subjects.${idx}.startTime`, { required: true })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* End Time */}
                  <div className="lg:col-span-2">
                    <input
                      type="time"
                      {...register(`subjects.${idx}.endTime`, { required: true })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Delete Button */}
                  <div className="lg:col-span-1 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ subjectName: "", examDate: "", startTime: "", endTime: "" })}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              <Plus size={16} /> Add More Subject
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
          >
            <Save size={20} />
            Save Exam Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExamSchedule;