"use client"
import { useState } from 'react'
import { deleteNotice } from '@/actions/notices'
import { Trash2, Calendar, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NoticeListProps {
  notices: any[]
}

export function NoticeList({ notices: initialNotices }: NoticeListProps) {
  const [notices, setNotices] = useState(initialNotices)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this notice? It will disappear from all user pages immediately.")) return

    setDeletingId(id)
    const result = await deleteNotice(id)
    
    if (result.success) {
      setNotices(notices.filter(n => n.id !== id))
    }
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 mb-8 uppercase tracking-tight">Active Notices</h3>
      
      {notices.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
          <p className="text-slate-400 text-sm font-medium italic">No active notices found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start justify-between group hover:shadow-lg transition-all duration-500">
              <div className="space-y-2 flex-1 pr-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(notice.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {notice.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
                  {notice.content}
                </p>
              </div>
              
              <button 
                onClick={() => handleDelete(notice.id)}
                disabled={deletingId === notice.id}
                className="p-4 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-300"
              >
                {deletingId === notice.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
