'use client'

import { FocusReveal } from '@/components/motion/FocusReveal'
import { MetricCard } from '@/components/MetricCard'
import { PerformanceChart } from '@/components/PerformanceChart'
import { IconGrid } from '@/components/IconGrid'
import { useLang } from '@/content'
import { Clock, TrendingUp, ArrowDownRight, Zap, Cpu, Activity } from 'lucide-react'
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

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h2>
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

/* ─── Sponsors constants ─── */
const TOP_ROW_LOGOS = [
  '/assets/on-field/sponsors/sponsor-fifa.svg',
  '/assets/on-field/sponsors/sponsor-audemar-piguet.svg',
  '/assets/on-field/sponsors/sponsor-emirates.svg',
  '/assets/on-field/sponsors/sponsor-btg.svg',
  '/assets/on-field/sponsors/sponsor-redbull.svg',
  '/assets/on-field/sponsors/sponsor-montblanc.svg',
  '/assets/on-field/sponsors/sponsor-nike-swoosh.svg',
  '/assets/on-field/sponsors/sponsor-procter-gamble.svg',
  '/assets/on-field/sponsors/sponsor-ubs.svg',
  '/assets/on-field/sponsors/sponsor-illy.svg',
]

const BOTTOM_ROW_LOGOS = [
  '/assets/on-field/sponsors/sponsor-ea-sports.svg',
  '/assets/on-field/sponsors/sponsor-gillette.svg',
  '/assets/on-field/sponsors/sponsor-panini.svg',
  '/assets/on-field/sponsors/sponsor-playstation.svg',
  '/assets/on-field/sponsors/sponsor-zegna.svg',
  '/assets/on-field/sponsors/sponsor-bombardier.svg',
  '/assets/on-field/sponsors/sponsor-on-cloud.svg',
  '/assets/on-field/sponsors/sponsor-ralph-lauren.svg',
  '/assets/on-field/sponsors/sponsor-perrier.svg',
  '/assets/on-field/sponsors/sponsor-cape.svg',
]

const LOGO_SIZE = 120
const LOGO_GAP = 40

function SponsorLogo({ src }: { src: string }) {
  const name = src.split('/').pop()?.replace('sponsor-', '').replace('.svg', '') ?? ''
  return (
    <div
      className="bf-sponsor-logo"
      style={{
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: LOGO_GAP,
      }}
    >
      <img
        src={src}
        alt={name}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', opacity: 0.7 }}
      />
    </div>
  )
}

function SponsorsCarousel() {
  return (
    <div style={{ overflow: 'hidden', padding: `0 0 4px` }}>
      <style>{`
        @keyframes bf-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bf-scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .bf-sponsor-track { display: flex; will-change: transform; backface-visibility: hidden; }
        .bf-sponsor-track--left  { animation: bf-scroll-left  40s linear infinite; }
        .bf-sponsor-track--right { animation: bf-scroll-right 45s linear infinite; }
        .bf-sponsor-track:hover  { animation-play-state: paused; }
      `}</style>

      {/* Top row — scrolls right → left */}
      <div style={{ overflow: 'hidden', marginBottom: 32 }}>
        <div className="bf-sponsor-track bf-sponsor-track--left">
          {[...TOP_ROW_LOGOS, ...TOP_ROW_LOGOS].map((src, i) => (
            <SponsorLogo key={i} src={src} />
          ))}
        </div>
      </div>

      {/* Bottom row — scrolls left → right */}
      <div style={{ overflow: 'hidden' }}>
        <div className="bf-sponsor-track bf-sponsor-track--right">
          {[...BOTTOM_ROW_LOGOS, ...BOTTOM_ROW_LOGOS].map((src, i) => (
            <SponsorLogo key={i} src={src} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SponsorsSection() {
  const { t } = useLang()

  return (
    <section id="sponsors">
      <SectionHeader eyebrow={t('sponsors.eyebrow')}>{t('sponsors.title')}</SectionHeader>

      <FocusReveal style={{ padding: `40px ${H_PAD} 0` }}>
        <Lead>{t('sponsors.lead')}</Lead>
      </FocusReveal>

      <div style={{ padding: `48px ${H_PAD} 64px` }}>
        <SponsorsCarousel />
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
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

      <FocusReveal style={{ padding: `40px ${H_PAD} 0` }}>
        <Lead>{t('perf.lead')}</Lead>
      </FocusReveal>

      <SubHeader label={t('perf.metrics.label')} title={t('perf.metrics.title')} />

      {/* Metric grid — all white, hairline separators, no alternating blocks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        margin: `0 ${H_PAD}`,
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

      <FocusReveal style={{ padding: `0 ${H_PAD} 16px` }}>
        <Lead>{t('perf.chart.lead')}</Lead>
      </FocusReveal>

      <div style={{ padding: `20px ${H_PAD} 72px` }}>
        <PerformanceChart />
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 11 — Icons
   ═══════════════════════════════════════════════════════════════════════════ */
function Icons() {
  const { t } = useLang()

  return (
    <section id="icons">
      <SectionHeader eyebrow={t('icons.eyebrow')}>{t('icons.title')}</SectionHeader>

      <FocusReveal style={{ padding: `40px ${H_PAD} 0` }}>
        <Lead>{t('icons.lead')}</Lead>
      </FocusReveal>

      <div style={{ margin: `32px ${H_PAD} 0` }}>
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

      <div style={{ padding: `32px ${H_PAD} 64px` }}>
        <IconGrid />
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}

export default function Page() {
  return (
    <>
      <MotionPerformance />
      <SponsorsSection />
      <Icons />
    </>
  )
}
