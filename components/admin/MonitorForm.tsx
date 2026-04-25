"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, Shield, Home, Save, CheckCircle2, Phone } from 'lucide-react';
import { updateMonitor } from "@/actions/admin-actions";
import { cn } from "@/lib/utils";

interface Monitor {
  id: string;
  role: string;
  name: string;
  room: string;
  phone?: string;
}

const COLOR_SCHEMES = [
  { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', hover: 'group-hover:bg-indigo-600', ring: 'focus:ring-indigo-500/10', focus: 'focus:border-indigo-500', btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-md', cardBg: 'bg-[#fafafc]' },
  { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', hover: 'group-hover:bg-amber-600', ring: 'focus:ring-amber-500/10', focus: 'focus:border-amber-500', btn: 'bg-amber-600 hover:bg-amber-700 shadow-md', cardBg: 'bg-[#fffcf5]' },
  { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', hover: 'group-hover:bg-rose-600', ring: 'focus:ring-rose-500/10', focus: 'focus:border-rose-500', btn: 'bg-rose-600 hover:bg-rose-700 shadow-md', cardBg: 'bg-[#fffaf9]' },
  { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', hover: 'group-hover:bg-indigo-600', ring: 'focus:ring-indigo-500/10', focus: 'focus:border-indigo-500', btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-md', cardBg: 'bg-[#faf9ff]' },
  { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', hover: 'group-hover:bg-violet-600', ring: 'focus:ring-violet-500/10', focus: 'focus:border-violet-500', btn: 'bg-violet-600 hover:bg-violet-700 shadow-md', cardBg: 'bg-[#fafafc]' },
  { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', hover: 'group-hover:bg-cyan-600', ring: 'focus:ring-cyan-500/10', focus: 'focus:border-cyan-500', btn: 'bg-cyan-600 hover:bg-cyan-700 shadow-md', cardBg: 'bg-[#f9fcff]' },
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
    <div className={cn("p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 shadow-lg space-y-8 group transition-all duration-300 relative overflow-hidden", color.cardBg)}>
      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center transition-all duration-300 border ${color.border} group-hover:bg-blue-600 group-hover:text-white`}>
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <div className={`text-[11px] font-bold tracking-tight ${color.text}`}>{monitor.role}</div>
            <div className="text-xl font-bold text-slate-900 tracking-tight">Current Monitor</div>
          </div>
        </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 tracking-tight mb-2 ml-1">Full Name</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input 
                name="name"
                type="text" 
                defaultValue={monitor.name}
                className={`w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-100 rounded-2xl outline-none focus:ring-4 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm ${color.ring} ${color.focus}`}
                placeholder="Enter monitor name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 tracking-tight mb-2 ml-1">Room Number</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  name="room"
                  type="text" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  defaultValue={monitor.room === 'N/A' ? '' : monitor.room}
                  className={`w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-100 rounded-2xl outline-none focus:ring-4 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm ${color.ring} ${color.focus}`}
                  placeholder="e.g. 104"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 tracking-tight mb-2 ml-1">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input 
                  name="phone"
                  type="text" 
                  defaultValue={monitor.phone || ''}
                  className={`w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-100 rounded-2xl outline-none focus:ring-4 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm ${color.ring} ${color.focus}`}
                  placeholder="e.g. +91 98765..."
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-4.5 rounded-2xl font-bold text-sm tracking-tight transition-all active:scale-95 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed",
            saveSuccess 
              ? "bg-green-600 text-white shadow-green-900/20" 
              : `bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/20`
          )}
        >
          {isSaving ? (
            <>
              <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving changes...
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4.5 h-4.5" />
              Changes saved
            </>
          ) : (
            <>
              <Save className="w-4.5 h-4.5" />
              Save changes
            </>
          )}
        </button>
        {errorMsg && (
          <p className="text-center text-red-600 font-bold text-[11px] tracking-tight bg-red-50 p-3 rounded-xl border border-red-100">
            Error: {errorMsg}
          </p>
        )}
      </form>
    </div>
    </div>
  );
}
