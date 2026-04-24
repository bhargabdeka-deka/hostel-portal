import { createClient } from "@/lib/supabase/server"
import { updateAlumniStatus } from "@/actions/admin-actions"
import { Users, Check, X, ExternalLink, Briefcase } from 'lucide-react'
import DeleteAlumniButton from "@/components/admin/DeleteAlumniButton"
import { cn } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export default async function AdminAlumni() {
  const supabase = await createClient()
  const { data: alumni, error } = await supabase
    .from("alumni")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Supabase Error Details:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
  }

  return (
    <div className="py-20 px-4 md:px-12 lg:px-20 antialiased">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-white/5 pb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-heading">ALUMNI MANAGEMENT</h1>
          <p className="text-slate-500 mt-2 font-medium">Verify and curate the official ORION alumni directory.</p>
        </div>
        <div className="flex items-center gap-4">
           <form action={async () => {
             "use server"
             revalidatePath("/admin/alumni")
           }}>
             <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-500 transition-all active:scale-95 shadow-blue-900/20">
               Sync Data
             </button>
           </form>
           <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-white">
             <Users className="w-4 h-4 text-blue-500" />
             {alumni?.length || 0} Registered
           </div>
        </div>
      </div>

      {error && (
        <div className="mb-10 p-6 bg-red-500/10 border-2 border-red-500/20 rounded-[2rem] text-red-500">
          <p className="font-black uppercase tracking-widest text-[10px] mb-2">Database Error</p>
          <p className="font-bold">{error.message || "An unexpected error occurred while fetching alumni data."}</p>
          {error.code && <p className="text-[10px] mt-2 opacity-50">Error Code: {error.code}</p>}
        </div>
      )}

      <div className="live-border bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Candidate</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Professional</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {alumni?.map((person) => (
              <tr 
                key={person.id} 
                className="group relative transition-all duration-700 border-b border-white/[0.02] last:border-0 overflow-hidden hover:bg-blue-600/[0.04]"
              >
                <td className="px-10 py-5 relative">
                  {/* Subtle Glow Border Effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500/0 group-hover:bg-blue-500/40 transition-all duration-700" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center font-black text-lg border border-blue-500/20">
                      {person.name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg tracking-tight">{person.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Batch {person.batch}</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tel: {person.phone}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-300 font-bold text-sm">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      {person.job} at {person.company}
                    </div>
                    {person.social_link && (
                      <a 
                        href={person.social_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-10 py-8 text-center">
                  <span className={cn(
                    "inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    person.status === 'approved' 
                    ? "bg-green-600/10 text-green-500 border-green-500/20" 
                    : "bg-amber-600/10 text-amber-500 border-amber-500/20"
                  )}>
                    {person.status}
                  </span>
                </td>
                <td className="px-10 py-5">
                  <div className="flex items-center justify-end gap-3">
                    {person.status === 'pending' ? (
                      <form action={async () => {
                        "use server"
                        await updateAlumniStatus(person.id, 'approved')
                      }}>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                          Approve
                        </button>
                      </form>
                    ) : (
                      <form action={async () => {
                        "use server"
                        await updateAlumniStatus(person.id, 'pending')
                      }}>
                        <button className="bg-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                          Revoke
                        </button>
                      </form>
                    )}

                    <DeleteAlumniButton id={person.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!alumni || alumni.length === 0) && !error && (
          <div className="py-32 text-center bg-white/[0.01]">
            <p className="text-slate-600 font-black uppercase tracking-widest text-xs">No registration requests found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
