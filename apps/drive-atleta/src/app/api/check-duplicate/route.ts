import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* POST /api/check-duplicate
   Recebe { athleteSlug, hashes[] } e devolve, para cada hash já existente no
   acervo DAQUELE atleta, um resumo do item original { filename, date }.
   Só avisa — nunca bloqueia o envio. */

export async function POST(req: Request) {
  let body: { athleteSlug: string; hashes: string[] }
  try {
    body = (await req.json()) as { athleteSlug: string; hashes: string[] }
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const hashes = (body.hashes ?? []).filter((h) => typeof h === 'string' && h.length === 64)
  if (!body.athleteSlug || hashes.length === 0) {
    return NextResponse.json({ matches: {} })
  }

  const { data, error } = await supabaseAdmin()
    .from('media_items')
    .select('content_hash, filename, date')
    .eq('athlete_slug', body.athleteSlug)
    .in('content_hash', hashes)
  if (error) return NextResponse.json({ error: error.message }, { status: 502 })

  // Primeiro registro encontrado por hash.
  const matches: Record<string, { filename: string; date: string | null }> = {}
  for (const row of data ?? []) {
    if (row.content_hash && !matches[row.content_hash]) {
      matches[row.content_hash] = { filename: row.filename, date: row.date }
    }
  }
  return NextResponse.json({ matches })
}
