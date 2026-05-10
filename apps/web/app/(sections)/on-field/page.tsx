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
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main style={{ flex: 1, background: 'var(--bf-surface)', display: 'flex', flexDirection: 'column' }}>
        <section
          style={{
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
            {t('on-field.eyebrow')}
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
            {t('on-field.heading')}
          </h1>

          <p
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--bf-text-secondary)',
              marginBottom: 'calc(var(--bf-space-lg) * 2)',
            }}
          >
            {t('on-field.intro')}
          </p>

          <div style={{ marginBottom: 'calc(var(--bf-space-lg) * 2)' }}>
            <Accordion items={items} />
          </div>

          <p
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--bf-text-subtle)',
            }}
          >
            // {t('on-field.closing')}
          </p>
        </section>
      </main>
      <div style={{ background: 'var(--bf-surface)' }}>
        <Footer />
      </div>
    </>
  )
}
