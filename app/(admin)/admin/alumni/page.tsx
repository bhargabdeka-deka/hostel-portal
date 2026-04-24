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
    <div className="py-20 px-12 lg:px-20 antialiased">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-slate-100 pb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">ALUMNI MANAGEMENT</h1>
          <p className="text-slate-500 mt-2 font-medium">Verify and curate the official ORION alumni directory.</p>
        </div>
        <div className="flex items-center gap-4">
           <form action={async () => {
             "use server"
             revalidatePath("/admin/alumni")
           }}>
             <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95">
               Sync Data
             </button>
           </form>
           <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
             <Users className="w-4 h-4 text-blue-600" />
             {alumni?.length || 0} Registered
           </div>
        </div>
      </div>

      {error && (
        <div className="mb-10 p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600">
          <p className="font-black uppercase tracking-widest text-[10px] mb-2">Database Error</p>
          <p className="font-bold">{error.message || "An unexpected error occurred while fetching alumni data."}</p>
          {error.code && <p className="text-[10px] mt-2 opacity-50">Error Code: {error.code}</p>}
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Candidate</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Professional</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {alumni?.map((person) => (
              <tr key={person.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-lg border border-blue-100">
                      {person.name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">{person.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Batch {person.batch}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tel: {person.phone}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-sm">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {person.job} at {person.company}
                    </div>
                    {person.social_link && (
                      <a 
                        href={person.social_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-blue-600 hover:underline text-[10px] font-black uppercase tracking-widest"
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
                    ? "bg-green-50 text-green-700 border-green-100" 
                    : "bg-amber-50 text-amber-700 border-amber-100"
                  )}>
                    {person.status}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center justify-end gap-3">
                    {person.status === 'pending' ? (
                      <form action={async () => {
                        "use server"
                        await updateAlumniStatus(person.id, 'approved')
                      }}>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/10">
                          Approve
                        </button>
                      </form>
                    ) : (
                      <form action={async () => {
                        "use server"
                        await updateAlumniStatus(person.id, 'pending')
                      }}>
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
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
          <div className="py-32 text-center bg-slate-50/50">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No registration requests found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
