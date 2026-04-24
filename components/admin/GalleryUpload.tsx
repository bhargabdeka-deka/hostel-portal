"use client"
import { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Check, Loader2, Type } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryUploadProps {
  type?: 'gallery' | 'achievement'
}

export function GalleryUpload({ type = 'gallery' }: GalleryUploadProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const supabase = createClient()

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement
    const file = fileInput.files?.[0]
    
    if (!file || !caption) {
      setError("Please provide both an image and a title/caption")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // 1. Compression
      const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1600 }
      const compressedFile = await imageCompression(file, options)

      // 2. Upload to Storage
      const folder = type === 'achievement' ? 'achievements' : 'gallery'
      const fileName = `${Date.now()}-${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(`${folder}/${fileName}`, compressedFile)

      if (uploadError) throw uploadError

      // 3. Insert Record
      if (data) {
        const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(`${folder}/${fileName}`)
        const table = type === 'achievement' ? 'achievements' : 'gallery'
        
        const payload = type === 'achievement' 
          ? { title: caption, image_url: publicUrl, description: 'Gold', date: new Date().getFullYear().toString() }
          : { image_url: publicUrl, caption: caption }

        const { error: insertError } = await supabase.from(table).insert([payload])
        
        if (insertError) throw insertError
        
        setSuccess(true)
        setCaption("")
        form.reset()
        setTimeout(() => window.location.reload(), 1500)
      }
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            {type === 'achievement' ? 'Achievement Title' : 'Media Caption'}
          </label>
          <div className="relative">
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={type === 'achievement' ? "e.g. Cricket Champion" : "e.g. Annual Sports Meet 2024"}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="group relative">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Image</label>
          <div className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2rem] p-8 text-center hover:border-blue-400 hover:bg-white transition-all duration-500 cursor-pointer relative overflow-hidden">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept="image/*"
              disabled={loading}
              name="file"
            />
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500",
                loading ? "bg-blue-100 text-blue-600 animate-pulse" : 
                success ? "bg-green-100 text-green-600" :
                "bg-white text-slate-400 group-hover:text-blue-600 shadow-sm"
              )}>
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 
                 success ? <Check className="w-6 h-6" /> : 
                 <Upload className="w-6 h-6" />}
              </div>
              <p className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                {loading ? "Optimizing..." : "Drop file or click to browse"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-100 flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      <button 
        type="submit"
        disabled={loading || success}
        className={cn(
          "w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100",
          success && "bg-green-600 hover:bg-green-600"
        )}
      >
        {loading ? "Uploading..." : success ? "Ready!" : "Confirm Upload"}
      </button>
    </form>
  )
}
