"use client"
import { useState } from 'react'
import { submitComplaint } from '@/actions/complaints'
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ComplaintPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await submitComplaint(formData)
    setLoading(false)
    
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error || "Something went wrong")
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-32 px-6 text-center">
        <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Complaint Submitted</h1>
        <p className="text-slate-600 mb-8">
          Thank you for reporting the issue. Management will review your request within 24 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="btn-primary"
        >
          Submit Another Issue
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20 px-6 min-h-screen">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-6 mb-10">
            <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-blue-600 text-[10px] md:text-[11px] font-black tracking-[0.15em] uppercase font-jakarta">
              Swift Resolution
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.06em] leading-[1.1] sm:leading-[0.95] mb-8 font-jakarta">
            Report an <span className="text-blue-600">Issue</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Help us maintain a comfortable environment for everyone. Please provide as much detail as possible about the issue you&apos;re facing.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-none w-1 h-auto bg-blue-600 rounded-full"></div>
              <div>
                <h3 className="font-bold text-slate-900 uppercase text-sm">Swift Action</h3>
                <p className="text-slate-600 text-sm">Most maintenance issues are resolved within 48 hours.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-none w-1 h-auto bg-slate-200 rounded-full"></div>
              <div>
                <h3 className="font-bold text-slate-900 uppercase text-sm">Direct Tracking</h3>
                <p className="text-slate-600 text-sm">Management receives your report instantly on their dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-lg">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Your Name (Optional)</label>
                <input 
                  name="name" 
                  placeholder="e.g. John Doe"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Room Number</label>
                <input 
                  name="room" 
                  required 
                  placeholder="e.g. B-204"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Issue Description</label>
                <textarea 
                  name="issue" 
                  required 
                  rows={4} 
                  placeholder="Describe what's wrong..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-medium" 
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? "Submitting..." : (
                <>
                  Submit Report
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
