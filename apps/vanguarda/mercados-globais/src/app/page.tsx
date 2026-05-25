import {
  sumario,
  angulo1Prospects,
  angulo2Wealth,
  angulo3Matches,
  angulo4Club,
  metodoQuarteto,
  descartes,
  capabilities,
  type Prospect,
  type WealthTese,
  type Match,
  type ClubFormato,
} from '@/content/cruzamento'

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

const cardStyle: React.CSSProperties = {
  background: 'var(--bf-surface)',
  border: '1px solid var(--bf-border)',
  borderRadius: 8,
  padding: 32,
  marginBottom: 24,
}

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  display: 'block',
  marginBottom: 6,
}

const fieldStyle: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.65,
  color: 'var(--bf-text-primary)',
  marginBottom: 16,
}

function ProspectCard({ item }: { item: Prospect | WealthTese | Match }) {
  const title = 'nome' in item ? item.nome : item.titulo
  return (
    <article style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: 'var(--bf-accent)',
            border: '1px solid var(--bf-accent)',
            padding: '2px 8px',
            borderRadius: 2,
          }}
        >
          {item.codigo}
        </span>
        <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{title}</h3>
      </div>
      <p
        className="mono"
        style={{
          fontSize: 12,
          color: 'var(--bf-text-secondary)',
          marginBottom: 24,
          letterSpacing: '0.01em',
        }}
      >
        {item.setor}
      </p>

      <div style={{ marginBottom: 18 }}>
        <span style={labelStyle}>Por quê</span>
        <p style={fieldStyle}>{item.porQue}</p>
      </div>
      <div style={{ marginBottom: 18 }}>
        <span style={labelStyle}>Sinal do mapa</span>
        <p style={fieldStyle}>{item.sinal}</p>
      </div>
      <div style={{ marginBottom: 18 }}>
        <span style={labelStyle}>Abordagem</span>
        <p style={fieldStyle}>{item.abordagem}</p>
      </div>
      <div>
        <span style={labelStyle}>Cuidado / risco</span>
        <p style={{ ...fieldStyle, marginBottom: 0, color: 'var(--bf-text-secondary)' }}>{item.cuidado}</p>
      </div>
    </article>
  )
}

