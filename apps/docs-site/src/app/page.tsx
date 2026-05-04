'use client'

import { BicofinoLogo } from '@/components/BicofinoLogo'
import { BicofinoDiamond } from '@/components/BicofinoDiamond'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { MetricCard } from '@/components/MetricCard'
import { PerformanceChart } from '@/components/PerformanceChart'
import { IconGrid } from '@/components/IconGrid'
import { OnFieldSection } from '@/components/OnFieldSection'
import { OperationsSection } from '@/components/OperationsSection'
import BrandSystem from '@/components/BrandSystem'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useLang } from '@/content'
import { Clock, TrendingUp, ArrowDownRight, Zap, Cpu, Activity } from 'lucide-react'
import React from 'react'

/* ─── Design tokens ─── */
/* Semantic tokens — switch with theme via CSS custom properties */
const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  white:      'var(--bf-surface)',
  steel:      'var(--bf-text-secondary)',
  platinum:   'var(--bf-text-subtle)',
  /* These palette colors are never theme-switched */
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

/* Palette raw values — for display inside color swatches and token tables */
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
const H_PAD = 72

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
    <p lang="pt-BR" className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 0', maxWidth: 580 }}>
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `80px ${H_PAD}px 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `56px ${H_PAD}px 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h2>
    </div>
  )
}

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: `32px ${H_PAD}px 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

/* ─── Header bar ─── */
function TopBarLangToggle() {
  const { lang, setLang } = useLang()
  const options: { code: 'en' | 'br'; label: string; activeColor: string }[] = [
    { code: 'en', label: 'EN', activeColor: C.como },
    { code: 'br', label: 'BR', activeColor: C.sep },
  ]
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'var(--bf-pill-bg)',
      borderRadius: 4,
      padding: 2,
      gap: 1,
    }}>
      {options.map(({ code, label, activeColor }) => {
        const isActive = lang === code
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isActive ? '#ffffff' : C.steel,
              background: isActive ? activeColor : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '5px 9px',
              borderRadius: 3,
              fontWeight: isActive ? 600 : 400,
              transition: 'background 200ms cubic-bezier(0.2,0,0,1), color 200ms cubic-bezier(0.2,0,0,1)',
              lineHeight: 1,
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function TopBar() {
  const { t } = useLang()
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: C.bg,
      borderBottom: hairline,
      padding: `24px ${H_PAD}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      rowGap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 12px)', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: sans, fontSize: 13, color: C.black, fontWeight: 400 }}>{t('topbar.title')}</span>
        <span style={{ color: C.aluminium, fontSize: 13 }}>·</span>
        <span style={{ fontFamily: sans, fontSize: 13, color: C.black, fontWeight: 600 }}>{t('topbar.subtitle')}</span>
        <span style={{ color: C.aluminium, fontSize: 13 }}>·</span>
        <span style={{ fontFamily: sans, fontSize: 12, color: C.steel, fontWeight: 400 }}>{t('topbar.version')}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, whiteSpace: 'nowrap' }}>
        <ThemeToggle />
        <TopBarLangToggle />
        <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.08em', display: 'flex', alignItems: 'center' }}>
          {t('topbar.date')}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — Overview
   ═══════════════════════════════════════════════════════════════════════════ */
