import { ImageIcon, Film } from 'lucide-react'
import type { MediaKind } from '@/lib/types'
import { KIND_LABEL } from '@/lib/categories'

/* Miniatura — usa o preview real (object URL de imagem) quando há; senão,
   um placeholder técnico (M-01: fio + grid) com o ícone do tipo. */
export function Thumb({
  kind,
  previewUrl,
  className,
}: {
  kind: MediaKind
  previewUrl?: string
  className?: string
}) {
  return (
    <div className={`thumb${className ? ' ' + className : ''}`}>
      <span className="thumb__tag">{KIND_LABEL[kind]}</span>
      {previewUrl && kind === 'foto' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt="" />
      ) : kind === 'video' ? (
        <Film size={28} strokeWidth={1.5} />
      ) : (
        <ImageIcon size={28} strokeWidth={1.5} />
      )}
    </div>
  )
}
