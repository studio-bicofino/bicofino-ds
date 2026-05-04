'use client'

import { useState, useEffect, useRef } from 'react'

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const BASE = '/assets/on-field/icons/'

const STATES = [
  { icon: 'icon-speed.svg',   value: 35,  unit: 'km/h', label: 'TOP SPEED'           },
  { icon: 'icon-body.svg',    value: 7,   unit: '%',    label: 'BODY FAT'             },
  { icon: 'icon-sneaker.svg', value: 11,  unit: 'km',   label: 'DISTANCE/game'        },
]

function useCountUp(target: number, active: boolean, duration = 600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) { setVal(0); return }
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])
  return val
}

export function AthleteStatCard() {
  const [idx, setIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Visibility observer
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); ob.disconnect() } },
      { threshold: 0.3 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  // Cycle states
  useEffect(() => {
    if (!visible) return
    timerRef.current = setTimeout(() => {
      setIdx(i => (i + 1) % STATES.length)
      setAnimKey(k => k + 1)
    }, 4000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [visible, idx])

  const state = STATES[idx]
  const displayVal = useCountUp(state.value, visible)

  return (
    <div ref={ref} style={{
      background: 'var(--bf-surface)',
      border: '1px solid var(--bf-border)',
      borderRadius: 6,
      padding: '20px 16px 18px',
      width: '100%',
      maxWidth: 112,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      minHeight: 140,
      justifyContent: 'center',
    }}>
      {/* Icon */}
      <div key={`icon-${animKey}`} style={{
        width: 24, height: 24, marginBottom: 4,
        animation: 'of-icon-in 280ms cubic-bezier(0.2,0,0,1) forwards',
        opacity: 0,
      }}>
        <img
          src={`${BASE}${state.icon}`}
          alt={state.label}
          width={24}
          height={24}
          style={{ objectFit: 'contain', opacity: 0.65 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>

      {/* Value + unit */}
      <div key={`val-${animKey}`} style={{
        display: 'flex', alignItems: 'baseline', gap: 2,
        animation: 'of-stat-count 340ms 60ms cubic-bezier(0.2,0,0,1) forwards',
        opacity: 0,
      }}>
        <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--bf-text-primary)', fontFamily: sans, lineHeight: 1 }}>
          {displayVal}
        </span>
        <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--bf-text-secondary)', letterSpacing: '0.04em' }}>
          {state.unit}
        </span>
      </div>

      {/* Label */}
      <div key={`lbl-${animKey}`} style={{
        animation: 'of-label-in 320ms 120ms cubic-bezier(0.2,0,0,1) forwards',
        opacity: 0,
      }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: 'var(--bf-text-secondary)', margin: 0, textAlign: 'center', textTransform: 'uppercase' }}>
          {state.label}
        </p>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
        {STATES.map((_, i) => (
          <div key={i} style={{
            width: i === idx ? 12 : 4, height: 3,
            borderRadius: 2,
            background: i === idx ? 'var(--bf-text-primary)' : 'var(--bf-border-strong)',
            transition: 'width 300ms cubic-bezier(0.2,0,0,1), background 300ms cubic-bezier(0.2,0,0,1)',
          }} />
        ))}
      </div>
    </div>
  )
}
