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
      
      {achievements.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem]">
          <Award className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 text-sm font-medium italic">No entries found yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between w-full">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  {achievement.date}
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate max-w-[200px] tracking-tight">
                  {achievement.title}
                </h4>
              </div>
              
              <button 
                onClick={() => handleDelete(achievement.id)}
                disabled={deletingId === achievement.id}
                className="p-3 bg-slate-50 text-slate-300 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-300 border border-slate-100"
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
