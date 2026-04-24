import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Gracefully handle missing or placeholder credentials
    if (!supabaseUrl || supabaseUrl.includes('your_') || !supabaseAnonKey || supabaseAnonKey.includes('your_')) {
      return response
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
          },
        },
      }
    )

    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch (e) {
      // Ignore auth errors for missing/invalid tokens to prevent crashing public pages
      console.warn("Auth check failed, proceeding as unauthenticated:", e);
    }

    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!user) return NextResponse.redirect(new URL('/login', request.url));

      // Role check logic
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile) {
        // Emergency Bypass for the primary owner emails
        if (user.email === 'admin1@gmail.com' || user.email === 'bhargab1234deka@gmail.com') {
          return response;
        }
        
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/login?error=Unauthorized', request.url));
      }

      // Explicit role check
      if (profile.role !== 'admin' && profile.role !== 'superadmin') {
        // Only allow admins into the dashboard
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  } catch (err) {
    // Top-level safety catch
    return response;
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
