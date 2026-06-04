import { createClient } from '@/lib/supabase/server'

export type Session = {
  userId: string | null
  email: string
  isAuthenticated: boolean
}

const BYPASS_EMAIL = 'bypass@casa-nostra.local'

export function isAuthBypassed(): boolean {
  const raw = process.env.CASA_NOSTRA_AUTH_BYPASS?.trim().toLowerCase()
  return raw === '1' || raw === 'true' || raw === 'yes'
}

export async function getSession(): Promise<Session | null> {
  if (isAuthBypassed()) {
    return { userId: null, email: BYPASS_EMAIL, isAuthenticated: false }
  }
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  return { userId: user.id, email: user.email ?? '', isAuthenticated: true }
}
