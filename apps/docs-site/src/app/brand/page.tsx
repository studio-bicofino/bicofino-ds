'use client'

import { BicofinoLogo } from '@/components/BicofinoLogo'
import { BicofinoDiamond } from '@/components/BicofinoDiamond'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
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

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — Brand
   ═══════════════════════════════════════════════════════════════════════════ */
function Brand() {
  const { t } = useLang()

  return (
    <>
      <section id="logotipo">
        <SectionHeader eyebrow="// 03 • BRAND">{t('brand.logo.title')}</SectionHeader>
        <FocusReveal style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('brand.logo.lead')}</Lead>
        </FocusReveal>

        <div style={{ margin: `40px ${H_PAD} 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
          <div style={{ background: C.bg, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.logo.light')}</p>
            <BicofinoLogo color={C.black} width={200} />
          </div>
          <div style={{ background: C.powerBlack, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.logo.dark')}</p>
            <BicofinoLogo color={PALETTE.bg} width={200} />
          </div>
          <div style={{ background: C.crema, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.cacao, margin: 0, letterSpacing: '0.1em' }}>{t('brand.logo.crema')}</p>
            <BicofinoLogo color={C.caffe} width={200} />
          </div>
          <div style={{ background: C.aluminium, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.logo.aluminium')}</p>
            <BicofinoLogo color={C.black} width={160} />
          </div>
        </div>

        {/* Size study */}
        <div style={{ margin: `48px ${H_PAD} 0` }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' as const }}>{t('brand.logo.sizes.label')}</p>
          <div style={{ padding: '48px 56px', background: C.white, border: hairline, display: 'flex', alignItems: 'flex-end', gap: 48 }}>
            {[
              { width: 200, note: '200px', label: t('brand.logo.sizes.display')  },
              { width: 120, note: '120px', label: t('brand.logo.sizes.padrao')   },
              { width: 80,  note: '80px',  label: t('brand.logo.sizes.compacto') },
              { width: 48,  note: '48px',  label: t('brand.logo.sizes.minimo')   },
              { width: 32,  note: '32px',  label: t('brand.logo.sizes.evitar'), warn: true },
            ].map(({ width, note, label, warn }) => (
              <div key={width} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <BicofinoLogo color={warn ? C.platinum : C.black} width={width} />
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: warn ? C.platinum : C.steel, margin: 0, letterSpacing: '0.08em' }}>{note}</p>
                  <p style={{ fontFamily: mono, fontSize: 9, color: warn ? C.platinum : C.steel, margin: '3px 0 0', letterSpacing: '0.08em' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '10px 0 0', letterSpacing: '0.06em' }}>{t('brand.logo.minrec')}</p>
        </div>

        {/* Rules */}
        <div style={{ margin: `0 ${H_PAD}`, marginTop: 48 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 8px', textTransform: 'uppercase' }}>{t('brand.logo.rules.label')}</p>
          {[
            t('brand.logo.rule1'),
            t('brand.logo.rule2'),
            t('brand.logo.rule3'),
            t('brand.logo.rule4'),
          ].map((rule, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', padding: '12px 0', borderBottom: hairline, gap: 12 }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>0{i + 1}</span>
              <span style={{ fontSize: 13, color: C.black, lineHeight: 1.5 }}>{rule}</span>
            </div>
          ))}
        </div>

        {/* Diamond */}
        <div style={{ padding: `56px ${H_PAD} 0` }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' }}>{t('brand.diamond.label')}</p>
          <Lead>{t('brand.diamond.lead')}</Lead>
          <Lead>{t('brand.diamond.lead2')}</Lead>
        </div>

        <div style={{ margin: `32px ${H_PAD} 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
          <div style={{ background: C.bg, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.diamond.light')}</p>
            <BicofinoDiamond color={C.black} size={72} />
          </div>
          <div style={{ background: C.powerBlack, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.diamond.dark')}</p>
            <BicofinoDiamond color={PALETTE.bg} size={72} />
          </div>
          <div style={{ background: C.crema, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.cacao, margin: 0, letterSpacing: '0.1em' }}>{t('brand.diamond.crema')}</p>
            <BicofinoDiamond color={C.caffe} size={72} />
          </div>
          <div style={{ background: C.aluminium, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.diamond.aluminium')}</p>
            <BicofinoDiamond color={C.black} size={72} />
          </div>
        </div>

        {/* Diamond size study */}
        <div style={{ margin: `48px ${H_PAD} 0` }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' as const }}>{t('brand.diamond.sizes.label')}</p>
          <div style={{ padding: '48px 56px', background: C.white, border: hairline, display: 'flex', alignItems: 'flex-end', gap: 40 }}>
            {[
              { size: 80, note: '80px',  label: t('brand.logo.sizes.display')  },
              { size: 48, note: '48px',  label: t('brand.logo.sizes.padrao')   },
              { size: 32, note: '32px',  label: t('brand.logo.sizes.compacto') },
              { size: 20, note: '20px',  label: t('brand.logo.sizes.minimo')   },
              { size: 16, note: '16px',  label: t('brand.logo.sizes.evitar'), warn: true },
            ].map(({ size, note, label, warn }) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <BicofinoDiamond color={warn ? C.platinum : C.black} size={size} />
                <div>
                  <p style={{ fontFamily: mono, fontSize: 9, color: warn ? C.platinum : C.steel, margin: 0, letterSpacing: '0.08em' }}>{note}</p>
                  <p style={{ fontFamily: mono, fontSize: 9, color: warn ? C.platinum : C.steel, margin: '3px 0 0', letterSpacing: '0.08em' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '10px 0 0', letterSpacing: '0.06em' }}>{t('brand.diamond.minrec')}</p>
        </div>

        <PageFooter line={t('page.footer.line')} />
      </section>

      <section id="voice-tone">
        <SectionHeader eyebrow="// 03.2">{t('voice.title')}</SectionHeader>
        <FocusReveal style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('voice.lead')}</Lead>
        </FocusReveal>

        <StaggerGroup style={{ margin: `40px ${H_PAD} 64px` }}>
          {[
            { label: t('voice.direct.label'),    desc: t('voice.direct.desc') },
            { label: t('voice.confident.label'), desc: t('voice.confident.desc') },
            { label: t('voice.editorial.label'), desc: t('voice.editorial.desc') },
            { label: t('voice.nocliches.label'), desc: t('voice.nocliches.desc') },
            { label: t('voice.bilingual.label'), desc: t('voice.bilingual.desc') },
          ].map(({ label, desc }) => (
            <div key={label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', padding: '20px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.black, letterSpacing: '-0.01em' }}>{label}</span>
              <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </StaggerGroup>
      </section>

    </>
  )
}

export default function Page() {
  return <Brand />
}
