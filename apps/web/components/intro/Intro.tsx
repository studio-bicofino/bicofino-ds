'use client'

import React, { useState, useLayoutEffect } from 'react'
import { OVERLAY_BASE, POWER_BLACK } from './shared'
import { StarSpin } from './variants/StarSpin'
import { Glitch } from './variants/Glitch'
import { SplitScreen } from './variants/SplitScreen'
import { Fragments } from './variants/Fragments'
import { RainDrops } from './variants/RainDrops'

/**
 * Intro orchestrator — sanctioned motion exception (see DESIGN.md §8).
 *
 * Picks one brand-opening variant at random per visit and plays it over a
 * power-black overlay; the site renders underneath. Each variant honours the
 * same contract: starts fully black, ~1.0s, calls onComplete when the black is
 * gone — which clears the overlay and triggers the hero's sequential entrance.
 *
 * Safeguards (briefing Frente C):
 *  - prefers-reduced-motion → skips the intro entirely.
 *  - Plays once per session (sessionStorage); returning visitors skip it.
 *  - Content renders underneath (overlay only) → no SEO/LCP cost.
 *
 * Testing: append ?intro=star|glitch|split|fragments (or ?intro=random) to force
 * a variant and bypass the once-per-session guard.
 */

const VARIANTS = {
  star: StarSpin,
  glitch: Glitch,
  split: SplitScreen,
  fragments: Fragments,
  rain: RainDrops,
} as const

type VariantKey = keyof typeof VARIANTS
const KEYS = Object.keys(VARIANTS) as VariantKey[]

export function Intro({ onReveal }: { onReveal?: () => void }) {
  const [variant, setVariant] = useState<VariantKey | null>(null)
  const [done, setDone] = useState(false)

  // Decide post-hydrate, before paint: matchMedia / sessionStorage / random are
  // client-only, and a random pick on the server would mismatch hydration.
  useLayoutEffect(() => {
    const finish = () => {
      setDone(true)
      onReveal?.()
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return finish()

    const forced = new URLSearchParams(window.location.search).get('intro')
    const hasOverride = forced != null

    if (!hasOverride && sessionStorage.getItem('bf-intro-played')) return finish()
    sessionStorage.setItem('bf-intro-played', '1')

    const pick: VariantKey =
      forced && forced !== 'random' && (KEYS as string[]).includes(forced)
        ? (forced as VariantKey)
        : KEYS[Math.floor(Math.random() * KEYS.length)]

    if (process.env.NODE_ENV !== 'production') console.info('[intro] variant:', pick)
    setVariant(pick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (done) return null

  // SSR + pre-decision: a plain black cover so nothing flashes before the pick.
  if (!variant) {
    return (
      <div
        className="bf-intro-overlay"
        aria-hidden="true"
        style={{ ...OVERLAY_BASE, background: POWER_BLACK }}
      />
    )
  }

  const Variant = VARIANTS[variant]
  return (
    <Variant
      onComplete={() => {
        setDone(true)
        onReveal?.()
      }}
    />
  )
}
