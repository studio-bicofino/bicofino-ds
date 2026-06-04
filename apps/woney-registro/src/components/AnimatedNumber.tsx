'use client'

import { useEffect, useRef, useState } from 'react'
import { fmtBRL, fmtX, fmtHoras } from '@/lib/format'

type Kind = 'brl' | 'x' | 'hours'
const FORMATTERS: Record<Kind, (n: number) => string> = {
  brl: fmtBRL,
  x: fmtX,
  hours: fmtHoras,
}

/* Count-up de dados — ease-out cúbico, uma vez, na entrada.
   Sob prefers-reduced-motion mostra o valor final na hora (DESIGN.md §8). */
export function AnimatedNumber({
  value,
  kind = 'brl',
  duration = 750,
  className,
  style,
}: {
  value: number
  kind?: Kind
  duration?: number
  className?: string
  style?: React.CSSProperties
}) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(value)
      return
    }
    let raf = 0
    let t0 = 0
    const tick = (t: number) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setN(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setN(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {FORMATTERS[kind](n)}
    </span>
  )
}
