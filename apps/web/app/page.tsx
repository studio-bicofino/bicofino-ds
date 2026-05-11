'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { HeroBlock } from '@/components/home/HeroBlock'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bf-surface)' }}>
        <div style={{ height: 180 }} />
        <HeroBlock />
        <div style={{ flex: 1, background: 'var(--bf-surface)' }}>
          <Footer />
        </div>
      </main>
    </>
  )
}
