"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, Shield, Home, Save, CheckCircle2, Phone } from 'lucide-react';
import { updateMonitor } from "@/actions/admin-actions";

interface Monitor {
  id: string;
  role: string;
  name: string;
  room: string;
  phone?: string;
}

const COLOR_SCHEMES = [
  { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', hover: 'group-hover:bg-blue-600', ring: 'focus:ring-blue-500/10', focus: 'focus:border-blue-500', btn: 'bg-blue-600 hover:bg-blue-700 shadow-md' },
  { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', hover: 'group-hover:bg-emerald-600', ring: 'focus:ring-emerald-500/10', focus: 'focus:border-emerald-500', btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-md' },
  { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', hover: 'group-hover:bg-rose-600', ring: 'focus:ring-rose-500/10', focus: 'focus:border-rose-500', btn: 'bg-rose-600 hover:bg-rose-700 shadow-md' },
  { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', hover: 'group-hover:bg-amber-600', ring: 'focus:ring-amber-500/10', focus: 'focus:border-amber-500', btn: 'bg-amber-600 hover:bg-amber-700 shadow-md' },
  { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', hover: 'group-hover:bg-violet-600', ring: 'focus:ring-violet-500/10', focus: 'focus:border-violet-500', btn: 'bg-violet-600 hover:bg-violet-700 shadow-md' },
  { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', hover: 'group-hover:bg-cyan-600', ring: 'focus:ring-cyan-500/10', focus: 'focus:border-cyan-500', btn: 'bg-cyan-600 hover:bg-cyan-700 shadow-md' },
];

export default function MonitorForm({ monitor, index = 0 }: { monitor: Monitor, index?: number }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const color = COLOR_SCHEMES[index % COLOR_SCHEMES.length];

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMsg(null);
    
    const name = formData.get('name') as string;
    const room = formData.get('room') as string;
    const phone = formData.get('phone') as string;
    
    try {
      const result = await updateMonitor(monitor.id, name, room, phone);
      if (result && result.success) {
        setSaveSuccess(true);
        router.refresh();
        setTimeout(() => setSaveSuccess(false), 3000);
      } else if (result?.error) {
        setErrorMsg(result.error);
      }
    } catch (error: any) {
      setErrorMsg("An unexpected error occurred");
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-lg space-y-8 group hover:border-blue-100 transition-all duration-300 relative`}>
      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center transition-all duration-300 border ${color.border} group-hover:bg-blue-600 group-hover:text-white`}>
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <div className={`text-[10px] font-black uppercase tracking-widest ${color.text}`}>{monitor.role}</div>
            <div className="text-xl font-bold text-slate-900 tracking-tight">CURRENT MONITOR</div>
          </div>
        </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                name="name"
                type="text" 
                defaultValue={monitor.name}
                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 transition-all font-bold text-slate-900 placeholder:text-slate-400 ${color.ring} ${color.focus}`}
                placeholder="Enter monitor name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Room Number</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  name="room"
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  defaultValue={monitor.room === 'N/A' ? '' : monitor.room}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 transition-all font-bold text-slate-900 placeholder:text-slate-400 ${color.ring} ${color.focus}`}
                  placeholder="e.g. 104"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  name="phone"
                  type="text" 
                  defaultValue={monitor.phone || ''}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 transition-all font-bold text-slate-900 placeholder:text-slate-400 ${color.ring} ${color.focus}`}
                  placeholder="e.g. +91 98765..."
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-xl ${
            saveSuccess 
              ? "bg-green-600 text-white shadow-green-900/20 ring-4 ring-green-500/20" 
              : `${color.btn} text-white`
          } disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved Successfully
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
        {errorMsg && (
          <p className="text-center text-red-600 font-black text-[9px] uppercase tracking-widest bg-red-50 p-3 rounded-xl border border-red-100">
            Error: {errorMsg}
          </p>
        )}
        {saveSuccess && (
          <p className="text-center text-green-500 font-black text-[9px] uppercase tracking-widest animate-bounce">
            Live site updated!
          </p>
        )}
      </form>
    </div>
    </div>
  );
}
