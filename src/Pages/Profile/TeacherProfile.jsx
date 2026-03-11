import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'; // Import React Hook Form
import { 
  Shield, Mail, Phone, MapPin, GraduationCap, 
  Edit3, Camera, Save, Clock, X, Loader2, User 
} from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthContext/AuthContext';

const TeacherProfile = ({ dbUser, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // React Hook Form Initialization
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: dbUser?.name,
      phone: dbUser?.phone,
      address: dbUser?.address,
      department: dbUser?.department
    }
  });

  const slots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  // --- Handle Slot Toggle ---
  const toggleSlot = async (slot) => {
    const currentSlots = dbUser?.availableSlots || [];
    const newSlots = currentSlots.includes(slot) 
      ? currentSlots.filter(s => s !== slot) 
      : [...currentSlots, slot];
    
    try {
      await axiosSecure.patch(`/users/${dbUser.email}`, { availableSlots: newSlots });
      refetch();
    } catch (err) {
      console.error("Slot update failed", err);
    }
  };

  // --- Handle Profile Update with React Hook Form ---
  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const res = await axiosSecure.patch(`/users/${dbUser?.email}`, data);
      
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        await refetch();
        setModalOpen(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
          background: '#1E293B',
          color: '#fff'
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10 px-4 animate-in fade-in duration-700">
      {/* --- COVER & AVATAR SECTION --- */}
      <div className="relative mb-24">
        <div className="h-48 w-full bg-linear-to-r from-emerald-600 to-teal-800 rounded-[2.5rem] shadow-lg"></div>
        <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <img 
              src={user?.photoURL || "https://i.pravatar.cc/150?img=11"} 
              className="w-36 h-36 rounded-4xl border-4 border-[#0F172A] object-cover shadow-2xl" 
              alt="Teacher" 
            />
            <button className="absolute bottom-2 right-2 p-2 bg-emerald-600 rounded-xl border-2 border-[#0F172A] text-white">
              <Camera size={16} />
            </button>
          </div>
          <div className="pb-4">
            <h1 className="text-3xl font-black text-white">{dbUser?.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-slate-400">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold uppercase tracking-widest">
                Faculty Member
              </span>
              <span className="text-sm flex items-center gap-1">
                <MapPin size={14} /> {dbUser?.address || 'Sylhet, Bangladesh'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="absolute -bottom-12 right-8 flex items-center gap-2 px-6 py-3 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 text-white rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
        <div className="md:col-span-2 space-y-8">
          {/* Availability Slots */}
          <section className="bg-[#1E293B] p-8 rounded-4xl border border-slate-700 shadow-xl">
            <h3 className="text-xl font-black mb-4 text-white flex items-center gap-2">
              <Clock size={20} className="text-emerald-500" /> Set Availability
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slots.map(s => (
                <button 
                  key={s}
                  onClick={() => toggleSlot(s)}
                  className={`py-3 rounded-2xl text-[10px] font-black transition-all border ${
                    dbUser?.availableSlots?.includes(s) 
                    ? 'bg-emerald-600 border-transparent text-white shadow-lg' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* Professional Details Display */}
          <section className="bg-[#1E293B] p-8 rounded-4xl border border-slate-700">
             <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
               <Shield size={20} className="text-emerald-500" /> Professional Info
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoBox label="Full Name" value={dbUser?.name} icon={<User size={16}/>} />
                <InfoBox label="Email" value={dbUser?.email} icon={<Mail size={16}/>} />
                <InfoBox label="Department" value={dbUser?.department} icon={<GraduationCap size={16}/>} />
                <InfoBox label="Contact Phone" value={dbUser?.phone} icon={<Phone size={16}/>} />
             </div>
          </section>
        </div>
        
        {/* Sidebar Stats */}
        <div className="space-y-6">
           <div className="bg-linear-to-br from-emerald-600/10 to-transparent p-8 rounded-4xl border border-emerald-500/20">
              <h4 className="font-bold text-emerald-400 mb-4 uppercase text-xs tracking-widest">Activity</h4>
              <StatItem label="Classes" value="5" />
              <StatItem label="Requests" value="12" />
           </div>
        </div>
      </div>

      {/* --- REACT HOOK FORM MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#1E293B] border border-slate-700 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">Update Profile</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-slate-700 rounded-xl text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Full Name</label>
                <input 
                  {...register("name", { required: "Name is required" })}
                  className={`w-full bg-slate-900 border ${errors.name ? 'border-rose-500' : 'border-slate-700'} rounded-2xl p-4 text-white focus:border-emerald-500 outline-none text-sm transition-all`}
                />
                {errors.name && <span className="text-[10px] text-rose-500 ml-1">{errors.name.message}</span>}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Phone Number</label>
                <input 
                  {...register("phone", { required: "Phone is required" })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none text-sm"
                />
              </div>

              {/* Department Select */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">Department</label>
                <select 
                  {...register("department")}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none text-sm"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>

              <button 
                disabled={isUpdating} 
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isUpdating ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Save size={18} /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const InfoBox = ({ label, value, icon }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">{icon} {label}</p>
    <div className="text-slate-200 font-medium text-sm bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">{value || "Not Set"}</div>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 last:border-0">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm font-black text-white">{value}</span>
  </div>
);

export default TeacherProfile;