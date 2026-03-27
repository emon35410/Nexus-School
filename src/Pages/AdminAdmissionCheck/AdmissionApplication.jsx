import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { 
  Trash2, CheckCircle, XCircle, Mail, Phone, 
  Calendar, Users, Search, ChevronDown, Filter,
  UserCheck, Clock, AlertCircle, LayoutDashboard,
  ArrowUpRight,
  UserPlus
} from 'lucide-react';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import { Link } from 'react-router';

/* ─── Config ────────────────────────────────────────────────────── */
const STATUS_THEME = {
  pending:  { bg: 'bg-orange-500/10',  text: 'text-orange-400',  border: 'border-orange-500/20', icon: <Clock size={12}/> },
  approved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', icon: <CheckCircle size={12}/> },
  rejected: { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/20', icon: <XCircle size={12}/> },
};

/* ─── Shared Components ─────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS_THEME[status] || STATUS_THEME.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${s.bg} ${s.text} ${s.border}`}>
      {s.icon} {status}
    </span>
  );
};

const ActionButtons = ({ id, status, onAction, isMobile }) => (
  <div className={`flex items-center gap-2 ${isMobile ? 'w-full pt-4' : 'justify-end'}`}>
    {status === 'pending' && (
      <>
        <button onClick={() => onAction(id, 'approved')} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
          Approve
        </button>
        <button onClick={() => onAction(id, 'rejected')} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all active:scale-95">
          Reject
        </button>
      </>
    )}
    <button 
      onClick={() => window.confirm('Delete this request?') && onAction(id, null, true)} 
      className={`p-2.5 rounded-xl transition-all ${isMobile && status !== 'pending' ? 'w-full bg-rose-500/10 text-rose-400 flex justify-center gap-2 font-bold text-xs border border-rose-500/20' : 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10'}`}
    >
      <Trash2 size={16} /> {isMobile && status !== 'pending' && 'Remove Record'}
    </button>
  </div>
);

/* ─── Main Component ────────────────────────────────────────────── */
const AdmissionApplication = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expanded, setExpanded] = useState({});

  const { data: admissions = [], isLoading } = useQuery({
    queryKey: ['admissions'],
    queryFn: async () => (await axiosSecure.get('/admission')).data,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, isDelete }) => 
      isDelete ? axiosSecure.delete(`/admission/${id}`) : axiosSecure.patch(`/admission/${id}`, { status }),
    onSuccess: (_, v) => {
      queryClient.invalidateQueries(['admissions']);
      toast.success(v.isDelete ? 'Deleted' : `Status: ${v.status}`, {
        style: { borderRadius: '12px', background: '#1E293B', color: '#fff', fontWeight: 'bold', border: '1px solid #334155' }
      });
    },
  });

  const { filtered, counts } = useMemo(() => {
    const stats = { total: admissions.length, pending: 0, approved: 0, rejected: 0 };
    const list = admissions.filter(a => {
      if (stats[a.status] !== undefined) stats[a.status]++;
      const matchSearch = `${a.firstName} ${a.lastName} ${a.email}`.toLowerCase().includes(search.toLowerCase());
      return (filterStatus === 'all' || a.application_status === filterStatus) && matchSearch;
    });
    return { filtered: list, counts: stats };
  }, [admissions, search, filterStatus]);

  const handleAction = (id, status, isDelete = false) => updateMutation.mutate({ id, status, isDelete });

  if (isLoading) return <NexusLoader />;

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8 lg:p-10 text-slate-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400">
              <LayoutDashboard size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Nexus Admin Panel</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Admission <span className="text-indigo-500">Queue</span></h1>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Applied</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-black text-white leading-none">{counts.total}</p>
                <ArrowUpRight size={14} className="text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Add student manually by admin */}
<div className="mb-8 p-6 bg-slate-900/40 border border-slate-800/60 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4 group">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform duration-300">
      <UserPlus size={20} />
    </div>
    <div>
      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Administrative Task</h4>
      <p className="text-sm font-semibold text-slate-200">Manual Student Enrollment</p>
    </div>
  </div>

  <Link to={'/admission'} className="w-full sm:w-auto">
    <button className="w-full px-6 py-3 hover:bg-slate-800 bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer">
      Add New Student
    </button>
  </Link>
