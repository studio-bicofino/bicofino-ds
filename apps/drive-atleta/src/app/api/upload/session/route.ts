import { NextResponse } from 'next/server'
import { getAthlete } from '@/lib/athletes'
import { generateFilename, kindFromMime } from '@/lib/filename'
import { buildDrivePath, driveSegments } from '@/lib/destination'
import { resolveFolderId, startResumableUpload } from '@/lib/drive'
import { supabaseAdmin } from '@/lib/supabase-server'
import type { Category } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* POST /api/upload/session
   Recebe os metadados de UM arquivo de um lote, gera o nome padronizado
   (com a sequência vinda do Supabase), resolve a pasta no Shared Drive e
   inicia a sessão resumable. Devolve a uploadUrl descartável — os bytes vão
   direto do navegador para o Google (D2), nunca pela Vercel. */

interface Body {
  athleteSlug: string
  batchIndex: number
  mimeType: string
  originalName: string
  sizeBytes: number
  date: string
  match: string
  competition: string
  category: Category
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  const athlete = getAthlete(body.athleteSlug)
  if (!athlete) return NextResponse.json({ error: 'Atleta não encontrado.' }, { status: 404 })

  const kind = kindFromMime(body.mimeType)

  try {
    // Sequência _001, _002… contínua por atleta: total no banco + posição no lote.
    const { count, error } = await supabaseAdmin()
      .from('media_items')
      .select('id', { count: 'exact', head: true })
      .eq('athlete_slug', athlete.slug)
    if (error) throw new Error(error.message)

    const seq = (count ?? 0) + (body.batchIndex ?? 0) + 1

    const filename = generateFilename({
      athlete,
      date: body.date,
      match: body.match,
      competition: body.competition,
      category: body.category,
      mimeType: body.mimeType,
      originalName: body.originalName,
      seq,
    })

    const folderId = await resolveFolderId(driveSegments(athlete, kind))
    const origin = req.headers.get('origin') ?? new URL(req.url).origin
    const uploadUrl = await startResumableUpload({
      name: filename,
      mimeType: body.mimeType,
      parentId: folderId,
      sizeBytes: body.sizeBytes,
      origin,
    })

    return NextResponse.json({
      uploadUrl,
      filename,
      kind,
      drivePath: buildDrivePath(athlete, kind, filename),
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erro desconhecido.'
    return NextResponse.json({ error: `Falha ao iniciar o upload: ${message}` }, { status: 502 })
  }
}
