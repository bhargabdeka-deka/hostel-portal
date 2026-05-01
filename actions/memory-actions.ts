"use server"
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getAdminRole } from "@/lib/supabase/auth-utils";

// Helper to check if user has any admin role
async function verifyAccess() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const role = await getAdminRole();
  
  // Emergency Bypass for owners
  if (!role && user && (user.email === 'bhargab1234deka@gmail.com' || user.email === 'admin1@gmail.com')) {
    return 'superadmin';
  }

  if (!role) throw new Error("Unauthorized: User role not found");
  return role;
}

export async function submitMemory(formData: {
  fullName: string;
  batch: string;
  roomNumber?: string;
  title: string;
  story: string;
  category: string;
}) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("memories")
    .insert([{
      full_name: formData.fullName,
      batch: formData.batch,
      room_number: formData.roomNumber,
      title: formData.title,
      story: formData.story,
      category: formData.category,
      status: 'pending'
    }]);

  if (error) {
    console.error("Memory Submission Error:", error);
    return { error: error.message };
  }

  return { success: true };
}

export async function updateMemoryStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("memories")
    .update({ status })
    .eq("id", id);

  if (!error) {
    revalidatePath("/admin/memories");
    revalidatePath("/memories");
  }
  return { success: !error, error };
}

export async function deleteMemory(id: string) {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("memories")
    .delete()
    .eq("id", id);

  if (!error) {
    revalidatePath("/admin/memories");
    revalidatePath("/memories");
  }
  return { success: !error, error };
}
