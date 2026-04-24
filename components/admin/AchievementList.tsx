"use client"
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Loader2, Award, Calendar } from 'lucide-react'

interface AchievementListProps {
  initialAchievements: any[]
}

export function AchievementList({ initialAchievements }: AchievementListProps) {
  const [achievements, setAchievements] = useState(initialAchievements)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this achievement? It will be permanently deleted from the portal.")) return

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setAchievements(achievements.filter(a => a.id !== id))
    } catch (err: any) {
      alert("Failed to delete: " + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter font-heading">Active Achievements</h3>
      
      {achievements.length === 0 ? (
        <div className="p-12 text-center bg-white/5 border border-dashed border-white/10 rounded-[2.5rem]">
          <Award className="w-12 h-12 text-slate-800 mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-medium italic">No entries found yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 shadow-xl flex items-center justify-between group hover:bg-blue-600/[0.05] hover:border-blue-500/20 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between w-full">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  <Calendar className="w-3 h-3 text-blue-500" />
                  {achievement.date}
                </div>
                <h4 className="text-sm font-bold text-white truncate max-w-[200px] tracking-tight">
                  {achievement.title}
                </h4>
              </div>
              
              <button 
                onClick={() => handleDelete(achievement.id)}
                disabled={deletingId === achievement.id}
                className="p-3 bg-white/5 text-slate-500 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all duration-300 border border-white/5"
              >
                {deletingId === achievement.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}
