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
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase font-heading">Team Management</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage administrator access and roles for the ORION portal.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Add Administrator Form */}
        <div className="lg:col-span-4">
          <AddAdminForm isSuperAdmin={isSuperAdmin} />
        </div>

        {/* Right: Active Team Members */}
        <div className="lg:col-span-8">
          <section className="bg-white border border-slate-100 rounded-[1.5rem] shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight font-heading">Active Team Members</h2>
              <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                {profiles.length} Users
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {profiles.length > 0 ? profiles.map((profile) => (
                <div key={profile.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-inner",
                      profile.role === 'superadmin' ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white"
                    )}>
                      {profile.role === 'superadmin' ? <ShieldCheck className="w-6 h-6" /> : <User className="w-6 h-6" />}
                    </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-base tracking-tight capitalize">{profile.email.split('@')[0]}</span>
                          {profile.email === currentUser?.email && (
                            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[7px] font-black uppercase tracking-widest rounded-md">YOU</span>
                          )}
                          {profile.email === 'bhargab1234deka@gmail.com' && (
                            <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[7px] font-black uppercase tracking-widest rounded-md">OWNER</span>
                          )}
                        </div>
                        <div className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 shadow-sm mt-1 w-fit",
                          profile.role === 'superadmin' 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-white text-slate-400 border-slate-200"
                        )}>
                          {profile.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                        </div>
                      </div>
                  </div>

                  {profile.email !== currentUser?.email && profile.email !== 'bhargab1234deka@gmail.com' && (
                    (profile.role === 'admin') || (isSuperAdmin && profile.role === 'superadmin')
                  ) && (
                    <DeleteUserButton userId={profile.id} email={profile.email} />
                  )}
                </div>
              )) : (
                <div className="p-20 text-center">
                  <UserPlus className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No team members found</p>
                  <p className="text-xs text-slate-300 mt-2 font-medium">Add a new administrator using the form on the left.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-slate-50/50 border-t border-slate-50 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                Administrators can manage other administrators. Only the Primary SuperAdmin is protected from removal.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
