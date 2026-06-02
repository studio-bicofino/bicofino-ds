import { Nav } from '@/components/Nav'
import { Reveal } from '@/components/Reveal'
import { MonthSelector } from '@/components/MonthSelector'
import { PrintButton } from '@/components/PrintButton'
import { CopyPhrase } from '@/components/CopyPhrase'
import { PecaCard } from '@/components/PecaCard'
import { getView, mesesDisponiveis } from '@/lib/data'
import { fmtBRL, fmtHoras, fmtX, nomeMes } from '@/lib/format'

export default async function Fechamento({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string }>
}) {
  const meses = mesesDisponiveis()
  const { mes } = await searchParams
  const periodo = mes ?? meses[0] ?? 'all'
  const view = getView(periodo)
  const imp = view.impacto
  const titulo = periodo === 'all' ? 'Tudo até hoje' : nomeMes(periodo)

  return (
    <>
      <Nav />
      <main id="main-content" className="shell shell-main">
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
          <MonthSelector meses={meses} />
          <PrintButton />
        </div>

        {/* Cabeçalho do artefato */}
        <Reveal>
          <header style={{ marginBottom: 'var(--sp-6)', paddingBottom: 'var(--sp-5)', borderBottom: 'var(--bf-hairline)' }}>
            <span className="bf-eyebrow">// fechamento · Studio Bicofino</span>
            <h1 className="bf-h1" style={{ marginTop: 'var(--sp-3)', textTransform: 'capitalize' }}>{titulo}</h1>
          </header>
        </Reveal>

        {/* Números do mês */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-7)' }}>
          <Reveal delay={0}>
            <Stat eyebrow="Realizado no período" value={fmtBRL(imp.valorRealizadoAteHoje)} note={`${fmtBRL(imp.valorEconomizadoBrl)} peças · ${fmtBRL(imp.valorProjetosTotal)} projetos`} />
          </Reveal>
          <Reveal delay={60}>
            <Stat eyebrow="Horas economizadas" value={fmtHoras(imp.horasEconomizadasTotal)} note={`a ${fmtBRL(imp.custoHora)}/hora`} />
          </Reveal>
          <Reveal delay={120}>
            <Stat eyebrow="Líquido recorrente · mês" value={fmtBRL(imp.valorRecorrenteMes)} note={`${fmtBRL(imp.valorRecorrenteAno)}/ano no ritmo atual`} />
          </Reveal>
          <Reveal delay={180}>
            <Stat eyebrow="Ferramenta se paga" value={fmtX(imp.ferramentaPagaX)} note={`custa ${fmtBRL(imp.custoFerramenta)}/mês`} accent />
          </Reveal>
        </section>

        {/* Peças do mês */}
        <section style={{ marginBottom: 'var(--sp-7)' }}>
          <Reveal>
            <h2 className="bf-h2" style={{ marginBottom: 'var(--sp-4)' }}>Peças do período</h2>
          </Reveal>
          {view.pecas.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-4)' }}>
              {view.pecas.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <PecaCard peca={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="bf-body-sm">Nenhuma peça registrada neste período.</p>
          )}
        </section>

        {/* Frases */}
        <section>
          <Reveal>
            <h2 className="bf-h2" style={{ marginBottom: 'var(--sp-4)' }}>Para o fechamento</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--sp-4)' }}>
            {view.frases.map((f, i) => (
              <CopyPhrase key={f.id} frase={f} index={i} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function Stat({ eyebrow, value, note, accent }: { eyebrow: string; value: string; note: string; accent?: boolean }) {
  return (
    <div className="cell" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
      <span className="bf-eyebrow">{eyebrow}</span>
      <span className="bignum" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: accent ? 'var(--current-accent)' : undefined }}>{value}</span>
      <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>{note}</span>
    </div>
  )
}
