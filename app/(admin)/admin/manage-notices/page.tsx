import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, Bell } from 'lucide-react'
import Link from 'next/link'
import { NoticeForm } from '@/components/admin/NoticeForm'
import { NoticeList } from '@/components/admin/NoticeList'

export default async function ManageNotices() {
  const supabase = await createClient()
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link 
              href="/admin/dashboard" 
              className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Broadcast Hub</h1>
            <p className="text-slate-500 font-medium">Manage and publish official announcements for all residents.</p>
          </div>
          <div className="hidden md:block p-6 bg-white border border-slate-200 text-blue-600 rounded-[2rem] shadow-lg">
            <Bell className="w-10 h-10" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <NoticeForm />
          </div>
          <div className="lg:col-span-3">
            <NoticeList notices={notices || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
