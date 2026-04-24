import { createClient } from "./server";

export async function getAdminRole() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id) // Rule: Use ID, not email
    .single();

  if (error || !profile) return null;
  return profile.role as 'superadmin' | 'admin';
}
