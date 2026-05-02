'use client'

import { useState, useEffect, useRef } from 'react'

const mono = '"JetBrains Mono", monospace'
const BASE = '/assets/on-field/athletes/guilherme-kerchner/campaigns/'

const IMAGES = [
  { src: `${BASE}gui-kerchner-campaign01.png`, n: '01' },
  { src: `${BASE}gui-kerchner-campaign02.png`, n: '02' },
  { src: `${BASE}gui-kerchner-campaign03.png`, n: '03' },
]

export function AthleteCampaignCarousel() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % IMAGES.length)
        setFading(false)
      }, 300)
    }, 4200)
    return () => clearInterval(timer)
  }, [])

  const img = IMAGES[idx]

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: 112, display: 'flex', flexDirection: 'column' }}>
      {/* Card */}
      <div style={{
        width: '100%', height: 156, borderRadius: 6,
        overflow: 'hidden', position: 'relative',
        border: '1px solid rgba(42,44,43,0.09)',
        background: '#e2eaf2',
      }}>
        <img
          key={img.src}
          src={img.src}
          alt={`Campaign ${img.n}`}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'opacity 280ms cubic-bezier(0.2,0,0,1)',
            opacity: fading ? 0 : 1,
            display: 'block',
          }}
          onError={e => {
            const el = e.target as HTMLImageElement
            el.style.display = 'none'
          }}
        />
      </div>
    </div>
  )
}
