'use client'

import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { OVERLAY_BASE, POWER_BLACK, type VariantProps } from '../shared'

const GX = 6
const GY = 6

type Drop = { id: number; cx: number; cy: number; maxR: number; delay: number; dur: number }
type Ring = {
  id: number
  cx: number
  cy: number
  rMax: number
  delay: number
  dur: number
  peak: number
  sw: number
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const // rings: quick spread, natural settle
const EASE_IN = [0.55, 0, 1, 1] as const // reveal disc: slow start so ripples lead
const REVEAL_LAG = 0.45 // seconds the reveal trails the impact's ripples

/** Lake reveal — drops fall into still water. Each impact opens a spreading
 *  disc (the reveal) and emits a train of concentric outline rings; secondary
 *  rings are then born on the expanding front and propagate outward. Every ring
 *  and disc only ever grows, all with ease-out, so the surface keeps moving
 *  until it is wholly cleared.
 *
 *  Reveal coverage sits on a jittered grid — random-feeling, fills every corner. */
export function RainDrops({ onComplete }: VariantProps) {
  const { drops, rings, lastId } = useMemo(() => {
    const r = (a: number, b: number) => a + Math.random() * (b - a)
    const cw = 100 / GX
    const ch = 100 / GY

    const drops: Drop[] = []
    let id = 0
    for (let gy = 0; gy < GY; gy++) {
      for (let gx = 0; gx < GX; gx++) {
        drops.push({
          id: id++,
          cx: (gx + 0.5) * cw + r(-cw * 0.22, cw * 0.22),
          cy: (gy + 0.5) * ch + r(-ch * 0.22, ch * 0.22),
          maxR: r(19, 27), // ≥ worst-case corner distance → no black left behind
          delay: 0.9 * Math.pow(Math.random(), 0.6), // gentle cascade (impact time)
          dur: r(1.4, 1.65), // slow, continuous fill in the ripples' wake (≤~3s total)
        })
      }
    }

    // Ripple rings — a concentric train from each impact, plus secondaries that
    // spring from the first ring's front and travel on.
    const rings: Ring[] = []
    let rid = 0
    for (const d of drops) {
      for (let j = 0; j < 2; j++) {
        rings.push({
          id: rid++,
          cx: d.cx,
          cy: d.cy,
          rMax: d.maxR * (0.6 + 0.3 * j), // reach past neighbours so trains overlap
          delay: d.delay + j * 0.2,
          dur: r(0.9, 1.25),
          peak: 0.5 - j * 0.12,
          sw: 0.45 - j * 0.08,
        })
      }
      {
        const ang = r(0, Math.PI * 2)
        const off = d.maxR * 0.5
        rings.push({
          id: rid++,
          cx: d.cx + Math.cos(ang) * off,
          cy: d.cy + Math.sin(ang) * off,
          rMax: d.maxR * 0.55,
          delay: d.delay + 0.32 + r(0, 0.25),
          dur: r(0.8, 1.1),
          peak: 0.32,
          sw: 0.3,
        })
      }
    }

    const lastId = drops.reduce(
      (acc, d) => (d.delay + d.dur > acc.end ? { id: d.id, end: d.delay + d.dur } : acc),
      { id: drops[0].id, end: -1 },
    ).id
    return { drops, rings, lastId }
  }, [])

  return (
    <div className="bf-intro-overlay" aria-hidden="true" style={OVERLAY_BASE}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        <defs>
          <mask id="bf-intro-rain" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            {/* white = opaque overlay, black = the transparent water */}
            <rect x="0" y="0" width="100" height="100" fill="white" />
            {drops.map((d) => (
              <motion.circle
                key={d.id}
                cx={d.cx}
                cy={d.cy}
                fill="black"
                initial={{ r: 0 }}
                animate={{ r: d.maxR }}
                transition={{ delay: d.delay + REVEAL_LAG, duration: d.dur, ease: EASE_IN }}
                onAnimationComplete={d.id === lastId ? onComplete : undefined}
              />
            ))}
          </mask>
        </defs>

        <rect x="0" y="0" width="100" height="100" fill={POWER_BLACK} mask="url(#bf-intro-rain)" />

        {/* outline ripple rings — concentric trains + propagating secondaries */}
        {rings.map((ring) => (
          <motion.circle
            key={`ring-${ring.id}`}
            cx={ring.cx}
            cy={ring.cy}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={ring.sw}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: ring.rMax, opacity: [0, ring.peak, 0] }}
            transition={{ delay: ring.delay, duration: ring.dur, times: [0, 0.18, 1], ease: EASE_OUT }}
          />
        ))}
      </svg>
    </div>
  )
}
