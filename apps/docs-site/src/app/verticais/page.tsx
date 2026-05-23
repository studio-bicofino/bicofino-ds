'use client'

import { FocusReveal } from '@/components/motion/FocusReveal'
import { OnFieldSection } from '@/components/OnFieldSection'
import { useLang } from '@/content'
import React from 'react'

/* ─── Design tokens ─── */
const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  white:      'var(--bf-surface)',
  steel:      'var(--bf-text-secondary)',
  platinum:   'var(--bf-text-subtle)',
  aluminium:  '#e2eaf2',
  powerBlack: '#061015',
  crema:      '#f3ebd4',
  caffe:      '#33111a',
  cacao:      '#5e4c41',
  spfc:       '#f0535e',
  sep:        '#2fd298',
  usa:        '#05185c',
  niederland: '#fe4600',
  australia:  '#e5ff78',
  benfica:    '#ed0007',
  miami:      '#f4b3cb',
  napoli:     '#77deff',
  torino:     '#821324',
  como:       '#0d8aff',
  venezia:    '#38e0e3',
  fiorentina: '#711cfe',
  champagne:  '#d8d7d3',
}

const PALETTE = {
  bg:       '#f2f8ff',
  black:    '#2a2c2b',
  steel:    '#6d7886',
  white:    '#ffffff',
  platinum: '#a8c9e5',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 5vw, 72px)'

/* ─── Shared atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' }}>
      {children}
    </p>
  )
}

function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="text-balance" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
      {children}
    </h1>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 0', maxWidth: 580 }}>
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6b — Verticais (05.1)
   ═══════════════════════════════════════════════════════════════════════════ */
function VerticaisSection() {
  const { t } = useLang()

  return (
    <section id="verticais">
      <SectionHeader eyebrow="// 05.1">{t('verticais.title')}</SectionHeader>
      <FocusReveal style={{ padding: `40px ${H_PAD} 0` }}>
        <Lead>{t('verticais.lead')}</Lead>
      </FocusReveal>

      <div className="bf-stagger-parent" style={{ margin: `40px ${H_PAD} 64px`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        <div className="bf-stagger-item" style={{ background: C.white, padding: '40px 36px', borderTop: `3px solid ${C.black}` }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 20px', letterSpacing: '0.1em' }}>// 05.1.1</p>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 12px', fontFamily: sans }}>On Pitch</h3>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel }}>{t('verticais.onfield.desc')}</p>
        </div>
        <div className="bf-stagger-item" style={{ background: C.white, padding: '40px 36px', borderTop: `3px solid ${C.steel}` }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 20px', letterSpacing: '0.1em' }}>// 05.1.2</p>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 12px', fontFamily: sans }}>Off Pitch</h3>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel }}>{t('verticais.offfield.desc')}</p>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <VerticaisSection />
      <OnFieldSection />
    </>
  )
}
