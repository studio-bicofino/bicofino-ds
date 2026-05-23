'use client'

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
   SECTION 7 — Components
   ═══════════════════════════════════════════════════════════════════════════ */
function Components() {
  const { t } = useLang()

  return (
    <>
      <section id="buttons">
        <SectionHeader eyebrow="// 04 • COMPONENTES">{t('buttons.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('buttons.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD} 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
          <div style={{ background: C.white, padding: '32px 36px' }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 24px', letterSpacing: '0.08em' }}>{t('buttons.primary.label')}</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' as const }}>
              <button style={{ background: C.black, color: C.bg, border: 'none', padding: '10px 20px', fontSize: 13, fontFamily: sans, fontWeight: 600, cursor: 'pointer', letterSpacing: '-0.01em', borderRadius: 2 }}>
                {t('btn.start')}
              </button>
              <button style={{ background: 'transparent', color: C.black, border: `1px solid ${C.black}`, padding: '10px 20px', fontSize: 13, fontFamily: sans, fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.01em', borderRadius: 2 }}>
                {t('btn.playbook')}
              </button>
              <button style={{ background: 'transparent', color: C.black, border: 'none', padding: '10px 0', fontSize: 13, fontFamily: sans, fontWeight: 400, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                {t('btn.brand')}
              </button>
            </div>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                [t('btn.class.primary'), t('btn.class.primary.desc')],
                [t('btn.class.ghost'),   t('btn.class.ghost.desc')],
                [t('btn.class.link'),    t('btn.class.link.desc')],
              ].map(([cls, desc]) => (
                <p key={cls} style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0 }}>
                  <span style={{ color: C.black, marginRight: 12 }}>{cls}</span>{desc}
                </p>
              ))}
            </div>
          </div>

          <div style={{ background: C.powerBlack, padding: '32px 36px' }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 24px', letterSpacing: '0.08em' }}>{t('buttons.inverse.label')}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
              <button style={{ background: 'transparent', color: PALETTE.bg, border: `1px solid rgba(242,248,255,0.3)`, padding: '10px 20px', fontSize: 13, fontFamily: sans, fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.01em', borderRadius: 2 }}>
                {t('btn.manifesto')}
              </button>
              <button style={{ background: 'transparent', color: PALETTE.bg, border: `1px solid rgba(242,248,255,0.3)`, padding: '10px 20px', fontSize: 13, fontFamily: sans, fontWeight: 500, cursor: 'pointer', letterSpacing: '-0.01em', borderRadius: 2 }}>
                {t('btn.case')}
              </button>
            </div>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: '28px 0 0' }}>
              <span style={{ color: C.platinum, marginRight: 12 }}>{t('btn.inverse.class')}</span>{t('btn.inverse.desc')}
            </p>
          </div>
        </div>
        <PageFooter line={t('page.footer.line')} />
      </section>

      <section id="badges">
        <SectionHeader eyebrow="// 04.2">{t('badges.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('badges.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD} 64px`, display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
          {[
            { label: 'On Pitch',  bg: C.black,    color: C.bg },
            { label: 'Off Pitch', bg: C.aluminium,color: PALETTE.black },
            { label: 'ADS',       bg: C.spfc,     color: C.bg },
            { label: 'LAB',       bg: C.cacao,    color: PALETTE.bg },
            { label: 'Draft',     bg: C.aluminium,color: PALETTE.steel },
            { label: 'Live',      bg: C.sep,      color: C.powerBlack },
          ].map(({ label, bg, color }) => (
            <span key={label} style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 2, fontFamily: sans, letterSpacing: '0.04em' }}>
              {label}
            </span>
          ))}
        </div>
      </section>

      <section id="forms">
        <SectionHeader eyebrow="// 04.3">{t('forms.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('forms.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD} 64px`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              [t('form.name'),    'Woney Malian'],
              [t('form.email'),   'woney@bicofino.com'],
              [t('form.message'), ''],
            ].map(([label, placeholder]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.black, fontFamily: sans, letterSpacing: '-0.01em' }}>{label}</label>
                {label === t('form.message') ? (
                  <textarea
                    placeholder={t('form.message.placeholder')}
                    readOnly
                    rows={3}
                    style={{ border: `1px solid var(--bf-border-strong)`, borderRadius: 2, padding: '10px 12px', fontSize: 13, fontFamily: sans, color: C.black, background: C.white, resize: 'none', outline: 'none' }}
                  />
                ) : (
                  <input
                    type="text"
                    readOnly
                    defaultValue={placeholder}
                    style={{ border: `1px solid var(--bf-border-strong)`, borderRadius: 2, padding: '10px 12px', fontSize: 13, fontFamily: sans, color: C.black, background: C.white, outline: 'none' }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.black, fontFamily: sans }}>{t('form.website')}</label>
              <input type="text" readOnly defaultValue="bicofino@" style={{ border: `1px solid ${C.spfc}`, borderRadius: 2, padding: '10px 12px', fontSize: 13, fontFamily: sans, color: C.black, background: C.white, outline: 'none' }} />
              <p style={{ fontSize: 12, color: C.spfc, margin: 0, fontFamily: sans }}>{t('form.website.error')}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.steel, fontFamily: sans }}>{t('form.access')}</label>
              <input type="text" readOnly defaultValue="••••••••" disabled style={{ border: `1px solid var(--bf-border)`, borderRadius: 2, padding: '10px 12px', fontSize: 13, fontFamily: sans, color: C.steel, background: 'var(--bf-surface-subtle)', outline: 'none', cursor: 'not-allowed' }} />
              <p style={{ fontSize: 12, color: C.steel, margin: 0, fontFamily: sans }}>{t('form.access.helper')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cards">
        <SectionHeader eyebrow="// 04.4">{t('cards.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('cards.lead')}</Lead>
        </div>

        <div className="bf-stagger-parent" style={{ margin: `40px ${H_PAD} 64px`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
          {[
            { program: 'On Pitch',  color: C.black, tag: t('card.onfield.tag'),  title: t('card.onfield.title'),  meta: t('card.onfield.meta') },
            { program: 'Off Pitch', color: C.steel, tag: t('card.offfield.tag'), title: t('card.offfield.title'), meta: t('card.offfield.meta') },
            { program: 'ADS',       color: C.spfc,  tag: t('card.ads.tag'),      title: t('card.ads.title'),      meta: t('card.ads.meta') },
          ].map(({ program, color, tag, title, meta }) => (
            <div key={program} className="bf-stagger-item" style={{ background: C.white, padding: '28px 28px 32px', borderTop: `3px solid ${color}` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.steel, fontFamily: sans, letterSpacing: '0.04em' }}>{tag}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '12px 0 8px', fontFamily: sans, lineHeight: 1.2 }}>{title}</h3>
              <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>{meta}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default function Page() {
  return <Components />
}
