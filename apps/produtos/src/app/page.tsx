import { BicofinoLogo } from '@/components/BicofinoLogo'
import { IphoneFrame } from '@/components/IphoneFrame'
import { MacbookFrame } from '@/components/MacbookFrame'
import { Reveal } from '@/components/Reveal'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { produtos, ferramentas, portfolio } from '@/lib/produtos'
import { fmtBRL, fmtFaixa } from '@/lib/format'

export default function Produtos() {
  return (
    <>
      {/* Cabeçalho */}
      <header
        className="no-print"
        style={{
          borderBottom: 'var(--bf-hairline)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'color-mix(in srgb, var(--bf-bg-page) 88%, transparent)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="shell nav-inner"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--sp-8)' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <BicofinoLogo width={118} color="var(--bf-text-primary)" />
            <span
              className="bf-mono nav-tag"
              style={{ fontSize: '0.75rem', color: 'var(--bf-text-subtle)', letterSpacing: '0.04em' }}
            >
              // produtos
            </span>
          </span>
          <span className="bf-mono nav-tag" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
            uso interno · jun 2026
          </span>
        </div>
      </header>

      <main id="main-content" className="shell shell-main">
        {/* Hero */}
        <div
          className="bf-reveal"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-7)' }}
        >
          <h1 style={{ display: 'flex', flexDirection: 'column', maxWidth: 900, margin: 0 }}>
            <span className="bf-impact" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>Produtos</span>
            <span
              style={{
                fontFamily: 'var(--bf-font)',
                fontWeight: 300,
                fontSize: 'clamp(1.3rem, 3.4vw, 2.3rem)',
                letterSpacing: '-0.01em',
                color: 'var(--bf-text-secondary)',
                marginTop: 'var(--sp-1)',
              }}
            >
              sistemas próprios, prontos para <span style={{ color: 'var(--current-accent-ink)', fontWeight: 400 }}>novos clientes</span>
            </span>
          </h1>
          <p className="bf-body" style={{ maxWidth: 680 }}>
            Cada sistema abaixo foi construído pelo Studio Bicofino e roda em produção, em uso real.
            Os valores mostram o que o mercado cobra por encomenda equivalente — referência de valor
            para precificar cada projeto. Junto, o custo de operação que fica com o cliente:
            as assinaturas e ferramentas de cada sistema.
          </p>
        </div>

        {/* Faixa de números — o portfólio */}
        <section className="bento bf-reveal" style={{ marginBottom: 'var(--sp-7)' }}>
          <BigStat
            span={5}
            accentFill
            delay={0}
            eyebrow="Valor de mercado do portfólio"
            note={`faixa ${fmtFaixa(portfolio.valorMinBrl, portfolio.valorMaxBrl)} · pesquisa BR 2025/26`}
          >
            <AnimatedNumber
              value={portfolio.valorMercadoBrl}
              kind="brl"
              className="bignum"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.4rem)', color: 'var(--current-accent-on)' }}
            />
          </BigStat>
          <BigStat
            span={4}
            delay={65}
            eyebrow="Fila no mercado"
            note={`~${Math.round(portfolio.filaSemanasTotal / 4.33)} meses somando os prazos de cada encomenda`}
          >
            <span className="bignum" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
              {portfolio.filaSemanasTotal} semanas
            </span>
          </BigStat>
          <BigStat
            span={3}
            delay={130}
            eyebrow="Em produção"
            note="cada produto validado em uso real no Bicofino"
          >
            <span className="bignum" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
              {portfolio.totalProdutos} produtos
            </span>
          </BigStat>
        </section>

        {/* Catálogo */}
        <section style={{ marginBottom: 'var(--sp-8)' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
              <h2 className="bf-h2">Catálogo</h2>
              <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                // valor de mercado · prazo · operação do cliente
              </span>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
            {produtos.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article className="cell" style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                      <h3 className="bf-h3">
                        {p.nome}
                        {p.modulo && (
                          <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)', marginLeft: 'var(--sp-2)' }}>
                            // módulo da Fábrica de stories
                          </span>
                        )}
                      </h3>
                      <p className="bf-body-sm" style={{ margin: 0, maxWidth: 560 }}>{p.pitch}</p>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                      <Metric
                        k="Faixa de mercado"
                        v={fmtFaixa(p.mercado.min, p.mercado.max)}
                        sub={p.mercado.porEntrega ? 'por entrega, em agência' : 'encomenda equivalente, BR'}
                      />
                      <Metric
                        k="Prazo no mercado"
                        v={`${p.mercado.prazoSemanas} sem${p.mercado.prazoSemanas > 1 ? 'anas' : 'ana'}`}
                        sub={p.mercado.porEntrega ? 'cada entrega' : 'da encomenda ao entregue'}
                      />
                      <Metric k="Operação do cliente" v={p.infraMensal} sub="assinaturas e ferramentas" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                      {p.infra.map((item) => (
                        <span key={item.nome} className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                          · {item.nome} — {item.custo}
                        </span>
                      ))}
                      {p.infraNota && (
                        <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                          · {p.infraNota}
                        </span>
                      )}
                    </div>

                    <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-secondary)', marginTop: 'auto' }}>
                      // prova — {p.prova}
                    </span>
                  </div>

                  <div
                    style={{
                      flex: '0 1 340px',
                      minWidth: 240,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--sp-4)',
                      alignItems: 'flex-end',
                    }}
                  >
                    <span className="pill pill--accent" style={{ whiteSpace: 'nowrap' }}>
                      {fmtBRL(p.mercado.medio)}{p.mercado.porEntrega ? ' por entrega' : ' no mercado'}
                    </span>
                    {p.tela &&
                      (p.telaFrame === 'iphone' ? (
                        <div style={{ width: 'min(200px, 100%)' }}>
                          <IphoneFrame src={p.tela} alt={`Tela do produto ${p.nome}`} />
                        </div>
                      ) : (
                        <MacbookFrame src={p.tela} alt={`Tela do produto ${p.nome}`} />
                      ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Ferramentas e assinaturas — visão geral */}
        <section style={{ marginBottom: 'var(--sp-8)' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
              <h2 className="bf-h2">Ferramentas e assinaturas</h2>
              <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                // o que sustenta cada produto, a preços de jun/2026
              </span>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
            {ferramentas.map((f, i) => (
              <Reveal key={f.nome} delay={i * 60}>
                <article className="cell cell--quiet" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', height: '100%' }}>
                  <span className="bf-eyebrow">{f.papel}</span>
                  <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>{f.nome}</span>
                  <span className="bignum" style={{ fontSize: '1.25rem' }}>{f.custo}</span>
                  <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                    // {f.nota}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Nota de honestidade */}
        <Reveal>
          <footer
            style={{
              borderTop: 'var(--bf-hairline)',
              paddingTop: 'var(--sp-5)',
              paddingBottom: 'var(--sp-7)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-4)',
            }}
          >
            <p className="bf-body-sm" style={{ maxWidth: 680 }}>
              Valores de referência de junho de 2026 — pesquisa de mercado BR (IT Show, UDS, Plathanus,
              APPWRK/Taction, Via Agência Digital, ID7), câmbio US$ 1 ≈ R$ 5,40. As faixas mostram o que
              software houses e agências cobram por encomenda equivalente; cada projeto Bicofino recebe
              proposta própria, com escopo e prazo definidos junto ao cliente.
            </p>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
              <BicofinoLogo width={92} color="var(--bf-text-subtle)" />
              <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>
                // Studio Bicofino — sistemas próprios
              </span>
            </span>
          </footer>
        </Reveal>
      </main>
    </>
  )
}

function BigStat({
  span,
  eyebrow,
  note,
  accentFill,
  delay = 0,
  children,
}: {
  span: number
  eyebrow: string
  note: string
  accentFill?: boolean
  delay?: number
  children: React.ReactNode
}) {
  return (
    <div
      className="cell bf-reveal"
      style={{
        gridColumn: `span ${span}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-3)',
        minWidth: 220,
        background: accentFill ? 'var(--current-accent)' : undefined,
        borderColor: accentFill ? 'transparent' : undefined,
        animationDelay: `${delay}ms`,
      }}
    >
      <span
        className="bf-eyebrow"
        style={{ color: accentFill ? 'color-mix(in srgb, var(--current-accent-on) 78%, transparent)' : 'var(--bf-black)' }}
      >
        {eyebrow}
      </span>
      {children}
      <span
        className="bf-mono"
        style={{ fontSize: '0.75rem', color: accentFill ? 'color-mix(in srgb, var(--current-accent-on) 88%, transparent)' : 'var(--bf-black)' }}
      >
        {note}
      </span>
    </div>
  )
}

function Metric({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
      <span className="bf-eyebrow">{k}</span>
      <span className="bignum" style={{ fontSize: '1.5rem' }}>{v}</span>
      <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>{sub}</span>
    </div>
  )
}
