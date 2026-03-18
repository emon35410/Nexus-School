import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { ShieldCheck, UserCog, Trash2, Mail, Calendar, User } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = async (user, newRole) => {
        const result = await Swal.fire({
            title: `Make ${user.name} a ${newRole}?`,
            text: "This will update their access level immediately.",
            icon: "question",
            background: '#1f2937',
            color: '#f1f5f9',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#374151',
            confirmButtonText: `Yes, make ${newRole}`,
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.patch(`/users/${user.email}`, { role: newRole });
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Role Updated!",
                    text: `${user.name} is now a ${newRole}`,
                    icon: "success",
                    background: '#1f2937',
                    color: '#f1f5f9',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Failed to update role", err);
            Swal.fire({
                title: "Error",
                text: "Failed to update role. Please try again.",
                icon: "error",
                background: '#1f2937',
                color: '#f1f5f9',
            });
        }
    };

    const handleDelete = async (user) => {
        const result = await Swal.fire({
            title: `Delete ${user.name}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            background: '#1f2937',
            color: '#f1f5f9',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, delete user',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.delete(`/users/${user.email}`);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: `${user.name} has been removed.`,
                    icon: "success",
                    background: '#1f2937',
                    color: '#f1f5f9',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Failed to delete user", err);
            Swal.fire({
                title: "Error",
                text: "Failed to delete user. Please try again.",
                icon: "error",
                background: '#1f2937',
                color: '#f1f5f9',
            });
        }
    };

    if (isLoading) return <div className="flex items-center justify-center min-h-100 w-full">
        <div className="relative">
            {/* Outer Ring */}
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>

            {/* Inner Pulse Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
    </div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-black text-white italic">User Management</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        {users.length} registered accounts
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[20px] font-bold text-slate-500 uppercase tracking-widest">Access Level</p>
                    <p className="text-blue-400 font-black text-sm uppercase">Administrator</p>
                </div>
            </div>

            {/* Table card */}
            <div className="bg-[#1f2937] border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-slate-700/60">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Member</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Joined</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/40">
                            {users.map((user) => (
                                <tr key={user._id} className="group hover:bg-slate-700/20 transition-all duration-200">

                                    {/* Member info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-600/50 overflow-hidden shrink-0">
                                                <img
                                                    src={user.image || "https://i.pravatar.cc/150?u=" + user.email}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                                                    {user.name || "Anonymous"}
                                                </p>
                                                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                    <Mail size={11} />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                                            <Calendar size={13} className="text-slate-500" />
                                            {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                        </div>
                                    </td>

                                    {/* Role badge */}
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${user.role === 'admin'
                                                ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                                                : user.role === 'teacher'
                                                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                                                    : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                                            }`}>
                                            {user.role || 'student'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-2 flex-wrap">

                                            {/* Make Admin */}
                                            <button
                                                onClick={() => handleRoleChange(user, 'admin')}
                                                disabled={user.role === 'admin'}
                                                title="Promote to Admin"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 active:scale-95 ${user.role === 'admin'
                                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                                        : 'border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white hover:border-transparent'
                                                    }`}
                                            >
                                                <ShieldCheck size={13} />
                                                Make Admin
                                            </button>

                                            {/* Make Teacher */}
                                            <button
                                                onClick={() => handleRoleChange(user, 'teacher')}
                                                disabled={user.role === 'teacher'}
                                                title="Promote to Teacher"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 active:scale-95 ${user.role === 'teacher'
                                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                                        : 'border-indigo-500/40 text-indigo-300 hover:bg-indigo-500 hover:text-white hover:border-transparent'
                                                    }`}
                                            >
                                                <UserCog size={13} />
                                                Make Teacher
                                            </button>

                                            {/* Make Student */}
                                            <button
                                                onClick={() => handleRoleChange(user, 'student')}
                                                disabled={user.role === 'student' || !user.role}
                                                title="Demote to Student"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 active:scale-95 ${user.role === 'student' || !user.role
                                                        ? 'opacity-25 cursor-not-allowed border-slate-700 text-slate-500'
                                                        : 'border-blue-500/40 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-transparent'
                                                    }`}
                                            >
                                                <User size={13} />
                                                Make Student
                                            </button>

                                            {/* Delete */}
                                            <button
                                                onClick={() => handleDelete(user)}
                                                title="Delete User"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-200 active:scale-95"
                                            >
                                                <Trash2 size={13} />
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;