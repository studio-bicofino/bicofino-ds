import { NextResponse } from 'next/server'
import { getAthlete } from '@/lib/athletes'
import { kindFromMime } from '@/lib/filename'
import { supabaseAdmin } from '@/lib/supabase-server'
import { itemToInsertRow, rowToItem, type MediaRow } from '@/lib/media-row'
import { CATEGORIES } from '@/lib/categories'
import type { Category } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* POST /api/upload/complete
   O navegador concluiu o PUT direto no Google e manda o driveFileId/webViewLink.
   Grava a linha em media_items (service role) e devolve o MediaItem inserido.
   Supabase é a fonte da verdade (D3) — o Painel lê daqui, nunca do Drive. */

interface Body {
  athleteSlug: string
  filename: string
  originalName: string
  mimeType: string
  sizeBytes: number
  date: string
  match: string | null
  competition: string | null
  category: Category
  tags: string[]
  notes: string | null
  drivePath: string
  driveFileId: string | null
  webViewLink: string | null
}

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.value))

export async function POST(req: Request) {
  let b: Body
  try {
    b = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const athlete = getAthlete(b.athleteSlug)
  if (!athlete) return NextResponse.json({ error: 'Atleta não encontrado.' }, { status: 404 })
  if (!b.filename || !b.driveFileId) {
    return NextResponse.json({ error: 'filename e driveFileId são obrigatórios.' }, { status: 400 })
  }
  if (!VALID_CATEGORIES.has(b.category)) {
    return NextResponse.json({ error: 'Categoria inválida.' }, { status: 400 })
  }

  try {
    const row = itemToInsertRow({
      athleteSlug: athlete.slug,
      athleteName: athlete.name,
      kind: kindFromMime(b.mimeType),
      filename: b.filename,
      originalName: b.originalName,
      mimeType: b.mimeType,
      sizeBytes: b.sizeBytes,
      date: b.date,
      match: b.match,
      competition: b.competition,
      category: b.category,
      tags: Array.isArray(b.tags) ? b.tags : [],
      notes: b.notes,
      status: 'recebido',
      drivePath: b.drivePath,
      driveFileId: b.driveFileId,
      webViewLink: b.webViewLink,
    })

    const { data, error } = await supabaseAdmin()
      .from('media_items')
      .insert(row)
      .select()
      .single()
    if (error) throw new Error(error.message)

    return NextResponse.json({ item: rowToItem(data as MediaRow) })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erro desconhecido.'
    return NextResponse.json({ error: `Falha ao gravar o metadado: ${message}` }, { status: 502 })
  }
}
