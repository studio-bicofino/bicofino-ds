'use client'

import { Check, AlertCircle, RotateCcw } from 'lucide-react'

/* Estado de envio — agora dirigido por progresso REAL do upload.
   `ratio` (0..1) vem do XHR direto pro Google; `current`/`total` contam
   os arquivos do lote. Motion em CSS sob o teto do DS. */

const STEPS = ['Preparando arquivo', 'Enviando para o Drive do Atleta', 'Material recebido pela Bicofino']

export function SendingState({
  ratio,
  current,
  total,
  error,
  onRetry,
}: {
  ratio: number
  current: number
  total: number
  error: string | null
  onRetry: () => void
}) {
  // Mapeia o progresso contínuo para a etapa ativa (visual).
  const active = error ? 0 : ratio >= 1 ? STEPS.length : ratio > 0 ? 1 : 0

  return (
    <div className="stack-6" style={{ maxWidth: 460, margin: '0 auto', paddingTop: 'var(--sp-7)' }}>
      <div className="stack-3">
        <span className="bf-eyebrow">
          // enviando arquivo {Math.min(current, total)} de {total}…
        </span>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Progresso do envio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(ratio * 100)}
        >
          <div className="progress-fill" style={{ transform: `scaleX(${Math.min(Math.max(ratio, 0), 1)})` }} />
        </div>
      </div>

      {error ? (
        <div className="cell cell--pad-sm stack-3">
          <p className="bf-body-sm row" style={{ gap: 'var(--sp-2)', alignItems: 'flex-start', color: 'var(--bf-text-primary)' }}>
            <AlertCircle size={16} strokeWidth={1.5} aria-hidden style={{ flex: '0 0 auto', marginTop: 2 }} />
            {error}
          </p>
          <button className="btn btn--accent" onClick={onRetry} style={{ alignSelf: 'flex-start' }}>
            <RotateCcw size={16} strokeWidth={1.5} /> Tentar de novo
          </button>
        </div>
      ) : (
        <div role="status" aria-live="polite">
          {STEPS.map((label, i) => {
            const done = i < active
            const isActive = i === active
            return (
              <div key={label} className={`step${done ? ' is-done' : ''}${isActive ? ' is-active' : ''}`}>
                <span className="step__dot">{done ? <Check size={11} strokeWidth={2.5} /> : null}</span>
                <span className="step__label">{label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
