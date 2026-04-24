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

export default function MonitorForm({ monitor }: { monitor: Monitor }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

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
    <div className="live-border bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 group hover:shadow-blue-500/10 transition-all duration-500 relative">
      {/* Lighting highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-blue-500/20">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{monitor.role}</div>
            <div className="text-xl font-bold text-white tracking-tight">CURRENT MONITOR</div>
          </div>
        </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                name="name"
                type="text" 
                defaultValue={monitor.name}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-white placeholder:text-slate-700"
                placeholder="Enter monitor name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Room Number (Digits Only)</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
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
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-white placeholder:text-slate-700"
                  placeholder="e.g. 104"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  name="phone"
                  type="text" 
                  defaultValue={monitor.phone || ''}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-white placeholder:text-slate-700"
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
              : "bg-blue-600 text-white shadow-blue-900/20 hover:bg-blue-500"
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
          <p className="text-center text-red-500 font-black text-[9px] uppercase tracking-widest bg-red-500/10 p-3 rounded-xl border border-red-500/20">
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
