'use client'

import { Plus, Check } from 'lucide-react'
import type { MediaItem } from '@/lib/types'
import type { Athlete } from '@/lib/athletes'
import { CATEGORY_LABEL } from '@/lib/categories'
import { formatDate } from '@/lib/format'
import { Thumb } from './Thumb'

function Breadcrumb({ path }: { path: string }) {
  const segs = path.split(' / ')
  return (
    <div className="breadcrumb">
      {segs.map((seg, i) => {
        const leaf = i === segs.length - 1
        return (
          <span key={i} className="row" style={{ gap: 'var(--sp-2)' }}>
            <span className={leaf ? 'breadcrumb__leaf' : undefined}>{seg}</span>
            {!leaf && <span className="breadcrumb__sep">/</span>}
          </span>
        )
      })}
    </div>
  )
}

/* Tela de sucesso — confirma o envio, mostra o resumo catalogado e o
   destino simulado no Drive de cada arquivo. */
export function SuccessState({
  items,
  athlete,
  onAnother,
}: {
  items: MediaItem[]
  athlete: Athlete
  onAnother: () => void
}) {
  const first = items[0]
  const tags = first?.tags ?? []

  return (
    <div className="stack-6 bf-reveal" style={{ maxWidth: 560, margin: '0 auto', paddingTop: 'var(--sp-6)' }}>
      <div className="stack-4" style={{ alignItems: 'flex-start' }}>
        <span className="seal" aria-hidden>
          <Check size={26} strokeWidth={1.5} />
        </span>
        <div className="stack-2">
          <h1 className="bf-h1">Material enviado com sucesso.</h1>
          <p className="bf-body">
            {items.length} {items.length === 1 ? 'arquivo entrou' : 'arquivos entraram'} no acervo
            Bicofino, já catalogado{items.length === 1 ? '' : 's'} e no lugar certo.
          </p>
        </div>
      </div>

      {/* Resumo compartilhado do lote */}
      <div className="cell stack-4">
        <span className="bf-eyebrow">// resumo do envio</span>
        <dl className="stack-3" style={{ margin: 0 }}>
          <SummaryRow k="Atleta" v={athlete.name} />
          <SummaryRow k="Data" v={formatDate(first.date)} />
          {first.match && <SummaryRow k="Jogo" v={first.match} />}
          {first.competition && <SummaryRow k="Contexto" v={first.competition} />}
          <SummaryRow k="Categoria" v={CATEGORY_LABEL[first.category]} />
        </dl>
        {tags.length > 0 && (
          <div className="row-wrap">
            {tags.map((t) => (
              <span key={t} className="pill pill--accent">{t}</span>
            ))}
          </div>
        )}
      </div>

      {/* Arquivos + destino no Drive */}
      <div className="stack-3">
        <span className="bf-eyebrow">// {items.length === 1 ? 'arquivo' : 'arquivos'} no drive</span>
        {items.map((it) => (
          <div key={it.id} className="cell cell--pad-sm row" style={{ gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
            <div style={{ width: 64, flex: '0 0 auto' }}>
              <Thumb kind={it.kind} />
            </div>
            <div className="stack-2" style={{ minWidth: 0 }}>
              <span className="mono-path" style={{ color: 'var(--bf-text-primary)' }}>{it.filename}</span>
              <Breadcrumb path={it.drivePath} />
            </div>
          </div>
        ))}
      </div>

      <div className="row-wrap" style={{ gap: 'var(--sp-3)' }}>
        <button className="btn btn--primary" onClick={onAnother}>
          <Plus size={16} strokeWidth={1.5} /> Enviar outro material
        </button>
      </div>
    </div>
  )
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="between" style={{ alignItems: 'baseline', gap: 'var(--sp-4)' }}>
      <dt className="bf-mono" style={{ color: 'var(--bf-text-subtle)' }}>{k}</dt>
      <dd style={{ margin: 0, textAlign: 'right', color: 'var(--bf-text-primary)' }}>{v}</dd>
    </div>
  )
}
