import { PricingCards } from '@/components/PricingCards'

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

/* Imposto = 14,25% via gross-up. Honorários (15%) só em CAPTAÇÃO e ALIMENTAÇÃO.
   Cálculo:
     CAPTAÇÃO (150000 + 22500) / 0,8575 = 201166,18
     EQUIPE   (25000)          / 0,8575 =  29154,52
     ALIMENT. (14000 +  2100)  / 0,8575 =  18775,51
     ESTÚDIO  (25000)          / 0,8575 =  29154,52
   Total: 278250,73 */
const TOTAL_BICOFINO = 278250.73

/* ────────── totais comparativos das 3 opções ────────── */
const OPCOES = [
  {
    nome: 'Oitorama',
    descritor: 'Estúdio parceiro',
    total: 195000,
    destaque: false,
    features: [
      'Estúdio parceiro Oitorama',
      'Cenografia ajustada ao espaço',
      'Estúdio de produção consolidado',
      'Custo otimizado',
    ],
    descricao: 'Operação no estúdio parceiro, com infraestrutura já consolidada e o melhor custo do pacote.',
  },
  {
    nome: 'Epro',
    descritor: 'Estúdio · locação externa',
    total: 235000,
    destaque: false,
    features: [
      'Locação externa no Epro',
      'Cenografia adaptada ao espaço',
      'Estúdio profissional consolidado',
      'Logística simplificada',
    ],
    descricao: 'Locação em estúdio profissional externo, mantendo o mesmo pacote de captação e edição.',
  },
  {
    nome: 'Studio Bicofino',
    descritor: 'Estúdio próprio · cenografia sob medida',
    total: TOTAL_BICOFINO, // R$ 278.250,73
    destaque: true,
    features: [
      'Estúdio próprio Studio Bicofino',
      'Cenografia sob medida (sala/biblioteca)',
      'Setup dedicado nas cores da marca',
      'Controle total do espaço',
    ],
    descricao: 'Operação 100% interna, com cenografia e direção de arte desenhadas especificamente para a campanha.',
  },
]

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
          Orçamento ✦ Confidencial
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
          Seis cursos · 96 vídeos horizontais e 6 cortes verticais · captação e edição completas em junho.
        </p>

        <p
          className="bf-measure-body text-pretty"
          style={{
            fontFamily: sans,
            fontSize:   16,
            lineHeight: 1.75,
            color:      C.muted,
            marginBottom: 32,
          }}
        >
          Esta proposta apresenta três cenários de produção para a campanha BoviClass da BoviChain, todos com o mesmo escopo de captação, edição e entrega. A variação entre as opções está exclusivamente no estúdio de gravação, o que reorganiza a estrutura de custos sem alterar o resultado audiovisual.
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
            { label: 'Campanha',    value: 'BoviClass' },
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

      {/* COMPARATIVO DAS 3 OPÇÕES */}
      <section id="opcoes" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="Três cenários" title="Três opções de produção, mesmo escopo de entrega" />
        <p
          className="text-pretty bf-measure-body"
          style={{
            fontFamily:   sans,
            fontSize:     17,
            lineHeight:   1.75,
            color:        C.muted,
            margin:       '0 0 48px',
          }}
        >
          O escopo de captação (cinco diárias, dois operadores de câmera, equipe completa), a alimentação da equipe e o pacote de edição permanecem idênticos nas três opções. O que muda é o local de gravação — e, por consequência, o custo de estúdio incorporado ao pacote.
        </p>

        <PricingCards opcoes={OPCOES} />
      </section>

      {/* ESCOPO / OBSERVAÇÕES */}
      <section id="escopo" style={{ padding: `80px ${H_PAD}px`, borderBottom: hairline }}>
        <SectionHeader eyebrow="Escopo" title="O que está incluído na produção" />

        <div className="bf-measure-duo" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>

          {/* Bloco 1 — Captação e Edição */}
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
              01 · Captação e edição
            </p>
            <h3 style={{
              fontFamily: sans,
              fontSize:   20,
              fontWeight: 600,
              color:      C.text,
              margin:     '0 0 16px',
              lineHeight: 1.3,
            }}>
              Volume de entrega
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Até 5 diárias de gravação',
                '6 cursos no total · 16 aulas + 1 teaser por curso',
                'Total: 96 vídeos horizontais + 6 cortes verticais para redes = 102 vídeos finais',
                'Duração média de cada episódio: entre 8 e 25 minutos',
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
                'Local: Studio Bicofino (Opção 1) · Epro (Opção 2) · Oitorama (Opção 3)',
                'Cenografia: sala/biblioteca conforme referência, nas cores da identidade visual',
                'Captação completa com 2 câmeras e equipe profissional para até 5 diárias',
                'Edição completa: cartelas, vinheta de abertura, motion e color grading',
                'Legenda no corte vertical · YouTube usa legenda automática da plataforma',
                'TP e profissional operador de TP',
                'Iluminação de fotografia',
                'Áudio (captação de conteúdo e fala)',
                'Cartelas de abertura e encerramento',
              ].map((it) => (
                <li key={it} style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 1, background: C.subtle }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloco 3 — Prazos */}
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
              03 · Prazos
            </p>
            <h3 style={{
              fontFamily: sans,
              fontSize:   20,
              fontWeight: 600,
              color:      C.text,
              margin:     '0 0 16px',
              lineHeight: 1.3,
            }}>
              Gravação e entregas
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Início das gravações: começo de junho de 2026',
                'Finalização e entrega de todos os vídeos: até o final de junho de 2026',
              ].map((it) => (
                <li key={it} style={{ fontFamily: sans, fontSize: 14, color: C.muted, lineHeight: 1.6, paddingLeft: 16, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 10, width: 6, height: 1, background: C.subtle }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloco 4 — Não incluso */}
          <div>
            <p style={{
              fontFamily:    mono,
              fontSize:      10,
              letterSpacing: '0.12em',
              color:         C.subtle,
              textTransform: 'uppercase',
              fontWeight:    600,
              margin:        '0 0 12px',
            }}>
              04 · Não incluso
            </p>
            <h3 style={{
              fontFamily: sans,
              fontSize:   20,
              fontWeight: 600,
              color:      C.text,
              margin:     '0 0 16px',
              lineHeight: 1.3,
            }}>
              Fora do escopo
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Roteiros e trabalhos de redação',
                'Imagens de pesquisa ou referência para compor as edições além das captadas em estúdio',
                'Trilha sonora original',
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
            Para fechar a opção escolhida ou alinhar ajustes de escopo, escreva para
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
          'BoviClass · BoviChain — v1.0 — maio de 2026',
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
