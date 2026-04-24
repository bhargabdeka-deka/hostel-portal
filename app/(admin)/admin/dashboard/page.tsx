import { createClient } from "@/lib/supabase/server"
import { Megaphone, Trophy, UserCheck, Trash2, Plus, Clock, ExternalLink } from 'lucide-react'
import { addNotice, deleteNotice, updateMonitor, updateComplaintStatus } from "@/actions/admin-actions"
import Link from 'next/link'
import { revalidatePath } from "next/cache"
import { cn } from "@/lib/utils"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: notices } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(3)
  const { data: achievements } = await supabase.from('achievements').select('*').order('date', { ascending: false }).limit(3)
  const { data: monitors } = await supabase.from('monitors').select('*').order('role', { ascending: true })
  const { data: complaints } = await supabase.from('complaints').select('*').order('created_at', { ascending: false }).limit(3)

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage portal content, hostel monitors, and broadcast important notices.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            Active Roster
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Legacy & Info */}
        <div className="lg:col-span-7 space-y-10">
          <section className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-white shadow-3xl shadow-slate-200">
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                Our Legacy
              </div>
              <h2 className="text-5xl font-bold tracking-tight font-heading leading-tight">
                Excellence Since <span className="text-blue-500">1982</span>
              </h2>
              <div className="space-y-6 text-slate-400 font-medium leading-relaxed text-lg max-w-xl">
                <p>
                  Hostel 7, famously known as <span className="text-white font-bold italic">ORION</span>, is more than just a residence—it is a crucible of academic brilliance and lifelong brotherhood.
                </p>
                <p>
                  From these halls, thousands of engineers have ventured out to shape the world. As administrators, our mission is to preserve this sanctity, ensuring every resident feels safe, empowered, and inspired.
                </p>
              </div>
              
              <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-black text-white font-heading">5000+</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Global Alumni</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white font-heading">42 Years</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Hostel History</div>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
          </section>

          <section className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight font-heading">Administrator Motto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Preserve Discipline", desc: "Maintain the decorum that defines a Sevenite." },
                { title: "Empower Students", desc: "Ensure every voice is heard and every issue resolved." },
                { title: "Foster Innovation", desc: "Support the technical and creative pursuits of residents." },
                { title: "Build Community", desc: "Strengthen the bond between seniors, juniors, and alumni." }
              ].map((motto, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{motto.title}</div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{motto.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Broadcast & Notices */}
        <div className="lg:col-span-5 space-y-10">
          {/* Broadcast Notice Form */}
          <section className="p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Megaphone className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 font-heading">Broadcast Notice</h2>
              </div>
              
              <form action={async (formData) => {
                "use server"
                const title = formData.get('title') as string
                const content = formData.get('content') as string
                await addNotice(title, content)
              }} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest ml-1">Notice Title</label>
                  <input name="title" required placeholder="e.g. Water Supply Interruption" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-medium placeholder:text-slate-300" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest ml-1">Message Body</label>
                  <textarea name="content" required placeholder="Provide details here..." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-medium resize-none placeholder:text-slate-300"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                  Send Notice
                </button>
              </form>
            </div>
          </section>

          {/* Active Notices List */}
          <section className="p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3 font-heading uppercase tracking-tight">
                 Active Notices
              </h2>
              <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                Latest
              </div>
            </div>
            <div className="space-y-4">
              {notices?.map((notice) => (
                <div key={notice.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all duration-500 border border-transparent hover:border-slate-100">
                  <div className="min-w-0 pr-4">
                    <h4 className="text-sm font-bold text-slate-900 truncate uppercase tracking-tight font-heading">{notice.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(notice.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <form action={async () => {
                    "use server"
                    await deleteNotice(notice.id)
                  }}>
                    <button className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ))}
              {(!notices || notices.length === 0) && (
                <p className="text-center py-10 text-slate-400 text-[10px] font-black uppercase tracking-widest">No active notices</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
