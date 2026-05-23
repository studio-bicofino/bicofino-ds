interface EntregavelGridProps {
  blocks: {
    eyebrow: string
    title: string
    items: string[]
  }[]
}

export function EntregavelGrid({ blocks }: EntregavelGridProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {blocks.map((block, i) => (
        <div
          key={i}
          style={{
            flex: '1 1 300px',
            minWidth: 280,
            padding: '28px 28px 32px',
            border: '1px solid var(--bf-border)',
            borderRadius: 4,
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: 'var(--current-accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 8px',
            }}
          >
            {block.eyebrow}
          </p>

          <h4
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--bf-text-primary)',
              margin: '0 0 16px',
            }}
          >
            {block.title}
          </h4>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {block.items.map((item, j) => (
              <li
                key={j}
                className="text-pretty"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 13,
                  color: 'var(--bf-text-secondary)',
                  lineHeight: 1.6,
                  padding: '3px 0 3px 14px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--current-accent)',
                    opacity: 0.7,
                  }}
                >
                  –
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
