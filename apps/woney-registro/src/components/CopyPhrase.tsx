'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { Frase } from '@/lib/phrases'
import { useReveal } from './Reveal'

/* Bento de eficiência: o número em evidência, a frase como suporte, copiável. */
export function CopyPhrase({ frase, index = 0 }: { frase: Frase; index?: number }) {
  const [copied, setCopied] = useState(false)
  const { ref, shown } = useReveal<HTMLDivElement>()

  async function copy() {
    try {
      await navigator.clipboard.writeText(frase.texto)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard indisponível — silencioso */
    }
  }

  return (
    <div
      ref={ref}
      className={`cell bf-reveal-io${shown ? ' is-in' : ''}`}
      style={{
        padding: 'var(--sp-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-4)',
        justifyContent: 'space-between',
        transitionDelay: shown ? `${index * 60}ms` : undefined,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
        <span
          className="bignum"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--current-accent-ink)' }}
        >
          {frase.destaque.valor}
        </span>
        <span className="bf-eyebrow">{frase.destaque.rotulo}</span>
      </div>

      <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: 'var(--bf-text-secondary)' }}>
        {frase.texto}
      </p>

      <button
        type="button"
        onClick={copy}
        className="btn btn--ghost no-print"
        style={{ alignSelf: 'flex-start', fontSize: '0.75rem', color: copied ? 'color-mix(in srgb, var(--bf-sep) 70%, var(--bf-black))' : 'var(--bf-text-secondary)' }}
        aria-label="Copiar frase"
      >
        {copied ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  )
}
