import type { CSSProperties } from 'react'

/** The intro variant receives this — call it once the black has fully cleared. */
export type VariantProps = { onComplete: () => void }

/** Full-screen, click-through overlay. No background by default — star-spin
 *  paints its own black via an SVG rect. */
export const OVERLAY_BASE: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  pointerEvents: 'none',
  overflow: 'hidden',
}

export const POWER_BLACK = 'var(--bf-power-black)'
