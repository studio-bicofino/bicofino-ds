'use client'

import React from 'react'
import { BicofinoLogo } from '@/components/BicofinoLogo'
import { BicofinoDiamond } from '@/components/BicofinoDiamond'
import { useLang } from '@/content/index'

/* ─── Shared tokens ─── */
const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  surface:    'var(--bf-surface)',
  steel:      'var(--bf-text-secondary)',
  platinum:   'var(--bf-text-subtle)',
  powerBlack: '#061015',
  aluminium:  '#e2eaf2',
  crema:      '#f3ebd4',
  caffe:      '#33111a',
  cacao:      '#5e4c41',
  champagne:  '#d8d7d3',
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
const H_PAD = 'clamp(16px, 6vw, 72px)'

/* ─── Atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' as const }}>
      {children}
    </p>
  )
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance section-title" style={{ fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
        {title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 580, fontFamily: sans }}>
        {lead}
      </p>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h3 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h3>
    </div>
  )
}

function PageFooter() {
  return (
    <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        // BICOFINO DESIGN SYSTEM · 2026
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   02.1 — Colors
   ═══════════════════════════════════════════════════════════ */
function Colors() {
  const { t } = useLang()

  const basics = [
    { role: t('color.black.role'),     name: 'bf Black',        hex: PALETTE.black,    dark: true,  desc: t('color.black.desc') },
    { role: t('color.steel.role'),     name: 'bf Steel',        hex: PALETTE.steel,    dark: true,  desc: t('color.steel.desc') },
    { role: t('color.aluminium.role'), name: 'bf Aluminium',    hex: C.aluminium,      dark: false, desc: t('color.aluminium.desc') },
    { role: t('color.platinum.role'),  name: 'bf Platinum',     hex: PALETTE.platinum, dark: false, desc: t('color.platinum.desc') },
    { role: t('color.bg.role'),        name: 'Blue Background', hex: PALETTE.bg,       dark: false, desc: t('color.bg.desc') },
  ]

  const specials = [
    { role: t('color.crema.role'),     name: 'crema',     hex: C.crema,     dark: false },
    { role: t('color.caffe.role'),     name: 'caffè',     hex: C.caffe,     dark: true  },
    { role: t('color.champagne.role'), name: 'champagne', hex: C.champagne, dark: false },
    { role: t('color.cacao.role'),     name: 'cacao',     hex: C.cacao,     dark: true  },
  ]

  const highlights = [
    { name: 'torino',     hex: C.torino,     dark: true  },
    { name: 'bf SPFC',    hex: C.spfc,       dark: true  },
    { name: 'bf SEP',     hex: C.sep,        dark: false },
    { name: 'benfica',    hex: C.benfica,    dark: true  },
    { name: 'usa',        hex: C.usa,        dark: true  },
    { name: 'niederland', hex: C.niederland, dark: true  },
    { name: 'australia',  hex: C.australia,  dark: false },
    { name: 'miami',      hex: C.miami,      dark: false },
    { name: 'napoli',     hex: C.napoli,     dark: false },
    { name: 'como',       hex: C.como,       dark: true  },
    { name: 'venezia',    hex: C.venezia,    dark: false },
    { name: 'fiorentina', hex: C.fiorentina, dark: true  },
  ]

  const tokens = [
    { token: '--bf-black',       hex: PALETTE.black,    name: 'bf Black',        role: t('token.black.role') },
    { token: '--bf-power-black', hex: C.powerBlack,     name: 'bf Power Black',  role: t('token.powerblack.role') },
    { token: '--bf-bg',          hex: PALETTE.bg,       name: 'Blue Background', role: t('token.bg.role') },
    { token: '--bf-white',       hex: PALETTE.white,    name: 'white',           role: t('token.white.role') },
    { token: '--bf-steel',       hex: PALETTE.steel,    name: 'bf Steel',        role: t('token.steel.role') },
    { token: '--bf-aluminium',   hex: C.aluminium,      name: 'bf Aluminium',    role: t('token.aluminium.role') },
    { token: '--bf-platinum',    hex: PALETTE.platinum, name: 'bf Platinum',     role: t('token.platinum.role') },
    { token: '--bf-crema',       hex: C.crema,          name: 'crema',           role: t('token.crema.role') },
    { token: '--bf-caffe',       hex: C.caffe,          name: 'caffè',           role: t('token.caffe.role') },
    { token: '--bf-cacao',       hex: C.cacao,          name: 'cacao',           role: t('token.cacao.role') },
    { token: '--bf-torino',      hex: C.torino,         name: 'torino',          role: t('token.torino.role') },
    { token: '--bf-como',        hex: C.como,           name: 'como',            role: t('token.como.role') },
    { token: '--bf-spfc',        hex: C.spfc,           name: 'bf SPFC',         role: t('token.spfc.role') },
  ]

  const swatchCard = (r: { role: string; name: string; hex: string; dark: boolean; desc?: string }, idx: number) => (
    <div key={idx} style={{ background: r.hex, padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200 }}>
      <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: r.dark ? 'rgba(242,248,255,0.4)' : 'rgba(42,44,43,0.4)', margin: 0, lineHeight: 1.5 }}>
        {r.role}
      </p>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: r.dark ? PALETTE.bg : PALETTE.black, margin: '0 0 5px', letterSpacing: '-0.01em' }}>{r.name}</p>
        <p style={{ fontFamily: mono, fontSize: 11, color: r.dark ? 'rgba(242,248,255,0.6)' : PALETTE.steel, margin: '0 0 6px' }}>{r.hex}</p>
        {r.desc && <p style={{ fontSize: 11, color: r.dark ? 'rgba(242,248,255,0.4)' : 'rgba(42,44,43,0.4)', margin: 0, lineHeight: 1.5 }}>{r.desc}</p>}
      </div>
    </div>
  )

  return (
    <section id="colors">
      <SectionTitle
        eyebrow={t('colors.eyebrow')}
        title={t('colors.heading')}
        lead={t('colors.intro')}
      />

      {/* Palette base */}
      <SubHeader label="// 02.2.1" title={t('colors.basics.title')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', margin: `0 ${H_PAD}`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {basics.map(swatchCard)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', margin: `1px ${H_PAD} 0`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {[
          { role: t('color.white.role'),      name: 'white',          hex: PALETTE.white, dark: false, desc: t('color.white.desc') },
          { role: t('color.powerblack.role'), name: 'bf Power Black', hex: C.powerBlack,  dark: true,  desc: t('color.powerblack.desc') },
        ].map(swatchCard)}
      </div>

      {/* Cores especiais */}
      <SubHeader label="// 02.2.2" title={t('colors.specials.title')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', margin: `0 ${H_PAD}`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {specials.map((r, i) => (
          <div key={i} style={{ background: r.hex, padding: '24px 20px', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: r.dark ? 'rgba(242,248,255,0.4)' : 'rgba(42,44,43,0.4)', margin: 0 }}>{r.role}</p>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: r.dark ? PALETTE.bg : PALETTE.black, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{r.name}</p>
              <p style={{ fontFamily: mono, fontSize: 11, color: r.dark ? 'rgba(242,248,255,0.55)' : PALETTE.steel, margin: 0 }}>{r.hex}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Destaques */}
      <SubHeader label={t('colors.highlights.label')} title={t('colors.highlights.title')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', margin: `0 ${H_PAD}`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {highlights.map(({ name, hex, dark }) => (
          <div key={name} style={{ background: hex, padding: '20px 16px', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: dark ? PALETTE.bg : PALETTE.black, margin: '0 0 3px', letterSpacing: '-0.01em' }}>{name}</p>
            <p style={{ fontFamily: mono, fontSize: 9, color: dark ? 'rgba(242,248,255,0.55)' : 'rgba(42,44,43,0.5)', margin: 0 }}>{hex}</p>
          </div>
        ))}
      </div>

      {/* Token table */}
      <SubHeader label="// 02.2.4" title={t('colors.tokens.title')} />
      <div style={{ margin: `0 ${H_PAD}`, overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 160px 200px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)', minWidth: 640 }}>
          {[t('table.col.token'), t('table.col.value'), t('table.col.name'), t('table.col.role')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {tokens.map(({ token, hex, name, role }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 160px 200px 1fr', padding: '13px 0', borderBottom: hairline, alignItems: 'center', minWidth: 640 }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{token}</code>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, background: hex, borderRadius: 2, border: '1px solid var(--bf-border-strong)', flexShrink: 0 }} />
              <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{hex}</span>
            </div>
            <span style={{ fontSize: 13, color: C.black }}>{name}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{role}</span>
          </div>
        ))}
      </div>
      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   02.2 — Typography
   ═══════════════════════════════════════════════════════════ */
function Typography() {
  const { t } = useLang()

  const scale = [
    { label: 'display-xl', size: 96, lh: '1.02', ls: '-0.03em',  fw: 700 },
    { label: 'display-l',  size: 72, lh: '1.04', ls: '-0.025em', fw: 700 },
    { label: 'h1',         size: 44, lh: '1.1',  ls: '-0.02em',  fw: 700 },
    { label: 'h2',         size: 32, lh: '1.15', ls: '-0.015em', fw: 700 },
    { label: 'h3',         size: 24, lh: '1.25', ls: '-0.01em',  fw: 600 },
    { label: 'body-l',     size: 18, lh: '1.55', ls: '0',        fw: 400 },
    { label: 'body',       size: 16, lh: '1.55', ls: '0',        fw: 400 },
    { label: 'caption',    size: 12, lh: '1.45', ls: '0',        fw: 400 },
  ]

  const fontCard = (specimen: React.ReactNode, meta: [string, string][]) => (
    <div className="font-card-grid" style={{ margin: `0 ${H_PAD} 1px`, border: hairline, background: C.surface, display: 'grid', gridTemplateColumns: '1fr 280px' }}>
      <div style={{ padding: '48px 56px' }}>
        <div style={{ marginTop: 8 }}>{specimen}</div>
      </div>
      <div style={{ padding: '32px 36px', borderLeft: hairline, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {meta.map(([label, value]) => (
          <div key={label}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, margin: '0 0 3px', textTransform: 'uppercase' as const }}>{label}</p>
            <p style={{ fontSize: 13, color: C.black, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="typography">
      <SectionTitle
        eyebrow={t('typography.eyebrow')}
        title={t('typography.heading')}
        lead={t('typography.intro')}
      />

      <SubHeader label="// 02.3.1 · fonte principal" title="Inter" />
      {fontCard(
        <div>
          <p style={{ fontSize: 13, color: C.steel, margin: '0 0 24px', fontFamily: sans }}>{t('font.inter.subtitle')}</p>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, lineHeight: 1, fontFamily: sans }}>Bicofino</div>
        </div>,
        [
          [t('font.meta.family'),   t('font.inter.family')],
          [t('font.meta.weights'),  t('font.inter.weights')],
          [t('font.meta.coverage'), t('font.inter.coverage')],
          [t('font.meta.usage'),    t('font.inter.usage')],
          [t('font.meta.license'),  t('font.inter.license')],
        ]
      )}

      <SubHeader label="// 02.3.2 · monospaced" title="JetBrains Mono" />
      {fontCard(
        <div>
          <p style={{ fontSize: 13, color: C.steel, margin: '0 0 24px', fontFamily: sans }}>{t('font.mono.subtitle')}</p>
          <div style={{ fontSize: 36, fontWeight: 400, letterSpacing: '0.02em', color: C.black, lineHeight: 1, fontFamily: mono }}>// bicofino.com</div>
        </div>,
        [
          [t('font.meta.family'),   t('font.mono.family')],
          [t('font.meta.weights'),  t('font.mono.weights')],
          [t('font.meta.coverage'), t('font.mono.coverage')],
          [t('font.meta.usage'),    t('font.mono.usage')],
          [t('font.meta.license'),  t('font.mono.license')],
        ]
      )}

      <SubHeader label="// 02.3.3" title="Type Scale" />
      <div style={{ margin: `0 ${H_PAD}`, overflowX: 'auto' }}>
        {scale.map(({ label, size, lh, ls, fw }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 240px', alignItems: 'center', padding: '12px 0', borderBottom: hairline, gap: 24, minWidth: 540 }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: C.steel }}>{label}</span>
            <span style={{ fontSize: size, fontWeight: fw, lineHeight: lh, letterSpacing: ls, color: C.black, fontFamily: sans, display: 'block' }}>Aa</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.steel, whiteSpace: 'nowrap' as const }}>{size}/{lh} · {ls === '0' ? '0' : ls} · {fw}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 240px', alignItems: 'center', padding: '16px 0', borderBottom: hairline, gap: 24, minWidth: 540 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: C.steel }}>eyebrow</span>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: C.steel }}>{t('typescale.eyebrow.specimen')}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{t('typescale.eyebrow.meta')}</span>
        </div>
      </div>
      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   02.3 — Spacing & Motion
   ═══════════════════════════════════════════════════════════ */
function SpacingMotion() {
  const { t } = useLang()

  const spacing = [
    { token: '--sp-1', px: 4,  rem: '0.25', uso: t('sp1.uso') },
    { token: '--sp-2', px: 8,  rem: '0.5',  uso: t('sp2.uso') },
    { token: '--sp-3', px: 12, rem: '0.75', uso: t('sp3.uso') },
    { token: '--sp-4', px: 16, rem: '1',    uso: t('sp4.uso') },
    { token: '--sp-5', px: 24, rem: '1.5',  uso: t('sp5.uso') },
    { token: '--sp-6', px: 32, rem: '2',    uso: t('sp6.uso') },
    { token: '--sp-7', px: 48, rem: '3',    uso: t('sp7.uso') },
    { token: '--sp-8', px: 64, rem: '4',    uso: t('sp8.uso') },
    { token: '--sp-9', px: 96, rem: '6',    uso: t('sp9.uso') },
  ]

  return (
    <section id="spacing-motion">
      <SectionTitle
        eyebrow={t('spacing-motion.eyebrow')}
        title={t('spacing-motion.heading')}
        lead={t('spacing-motion.intro')}
      />

      <SubHeader label="// 02.5.1" title={t('spacing.section.title')} />
      <div style={{ margin: `0 ${H_PAD}`, overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 60px 80px 1fr 200px', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)', minWidth: 540 }}>
          {[t('spacing.col.token'), t('spacing.col.px'), t('spacing.col.rem'), t('spacing.col.usage'), t('spacing.col.visual')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {spacing.map(({ token, px, rem, uso }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '120px 60px 80px 1fr 200px', padding: '12px 0', borderBottom: hairline, alignItems: 'center', minWidth: 540 }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{token}</code>
            <span style={{ fontSize: 13, color: C.black }}>{px}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{rem}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{uso}</span>
            <div style={{ width: Math.min(px, 160), height: 6, background: C.black, borderRadius: 1 }} />
          </div>
        ))}
      </div>

      <SubHeader label="// 02.5.2" title={t('motion.section.title')} />
      <div style={{ margin: `0 ${H_PAD}` }}>
        {[
          { token: 'dur-fast', ms: 120 },
          { token: 'dur-base', ms: 200 },
          { token: 'dur-slow', ms: 360 },
        ].map(({ token, ms }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', alignItems: 'center', borderBottom: hairline, padding: '24px 0', gap: 32 }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>{token}</span>
            <div style={{ height: 6, background: C.surface, borderRadius: 3, overflow: 'hidden', position: 'relative' as const }}>
              <div style={{ position: 'absolute' as const, left: 0, top: 0, height: '100%', width: `${(ms / 360) * 100}%`, background: C.black, borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: mono, fontSize: 11, color: C.steel, textAlign: 'right' as const }}>{ms}ms</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', alignItems: 'center', borderBottom: hairline, padding: '20px 0', gap: 32 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>ease-standard</span>
          <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>cubic-bezier(0.2, 0, 0, 1)</code>
          <span />
        </div>
      </div>

      <SubHeader label="// 02.5.3" title={t('radius.section.title')} />
      <div style={{ padding: `0 ${H_PAD} 64px`, display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' as const }}>
        {[
          { label: '--radius',            value: '2px', r: 2  },
          { label: t('radius.label.sm'),  value: '4px', r: 4  },
          { label: t('radius.label.md'),  value: '8px', r: 8  },
          { label: t('radius.label.lg'),  value: '16px', r: 16 },
        ].map(({ label, value, r }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 80, height: 80, background: C.black, borderRadius: r }} />
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, textAlign: 'center' as const }}>{label}</p>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   02.4 — Logo System
   ═══════════════════════════════════════════════════════════ */
function LogoSystem() {
  const { t } = useLang()

  return (
    <section id="logo">
      <SectionTitle
        eyebrow={t('logo.eyebrow')}
        title={t('logo.heading')}
        lead={t('logo.intro')}
      />

      {/* Logo em fundos */}
      <div className="grid-2-col-responsive" style={{ margin: `40px ${H_PAD} 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        <div style={{ background: PALETTE.bg, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.logo.light')}</p>
          <BicofinoLogo color={PALETTE.black} width={200} />
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
          <BicofinoLogo color={PALETTE.black} width={160} />
        </div>
      </div>

      {/* Estudo de tamanhos */}
      <div style={{ margin: `48px ${H_PAD} 0` }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' as const }}>{t('brand.logo.sizes.label')}</p>
        <div style={{ padding: '48px 56px', background: PALETTE.white, border: hairline, display: 'flex', alignItems: 'flex-end', gap: 48, flexWrap: 'wrap' as const }}>
          {[
            { width: 200, note: '200px', label: t('brand.logo.sizes.display')  },
            { width: 120, note: '120px', label: t('brand.logo.sizes.padrao')   },
            { width: 80,  note: '80px',  label: t('brand.logo.sizes.compacto') },
            { width: 48,  note: '48px',  label: t('brand.logo.sizes.minimo')   },
            { width: 32,  note: '32px',  label: t('brand.logo.sizes.evitar'),  warn: true },
          ].map(({ width, note, label, warn }) => (
            <div key={width} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <BicofinoLogo color={warn ? PALETTE.platinum : PALETTE.black} width={width} />
              <div>
                <p style={{ fontFamily: mono, fontSize: 9, color: warn ? PALETTE.platinum : C.steel, margin: 0, letterSpacing: '0.08em' }}>{note}</p>
                <p style={{ fontFamily: mono, fontSize: 9, color: warn ? PALETTE.platinum : C.steel, margin: '3px 0 0', letterSpacing: '0.08em' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '10px 0 0', letterSpacing: '0.06em' }}>{t('brand.logo.minrec')}</p>
      </div>

      {/* Regras */}
      <div style={{ margin: `48px ${H_PAD} 0` }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 8px', textTransform: 'uppercase' as const }}>{t('brand.logo.rules.label')}</p>
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

      {/* Diamante */}
      <div style={{ padding: `56px ${H_PAD} 0` }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>{t('brand.diamond.label')}</p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 8px', maxWidth: 580, fontFamily: sans }}>{t('brand.diamond.lead')}</p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 580, fontFamily: sans }}>{t('brand.diamond.lead2')}</p>
      </div>

      <div className="grid-2-col-responsive" style={{ margin: `32px ${H_PAD} 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        <div style={{ background: PALETTE.bg, padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.1em' }}>{t('brand.diamond.light')}</p>
          <BicofinoDiamond color={PALETTE.black} size={72} />
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
          <BicofinoDiamond color={PALETTE.black} size={72} />
        </div>
      </div>

      {/* Diamond size study */}
      <div style={{ margin: `48px ${H_PAD} 0` }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' as const }}>{t('brand.diamond.sizes.label')}</p>
        <div style={{ padding: '48px 56px', background: PALETTE.white, border: hairline, display: 'flex', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' as const }}>
          {[
            { size: 80, note: '80px',  label: t('brand.logo.sizes.display')  },
            { size: 48, note: '48px',  label: t('brand.logo.sizes.padrao')   },
            { size: 32, note: '32px',  label: t('brand.logo.sizes.compacto') },
            { size: 20, note: '20px',  label: t('brand.logo.sizes.minimo')   },
            { size: 16, note: '16px',  label: t('brand.logo.sizes.evitar'),  warn: true },
          ].map(({ size, note, label, warn }) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <BicofinoDiamond color={warn ? PALETTE.platinum : PALETTE.black} size={size} />
              <div>
                <p style={{ fontFamily: mono, fontSize: 9, color: warn ? PALETTE.platinum : C.steel, margin: 0, letterSpacing: '0.08em' }}>{note}</p>
                <p style={{ fontFamily: mono, fontSize: 9, color: warn ? PALETTE.platinum : C.steel, margin: '3px 0 0', letterSpacing: '0.08em' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '10px 0 0', letterSpacing: '0.06em' }}>{t('brand.diamond.minrec')}</p>
      </div>

      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   02.5 — Voice & Tone
   ═══════════════════════════════════════════════════════════ */
function VoiceTone() {
  const { t } = useLang()

  const traits = [
    { label: t('voice.direct.label'),    desc: t('voice.direct.desc') },
    { label: t('voice.confident.label'), desc: t('voice.confident.desc') },
    { label: t('voice.editorial.label'), desc: t('voice.editorial.desc') },
    { label: t('voice.nocliches.label'), desc: t('voice.nocliches.desc') },
    { label: t('voice.bilingual.label'), desc: t('voice.bilingual.desc') },
  ]

  return (
    <section id="voice-tone">
      <SectionTitle
        eyebrow={t('voice-tone.eyebrow')}
        title={t('voice-tone.heading')}
        lead={t('voice-tone.intro')}
      />

      <div style={{ margin: `40px ${H_PAD} 64px` }}>
        {traits.map(({ label, desc }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 160px) 1fr', padding: '20px 0', borderBottom: hairline, gap: 32, alignItems: 'start' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.black, letterSpacing: '-0.01em', fontFamily: sans }}>{label}</span>
            <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.6, fontFamily: sans }}>{desc}</span>
          </div>
        ))}
      </div>
      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */
export default function VisualSystem() {
  return (
    <>
      <Colors />
      <Typography />
      <SpacingMotion />
      <LogoSystem />
      <VoiceTone />
    </>
  )
}