function Overview() {
  const { t } = useLang()

  const meta = [
    { label: t('overview.meta.version'),   value: '2.0 · ongoing' },
    { label: t('overview.meta.published'), value: 'abril · 2026' },
    { label: t('overview.meta.owner'),     value: 'Woney Malian / Fabio Brancatelli' },
    { label: t('overview.meta.base'),      value: 'MIV v2.0 · Playbook Visual abril/2026' },
    { label: t('overview.meta.verticals'), value: 'On Field · Off Field' },
  ]

  return (
    <section id="overview">
      <div style={{ padding: `80px ${H_PAD}px 72px`, borderBottom: hairline }}>
        <Eyebrow>{t('meta.eyebrow')}</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 72, alignItems: 'end', marginTop: 24 }}>
          <div>
            <div className="bf-load-stagger" style={{ fontSize: 'clamp(56px, 7vw, 104px)', lineHeight: 0.92, fontWeight: 700, fontFamily: sans, marginBottom: 40 }}>
              {(['Connect.', 'Curate.', 'Create.', 'Consult.'] as const).map((word, i) => (
                <div key={word} className="bf-stagger-item" style={{ color: C.black, animationDelay: `${i * 70}ms` }}>
                  {word}
                </div>
              ))}
            </div>
            <Lead>{t('overview.lead')}</Lead>
          </div>

          <StaggerGroup style={{ borderTop: `1px solid ${C.black}`, paddingTop: 24 }}>
            {meta.map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, margin: '0 0 3px', textTransform: 'uppercase' }}>{label}</p>
                <p style={{ fontSize: 13, color: C.black, margin: 0, lineHeight: 1.4 }}>{value}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </div>

      {/* Foundations intro card */}
      <FocusReveal style={{ padding: `64px ${H_PAD}px`, borderBottom: hairline }}>
        <Eyebrow>{t('foundations.eyebrow')}</Eyebrow>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 16px', fontFamily: sans }}>
          {t('foundations.title')}
        </h2>
        <Lead>{t('foundations.lead')}</Lead>
      </FocusReveal>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — Colors
   ═══════════════════════════════════════════════════════════════════════════ */
