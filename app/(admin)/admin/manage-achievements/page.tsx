import { GalleryUpload } from "@/components/admin/GalleryUpload"
import { AchievementList } from "@/components/admin/AchievementList"
import { Trophy, Camera } from 'lucide-react'
import { createClient } from "@/lib/supabase/server"

export default async function ManageAchievements() {
  const supabase = await createClient()
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-heading">Achievement Hub</h1>
          <p className="text-slate-500 mt-1 font-medium">Upload milestones and manage institutional honors.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Upload Sidebar */}
        <div className="lg:col-span-2">
          <div className="live-border bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] sticky top-24 shadow-2xl overflow-hidden relative">
            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
              <div className="p-3 bg-blue-600/10 text-blue-500 rounded-2xl border border-blue-500/20">
                <Camera className="w-6 h-6" />
              </div>
              New Entry
            </h3>
            <GalleryUpload type="achievement" />
          </div>
        </div>

        {/* Achievement List (Right Side) */}
        <div className="lg:col-span-3">
          <AchievementList initialAchievements={achievements || []} />
        </div>
      </div>
    </div>
  )
}
