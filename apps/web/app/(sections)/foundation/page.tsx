'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Accordion } from '@/components/primitives/Accordion'
import { SplitReveal } from '@/components/primitives/SplitReveal'
import { useLang } from '@/content/index'

export default function FoundationPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLang()

  const items = [
    { heading: t('foundation.connect.heading'), body: t('foundation.connect.body') },
    { heading: t('foundation.curate.heading'),  body: t('foundation.curate.body')  },
    { heading: t('foundation.create.heading'),  body: t('foundation.create.body')  },
    { heading: t('foundation.consult.heading'), body: t('foundation.consult.body') },
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
            // {t('foundation.heading')}
          </p>

          <SplitReveal
            text={t('foundation.title')}
            as="h1"
            mask
            stagger={0.09}
            duration={0.9}
            ease={[0.19, 1, 0.22, 1]}
            style={{
              fontFamily: 'var(--bf-font-impact)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: 'var(--bf-text-primary)',
              marginBottom: 'var(--bf-space-lg)',
            }}
          />

          <p
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--bf-text-secondary)',
              marginBottom: 'calc(var(--bf-space-lg) * 2)',
            }}
          >
            {t('foundation.intro')}
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
              color: 'var(--bf-power-black)',
            }}
          >
            // {t('foundation.closing')}
          </p>
        </section>
      </main>
      <div style={{ background: 'var(--bf-surface)' }}>
        <Footer />
      </div>
    </>
  )
}
