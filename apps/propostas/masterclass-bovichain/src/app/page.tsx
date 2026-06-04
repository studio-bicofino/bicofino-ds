import MetricsGrid from '@/components/MetricsGrid'
import InvestmentCard from '@/components/InvestmentCard'

const C = {
  border: 'var(--bf-border)',
  text:   'var(--bf-text-primary)',
  muted:  'var(--bf-text-secondary)',
  subtle: 'var(--bf-text-subtle)',
  accent: 'var(--current-accent)',
  eyebrow: 'var(--bf-nocciola-deep)',
  bg:     'var(--bf-bg-page)',
  surface: 'var(--bf-surface)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const H_PAD = 72
const hairline = '1px solid var(--bf-border)'

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{
        fontFamily:    mono,
        fontSize:      11,
        letterSpacing: '0.12em',
        color:         C.eyebrow,
        margin:        '0 0 12px',
        fontWeight:    600,
        textTransform: 'uppercase',
      }}>
        {eyebrow}
      </p>
      <h2
        className="text-balance bf-measure-heading"
        style={{
          fontFamily:    sans,
          fontSize:      40,
          fontWeight:    700,
          letterSpacing: '-0.03em',
          color:         C.text,
          margin:        0,
          lineHeight:    1.1,
        }}
      >
        {title}
      </h2>
    </div>
  )
}

