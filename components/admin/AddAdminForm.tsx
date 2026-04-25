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
    <section className="bg-indigo-50/50 border border-indigo-100 p-5 md:p-8 rounded-[2rem] shadow-lg space-y-6 md:space-y-8 relative group">
      <div className="relative z-10">
        <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight font-jakarta">Add Administrator</h3>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-600 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300" />
              <input 
                name="email"
                type="email" 
                required
                placeholder="colleague@university.edu" 
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-indigo-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all font-medium text-slate-900 text-sm placeholder:text-slate-300" 
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-[13px] font-bold text-slate-600 ml-1">Temporary Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300" />
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••" 
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium text-slate-900 text-sm placeholder:text-slate-300" 
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-600 transition-colors"
                suppressHydrationWarning
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic ml-1">They can change this after logging in.</p>
          </div>
          
          <div className="space-y-4">
            <label className="text-[13px] font-bold text-slate-600 ml-1">Access Role</label>
            <div className="flex flex-wrap gap-6 md:gap-8 items-center pl-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="role" 
                  value="admin"
                  defaultChecked 
                  className="w-4.5 h-4.5 text-blue-600 focus:ring-blue-500/20 border-slate-200 bg-slate-50 cursor-pointer" 
                />
                <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Admin</span>
              </label>
              <label className={`flex items-center gap-3 ${isSuperAdmin ? 'cursor-pointer group' : 'opacity-30 cursor-not-allowed'}`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="superadmin"
                  disabled={!isSuperAdmin}
                  className="w-4.5 h-4.5 text-blue-600 focus:ring-blue-500/20 border-slate-200 bg-slate-50 cursor-pointer" 
                />
                <span className={`text-sm font-bold ${isSuperAdmin ? 'text-slate-500 group-hover:text-slate-900' : 'text-slate-300'}`}>Super Admin</span>
              </label>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl tracking-tight">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-100 text-green-600 text-[11px] font-bold rounded-2xl flex items-center gap-2 tracking-tight">
            <Check className="w-4 h-4" />
            Account Created Successfully
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading || success}
          suppressHydrationWarning
          className={cn(
            "w-full py-4.5 rounded-[1.25rem] font-bold text-sm tracking-tight transition-all active:scale-95 shadow-xl disabled:opacity-50 flex items-center justify-center gap-2",
            success 
              ? "bg-green-600 text-white shadow-green-900/20" 
              : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/20"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
              Creating...
            </>
          ) : success ? (
            <>
              <Check className="w-4.5 h-4.5" />
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
