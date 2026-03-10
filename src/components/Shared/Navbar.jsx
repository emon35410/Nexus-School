import React, { use, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import logoimg from '../../assets/NS1.png'
import useRole from "../../Hooks/useRole";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserCircle,
  UserPen,
  X,
  CalendarDays,
  Users,
  ChevronDown,
  ShieldCheck,
  GraduationCap,
  Home,
  Info,
  Mail
} from "lucide-react";

const Navbar = () => {
  const { logOut, user, isLoading } = use(AuthContext);
  const [role, roleLoading] = useRole();
  const navigate = useNavigate();
  const [activeRes, setActiveRes] = useState(false);

  // --- ডাইনামিক লিঙ্ক লজিক ---
  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "hover:bg-slate-50 text-slate-600 font-medium"}`}>
          <Home size={18} /> Home
        </NavLink>
      </li>

      {/* টিচারের জন্য মিটিং রিকোয়েস্ট লিঙ্ক */}
      {user && role === 'teacher' && (
        <li>
          <NavLink to="/manage-meetings" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "bg-emerald-50 text-emerald-600 font-bold border border-emerald-100" : "hover:bg-emerald-50/50 text-emerald-600 font-medium"}`}>
            <CalendarDays size={18} /> Meetings
          </NavLink>
        </li>
      )}

      {/* স্টুডেন্টের জন্য বুকিং লিঙ্ক */}
      {user && role === 'student' && (
        <li>
          <NavLink to="/booking-teachers" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "bg-indigo-50 text-indigo-600 font-bold border border-indigo-100" : "hover:bg-indigo-50/50 text-indigo-600 font-medium"}`}>
            <Users size={18} /> Book Teacher
          </NavLink>
        </li>
      )}

      <li>
        <NavLink to="/about" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "hover:bg-slate-50 text-slate-600 font-medium"}`}>
           About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "hover:bg-slate-50 text-slate-600 font-medium"}`}>
           Contact
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.info("Logged out successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="top-0 border-b border-slate-200 h-20 flex items-center w-full sticky bg-white/95 backdrop-blur-md z-100 transition-all duration-300">
      <div className="flex w-full items-center justify-between max-w-7xl px-4 md:px-6 mx-auto">
        
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
            <Menu onClick={() => setActiveRes(!activeRes)} className="md:hidden cursor-pointer text-slate-500 hover:text-primary transition-colors" />
            
            <Link to="/" className="font-bold text-2xl flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl overflow-hidden shadow-indigo-100 shadow-lg border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                  <img className="w-full h-full object-cover" src={logoimg} alt="Nexus School" />
              </div>
              <span className="hidden sm:inline-block tracking-tight text-slate-800">Nexus-<span className="text-primary">School</span></span>
            </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {links}
          </ul>
        </nav>

        {/* Right Section: Auth Actions */}
        <div className="flex items-center gap-3">
          {isLoading || roleLoading ? (
            <div className="h-10 w-24 bg-slate-50 animate-pulse rounded-full border border-slate-100"></div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 pr-3 rounded-full hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="relative">
                  <img
                    className="w-8 h-8 rounded-full border border-slate-200 object-cover shadow-sm"
                    src={user?.photoURL || "https://i.pravatar.cc/150"}
                    referrerPolicy="no-referrer"
                    alt="User"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                </div>
                
                <div className="hidden md:flex flex-col items-start leading-none gap-1">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                    {user?.displayName?.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1 text-[8px] font-black text-primary px-1.5 py-0.5 bg-primary/10 rounded-full uppercase tracking-widest">
                    {role === 'teacher' ? <ShieldCheck size={8}/> : <GraduationCap size={8}/>}
                    {role}
                  </span>
                </div>
                <ChevronDown size={14} className="text-slate-400 group-hover:text-primary transition-transform duration-300" />
              </div>
              
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-2xl z-110 w-60 p-2 shadow-2xl border border-slate-100 mt-3 space-y-1 animate-in fade-in zoom-in-95 duration-200">
                <li className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">{role} Portal</p>
                </li>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all font-semibold">
                    <LayoutDashboard size={18} className="text-indigo-500" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all font-semibold">
                    <UserCircle size={18} className="text-indigo-500" /> My Profile
                  </Link>
                </li>
                <div className="h-px bg-slate-100 my-1 mx-2"></div>
                <li>
                  <button onClick={handleLogOut} className="w-full flex items-center gap-3 p-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-bold">
                    <LogOut size={18} /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-5 py-2.5 font-bold text-slate-600 hover:text-primary transition-all flex items-center gap-2 text-sm">
                Login <LogIn size={18} />
              </Link>
              <Link to="/register" className="hidden sm:flex px-6 py-2.5 font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 text-sm">
                Join <UserPen size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* --- Mobile Sidebar (Drawer) --- */}
      <nav className={`md:hidden fixed inset-0 z-1000 transition-all duration-300 ${activeRes ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div onClick={() => setActiveRes(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
        <div className={`absolute top-0 left-0 w-[80%] max-w-75 h-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${activeRes ? "translate-x-0" : "-translate-x-full"}`}>
          
          <div className="p-6 flex items-center justify-between border-b bg-slate-50/50">
             <div className="flex items-center gap-2">
                <img src={logoimg} className="h-8 w-8" alt="Logo" />
                <span className="text-xl font-black text-primary tracking-tight">Nexus School</span>
             </div>
             <button onClick={() => setActiveRes(false)} className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400"><X size={20} /></button>
          </div>

          <ul onClick={() => setActiveRes(false)} className="p-6 flex flex-col gap-2 font-bold text-slate-600">
            {links}
          </ul>

          {user && (
             <div className="mt-auto p-6 border-t bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <img src={user?.photoURL} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm object-cover" alt="Profile" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-black text-slate-800 uppercase truncate max-w-37.5">{user?.displayName}</span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{role}</span>
                  </div>
                </div>
                <button onClick={handleLogOut} className="w-full py-3 rounded-xl bg-white border border-rose-100 text-rose-500 font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <LogOut size={18} /> Log Out
                </button>
             </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;