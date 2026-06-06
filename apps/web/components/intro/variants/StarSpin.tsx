'use client'

import React from 'react'
import { motion } from 'motion/react'
import { OVERLAY_BASE, POWER_BLACK, type VariantProps } from '../shared'

// The 4-point Bicofino sparkle — last path of logo-bicofino.svg.
// Native space: x ∈ [264.53, 330.01], y ∈ [0, 65.48]; centre (297.27, 32.74).
const STAR_PATH =
  'M330.01,32.74c-24.55,0-32.74-8.18-32.74-32.74,0,24.56-8.18,32.74-32.74,32.74,24.56,0,32.74,8.18,32.74,32.74,0-24.56,8.19-32.74,32.74-32.74'

// Translate so the sparkle centre lands at (50,50) of the 100×100 viewBox.
const CENTER_STAR = `translate(${50 - 297.27}, ${50 - 32.74})`

/** A power-black overlay with the sparkle punched out as a transparent window
 *  that spins on its axis, then scales toward the viewer until the hole's
 *  concave edges clear the corners and the black is wholly consumed. */
export function StarSpin({ onComplete }: VariantProps) {
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
          <mask id="bf-intro-star" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            {/* white = opaque overlay, black = the transparent window */}
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <motion.g
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scale: 0.05, rotate: -150 }}
              animate={{ scale: [0.05, 0.12, 9], rotate: [-150, 100, 205] }}
              transition={{
                duration: 1.0,
                times: [0, 0.5, 1],
                // spin settles (ease-out), then the window punches open (ease-in)
                ease: [
                  [0.16, 1, 0.3, 1],
                  [0.7, 0, 0.84, 0],
                ],
              }}
              onAnimationComplete={onComplete}
            >
              <path d={STAR_PATH} transform={CENTER_STAR} fill="black" />
            </motion.g>
          </mask>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill={POWER_BLACK} mask="url(#bf-intro-star)" />
      </svg>
    </div>
  )
}
