'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Accordion } from '@/components/primitives/Accordion'
import { useLang } from '@/content/index'

export default function OnFieldPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLang()

  const items = [
    { heading: t('on-field.s1.heading'), body: t('on-field.s1.body') },
    { heading: t('on-field.s2.heading'), body: t('on-field.s2.body') },
    { heading: t('on-field.s3.heading'), body: t('on-field.s3.body') },
    { heading: t('on-field.s4.heading'), body: t('on-field.s4.body') },
  ]

  return (
    <>
      {/* Fixed video background */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: -2, overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src="/media/video-onpitch.webm" type="video/webm" />
        </video>
      </div>

      {/* Fixed dark overlay */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'rgba(0,0,0,0.8)' }} />

      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main-content" style={{ flex: 1, background: 'transparent', display: 'flex', flexDirection: 'column' }}>
        <section
          style={{
            width: '100%',
            maxWidth: 720,
            marginInline: 'auto',
            paddingInline: 'var(--bf-space-lg)',
            paddingBlock: 'calc(var(--bf-space-lg) * 3)',
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: 'var(--bf-space-md)',
            }}
          >
            {t('on-field.eyebrow')}
          </p>

          <h1
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: 'var(--bf-space-lg)',
            }}
          >
            {t('on-field.heading')}
          </h1>

          <p
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 14,
              lineHeight: 1.45,
              fontWeight: 400,
              letterSpacing: 0,
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: 'var(--bf-space-lg)',
            }}
          >
            {t('on-field.intro')}
          </p>

          <div
            style={{
              marginBottom: 'calc(var(--bf-space-lg) * 2)',
              '--bf-border': 'rgba(255, 255, 255, 0.2)',
              '--bf-text-primary': '#ffffff',
              '--bf-text-secondary': 'rgba(255, 255, 255, 0.75)',
              '--bf-text-subtle': 'rgba(255, 255, 255, 0.5)',
              '--bf-accent': 'rgba(255, 255, 255, 0.9)',
            } as React.CSSProperties}
          >
            <Accordion items={items} />
          </div>

          <p
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            // {t('on-field.closing')}
          </p>
        </section>
      </main>

      <div
        style={{
          '--bf-surface': 'transparent',
          '--bf-border': 'rgba(255, 255, 255, 0.15)',
          '--bf-text-primary': '#ffffff',
          '--bf-text-secondary': 'rgba(255, 255, 255, 0.65)',
          '--bf-text-subtle': 'rgba(255, 255, 255, 0.4)',
          '--bf-platinum': 'rgba(255, 255, 255, 0.5)',
          '--bf-accent': 'rgba(191, 163, 122, 1)',
        } as React.CSSProperties}
      >
        <Footer />
      </div>
    </>
  )
}
