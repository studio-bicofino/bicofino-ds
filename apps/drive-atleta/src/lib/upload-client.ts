import type { Athlete } from './athletes'
import type { BatchMeta, MediaItem } from './types'

/* ─────────────────────────────────────────────────────────────
   Orquestra o upload real de UM arquivo, no navegador:
     1) /api/upload/session  → nome gerado + uploadUrl resumable
     2) PUT dos bytes DIRETO no Google (não passa pela Vercel — D2),
        com progresso via XHR
     3) /api/upload/complete → grava o metadado no Supabase (D3)
   Devolve o MediaItem gravado.
   ───────────────────────────────────────────────────────────── */

interface SessionResponse {
  uploadUrl: string
  filename: string
  kind: 'foto' | 'video'
  drivePath: string
}

/** PUT do arquivo na uploadUrl resumable, com callback de progresso (0..1). */
function putToDrive(
  uploadUrl: string,
  file: File,
  onProgress: (ratio: number) => void,
): Promise<{ id: string; webViewLink: string | null }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', uploadUrl, true)
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total)
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const r = JSON.parse(xhr.responseText)
          resolve({ id: r.id, webViewLink: r.webViewLink ?? null })
        } catch {
          reject(new Error('Resposta inesperada do Google ao concluir o upload.'))
        }
      } else {
        reject(new Error(`Upload ao Google falhou (${xhr.status}).`))
      }
    }
    xhr.onerror = () => reject(new Error('Erro de rede no envio ao Google.'))
    xhr.send(file)
  })
}

export async function uploadOne(args: {
  file: File
  athlete: Athlete
  meta: BatchMeta
  date: string
  batchIndex: number
  contentHash: string | null
  onProgress: (ratio: number) => void
}): Promise<MediaItem> {
  const { file, athlete, meta, date, batchIndex, contentHash, onProgress } = args

  // 1) Sessão resumable + nome padronizado.
  const sres = await fetch('/api/upload/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      athleteSlug: athlete.slug,
      batchIndex,
      mimeType: file.type,
      originalName: file.name,
      sizeBytes: file.size,
      date,
      match: meta.match,
      competition: meta.competition,
      category: meta.category,
      tags: meta.tags,
      notes: meta.notes,
    }),
  })
  const session = (await sres.json()) as SessionResponse & { error?: string }
  if (!sres.ok) throw new Error(session.error ?? 'Falha ao iniciar a sessão de upload.')

  // 2) Bytes direto no Google.
  const drive = await putToDrive(session.uploadUrl, file, onProgress)
  onProgress(1)

  // 3) Grava o metadado no Supabase.
  const cres = await fetch('/api/upload/complete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      athleteSlug: athlete.slug,
      filename: session.filename,
      originalName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      date,
      match: meta.match.trim() || null,
      competition: meta.competition.trim() || null,
      category: meta.category,
      tags: meta.tags,
      notes: meta.notes.trim() || null,
      drivePath: session.drivePath,
      driveFileId: drive.id,
      webViewLink: drive.webViewLink,
      contentHash,
    }),
  })
  const completed = (await cres.json()) as { item: MediaItem; error?: string }
  if (!cres.ok) throw new Error(completed.error ?? 'Falha ao gravar o metadado.')
  return completed.item
}
