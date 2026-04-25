"use client"
import { useState } from 'react'
import { addNotice } from '@/actions/notices'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NoticeForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(false)
    const result = await addNotice(formData)
    setLoading(false)

    if (result.success) {
      setSuccess(true)
      const form = document.getElementById('notice-form') as HTMLFormElement
      form?.reset()
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(result.error || "Failed to add notice")
    }
  }

  return (
    <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Post New Notice</h3>
      <form id="notice-form" action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Title</label>
            <input 
              name="title" 
              required 
              placeholder="e.g. Mess Menu Update"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/10 focus:bg-white transition-all text-sm font-medium" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Content</label>
            <textarea 
              name="content" 
              required 
              rows={6} 
              placeholder="Details of the announcement..."
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/10 focus:bg-white transition-all text-sm font-medium resize-none" 
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <button 
          disabled={loading || success}
          className={cn(
            "w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2",
            success ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20"
          )}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : success ? (
            "Notice Published!"
          ) : (
            <>
              Broadcast Notice
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
