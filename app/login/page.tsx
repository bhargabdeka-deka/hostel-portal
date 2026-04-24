"use client"
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-slate-50/50">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-slate-900 text-white rounded-3xl mb-6 shadow-xl">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Access</h1>
          <p className="text-slate-500 mt-2">Sign in to manage the hostel portal</p>
        </div>

        <div className="premium-card p-10 bg-white shadow-2xl border-slate-200">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-12"
                    placeholder="admin@example.com"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-12 pr-12"
                    placeholder="••••••••"
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-600 transition-colors"
                    suppressHydrationWarning
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              suppressHydrationWarning
              className={cn(
                "w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? "Verifying..." : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Only authorized staff can access this area.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
