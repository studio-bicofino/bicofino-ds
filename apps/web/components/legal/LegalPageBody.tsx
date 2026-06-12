'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { SplitReveal } from '@/components/primitives/SplitReveal'
import { useLang } from '@/content/index'
import type { Lang } from '@/content/index'
import type { LegalDoc } from '@/content/legal'

const mono: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--bf-text-secondary)',
}

const body: React.CSSProperties = {
  fontFamily: '"Inter", ui-sans-serif, sans-serif',
  fontSize: 16,
  lineHeight: 1.7,
  color: 'var(--bf-text-secondary)',
  maxWidth: '65ch',
}

export function LegalPageBody({ doc }: { doc: Record<Lang, LegalDoc> }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang } = useLang()
  const d = doc[lang]

  return (
    <>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main style={{ flex: 1, background: 'var(--bf-surface)', display: 'flex', flexDirection: 'column' }}>
        <article
          style={{
            width: '100%',
            maxWidth: 720,
            marginInline: 'auto',
            paddingInline: 'var(--bf-space-lg)',
            paddingBlock: 'calc(var(--bf-space-lg) * 3)',
          }}
        >
          <p style={{ ...mono, marginBottom: 'var(--bf-space-md)' }}>// {d.eyebrow}</p>

          <SplitReveal
            text={d.title}
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
              marginBottom: 'var(--bf-space-sm)',
            }}
          />

          <p style={{ ...mono, marginBottom: 'var(--bf-space-lg)' }}>{d.updated}</p>

          <p style={{ ...body, marginBottom: 'calc(var(--bf-space-lg) * 2)' }}>
            {d.intro}
          </p>

          {d.sections.map((section) => (
            <section key={section.heading} style={{ marginBottom: 'var(--bf-space-lg)' }}>
              <h2
                style={{
                  fontFamily: '"Inter", ui-sans-serif, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: 'var(--bf-text-primary)',
                  marginBottom: 'var(--bf-space-sm)',
                }}
              >
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} style={{ ...body, marginBottom: 'var(--bf-space-sm)' }}>
                  {p}
                </p>
              ))}
              {section.list && (
                <ul style={{ ...body, paddingLeft: 'var(--bf-space-md)', marginTop: 'var(--bf-space-sm)' }}>
                  {section.list.map((item) => (
                    <li key={item.slice(0, 40)} style={{ marginBottom: 'var(--bf-space-sm)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p style={{ ...mono, marginTop: 'calc(var(--bf-space-lg) * 1.5)' }}>
            //{' '}
            <a
              href={d.related.href}
              style={{ color: 'inherit', textDecorationThickness: 1, textUnderlineOffset: 3 }}
            >
              {d.related.label}
            </a>
          </p>
        </article>
      </main>
      <div style={{ background: 'var(--bf-surface)' }}>
        <Footer />
      </div>
    </>
  )
}
