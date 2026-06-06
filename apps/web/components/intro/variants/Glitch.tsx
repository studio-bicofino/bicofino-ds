'use client'

import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { OVERLAY_BASE, POWER_BLACK, type VariantProps } from '../shared'

type Block = {
  key: number
  top: number
  left: number
  w: number
  h: number
  jx: number[]
  fl: number[]
  ex: number
  ey: number
  fade: boolean
  t: number[]
  delay: number
  dur: number
}

/** The screen is torn into irregular blocks (random row heights, random column
 *  splits) that each jitter and flicker on their own clock, then bail off-screen
 *  in random directions — or just glitch out of existence. Deliberately chaotic. */
export function Glitch({ onComplete }: VariantProps) {
  const { blocks, lastKey } = useMemo(() => {
    const r = (a: number, b: number) => a + Math.random() * (b - a)
    const ri = (a: number, b: number) => Math.floor(r(a, b + 0.999))
    const modes = ['L', 'R', 'L', 'R', 'U', 'D', 'fade']

    // rows of random heights summing to 100%
    const rows: number[] = []
    let rem = 100
    const n = ri(9, 12)
    for (let i = 0; i < n; i++) {
      const avg = rem / (n - i)
      const h = i === n - 1 ? rem : Math.max(4, r(avg * 0.5, avg * 1.5))
      rows.push(h)
      rem -= h
    }

    const blocks: Block[] = []
    let key = 0
    let top = 0
    for (const h of rows) {
      const segs = ri(1, 3)
      let left = 0
      let wrem = 100
      for (let s = 0; s < segs; s++) {
        const w = s === segs - 1 ? wrem : Math.max(10, r(wrem * 0.3, wrem * 0.7))
        const m = modes[ri(0, modes.length - 1)]
        let ex = r(-14, 14)
        let ey = 0
        let fade = false
        if (m === 'L') ex = -r(150, 185)
        else if (m === 'R') ex = r(150, 185)
        else if (m === 'U') ey = -r(150, 185)
        else if (m === 'D') ey = r(150, 185)
        else fade = true
        blocks.push({
          key: key++,
          top,
          left,
          w,
          h,
          jx: [r(-14, 14), r(-16, 16), r(-10, 10)],
          fl: [r(0.3, 0.6), r(0.85, 1), r(0.4, 0.7)],
          ex,
          ey,
          fade,
          t: [0, r(0.12, 0.2), r(0.32, 0.46), 1],
          delay: r(0, 0.4),
          dur: r(0.6, 1.0),
        })
        left += w
        wrem -= w
      }
      top += h
    }

    const lastKey = blocks.reduce(
      (mk, b) => (b.delay + b.dur > blocks[mk].delay + blocks[mk].dur ? b.key : mk),
      0,
    )
    return { blocks, lastKey }
  }, [])

  return (
    <div className="bf-intro-overlay" aria-hidden="true" style={OVERLAY_BASE}>
      {blocks.map((b) => (
        <motion.div
          key={b.key}
          initial={{ x: '0%', y: '0%', opacity: 1 }}
          animate={{
            x: ['0%', `${b.jx[0]}%`, `${b.jx[1]}%`, `${b.fade ? b.jx[2] : b.ex}%`],
            y: ['0%', '0%', '0%', `${b.ey}%`],
            opacity: [1, b.fl[0], b.fl[1], b.fade ? 0 : 1],
          }}
          transition={{
            delay: b.delay,
            duration: b.dur,
            times: b.t,
            // two snappy jitters, then an accelerating bail-out
            ease: [
              [0.2, 0, 0, 1],
              [0.2, 0, 0, 1],
              [0.5, 0, 1, 1],
            ],
          }}
          onAnimationComplete={b.key === lastKey ? onComplete : undefined}
          style={{
            position: 'absolute',
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: `calc(${b.w}% + 1px)`,
            height: `calc(${b.h}% + 1px)`,
            background: POWER_BLACK,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
