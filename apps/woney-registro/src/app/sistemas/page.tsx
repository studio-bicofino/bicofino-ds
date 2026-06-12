import { Nav } from '@/components/Nav'
import { Reveal } from '@/components/Reveal'
import { settings, sistemas, usos } from '@/lib/seed'
import { analisarEficiencia, analisarProjeto, analisarTerceirizacao, custoHora } from '@/lib/calc'
import { fmtBRL, fmtHoras, fmtX } from '@/lib/format'
import type { Terceirizacao } from '@/lib/types'

export default function Sistemas() {
  const ch = custoHora(settings)
  const eficiencia = sistemas.filter((s) => s.tipo === 'eficiencia')
  const infra = sistemas.filter((s) => s.tipo === 'infraestrutura')
  const projetos = sistemas.filter((s) => s.tipo === 'projeto')
  const terc = analisarTerceirizacao(settings, sistemas, usos)

  return (
    <>
      <Nav />
      <main id="main-content" className="shell shell-main">
        <Reveal>
          <header style={{ marginBottom: 'var(--sp-7)', maxWidth: 720 }}>
            <span className="bf-eyebrow">// inventário</span>
            <h1 className="bf-h1" style={{ marginTop: 'var(--sp-3)' }}>Sistemas e automações</h1>
            <p className="bf-body" style={{ marginTop: 'var(--sp-3)' }}>
              Eficiência se paga por uso. Infraestrutura é capital que destrava as outras —
              assenta uma vez, sustenta tudo. Projetos são ganhos pontuais de escala.
            </p>
          </header>
        </Reveal>

        {/* Benchmark de mercado — quanto custaria terceirizar tudo isso */}
        <Grupo titulo="No mercado" marcador="benchmark · software houses e agências BR, 2026">
          <Reveal>
            <article className="cell" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                <Metric
                  k="Terceirizado custaria"
                  v={fmtBRL(terc.totalBrl)}
                  sub={`faixa ${fmtBRL(terc.totalMinBrl)} – ${fmtBRL(terc.totalMaxBrl)}`}
                />
                <Metric
                  k="Fila de produção"
                  v={`${terc.prazoSemanasTotal} semanas`}
                  sub={`~${Math.round(terc.prazoSemanasTotal / 4.33)} meses, somando os prazos`}
                />
                <Metric
                  k="Custou por dentro"
                  v={fmtBRL(terc.custoInternoBrl)}
                  sub="horas registradas × custo/hora"
                />
                <Metric
                  k="O mercado cobra"
                  v={fmtX(terc.multiploMercado)}
                  sub="o que custou por dentro"
                />
              </div>
              <p className="bf-body-sm">
                Faixas de mercado BR 2025/26 por sistema (software house, agência digital ou especialista),
                a partir de pesquisa de 12/jun/2026 — fontes e escopo de cada estimativa registrados no seed.
                Construído internamente entre fevereiro e junho, em paralelo ao trabalho de design.
              </p>
            </article>
          </Reveal>
        </Grupo>

        {/* Eficiência */}
        <Grupo titulo="Eficiência" marcador="OpEx · economia por uso">
          {eficiencia.map((s, i) => {
            const a = analisarEficiencia(s, usos)
            return (
              <Reveal key={s.id} delay={i * 60}>
                <article className="cell" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-4)', alignItems: 'start' }}>
                    <h3 className="bf-h3" style={{ maxWidth: '70%' }}>{s.nome}</h3>
                    <span className={`pill ${a.pago ? 'pill--ok' : 'pill--accent'}`}>{a.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                    <Metric k="Por uso" v={fmtHoras(a.economiaPorUsoH)} sub={`${s.tempo_antes_min}→${s.tempo_depois_min} min`} />
                    <Metric k="Usos" v={String(a.usosAteHoje)} sub={`payback em ${a.usosPayback}`} />
                    <Metric k="Acumulado" v={fmtHoras(a.economiaAcumH)} sub={fmtBRL(a.economiaAcumH * ch)} />
                    <Metric k="Investimento" v={fmtHoras(s.investimento_horas)} sub="custo único" />
                    {s.terceirizacao && (
                      <Metric
                        k="No mercado"
                        v={fmtBRL(s.terceirizacao.valor_brl)}
                        sub={
                          s.terceirizacao.por_uso
                            ? 'por entrega, em agência'
                            : `${s.terceirizacao.prazo_semanas} semanas, fora`
                        }
                      />
                    )}
                  </div>
                  {s.notas && <p className="bf-body-sm">{s.notas}</p>}
                </article>
              </Reveal>
            )
          })}
        </Grupo>

        {/* Infraestrutura */}
        <Grupo titulo="Infraestrutura" marcador="CapEx · ativo permanente">
          {infra.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <article className="cell cell--dark" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-4)', alignItems: 'start' }}>
                  <h3 className="bf-h3" style={{ color: 'var(--bf-white)' }}>{s.nome}</h3>
                  <span className="pill" style={{ background: 'transparent', borderColor: 'var(--bf-line-on-dark)', color: 'var(--bf-platinum)' }}>
                    {fmtBRL(s.investimento_horas * ch)} de capital
                  </span>
                </div>
                {s.destravou && (
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--bf-platinum)' }}>
                    <strong style={{ color: 'var(--bf-white)' }}>Destravou — </strong>{s.destravou}
                  </p>
                )}
                {s.terceirizacao && (
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--bf-platinum)' }}>
                    <strong style={{ color: 'var(--bf-white)' }}>No mercado — </strong>
                    {linhaMercado(s.terceirizacao)}
                  </p>
                )}
                {s.natureza_valor && (
                  <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-platinum)' }}>
                    // {s.natureza_valor}
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </Grupo>

        {/* Projetos */}
        <Grupo titulo="Projetos" marcador="ganho pontual · escala de dias">
          {projetos.map((s, i) => {
            const p = analisarProjeto(s, settings)
            return (
              <Reveal key={s.id} delay={i * 60}>
                <article className="cell" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--sp-4)', alignItems: 'start' }}>
                    <h3 className="bf-h3" style={{ maxWidth: '70%' }}>{s.nome}</h3>
                    <span className="pill pill--accent">{fmtBRL(p.valorProjetoBrl)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                    <Metric k="Dias economizados" v={String(p.diasEconomizados)} sub={`${s.tempo_antes_dias}→${s.tempo_depois_dias} dias`} />
                    <Metric k="Horas" v={fmtHoras(p.horasProj)} sub="dia útil = 8h" />
                    {s.terceirizacao && (
                      <Metric
                        k="No mercado"
                        v={fmtBRL(s.terceirizacao.valor_brl)}
                        sub={`${s.terceirizacao.prazo_semanas} semanas, fora`}
                      />
                    )}
                  </div>
                  {s.notas && <p className="bf-body-sm">{s.notas}</p>}
                </article>
              </Reveal>
            )
          })}
        </Grupo>
      </main>
    </>
  )
}

function linhaMercado(t: Terceirizacao): string {
  return `~${fmtBRL(t.valor_brl)} e ${t.prazo_semanas} semanas (faixa ${fmtBRL(t.valor_min_brl)} – ${fmtBRL(
    t.valor_max_brl,
  )}). ${t.escopo}.`
}

function Grupo({ titulo, marcador, children }: { titulo: string; marcador: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--sp-8)' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <h2 className="bf-h2">{titulo}</h2>
          <span className="bf-mono" style={{ fontSize: '0.6875rem', color: 'var(--bf-text-subtle)' }}>// {marcador}</span>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>{children}</div>
    </section>
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
