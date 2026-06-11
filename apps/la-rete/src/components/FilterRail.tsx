'use client'

import { useState } from 'react'
import type { Cluster, EdgeKind, Tag, TagKind } from '@/lib/data/types'

const EDGE_KINDS: { kind: EdgeKind; label: string }[] = [
  { kind: 'familia', label: 'Família' },
  { kind: 'empresa', label: 'Empresa' },
  { kind: 'afiliacao', label: 'Afiliação' },
  { kind: 'grupo', label: 'Grupo' },
  { kind: 'skill', label: 'Skill' },
  { kind: 'intro', label: 'Apresentação' },
]

const TAG_SECTIONS: { kind: TagKind; label: string; defaultOpen: boolean }[] = [
  { kind: 'skill', label: '// skills · atuação', defaultOpen: true },
  { kind: 'familia', label: '// famílias', defaultOpen: true },
  { kind: 'empresa', label: '// empresas', defaultOpen: false },
  { kind: 'afiliacao', label: '// domínios', defaultOpen: false },
  { kind: 'grupo', label: '// grupos', defaultOpen: false },
  { kind: 'cargo', label: '// cargos', defaultOpen: false },
]

const CLUSTERS: Cluster[] = ['A', 'B', 'C']

interface FilterRailProps {
  tags: Tag[]
  tagCounts: Record<string, number>
  edgeKinds: Set<EdgeKind>
  onToggleEdgeKind: (k: EdgeKind) => void
  activeTagIds: Set<string>
  onToggleTag: (id: string) => void
  clusters: Set<Cluster>
  onToggleCluster: (c: Cluster) => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function FilterRail({
  tags,
  tagCounts,
  edgeKinds,
  onToggleEdgeKind,
  activeTagIds,
  onToggleTag,
  clusters,
  onToggleCluster,
  onReset,
  hasActiveFilters,
}: FilterRailProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(TAG_SECTIONS.map((s) => [s.kind, s.defaultOpen])),
  )

  return (
    <aside className="lr-rail" aria-label="Filtros da rede">
      <section className="lr-rail__section">
        <div className="lr-rail__head" data-open="true">
          <span className="lr-rail__eyebrow">// ligações</span>
        </div>
        <div className="lr-chips">
          {EDGE_KINDS.map(({ kind, label }) => (
            <button
              key={kind}
              className="lr-chip"
              data-on={edgeKinds.has(kind)}
              onClick={() => onToggleEdgeKind(kind)}
              aria-pressed={edgeKinds.has(kind)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="lr-rail__section">
        <div className="lr-rail__head" data-open="true">
          <span className="lr-rail__eyebrow">// cluster</span>
        </div>
        <div className="lr-chips">
          {CLUSTERS.map((c) => (
            <button
              key={c}
              className="lr-chip"
              data-on={clusters.has(c)}
              onClick={() => onToggleCluster(c)}
              aria-pressed={clusters.has(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {TAG_SECTIONS.map(({ kind, label }) => {
        const sectionTags = tags.filter((t) => t.kind === kind)
        const isOpen = open[kind]
        return (
          <section key={kind} className="lr-rail__section">
            <button
              className="lr-rail__head"
              data-open={isOpen}
              onClick={() => setOpen((o) => ({ ...o, [kind]: !o[kind] }))}
              aria-expanded={isOpen}
            >
              <span className="lr-rail__eyebrow">{label}</span>
              {/* glifo mono como instrumentação M-01 — lucide a 20px não cabe na régua de 10px */}
              <span className="lr-rail__chevron">›</span>
            </button>
            {isOpen && (
              <div className="lr-chips">
                {sectionTags.map((t) => (
                  <button
                    key={t.id}
                    className="lr-chip"
                    data-on={activeTagIds.has(t.id)}
                    onClick={() => onToggleTag(t.id)}
                    aria-pressed={activeTagIds.has(t.id)}
                  >
                    {t.name}
                    <span className="lr-chip__count">{tagCounts[t.id] ?? 0}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )
      })}

      {hasActiveFilters && (
        <button className="lr-rail__reset" onClick={onReset}>
          limpar filtros
        </button>
      )}
    </aside>
  )
}
