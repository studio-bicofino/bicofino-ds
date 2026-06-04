'use client'

import { uploadPhotoAction, type UploadResult } from './upload-action'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/heic',
  'image/heif',
])

export type { UploadResult }

export async function uploadPersonPhoto(file: File): Promise<UploadResult> {
  if (!file) return { ok: false, error: 'Arquivo inválido' }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'Imagem acima de 5 MB' }
  }
  if (file.type && !ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: 'Formato não suportado (use JPG, PNG, WebP, AVIF ou HEIC)' }
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    return await uploadPhotoAction(formData)
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Falha no upload' }
  }
}
