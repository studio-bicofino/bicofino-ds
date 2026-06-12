import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { MonthSelector } from '@/components/MonthSelector'
import { CopyPhrase } from '@/components/CopyPhrase'
import { PecaCard } from '@/components/PecaCard'
import { getView, mesesDisponiveis } from '@/lib/data'
import { settings, sistemas, usos } from '@/lib/seed'
import { analisarTerceirizacao } from '@/lib/calc'
import { fmtBRL, fmtHoras, fmtX, nomeMes } from '@/lib/format'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { Reveal } from '@/components/Reveal'

export default async function Painel({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string }>
}) {
  const { mes } = await searchParams
  const periodo = mes ?? 'all'
  const view = getView(periodo)
  const imp = view.impacto
  const meses = mesesDisponiveis()
  // Benchmark de mercado é acumulado por natureza — sempre sobre o seed inteiro.
  const terc = analisarTerceirizacao(settings, sistemas, usos)

  const escopo = periodo === 'all' ? 'Tudo até hoje' : nomeMes(periodo)

  return (
    <>
      <Nav />
      <main id="main-content" className="shell shell-main">
        {/* Cabeçalho */}
        <div className="bf-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-7)' }}>
          <h1 style={{ display: 'flex', flexDirection: 'column', maxWidth: 900, margin: 0 }}>
            <span className="bf-impact" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>Economia</span>
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
              com <span style={{ color: 'var(--current-accent-ink)', fontWeight: 400 }}>sistemas</span> desenvolvidos
            </span>
          </h1>
          <MonthSelector meses={meses} />
        </div>

        {/* Faixa de números grandes — o argumento */}
        <section className="bento bf-reveal" style={{ marginBottom: 'var(--sp-3)' }}>
          <BigStat
            span={4}
            accentFill
            delay={0}
            eyebrow={periodo === 'all' ? 'Economia até hoje' : `Realizado · ${escopo}`}
            value={imp.valorRealizadoAteHoje}
            kind="brl"
            size="clamp(2.2rem, 5vw, 3.4rem)"
            note={`${fmtBRL(imp.valorEconomizadoBrl)} em peças · ${fmtBRL(imp.valorProjetosTotal)} em projetos`}
          />
          <BigStat
            span={5}
            delay={65}
            eyebrow="Valor líquido recorrente/ano"
            value={imp.valorRecorrenteAno}
            kind="brl"
            size="clamp(2.6rem, 6vw, 4.4rem)"
            note={`${fmtBRL(imp.valorRecorrenteMes)} / mês, no ritmo atual`}
          />
          <BigStat
            span={3}
            delay={130}
            eyebrow="Claude Max se paga"
            value={imp.ferramentaPagaX}
            kind="x"
            size="clamp(2.2rem, 5vw, 3.4rem)"
            note={`US$ ${settings.ferramenta_usd.toFixed(0)} / mês`}
          />
        </section>

        {/* Decomposição — em segundo plano */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', marginBottom: 'var(--sp-7)' }}>
          <div
            className="cell cell--quiet bf-reveal decomp-eq"
            style={{ flex: '1 1 620px', minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-5)', alignItems: 'center', fontFamily: 'var(--bf-font-mono)', fontSize: '0.8125rem', color: 'var(--bf-black)' }}
          >
            <Decomp label="Economia de eficiência" value={`+ ${fmtBRL(imp.economiaMesBrl)}/mês`} />
            <span aria-hidden className="decomp-op" style={{ color: 'var(--bf-black)' }}>+</span>
            <Decomp label="Programador júnior" value={`+ ${fmtBRL(imp.custoFixoEvitado)}/mês`} />
            <span aria-hidden className="decomp-op" style={{ color: 'var(--bf-black)' }}>−</span>
            <Decomp label="Claude Max" value={`${fmtBRL(imp.custoFerramenta)}/mês`} />
            <span aria-hidden className="decomp-op" style={{ color: 'var(--bf-black)' }}>=</span>
            <Decomp label="Ganho líquido recorrente" value={`${fmtBRL(imp.valorRecorrenteMes)}/mês`} strong accent />
          </div>
          <div
            className="cell cell--quiet bf-reveal"
            style={{ flex: '1 1 280px', display: 'flex', alignItems: 'center', fontFamily: 'var(--bf-font-mono)', fontSize: '0.8125rem', color: 'var(--bf-black)' }}
          >
            {fmtHoras(imp.horasEconomizadasTotal)} já economizadas · pagamento Woney {fmtBRL(settings.salario_mensal)}
          </div>
          <div
            className="cell cell--quiet bf-reveal"
            style={{ flex: '1 1 280px', display: 'flex', alignItems: 'center', fontFamily: 'var(--bf-font-mono)', fontSize: '0.8125rem', color: 'var(--bf-black)' }}
          >
            no mercado, estes sistemas custariam {fmtBRL(terc.totalBrl)} e {terc.prazoSemanasTotal} semanas —{' '}
            {fmtX(terc.multiploMercado)} o que custaram por dentro
          </div>
        </section>

        {/* Galeria viva */}
        <section style={{ marginBottom: 'var(--sp-7)' }}>
          <Reveal style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }}>
            <h2 className="bf-h2">Galeria viva</h2>
            <Link href="/galeria" className="btn btn--ghost" style={{ fontSize: '0.8125rem' }}>
              Ver tudo <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </Reveal>
          {view.pecas.length > 0 ? (
            <Reveal delay={80} style={{ display: 'flex', gap: 'var(--sp-4)', overflowX: 'auto', paddingBottom: 'var(--sp-3)' }}>
              {view.pecas.slice(0, 6).map((p) => (
                <PecaCard key={p.id} peca={p} compact />
              ))}
            </Reveal>
          ) : (
            <p className="bf-body-sm">Nenhuma peça registrada neste período.</p>
          )}
        </section>

        {/* Eficiência em números — bento de dados + frase copiável */}
        <section>
          <Reveal>
            <h2 className="bf-h2" style={{ marginBottom: 'var(--sp-4)' }}>Eficiência em números</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--sp-4)' }}>
            {view.frases.map((f, i) => (
              <CopyPhrase key={f.id} frase={f} index={i} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function BigStat({
  span,
  eyebrow,
  value,
  kind,
  note,
  size,
  accentFill,
  delay = 0,
}: {
  span: number
  eyebrow: string
  value: number
  kind: 'brl' | 'x'
  note: string
  size: string
  accentFill?: boolean
  delay?: number
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
      <AnimatedNumber
        value={value}
        kind={kind}
        className="bignum"
        style={{ fontSize: size, color: accentFill ? 'var(--current-accent-on)' : 'var(--bf-text-primary)' }}
      />
      <span
        className="bf-mono"
        style={{ fontSize: '0.75rem', color: accentFill ? 'color-mix(in srgb, var(--current-accent-on) 88%, transparent)' : 'var(--bf-black)' }}
      >
        {note}
      </span>
    </div>
  )
}

function Decomp({ label, value, strong, accent }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <span className="decomp-term" style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--sp-1)', minWidth: 0 }}>
      <span style={{ fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bf-black)' }}>
        {label}
      </span>
      <span style={{ color: accent ? 'var(--current-accent-ink)' : 'var(--bf-black)', fontWeight: strong ? 700 : 400 }}>
        {value}
      </span>
    </span>
  )
}
