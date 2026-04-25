"use client"
import { useState, useRef } from 'react'
import imageCompression from 'browser-image-compression'
import { uploadMedia } from '@/actions/media'
import { Upload, X, Check, Loader2, Type, FileImage } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryUploadProps {
  type?: 'gallery' | 'achievement'
}

export function GalleryUpload({ type = 'gallery' }: GalleryUploadProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    if (!caption.trim()) {
      setError("Achievement title is mandatory")
      return
    }

    if (!selectedFile) {
      setError("Please select an image to upload")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // 1. Compression
      const options = { maxSizeMB: 0.3, maxWidthOrHeight: 1200 }
      const compressedFile = await imageCompression(selectedFile, options)

      // 2. Convert to Base64
      const reader = new FileReader()
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(compressedFile)
      })
      const base64Data = await base64Promise

      // 3. Upload via Unified Server Action (Bypasses all client RLS and storage errors)
      const result = await uploadMedia(base64Data, selectedFile.name, caption, type)

      if (!result.success) throw new Error(result.error)
        
      setSuccess(true)
      setCaption("")
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
        
      // Refresh to show new data
      setTimeout(() => window.location.reload(), 1000)
    } catch (err: any) {
      setError(err.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">
            {type === 'achievement' ? 'Achievement Title' : 'Media Caption'} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={type === 'achievement' ? "e.g. Cricket Champion" : "e.g. Annual Sports Meet 2024"}
              className={cn(
                "w-full pl-11 pr-4 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all text-sm font-bold text-slate-900 placeholder:text-slate-400",
                error && !caption.trim() ? "border-red-500/50 bg-red-50" : "border-slate-100 focus:border-blue-500 focus:ring-4 ring-blue-500/10"
              )}
            />
          </div>
        </div>

        <div className="group relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Select Image <span className="text-red-500">*</span></label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "bg-slate-50 border-2 border-dashed rounded-[2rem] p-8 text-center transition-all duration-300 cursor-pointer relative overflow-hidden",
              selectedFile ? "border-blue-500 bg-blue-50" : "border-slate-100 hover:border-blue-500/50 hover:bg-slate-100/50"
            )}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*"
              disabled={loading}
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 shadow-sm",
                loading ? "bg-blue-100 text-blue-600 animate-pulse" : 
                success ? "bg-green-100 text-green-600" :
                selectedFile ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-blue-600"
              )}>
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 
                 success ? <Check className="w-6 h-6" /> : 
                 selectedFile ? <FileImage className="w-6 h-6" /> :
                 <Upload className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  {selectedFile ? selectedFile.name : "Drop file or click to browse"}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG up to 300KB"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-red-100 flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      <button 
        type="submit"
        disabled={loading || success}
        className={cn(
          "w-full py-5 bg-blue-600 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-blue-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-xl shadow-blue-900/20",
          success && "bg-green-600 hover:bg-green-600 shadow-green-900/20"
        )}
      >
        {loading ? "Processing..." : success ? "Entry Saved!" : "Confirm Upload"}
      </button>
    </form>
  )
}
