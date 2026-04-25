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
    <div className="max-w-6xl mx-auto py-12 px-6 antialiased">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Gallery</h1>
          <p className="text-slate-600 mt-2 font-medium">Upload batch photos, milestones, and institutional honors.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Upload Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-violet-50/50 border border-violet-100 p-10 rounded-[3rem] sticky top-24 shadow-lg overflow-hidden relative">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3 tracking-tight font-jakarta">
              <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl border border-violet-200">
                <Camera className="w-6 h-6" />
              </div>
              New Gallery Entry
            </h3>
            <GalleryUpload type="achievement" />
          </div>
        </div>

        {/* Gallery List (Right Side) */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Active Gallery</h3>
          </div>
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-[3rem] p-8 md:p-12 shadow-lg min-h-[600px]">
            <AchievementList initialAchievements={achievements || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
