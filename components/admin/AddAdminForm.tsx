"use client"
import { useState } from 'react'
import { Shield, Mail, Lock, Loader2, Check, Eye, EyeOff } from 'lucide-react'
import { createAdminAccount } from '@/actions/users'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function AddAdminForm({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await createAdminAccount(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        const form = document.querySelector('form') as HTMLFormElement
        form.reset()
        router.refresh()
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="live-border bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl space-y-8 relative group">
      {/* Lighting highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white shadow-sm border border-white/10">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight font-heading">Add Administrator</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Create a new team member</p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input 
                  name="email"
                  type="email" 
                  required
                  placeholder="colleague@university.edu" 
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-white text-sm placeholder:text-slate-700" 
                  suppressHydrationWarning
                />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block ml-1">Temporary Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-white text-sm placeholder:text-slate-700" 
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-white transition-colors"
                suppressHydrationWarning
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-medium leading-relaxed italic ml-1">They can change this after logging in.</p>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-4 block ml-1">Role</label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="role" 
                  value="admin"
                  defaultChecked 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500/10 border-white/20 bg-white/5 cursor-pointer" 
                />
                <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">Admin</span>
              </label>
              <label className={`flex items-center gap-2 ${isSuperAdmin ? 'cursor-pointer group' : 'opacity-30 cursor-not-allowed'}`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="superadmin"
                  disabled={!isSuperAdmin}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500/10 border-white/20 bg-white/5 cursor-pointer" 
                />
                <span className={`text-sm font-bold ${isSuperAdmin ? 'text-slate-400 group-hover:text-white' : 'text-slate-600'}`}>Super Admin</span>
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4" />
            Account Created Successfully
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading || success}
          suppressHydrationWarning
          className={cn(
            "w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl disabled:opacity-50 flex items-center justify-center gap-2",
            success 
              ? "bg-green-600 text-white shadow-green-900/20" 
              : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : success ? (
            <>
              <Check className="w-4 h-4" />
              Admin Created Successfully
            </>
          ) : (
            "Create New Admin"
          )}
        </button>
      </form>
      </div>
    </section>
  )
}
