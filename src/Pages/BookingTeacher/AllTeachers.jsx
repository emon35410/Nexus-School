import React, { useEffect, useState } from 'react';
import { Search, GraduationCap, CalendarCheck, Mail, MapPin, Star } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import BookingModal from './BookingModal'; // আমরা এই মডালটি পরে তৈরি করব

const AllTeachers = () => {
  const axiosSecure = useAxiosSecure();
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ১. সব ইউজার থেকে টিচারদের ফিল্টার করে নিয়ে আসা
  useEffect(() => {
    axiosSecure.get('/users')
      .then(res => {
        const onlyTeachers = res.data.filter(user => user.role === 'teacher');
        setTeachers(onlyTeachers);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // ২. সার্চ লজিক (নাম বা ডিপার্টমেন্ট অনুযায়ী)
  const filteredTeachers = teachers.filter(t => 
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-primary animate-bounce">Loading Teachers...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-[#F8FAFC]">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Meet Our <span className="text-primary">Teachers</span></h1>
          <p className="text-slate-500 mt-1 font-medium">Find and book a meeting with your department experts.</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTeachers.map((teacher) => (
          <div key={teacher._id} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>

            {/* Profile Image */}
            <div className="relative mb-6">
              <img 
                src={teacher.image || "https://i.pravatar.cc/150"} 
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-50 shadow-lg group-hover:scale-105 transition-transform duration-500"
                alt={teacher.name}
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md">
                <GraduationCap className="text-primary" size={18} />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-slate-800 leading-tight truncate">{teacher.name}</h3>
              <p className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full inline-block uppercase tracking-wider">
                {teacher.department || "General Faculty"}
              </p>
              
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Mail size={14} className="text-slate-400" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{teacher.address}</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 pt-6 border-t border-slate-50">
              <button 
                onClick={() => document.getElementById(`booking_modal_${teacher._id}`).showModal()}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary shadow-lg shadow-slate-200 hover:shadow-primary/30 transition-all active:scale-95"
              >
                <CalendarCheck size={18} /> Book Meeting
              </button>
            </div>

            {/* Modal - প্রতিটি টিচারের জন্য আলাদা মডাল */}
            <BookingModal teacher={teacher} id={`booking_modal_${teacher._id}`} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeachers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No Teachers Found</p>
        </div>
      )}
    </div>
  );
};

export default AllTeachers;