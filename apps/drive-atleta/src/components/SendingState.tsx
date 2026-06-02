'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

const STEPS = [
  'Preparando arquivo',
  'Catalogando informações',
  'Enviando para o Drive do Atleta',
  'Material recebido pela Bicofino',
]

const STEP_MS = 720

/* Estado de envio — simula o upload com etapas e barra de progresso.
   Motion em CSS sob o teto do DS; chama onComplete ao fim. */
export function SendingState({
  count,
  onComplete,
}: {
  count: number
  onComplete: () => void
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(onComplete, 300)
      return () => clearTimeout(t)
    }
    if (active >= STEPS.length) {
      const t = setTimeout(onComplete, 360)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setActive((s) => s + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [active, onComplete])

  const ratio = Math.min(active / STEPS.length, 1)

  return (
    <div className="stack-6" style={{ maxWidth: 460, margin: '0 auto', paddingTop: 'var(--sp-7)' }}>
      <div className="stack-3">
        <span className="bf-eyebrow">// enviando {count}&nbsp;{count === 1 ? 'arquivo' : 'arquivos'}…</span>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Progresso do envio"
          aria-valuemin={0}
          aria-valuemax={STEPS.length}
          aria-valuenow={active}
        >
          <div className="progress-fill" style={{ transform: `scaleX(${ratio})` }} />
        </div>
      </div>

      <div role="status" aria-live="polite">
        {STEPS.map((label, i) => {
          const done = i < active
          const isActive = i === active
          return (
            <div key={label} className={`step${done ? ' is-done' : ''}${isActive ? ' is-active' : ''}`}>
              <span className="step__dot">
                {done ? <Check size={11} strokeWidth={2.5} /> : null}
              </span>
              <span className="step__label">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
