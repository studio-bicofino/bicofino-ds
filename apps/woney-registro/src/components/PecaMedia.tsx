'use client'

import { useEffect, useRef, useState } from 'react'

/* Mídia da peça — vídeo em loop mudo, autoplay assim que entra em tela;
   cai para imagem estática (screenshot, ancorada no topo) e, se a imagem
   ainda não existe, para um placeholder editorial limpo.
   Sob prefers-reduced-motion não autoplaya: mostra o primeiro frame parado. */
export function PecaMedia({
  video,
  image,
  alt,
}: {
  video?: string | null
  image?: string | null
  alt: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [imgFailed, setImgFailed] = useState(false)
  // Default false (SSR-safe, sem motion); habilita no cliente se motion for permitido.
  const [motionOk, setMotionOk] = useState(false)

  useEffect(() => {
    setMotionOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (v && motionOk) v.play().catch(() => {})
  }, [motionOk])

  const base: React.CSSProperties = {
    aspectRatio: '9 / 11',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'var(--bf-surface-subtle)',
  }

  if (video) {
    return (
      <div style={base}>
        <video
          ref={ref}
          src={video}
          autoPlay={motionOk}
          muted
          loop
          playsInline
          preload="metadata"
          poster={image ?? undefined}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  if (image && !imgFailed) {
    return (
      <div style={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          onError={() => setImgFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    )
  }

  return (
    <div style={base}>
      <span
        className="bf-mono"
        style={{ color: 'var(--bf-text-subtle)', fontSize: '0.6875rem', letterSpacing: '0.1em' }}
      >
        // sem preview
      </span>
    </div>
  )
}
