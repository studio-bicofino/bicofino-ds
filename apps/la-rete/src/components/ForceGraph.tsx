'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
  type Simulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force'
import type { Edge, Person } from '@/lib/data/types'
import { AVATAR_FILES, avatarFileOf } from './Avatar'

interface SimNode extends SimulationNodeDatum {
  id: string
  r: number
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  key: string
  weight: number
  kind: Edge['kind']
}

interface ForceGraphProps {
  people: Person[]
  /** membros filtrados para fora — ficam como pontos-fantasma na última posição */
  ghosts: Person[]
  edges: Edge[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  /** aderência 0–1 por pessoa (modo tendência): acende o miolo no vibrante */
  heat?: Record<string, number>
  /** par em destaque (oportunidade selecionada) */
  hotPair?: [string, string] | null
}

const radiusOf = (p: Person) => 7 + p.networkReach * 1.9

/** offset determinístico por id — dessincroniza a respiração ambiente */
const hashOf = (s: string) => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

const edgeKey = (e: Edge) => `${e.source}--${e.target}`

export function ForceGraph({
  people,
  ghosts,
  edges,
  selectedId,
  onSelect,
  heat,
  hotPair,
}: ForceGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [ready, setReady] = useState(false)

  /* posições sobrevivem a mudanças de filtro — quem fica, desliza; quem
     entra, nasce perto do vizinho mais próximo do centro */
  const positions = useRef(new Map<string, { x: number; y: number }>())
  const simRef = useRef<Simulation<SimNode, SimLink> | null>(null)
  const nodeEls = useRef(new Map<string, SVGGElement>())
  const linkEls = useRef(new Map<string, SVGLineElement>())

  const [hoverId, setHoverId] = useState<string | null>(null)

  const neighborMap = useMemo(() => {
    const m = new Map<string, Set<string>>()
    for (const e of edges) {
      if (!m.has(e.source)) m.set(e.source, new Set())
      if (!m.has(e.target)) m.set(e.target, new Set())
      m.get(e.source)!.add(e.target)
      m.get(e.target)!.add(e.source)
    }
    return m
  }, [edges])

  const peopleKey = useMemo(() => people.map((p) => p.id).join('|'), [people])
  const edgesKey = useMemo(() => edges.map(edgeKey).join('|'), [edges])

  /* preload dos retratos — o primeiro hover já abre com a foto */
  useEffect(() => {
    for (const f of AVATAR_FILES) {
      const img = new Image()
      img.src = `/avatars/${f}`
    }
  }, [])

  /* medir o palco */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* simulação — recriada quando o conjunto de nós/fios muda; posições
     anteriores são reaproveitadas para a transição ser um deslize, não um salto */
  useEffect(() => {
    if (!size.w || !size.h) return

    const cx = size.w / 2
    const cy = size.h / 2

    const nodes: SimNode[] = people.map((p) => {
      const prev = positions.current.get(p.id)
      const h = hashOf(p.id)
      return {
        id: p.id,
        r: radiusOf(p),
        x: prev?.x ?? cx + ((h % 200) - 100) * 0.9,
        y: prev?.y ?? cy + (((h >> 8) % 200) - 100) * 0.9,
      }
    })

    const nodeById = new Map(nodes.map((n) => [n.id, n]))
    const links: SimLink[] = edges
      .filter((e) => nodeById.has(e.source) && nodeById.has(e.target))
      .map((e) => ({
        key: edgeKey(e),
        source: e.source,
        target: e.target,
        weight: e.weight,
        kind: e.kind,
      }))

    const sim = forceSimulation<SimNode>(nodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((l) => 70 + (1 - l.weight) * 70)
          .strength((l) => 0.25 + l.weight * 0.45),
      )
      .force('charge', forceManyBody().strength(-260))
      .force('collide', forceCollide<SimNode>().radius((d) => d.r + 20))
      .force('x', forceX(cx).strength(0.05))
      .force('y', forceY(cy).strength(0.06))
      .velocityDecay(0.32)

    const ticked = () => {
      for (const n of nodes) {
        // mantém o organismo dentro do palco
        n.x = Math.max(n.r + 24, Math.min(size.w - n.r - 24, n.x ?? cx))
        n.y = Math.max(n.r + 36, Math.min(size.h - n.r - 36, n.y ?? cy))
        positions.current.set(n.id, { x: n.x, y: n.y })
        const el = nodeEls.current.get(n.id)
        if (el) el.setAttribute('transform', `translate(${n.x},${n.y})`)
      }
      for (const l of links) {
        const el = linkEls.current.get(l.key)
        if (!el) continue
        const s = l.source as SimNode
        const t = l.target as SimNode
        el.setAttribute('x1', String(s.x))
        el.setAttribute('y1', String(s.y))
        el.setAttribute('x2', String(t.x))
        el.setAttribute('y2', String(t.y))
      }
    }
    sim.on('tick', ticked)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const first = !ready
    if (reduced) {
      // reduced motion: assenta pré-calculado e revela num layout já calmo
      sim.stop()
      for (let i = 0; i < 200; i++) sim.tick()
      ticked()
      if (first) setReady(true)
    } else {
      sim.alpha(first ? 1 : 0.55).restart()
      if (first) {
        // primeira pintura: deixa o organismo assentar antes de revelar
        setTimeout(() => setReady(true), 80)
      }
    }

    simRef.current = sim
    return () => {
      sim.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peopleKey, edgesKey, size.w, size.h])

  /* arraste — pointer events direto, sem d3-drag */
  const dragState = useRef<{ id: string; moved: boolean } | null>(null)

  const onNodePointerDown = (e: React.PointerEvent, id: string) => {
    e.preventDefault()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    dragState.current = { id, moved: false }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragState.current
    const sim = simRef.current
    if (!drag || !sim) return
    const rect = containerRef.current!.getBoundingClientRect()
    const node = sim.nodes().find((n) => n.id === drag.id)
    if (!node) return
    if (!drag.moved) {
      drag.moved = true
      sim.alphaTarget(0.25).restart()
    }
    node.fx = e.clientX - rect.left
    node.fy = e.clientY - rect.top
  }

  const onPointerUp = (e: React.PointerEvent, id?: string) => {
    const drag = dragState.current
    const sim = simRef.current
    if (drag && sim) {
      const node = sim.nodes().find((n) => n.id === drag.id)
      if (node) {
        node.fx = null
        node.fy = null
      }
      sim.alphaTarget(0)
      if (!drag.moved && id) onSelect(id === selectedId ? null : id)
      dragState.current = null
      e.stopPropagation()
    }
  }

  /* estado visual por nó */
  const focusId = hoverId ?? selectedId
  const focusNeighbors = focusId ? (neighborMap.get(focusId) ?? new Set()) : null
  const hotSet = hotPair ? new Set(hotPair) : null

  const stateOf = (id: string): 'default' | 'dim' => {
    if (hotSet) return hotSet.has(id) ? 'default' : 'dim'
    if (!focusId || !focusNeighbors) return 'default'
    return id === focusId || focusNeighbors.has(id) ? 'default' : 'dim'
  }

  const edgeStateOf = (e: Edge): 'default' | 'dim' | 'hot' => {
    if (hotSet) {
      return hotSet.has(e.source) && hotSet.has(e.target) ? 'hot' : 'dim'
    }
    if (!focusId) return 'default'
    return e.source === focusId || e.target === focusId ? 'hot' : 'dim'
  }

  const ghostsWithPos = ghosts.filter((g) => positions.current.has(g.id))

  return (
    <div
      ref={containerRef}
      className="lr-canvas"
      onPointerMove={onPointerMove}
      onPointerUp={(e) => onPointerUp(e)}
    >
      <svg
        width={size.w}
        height={size.h}
        data-ready={ready}
        onClick={() => onSelect(null)}
        role="img"
        aria-label="Grafo da rede Casa Nostra"
      >
        <defs>
          {/* recorte circular do balão de foto — coordenadas locais do balão */}
          <clipPath id="lr-photoclip">
            <circle r={21} />
          </clipPath>
        </defs>
        <g>
          {edges.map((e) => (
            <line
              key={edgeKey(e)}
              ref={(el) => {
                if (el) linkEls.current.set(edgeKey(e), el)
                else linkEls.current.delete(edgeKey(e))
              }}
              className="lr-edge"
              data-kind={e.kind}
              data-state={edgeStateOf(e)}
              strokeWidth={0.75 + e.weight * 1.5}
              style={{ '--edge-alpha': 0.18 + e.weight * 0.4 } as React.CSSProperties}
              x1={positions.current.get(e.source)?.x}
              y1={positions.current.get(e.source)?.y}
              x2={positions.current.get(e.target)?.x}
              y2={positions.current.get(e.target)?.y}
            />
          ))}
        </g>
        <g>
          {ghostsWithPos.map((g) => {
            const pos = positions.current.get(g.id)!
            return <circle key={g.id} className="lr-ghost" cx={pos.x} cy={pos.y} r={2.5} />
          })}
        </g>
        <g>
          {people.map((p) => {
            const r = radiusOf(p)
            const pos = positions.current.get(p.id)
            const hl = heat?.[p.id] ?? 0
            const isFamiglia = p.tags.some((t) => t.startsWith('fa-'))
            return (
              <g
                key={p.id}
                ref={(el) => {
                  if (el) nodeEls.current.set(p.id, el)
                  else nodeEls.current.delete(p.id)
                }}
                className="lr-node"
                data-state={stateOf(p.id)}
                data-selected={p.id === selectedId}
                data-hot={hotSet?.has(p.id) ?? false}
                transform={pos ? `translate(${pos.x},${pos.y})` : undefined}
                style={
                  {
                    '--hl': hl,
                    '--breath-delay': `${-((hashOf(p.id) % 60) / 10)}s`,
                  } as React.CSSProperties
                }
                tabIndex={0}
                role="button"
                aria-label={p.preferredName}
                onPointerDown={(e) => onNodePointerDown(e, p.id)}
                onPointerUp={(e) => onPointerUp(e, p.id)}
                onPointerEnter={() => setHoverId(p.id)}
                onPointerLeave={() => setHoverId(null)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(p.id === selectedId ? null : p.id)
                  }
                }}
              >
                <circle className="lr-node__halo" r={r + 6} />
                <circle className="lr-node__fill" r={r} />
                <circle className="lr-node__heat" r={r - 1} />
                <circle className="lr-node__core" r={r} />
                {isFamiglia && (
                  <text className="lr-node__seal" y={-r - 6}>
                    ✦
                  </text>
                )}
                <text className="lr-node__label" y={r + 14}>
                  {p.preferredName}
                </text>
                {hoverId === p.id && (
                  /* g externo posiciona (attr); o interno anima (CSS transform
                     sobrescreveria o attr se fosse no mesmo elemento).
                     <image> direto no SVG do grafo — svg aninhado não pintava
                     a foto de forma confiável (bug visto em 11/06). */
                  <g transform={`translate(0, ${-r - (isFamiglia ? 40 : 32)})`}>
                    <g className="lr-node__photo">
                      <circle className="lr-node__photo-ring" r={23} />
                      <image
                        href={`/avatars/${avatarFileOf(p.id)}`}
                        x={-21}
                        y={-21}
                        width={42}
                        height={42}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#lr-photoclip)"
                      />
                    </g>
                  </g>
                )}
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
