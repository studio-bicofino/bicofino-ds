'use client'

import { useState } from 'react'
import { ImageIcon, Film } from 'lucide-react'
import type { MediaKind } from '@/lib/types'
import { KIND_LABEL } from '@/lib/categories'

/* Miniatura — mostra o preview real (object URL no upload, ou /api/thumb no
   Painel) quando há; se a imagem falhar (thumbnail ainda não gerado), cai no
   placeholder técnico com o ícone do tipo. */
export function Thumb({
  kind,
  previewUrl,
  className,
}: {
  kind: MediaKind
  previewUrl?: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const showImg = previewUrl && kind === 'foto' && !failed

  return (
    <div className={`thumb${className ? ' ' + className : ''}`}>
      <span className="thumb__tag">{KIND_LABEL[kind]}</span>
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : kind === 'video' ? (
        <Film size={28} strokeWidth={1.5} />
      ) : (
        <ImageIcon size={28} strokeWidth={1.5} />
      )}
    </div>
  )
}
