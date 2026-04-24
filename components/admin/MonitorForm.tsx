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
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    const name = formData.get('name') as string;
    const room = formData.get('room') as string;
    const phone = formData.get('phone') as string;
    
    try {
      const result = await updateMonitor(monitor.id, name, room, phone);
      if (result && !result.error) {
        setSaveSuccess(true);
        router.refresh(); // Force refresh the data
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 group hover:shadow-xl transition-all duration-500">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
          <UserCheck className="w-7 h-7" />
        </div>
        <div>
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{monitor.role}</div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">Active Assignment</div>
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
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-900"
                placeholder="Enter monitor name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Room Number (Digits Only)</label>
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
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-900"
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
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-900"
                  placeholder="e.g. +91 98765..."
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
            saveSuccess 
              ? "bg-green-600 text-white shadow-green-100 ring-4 ring-green-500/20" 
              : "bg-slate-900 text-white shadow-slate-100 hover:bg-slate-800"
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
        {saveSuccess && (
          <p className="text-center text-green-600 font-black text-[9px] uppercase tracking-widest animate-bounce">
            Live site updated!
          </p>
        )}
      </form>
    </div>
  );
}
