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
      <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-[-0.03em] font-jakarta">Share a Memory</h2>
          <div className="inline-flex items-center px-5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.25em] font-jakarta">
            Contribute to the ORION Legacy
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 lg:col-span-1 space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 font-jakarta">Full Name</label>
            <input 
              required
              name="fullName"
              placeholder="Ex: Bhargab Deka"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 font-jakarta">Batch</label>
            <input 
              required
              name="batch"
              placeholder="2020-24"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 font-jakarta">Branch</label>
            <input 
              required
              name="branch"
              placeholder="Civil"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 font-jakarta">Room (Opt)</label>
            <input 
              name="roomNumber"
              placeholder="42"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 font-jakarta">Memory Title</label>
          <input 
            required
            name="title"
            placeholder="The Night of the Storm..."
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 font-jakarta">Detailed Memory / Story</label>
          <textarea 
            required
            name="story"
            rows={5}
            placeholder="Tell your story..."
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-bold text-slate-900 resize-none placeholder:text-slate-300 placeholder:font-medium"
          ></textarea>
        </div>

        <div className="flex items-center gap-3 ml-1">
          <input 
            type="checkbox" 
            required 
            id="consent"
            className="w-4 h-4 rounded text-slate-900 focus:ring-slate-500 cursor-pointer"
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
          className="w-full py-4 bg-[#0F172A] text-white rounded-[1.25rem] font-bold text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-100/50 hover:bg-[#1e293b] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send className="w-4 h-4 text-indigo-400" />
              Submit Memory
            </>
          )}
        </button>
      </form>
    </div>
  );
}
