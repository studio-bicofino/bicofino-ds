import type { CSSProperties } from 'react'

/** Every intro variant receives this — call it once the black has fully cleared. */
export type VariantProps = { onComplete: () => void }

/** Full-screen, click-through overlay. No background by default — variants paint
 *  their own black pieces (or, for star-spin, an SVG rect). */
export const OVERLAY_BASE: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  pointerEvents: 'none',
  overflow: 'hidden',
}

export const POWER_BLACK = 'var(--bf-power-black)'
export const EASE_OUT = [0.16, 1, 0.3, 1] as const
