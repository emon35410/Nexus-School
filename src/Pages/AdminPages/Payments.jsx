import { 
  PlusCircle, 
  Layers, 
  FileText, 
  DollarSign, 
  Calendar, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

// --- Premium FormField Component ---
const PremiumField = ({ id, label, icon, register, isSelect, options, placeholder, type = "text", error, required }) => (
    <div className='w-full mb-6 '>
        <label htmlFor={id} className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 flex items-center gap-2 ml-1">
            {label} {required && <span className="text-rose-500">*</span>}
        </label>
        
        <div className="relative group">
            {/* Input Wrapper with Fixed Border */}
            <div className={`flex items-center bg-[#111827] border-2 ${error ? 'border-rose-500/50' : 'border-slate-800'} rounded-2xl overflow-hidden transition-all duration-300 group-focus-within:border-blue-600 group-focus-within:shadow-[0_0_20px_rgba(37,99,235,0.15)]`}>
                
                {/* Icon Section */}
                <div className="pl-4 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    {icon}
                </div>

                {isSelect ? (
                    <div className="relative w-full">
                        <select
                            id={id}
                            className="w-full bg-transparent p-4 text-slate-200 outline-none appearance-none cursor-pointer text-sm font-medium"
                            defaultValue=""
                            {...register(id, { required: required })}
                        >
                            <option value="" disabled className="bg-[#0F172A]">{placeholder}</option>
                            {options?.map((option, i) => (
                                <option key={i} value={option.value} className="bg-[#1F2937]">
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                ) : (
                    <input 
                        id={id}
                        type={type}
                        className="w-full bg-transparent p-4 text-slate-200 placeholder:text-slate-700 outline-none text-sm font-medium"
                        placeholder={placeholder}
                        {...register(id, { required: required })}
                    />
                )}
            </div>
            
            {error && (
                <span className="text-[10px] font-bold text-rose-500 mt-1 ml-2 flex items-center gap-1">
                    ● {label} is required
                </span>
            )}
        </div>
    </div>
);

const CreatePayment = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const onSubmit = (data) => {
        console.log("Payment Created:", data);
        alert("Payment Entry Successfully Created!");
        reset();
    };

    return (
        <div className="min-h-screen border border-gray-600/20 rounded-2xl text-slate-200 p-6 md:p-12 selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto">
                
                {/* --- TOP NAV / BREADCRUMB --- */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    <span>Finance</span>
                    <span>/</span>
                    <span className="text-blue-500">Create Entry</span>
                </div>

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight leading-none">Generate Billing</h1>
                        <p className="text-slate-500 mt-3 text-sm font-medium">Configure and broadcast new payment requirements to classes.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter text-nowrap">System Operational</span>
                    </div>
                </div>

                {/* --- MAIN FORM CARD --- */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    <div className="bg-[#0F172A] border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative Background Accents */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                            
                            {/* Left Column */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                                    Basic Information
                                </h3>
                                
                                <PremiumField 
                                    id="payments_name" 
                                    label="Payment Title" 
                                    placeholder='e.g. Monthly Tuition Fee' 
                                    icon={<FileText size={18} />} 
                                    register={register}
                                    error={errors.payments_name}
                                    required={true}
                                />

                                <PremiumField 
                                    id="amount" 
                                    type="number"
                                    label="Amount (BDT)" 
                                    placeholder='5000' 
                                    icon={<DollarSign size={18} />} 
                                    register={register}
                                    error={errors.amount}
                                    required={true}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <div className="w-1 h-5 bg-indigo-600 rounded-full"></div>
                                    Target & Timeline
                                </h3>

                                <PremiumField 
                                    id="class_name" 
                                    label="Select Target Class" 
                                    isSelect 
                                    placeholder="Choose Class"
                                    options={[
                                        { label: 'Class 6', value: '6' },
                                        { label: 'Class 7', value: '7' },
                                        { label: 'Class 8', value: '8' },
                                        { label: 'Class 9', value: '9' },
                                        { label: 'Class 10', value: '10' },
                                    ]}
                                    icon={<Layers size={18} />} 
                                    register={register}
                                    error={errors.class_name}
                                    required={true}
                                />

                                <PremiumField 
                                    id="due_date" 
                                    type="date"
                                    label="Payment Deadline" 
                                    icon={<Calendar size={18} />} 
                                    register={register}
                                    error={errors.due_date}
                                    required={true}
                                />
                            </div>
                        </div>

                        {/* Text Area (Full Width) */}
                        <div className="mt-4">
                            <label className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 flex items-center gap-2 ml-1">
                                <ShieldCheck size={14} className="text-blue-500" /> Payment Description / Remarks
                            </label>
                            <textarea 
                                className="w-full bg-[#111827] border-2 border-slate-800 rounded-2xl p-4 text-slate-200 placeholder:text-slate-700 outline-none text-sm font-medium focus:border-blue-600 transition-all min-h-[120px]"
                                placeholder="Add any specific instructions for students..."
                                {...register("description")}
                            ></textarea>
                        </div>
                    </div>

                    {/* --- ACTION BUTTON --- */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <button 
                            type="submit" 
                            className="w-full md:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 group active:scale-[0.98]"
                        >
                            <span>Generate Payment Entry</span>
                            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                        </button>
                        
                        <div className="flex items-center gap-2 text-slate-600">
                            <ShieldCheck size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted Transaction</span>
                        </div>
                    </div>
                </form>

                {/* --- FOOTER --- */}
                <footer className="mt-20 py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-700 text-[10px] font-bold uppercase tracking-widest">© 2026 Admin Management System</p>
                    <div className="flex gap-6">
                        <span className="text-slate-700 text-[10px] font-bold uppercase cursor-pointer hover:text-blue-500 transition-colors">Support</span>
                        <span className="text-slate-700 text-[10px] font-bold uppercase cursor-pointer hover:text-blue-500 transition-colors">Privacy Policy</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CreatePayment;