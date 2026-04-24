import { GalleryUpload } from "@/components/admin/GalleryUpload"
import { Trophy, Trash2, Camera } from 'lucide-react'
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export default async function ManageAchievements() {
  const supabase = await createClient()
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: false })

  async function deleteAchievement(id: string, path: string) {
    "use server"
    const supabase = await createClient()
    
    // 1. Delete from Storage (if applicable)
    if (path.includes('/storage/v1/object/public/images/')) {
      const storagePath = path.split('/storage/v1/object/public/images/')[1]
      if (storagePath) {
        await supabase.storage.from('images').remove([storagePath])
      }
    }

    // 2. Delete from Database
    await supabase.from('achievements').delete().eq('id', id)
    
    revalidatePath('/achievements')
    revalidatePath('/admin/manage-achievements')
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Achievement Management</h1>
          <p className="text-slate-500 mt-1 font-medium">Upload and curate honors, sports wins, and visual records.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Upload Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 p-8 rounded-[2rem] sticky top-24 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Camera className="w-5 h-5 text-blue-600" />
              New Entry
            </h3>
            {/* Note: I'll need to update GalleryUpload or create AchievementUpload to target achievements table */}
            <GalleryUpload type="achievement" />
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-6">
            {achievements?.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden group shadow-sm">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <form action={async () => {
                      "use server"
                      await deleteAchievement(item.id, item.image_url)
                    }}>
                      <button className="p-4 bg-white text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-black text-slate-900 line-clamp-1 uppercase tracking-tight">{item.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      {item.date || "2023-2024"}
                    </p>
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">
                      Gold
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {(!achievements || achievements.length === 0) && (
              <div className="col-span-full py-24 text-center bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
                <Trophy className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">No entries found</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
