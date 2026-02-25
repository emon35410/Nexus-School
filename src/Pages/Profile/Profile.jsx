import React, { useContext } from 'react';
import { 
  Mail, Shield, Calendar, MapPin, 
  Edit3, Camera, GraduationCap 
} from 'lucide-react';
import { AuthContext } from '../../AuthContext/AuthContext';



const Profile = () => {
  const { user } = useContext(AuthContext);

  // Firebase Data
  const userName = user?.displayName || "Nexus User";
  const userEmail = user?.email || "user@nexus-school.com";
  const userImg = user?.photoURL || "https://i.pravatar.cc/150?img=11";
  
  const userRole = "student"; 

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
      
      {/* --- COVER & AVATAR SECTION --- */}
      <div className="relative mb-24">
        {/* Decorative Cover */}
        <div className="h-48 w-full bg-linear-to-r from-blue-600 to-indigo-800 rounded-[2.5rem] shadow-lg"></div>
        
        {/* Profile Info Overlay */}
        <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <img 
              referrerPolicy="no-referrer"
              src={userImg} 
              alt="Profile" 
              className="w-36 h-36 rounded-4xl border-4 border-[#0F172A] object-cover shadow-2xl transition-transform group-hover:scale-[1.02]"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-xl border-2 border-[#0F172A] text-white hover:bg-blue-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          
          <div className="pb-4">
            <h1 className="text-3xl font-black text-white">{userName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold uppercase tracking-widest">
                {userRole}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin size={14} /> Sylhet, Bangladesh
              </span>
            </div>
          </div>
        </div>

        <button className="absolute -bottom-12 right-8 flex items-center gap-2 px-6 py-3 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 text-white rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95">
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* --- DETAILS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
        
        {/* Left Side: Basic Info */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-[#1E293B] p-8 rounded-4xl border border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Shield size={20} className="text-blue-500" /> Account Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InfoBox label="Full Name" value={userName} icon={<Users size={16}/>} />
              <InfoBox label="Email Address" value={userEmail} icon={<Mail size={16}/>} />
              <InfoBox label="Department" value="Computer Science" icon={<GraduationCap size={16}/>} />
              <InfoBox label="Joined Date" value="January 2026" icon={<Calendar size={16}/>} />
            </div>
          </section>

          <section className="bg-[#1E293B] p-8 rounded-4xl border border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-white">About Me</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Passionate {userRole} at Nexus School. I love exploring new technologies and participating in school activities. Currently focusing on web development and academic excellence.
            </p>
          </section>
        </div>

        {/* Right Side: Quick Stats */}
        <div className="space-y-6">
           <div className="bg-linear-to-br from-blue-600/10 to-transparent p-8 rounded-4xl border border-blue-500/20">
              <h4 className="font-bold text-blue-400 mb-4 uppercase text-xs tracking-widest">Performance</h4>
              <div className="space-y-4">
                <StatItem label="Attendance" value="99%" />
                <StatItem label="Average GPA" value="5.00" />
                <StatItem label="Assignments" value="14/15" />
              </div>
           </div>

           <div className="bg-[#1E293B] p-6 rounded-4xl border border-slate-700">
              <h4 className="font-bold text-white mb-4 text-sm">Security</h4>
              <button className="w-full py-3 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700">
                Change Password
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const InfoBox = ({ label, value }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
      {label}
    </p>
    <p className="text-slate-200 font-medium text-sm bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
      {value}
    </p>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm font-black text-white">{value}</span>
  </div>
);

// Lucide icon helper for consistency
const Users = ({ size }) => <Shield size={size} />;

export default Profile;