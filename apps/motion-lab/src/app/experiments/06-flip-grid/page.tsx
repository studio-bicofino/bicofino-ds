'use client'

import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'
import { ExperimentShell } from '@/components/ExperimentShell'
import { useTuner } from '@/components/Tuner'

gsap.registerPlugin(useGSAP, Flip)

type Vertical = 'on' | 'off' | 'club'
type Filter = 'todos' | Vertical

const VERTICAL_LABEL: Record<Vertical, string> = {
  on: 'ON PITCH',
  off: 'OFF PITCH',
  club: 'CLUB',
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'TODOS' },
  { key: 'on', label: 'ON PITCH' },
  { key: 'off', label: 'OFF PITCH' },
  { key: 'club', label: 'CLUB' },
]

type Card = { id: string; title: string; vertical: Vertical }

const CARDS: Card[] = [
  { id: 'BF-01', title: 'Jogos da semana', vertical: 'on' },
  { id: 'BF-02', title: 'Atletas', vertical: 'on' },
  { id: 'BF-03', title: 'Scouting', vertical: 'on' },
  { id: 'BF-04', title: 'Bastidores de treino', vertical: 'on' },
  { id: 'BF-05', title: 'Moda', vertical: 'off' },
  { id: 'BF-06', title: 'Itália', vertical: 'off' },
  { id: 'BF-07', title: 'Lifestyle', vertical: 'off' },
  { id: 'BF-08', title: 'Cultura de rua', vertical: 'off' },
  { id: 'BF-09', title: 'Sócios', vertical: 'club' },
  { id: 'BF-10', title: 'Arquibancada', vertical: 'club' },
  { id: 'BF-11', title: 'História', vertical: 'club' },
  { id: 'BF-12', title: 'Terceiro tempo', vertical: 'club' },
]

export default function FlipGridPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<Filter>('todos')

  const { values, panel } = useTuner(
    {
      duration: { value: 0.6, min: 0.3, max: 1.5, step: 0.05, label: 'duration' },
      stagger: { value: 0.02, min: 0, max: 0.08, step: 0.005, label: 'stagger' },
      ease: {
        value: 'power3.out',
        options: ['power2.inOut', 'power3.out', 'expo.out', 'back.out(1.2)'] as const,
        label: 'ease',
      },
    },
    { title: '// EXP-06' },
  )

  const { contextSafe } = useGSAP({ scope: containerRef })

  const applyFilter = contextSafe((next: Filter) => {
    if (next === filter) return

    // 1) fotografa o layout ANTES da mudança
    const state = Flip.getState('.flip-card')

    // 2) React atualiza o DOM de forma síncrona
    flushSync(() => setFilter(next))

    // 3) FLIP anima a diferença entre os dois layouts
    Flip.from(state, {
      duration: values.duration,
      ease: values.ease,
      stagger: values.stagger,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.3 },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.25 }),
    })
  })

  const visible = filter === 'todos' ? CARDS : CARDS.filter((c) => c.vertical === filter)

  return (
    <ExperimentShell slug="06-flip-grid">
      <div ref={containerRef} style={{ padding: '48px 32px 96px', display: 'grid', gap: 24 }}>
        <span className="lab-eyebrow">{'// EXP-06 — FLIP LAYOUT'}</span>

        <p
          style={{
            margin: 0,
            maxWidth: '40ch',
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--lab-text-dim)',
          }}
        >
          O grid reorganiza de verdade — os cards saem do array renderizado e o
          FLIP anima a diferença entre os dois layouts.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => {
            const active = f.key === filter
            return (
              <button
                key={f.key}
                onClick={() => applyFilter(f.key)}
                style={{
                  fontFamily: 'var(--bf-font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  background: 'none',
                  border: `1px solid ${active ? 'var(--current-accent)' : 'var(--lab-border)'}`,
                  borderRadius: 2,
                  color: active ? 'var(--current-accent)' : 'var(--lab-text-dim)',
                  cursor: 'pointer',
                  transition:
                    'border-color 120ms var(--ease-standard), color 120ms var(--ease-standard)',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          {visible.map((card) => {
            const lit = filter !== 'todos' && card.vertical === filter
            return (
              <article
                key={card.id}
                className="flip-card"
                data-flip-id={card.id}
                style={{
                  border: '1px solid var(--lab-border)',
                  background: 'var(--lab-surface)',
                  padding: 20,
                  borderRadius: 4,
                  display: 'grid',
                  gap: 8,
                  alignContent: 'start',
                }}
              >
                <span
                  className="lab-mono"
                  style={{ color: lit ? 'var(--current-accent)' : undefined }}
                >
                  {card.id}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--bf-font-display)',
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: 1.3,
                    color: 'var(--bf-white)',
                  }}
                >
                  {card.title}
                </h3>
                <span className="lab-chip" style={{ justifySelf: 'start' }}>
                  {VERTICAL_LABEL[card.vertical]}
                </span>
              </article>
            )
          })}
        </div>
      </div>
      {panel}
    </ExperimentShell>
  )
}
