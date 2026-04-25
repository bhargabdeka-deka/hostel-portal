import { createClient } from "@/lib/supabase/server"
import { Shield, UserPlus, User, Trash2, ShieldCheck } from 'lucide-react'
import { getAdminRole } from "@/lib/supabase/auth-utils"
import { deleteUser } from "@/actions/users"
import { AddAdminForm } from "@/components/admin/AddAdminForm"
import { DeleteUserButton } from "@/components/admin/DeleteUserButton"
import { cn } from "@/lib/utils"

interface Profile {
  id: string
  email: string
  role: 'superadmin' | 'admin' | 'user'
}

export default async function TeamManagement() {
  const supabase = await createClient()

  // Fetch all users
  const { data: profilesData, error: profilesError } = await supabase
    .from('users')
    .select('*')
    .order('email', { ascending: true })

  const profiles = (profilesData || []) as Profile[]

  // Check if current user is superadmin
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  const currentRole = await getAdminRole()
  const isSuperAdmin = currentUser?.email === 'bhargab1234deka@gmail.com' || currentRole === 'superadmin'
  const isPrimarySuperAdmin = currentUser?.email === 'bhargab1234deka@gmail.com'

  // Ensure owner is in the list even if not in DB yet
  if (isPrimarySuperAdmin && !profiles.some(p => p.email === 'bhargab1234deka@gmail.com')) {
    profiles.unshift({
      id: currentUser?.id || 'owner',
      email: 'bhargab1234deka@gmail.com',
      role: 'superadmin'
    })
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4 lg:px-0 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Team Management</h1>
          <p className="text-slate-600 mt-2 text-base font-medium">Manage administrator access and roles for the ORION portal.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Add Administrator Form */}
        <div className="lg:col-span-4">
          <AddAdminForm isSuperAdmin={isSuperAdmin} />
        </div>

        {/* Right: Active Team Members */}
        <div className="lg:col-span-8">
          <section className="bg-rose-50/50 border border-rose-100 rounded-[2.5rem] shadow-lg flex flex-col relative overflow-hidden">
            <div className="p-5 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base md:text-xl font-bold text-slate-900 tracking-tight font-jakarta">Active Team Members</h2>
              <div className="px-3 md:px-4 py-1 md:py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] md:text-[11px] font-bold tracking-tight border border-indigo-100 whitespace-nowrap">
                {profiles.length} Members
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {profiles.length > 0 ? profiles.map((profile) => (
                <div key={profile.id} className="p-4 md:p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all group gap-3 md:gap-6">
                  <div className="flex items-center gap-3 md:gap-6 min-w-0">
                    <div className={cn(
                      "w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300 shadow-sm border",
                      profile.role === 'superadmin' ? "bg-indigo-600 text-white border-indigo-500" : "bg-white text-slate-400 border-slate-200 group-hover:border-indigo-200"
                    )}>
                      {profile.role === 'superadmin' ? <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" /> : <User className="w-6 h-6 md:w-7 md:h-7" />}
                    </div>
                    <div className="space-y-0.5 md:space-y-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="font-bold text-slate-900 text-base md:text-lg tracking-tight capitalize truncate">{profile.email.split('@')[0]}</span>
                        <div className="flex gap-1.5">
                          {profile.email === currentUser?.email && (
                            <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] md:text-[10px] font-bold rounded-full border border-indigo-100">You</span>
                          )}
                          {profile.email === 'bhargab1234deka@gmail.com' && (
                            <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[9px] md:text-[10px] font-bold rounded-full">Owner</span>
                          )}
                        </div>
                      </div>
                      <div className="text-[12px] font-medium text-slate-400 flex items-center gap-2">
                        {profile.role === 'superadmin' ? 'Super Administrator' : 'Administrator'}
                      </div>
                    </div>
                  </div>

                  {profile.email !== currentUser?.email && profile.email !== 'bhargab1234deka@gmail.com' && (
                    (profile.role === 'admin') || (isSuperAdmin && profile.role === 'superadmin')
                  ) && (
                    <div className="flex-shrink-0">
                      <DeleteUserButton userId={profile.id} email={profile.email} />
                    </div>
                  )}
                </div>
              )) : (
                <div className="p-20 text-center">
                  <UserPlus className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold tracking-tight">No team members found</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">Add a new administrator using the form on the left.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 md:p-10 bg-slate-50/30 border-t border-slate-100 text-center">
              <p className="text-[11px] md:text-[12px] text-slate-400 font-medium leading-relaxed tracking-tight max-w-lg mx-auto">
                Administrators can manage other team members. Only the primary SuperAdmin is protected from removal to ensure system integrity.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
