'use client'

import { createClient } from '@/lib/supabase/client'

const BUCKET = 'people-photos'
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/heic',
  'image/heif',
])

export type UploadResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string }

function extFromFile(file: File): string {
  const fromName = file.name.split('.').pop()?.toLowerCase()
  if (fromName && fromName.length <= 5) return fromName
  const fromMime = file.type.split('/').pop()?.toLowerCase()
  return fromMime || 'jpg'
}

export async function uploadPersonPhoto(file: File): Promise<UploadResult> {
  if (!file) return { ok: false, error: 'Arquivo inválido' }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'Imagem acima de 5 MB' }
  }
  if (file.type && !ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: 'Formato não suportado (use JPG, PNG, WebP, AVIF ou HEIC)' }
  }

  const ext = extFromFile(file)
  const path = `${crypto.randomUUID()}.${ext}`
  const supabase = createClient()

  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    })

  if (uploadErr) return { ok: false, error: uploadErr.message }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  if (!data?.publicUrl) {
    return { ok: false, error: 'Upload ok, mas URL pública não foi retornada' }
  }

  return { ok: true, url: data.publicUrl, path }
}
