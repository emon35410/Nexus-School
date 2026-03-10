import React, { useContext } from 'react';
import { 
  Shield, Users, GraduationCap, Settings, 
  Activity, BarChart3, Bell, UserPlus, Database
} from 'lucide-react';
import { AuthContext } from '../../AuthContext/AuthContext';


const AdminProfile = ({ dbUser }) => {
    const { user } = useContext(AuthContext);
    console.log("Admin Profile Data:", dbUser); // ডাটা চেক করার জন্য
  return (
    
    <div className="max-w-6xl mx-auto pb-10 px-4 animate-in fade-in duration-700">
      {/* --- Admin Cover --- */}
      <div className="relative mb-24">
        <div className="h-48 w-full bg-linear-to-r from-slate-800 to-slate-950 rounded-[2.5rem] shadow-lg border border-slate-700"></div>
        
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative">
            <img 
              src={user?.photoURL || "https://i.pravatar.cc/150?img=12"} 
              className="w-36 h-36 rounded-4xl border-4 border-[#0F172A] object-cover shadow-2xl" 
              alt="Admin" 
            />
            <div className="absolute -top-2 -right-2 p-2 bg-amber-500 rounded-full border-4 border-[#0F172A]">
              <Shield size={16} className="text-white" />
            </div>
          </div>
          <div className="pb-4">
            <h1 className="text-3xl font-black text-white">{dbUser?.name}</h1>
            <div className="flex items-center gap-2 mt-1">
               <span className="px-3 py-1 bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-xs font-black uppercase tracking-widest">
                System Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Admin Overview Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-32">
        
        {/* Statistics Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
           <AdminStatCard icon={<Users className="text-blue-400" />} label="Total Students" value="1,240" color="blue" />
           <AdminStatCard icon={<GraduationCap className="text-emerald-400" />} label="Total Teachers" value="86" color="emerald" />
           <AdminStatCard icon={<Activity className="text-rose-400" />} label="System Load" value="24%" color="rose" />
           
           {/* Detailed Admin Info */}
           <section className="sm:col-span-3 bg-[#1E293B] p-8 rounded-4xl border border-slate-700 shadow-xl mt-4">
              <h3 className="text-xl font-black mb-6 text-white flex items-center gap-2">
                <Settings size={20} className="text-slate-400" /> Admin Privileges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <p className="text-sm text-slate-400 italic font-medium">ইউজার ম্যানেজমেন্ট, পেমেন্ট ভেরিফিকেশন এবং সিস্টেম কনফিগারেশন করার পূর্ণ ক্ষমতা আপনার আছে।</p>
                   <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold">User Edit</span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold">DB Access</span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold">Log View</span>
                   </div>
                </div>
                <div className="space-y-3">
                   <InfoBox label="Admin Email" value={dbUser?.email} icon={<Shield size={14}/>} />
                   <InfoBox label="Security Level" value="Level 4 (Owner)" icon={<Shield size={14}/>} />
                </div>
              </div>
           </section>
        </div>

        {/* --- Quick Actions Sidebar --- */}
        <div className="space-y-6">
          <div className="bg-[#1E293B] p-6 rounded-4xl border border-slate-700">
            <h4 className="font-black text-white mb-4 text-xs uppercase tracking-widest">Quick Actions</h4>
            <div className="space-y-3">
              <QuickBtn icon={<UserPlus size={16}/>} label="Add Teacher" color="bg-blue-600" />
              <QuickBtn icon={<Bell size={16}/>} label="Send Notice" color="bg-amber-600" />
              <QuickBtn icon={<Database size={16}/>} label="Backup DB" color="bg-slate-700" />
            </div>
          </div>
          
          <div className="bg-linear-to-br from-amber-500/10 to-transparent p-8 rounded-4xl border border-amber-500/20">
             <div className="flex items-center gap-2 text-amber-500 mb-2">
                <BarChart3 size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Server Health</span>
             </div>
             <p className="text-2xl font-black text-white">99.9%</p>
             <p className="text-[10px] text-slate-500 mt-1 italic">Last sync: Just now</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Admin Specific Sub-Components ---

const AdminStatCard = ({ icon, label, value, color }) => (
  <div className={`bg-[#1E293B] p-6 rounded-4xl border border-slate-700 hover:border-${color}-500/50 transition-all shadow-sm`}>
    <div className="p-3 bg-slate-800/50 w-fit rounded-2xl mb-4">{icon}</div>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
    <p className="text-2xl font-black text-white mt-1">{value}</p>
  </div>
);

const QuickBtn = ({ icon, label, color }) => (
  <button className={`w-full flex items-center gap-3 p-3 ${color} hover:opacity-90 text-white rounded-2xl text-xs font-bold transition-all active:scale-95`}>
    {icon} {label}
  </button>
);

const InfoBox = ({ label, value, icon }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
    <span className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1.5">{icon} {label}</span>
    <span className="text-xs text-white font-medium">{value}</span>
  </div>
);

export default AdminProfile;