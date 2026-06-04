'use client'

import { useMemo, useState } from 'react'
import { Nav } from '@/components/Nav'
import { PecaCard } from '@/components/PecaCard'
import { Reveal } from '@/components/Reveal'
import { getView, mesesDisponiveis } from '@/lib/data'
import { sistemas } from '@/lib/seed'
import { nomeMes, chaveMes } from '@/lib/format'

const PECAS = getView('all').pecas
const SISTEMAS_EFIC = sistemas.filter((s) => s.tipo === 'eficiencia')

export default function Galeria() {
  const [mes, setMes] = useState<string>('all')
  const [sis, setSis] = useState<string>('all')
  const meses = useMemo(() => mesesDisponiveis(), [])

  const pecas = PECAS.filter(
    (p) => (mes === 'all' || chaveMes(p.data) === mes) && (sis === 'all' || p.sistema_id === sis),
  )

  return (
    <>
      <Nav />
      <main id="main-content" className="shell shell-main">
        <Reveal>
          <header style={{ marginBottom: 'var(--sp-6)' }}>
            <span className="bf-eyebrow">// prova visual</span>
            <h1 className="bf-h1" style={{ marginTop: 'var(--sp-3)' }}>Galeria</h1>
            <p className="bf-body" style={{ marginTop: 'var(--sp-3)', maxWidth: 640 }}>
              Cada peça amarrada ao tempo que deixou de existir. A arte é a evidência.
            </p>
          </header>
        </Reveal>

        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
            <FilterRow label="Mês" opts={[{ v: 'all', l: 'Todos' }, ...meses.map((m) => ({ v: m, l: nomeMes(m) }))]} sel={mes} onSel={setMes} />
            <FilterRow label="Sistema" opts={[{ v: 'all', l: 'Todos' }, ...SISTEMAS_EFIC.map((s) => ({ v: s.id, l: s.nome }))]} sel={sis} onSel={setSis} />
          </div>
        </Reveal>

        {pecas.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--sp-4)' }}>
            {pecas.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <PecaCard peca={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="bf-body-sm">Nenhuma peça com esses filtros.</p>
        )}
      </main>
    </>
  )
}

function FilterRow({
  label,
  opts,
  sel,
  onSel,
}: {
  label: string
  opts: { v: string; l: string }[]
  sel: string
  onSel: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
      <span className="bf-eyebrow" style={{ minWidth: 56 }}>{label}</span>
      <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
        {opts.map((o) => {
          const active = sel === o.v
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => onSel(o.v)}
              className="pill"
              style={{
                cursor: 'pointer',
                borderColor: active ? 'var(--bf-text-primary)' : undefined,
                color: active ? 'var(--bf-text-primary)' : undefined,
                fontWeight: active ? 500 : 400,
                maxWidth: 280,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {o.l}
            </button>
          )
        })}
      </div>
    </div>
  )
}
