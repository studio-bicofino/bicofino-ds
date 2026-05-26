type Props = {
  lastContactDate: string | null
  targetPerYear: number | null
}

const MS_PER_DAY = 1000 * 60 * 60 * 24

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' })
}

/**
 * Barra horizontal de progresso de cadência.
 * progress = days_since_last / (365 / target_per_year)
 *   ≤ 1.0  → dentro da janela (success)
 *   > 1.0  → atrasado (danger)
 * Sem dados → barra neutra com travessão.
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
  const isOverdue = progress > 1
  const fillPct = Math.min(100, progress * 100)
  const fillColor = isOverdue ? 'var(--bf-ops-danger)' : 'var(--bf-ops-success)'

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
            background: fillColor,
            borderRadius: 2,
            transition: 'width 200ms ease-out',
          }}
        />
      </div>
      <span
        className="mono"
        style={{ fontSize: 10, color: 'var(--bf-text-secondary)', letterSpacing: '0.04em' }}
      >
        {formatDate(lastContactDate)}
      </span>
    </div>
  )
}
