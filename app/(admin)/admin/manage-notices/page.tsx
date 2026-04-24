"use client"
import { useState } from 'react'
import { addNotice } from '@/actions/notices'
import { Bell, ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function ManageNotices() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await addNotice(formData)
    setLoading(false)

    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error || "Failed to add notice")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/admin/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-blue-600 text-white rounded-3xl mb-6 shadow-xl shadow-blue-100">
            <Bell className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Notice</h1>
          <p className="text-slate-500 mt-2">Publish an announcement for all residents to see</p>
        </div>

        <div className="premium-card p-10 bg-white border-slate-200 shadow-2xl">
          <form action={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notice Title</label>
                <input 
                  name="title" 
                  required 
                  placeholder="e.g. Maintenance Check This Friday"
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notice Content</label>
                <textarea 
                  name="content" 
                  required 
                  rows={8} 
                  placeholder="Provide all relevant details here..."
                  className="input-field resize-none" 
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className={cn(
                "w-full flex items-center justify-center gap-2 btn-primary",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? "Publishing..." : (
                <>
                  Publish Notice
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
