'use client'

import { ConsigliereInline } from '@/components/ConsigliereInline'

const C = {
  black:  'var(--bf-text-primary)',
  steel:  'var(--bf-text-secondary)',
  border: 'var(--bf-border)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const H_PAD = 'clamp(16px, 5vw, 72px)'

export default function Page() {
  return (
    <div style={{ padding: `80px ${H_PAD} 80px`, borderBottom: `1px solid ${C.border}` }}>
      <p style={{
        fontFamily:    mono,
        fontSize:      11,
        letterSpacing: '0.12em',
        color:         C.steel,
        margin:        '0 0 14px',
        fontWeight:    600,
        textTransform: 'uppercase',
      }}>
        // 00 · CONSIGLIERE
      </p>
      <h1
        className="text-balance"
        style={{
          fontSize:      52,
          fontWeight:    700,
          letterSpacing: '-0.03em',
          color:         C.black,
          margin:        0,
          lineHeight:    1.0,
          fontFamily:    sans,
        }}
      >
        Bicofino Consigliere
      </h1>

      <ConsigliereInline />
    </div>
  )
}
