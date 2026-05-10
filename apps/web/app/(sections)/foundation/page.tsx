'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { useLang } from '@/content/index'

export default function FoundationPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLang()

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main style={{ flex: 1, background: 'var(--bf-bg-page)', display: 'flex', flexDirection: 'column' }}>
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
            {t('foundation.eyebrow')}
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
            {t('foundation.heading')}
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
            {t('foundation.intro')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--bf-space-lg)',
              marginBottom: 'calc(var(--bf-space-lg) * 2)',
            }}
          >
            {[
              { hkey: 'foundation.connect.heading', bkey: 'foundation.connect.body' },
              { hkey: 'foundation.curate.heading',  bkey: 'foundation.curate.body'  },
              { hkey: 'foundation.create.heading',  bkey: 'foundation.create.body'  },
              { hkey: 'foundation.consult.heading', bkey: 'foundation.consult.body' },
            ].map(({ hkey, bkey }) => (
              <div key={hkey} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--bf-space-sm)' }}>
                <h3
                  style={{
                    fontFamily: '"Inter", ui-sans-serif, sans-serif',
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'var(--bf-text-primary)',
                  }}
                >
                  {t(hkey)}
                </h3>
                <p
                  style={{
                    fontFamily: '"Inter", ui-sans-serif, sans-serif',
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'var(--bf-text-secondary)',
                  }}
                >
                  {t(bkey)}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: '"Inter", ui-sans-serif, sans-serif',
              fontSize: 13,
              lineHeight: 1.5,
              color: 'var(--bf-text-secondary)',
              paddingTop: 'var(--bf-space-lg)',
              borderTop: '1px solid var(--bf-border)',
            }}
          >
            {t('foundation.closing')}
          </p>
        </section>
      </main>
      <div style={{ background: 'var(--bf-surface)' }}>
        <Footer />
      </div>
    </>
  )
}
