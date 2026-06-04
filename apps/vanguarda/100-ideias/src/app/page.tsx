import { sumario, descartes, sinaisPlatform, comparativo } from '@/content/curadoria'
import { TrilhaFilter } from '@/components/TrilhaFilter'

const containerStyle: React.CSSProperties = {
  maxWidth: 1080,
  margin: '0 auto',
  padding: '0 32px',
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'clamp(28px, 4vw, 44px)',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  marginBottom: 12,
  lineHeight: 1.1,
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  marginBottom: 12,
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
}

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 32px 64px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Curadoria · {sumario.data} · {sumario.versao}</div>
          <h1
            style={{
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              marginBottom: 32,
              maxWidth: '16ch',
            }}
          >
            42 ideias passaram. 58 não.
          </h1>
          <div className="bf-measure-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {sumario.paragrafos.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: i === 0 ? 19 : 17,
                  lineHeight: 1.65,
                  color: i === 0 ? 'var(--bf-text-primary)' : 'var(--bf-text-secondary)',
                }}
              >
                {p}
              </p>
            ))}
          </div>
          <p
            className="mono"
            style={{
              marginTop: 40,
              fontSize: 11,
              letterSpacing: '0.14em',
              color: 'var(--bf-text-subtle)',
              textTransform: 'uppercase',
            }}
          >
            Quatro filtros · Cluster · Estético · Triângulo Cultural · Conexão
          </p>
        </div>
      </section>

      {/* Trilhas + Edições */}
      <section style={{ padding: '32px 32px 64px' }}>
        <div style={containerStyle}>
          <TrilhaFilter />
        </div>
      </section>

      {/* Sinais para o Bicofino-Platform */}
      <section style={{ padding: '64px 32px', background: 'var(--bf-surface-subtle)' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Roadmap Bicofino-Platform</div>
          <h2 style={sectionTitleStyle}>Sinais transversais</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Padrões identificados na leitura que merecem virar item no roadmap interno.
          </p>
          <ol style={{ listStyle: 'none', padding: 0 }}>
            {sinaisPlatform.map((s, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '24px 0',
                  borderBottom: i < sinaisPlatform.length - 1 ? '1px solid var(--bf-border)' : 'none',
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 14,
                    color: 'var(--bf-accent)',
                    minWidth: 32,
                    fontWeight: 500,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 16, lineHeight: 1.65 }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Descartes */}
      <section style={{ padding: '64px 32px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Descartes explícitos · 15 itens</div>
          <h2 style={sectionTitleStyle}>O que ficou fora</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Quinze ideias do ranking ficaram fora da curadoria. O critério não é mérito — é fit. Cada descarte indica
            o filtro que não passou.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {descartes.map((d, i) => (
              <li
                key={d.rank}
                style={{
                  padding: '18px 0',
                  borderBottom: i < descartes.length - 1 ? '1px solid var(--bf-border)' : 'none',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 20,
                  alignItems: 'baseline',
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 12,
                    color: 'var(--bf-text-subtle)',
                    letterSpacing: '0.04em',
                    minWidth: 48,
                  }}
                >
                  #{String(d.rank).padStart(3, '0')}
                </span>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'baseline',
                      flexWrap: 'wrap',
                      marginBottom: 4,
                    }}
                  >
                    <h4 style={{ fontSize: 15, fontWeight: 600 }}>{d.titulo}</h4>
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: 'var(--bf-accent)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {d.filtro}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--bf-text-secondary)' }}>{d.razao}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparativo */}
      <section style={{ padding: '64px 32px', background: 'var(--bf-surface-subtle)' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Anexo · Rubrica VANGUARDA × Filtros Bicofino</div>
          <h2 style={sectionTitleStyle}>Onde a lente diverge</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Os filtros Bicofino são mais restritivos em três eixos (Estético, Triângulo Cultural, Conexão) e mais
            permissivos em dois (C6 capital, C8 skill) quando casam com Cluster certo.
          </p>
          <div
            style={{
              background: 'var(--bf-surface)',
              border: '1px solid var(--bf-border)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) 60px minmax(180px, 1fr) minmax(280px, 2fr)',
                padding: '14px 20px',
                borderBottom: '1px solid var(--bf-border)',
                background: 'var(--bf-surface-subtle)',
                gap: 12,
              }}
              className="mono"
            >
              <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bf-text-secondary)' }}>Critério</span>
              <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bf-text-secondary)' }}>Peso</span>
              <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bf-text-secondary)' }}>Filtro Bicofino</span>
              <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bf-text-secondary)' }}>Onde divergem</span>
            </div>
            {comparativo.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(220px, 1.4fr) 60px minmax(180px, 1fr) minmax(280px, 2fr)',
                  padding: '16px 20px',
                  borderBottom: i < comparativo.length - 1 ? '1px solid var(--bf-border)' : 'none',
                  gap: 12,
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>{row.criterio}</span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--bf-accent)' }}>{row.peso}</span>
                <span style={{ fontSize: 13, color: 'var(--bf-text-secondary)' }}>{row.filtro}</span>
                <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--bf-text-primary)' }}>
                  {row.divergencia}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
