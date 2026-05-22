interface ProposalFooterProps {
  brand?: string
  version?: string
  disclaimer?: string
}

export function ProposalFooter({
  brand = '©bicofino  |  bicofino.com',
  version = 'O Outro Mapa — v1.0 — 22 de maio de 2026',
  disclaimer = 'Documento confidencial. Distribuição restrita.',
}: ProposalFooterProps) {
  const lineStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    color: 'var(--bf-text-subtle)',
    letterSpacing: '0.1em',
    marginBottom: 4,
  }

  return (
    <footer
      style={{
        padding: '32px 72px 48px',
        borderTop: '1px solid var(--bf-border)',
      }}
    >
      <p style={lineStyle}>{brand}</p>
      <p style={lineStyle}>{version}</p>
      <p style={{ ...lineStyle, marginBottom: 0 }}>{disclaimer}</p>
    </footer>
  )
}
