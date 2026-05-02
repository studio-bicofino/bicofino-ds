'use client'

import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

const C = {
  black: '#2a2c2b',
  white: '#ffffff',
  steel: '#6d7886',
}
const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const ease = 'cubic-bezier(0.2,0,0,1)'

function parseVal(val: string) {
  const m = val.match(/^([+-]?\d+\.?\d*)(.*)$/)
  if (!m) return { num: 0, suffix: val, decimals: 0 }
  const decimals = m[1].includes('.') ? m[1].split('.')[1].length : 0
  return { num: parseFloat(m[1]), suffix: m[2], decimals }
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function useCountUp(target: number, decimals: number, inView: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf: number
    const dur = 800
    let start: DOMHighResTimeStamp | null = null
    function frame(ts: DOMHighResTimeStamp) {
      if (!start) start = ts
      const t = Math.min((ts - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(target * eased)
      if (t < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])
  return decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.round(val)
}

interface MetricCardProps {
  value: string
  label: string
  description?: string
  Icon: LucideIcon
  delay?: number
}

export function MetricCard({ value, label, description, Icon, delay = 0 }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const { num, suffix, decimals } = parseVal(value)
  const count = useCountUp(num, decimals, inView)

  return (
    <div
      ref={ref}
      style={{
        background: C.white,
        padding: '28px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 280ms ${ease} ${delay}ms, transform 280ms ${ease} ${delay}ms`,
      }}
    >
      {/* Icon — functional, very subtle */}
      <div style={{
        color: C.steel,
        opacity: inView ? 0.4 : 0,
        marginBottom: 20,
        transition: `opacity 240ms ${ease} ${delay + 40}ms`,
      }}>
        <Icon size={16} strokeWidth={1.5} />
      </div>

      {/* Number — dominant */}
      <div style={{ overflow: 'hidden', marginBottom: 10 }}>
        <div style={{
          fontFamily: sans,
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: C.black,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          transform: inView ? 'translateY(0)' : 'translateY(105%)',
          transition: `transform 440ms ${ease} ${delay + 40}ms`,
        }}>
          {count}{suffix}
        </div>
      </div>

      {/* Separator */}
      <div style={{
        height: 1,
        background: 'rgba(42,44,43,0.07)',
        marginBottom: 10,
        transformOrigin: 'left',
        transform: inView ? 'scaleX(1)' : 'scaleX(0)',
        transition: `transform 440ms ${ease} ${delay + 120}ms`,
      }} />

      {/* Label */}
      <p style={{
        fontFamily: mono,
        fontSize: 9,
        letterSpacing: '0.11em',
        textTransform: 'uppercase' as const,
        color: C.steel,
        margin: 0,
        opacity: inView ? 1 : 0,
        transition: `opacity 280ms ${ease} ${delay + 160}ms`,
      }}>
        {label}
      </p>

      {/* Description — very subtle, optional */}
      {description && (
        <p style={{
          fontFamily: sans,
          fontSize: 11,
          color: 'rgba(109,120,134,0.6)',
          margin: '6px 0 0',
          lineHeight: 1.5,
          opacity: inView ? 1 : 0,
          transition: `opacity 280ms ${ease} ${delay + 220}ms`,
        }}>
          {description}
        </p>
      )}
    </div>
  )
}
