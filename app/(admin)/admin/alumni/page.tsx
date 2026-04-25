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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-slate-200 pb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Alumni Management</h1>
          <p className="text-slate-600 mt-2 font-medium">Verify and curate the official ORION alumni directory.</p>
        </div>
        <div className="flex items-center gap-4">
           <form action={async () => {
             "use server"
             revalidatePath("/admin/alumni")
           }}>
             <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-lg text-[11px] font-bold tracking-tight flex items-center gap-2 hover:bg-emerald-500 transition-all active:scale-95 shadow-emerald-900/20">
               Sync data
             </button>
           </form>
           <div className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm text-[11px] font-bold tracking-tight flex items-center gap-2 text-slate-900">
             <Users className="w-4 h-4 text-blue-600" />
             {alumni?.length || 0} Registered
           </div>
        </div>
      </div>

      {error && (
        <div className="mb-10 p-6 bg-red-50 border-2 border-red-100 rounded-2xl text-red-600">
          <p className="font-black uppercase tracking-widest text-[10px] mb-2">Database Error</p>
          <p className="font-bold">{error.message || "An unexpected error occurred while fetching alumni data."}</p>
          {error.code && <p className="text-[10px] mt-2 opacity-50">Error Code: {error.code}</p>}
        </div>
      )}

      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {alumni?.map((person) => (
          <div key={person.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-6 space-y-6 shadow-lg relative overflow-hidden group">
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl border border-blue-100 shrink-0">
                  {person.name?.[0] || '?'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-slate-900 text-lg tracking-tight uppercase truncate">{person.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      Batch {person.batch}
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold px-3 py-1 rounded-full border tracking-tight",
                      person.status === 'approved' 
                      ? "bg-green-50 text-green-700 border-green-100" 
                      : "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3" />
                    Professional Role
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    {person.job} at {person.company}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    Contact Number
                  </div>
                  <div className="text-xs font-bold text-slate-600">{person.phone || 'N/A'}</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex gap-3">
                  {person.status === 'pending' ? (
                    <form action={async () => {
                      "use server"
                      await updateAlumniStatus(person.id, 'approved')
                    }} className="flex-1">
                      <button className="w-full bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                        Approve
                      </button>
                    </form>
                  ) : (
                    <form action={async () => {
                      "use server"
                      await updateAlumniStatus(person.id, 'pending')
                    }} className="flex-1">
                      <button className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95">
                        Revoke
                      </button>
                    </form>
                  )}
                  <DeleteAlumniButton id={person.id} />
                </div>
                
                {person.social_link && (
                  <a 
                    href={person.social_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    <ExternalLink className="w-3 h-3 text-blue-600" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {(!alumni || alumni.length === 0) && !error && (
          <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <p className="text-slate-400 font-bold tracking-tight text-sm">No registration requests found.</p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-[2.5rem] border border-slate-200 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[13px] font-bold text-slate-900 tracking-tight font-jakarta">Candidate</th>
                <th className="px-10 py-6 text-[13px] font-bold text-slate-900 tracking-tight font-jakarta">Professional Details</th>
                <th className="px-10 py-6 text-[13px] font-bold text-slate-900 tracking-tight font-jakarta text-center">Status</th>
                <th className="px-10 py-6 text-[13px] font-bold text-slate-900 tracking-tight font-jakarta text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alumni?.map((person) => (
                <tr 
                  key={person.id} 
                  className="group relative transition-all duration-300 border-b border-slate-50 last:border-0 overflow-hidden hover:bg-blue-50"
                >
                  <td className="px-10 py-5 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-600/0 group-hover:bg-blue-600/40 transition-all duration-300" />
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg border border-blue-100">
                        {person.name?.[0] || '?'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg tracking-tight">{person.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-[11px] font-bold text-blue-600 tracking-tight">Batch {person.batch}</p>
                          <p className="text-[11px] font-medium text-slate-400 tracking-tight">Tel: {person.phone}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm tracking-tight">
                        <Briefcase className="w-4 h-4 text-indigo-500" />
                        {person.job} <span className="text-slate-400 font-medium">at</span> {person.company}
                      </div>
                      {person.social_link && (
                        <a 
                          href={person.social_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-[11px] font-bold tracking-tight transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className={cn(
                      "inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold border tracking-tight",
                      person.status === 'approved' 
                      ? "bg-green-50 text-green-700 border-green-100" 
                      : "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-10 py-5">
                    <div className="flex items-center justify-end gap-3">
                      {person.status === 'pending' ? (
                        <form action={async () => {
                          "use server"
                          await updateAlumniStatus(person.id, 'approved')
                        }}>
                          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-[12px] font-bold tracking-tight hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-900/20">
                            Approve
                          </button>
                        </form>
                      ) : (
                        <form action={async () => {
                          "use server"
                          await updateAlumniStatus(person.id, 'pending')
                        }}>
                          <button className="bg-slate-100 text-slate-900 px-6 py-3 rounded-xl text-[12px] font-bold tracking-tight hover:bg-slate-200 transition-all active:scale-95">
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
            <div className="py-32 text-center bg-slate-50">
              <p className="text-slate-400 font-bold tracking-tight text-sm">No registration requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