export default function Page() {
  return (
    <div lang="pt-BR" style={{ background: C.bg }}>

      {/* HERO */}
      <section
        id="hero"
        style={{
          padding: `80px ${H_PAD}px 72px`,
          borderBottom: hairline,
        }}
      >
        <p style={{
          fontFamily:    mono,
          fontSize:      11,
          letterSpacing: '0.12em',
          color:         C.muted,
          textTransform: 'uppercase',
          fontWeight:    600,
          margin:        '0 0 20px',
        }}>
          Orçamento confidencial
        </p>

        <h1
          className="bf-measure-heading--narrow"
          style={{
            fontFamily:    sans,
            fontSize:      72,
            fontWeight:    700,
            letterSpacing: '-0.04em',
            color:         C.text,
            lineHeight:    1.0,
            margin:        '0 0 28px',
          }}
        >
          BoviClass
        </h1>

        <p
          className="bf-measure-lead text-balance"
          style={{
            fontFamily: sans,
            fontSize:   22,
            fontWeight: 400,
            color:      C.muted,
            lineHeight: 1.4,
            margin:     '0 0 40px',
          }}
        >
          Seis cursos em formato entrevista, 102 vídeos finalizados, cinco diárias em estúdio próprio.
        </p>

        {/* Metadados do projeto */}
        <div
          style={{
            display:    'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap:        24,
            marginTop:  40,
            paddingTop: 32,
            borderTop:  hairline,
            maxWidth:   880,
          }}
        >
          {[
            { label: 'Cliente',     value: 'BoviChain' },
            { label: 'Proponente',  value: 'Studio Bicofino' },
            { label: 'Campanha',    value: 'Série BoviClass' },
            { label: 'Janela',      value: 'Junho de 2026' },
          ].map((m) => (
            <div key={m.label}>
              <p style={{
                fontFamily:    mono,
                fontSize:      10,
                letterSpacing: '0.1em',
                color:         C.subtle,
                textTransform: 'uppercase',
                margin:        '0 0 6px',
              }}>
                {m.label}
              </p>
              <p style={{ fontFamily: sans, fontSize: 14, color: C.text, fontWeight: 500, margin: 0 }}>
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUÇÃO */}
      <section id="producao" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="Produção" title="Como vamos produzir" />

        <div className="bf-measure-duo" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>

          {/* Bloco 1 — Captação */}
          <div>
            <p style={{
              fontFamily:    mono,
              fontSize:      10,
              letterSpacing: '0.12em',
              color:         C.eyebrow,
              textTransform: 'uppercase',
              fontWeight:    600,
              margin:        '0 0 12px',
            }}>
              01 · Captação
            </p>
            <h3 style={{
              fontFamily: sans,
              fontSize:   20,
              fontWeight: 600,
              color:      C.text,
              margin:     '0 0 16px',
              lineHeight: 1.3,
            }}>
              Como gravamos
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Formato entrevista, conforme referência aprovada',
                '1 entrevistado por episódio',
                '5 diárias em estúdio próprio, em sequência',
                'Mesma cenografia e mesmo cenário para todos os episódios',
                'Teleprompter incluído',
                'Convidados chegam prontos para gravar',
                'Sem troca de figurino',
              ].map((it) => (
                <li key={it} style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 1, background: C.subtle }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloco 2 — Incluso */}
          <div>
            <p style={{
              fontFamily:    mono,
              fontSize:      10,
              letterSpacing: '0.12em',
              color:         C.eyebrow,
              textTransform: 'uppercase',
              fontWeight:    600,
              margin:        '0 0 12px',
            }}>
              02 · Incluso
            </p>
            <h3 style={{
              fontFamily: sans,
              fontSize:   20,
              fontWeight: 600,
              color:      C.text,
              margin:     '0 0 16px',
              lineHeight: 1.3,
            }}>
              O que entra no pacote
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Edição dos 102 vídeos finais',
                'Legendas',
                'Cartelas',
                'Seis vinhetas de abertura, uma por curso',
                'Motion graphics',
                'Color grading',
                'Edição de áudio da fala',
                'Equipe de criação, atendimento e produção',
                'Alimentação da equipe',
              ].map((it) => (
                <li key={it} style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 1, background: C.subtle }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* VOLUME DE ENTREGA */}
      <section id="volume" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="Volume de entrega" title="Entregas de junho" />

        <MetricsGrid />

        <p
          className="text-pretty bf-measure-body"
          style={{
            fontFamily: sans,
            fontSize:   15,
            lineHeight: 1.75,
            color:      C.muted,
            margin:     '40px 0 0',
          }}
        >
          Cada curso: 16 aulas e 1 teaser. No total, 96 vídeos horizontais e 6 cortes verticais para redes. Episódios entre 8 e 25 minutos.
        </p>
      </section>

      {/* INVESTIMENTO */}
      <section id="investimento" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="Investimento" title="Pacote fechado" />

        <InvestmentCard />
      </section>

      {/* FORA DO ESCOPO */}
      <section id="fora-do-escopo" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="Fora do escopo" title="Fora do escopo" />

        <div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Roteiros',
              'Imagens de pesquisa (banco de imagens)',
              'Trilha sonora',
              'Hair & make dos entrevistados',
              'Locação externa',
            ].map((it) => (
              <li key={it} style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 1, background: C.subtle }} />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRÓXIMO PASSO */}
      <section id="proximo-passo" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <p className="text-balance" style={{
            fontFamily: sans,
            fontSize:   18,
            lineHeight: 1.7,
            color:      C.muted,
            margin:     '0 0 8px',
          }}>
            Para fechar a proposta ou alinhar ajustes de escopo, escreva para
          </p>
          <a
            href="mailto:hello@bicofino.com"
            style={{
              fontFamily: sans,
              fontSize:   18,
              fontWeight: 600,
              color:      C.text,
              display:    'block',
              margin:     '8px 0 40px',
            }}
          >
            hello@bicofino.com
          </a>
          <p style={{ fontFamily: sans, fontSize: 14, color: C.subtle }}>
            Studio Bicofino — São Paulo
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: `32px ${H_PAD}px 48px`,
          borderTop: hairline,
        }}
      >
        {[
          '©bicofino  |  bicofino.com',
          'BoviClass · BoviChain · v2.0 · junho de 2026',
          'Documento confidencial. Distribuição restrita.',
        ].map((line, i) => (
          <p key={i} style={{
            fontFamily:    mono,
            fontSize:      10,
            color:         C.subtle,
            letterSpacing: '0.1em',
            marginBottom:  4,
          }}>
            {line}
          </p>
        ))}
      </footer>
    </div>
  )
}
