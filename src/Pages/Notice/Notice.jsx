import React from 'react';
import { Bell, Calendar, Megaphone, Search, Pin } from 'lucide-react';

const Notice = () => {
  // ডামি ডাটা (পরবর্তীতে আপনি API থেকে আনবেন)
  const notices = [
    {
      id: 1,
      title: "School Reopening Ceremony 2026",
      content: "We are excited to welcome all students back to campus. The ceremony will start at 9:00 AM sharp in the main auditorium.",
      date: "Feb 28, 2026",
      category: "Event",
      priority: "High"
    },
    {
      id: 2,
      title: "Mid-Term Examination Schedule",
      content: "The mid-term examination for all classes will begin from March 15. Please collect your admit cards from the office.",
      date: "Feb 25, 2026",
      category: "Exam",
      priority: "Urgent"
    },
    {
      id: 3,
      title: "New Library Rules",
      content: "Starting next week, students can borrow up to 3 books at a time for a duration of 14 days.",
      date: "Feb 20, 2026",
      category: "Academic",
      priority: "Normal"
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Megaphone className="text-blue-500" /> Notice Board
          </h2>
          <p className="text-slate-400 mt-1 font-medium">Stay updated with the latest school announcements.</p>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search notices..." 
            className="bg-[#1E293B] border border-slate-700 rounded-2xl py-3 pl-12 pr-6 outline-none focus:ring-2 focus:ring-blue-500/50 w-full md:w-80 transition-all text-sm"
          />
        </div>
      </div>

      {/* --- NOTICES LIST --- */}
      <div className="grid gap-6">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className="group bg-[#1E293B] border border-slate-700 p-6 rounded-4xl hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-900/10 relative overflow-hidden"
          >
            {/* Priority Indicator */}
            <div className={`absolute top-0 left-0 w-1.5 h-full ${
              notice.priority === 'Urgent' ? 'bg-rose-500' : 
              notice.priority === 'High' ? 'bg-amber-500' : 'bg-blue-500'
            }`}></div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                    notice.category === 'Exam' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {notice.category}
                  </span>
                  <div className="flex items-center text-slate-500 gap-1 text-xs font-bold">
                    <Calendar size={14} />
                    {notice.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {notice.title}
                  {notice.priority === 'Urgent' && <Pin size={16} className="text-rose-500 rotate-45" />}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {notice.content}
                </p>
              </div>

              <button className="self-start px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Logic (If no notices) */}
      {notices.length === 0 && (
        <div className="text-center py-20 bg-[#1E293B] rounded-[3rem] border border-dashed border-slate-700">
          <Bell className="mx-auto text-slate-600 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-400">No new notices today</h3>
          <p className="text-slate-600">Check back later for updates!</p>
        </div>
      )}
    </div>
  );
};

export default Notice;