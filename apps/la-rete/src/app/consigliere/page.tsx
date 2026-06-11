'use client'

import { useMemo, useRef, useState } from 'react'
import { Paperclip, X } from 'lucide-react'
import { PEOPLE, PERSON_BY_ID } from '@/lib/data/people'
import { TAG_BY_ID } from '@/lib/data/tags'
import { buildEdges } from '@/lib/engine/edges'
import { computeAdherence } from '@/lib/engine/adherence'
import { computeOpportunities, opportunitiesFor } from '@/lib/engine/matchmaking'
import { analyzeText } from '@/lib/engine/lexicon'
import type { Adherence, Opportunity, Trend } from '@/lib/data/types'
import { Chrome } from '@/components/Chrome'
import { ForceGraph } from '@/components/ForceGraph'
import { PersonPanel } from '@/components/PersonPanel'

interface Reading {
  id: string
  input: string
  kind: 'link' | 'texto' | 'arquivo'
  /** quem leu: claude ou o léxico local */
  mode: 'ia' | 'lexico' | null
  trend: Trend | null
  adherences: Adherence[]
  error: string | null
}

export default function ConsiglierePage() {
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [readings, setReadings] = useState<Reading[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeOpp, setActiveOpp] = useState<Opportunity | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

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
    if ((!raw && !file) || busy) return
    setBusy(true)
    const isLink = /^https?:\/\/\S+$/i.test(raw)
    const observedAt = new Date().toISOString().slice(0, 10)
    const id = `cs-${Date.now()}`

    let trend: Trend | null = null
    let mode: Reading['mode'] = null
    let error: string | null = null

    try {
      if (file) {
        const form = new FormData()
        form.append('file', file)
        form.append('note', raw)
        const res = await fetch('/api/consigliere', { method: 'POST', body: form })
        const data = await res.json()
        if (!res.ok) error = data.error
        else {
          trend = data.trend
          mode = 'ia'
        }
      } else {
        const body = isLink ? { url: raw } : { text: raw }
        const res = await fetch('/api/consigliere', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json()
        if (!res.ok) {
          error = `${data.error}. Cole o texto do material direto no campo.`
        } else if (data.mode === 'ia') {
          trend = data.trend
          mode = 'ia'
        } else {
          /* sem chave: léxico local sobre a extração (link) ou o texto cru */
          mode = 'lexico'
          trend = isLink
            ? analyzeText({
                title: data.title,
                text: `${data.description} ${data.text}`,
                source: data.source,
                observedAt,
              })
            : analyzeText({
                title: raw.split('\n')[0].slice(0, 120),
                text: raw,
                source: 'Consigliere · texto colado',
                observedAt,
              })
        }
      }
    } catch {
      error = 'A leitura falhou. Tente de novo ou cole o texto direto.'
    }

    if (!error && !trend) {
      error = 'Nenhum tema do canon reconhecido nesta leitura.'
    }
    if (trend && trend.hooks.length === 0) {
      error = 'O material não acende nenhum tema da rede.'
      trend = null
    }

    const adherences = trend ? computeAdherence(trend, PEOPLE, TAG_BY_ID) : []
    setReadings((rs) => [
      {
        id,
        input: file ? file.name : raw,
        kind: file ? 'arquivo' : isLink ? 'link' : 'texto',
        mode,
        trend,
        adherences,
        error,
      },
      ...rs,
    ])
    setActiveId(id)
    setSelectedId(null)
    setActiveOpp(null)
    setInput('')
    setFile(null)
    setBusy(false)
  }

  return (
    <div className="lr-app">
      <Chrome meta={`${readings.length} leituras nesta sessão`} />
      <div className="lr-stage">
        <aside className="lr-rail" aria-label="Consigliere">
          <section className="lr-rail__section">
            <div className="lr-rail__head" data-open="true">
              <span className="lr-rail__eyebrow">// consigliere · leitura de fora</span>
            </div>
            <p className="lr-empty" style={{ marginBottom: 'var(--sp-3)' }}>
              Link, texto, transcript, PDF de análise ou print de gráfico (cole com Cmd+V). O
              Consigliere lê e mostra quem da rede acende.
            </p>
            <textarea
              className="lr-radar__input"
              rows={4}
              placeholder="https://… , o texto do material, ou uma nota sobre o anexo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={(e) => {
                const pasted = e.clipboardData.files?.[0]
                if (pasted && pasted.type.startsWith('image/')) {
                  e.preventDefault()
                  setFile(pasted)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit()
              }}
            />
            {file && (
              <div className="lr-attach">
                <span className="lr-attach__name">{file.name || 'imagem colada'}</span>
                <button
                  className="lr-attach__remove"
                  onClick={() => setFile(null)}
                  aria-label="Remover anexo"
                >
                  <X size={12} strokeWidth={1.5} />
                </button>
              </div>
            )}
            <div className="lr-radar__actions">
              <button
                className="lr-radar__go"
                onClick={submit}
                disabled={busy || (!input.trim() && !file)}
              >
                {busy ? 'lendo…' : 'ler'}
              </button>
              <button
                className="lr-radar__attach"
                onClick={() => fileRef.current?.click()}
                aria-label="Anexar PDF ou imagem"
                title="anexar PDF ou imagem"
              >
                <Paperclip size={14} strokeWidth={1.5} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf,image/png,image/jpeg,image/webp"
                hidden
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
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
                    {r.kind}
                    {r.mode ? ` · ${r.mode === 'ia' ? 'via claude' : 'léxico local'}` : ''} ·{' '}
                    {r.trend ? `${r.adherences.length} acendem` : 'sem leitura'}
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
            <span className="lr-hud__line">// consigliere</span>
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
                <span className="diamond">✦</span> consigliere
              </div>
              <p className="lr-panel__bio">
                O Consigliere é a leitura da casa sobre o que vem de fora: notícia, análise de
                mercado, gráfico, transcript. Entregue o material no trilho ao lado; ele devolve a
                leitura e o grafo mostra quem se beneficia ou conecta.
              </p>
              <div className="lr-panel__section">
                <div className="lr-panel__eyebrow">// como lê</div>
                <p className="lr-empty">
                  Com a chave da Anthropic no ambiente, quem lê é o Claude (Haiku) — inclusive PDF
                  e imagem. Sem chave, um léxico local de temas cobre links e texto, sem custo.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  )
}
