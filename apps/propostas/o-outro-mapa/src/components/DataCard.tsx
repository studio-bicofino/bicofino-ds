interface DataCardProps {
  number: string
  text: string
  source: string
}

export function DataCard({ number, text, source }: DataCardProps) {
  return (
    <div
      style={{
        padding: '32px 24px',
        border: '1px solid var(--bf-border)',
        borderRadius: 4,
      }}
    >
      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--bf-text-primary)',
          lineHeight: 1,
          margin: '0 0 12px',
        }}
      >
        {number}
      </p>

      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 14,
          lineHeight: 1.5,
          color: 'var(--bf-text-secondary)',
          margin: '0 0 16px',
        }}
      >
        {text}
      </p>

      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: 'var(--bf-text-subtle)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {source}
      </p>
    </div>
  )
}
