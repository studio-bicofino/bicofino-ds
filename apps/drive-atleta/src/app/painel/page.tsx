'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, RotateCcw } from 'lucide-react'
import type { MediaItem, Status, Category, MediaKind } from '@/lib/types'
import { loadItems, updateStatus, resetItems } from '@/lib/storage'
import { CATEGORIES, STATUSES, KIND_LABEL } from '@/lib/categories'
import { TopBar } from '@/components/TopBar'
import { PanelCard } from '@/components/PanelCard'
import { Reveal } from '@/components/Reveal'

type CatFilter = Category | 'all'
type StatusFilter = Status | 'all'
type KindFilter = MediaKind | 'all'

export default function PanelPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [mounted, setMounted] = useState(false)

  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CatFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [kind, setKind] = useState<KindFilter>('all')

  useEffect(() => {
    setItems(loadItems())
    setMounted(true)
  }, [])

  function handleStatus(id: string, s: Status) {
    setItems(updateStatus(id, s))
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      if (cat !== 'all' && it.category !== cat) return false
      if (status !== 'all' && it.status !== status) return false
      if (kind !== 'all' && it.kind !== kind) return false
      if (q) {
        const hay = [it.athleteName, it.match, it.competition, it.filename, ...it.tags]
          .filter(Boolean).join(' ').toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [items, query, cat, status, kind])

  const stats = useMemo(() => ({
    total: items.length,
    fotos: items.filter((i) => i.kind === 'foto').length,
    videos: items.filter((i) => i.kind === 'video').length,
  }), [items])

  return (
    <>
      <TopBar rightHref="/" rightLabel="// enviar material" />

      <main className="shell shell-main">
        <div className="stack-6">
          {/* Cabeçalho */}
          <div className="stack-3">
            <span className="bf-eyebrow">// painel bicofino</span>
            <div className="between" style={{ alignItems: 'flex-end' }}>
              <h1 className="bf-h1">Acervo</h1>
              <button
                className="btn btn--ghost bf-mono"
                title="Restaura o acervo de demonstração"
                onClick={() => {
                  if (window.confirm('Restaurar o acervo de demonstração? Os envios desta sessão serão descartados.')) {
                    setItems(resetItems())
                  }
                }}
              >
                <RotateCcw size={14} strokeWidth={1.5} aria-hidden /> resetar demo
              </button>
            </div>
          </div>

          {/* Estatísticas (M-05 bento) */}
          <div className="bento">
            <StatCell span={4} label="Itens" value={stats.total} />
            <StatCell span={4} label="Fotos" value={stats.fotos} />
            <StatCell span={4} label="Vídeos" value={stats.videos} />
          </div>

          {/* Filtros */}
          <div className="cell cell--pad-sm stack-3">
            <div className="field">
              <div className="row" style={{ border: '1px solid var(--bf-border-strong)', borderRadius: 'var(--bf-corner-2)', padding: '0 var(--sp-3)' }}>
                <Search size={16} strokeWidth={1.5} aria-hidden style={{ color: 'var(--bf-text-subtle)', flex: '0 0 auto' }} />
                <input
                  type="search"
                  name="q"
                  className="input"
                  autoComplete="off"
                  aria-label="Buscar material"
                  placeholder="Buscar por atleta, jogo, tag ou arquivo…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ border: 'none', padding: 'var(--sp-3) 0' }}
                />
              </div>
            </div>
            <div className="row-wrap" style={{ gap: 'var(--sp-3)' }}>
              <FilterSelect label="Categoria" value={cat} onChange={(v) => setCat(v as CatFilter)} options={[{ value: 'all', label: 'Todas' }, ...CATEGORIES]} />
              <FilterSelect label="Status" value={status} onChange={(v) => setStatus(v as StatusFilter)} options={[{ value: 'all', label: 'Todos' }, ...STATUSES]} />
              <FilterSelect label="Tipo" value={kind} onChange={(v) => setKind(v as KindFilter)} options={[{ value: 'all', label: 'Todos' }, { value: 'foto', label: KIND_LABEL.foto }, { value: 'video', label: KIND_LABEL.video }]} />
            </div>
          </div>

          {/* Grade de cards */}
          {!mounted ? null : filtered.length === 0 ? (
            <div className="cell cell--quiet" style={{ textAlign: 'center', padding: 'var(--sp-8)' }}>
              <p className="bf-body">Nenhum material com esses filtros.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filtered.map((it, i) => (
                <Reveal key={it.id} delay={Math.min(i * 40, 240)}>
                  <PanelCard item={it} onStatusChange={handleStatus} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function StatCell({ span, label, value, accent }: { span: number; label: string; value: number; accent?: boolean }) {
  return (
    <div className="cell" style={{ gridColumn: `span ${span}` }}>
      <div className="stack-2">
        <span className="bf-eyebrow">{label}</span>
        <span className="bignum" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: accent ? 'var(--current-accent-ink)' : undefined }}>
          {value}
        </span>
      </div>
    </div>
  )
}

function FilterSelect({
  label, value, onChange, options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="field" style={{ flex: '1 1 160px' }}>
      <span className="field__label">{label}</span>
      <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
    </label>
  )
}
