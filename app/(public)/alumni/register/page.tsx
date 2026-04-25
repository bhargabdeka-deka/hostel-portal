"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { GraduationCap, Send, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AlumniRegistration() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase.from("alumni").insert([{
      name: formData.get("name"),
      phone: formData.get("phone"),
      batch: formData.get("batch"),
      job: formData.get("job"),
      company: formData.get("company"),
      social_link: formData.get("social_link"),
      status: 'pending' // Rule: Always pending on submission
    }])

    // Artificial delay for better UX visibility
    await new Promise(resolve => setTimeout(resolve, 1200))

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-32 px-6 text-center">
        <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Registration Successful</h1>
        <p className="text-slate-600 mb-8">
          Your details have been submitted for review. Once approved, you will be part of our official Alumni network.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="btn-primary"
        >
          Register Another Member
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <div className="inline-flex p-4 bg-indigo-600/10 rounded-2xl mb-8">
            <GraduationCap className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Join the <span className="text-indigo-600">Alumni Network</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Stay connected with ORION Hostel. Join our network to mentor current residents, network with peers, and stay updated with alumni events.
          </p>
          
          <div className="space-y-8">
            {["Professional Networking", "Mentorship Opportunities", "Annual Alumni Meets"].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-none w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                <span className="text-lg font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-10 md:p-12 bg-white border-slate-200 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 tracking-tight ml-1">Full name <span className="text-red-500">*</span></label>
                <input name="name" required placeholder="John Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-slate-900 font-bold placeholder:text-slate-300 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 tracking-tight ml-1">Phone number <span className="text-red-500">*</span></label>
                <input name="phone" required placeholder="+91..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-slate-900 font-bold placeholder:text-slate-300 text-sm" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Batch (Year of Passing) <span className="text-red-500">*</span></label>
              <input name="batch" required placeholder="e.g. 2018-2022" className="input-field" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Occupation <span className="text-red-500">*</span></label>
                <input name="job" required placeholder="e.g. Engineer, Business, Govt." className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Organization/Business <span className="text-red-500">*</span></label>
                <input name="company" required placeholder="Workplace or Company" className="input-field" />
              </div>
            </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 tracking-tight ml-1">Social link (LinkedIn/Portfolio)</label>
                <input name="social_link" placeholder="https://linkedin.com/in/..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-slate-900 font-bold placeholder:text-slate-300 text-sm" />
              </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-4.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm tracking-tight transition-all active:scale-95 shadow-xl shadow-indigo-900/20 mt-4",
                loading && "opacity-70"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Send className="w-4.5 h-4.5" />
                  Register as alumni
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
