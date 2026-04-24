"use server"
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function uploadMedia(base64Data: string, fileName: string, caption: string, type: 'gallery' | 'achievement') {
  const supabase = createAdminClient()
  
  try {
    // 1. Convert base64 to Buffer
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64')
    const folder = type === 'achievement' ? 'achievements' : 'gallery'
    const filePath = `${folder}/${Date.now()}-${fileName.replace(/\s+/g, '_')}`

    // 2. Upload to Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, buffer, {
        contentType: 'image/jpeg', // Or dynamic based on fileName
        upsert: true
      })

    if (uploadError) {
      // If error is "Bucket not found", we could try to create it, but usually best to throw
      throw uploadError
    }

    // 3. Get Public URL
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)

    // 4. Insert into DB
    const table = type === 'achievement' ? 'achievements' : 'gallery'
    const payload = type === 'achievement' 
      ? { 
          title: caption, 
          image_url: publicUrl, 
          description: 'Official Milestone', 
          date: new Date().toISOString().split('T')[0] 
        }
      : { image_url: publicUrl, caption: caption }

    const { error: insertError } = await supabase.from(table).insert([payload])
    if (insertError) throw insertError

    revalidatePath(`/${table}`)
    revalidatePath(`/admin/manage-${table}`)
    
    return { success: true }
  } catch (error: any) {
    console.error("Upload Error:", error)
    return { success: false, error: error.message }
  }
}

export async function addAchievement(title: string, imageUrl: string) {
  const supabase = createAdminClient()
  
  const payload = {
    title,
    image_url: imageUrl,
    description: 'Awarded for excellence in official events.',
    date: new Date().toISOString().split('T')[0]
  }

  const { data, error } = await supabase
    .from('achievements')
    .insert([payload])
    .select()

  if (error) {
    console.error("DB Error:", error)
    return { success: false, error: error.message }
  }

  revalidatePath('/achievements')
  revalidatePath('/admin/manage-achievements')
  return { success: true, data }
}

export async function addGalleryItem(caption: string, imageUrl: string) {
  const supabase = createAdminClient()
  
  const payload = {
    caption,
    image_url: imageUrl
  }

  const { data, error } = await supabase
    .from('gallery')
    .insert([payload])
    .select()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/gallery')
  revalidatePath('/admin/manage-gallery')
  return { success: true, data }
}

export async function deleteMedia(id: string, table: 'achievements' | 'gallery', imageUrl: string) {
  const supabase = createAdminClient()

  // 1. Storage cleanup
  if (imageUrl.includes('/storage/v1/object/public/images/')) {
    const storagePath = imageUrl.split('/storage/v1/object/public/images/')[1]
    if (storagePath) {
      await supabase.storage.from('images').remove([storagePath])
    }
  }

  // 2. DB delete
  const { error } = await supabase.from(table).delete().eq('id', id)
  
  if (error) return { success: false, error: error.message }

  revalidatePath(`/${table}`)
  revalidatePath(`/admin/manage-${table}`)
  return { success: true }
}
