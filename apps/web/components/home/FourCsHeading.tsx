'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useLang } from '@/content/index'

const KEYS = [
  'home.4cs.connect',
  'home.4cs.curate',
  'home.4cs.create',
  'home.4cs.consult',
] as const

export function FourCsHeading({ start, baseDelay = 0 }: { start?: boolean; baseDelay?: number } = {}) {
  const { t } = useLang()
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
        <motion.span
          key={key}
          aria-hidden="true"
          className="bf-reveal"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            delay: baseDelay + i * 0.06,
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'block',
            fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
            fontWeight: 700,
            color: 'var(--bf-text-primary)',
            /* clamp: 40px mobile → 88px desktop */
            fontSize: 'clamp(40px, 7vw, 88px)',
            lineHeight: 1.0,
          }}
        >
          {t(key)}
        </motion.span>
      ))}
    </div>
  )
}
