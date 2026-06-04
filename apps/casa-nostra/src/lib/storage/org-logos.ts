'use client'

import { uploadLogoAction, type UploadLogoResult } from './upload-logo-action'

const MAX_BYTES = 2 * 1024 * 1024
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
])

export type { UploadLogoResult }

export async function uploadOrgLogo(file: File): Promise<UploadLogoResult> {
  if (!file) return { ok: false, error: 'Arquivo inválido' }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'Logo acima de 2 MB' }
  }
  if (file.type && !ALLOWED_MIME.has(file.type)) {
    return { ok: false, error: 'Formato não suportado (use PNG, JPG, WebP, AVIF ou SVG)' }
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    return await uploadLogoAction(formData)
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Falha no upload' }
  }
}
