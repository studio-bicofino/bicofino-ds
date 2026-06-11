'use client'

import { useMemo, useState } from 'react'
import { PEOPLE, PERSON_BY_ID } from '@/lib/data/people'
import { TAGS, TAG_BY_ID } from '@/lib/data/tags'
import { buildEdges } from '@/lib/engine/edges'
import { computeOpportunities, opportunitiesFor } from '@/lib/engine/matchmaking'
import type { Cluster, EdgeKind, Opportunity } from '@/lib/data/types'
import { Chrome } from '@/components/Chrome'
import { FilterRail } from '@/components/FilterRail'
import { ForceGraph } from '@/components/ForceGraph'
import { PersonPanel } from '@/components/PersonPanel'
import { OpportunityCard } from '@/components/OpportunityCard'

const ALL_EDGE_KINDS: EdgeKind[] = ['familia', 'empresa', 'afiliacao', 'grupo', 'skill', 'intro']
const ALL_CLUSTERS: Cluster[] = ['A', 'B', 'C']

export default function RetePage() {
  const [edgeKinds, setEdgeKinds] = useState<Set<EdgeKind>>(new Set(ALL_EDGE_KINDS))
  const [activeTagIds, setActiveTagIds] = useState<Set<string>>(new Set())
  const [clusters, setClusters] = useState<Set<Cluster>>(new Set(ALL_CLUSTERS))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeOpp, setActiveOpp] = useState<Opportunity | null>(null)

  const allEdges = useMemo(() => buildEdges(PEOPLE, TAG_BY_ID), [])
  const allOpps = useMemo(() => computeOpportunities(PEOPLE, TAG_BY_ID, allEdges), [allEdges])

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of PEOPLE) for (const t of p.tags) counts[t] = (counts[t] ?? 0) + 1
    return counts
  }, [])

  const visiblePeople = useMemo(
    () =>
      PEOPLE.filter(
        (p) =>
          clusters.has(p.cluster) &&
          (activeTagIds.size === 0 || p.tags.some((t) => activeTagIds.has(t))),
      ),
    [clusters, activeTagIds],
  )

  const ghosts = useMemo(() => {
    const visible = new Set(visiblePeople.map((p) => p.id))
    return PEOPLE.filter((p) => !visible.has(p.id))
  }, [visiblePeople])

  const visibleEdges = useMemo(() => {
    const visible = new Set(visiblePeople.map((p) => p.id))
    return allEdges.filter(
      (e) => edgeKinds.has(e.kind) && visible.has(e.source) && visible.has(e.target),
    )
  }, [allEdges, edgeKinds, visiblePeople])

  const selected = selectedId ? PERSON_BY_ID[selectedId] : null
  const selectedOpps = useMemo(
    () => (selectedId ? opportunitiesFor(selectedId, allOpps) : []),
    [selectedId, allOpps],
  )

  const hotPair: [string, string] | null =
    activeOpp && activeOpp.b ? [activeOpp.a, activeOpp.b] : null

  const hasActiveFilters =
    activeTagIds.size > 0 ||
    clusters.size < ALL_CLUSTERS.length ||
    edgeKinds.size < ALL_EDGE_KINDS.length

  const toggle = <T,>(set: Set<T>, v: T): Set<T> => {
    const next = new Set(set)
    if (next.has(v)) next.delete(v)
    else next.add(v)
    return next
  }

  const selectPerson = (id: string | null) => {
    setSelectedId(id)
    setActiveOpp(null)
  }

  const selectOpp = (opp: Opportunity) => {
    setActiveOpp((cur) => (cur?.id === opp.id ? null : opp))
    setSelectedId(opp.a)
  }

  return (
    <div className="lr-app">
      <Chrome meta={`${visiblePeople.length} membros · ${visibleEdges.length} ligações`} />
      <div className="lr-stage">
        <FilterRail
          tags={TAGS}
          tagCounts={tagCounts}
          edgeKinds={edgeKinds}
          onToggleEdgeKind={(k) => setEdgeKinds((s) => toggle(s, k))}
          activeTagIds={activeTagIds}
          onToggleTag={(id) => setActiveTagIds((s) => toggle(s, id))}
          clusters={clusters}
          onToggleCluster={(c) => setClusters((s) => toggle(s, c))}
          onReset={() => {
            setEdgeKinds(new Set(ALL_EDGE_KINDS))
            setActiveTagIds(new Set())
            setClusters(new Set(ALL_CLUSTERS))
          }}
          hasActiveFilters={hasActiveFilters}
        />

        <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'flex' }}>
          <ForceGraph
            people={visiblePeople}
            ghosts={ghosts}
            edges={visibleEdges}
            selectedId={selectedId}
            onSelect={selectPerson}
            hotPair={hotPair}
          />
          <div className="lr-hud lr-hud--tl">
            <span className="lr-hud__line">// rete attiva</span>
            <span className="lr-hud__line">
              {visiblePeople.length}/{PEOPLE.length} membros · {visibleEdges.length} fios
            </span>
          </div>
          <div className="lr-hud lr-hud--bl">
            <span className="lr-hud__line">fio = tag compartilhada</span>
            <span className="lr-hud__line">tracejado = apresentação</span>
            <span className="lr-hud__line">✦ = família da casa</span>
          </div>
          <div className="lr-hud lr-hud--br">
            <span className="lr-hud__line">
              <span className="diamond">✦</span> {allOpps.length} oportunidades mapeadas
            </span>
          </div>
        </div>

        <aside className="lr-panel" aria-label="Detalhe">
          {selected ? (
            <PersonPanel
              person={selected}
              tagById={TAG_BY_ID}
              personById={PERSON_BY_ID}
              opportunities={selectedOpps}
              activeOppId={activeOpp?.id ?? null}
              onSelectOpp={selectOpp}
              onClose={() => selectPerson(null)}
            />
          ) : (
            <>
              <div className="lr-panel__eyebrow">
                <span className="diamond">✦</span> oportunidades da casa
              </div>
              <p className="lr-panel__bio">
                As leituras mais quentes da rede hoje. Selecione um membro no grafo para ver as
                dele.
              </p>
              <div className="lr-panel__section">
                {allOpps.slice(0, 10).map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opp={opp}
                    personById={PERSON_BY_ID}
                    active={opp.id === activeOpp?.id}
                    onClick={() => selectOpp(opp)}
                  />
                ))}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
