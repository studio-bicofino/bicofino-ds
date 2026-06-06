'use client'

import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { OVERLAY_BASE, POWER_BLACK, type VariantProps } from '../shared'

type Rect = { id: number; x: number; y: number; w: number; h: number }
type Tile = Rect & { delay: number; dur: number; rot: number; drift: number }

/** The black screen shatters fractally — a recursive (BSP) subdivision yields
 *  shards of wildly varying size that drop under gravity, floor-first. Bigger
 *  shards read as heavier: they spin and drift less, and fall a touch slower. */
export function Fragments({ onComplete }: VariantProps) {
  const { tiles, fall, lastId } = useMemo(() => {
    const r = (a: number, b: number) => a + Math.random() * (b - a)
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    const fall = vh * 1.3 // far enough that even top shards clear the screen

    const rects: Rect[] = []
    let id = 0
    const bsp = (x: number, y: number, w: number, h: number, depth: number): void => {
      const tooSmall = w < 14 || h < 14
      const stop = depth <= 0 || tooSmall || (depth < 4 && Math.random() < 0.28)
      if (stop) {
        rects.push({ id: id++, x, y, w, h })
        return
      }
      // split along the longer side most of the time → less sliver-y shards
      const vertical = w > h ? Math.random() < 0.82 : Math.random() < 0.18
      const ratio = r(0.35, 0.65)
      if (vertical) {
        const w1 = w * ratio
        bsp(x, y, w1, h, depth - 1)
        bsp(x + w1, y, w - w1, h, depth - 1)
      } else {
        const h1 = h * ratio
        bsp(x, y, w, h1, depth - 1)
        bsp(x, y + h1, w, h - h1, depth - 1)
      }
    }
    bsp(0, 0, 100, 100, 6)

    const tiles: Tile[] = rects.map((rc) => {
      const cy = rc.y + rc.h / 2
      const big = rc.w * rc.h > 220 // area in %² — heavier shards
      return {
        ...rc,
        delay: (1 - cy / 100) * 0.32 + r(0, 0.16), // floor-first cascade
        dur: r(0.8, 1.15) + (big ? 0.1 : 0),
        rot: big ? r(-10, 10) : r(-28, 28),
        drift: big ? r(-30, 30) : r(-60, 60),
      }
    })

    const lastId = tiles.reduce(
      (acc, t) => (t.delay + t.dur > acc.end ? { id: t.id, end: t.delay + t.dur } : acc),
      { id: tiles[0].id, end: -1 },
    ).id
    return { tiles, fall, lastId }
  }, [])

  return (
    <div className="bf-intro-overlay" aria-hidden="true" style={OVERLAY_BASE}>
      {tiles.map((t) => (
        <motion.div
          key={t.id}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{ y: fall, x: t.drift, rotate: t.rot }}
          // ease-in = gravity: starts slow, accelerates as it falls
          transition={{ delay: t.delay, duration: t.dur, ease: [0.4, 0, 1, 1] }}
          onAnimationComplete={t.id === lastId ? onComplete : undefined}
          style={{
            position: 'absolute',
            top: `${t.y}%`,
            left: `${t.x}%`,
            width: `calc(${t.w}% + 1px)`,
            height: `calc(${t.h}% + 1px)`,
            background: POWER_BLACK,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
