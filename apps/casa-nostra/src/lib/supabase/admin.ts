import { createClient } from '@supabase/supabase-js'

/**
 * Admin client — usa SUPABASE_SERVICE_ROLE_KEY.
 * NUNCA importar em arquivos client. Usar apenas em scripts/seed/migrations.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
