'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { HeroBlock } from '@/components/home/HeroBlock'
import { Intro } from '@/components/intro/Intro'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  // Goes true once the intro's black screen has fully cleared (or immediately
  // when the intro is skipped) — gates the hero's sequential entrance.
  const [revealed, setRevealed] = useState(false)

  return (
    <>
      <Intro onReveal={() => setRevealed(true)} />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bf-surface)' }}>
        <div style={{ height: 120 }} />
        <HeroBlock revealed={revealed} />
        <div style={{ flex: 1, background: 'var(--bf-surface)' }}>
          <Footer />
        </div>
      </main>
    </>
  )
}
