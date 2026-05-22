interface TeseBlockProps {
  paragraphs: string[]
  quote: string
  quoteSource: string
}

export function TeseBlock({ paragraphs, quote, quoteSource }: TeseBlockProps) {
  return (
    <section style={{ padding: '0 72px 80px' }}>
      {paragraphs.map((text, i) => (
        <p
          key={i}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 17,
            lineHeight: 1.75,
            color: 'var(--bf-text-primary)',
            maxWidth: 720,
            marginBottom: i < paragraphs.length - 1 ? 24 : 0,
          }}
        >
          {text}
        </p>
      ))}

      <blockquote
        style={{
          marginTop: 48,
          paddingLeft: 24,
          borderLeft: '2px solid var(--current-accent)',
        }}
      >
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--bf-text-primary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {quote}
        </p>
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: 'var(--bf-text-secondary)',
            letterSpacing: '0.1em',
            marginTop: 8,
          }}
        >
          {quoteSource}
        </p>
      </blockquote>
    </section>
  )
}
