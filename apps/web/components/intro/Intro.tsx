'use client'

import React, { useState, useLayoutEffect } from 'react'
import { OVERLAY_BASE, POWER_BLACK } from './shared'
import { StarSpin } from './variants/StarSpin'

/**
 * Intro orchestrator — sanctioned motion exception (see DESIGN.md §8).
 *
 * Plays the star-spin brand opening over a power-black overlay; the site
 * renders underneath. The variant starts fully black, ~1.0s, and calls
 * onComplete when the black is gone — which clears the overlay and triggers
 * the hero's sequential entrance.
 *
 * (2026-06-10: Woney picked star-spin as the single opening; the other four
 * variants — glitch/split/fragments/rain — were retired with the randomiser.)
 *
 * Safeguards (briefing Frente C):
 *  - prefers-reduced-motion → skips the intro entirely.
 *  - Content renders underneath (overlay only) → no SEO/LCP cost.
 *
 * Frequency: plays on EVERY full page load (Woney, 2026-06-10 — the old
 * once-per-session guard hid the intro behind Chrome's session restore,
 * which resurrects sessionStorage). Client-side navigations don't remount
 * the home, so in-site browsing still doesn't replay it.
 */

export function Intro({ onReveal }: { onReveal?: () => void }) {
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)

  // Decide post-hydrate, before paint: matchMedia is client-only, and the
  // server can't know the visitor's reduced-motion preference.
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDone(true)
      onReveal?.()
      return
    }
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (done) return null

  // SSR + pre-decision: a plain black cover so nothing flashes before mount.
  if (!ready) {
    return (
      <div
        className="bf-intro-overlay"
        aria-hidden="true"
        style={{ ...OVERLAY_BASE, background: POWER_BLACK }}
      />
    )
  }

  return (
    <StarSpin
      onComplete={() => {
        setDone(true)
        onReveal?.()
      }}
    />
  )
}
