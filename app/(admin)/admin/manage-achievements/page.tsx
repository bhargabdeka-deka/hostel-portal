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
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 antialiased">
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Achievements</h1>
          <p className="text-slate-600 mt-2 font-medium text-sm md:text-base">Upload institutional honors, sports milestones, and batch achievements.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
        {/* Upload Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-violet-50/50 border border-violet-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] sticky top-24 shadow-lg overflow-hidden relative">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3 tracking-tight font-jakarta">
              <div className="p-2.5 bg-violet-100 text-violet-600 rounded-xl border border-violet-200">
                <Camera className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              New Gallery Entry
            </h3>
            <GalleryUpload type="achievement" />
          </div>
        </div>

        {/* Gallery List (Right Side) */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h3 className="text-[10px] md:text-[11px] font-bold text-indigo-600 uppercase tracking-[0.2em] ml-2">Active Gallery</h3>
          </div>
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] md:rounded-[3rem] p-5 md:p-12 shadow-lg min-h-[400px] md:min-h-[600px]">
            <AchievementList initialAchievements={achievements || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