function Colors() {
  const { t } = useLang()

  const basics = [
    { role: t('color.black.role'),      name: 'bf Black',        hex: PALETTE.black,    dark: true,  desc: t('color.black.desc') },
    { role: t('color.steel.role'),      name: 'bf Steel',        hex: PALETTE.steel,    dark: true,  desc: t('color.steel.desc') },
    { role: t('color.aluminium.role'),  name: 'bf Aluminium',    hex: C.aluminium,      dark: false, desc: t('color.aluminium.desc') },
    { role: t('color.platinum.role'),   name: 'bf Platinum',     hex: PALETTE.platinum, dark: false, desc: t('color.platinum.desc') },
    { role: t('color.bg.role'),         name: 'Blue Background', hex: PALETTE.bg,       dark: false, desc: t('color.bg.desc') },
  ]

  const specials = [
    { role: t('color.crema.role'),      name: 'crema',     hex: C.crema,    dark: false },
    { role: t('color.caffe.role'),      name: 'caffè',     hex: C.caffe,    dark: true  },
    { role: t('color.champagne.role'),  name: 'champagne', hex: C.champagne,dark: false },
    { role: t('color.cacao.role'),      name: 'cacao',     hex: C.cacao,    dark: true  },
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
    { token: '--bf-crema',       hex: C.crema,      name: 'crema',           role: t('token.crema.role') },
    { token: '--bf-caffe',       hex: C.caffe,      name: 'caffè',           role: t('token.caffe.role') },
    { token: '--bf-cacao',       hex: C.cacao,      name: 'cacao',           role: t('token.cacao.role') },
    { token: '--bf-torino',      hex: C.torino,     name: 'torino',          role: t('token.torino.role') },
    { token: '--bf-como',        hex: C.como,       name: 'como',            role: t('token.como.role') },
    { token: '--bf-spfc',        hex: C.spfc,       name: 'bf SPFC',         role: t('token.spfc.role') },
  ]

  const swatchCard = (r: { role: string; name: string; hex: string; dark: boolean; desc?: string }) => (
    <div key={r.hex + r.name} style={{ background: r.hex, padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200 }}>
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
      <SectionHeader eyebrow="// 01.1">{t('colors.title')}</SectionHeader>

      <FocusReveal style={{ padding: `56px ${H_PAD}px 0` }}>
        <Lead>{t('colors.lead')}</Lead>
      </FocusReveal>

      {/* Básicas */}
      <SubHeader label="// 01.1.1" title={t('colors.basics.title')} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', margin: `0 ${H_PAD}px`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {basics.map(swatchCard)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: `1px ${H_PAD}px 0`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {[
          { role: t('color.white.role'),      name: 'white',          hex: PALETTE.white, dark: false, desc: t('color.white.desc') },
          { role: t('color.powerblack.role'), name: 'bf Power Black', hex: C.powerBlack, dark: true,  desc: t('color.powerblack.desc') },
        ].map(swatchCard)}
      </div>

      {/* Especiais */}
      <SubHeader label="// 01.1.2" title={t('colors.specials.title')} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', margin: `0 ${H_PAD}px`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {specials.map(r => (
          <div key={r.name} style={{ background: r.hex, padding: '24px 20px', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', margin: `0 ${H_PAD}px`, gap: 1, background: 'rgba(42,44,43,0.1)' }}>
        {highlights.map(({ name, hex, dark }) => (
          <div key={name} style={{ background: hex, padding: '20px 16px', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: dark ? PALETTE.bg : PALETTE.black, margin: '0 0 3px', letterSpacing: '-0.01em' }}>{name}</p>
            <p style={{ fontFamily: mono, fontSize: 9, color: dark ? 'rgba(242,248,255,0.55)' : 'rgba(42,44,43,0.5)', margin: 0 }}>{hex}</p>
          </div>
        ))}
      </div>

      {/* Token table */}
      <SubHeader label="// 01.1.4" title={t('colors.tokens.title')} />
      <div style={{ margin: `0 ${H_PAD}px 0` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 160px 200px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
          {[t('table.col.token'), t('table.col.value'), t('table.col.name'), t('table.col.role')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {tokens.map(({ token, hex, name, role }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '200px 160px 200px 1fr', padding: '13px 0', borderBottom: hairline, alignItems: 'center' }}>
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
      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — Typography
   ═══════════════════════════════════════════════════════════════════════════ */
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

  const fontCard = (title: string, subtitle: string, specimen: React.ReactNode, meta: [string, string][]) => (
    <div style={{ margin: `0 ${H_PAD}px 1px`, border: hairline, display: 'grid', gridTemplateColumns: '1fr 280px', background: C.white }}>
      <div style={{ padding: '48px 56px' }}>
        <p style={{ fontSize: 13, color: C.steel, margin: '0 0 4px', fontFamily: sans }}>{subtitle}</p>
        <div style={{ marginTop: 32 }}>{specimen}</div>
      </div>
      <div style={{ padding: '32px 36px', borderLeft: hairline, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {meta.map(([label, value]) => (
          <div key={label}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, margin: '0 0 3px', textTransform: 'uppercase' }}>{label}</p>
            <p style={{ fontSize: 13, color: C.black, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="typography">
      <SectionHeader eyebrow="// 01.2">{t('typography.title')}</SectionHeader>
      <div style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('typography.lead')}</Lead>
      </div>

      <SubHeader label="// 01.2.1 · fonte principal" title="Inter" />
      {fontCard(
        'Inter',
        t('font.inter.subtitle'),
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, lineHeight: 1, fontFamily: sans }}>Bicofino</div>,
        [
          [t('font.meta.family'),   t('font.inter.family')],
          [t('font.meta.weights'),  t('font.inter.weights')],
          [t('font.meta.coverage'), t('font.inter.coverage')],
          [t('font.meta.usage'),    t('font.inter.usage')],
          [t('font.meta.license'),  t('font.inter.license')],
        ]
      )}

      <SubHeader label="// 01.2.2 · monospaced" title="JetBrains Mono" />
      {fontCard(
        'JetBrains Mono',
        t('font.mono.subtitle'),
        <div style={{ fontSize: 36, fontWeight: 400, letterSpacing: '0.02em', color: C.black, lineHeight: 1, fontFamily: mono }}>// bicofino.com</div>,
        [
          [t('font.meta.family'),   t('font.mono.family')],
          [t('font.meta.weights'),  t('font.mono.weights')],
          [t('font.meta.coverage'), t('font.mono.coverage')],
          [t('font.meta.usage'),    t('font.mono.usage')],
          [t('font.meta.license'),  t('font.mono.license')],
        ]
      )}

      <SubHeader label="// 01.2.3" title="Type Scale" />
      <div style={{ margin: `0 ${H_PAD}px 0` }}>
        {scale.map(({ label, size, lh, ls, fw }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 220px', alignItems: 'center', borderBottom: hairline, padding: '12px 0', gap: 24 }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: C.steel }}>{label}</span>
            <span style={{ fontSize: size, fontWeight: fw, lineHeight: lh, letterSpacing: ls, color: C.black, fontFamily: sans, display: 'block' }}>Aa</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.steel, whiteSpace: 'nowrap' }}>{size}/{lh} · {ls === '0' ? '0' : ls} · {fw}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 220px', alignItems: 'center', borderBottom: hairline, padding: '16px 0', gap: 24 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', color: C.steel }}>eyebrow</span>
          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.steel }}>{t('typescale.eyebrow.specimen')}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{t('typescale.eyebrow.meta')}</span>
        </div>
      </div>
      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — Slash Heading
   ═══════════════════════════════════════════════════════════════════════════ */
function SlashHeading() {
  const { t } = useLang()

  const anatomy = [
    { parte: '.slash-heading__lead',  papel: t('slash.lead.role'),  tipo: 'Inter 700',        cor: '--bf-black' },
    { parte: '.slash-heading__slash', papel: t('slash.slash.role'), tipo: 'Inter 700 · ls 0', cor: '--bf-torino' },
    { parte: '.slash-heading__echo',  papel: t('slash.echo.role'),  tipo: 'Inter 500',        cor: '--bf-steel' },
  ]

  return (
    <section id="slash-heading">
      <SectionHeader eyebrow="// 01.3">{t('slash.title')}</SectionHeader>
      <div style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('slash.lead')}</Lead>
      </div>

      {/* Visual */}
      <div style={{ margin: `40px ${H_PAD}px 0`, border: hairline, background: C.white, padding: '56px 48px' }}>
        <div style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.95, fontWeight: 700, fontFamily: sans }}>
          <span style={{ color: C.black }}>Connect.</span>
          <br />
          <span style={{ color: C.black }}>Curate.</span>
          <br />
          <span style={{ color: C.black }}>Create.</span>
          <br />
          <span style={{ color: C.black }}>Consult.</span>
        </div>
      </div>

      {/* Anatomy */}
      <div style={{ margin: `0 ${H_PAD}px`, marginTop: 48 }}>
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, marginBottom: 8, textTransform: 'uppercase' }}>{t('slash.anatomy.label')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 220px 160px', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.15)' }}>
          {[t('slash.col.part'), t('slash.col.role'), t('slash.col.type'), t('slash.col.color')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {anatomy.map(({ parte, papel, tipo, cor }) => (
          <div key={parte} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 220px 160px', padding: '14px 0', borderBottom: hairline, alignItems: 'center' }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{parte}</code>
            <span style={{ fontSize: 13, color: C.steel }}>{papel}</span>
            <span style={{ fontSize: 13, color: C.black }}>{tipo}</span>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>{cor}</code>
          </div>
        ))}
      </div>
      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — Spacing & Motion
   ═══════════════════════════════════════════════════════════════════════════ */
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
      <SectionHeader eyebrow="// 01.4">{t('spacing.title')}</SectionHeader>
      <div style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('spacing.lead')}</Lead>
      </div>

      <SubHeader label="// 01.4.1" title={t('spacing.section.title')} />
      <div style={{ margin: `0 ${H_PAD}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 60px 80px 1fr 200px', padding: '8px 0', borderBottom: '1px solid rgba(42,44,43,0.16)' }}>
          {[t('spacing.col.token'), t('spacing.col.px'), t('spacing.col.rem'), t('spacing.col.usage'), t('spacing.col.visual')].map(h => (
            <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {spacing.map(({ token, px, rem, uso }) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '120px 60px 80px 1fr 200px', padding: '12px 0', borderBottom: hairline, alignItems: 'center' }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{token}</code>
            <span style={{ fontSize: 13, color: C.black }}>{px}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{rem}</span>
            <span style={{ fontSize: 13, color: C.steel }}>{uso}</span>
            <div style={{ width: px, height: 6, background: C.black, borderRadius: 1, maxWidth: '100%' }} />
          </div>
        ))}
      </div>

      <SubHeader label="// 01.4.2" title={t('motion.section.title')} />
      <div style={{ margin: `0 ${H_PAD}px` }}>
        {[
          { token: 'dur-fast', ms: 120 },
          { token: 'dur-base', ms: 200 },
          { token: 'dur-slow', ms: 360 },
        ].map(({ token, ms }) => {
          const speed = token.replace('dur-', '')
          return (
            <div key={token} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', alignItems: 'center', borderBottom: hairline, padding: '24px 0', gap: 32 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>{token}</span>
              <div style={{ height: 6, background: 'var(--bf-surface)', borderRadius: 3, position: 'relative' as const, overflow: 'hidden' }}>
                <div className={`bf-motion-bar bf-motion-bar--${speed}`} />
              </div>
              <span style={{ fontFamily: mono, fontSize: 11, color: C.steel, textAlign: 'right' as const }}>{ms}ms</span>
            </div>
          )
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', alignItems: 'center', borderBottom: hairline, padding: '20px 0', gap: 32 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.steel }}>ease-standard</span>
          <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>cubic-bezier(0.2, 0, 0, 1)</code>
          <span />
        </div>
      </div>

      <SubHeader label="// 01.4.3" title={t('radius.section.title')} />
      <div style={{ padding: `0 ${H_PAD}px 64px`, display: 'flex', gap: 40, alignItems: 'flex-end' }}>
        {[
          { label: '--radius', value: '2px', r: 2 },
          { label: t('radius.label.sm'), value: '1px', r: 1 },
          { label: t('radius.label.md'), value: '2px', r: 2 },
          { label: t('radius.label.lg'), value: '4px', r: 4 },
        ].map(({ label, value, r }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 80, height: 80, background: C.black, borderRadius: r }} />
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, textAlign: 'center' as const }}>{label}</p>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
      <PageFooter line={t('page.footer.line')} />
    </section>
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
        <SectionHeader eyebrow="// 02 · Brand">{t('brand.logo.title')}</SectionHeader>
        <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('brand.logo.lead')}</Lead>
        </FocusReveal>

        <div style={{ margin: `40px ${H_PAD}px 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
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
        <div style={{ margin: `48px ${H_PAD}px 0` }}>
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
        <div style={{ margin: `0 ${H_PAD}px`, marginTop: 48 }}>
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
        <div style={{ padding: `56px ${H_PAD}px 0` }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' }}>{t('brand.diamond.label')}</p>
          <Lead>{t('brand.diamond.lead')}</Lead>
        </div>

        <div style={{ margin: `32px ${H_PAD}px 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
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
        <div style={{ margin: `48px ${H_PAD}px 0` }}>
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
        <SectionHeader eyebrow="// 02.2">{t('voice.title')}</SectionHeader>
        <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('voice.lead')}</Lead>
        </FocusReveal>

        <StaggerGroup style={{ margin: `40px ${H_PAD}px 64px` }}>
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

      <section id="verticais">
        <SectionHeader eyebrow="// 02.3">{t('verticais.title')}</SectionHeader>
        <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('verticais.lead')}</Lead>
        </FocusReveal>

        <div className="bf-stagger-parent" style={{ margin: `40px ${H_PAD}px 64px`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
          <div className="bf-stagger-item" style={{ background: C.white, padding: '40px 36px', borderTop: `3px solid ${C.black}` }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 20px', letterSpacing: '0.1em' }}>// 02.3.1</p>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 12px', fontFamily: sans }}>On Field</h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel }}>{t('verticais.onfield.desc')}</p>
          </div>
          <div className="bf-stagger-item" style={{ background: C.white, padding: '40px 36px', borderTop: `3px solid ${C.steel}` }}>
            <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 20px', letterSpacing: '0.1em' }}>// 02.3.2</p>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 12px', fontFamily: sans }}>Off Field</h3>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel }}>{t('verticais.offfield.desc')}</p>
          </div>
        </div>
      </section>
    </>
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
        <SectionHeader eyebrow="// 03 · Components">{t('buttons.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('buttons.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD}px 0`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
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
        <SectionHeader eyebrow="// 03.2">{t('badges.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('badges.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD}px 64px`, display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
          {[
            { label: 'On Field',  bg: C.black,    color: C.bg },
            { label: 'Off Field', bg: C.aluminium,color: PALETTE.black },
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
        <SectionHeader eyebrow="// 03.3">{t('forms.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('forms.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD}px 64px`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
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
        <SectionHeader eyebrow="// 03.4">{t('cards.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('cards.lead')}</Lead>
        </div>

        <div className="bf-stagger-parent" style={{ margin: `40px ${H_PAD}px 64px`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(42,44,43,0.1)' }}>
          {[
            { program: 'On Field',  color: C.black, tag: t('card.onfield.tag'),  title: t('card.onfield.title'),  meta: t('card.onfield.meta') },
            { program: 'Off Field', color: C.steel, tag: t('card.offfield.tag'), title: t('card.offfield.title'), meta: t('card.offfield.meta') },
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

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — Governance
   ═══════════════════════════════════════════════════════════════════════════ */
function Governance() {
  const { t } = useLang()

  const owners = [
    { layer: 'Foundations', owner: 'Woney Malian',                   scope: t('governance.foundations.scope') },
    { layer: 'Brand',        owner: 'Woney Malian / Fabio Brancatelli', scope: t('governance.brand.scope') },
    { layer: 'Components',   owner: 'Direção Criativa + Engenharia',  scope: t('governance.components.scope') },
    { layer: 'Governance',   owner: 'Woney Malian',                   scope: t('governance.governance.scope') },
  ]

  const resources = [
    { file: 'tokens.css',              purpose: t('resource.tokens.css') },
    { file: 'tokens.ts',               purpose: t('resource.tokens.ts') },
    { file: 'globals.css',             purpose: t('resource.globals.css') },
    { file: 'DESIGN.md',               purpose: t('resource.design.md') },
    { file: 'CLAUDE.md',               purpose: t('resource.claude.md') },
    { file: 'apps/storybook/',         purpose: t('resource.storybook') },
    { file: 'apps/docs-site/',         purpose: t('resource.docs.site') },
    { file: 'packages/design-system/', purpose: t('resource.design.system') },
  ]

  return (
    <>
      <section id="governance">
        <SectionHeader eyebrow="// 07 · Governance">{t('governance.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD}px 0` }}>
          <Lead>{t('governance.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD}px 0` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
            {[t('governance.col.layer'), t('governance.col.owner'), t('governance.col.scope')].map(h => (
              <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
            ))}
          </div>
          {owners.map(({ layer, owner, scope }) => (
            <div key={layer} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', padding: '18px 0', borderBottom: hairline, alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.black, fontFamily: sans }}>{layer}</span>
              <span style={{ fontSize: 13, color: C.steel }}>{owner}</span>
              <span style={{ fontSize: 13, color: C.steel }}>{scope}</span>
            </div>
          ))}
        </div>
        <PageFooter line={t('page.footer.line')} />
      </section>

      <section id="resources">
        <SectionHeader eyebrow="// 07.2">{t('resources.title')}</SectionHeader>
        <div style={{ margin: `40px ${H_PAD}px 0` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
            {[t('resources.col.file'), t('resources.col.purpose')].map(h => (
              <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
            ))}
          </div>
          {resources.map(({ file, purpose }) => (
            <div key={file} style={{ display: 'grid', gridTemplateColumns: '280px 1fr', padding: '16px 0', borderBottom: hairline, alignItems: 'center', gap: 32 }}>
              <code style={{ fontFamily: mono, fontSize: 12, color: C.black }}>{file}</code>
              <span style={{ fontSize: 13, color: C.steel, lineHeight: 1.5 }}>{purpose}</span>
            </div>
          ))}
        </div>
        <PageFooter line={t('page.footer.line')} />
      </section>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9 — Motion Performance Intelligence
   ═══════════════════════════════════════════════════════════════════════════ */
function MotionPerformance() {
  const { t } = useLang()

  const cards = [
    { value: '48h',  label: t('perf.card1.label'), description: t('perf.card1.desc'), Icon: Clock          },
    { value: '3.2x', label: t('perf.card2.label'), description: t('perf.card2.desc'), Icon: TrendingUp      },
    { value: '-64%', label: t('perf.card3.label'), description: t('perf.card3.desc'), Icon: ArrowDownRight  },
    { value: '127%', label: t('perf.card4.label'), description: t('perf.card4.desc'), Icon: Zap             },
    { value: '12',   label: t('perf.card5.label'), description: t('perf.card5.desc'), Icon: Cpu             },
    { value: '0.8s', label: t('perf.card6.label'), description: t('perf.card6.desc'), Icon: Activity        },
  ]

  return (
    <section id="performance-intelligence">
      <SectionHeader eyebrow={t('perf.eyebrow')}>{t('perf.title')}</SectionHeader>

      <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('perf.lead')}</Lead>
      </FocusReveal>

      <SubHeader label={t('perf.metrics.label')} title={t('perf.metrics.title')} />

      {/* Metric grid — all white, hairline separators, no alternating blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        margin: `0 ${H_PAD}px`,
        background: 'rgba(42,44,43,0.07)',
      }}>
        {cards.map(({ value, label, description, Icon }, i) => (
          <MetricCard
            key={label}
            value={value}
            label={label}
            description={description}
            Icon={Icon}
            delay={i * 70}
          />
        ))}
      </div>

      <SubHeader label={t('perf.chart.label')} title={t('perf.chart.title')} />

      <FocusReveal style={{ padding: `0 ${H_PAD}px 16px` }}>
        <Lead>{t('perf.chart.lead')}</Lead>
      </FocusReveal>

      <div style={{ padding: `20px ${H_PAD}px 72px` }}>
        <PerformanceChart />
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 10 — Icons
   ═══════════════════════════════════════════════════════════════════════════ */
function Icons() {
  const { t } = useLang()

  return (
    <section id="icons">
      <SectionHeader eyebrow={t('icons.eyebrow')}>{t('icons.title')}</SectionHeader>

      <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('icons.lead')}</Lead>
      </FocusReveal>

      <div style={{ margin: `32px ${H_PAD}px 0` }}>
        {[
          { prop: 'system',      val: 'lucide-react' },
          { prop: 'style',       val: 'stroke-based' },
          { prop: 'strokeWidth', val: '1.5' },
          { prop: 'size',        val: '20px (default)' },
        ].map(({ prop, val }) => (
          <div key={prop} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', padding: '12px 0', borderBottom: hairline, alignItems: 'center' }}>
            <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{prop}</code>
            <span style={{ fontSize: 13, color: C.steel }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: `32px ${H_PAD}px 64px` }}>
        <IconGrid />
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const { t } = useLang()

  return (
    <footer style={{ borderTop: `3px solid var(--bf-border-strong)`, background: C.bg }}>
      <div style={{ padding: `64px ${H_PAD}px 48px`, display: 'grid', gridTemplateColumns: '200px 1fr 240px', gap: 64 }}>
        <div>
          <BicofinoLogo color={C.black} width={130} />
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[t('footer.meta1'), t('footer.meta2'), t('footer.meta3')].map(l => (
              <p key={l} style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>{l}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
          {[
            { label: t('footer.system'),    value: t('footer.system.value') },
            { label: t('footer.docs'),      value: t('footer.docs.value') },
            { label: t('footer.verticals'), value: t('footer.verticals.value') },
          ].map(({ label, value }) => (
            <p key={label} style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, lineHeight: 1.6 }}>
              <span style={{ color: C.black, marginRight: 12, letterSpacing: '0.08em' }}>{label}</span>
              {value}
            </p>
          ))}
        </div>

        <div style={{ paddingTop: 4 }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 14px', letterSpacing: '0.1em' }}>{t('footer.creative')}</p>
          <p style={{ fontSize: 13, color: C.black, margin: '0 0 3px' }}>woney@bicofino.com</p>
          <p style={{ fontSize: 13, color: C.black, margin: '0 0 16px' }}>branca@bicofino.com</p>
          <p style={{ fontSize: 13, color: C.steel, margin: 0 }}>bicofino.com</p>
        </div>
      </div>

      <div style={{ borderTop: hairline, padding: `14px ${H_PAD}px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>{t('footer.tagline')}</p>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>// v2.0 · 04 · 2026</p>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Page() {
  return (
    <>
      <TopBar />
      <BrandSystem />
      <Overview />
      <Colors />
      <Typography />
      <SlashHeading />
      <SpacingMotion />
      <Brand />
      <Components />
      <OnFieldSection />
      <MotionPerformance />
      <Icons />
      <OperationsSection />
      <Governance />
      <Footer />
    </>
  )
}
