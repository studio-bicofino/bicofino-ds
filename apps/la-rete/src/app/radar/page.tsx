'use client'

import { useMemo, useState } from 'react'
import { PEOPLE, PERSON_BY_ID } from '@/lib/data/people'
import { TAG_BY_ID } from '@/lib/data/tags'
import { buildEdges } from '@/lib/engine/edges'
import { computeAdherence } from '@/lib/engine/adherence'
import { computeOpportunities, opportunitiesFor } from '@/lib/engine/matchmaking'
import { analyzeText } from '@/lib/engine/radar'
import type { Adherence, Opportunity, Trend } from '@/lib/data/types'
import { Chrome } from '@/components/Chrome'
import { ForceGraph } from '@/components/ForceGraph'
import { PersonPanel } from '@/components/PersonPanel'

interface Reading {
  id: string
  /** o que foi colado */
  input: string
  kind: 'link' | 'texto'
  trend: Trend | null
  adherences: Adherence[]
  error: string | null
}

export default function RadarPage() {
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [readings, setReadings] = useState<Reading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeOpp, setActiveOpp] = useState<Opportunity | null>(null)

  const allEdges = useMemo(() => buildEdges(PEOPLE, TAG_BY_ID), [])
  const allOpps = useMemo(() => computeOpportunities(PEOPLE, TAG_BY_ID, allEdges), [allEdges])

  const active = readings.find((r) => r.id === activeId) ?? null

  const heat = useMemo(() => {
    const h: Record<string, number> = {}
    if (active?.adherences) for (const a of active.adherences) h[a.personId] = a.score / 100
    return h
  }, [active])

  const selected = selectedId ? PERSON_BY_ID[selectedId] : null
  const selectedOpps = useMemo(
    () => (selectedId ? opportunitiesFor(selectedId, allOpps) : []),
    [selectedId, allOpps],
  )

  const submit = async () => {
    const raw = input.trim()
    if (!raw || busy) return
    setBusy(true)
    const isLink = /^https?:\/\/\S+$/i.test(raw)
    const observedAt = new Date().toISOString().slice(0, 10)
    const id = `rd-${Date.now()}`

    let trend: Trend | null = null
    let error: string | null = null

    try {
      if (isLink) {
        const res = await fetch('/api/radar', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ url: raw }),
        })
        const data = await res.json()
        if (!res.ok) {
          error = `${data.error}. Cole o texto da notícia direto no campo.`
        } else {
          trend = analyzeText({
            title: data.title,
            text: `${data.description} ${data.text}`,
            source: data.source,
            observedAt,
          })
        }
      } else {
        const firstLine = raw.split('\n')[0].slice(0, 120)
        trend = analyzeText({
          title: firstLine,
          text: raw,
          source: 'Radar · texto colado',
          observedAt,
        })
      }
    } catch {
      error = 'A leitura falhou. Cole o texto da notícia direto no campo.'
    }

    if (!error && !trend) {
      error = 'Nenhum tema do canon reconhecido nesta leitura.'
    }

    const adherences = trend ? computeAdherence(trend, PEOPLE, TAG_BY_ID) : []
    const reading: Reading = {
      id,
      input: raw,
      kind: isLink ? 'link' : 'texto',
      trend,
      adherences,
      error,
    }
    setReadings((rs) => [reading, ...rs])
    setActiveId(id)
    setSelectedId(null)
    setActiveOpp(null)
    setInput('')
    setBusy(false)
  }

  return (
    <div className="lr-app">
      <Chrome meta={`${readings.length} leituras nesta sessão`} />
      <div className="lr-stage">
        <aside className="lr-rail" aria-label="Radar">
          <section className="lr-rail__section">
            <div className="lr-rail__head" data-open="true">
              <span className="lr-rail__eyebrow">// radar · leitura de fora</span>
            </div>
            <p className="lr-empty" style={{ marginBottom: 'var(--sp-3)' }}>
              Cole um link de notícia ou o texto dela. A casa lê e mostra quem da rede acende.
            </p>
            <textarea
              className="lr-radar__input"
              rows={4}
              placeholder="https://… ou o parágrafo da notícia"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit()
              }}
            />
            <button className="lr-radar__go" onClick={submit} disabled={busy || !input.trim()}>
              {busy ? 'lendo…' : 'ler'}
            </button>
          </section>

          {readings.length > 0 && (
            <section className="lr-rail__section">
              <div className="lr-rail__head" data-open="true">
                <span className="lr-rail__eyebrow">// leituras</span>
              </div>
              {readings.map((r) => (
                <button
                  key={r.id}
                  className="lr-trend"
                  data-active={r.id === activeId}
                  onClick={() => {
                    setActiveId(r.id)
                    setSelectedId(null)
                    setActiveOpp(null)
                  }}
                >
                  <div className="lr-trend__title">
                    {r.trend ? r.trend.title : r.input.slice(0, 80)}
                  </div>
                  <div className="lr-trend__meta">
                    {r.kind} · {r.trend ? `${r.adherences.length} acendem` : 'sem leitura'}
                  </div>
                </button>
              ))}
            </section>
          )}
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
            <span className="lr-hud__line">// radar</span>
            <span className="lr-hud__line">
              {active?.trend
                ? `${active.adherences.length}/${PEOPLE.length} membros acendem`
                : 'aguardando leitura'}
            </span>
          </div>
          <div className="lr-hud lr-hud--bl">
            <span className="lr-hud__line">brilho = aderência à leitura</span>
          </div>
        </div>

        <aside className="lr-panel" aria-label="Resultado da leitura">
          {selected ? (
            <PersonPanel
              person={selected}
              tagById={TAG_BY_ID}
              personById={PERSON_BY_ID}
              opportunities={selectedOpps}
              activeOppId={activeOpp?.id ?? null}
              onSelectOpp={(opp) => setActiveOpp((cur) => (cur?.id === opp.id ? null : opp))}
              onClose={() => setSelectedId(null)}
            />
          ) : active ? (
            active.trend ? (
              <>
                <div className="lr-panel__eyebrow">
                  <span className="diamond">✦</span> {active.trend.source}
                </div>
                <h2 className="lr-panel__name">{active.trend.title}</h2>
                <div className="lr-panel__sub">
                  {active.trend.observedAt} ·{' '}
                  {active.trend.hooks.map((h) => h.tagName).join(' · ')}
                </div>
                <p className="lr-panel__bio">{active.trend.summary}</p>

                <div className="lr-panel__section">
                  <div className="lr-panel__eyebrow">// quem acende</div>
                  {active.adherences.length === 0 && (
                    <p className="lr-empty">
                      Ninguém da rede adere a esta leitura hoje. A casa pode buscar fora.
                    </p>
                  )}
                  {active.adherences.map((a) => {
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
            ) : (
              <>
                <div className="lr-panel__eyebrow">
                  <span className="diamond">✦</span> leitura sem resultado
                </div>
                <p className="lr-panel__bio">{active.error}</p>
              </>
            )
          ) : (
            <>
              <div className="lr-panel__eyebrow">
                <span className="diamond">✦</span> radar
              </div>
              <p className="lr-panel__bio">
                O Radar cruza o que acontece fora com quem está dentro. Cole um link ou texto no
                trilho ao lado; a leitura vira uma tendência momentânea e o grafo mostra quem se
                beneficia ou conecta.
              </p>
              <div className="lr-panel__section">
                <div className="lr-panel__eyebrow">// como lê hoje</div>
                <p className="lr-empty">
                  Leitura local por léxico de temas do canon — determinística e sem custo. A
                  próxima fase liga um modelo via API na mesma rota, com a mesma resposta.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