</div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Applications', val: counts.total, color: 'text-indigo-400', border: 'border-indigo-500/20' },
            { label: 'Pending', val: counts.pending, color: 'text-orange-400', border: 'border-orange-500/20' },
            { label: 'Approved', val: counts.approved, color: 'text-emerald-400', border: 'border-emerald-500/20' },
            { label: 'Rejected', val: counts.rejected, color: 'text-rose-400', border: 'border-rose-500/20' }
          ].map((s) => (
            <div key={s.label} className={`bg-slate-900/40 border ${s.border} rounded-3xl p-6 transition-all hover:bg-slate-900/60 hover:-translate-y-1`}>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{s.label}</p>
              <p className={`text-4xl font-black ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-4xl p-4 mb-8 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Quick search by student name or email..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 rounded-2xl outline-none text-sm font-bold text-white placeholder:text-slate-600 focus:border-indigo-500/50 transition-all" 
            />
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilterStatus(s)} 
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${filterStatus === s ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* List Container */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] shadow-2xl overflow-hidden mb-12">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-950/30 text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] border-b border-slate-800">
                  <th className="p-8">Student</th>
                  <th className="p-8">Academic Info</th>
                  <th className="p-8">Contact</th>
                  <th className="p-8">Status</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filtered.map(app => (
                  <tr key={app._id} className="group hover:bg-slate-800/20 transition-all">
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-base group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {app.firstName[0]}{app.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white text-[16px] tracking-tight">{app.firstName} {app.lastName}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 flex items-center gap-1.5">
                            <Calendar size={12} className="text-slate-600"/> {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col gap-2">
                        <span className="w-fit px-3 py-1 bg-slate-950 text-indigo-400 border border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-tighter">Class {app.class}</span>
                        <span className="w-fit px-3 py-1 bg-slate-950 text-rose-700 border border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-tighter">Blood: {app.bloodGroup}</span>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-pointer"><Mail size={13}/>{app.email}</p>
                        <p className="text-xs font-bold text-slate-400 flex items-center gap-2"><Phone size={13}/>{app.phone}</p>
                      </div>
                    </td>
                    <td className="p-8"><StatusBadge status={app.application_status}/></td>
                    <td className="p-8"><ActionButtons id={app._id} status={app.application_status} onAction={handleAction} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden divide-y divide-slate-800/60">
            {filtered.map(app => (
              <div key={app._id} className="p-6">
                <div 
                  onClick={() => setExpanded(p => ({...p, [app._id]: !p[app._id]}))}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-black">
                      {app.firstName[0]}{app.lastName[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm truncate">{app.firstName} {app.lastName}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">{new Date(app.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <ChevronDown size={18} className={`text-slate-600 transition-transform duration-300 ${expanded[app._id] ? 'rotate-180 text-indigo-400' : ''}`}/>
                </div>
                
                {expanded[app._id] && (
                  <div className="mt-6 pt-6 border-t border-slate-800 space-y-5 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between">
                      <StatusBadge status={app.status}/>
                      <div className="flex gap-2">
                         <span className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-md text-[9px] font-black text-indigo-400 uppercase tracking-widest">CL-{app.class}</span>
                         <span className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-md text-[9px] font-black text-rose-400 uppercase tracking-widest">{app.bloodGroup}</span>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800 space-y-3">
                       <p className="text-xs font-bold text-slate-400 flex items-center gap-3"><Mail size={14} className="text-indigo-500/50"/> {app.email}</p>
                       <p className="text-xs font-bold text-slate-400 flex items-center gap-3"><Phone size={14} className="text-indigo-500/50"/> {app.phone}</p>
                    </div>
                    <ActionButtons id={app._id} status={app.application_status} onAction={handleAction} isMobile />
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-700" />
              </div>
              <p className="text-slate-500 font-bold text-lg">No admission requests found</p>
              <p className="text-slate-600 text-sm mt-1">Try changing your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionApplication;