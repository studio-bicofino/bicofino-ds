import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { isAuthBypassed } from '@/lib/auth/session'

type SetCookie = { name: string; value: string; options?: CookieOptions }

export async function createClient() {
  if (isAuthBypassed()) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
    return createSupabaseClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: SetCookie[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }: SetCookie) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Called from a Server Component; middleware will refresh.
          }
        },
      },
    },
  )
}
