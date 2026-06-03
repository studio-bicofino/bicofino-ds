import { createClient } from '@supabase/supabase-js'

/* Cliente Supabase do navegador — chave anon (pública), só leitura do acervo
   (RLS: policy de select). Escritas passam pelas rotas /api com service role. */

export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
)
