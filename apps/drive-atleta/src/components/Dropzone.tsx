'use client'

import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

/* Área de upload — drag-and-drop no desktop, toque no mobile.
   Aceita fotos e vídeos; o tipo (e a pasta de destino) é derivado do MIME. */
export function Dropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)

  function handleFiles(list: FileList | null) {
    if (!list || list.length === 0) return
    const files = Array.from(list).filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/'),
    )
    if (files.length) onFiles(files)
  }

  return (
    <div
      className={`dropzone${drag ? ' is-drag' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDrag(true)
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDrag(false)
        handleFiles(e.dataTransfer.files)
      }}
    >
      <span className="dropzone__icon" aria-hidden>
        <UploadCloud size={22} strokeWidth={1.5} />
      </span>
      <div className="stack-2" style={{ alignItems: 'center' }}>
        <strong style={{ fontWeight: 600, color: 'var(--bf-text-primary)' }}>
          Toque para escolher fotos e vídeos
        </strong>
        <span className="bf-body-sm">ou arraste os arquivos aqui · pode enviar vários de uma vez</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
