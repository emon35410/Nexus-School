import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const CreateRoutine = () => {
  const axiosSecure=useAxiosSecure()
  // 7 days data save
  const [formData, setFormData] = useState({
    day: '',
    subject: '',
    class: '',
    teacherName: '',
    time: '',
  });

  // day by data formate
  const [routine, setRoutine] = useState(() => {
    const saved = localStorage.getItem('routineData');
    if (saved && saved !== 'undefined') {
      return JSON.parse(saved);
    }
    return{
      Saturday: [],
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],}
  });
  //  only save localStorage before save in data base
  useEffect(() => {
    localStorage.setItem('routineData', JSON.stringify(routine));
  }, [routine]);

  

  // get value
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // save data on data base;

  const handleAdd = () => {
    const { day, subject, class: className, teacherName, time } = formData;
    const newClass = {
      subject,
      class: className,
      day,
      teacherName,
      time,
    };
    setRoutine({
      ...routine,
      [day]: [...(routine[day] || []), newClass],
    });
  };

  const handleSubmit = () => {
    axiosSecure.post('/routine', routine)
      .then(res => {
        if (res?.data?.acknowledged) {
          toast.info('successful create routine');
          localStorage.removeItem('routineData');
        } 
      }).catch(err => {
      console.log(err)
    })
   
  }

  
  return (
    <div className="flex items-center justify-center min-h-screen  font-sans">
      {/* Animated Border Wrapper - added responsive max-width and padding */}
      <div className="relative group p-[2px] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden w-full max-w-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        {/* The Rotating Neon Border */}
        <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0ea5e9_0%,#1e3a8a_50%,#0ea5e9_100%)] opacity-60" />

        {/* Inner Content Card - Adjusted padding for mobile */}
        <div className="relative bg-[#0f172a]/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[1.4rem] sm:rounded-[2.4rem] border border-blue-500/10">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Routine <span className="text-blue-500 text-glow">Master</span>
            </h2>
            <p className="text-blue-300/60 text-xs sm:text-sm">
              ৭ দিনের রুটিন দ্রুত তৈরি করার জন্য নিচের তথ্যগুলো দিন
            </p>
          </div>

          {/* Form Grid: Mobile-এ 1 column, Medium স্ক্রিনে 2 column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {/* Class Selection */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                Class Name
              </label>
              <select
                name="class"
                required
                onChange={handleChange}
                className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d] "
              >
                <option>Select Class</option>
                <option value={'class-6'}>Class 6</option>
                <option value={'Class-7'}>Class 7</option>
                <option value={'Class-8'}>Class 8</option>
                <option value={'Class-9'}>Class 9</option>
                <option value={'Class-10'}>Class 10</option>
              </select>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                Subject Name
              </label>
              <select
                name="subject"
                required
                onChange={handleChange}
                className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d]"
              >
                <option>Select Subject</option>
                <option value={'Mathematics'}>Mathematics</option>
                <option value={'English'}>English</option>
                <option value={'Bangla'}>Bangla</option>
                <option value={'Physics'}>Physics</option>
                <option value={'ICT'}>ICT</option>
              </select>
            </div>

            {/* Day Selection */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                Select Day
              </label>
              <select
                required
                name="day"
                onChange={handleChange}
                className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-[#26334d]"
              >
                <option value={''}>Saturday</option>
                <option value={'Sunday'}>Sunday</option>
                <option value={'Monday'}>Monday</option>
                <option value={'Tuesday'}>Tuesday</option>
                <option value={'Wednesday'}>Wednesday</option>
                <option value={'Thursday'}>Thursday</option>
                <option value={'Friday'}>Friday</option>
              </select>
            </div>

            {/* Teacher Name */}
            <div className="space-y-2">
              <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                Teacher Name
              </label>
              <input
                type="text"
                name="teacherName"
                onChange={handleChange}
                placeholder="e.g. Mr. Kabir"
                className="w-full bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 hover:bg-[#26334d]"
              />
            </div>

            {/* Time Picker - Fully Responsive for Mobile */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest ml-1 text-center block">
                Schedule Time
              </label>
              <div className="w-full ">
                <input
                  required
                  type="time"
                  name="time"
                  onChange={handleChange}
                  className="w-full  bg-[#1e293b] text-white border border-blue-900/50 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
          </div>

          {/* Buttons Section - Mobile-এ stack হয়ে যাবে */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
            <button
              onClick={handleAdd}
              className=" cursor-pointer flex-1 bg-transparent border-2 border-blue-600 text-blue-400 font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-blue-600/10 transition-all active:scale-95 text-sm sm:text-base"
            >
              Add More Class +
            </button>
            <button onClick={handleSubmit} className="flex-1 cursor-pointer bg-linear-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.4)] hover:shadow-blue-500/50 transition-all active:scale-95 text-sm sm:text-base">
              Publish Routine 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default CreateRoutine;