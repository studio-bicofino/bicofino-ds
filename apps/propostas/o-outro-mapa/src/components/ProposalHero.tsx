interface ProposalHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  lead: string
}

export function ProposalHero({ eyebrow, title, subtitle, lead }: ProposalHeroProps) {
  return (
    <header
      style={{
        padding: '80px 72px 72px',
        borderBottom: '1px solid var(--bf-border)',
      }}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.12em',
          color: 'var(--bf-text-secondary)',
          textTransform: 'uppercase',
          fontWeight: 600,
          margin: '0 0 20px',
        }}
      >
        {eyebrow}
      </p>

      <h1
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 80,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'var(--bf-text-primary)',
          lineHeight: 1.0,
          margin: '0 0 28px',
          textWrap: 'balance',
        } as React.CSSProperties}
      >
        {title}
      </h1>

      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 22,
          fontWeight: 400,
          color: 'var(--bf-text-secondary)',
          lineHeight: 1.4,
          maxWidth: 680,
          margin: '0 0 40px',
        }}
      >
        {subtitle}
      </p>

      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 16,
          lineHeight: 1.75,
          color: 'var(--bf-text-secondary)',
          maxWidth: 680,
          textWrap: 'pretty',
        } as React.CSSProperties}
      >
        {lead}
      </p>
    </header>
  )
}
