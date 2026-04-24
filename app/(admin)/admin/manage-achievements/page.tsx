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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Achievement Hub</h1>
          <p className="text-slate-500 mt-1 font-medium">Upload milestones and manage institutional honors.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Upload Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 p-8 rounded-[3rem] sticky top-24 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tight">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
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
