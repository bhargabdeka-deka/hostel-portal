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

// ALUMNI: Approve or Reject
export async function updateAlumniStatus(id: string, status: 'approved' | 'pending') {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("alumni")
    .update({ status })
    .eq("id", id);

  if (!error) revalidatePath("/admin/alumni");
}

// NOTICES: Add
export async function addNotice(title: string, content: string) {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("notices")
    .insert([{ title, content }]);

  if (!error) revalidatePath("/");
}

// NOTICES: Delete
export async function deleteNotice(id: string) {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("notices")
    .delete()
    .eq("id", id);

  if (!error) {
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
  }
}

// COMPLAINTS: Update Status
export async function updateComplaintStatus(id: string, status: string) {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("complaints")
    .update({ status })
    .eq("id", id);

  if (!error) revalidatePath("/admin/dashboard");
}

// STORAGE: Upload Image (Gallery/Achievements)
export async function uploadImage(formData: FormData, folder: 'gallery' | 'achievements') {
  await verifyAccess();
  const supabase = await createClient();
  const file = formData.get("file") as File;
  const caption = formData.get("caption") as string;

  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("images") // Your bucket name
    .upload(`${folder}/${fileName}`, file);

  if (data) {
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(data.path);
    
    if (folder === 'gallery') {
      await supabase.from("gallery").insert([{ image_url: publicUrl, caption }]);
    }
    revalidatePath("/achievements");
    return publicUrl;
  }
}

// MONITORS: Update
export async function updateMonitor(id: string, name: string, room: string, phone?: string) {
  await verifyAccess();
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("monitors")
    .update({ name, room, phone })
    .eq("id", id);

  if (!error) {
    revalidatePath("/contact");
    revalidatePath("/admin/manage-monitors");
  }
  return { error };
}
