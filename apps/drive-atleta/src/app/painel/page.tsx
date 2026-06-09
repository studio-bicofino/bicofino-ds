'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, RotateCcw, Link2 } from 'lucide-react'
import type { MediaItem, Category, MediaKind } from '@/lib/types'
import { loadItems, shareItem, deleteItem } from '@/lib/storage'
import { CATEGORIES, KIND_LABEL } from '@/lib/categories'
import { TopBar } from '@/components/TopBar'
import { PanelCard } from '@/components/PanelCard'
import { Reveal } from '@/components/Reveal'

type CatFilter = Category | 'all'
type KindFilter = MediaKind | 'all'

export default function PanelPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [mounted, setMounted] = useState(false)

  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CatFilter>('all')
  const [kind, setKind] = useState<KindFilter>('all')

  const [error, setError] = useState<string | null>(null)

  function refresh() {
    setError(null)
    loadItems()
      .then(setItems)
      .catch((e) => setError(e instanceof Error ? e.message : 'Falha ao carregar o acervo.'))
      .finally(() => setMounted(true))
  }

  useEffect(() => {
    refresh()
  }, [])

  function handleCopyLink(id: string) {
    return shareItem(id)
  }

  function handleDelete(id: string) {
    const prev = items
    setItems((list) => list.filter((it) => it.id !== id)) // some na hora (otimista)
    return deleteItem(id).catch((e) => {
      setError(e instanceof Error ? e.message : 'Não consegui apagar. Restaurei o item.')
      setItems(prev)
      throw e // o card volta ao estado normal
    })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      if (cat !== 'all' && it.category !== cat) return false
      if (kind !== 'all' && it.kind !== kind) return false
      if (q) {
        const hay = [it.athleteName, it.match, it.competition, it.filename, ...it.tags]
          .filter(Boolean).join(' ').toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [items, query, cat, kind])

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
              <div className="row-wrap" style={{ gap: 'var(--sp-3)' }}>
                <Link href="/painel/links" className="btn btn--ghost bf-mono" title="Links de envio por atleta">
                  <Link2 size={14} strokeWidth={1.5} aria-hidden /> links dos atletas
                </Link>
                <button
                  className="btn btn--ghost bf-mono"
                  title="Recarrega o acervo do Supabase"
                  onClick={refresh}
                >
                  <RotateCcw size={14} strokeWidth={1.5} aria-hidden /> atualizar
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="cell cell--pad-sm" style={{ borderColor: 'var(--bf-border-strong)' }}>
              <p className="bf-body-sm">{error}</p>
            </div>
          )}

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
                  <PanelCard item={it} onCopyLink={handleCopyLink} onDelete={handleDelete} />
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
