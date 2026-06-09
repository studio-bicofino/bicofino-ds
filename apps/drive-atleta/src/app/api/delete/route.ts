import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { trashFile } from '@/lib/drive'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* POST /api/delete — manda o arquivo do Drive pra lixeira e remove a linha do
   Supabase. Só do painel interno (service role). Recuperável no Drive ~30 dias. */
export async function POST(req: Request) {
  let id: string
  try {
    ({ id } = (await req.json()) as { id: string })
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }
  if (!id) return NextResponse.json({ error: 'id é obrigatório.' }, { status: 400 })

  const sb = supabaseAdmin()
  const { data, error } = await sb
    .from('media_items')
    .select('drive_file_id')
    .eq('id', id)
    .single()
  if (error) return NextResponse.json({ error: 'Arquivo não encontrado.' }, { status: 404 })

  if (data.drive_file_id) await trashFile(data.drive_file_id)

  const { error: delErr } = await sb.from('media_items').delete().eq('id', id)
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 502 })

  return NextResponse.json({ ok: true })
}
