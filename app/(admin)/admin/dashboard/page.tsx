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
    <div className="space-y-8 md:space-y-10 max-w-[1600px] mx-auto overflow-x-hidden">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none font-heading">Dashboard Overview</h1>
        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed max-w-4xl">
          Centralized administrative hub to oversee ORION operations. Effortlessly manage administrative access, update monitor assignments, curate achievement galleries, and broadcast critical announcements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Left: Legacy & Info */}
        <div className="lg:col-span-7 space-y-8 md:space-y-10">
          <section className="relative rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-20 shadow-xl overflow-hidden border border-slate-200">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/hostel_about.jpeg" 
                alt="ORION Hostel" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/90"></div>
            </div>

            <div className="relative z-10 space-y-6 md:space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                Our Legacy
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight font-heading">
                Excellence Since <span className="text-blue-600">1982</span>
              </h2>
              <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-sm md:text-lg max-w-xl">
                <p>
                  Hostel 7, famously known as <span className="text-slate-900 font-bold italic">ORION</span>, is a crucible of academic brilliance and lifelong brotherhood.
                </p>
              </div>
              
              <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">800+</div>
                  <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Global Alumni</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">42 Years</div>
                  <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hostel History</div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-lg space-y-8">
            <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">Administrator Motto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { title: "Preserve Discipline", desc: "Maintain the decorum that defines a Sevenite." },
                { title: "Empower Students", desc: "Ensure every voice is heard and every issue resolved." },
                { title: "Foster Innovation", desc: "Support the technical and creative pursuits of residents." },
                { title: "Build Community", desc: "Strengthen the bond between residents and alumni." }
              ].map((motto, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{motto.title}</div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{motto.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Broadcast & Notices */}
        <div className="lg:col-span-5 space-y-8 md:space-y-10">
          <section className="p-8 md:p-10 bg-white border border-slate-200 rounded-[3rem] shadow-lg relative group">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-blue-100">
                  <Megaphone className="w-6 h-6" />
                </div>
                <h2 className="text-lg md:text-xl font-black tracking-tight text-slate-900 uppercase">Broadcast Notice</h2>
              </div>
              
              <form action={async (formData) => {
                "use server"
                const title = formData.get('title') as string
                const content = formData.get('content') as string
                await addNotice(title, content)
              }} className="space-y-6">
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest ml-1">Notice Title</label>
                  <input name="title" required placeholder="e.g. Water Supply Notice" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-900 font-bold placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-widest ml-1">Message Body</label>
                  <textarea name="content" required placeholder="Provide details here..." rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-900 font-bold resize-none placeholder:text-slate-400"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                  Send Notice
                </button>
              </form>
            </div>
          </section>

          <section className="p-8 md:p-10 bg-white border border-slate-200 rounded-[3rem] shadow-lg space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Active Board</h2>
              <div className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-[8px] font-black uppercase tracking-widest">Live</div>
            </div>
            <div className="space-y-4">
              {notices?.map((notice) => (
                <div key={notice.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between group hover:border-blue-100 transition-all duration-300 border border-slate-100 relative overflow-hidden">
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="min-w-0 pr-4 overflow-hidden">
                      <h4 className="text-sm font-black text-slate-900 truncate uppercase tracking-tight">{notice.title}</h4>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-tight mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-600" /> {new Date(notice.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <form action={async () => {
                      "use server"
                      await deleteNotice(notice.id)
                    }}>
                      <button className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
