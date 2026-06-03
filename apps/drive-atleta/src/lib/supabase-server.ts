import 'server-only'
import { createClient } from '@supabase/supabase-js'

/* Cliente Supabase do servidor — service role. Ignora RLS; usado só nas rotas
   /api (insert de upload, mudança de status). A chave nunca vai ao navegador. */

export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}
