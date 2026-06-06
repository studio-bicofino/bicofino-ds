'use client'

import React from 'react'
import { motion } from 'motion/react'
import { OVERLAY_BASE, POWER_BLACK, type VariantProps } from '../shared'

/** Two black halves meeting at a thin accent seam hold for a beat, then part
 *  to the screen edges like a curtain — revealing the site centre-out. */
export function SplitScreen({ onComplete }: VariantProps) {
  const half: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '50%',
    background: POWER_BLACK,
    willChange: 'transform',
  }
  const transition = {
    duration: 0.92,
    times: [0, 0.2, 1],
    ease: [0.5, 0, 0.2, 1] as const,
  }

  return (
    <div className="bf-intro-overlay" aria-hidden="true" style={OVERLAY_BASE}>
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: ['0%', '0%', '-100%'] }}
        transition={transition}
        onAnimationComplete={onComplete}
        style={{ ...half, left: 0, borderRight: '1px solid var(--bf-accent)' }}
      />
      <motion.div
        initial={{ x: '0%' }}
        animate={{ x: ['0%', '0%', '100%'] }}
        transition={transition}
        style={{ ...half, right: 0, borderLeft: '1px solid var(--bf-accent)' }}
      />
    </div>
  )
}
