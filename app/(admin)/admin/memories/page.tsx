import { createClient } from "@/lib/supabase/server"
import { updateMemoryStatus, deleteMemory } from "@/actions/memory-actions"
import { BookOpen, Check, X, Trash2, User, Calendar, Tag, Home } from 'lucide-react'
import { cn } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export default async function AdminMemories() {
  const supabase = await createClient()
  const { data: memories, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="py-20 px-4 md:px-12 lg:px-20 antialiased">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-slate-200 pb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Memories Review</h1>
          <p className="text-slate-600 mt-2 font-medium">Moderate and approve stories shared by Orionites.</p>
        </div>
        <div className="flex items-center gap-4">
           <form action={async () => {
             "use server"
             revalidatePath("/admin/memories")
           }}>
             <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg text-xs font-semibold tracking-wide flex items-center gap-2 hover:bg-indigo-500 transition-all active:scale-95 shadow-indigo-900/20">
               Refresh List
             </button>
           </form>
           <div className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm text-xs font-semibold tracking-wide flex items-center gap-2 text-slate-900">
             <BookOpen className="w-4 h-4 text-rose-500" />
             {memories?.length || 0} Total Submissions
           </div>
        </div>
      </div>

      {error && (
        <div className="mb-10 p-6 bg-red-50 border-2 border-red-100 rounded-2xl text-red-600">
          <p className="font-bold tracking-tight text-[11px] mb-2">Database Error</p>
          <p className="font-bold">{error.message || "An unexpected error occurred while fetching memories."}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {memories?.map((memory) => (
          <div key={memory.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col group hover:border-indigo-200 transition-all">
            <div className="p-8 flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                  memory.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  memory.status === 'rejected' ? "bg-red-50 text-red-600 border-red-100" :
                  "bg-amber-50 text-amber-600 border-amber-100"
                )}>
                  {memory.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {new Date(memory.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight line-clamp-2">{memory.title}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-4 italic">"{memory.story}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <User className="w-3 h-3" /> Author
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 truncate">{memory.full_name}</div>
                  <div className="text-[9px] font-bold text-indigo-500">
                    Batch {memory.batch} • {memory.branch}
                  </div>
                </div>
                {memory.room_number && (
                  <div className="space-y-1">
                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Home className="w-2.5 h-2.5" /> Room
                    </div>
                    <div className="text-[11px] font-bold text-slate-700">{memory.room_number}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
              {memory.status !== 'approved' && (
                <form action={async () => {
                  "use server"
                  await updateMemoryStatus(memory.id, 'approved')
                }} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                </form>
              )}
              {memory.status !== 'rejected' && (
                <form action={async () => {
                  "use server"
                  await updateMemoryStatus(memory.id, 'rejected')
                }} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-100">
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </form>
              )}
              <form action={async () => {
                "use server"
                await deleteMemory(memory.id)
              }}>
                <button className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-xl transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!memories || memories.length === 0) && !error && (
          <div className="col-span-full py-40 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
             <p className="text-slate-400 font-bold tracking-tight text-sm">No memory submissions to review.</p>
          </div>
        )}
      </div>
    </div>
  )
}
