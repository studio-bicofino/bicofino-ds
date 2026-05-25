import { cover, capitulos, colofao } from '@/content/italia'

const containerStyle: React.CSSProperties = {
  maxWidth: 980,
  margin: '0 auto',
  padding: '0 32px',
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
}

export default function Page() {
  return (
    <div>
      {/* Cover */}
      <section
        style={{
          padding: '120px 32px 80px',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--bf-border)',
        }}
      >
        <div style={containerStyle}>
          <div style={{ ...eyebrowStyle, marginBottom: 24 }}>
            {cover.serie} · Edição {cover.cadastro.edicao} · {cover.ano}
          </div>

          <h1
            style={{
              fontSize: 'clamp(72px, 14vw, 180px)',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              marginBottom: 32,
              fontVariationSettings: '"wght" 600',
            }}
          >
            {cover.titulo}
          </h1>

          <p
            className="bf-measure-lead"
            style={{
              fontSize: 'clamp(22px, 3vw, 30px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: 'var(--bf-text-primary)',
              marginBottom: 56,
              maxWidth: '24ch',
              letterSpacing: '-0.01em',
            }}
          >
            {cover.subtitulo}
          </p>

          <p
            className="bf-measure-body"
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: 'var(--bf-text-secondary)',
              marginBottom: 64,
            }}
          >
            {cover.abertura}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 24,
              paddingTop: 32,
              borderTop: '1px solid var(--bf-border)',
              maxWidth: 720,
            }}
          >
            {Object.entries(cover.cadastro).map(([k, v]) => (
              <div key={k}>
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--bf-text-secondary)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  {k}
                </span>
                <span style={{ fontSize: 14, color: 'var(--bf-text-primary)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sommario */}
      <section style={{ padding: '96px 32px' }}>
        <div style={containerStyle}>
          <div style={{ ...eyebrowStyle, marginBottom: 32 }}>Sommario</div>
          <ol style={{ listStyle: 'none', padding: 0 }}>
            {capitulos.map((c) => (
              <li
                key={c.numero}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr auto',
                  gap: 24,
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--bf-border)',
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 13,
                    color: 'var(--bf-accent)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {c.numero}
                </span>
                <div>
                  <a
                    href={`#cap-${c.numero.toLowerCase()}`}
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: 'var(--bf-text-primary)',
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {c.titulo}
                  </a>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--bf-text-secondary)',
                      fontStyle: 'italic',
                      lineHeight: 1.5,
                    }}
                  >
                    {c.subtitulo}
                  </p>
                </div>
                <a
                  href={`#cap-${c.numero.toLowerCase()}`}
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--bf-text-subtle)',
                    letterSpacing: '0.04em',
                  }}
                >
                  →
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capítulos */}
      {capitulos.map((c) => (
        <section
          key={c.numero}
          id={`cap-${c.numero.toLowerCase()}`}
          style={{
            padding: '96px 32px',
            borderTop: '1px solid var(--bf-border)',
          }}
        >
          <div style={containerStyle}>
            <span className="bf-rule" />
            <div style={{ ...eyebrowStyle, margin: '24px 0 16px' }}>
              Capítulo {c.numero}
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                marginBottom: 12,
                maxWidth: '18ch',
              }}
            >
              {c.titulo}
            </h2>
            <p
              style={{
                fontSize: 18,
                color: 'var(--bf-text-secondary)',
                fontStyle: 'italic',
                marginBottom: 56,
                lineHeight: 1.4,
                maxWidth: '36ch',
              }}
            >
              {c.subtitulo}
            </p>

            <div
              className="bf-measure-body"
              style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              {c.paragrafos.map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? 'bf-dropcap' : undefined}
                  style={{
                    fontSize: 17,
                    lineHeight: 1.78,
                    color: 'var(--bf-text-primary)',
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Colofão */}
      <section
        style={{
          padding: '96px 32px',
          borderTop: '1px solid var(--bf-border-strong)',
          background: 'var(--bf-surface-subtle)',
        }}
      >
        <div style={containerStyle}>
          <div style={{ ...eyebrowStyle, marginBottom: 32 }}>{colofao.titulo}</div>
          <div
            className="bf-measure-body"
            style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 56 }}
          >
            {colofao.paragrafos.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: 'var(--bf-text-primary)',
                }}
              >
                {p}
              </p>
            ))}
          </div>

          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '14px 32px',
              maxWidth: 560,
              fontSize: 14,
            }}
          >
            {colofao.meta.map(([k, v]) => (
              <div key={k} style={{ display: 'contents' }}>
                <dt
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--bf-text-secondary)',
                  }}
                >
                  {k}
                </dt>
                <dd style={{ color: 'var(--bf-text-primary)' }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
