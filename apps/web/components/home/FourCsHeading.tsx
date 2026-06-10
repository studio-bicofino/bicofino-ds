'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useLang } from '@/content/index'

const KEYS = [
  'home.4cs.connect',
  'home.4cs.curate',
  'home.4cs.create',
  'home.4cs.consult',
] as const

export function FourCsHeading({ start, baseDelay = 0 }: { start?: boolean; baseDelay?: number } = {}) {
  const { t } = useLang()
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [obsVisible, setObsVisible] = useState(false)

  // When `start` is controlled (hero intro), follow it; otherwise fall back to
  // the in-viewport observer so the component still works standalone.
  const visible = start !== undefined ? start : obsVisible

  useEffect(() => {
    if (start !== undefined) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setObsVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [start])

  return (
    <div
      ref={ref}
      aria-label={KEYS.map((k) => t(k)).join(' ')}
      style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.0 }}
    >
      {KEYS.map((key, i) => (
        <span
          key={key}
          aria-hidden="true"
          style={{
            display: 'block',
            overflow: 'hidden',
            fontFamily: 'var(--bf-font-impact)',
            fontWeight: 700,
            color: 'var(--bf-text-primary)',
            /* clamp: 40px mobile → 88px desktop */
            fontSize: 'clamp(40px, 7vw, 88px)',
            lineHeight: 1.0,
          }}
        >
          {/* Split reveal vertical (EXP-01): cada linha sobe da própria dobra,
              cascateando num expo.out longo e fluido. */}
          <motion.span
            className="bf-reveal"
            initial={reducedMotion ? false : { opacity: 0, y: '110%' }}
            animate={
              visible || reducedMotion
                ? { opacity: 1, y: '0%' }
                : { opacity: 0, y: '110%' }
            }
            transition={{
              delay: baseDelay + i * 0.09,
              duration: 0.9,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ display: 'block' }}
          >
            {t(key)}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
