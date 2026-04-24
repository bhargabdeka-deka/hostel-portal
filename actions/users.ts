"use server"
import { createClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Special Admin Client (Uses Service Role Key)
const getAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!serviceKey || serviceKey === 'your_service_role_key_here') {
    return null
  }
  
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export async function createAdminAccount(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as 'admin' | 'superadmin'
  
  const supabase = await createServerClient()
  const adminClient = getAdminClient()

  if (!adminClient) {
    return { error: "Server Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing or invalid in .env.local" }
  }
  
  // 1. Verify the current user is authorized to perform this action
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) throw new Error("Unauthorized")
  
  const { data: currentProfile } = await supabase
    .from('users')
    .select('role')
    .eq('id', currentUser.id)
    .single()
    
  const isSuperAdmin = currentUser.email === 'bhargab1234deka@gmail.com' || currentProfile?.role === 'superadmin'

  // WhatsApp Logic: 
  // - Only SuperAdmins can create other SuperAdmins
  // - Admins can only create regular Admins
  if (role === 'superadmin' && !isSuperAdmin) {
    throw new Error("Only Super Administrators can create other Super Administrators")
  }

  // 2. Check if user already exists in Auth but is missing from our table
  let authUserId: string | undefined;

  const { data: { users: existingAuthUsers }, error: listError } = await adminClient.auth.admin.listUsers();
  const existingAuthUser = existingAuthUsers?.find(u => u.email === email);

  if (existingAuthUser) {
    authUserId = existingAuthUser.id;
    // Check if they are already in our public table
    const { data: existingProfile } = await adminClient
      .from('users')
      .select('id')
      .eq('id', authUserId)
      .single();

    if (existingProfile) {
      return { error: "A user with this email address has already been registered and is active." }
    }
    // If we are here, user exists in Auth but not in our table - we will "repair" below
  } else {
    // Create the user in Auth
    const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) return { error: authError.message }
    authUserId = authUser.user.id;
  }

  if (!authUserId) return { error: "Failed to determine User ID" }

  // 3. Add to our public users table
  const { error: dbError } = await adminClient
    .from('users')
    .insert([{
      id: authUserId,
      email,
      role
    }])

  if (dbError) {
    return { error: `Database Error: ${dbError.message}` }
  }

  revalidatePath('/admin/manage-users')
  return { success: true }
}

export async function deleteUser(userId: string) {
  const supabase = await createServerClient()
  const adminClient = getAdminClient()
  
  if (!adminClient) {
    return { error: "Server Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing or invalid in .env.local" }
  }
  
  // 1. Get current user's role
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) throw new Error("Unauthorized")

  const { data: currentProfile } = await supabase
    .from('users')
    .select('role')
    .eq('id', currentUser.id)
    .single()

  const isSuperAdmin = currentUser.email === 'bhargab1234deka@gmail.com' || currentProfile?.role === 'superadmin'

  // 2. Get target user's role and email
  const { data: targetProfile } = await supabase
    .from('users')
    .select('email, role')
    .eq('id', userId)
    .single()

  if (!targetProfile) throw new Error("User not found")

  // 3. Security Checks
  // - Never delete the owner
  if (targetProfile.email === 'bhargab1234deka@gmail.com') {
    throw new Error("The Primary Owner cannot be removed")
  }

  // - Only SuperAdmins can delete other SuperAdmins
  if (targetProfile.role === 'superadmin' && !isSuperAdmin) {
    throw new Error("Only Super Administrators can remove other Super Administrators")
  }

  // - Admins can delete Admins. SuperAdmins can delete anyone (except owner).
  // No additional check needed here as long as the user is at least an Admin (verified by proxy)

  // 4. Perform Deletion
  const { error } = await adminClient.auth.admin.deleteUser(userId)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/manage-users')
  return { success: true }
}
