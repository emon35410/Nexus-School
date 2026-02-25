import React, { useContext } from 'react';
import { 
  Users, BookOpen, Bell, TrendingUp, 
  Calendar, CheckCircle, Clock 
} from 'lucide-react';
import { AuthContext } from "../../AuthContext/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const userRole = "student"; 


  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* --- WELCOME SECTION --- */}
      <div className="relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-700 p-8 rounded-4xl text-white shadow-xl shadow-blue-900/20">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{greeting}, {user?.displayName || "Hero"}! 👋</h2>
          <p className="text-blue-100 max-w-md">
            Welcome back to your {userRole} portal. Here's what's happening in your school today.
          </p>
        </div>
        {/* Background Decor */}
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="text-blue-500" />} 
          title="Total Students" 
          value="1,240" 
          trend="+12% this month" 
        />
        <StatCard 
          icon={<BookOpen className="text-emerald-500" />} 
          title="Active Courses" 
          value="24" 
          trend="4 new added" 
        />
        <StatCard 
          icon={<CheckCircle className="text-amber-500" />} 
          title="Attendance" 
          value="94%" 
          trend="Above average" 
        />
        <StatCard 
          icon={<Bell className="text-rose-500" />} 
          title="New Notices" 
          value="03" 
          trend="Check bulletin" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- RECENT ACTIVITY / NOTICES --- */}
        <div className="lg:col-span-2 bg-[#1E293B] border border-slate-700 p-8 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-blue-500" size={20} /> Recent Activities
            </h3>
            <button className="text-sm text-blue-400 hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            <ActivityItem 
              title="New Assignment Posted" 
              desc="Mathematics - Calculus Section A" 
              time="2 hours ago" 
              icon={<FileText size={16}/>}
              color="bg-blue-500/10 text-blue-500"
            />
            <ActivityItem 
              title="Exam Result Published" 
              desc="Physics Mid-term results are out" 
              time="Yesterday" 
              icon={<TrendingUp size={16}/>}
              color="bg-emerald-500/10 text-emerald-500"
            />
            <ActivityItem 
              title="School Holiday" 
              desc="Next Friday will be a public holiday" 
              time="2 days ago" 
              icon={<Calendar size={16}/>}
              color="bg-rose-500/10 text-rose-500"
            />
          </div>
        </div>

        {/* --- MINI CALENDAR / PROFILE SUMMARY --- */}
        <div className="bg-[#1E293B] border border-slate-700 p-8 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold mb-6">Quick Schedule</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-slate-800 w-12 h-14 rounded-xl border border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase">Feb</span>
                <span className="text-lg font-black text-white">26</span>
              </div>
              <div>
                <p className="font-bold text-slate-200">Staff Meeting</p>
                <p className="text-xs text-slate-500">09:00 AM - 10:30 AM</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-slate-800 w-12 h-14 rounded-xl border border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase">Mar</span>
                <span className="text-lg font-black text-white">02</span>
              </div>
              <div>
                <p className="font-bold text-slate-200">Final Exam Starts</p>
                <p className="text-xs text-slate-500">All Departments</p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors">
            Full Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ icon, title, value, trend }) => (
  <div className="bg-[#1E293B] p-6 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-slate-400 text-sm font-medium">{title}</p>
    <h4 className="text-2xl font-black text-white my-1">{value}</h4>
    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{trend}</p>
  </div>
);

const ActivityItem = ({ title, desc, time, icon, color }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
    <div className={`p-2.5 rounded-xl ${color}`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-slate-200">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
    <span className="text-[10px] font-bold text-slate-600 uppercase whitespace-nowrap">{time}</span>
  </div>
);

// Lucide icon helper if not imported
const FileText = ({ size }) => <BookOpen size={size} />;

export default Dashboard;