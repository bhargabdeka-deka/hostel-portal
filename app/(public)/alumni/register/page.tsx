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
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex p-3 bg-blue-600/10 rounded-2xl mb-6">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
            Join the <span className="text-blue-600">Alumni Network</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Stay connected with ORION Hostel. Join our network to mentor current residents, network with peers, and stay updated with alumni events.
          </p>
          
          <div className="space-y-6">
            {["Professional Networking", "Mentorship Opportunities", "Annual Alumni Meets"].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-none w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card p-8 bg-white border-slate-200 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Full Name</label>
                <input name="name" required placeholder="John Doe" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phone Number</label>
                <input name="phone" required placeholder="+1 234..." className="input-field" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Batch (Year of Passing)</label>
              <input name="batch" required placeholder="e.g. 2018-2022" className="input-field" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Designation</label>
                <input name="job" required placeholder="Software Engineer" className="input-field" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Company</label>
                <input name="company" required placeholder="Google" className="input-field" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Social Link (LinkedIn/Portfolio)</label>
              <input name="social_link" placeholder="https://linkedin.com/in/..." className="input-field" />
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
                "w-full flex items-center justify-center gap-2 btn-primary mt-4",
                loading && "opacity-70"
              )}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
              Register as Alumni
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
