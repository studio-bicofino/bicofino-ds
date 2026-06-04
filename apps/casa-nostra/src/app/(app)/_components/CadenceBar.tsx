type Props = {
  lastContactDate: string | null
  targetPerYear: number | null
}

const MS_PER_DAY = 1000 * 60 * 60 * 24

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })
}

type Status = {
  label: string
  color: string
  fill: string
}

function statusFromProgress(progress: number): Status {
  if (progress > 1.5) {
    return {
      label: 'atrasada',
      color: 'var(--bf-ops-danger)',
      fill: 'var(--bf-ops-danger)',
    }
  }
  if (progress > 1) {
    return {
      label: 'atenção',
      color: 'var(--bf-cn-amber)',
      fill: 'var(--bf-cn-amber)',
    }
  }
  return {
    label: 'em dia',
    color: 'var(--bf-ops-success)',
    fill: 'var(--bf-ops-success)',
  }
}

/**
 * Barra horizontal de progresso de cadência + status textual.
 * progress = days_since_last / (365 / target_per_year)
 *   ≤ 1.0  → em dia (success / verde SEP)
 *   ≤ 1.5  → atenção (âmbar)
 *   > 1.5  → atrasada (danger / SPFC)
 * Bate com os thresholds da stat strip em (app)/page.tsx.
 */
export function CadenceBar({ lastContactDate, targetPerYear }: Props) {
  if (!lastContactDate || !targetPerYear || targetPerYear <= 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 96 }}>
        <div
          style={{
            height: 4,
            width: '100%',
            background: 'var(--bf-border)',
            borderRadius: 2,
          }}
        />
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--bf-text-subtle)', letterSpacing: '0.04em' }}
        >
          —
        </span>
      </div>
    )
  }

  const window = 365 / targetPerYear
  const daysSince = Math.max(
    0,
    Math.floor((Date.now() - new Date(lastContactDate).getTime()) / MS_PER_DAY),
  )
  const progress = daysSince / window
  const fillPct = Math.min(100, progress * 100)
  const status = statusFromProgress(progress)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 96 }}>
      <div
        style={{
          position: 'relative',
          height: 4,
          width: '100%',
          background: 'var(--bf-border)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${fillPct}%`,
            background: status.fill,
            borderRadius: 2,
            transition: 'width 200ms ease-out, background-color 200ms ease-out',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: status.color,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {status.label}
        </span>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--bf-text-subtle)', letterSpacing: '0.04em' }}
        >
          {formatDate(lastContactDate)}
        </span>
      </div>
    </div>
  )
}
