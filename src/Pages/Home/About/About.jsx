import React from 'react';
import {
  Target, Users, ShieldCheck, GraduationCap,
  Heart, ArrowRight, LayoutGrid
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Active Students", value: "1200+", icon: <Users size={20} /> },
    { label: "Expert Teachers", value: "45+", icon: <GraduationCap size={20} /> },
    { label: "Success Rate", value: "99%", icon: <Target size={20} /> },
    { label: "Years of Excellence", value: "10+", icon: <ShieldCheck size={20} /> },
  ];

  const features = [
    {
      num: "01", icon: <ShieldCheck size={26} />,
      title: "Smart Attendance",
      desc: "Automated tracking for students and staff with real-time notifications sent directly to parents — cutting manual work by over 80%.",
    },
    {
      num: "02", icon: <Users size={26} />,
      title: "Parent–Teacher Nexus",
      desc: "Seamless meeting bookings, progress reports, and direct communication — keeping every family informed and involved at every step.",
    },
    {
      num: "03", icon: <LayoutGrid size={26} />,
      title: "Role-Based Dashboards",
      desc: "Tailored experiences for Admins, Teachers, Parents, and Students — each user sees exactly what they need, nothing more.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafbff]">

      <style>{`
        @keyframes pulseRing { 0%{transform:scale(0.6);opacity:0.8} 100%{transform:scale(1.5);opacity:0} }
        @keyframes spinSlow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .pulse-ring::before {
          content:''; position:absolute; inset:-4px; border-radius:50%;
          border:2px solid #2563eb;
          animation:pulseRing 2s ease-out infinite; opacity:0;
        }
        .img-deco-ring {
          position:absolute; inset:-16px; border-radius:48px;
          border:2px dashed #bfdbfe; pointer-events:none;
          animation:spinSlow 20s linear infinite;
        }
        .float-top { animation:floatY 3.5s ease-in-out infinite; }
        .float-bot { animation:floatY 4s 1s ease-in-out infinite; }
        .live-dot  { animation:blink 1.5s ease-in-out infinite; }
        .mv-card-bar {
          position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#2563eb,#93c5fd);
          transform:scaleX(0); transform-origin:left;
          transition:transform .4s; border-radius:0 0 3px 3px;
        }
        .mv-card:hover .mv-card-bar { transform:scaleX(1); }
        .stat-bar::after {
          content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%);
          width:0; height:3px; background:#2563eb;
          border-radius:3px 3px 0 0; transition:width .35s;
        }
        .stat-bar:hover::after { width:60%; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen grid grid-cols-2 items-center bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 70% at 85% 40%,#dbeafe88,transparent 65%), radial-gradient(ellipse 40% 50% at 5% 70%,#eff6ff,transparent 60%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{
          backgroundImage: 'radial-gradient(circle,#cbd5e177 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Left */}
        <div className="relative z-10 px-20 py-24">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8">
            <span className="pulse-ring relative w-1.75 h-1.75 rounded-full bg-blue-600" />
            Empowering Minds Since 2014
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 mb-6">
            Welcome to <br />
            <span className="text-blue-600 relative inline-block">
              Nexus School
              {/* Underline Decoration */}
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-blue-300 rounded-full" />
            </span> <br />
            Management
          </h1>

          <p className="text-slate-600 text-base leading-[1.8] max-w-110 mb-11 font-medium">
            More than just a school — a modern ecosystem designed to streamline education,
            foster deep collaboration between parents and teachers, and give every student
            the tools they need to thrive.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-2.5 bg-blue-600 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] transition-all">
              Explore the Platform <ArrowRight size={15} />
            </a>
            <a href="#" className="inline-flex items-center gap-2 text-slate-700 text-sm font-semibold hover:text-blue-600 transition-colors">
              Learn more <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="relative z-10 flex items-center justify-center py-16 pr-20 pl-4">
          <div className="relative w-full max-w-115">
            <div className="img-deco-ring" />
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
              alt="Education"
              className="w-full block rounded-[36px] border-[6px] border-white"
              style={{ aspectRatio: '4/5', objectFit: 'cover', boxShadow: '0 24px 80px rgba(37,99,235,0.12),0 4px 16px rgba(15,23,42,0.08)' }}
            />
            <div className="float-top absolute top-6 -right-5 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.1)] flex items-center gap-3 text-[13px] font-bold text-slate-800">
              <div className="w-8 h-8 rounded-[10px] bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div>99% Success Rate</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Academic Year 2024</div>
              </div>
            </div>
            <div className="float-bot absolute -bottom-3 -left-7 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.1)] flex items-center gap-3 text-[13px] font-bold text-slate-800">
              <div className="w-8 h-8 rounded-[10px] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <div>
                <div>1,200+ Students</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Actively enrolled</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px mx-20" style={{ background: 'linear-gradient(90deg,transparent,#e2e8f0 30%,#e2e8f0 70%,transparent)' }} />

      {/* ── STATS ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-4">
          {stats.map((s, i) => (
            <div key={i}
              className="stat-bar relative py-11 px-8 text-center border-r border-slate-100 last:border-r-0 hover:bg-blue-50 transition-colors cursor-default">
              <div className="w-11 h-11 bg-blue-50 rounded-[14px] flex items-center justify-center text-blue-600 mx-auto mb-4 transition-all duration-300 group-hover:bg-blue-600">
                {s.icon}
              </div>
              <div className="text-slate-900 font-black leading-none mb-2 text-[42px]">
                {s.value}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px mx-20" style={{ background: 'linear-gradient(90deg,transparent,#e2e8f0 30%,#e2e8f0 70%,transparent)' }} />

      {/* ── MISSION / VISION ── */}
      <section className="max-w-7xl mx-auto px-20 py-28">
        <div className="flex items-center gap-3 text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
          <span className="w-6 h-0.5 bg-blue-600 rounded" />Our Story
        </div>
        <h2 className="font-black text-slate-900 leading-[1.1] tracking-tight max-w-135 mb-16"
          style={{ fontSize: 'clamp(34px,4vw,54px)' }}>
          What drives us{' '}
          <span className="text-blue-600">forward</span>{' '}
          every single day
        </h2>

        <div className="grid grid-cols-[1.05fr_1fr] gap-20 items-start">
          <div className="flex flex-col gap-5">
            {[
              { icon: <Target size={22} />, title: 'Our Mission', text: 'To bridge the gap between traditional learning and modern technology — delivering a seamless, transparent, and efficient school management experience for every stakeholder involved.' },
              { icon: <Heart size={22} />, title: 'Our Vision', text: "An environment where students don't just learn — they thrive. Every child in the Nexus community deserves personalized support, clear pathways, and digital-first education." },
            ].map((card, i) => (
              <div key={i} className="mv-card group relative bg-white border-[1.5px] border-slate-200 rounded-[28px] p-10 hover:border-blue-200 hover:shadow-[0_16px_48px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all overflow-hidden">
                <div className="mv-card-bar" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-[14px] flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {card.icon}
                  </div>
                  <h3 className="text-slate-900 font-black text-[22px]">{card.title}</h3>
                </div>
                <p className="text-slate-600 text-[15px] leading-[1.78]">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
              alt="Students"
              className="w-full block rounded-4xl border-[5px] border-white sticky top-8"
              style={{ aspectRatio: '3/4', objectFit: 'cover', boxShadow: '0 20px 64px rgba(15,23,42,0.1)' }}
            />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full px-5 py-2.5 text-[13px] font-bold text-slate-800 whitespace-nowrap flex items-center gap-2 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
              <span className="live-dot w-2 h-2 rounded-full bg-green-400 shrink-0" />
              Learning in progress
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="rounded-t-[48px] px-20 py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#eff6ff 0%,#f0f9ff 40%,#fafbff 100%)' }}>
        <div className="absolute -top-20 -right-20 w-120 h-120 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,#bfdbfe66,transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-[320px] h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,#dbeafe55,transparent 70%)' }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-16 gap-10">
            <div>
              <div className="flex items-center gap-3 text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                <span className="w-6 h-0.5 bg-blue-600 rounded" />Why Nexus
              </div>
              <h2 className="font-black text-slate-900 leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(34px,4vw,54px)' }}>
                Everything your school needs,{' '}
                <span className="text-blue-600">beautifully</span> unified
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group relative bg-white border-[1.5px] border-slate-200 rounded-[28px] p-10 hover:border-blue-200 hover:shadow-[0_16px_48px_rgba(37,99,235,0.1)] hover:-translate-y-1.5 transition-all overflow-hidden cursor-default">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-[8deg] group-hover:scale-105 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-slate-900 font-black text-[20px] mb-3">{f.title}</h3>
                <p className="text-slate-600 text-[14px] leading-[1.75]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;