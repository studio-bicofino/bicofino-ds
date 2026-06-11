'use client'

import { useMemo, useState } from 'react'
import { PEOPLE, PERSON_BY_ID } from '@/lib/data/people'
import { TAG_BY_ID } from '@/lib/data/tags'
import { TRENDS } from '@/lib/data/trends'
import { buildEdges } from '@/lib/engine/edges'
import { computeAdherence } from '@/lib/engine/adherence'
import { computeOpportunities, opportunitiesFor } from '@/lib/engine/matchmaking'
import type { Opportunity } from '@/lib/data/types'
import { Chrome } from '@/components/Chrome'
import { ForceGraph } from '@/components/ForceGraph'
import { PersonPanel } from '@/components/PersonPanel'

export default function TendenciasPage() {
  const [trendId, setTrendId] = useState<string>(TRENDS[0].id)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeOpp, setActiveOpp] = useState<Opportunity | null>(null)

  const trend = TRENDS.find((t) => t.id === trendId) ?? TRENDS[0]

  const allEdges = useMemo(() => buildEdges(PEOPLE, TAG_BY_ID), [])
  const allOpps = useMemo(() => computeOpportunities(PEOPLE, TAG_BY_ID, allEdges), [allEdges])

  const adherences = useMemo(() => computeAdherence(trend, PEOPLE, TAG_BY_ID), [trend])

  const heat = useMemo(() => {
    const h: Record<string, number> = {}
    for (const a of adherences) h[a.personId] = a.score / 100
    return h
  }, [adherences])

  const selected = selectedId ? PERSON_BY_ID[selectedId] : null
  const selectedOpps = useMemo(
    () => (selectedId ? opportunitiesFor(selectedId, allOpps) : []),
    [selectedId, allOpps],
  )

  const selectOpp = (opp: Opportunity) => {
    setActiveOpp((cur) => (cur?.id === opp.id ? null : opp))
  }

  return (
    <div className="lr-app">
      <Chrome meta={`${adherences.length} membros aderentes · ${trend.title}`} />
      <div className="lr-stage">
        <aside className="lr-rail" aria-label="Tendências">
          <section className="lr-rail__section">
            <div className="lr-rail__head" data-open="true">
              <span className="lr-rail__eyebrow">// tendências · vanguarda</span>
            </div>
            {TRENDS.map((t) => (
              <button
                key={t.id}
                className="lr-trend"
                data-active={t.id === trendId}
                onClick={() => {
                  setTrendId(t.id)
                  setSelectedId(null)
                  setActiveOpp(null)
                }}
              >
                <div className="lr-trend__title">{t.title}</div>
                <div className="lr-trend__meta">
                  {t.source} · {t.observedAt}
                </div>
                <div className="lr-trend__sectors">
                  {t.sectors.map((s) => (
                    <span className="lr-sector" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </section>
        </aside>

        <div className="lr-canvaswrap">
          <ForceGraph
            people={PEOPLE}
            ghosts={[]}
            edges={allEdges}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id)
              setActiveOpp(null)
            }}
            heat={heat}
            hotPair={activeOpp && activeOpp.b ? [activeOpp.a, activeOpp.b] : null}
          />
          <div className="lr-hud lr-hud--tl">
            <span className="lr-hud__line">// aderência à tendência</span>
            <span className="lr-hud__line">
              {adherences.length}/{PEOPLE.length} membros acendem
            </span>
          </div>
          <div className="lr-hud lr-hud--bl">
            <span className="lr-hud__line">brilho = aderência do membro</span>
          </div>
        </div>

        <aside className="lr-panel" aria-label="Aderência">
          {selected ? (
            <PersonPanel
              person={selected}
              tagById={TAG_BY_ID}
              personById={PERSON_BY_ID}
              opportunities={selectedOpps}
              activeOppId={activeOpp?.id ?? null}
              onSelectOpp={selectOpp}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <>
              <div className="lr-panel__eyebrow">
                <span className="diamond">✦</span> {trend.source}
              </div>
              <h2 className="lr-panel__name">{trend.title}</h2>
              <div className="lr-panel__sub">{trend.observedAt}</div>
              <p className="lr-panel__bio">{trend.summary}</p>

              <div className="lr-panel__section">
                <div className="lr-panel__eyebrow">// quem acende</div>
                {adherences.length === 0 && (
                  <p className="lr-empty">
                    Ninguém da rede adere a esta tendência hoje. A casa pode buscar fora.
                  </p>
                )}
                {adherences.map((a) => {
                  const p = PERSON_BY_ID[a.personId]
                  if (!p) return null
                  return (
                    <button
                      key={a.personId}
                      className="lr-adh"
                      onClick={() => setSelectedId(a.personId)}
                    >
                      <div className="lr-adh__top">
                        <span className="lr-adh__name">{p.preferredName}</span>
                        <span className="lr-adh__score">{a.score}</span>
                      </div>
                      <div className="lr-adh__reason">{a.reason}</div>
                      <div className="lr-adh__track">
                        <span
                          className="lr-adh__fill"
                          style={{ transform: `scaleX(${a.score / 100})` }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