function ClubCard({ item }: { item: ClubFormato }) {
  return (
    <article style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4, flexWrap: 'wrap' }}>
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: 'var(--bf-accent)',
            border: '1px solid var(--bf-accent)',
            padding: '2px 8px',
            borderRadius: 2,
          }}
        >
          {item.codigo}
        </span>
        <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>{item.nome}</h3>
      </div>
      <p
        className="mono"
        style={{
          fontSize: 12,
          color: 'var(--bf-text-secondary)',
          marginBottom: 20,
        }}
      >
        {item.periodicidade}
      </p>

      <div style={{ marginBottom: 18 }}>
        <span style={labelStyle}>Formato</span>
        <p style={fieldStyle}>{item.formato}</p>
      </div>
      <div style={{ marginBottom: 18 }}>
        <span style={labelStyle}>Fonte primária</span>
        <p style={{ ...fieldStyle, fontFamily: '"JetBrains Mono", monospace', fontSize: 13 }}>{item.fonte}</p>
      </div>
      <div
        style={{
          borderTop: '1px solid var(--bf-border)',
          paddingTop: 20,
          marginTop: 20,
        }}
      >
        <span style={labelStyle}>Edição-piloto</span>
        <h4 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em' }}>
          {item.pilotoTitulo}
        </h4>
        <p style={{ ...fieldStyle, marginBottom: 0 }}>{item.pilotoDescricao}</p>
      </div>
    </article>
  )
}

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 32px 64px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Cruzamento · {sumario.data}</div>
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
            Mercados globais pela lente Bicofino.
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
            Voz · {sumario.voz}
          </p>
        </div>
      </section>

      {/* Ângulo 1 */}
      <section id="angulo-1" style={{ padding: '64px 32px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Ângulo 1 · 6 prospects</div>
          <h2 style={sectionTitleStyle}>Cliente Off Pitch</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Seis prospects qualificados para os serviços Off Pitch (branding, advertising, conteúdo, PR executivo,
            personal branding, conexão atleta-marca). Ordem por fit × ticket potencial.
          </p>
          {angulo1Prospects.map((p) => (
            <ProspectCard key={p.codigo} item={p} />
          ))}
        </div>
      </section>

      {/* Ângulo 2 */}
      <section id="angulo-2" style={{ padding: '64px 32px', background: 'var(--bf-surface-subtle)' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Ângulo 2 · 5 teses</div>
          <h2 style={sectionTitleStyle}>Tese para Bicofino-Wealth</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Cinco teses que sustentam recomendação institucional de alocação para atletas do Cluster A, executivos do
            Cluster B e Patriarcas do Cluster C. Cada uma referencia dado quantitativo do mapa.
          </p>
          {angulo2Wealth.map((t) => (
            <ProspectCard key={t.codigo} item={t} />
          ))}
        </div>
      </section>

      {/* Ângulo 3 */}
      <section id="angulo-3" style={{ padding: '64px 32px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Ângulo 3 · 4 matches</div>
          <h2 style={sectionTitleStyle}>Conexão On ↔ Off</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Quatro matches onde o ativo mais raro do Bicofino (acesso direto a atleta/personalidade premium) encontra
            demanda real do mapa.
          </p>
          {angulo3Matches.map((m) => (
            <ProspectCard key={m.codigo} item={m} />
          ))}
        </div>
      </section>

      {/* Ângulo 4 */}
      <section id="angulo-4" style={{ padding: '64px 32px', background: 'var(--bf-surface-subtle)' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Ângulo 4 · 4 formatos</div>
          <h2 style={sectionTitleStyle}>Produto editorial Club</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Quatro formatos, não oportunidades individuais. O VANGUARDA Mapa é matéria-prima; o Club é a transformação
            editorial.
          </p>
          {angulo4Club.map((c) => (
            <ClubCard key={c.codigo} item={c} />
          ))}
        </div>
      </section>

      {/* Método Quarteto */}
      <section id="metodologia" style={{ padding: '96px 32px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Ângulo 5 · Método replicável</div>
          <h2 style={sectionTitleStyle}>{metodoQuarteto.nomeInterno}</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--bf-text-primary)', marginBottom: 48 }}
          >
            {metodoQuarteto.paragrafo}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 40,
            }}
          >
            {metodoQuarteto.lentes.map((l) => (
              <article key={l.nome} style={cardStyle}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 8,
                  }}
                >
                  <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>{l.nome}</h3>
                  <span
                    className="mono"
                    style={{
                      fontSize: 18,
                      color: 'var(--bf-accent)',
                      fontWeight: 500,
                    }}
                  >
                    {l.peso.toFixed(2)}
                  </span>
                </div>
                <p
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--bf-text-secondary)', marginBottom: 18 }}
                >
                  {l.arquetipo}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    color: 'var(--bf-text-primary)',
                    marginBottom: 24,
                    paddingLeft: 14,
                    borderLeft: '2px solid var(--bf-accent)',
                  }}
                >
                  {l.pergunta}
                </p>

                <span style={labelStyle}>Critérios</span>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 20 }}>
                  {l.criterios.map((c, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: 'var(--bf-text-secondary)',
                        paddingLeft: 18,
                        position: 'relative',
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--bf-accent)',
                          fontFamily: 'monospace',
                        }}
                      >
                        ·
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>

                <span style={labelStyle}>Anti-patterns</span>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {l.antiPatterns.map((a, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 12,
                        lineHeight: 1.55,
                        color: 'var(--bf-text-subtle)',
                        paddingLeft: 18,
                        position: 'relative',
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0 }}>—</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div
            style={{
              padding: 24,
              border: '1px solid var(--bf-border-strong)',
              borderRadius: 8,
              textAlign: 'center',
              background: 'var(--bf-surface)',
            }}
          >
            <span style={labelStyle}>Nota composta</span>
            <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 8 }}>
              <span className="mono" style={{ color: 'var(--bf-text-secondary)' }}>
                Soberano × 0.35 + Consigliere × 0.25 + Criador-Raposa × 0.40
              </span>
              <br />
              <span style={{ marginTop: 8, display: 'inline-block' }}>
                Passing grade Bicofino:{' '}
                <strong style={{ color: 'var(--bf-accent)' }}>{metodoQuarteto.passingGrade}</strong>. Abaixo disso,
                refaz; não publica.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Descartes */}
      <section id="descartes" style={{ padding: '64px 32px', background: 'var(--bf-surface-subtle)' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Descartes explícitos · 8 itens</div>
          <h2 style={sectionTitleStyle}>O que ficou fora</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Oito oportunidades que parecem atrativas no mapa mas falham em pelo menos um filtro Bicofino. A recusa é o
            ato mais Soberano da casa.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {descartes.map((d, i) => (
              <li
                key={i}
                style={{
                  padding: '20px 0',
                  borderBottom: i < descartes.length - 1 ? '1px solid var(--bf-border)' : 'none',
                }}
              >
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{d.titulo}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--bf-text-secondary)' }}>{d.razao}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" style={{ padding: '64px 32px' }}>
        <div style={containerStyle}>
          <div style={eyebrowStyle}>Roadmap Bicofino-Platform</div>
          <h2 style={sectionTitleStyle}>Capabilities a priorizar</h2>
          <p
            className="bf-measure-body"
            style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--bf-text-secondary)', marginBottom: 48 }}
          >
            Capabilities recorrentes nas oportunidades acima. Informa o roadmap interno.
          </p>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              counterReset: 'capItem',
            }}
          >
            {capabilities.map((c, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '24px 0',
                  borderBottom: i < capabilities.length - 1 ? '1px solid var(--bf-border)' : 'none',
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
                <span style={{ fontSize: 16, lineHeight: 1.65 }}>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
