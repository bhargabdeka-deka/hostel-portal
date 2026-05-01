"use client"
import { useState } from 'react';
import { submitMemory } from '@/actions/memory-actions';
import { CheckCircle2, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MemorySubmissionForm({ onClose }: { onClose?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      batch: formData.get('batch') as string,
      roomNumber: formData.get('roomNumber') as string,
      title: formData.get('title') as string,
      story: formData.get('story') as string,
    };

    const res = await submitMemory(data);

    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 3000);
    } else {
      setError(res.error || "Failed to submit memory");
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="p-12 text-center space-y-6 bg-white rounded-[2.5rem] shadow-2xl">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Memory Submitted!</h3>
          <p className="text-slate-500 font-medium">Your story has been sent for admin approval. It will be visible once approved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
      <div className="p-8 md:p-12 border-b border-slate-50 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Share a Memory</h2>
          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">Contribute to the ORION Legacy</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
            <input 
              required
              name="fullName"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Batch</label>
            <input 
              required
              name="batch"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Room (Opt)</label>
            <input 
              name="roomNumber"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Memory Title</label>
          <input 
            required
            name="title"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Detailed Memory / Story</label>
          <textarea 
            required
            name="story"
            rows={6}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 resize-none"
          ></textarea>
        </div>

        <div className="flex items-center gap-3 ml-1">
          <input 
            type="checkbox" 
            required 
            id="consent"
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="consent" className="text-xs font-bold text-slate-500 tracking-tight cursor-pointer">
            i confirm this submission
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold tracking-tight">
            {error}
          </div>
        )}

        <button 
          disabled={isSubmitting}
          className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Memory
            </>
          )}
        </button>
      </form>
    </div>
  );
}
