"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addNotice(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get("title")
  const content = formData.get("content")

  const { error } = await supabase
    .from("notices")
    .insert([{ title, content }])

  if (error) {
    console.error("Error adding notice:", error)
    return { error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/admin/dashboard")
  return { success: true }
}

export async function deleteNotice(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("notices")
    .delete()
    .eq("id", id)

  if (error) return { error: error.message }
  revalidatePath("/")
  revalidatePath("/admin/dashboard")
  return { success: true }
}
