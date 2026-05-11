'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Accordion } from '@/components/primitives/Accordion'
import { useLang } from '@/content/index'

export default function OffFieldPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLang()

  const items = [
    { heading: t('off-field.s1.heading'), body: t('off-field.s1.body') },
    { heading: t('off-field.s2.heading'), body: t('off-field.s2.body') },
    { heading: t('off-field.s3.heading'), body: t('off-field.s3.body') },
    { heading: t('off-field.s4.heading'), body: t('off-field.s4.body') },
    { heading: t('off-field.s5.heading'), body: t('off-field.s5.body') },
  ]

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main style={{ flex: 1, background: 'var(--bf-surface)', display: 'flex', flexDirection: 'column' }}>
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
              color: 'var(--bf-text-secondary)',
              marginBottom: 'var(--bf-space-md)',
            }}
          >
            {t('off-field.eyebrow')}
          </p>

          <h1
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: 'var(--bf-text-primary)',
              marginBottom: 'var(--bf-space-lg)',
            }}
          >
            {t('off-field.heading')}
          </h1>

          <p
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 12,
              lineHeight: 1.45,
              fontWeight: 400,
              letterSpacing: 0,
              color: 'var(--bf-text-secondary)',
              marginBottom: 'var(--bf-space-lg)',
            }}
          >
            {t('off-field.intro')}
          </p>

          <div
            style={{
              width: 500,
              height: 500,
              maxWidth: '100%',
              overflow: 'hidden',
              marginBottom: 'calc(var(--bf-space-lg) * 2)',
            }}
            aria-hidden="true"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/media/video-offfield.webm" type="video/webm" />
              <source src="/media/video-offfield.mp4" type="video/mp4" />
            </video>
          </div>

          <div style={{ marginBottom: 'calc(var(--bf-space-lg) * 2)' }}>
            <Accordion items={items} />
          </div>

          <p
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--bf-power-black)',
            }}
          >
            // {t('off-field.closing')}
          </p>
        </section>
      </main>
      <div style={{ background: 'var(--bf-surface)' }}>
        <Footer />
      </div>
    </>
  )
}
