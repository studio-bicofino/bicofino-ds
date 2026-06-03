import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { rowToItem, type MediaRow } from '@/lib/media-row'
import { STATUSES } from '@/lib/categories'
import type { Status } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* POST /api/curate — muda o estágio de curadoria de um item (Painel).
   Escrita via service role; a chave anon do navegador é só leitura. */

const VALID = new Set(STATUSES.map((s) => s.value))

export async function POST(req: Request) {
  let body: { id: string; status: Status }
  try {
    body = (await req.json()) as { id: string; status: Status }
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  if (!body.id || !VALID.has(body.status)) {
    return NextResponse.json({ error: 'id e status válidos são obrigatórios.' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin()
    .from('media_items')
    .update({ status: body.status })
    .eq('id', body.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })

  return NextResponse.json({ item: rowToItem(data as MediaRow) })
}
