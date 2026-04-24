"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitComplaint(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get("name")
  const room = formData.get("room")
  const issue = formData.get("issue")

  const { error } = await supabase
    .from("complaints")
    .insert([{ name, room, issue }])

  if (error) {
    console.error("Error submitting complaint:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/dashboard")
  return { success: true }
}

export async function updateComplaintStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("complaints")
    .update({ status })
    .eq("id", id)

  if (error) return { error: error.message }
  revalidatePath("/admin/dashboard")
  return { success: true }
}
