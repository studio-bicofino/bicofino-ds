interface TierCardProps {
  tierNumber: number
  tierName: string
  states: string[]
  description: string
  deliveries: string
  valuePerCamp: string
  tierTotal: string
}

export function TierCard({
  tierNumber,
  tierName,
  states,
  description,
  deliveries,
  valuePerCamp,
  tierTotal,
}: TierCardProps) {
  return (
    <div
      className="bf-tier-card"
      style={{
        padding: '40px 0',
        borderBottom: '1px solid var(--bf-border)',
      }}
    >
      <div
        className="bf-tier-card__row"
        style={{
          display: 'flex',
          gap: 48,
          alignItems: 'flex-start',
        }}
      >
        {/* Header — left column */}
        <div className="bf-tier-card__head" style={{ minWidth: 200, maxWidth: 220 }}>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: 'var(--current-accent)',
              letterSpacing: '0.14em',
              fontWeight: 600,
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            TIER {tierNumber}
          </p>

          <h3
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--bf-text-primary)',
              margin: '8px 0 12px',
            }}
          >
            {tierName}
          </h3>

          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: 'var(--bf-text-secondary)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {states.join(' · ')}
          </p>
        </div>

        {/* Details — right column */}
        <div className="bf-tier-card__body" style={{ flex: 1, minWidth: 0 }}>
          {/* Por que estão aqui */}
          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 9,
                color: 'var(--bf-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 4,
              }}
            >
              Por que estão aqui
            </p>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                color: 'var(--bf-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {description}
            </p>
          </div>

          {/* O que entrega */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 9,
                color: 'var(--bf-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 4,
              }}
            >
              O que entrega
            </p>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 13,
                color: 'var(--bf-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {deliveries}
            </p>
          </div>

          {/* Valor */}
          <div
            style={{
              borderTop: '1px solid var(--bf-border)',
              paddingTop: 16,
            }}
          >
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--bf-text-primary)',
                margin: 0,
              }}
            >
              {valuePerCamp}
            </p>
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                color: 'var(--bf-text-secondary)',
                marginTop: 4,
              }}
            >
              {tierTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
