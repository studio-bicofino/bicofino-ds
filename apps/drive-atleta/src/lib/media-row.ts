import type { Category, MediaItem, MediaKind, Status } from './types'

/* Mapeamento entre a linha do Postgres (snake_case) e o MediaItem (camelCase).
   Funções puras, usadas no servidor (insert) e no navegador (leitura). */

export interface MediaRow {
  id: string
  athlete_slug: string
  athlete_name: string
  kind: MediaKind
  filename: string
  original_name: string
  mime_type: string
  size_bytes: number
  date: string | null
  match: string | null
  competition: string | null
  category: Category
  tags: string[]
  notes: string | null
  status: Status
  drive_path: string
  drive_file_id: string | null
  web_view_link: string | null
  content_hash: string | null
  uploaded_at: string
}

export function rowToItem(r: MediaRow): MediaItem {
  return {
    id: r.id,
    athleteSlug: r.athlete_slug,
    athleteName: r.athlete_name,
    kind: r.kind,
    filename: r.filename,
    originalName: r.original_name,
    mimeType: r.mime_type,
    sizeBytes: Number(r.size_bytes),
    date: r.date ?? '',
    match: r.match,
    competition: r.competition,
    category: r.category,
    tags: r.tags ?? [],
    notes: r.notes,
    status: r.status,
    drivePath: r.drive_path,
    driveFileId: r.drive_file_id,
    webViewLink: r.web_view_link,
    contentHash: r.content_hash,
    uploadedAt: r.uploaded_at,
  }
}

/** Item → linha para insert (sem id/uploaded_at, que o banco gera). */
export function itemToInsertRow(it: Omit<MediaItem, 'id' | 'uploadedAt'>): Omit<MediaRow, 'id' | 'uploaded_at'> {
  return {
    athlete_slug: it.athleteSlug,
    athlete_name: it.athleteName,
    kind: it.kind,
    filename: it.filename,
    original_name: it.originalName,
    mime_type: it.mimeType,
    size_bytes: it.sizeBytes,
    date: it.date || null,
    match: it.match,
    competition: it.competition,
    category: it.category,
    tags: it.tags,
    notes: it.notes,
    status: it.status,
    drive_path: it.drivePath,
    drive_file_id: it.driveFileId,
    web_view_link: it.webViewLink,
    content_hash: it.contentHash,
  }
}
