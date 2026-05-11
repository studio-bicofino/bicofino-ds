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

export function FourCsHeading() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-label={KEYS.map((k) => t(k)).join(' ')}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {KEYS.map((key, i) => (
        <motion.span
          key={key}
          aria-hidden="true"
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            delay: i * 0.06,
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'block',
            fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
            fontWeight: 700,
            color: 'var(--bf-text-primary)',
            fontSize: 44,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {t(key)}
        </motion.span>
      ))}
    </div>
  )
}
