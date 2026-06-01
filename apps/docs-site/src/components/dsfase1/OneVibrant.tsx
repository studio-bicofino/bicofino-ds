'use client'

import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { useLang } from '@/content'

// ─── Local token aliases ───────────────────────────────────────────────────
const C = {
  black:     'var(--bf-text-primary)',
  bg:        'var(--bf-bg-page)',
  surface:   'var(--bf-surface)',
  steel:     'var(--bf-text-secondary)',
  platinum:  'var(--bf-text-subtle)',
  border:    'var(--bf-border)',
  accent:    'var(--current-accent)',
}

const mono    = '"JetBrains Mono", monospace'
const sans    = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD   = 72

// ─── Local atoms (replicated from canonical pattern, not imported) ──────────
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: mono, fontSize: 11, letterSpacing: '0.12em',
      color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase',
    }}>
      {children}
    </p>
  )
}

function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="text-balance" style={{
      fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em',
      color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans,
    }}>
      {children}
    </h1>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-prose text-pretty" style={{
      fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 640,
    }}>
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{
      padding: `80px ${H_PAD}px 56px`, borderBottom: hairline,
    }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `56px ${H_PAD}px 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>
        {label}
      </p>
      <h2 className="text-balance" style={{
        fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em',
        color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans,
      }}>
        {title}
      </h2>
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

// ─── Demo card — faithful to colors-signal.html reference ──────────────────
// Each card pins its own --current-accent via inline style so the trio always
// shows three distinct Highlights simultaneously (the "three themes" pattern).
// The live --current-accent from the page root still drives the section's own
// accent usage (ratio bars, pill backgrounds, token callout, etc.).
interface DemoCardProps {
  accentVar: string   // e.g. 'var(--bf-spfc)'
  accentHex: string   // used ONLY to detect light accents needing dark text
  nameKey: string
  stat: string
  tag: string
  barLabel: string
  isLight: boolean    // accent is light → use dark text on filled elements
}

function DemoCard({ accentVar, nameKey, stat, tag, barLabel, isLight }: DemoCardProps) {
  const textOnAccent = isLight ? 'var(--bf-power-black)' : 'var(--bf-surface)'
  const accentStyle = { '--sig': accentVar } as React.CSSProperties

  return (
    <div style={{
      ...accentStyle,
      flex: 1,
      border: hairline,
      borderRadius: 'var(--bf-corner-2)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      background: C.surface,
    }}>
      {/* top row: label + dot */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.platinum }}>
          {nameKey}
        </span>
        <span style={{
          width: 9, height: 9, borderRadius: '50%',
          background: 'var(--sig)',
          display: 'inline-block',
        }} />
      </div>

      {/* big stat */}
      <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 26, letterSpacing: '-0.01em', color: C.black }}>
        {stat}
      </span>

      {/* progress bar */}
      <div style={{
        height: 5,
        background: 'var(--bf-aluminium, #e2eaf2)',
        borderRadius: 'var(--bf-radius-pill, 9999px)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: '68%',
          background: 'var(--sig)',
          borderRadius: 'var(--bf-radius-pill, 9999px)',
        }} />
      </div>

      {/* progress label */}
      <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.06em', color: C.steel, textTransform: 'uppercase' }}>
        {barLabel}
      </span>

      {/* pill tag */}
      <span style={{
        alignSelf: 'flex-start',
        fontFamily: mono, fontSize: 9,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: textOnAccent,
        background: 'var(--sig)',
        borderRadius: 'var(--bf-radius-pill, 9999px)',
        padding: '3px 10px',
      }}>
        {tag}
      </span>
    </div>
  )
}

// ─── Main export ────────────────────────────────────────────────────────────
export function OneVibrant() {
  const { t } = useLang()

  // Three demo cards — each pinning a specific Highlight (mirrors reference HTML)
  const demoCards: DemoCardProps[] = [
    { accentVar: 'var(--bf-spfc)',      accentHex: '#f0535e', nameKey: t('vibrant.card.a.name'), stat: t('vibrant.card.stat'), tag: t('vibrant.card.tag'), barLabel: t('vibrant.card.bar.label'), isLight: false },
    { accentVar: 'var(--bf-sep)',       accentHex: '#2fd298', nameKey: t('vibrant.card.b.name'), stat: t('vibrant.card.stat'), tag: t('vibrant.card.tag'), barLabel: t('vibrant.card.bar.label'), isLight: false },
    { accentVar: 'var(--bf-australia)', accentHex: '#e5ff78', nameKey: t('vibrant.card.c.name'), stat: t('vibrant.card.stat'), tag: t('vibrant.card.tag'), barLabel: t('vibrant.card.bar.label'), isLight: true  },
  ]

  // Token table rows
  const tokenRows = [
    { key: t('vibrant.token.row.var'),      val: t('vibrant.token.val.var') },
    { key: t('vibrant.token.row.source'),   val: t('vibrant.token.val.source') },
    { key: t('vibrant.token.row.fallback'), val: t('vibrant.token.val.fallback') },
    { key: t('vibrant.token.row.alias'),    val: t('vibrant.token.val.alias') },
  ]

  // Hard rules list
  const rules = [
    t('vibrant.rule1'),
    t('vibrant.rule2'),
    t('vibrant.rule3'),
    t('vibrant.rule4'),
    t('vibrant.rule5'),
  ]

  return (
    <section id="one-vibrant">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <SectionHeader eyebrow={t('vibrant.eyebrow')}>{t('vibrant.title')}</SectionHeader>

      <FocusReveal style={{ padding: `56px ${H_PAD}px 0` }}>
        <Lead>{t('vibrant.lead')}</Lead>
      </FocusReveal>

      {/* ── 90/10 Ratio visual ──────────────────────────────────────── */}
      <SubHeader label={t('vibrant.rule.label')} title={t('vibrant.rule.title')} />

      <FocusReveal style={{ margin: `0 ${H_PAD}px`, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Rule description */}
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, maxWidth: 640, margin: 0 }}>
          {t('vibrant.rule.desc')}
        </p>

        {/* 90/10 split bar — the centrepiece of the section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Segmented bar */}
          <div style={{ display: 'flex', height: 12, borderRadius: 'var(--bf-corner-1)', overflow: 'hidden' }}>
            {/* 90% neutral segment */}
            <div style={{ flex: 9, background: 'var(--bf-aluminium, #e2eaf2)' }} />
            {/* 10% accent segment — live --current-accent */}
            <div style={{ flex: 1, background: C.accent }} />
          </div>
          {/* Labels row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: C.black }}>
                {t('vibrant.ratio.neutral')}
              </span>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.steel }}>
                {t('vibrant.ratio.neutral.label')}
              </span>
              <span style={{ fontSize: 12, color: C.steel, marginTop: 4 }}>
                {t('vibrant.ratio.neutral.desc')}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
              <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: C.accent }}>
                {t('vibrant.ratio.accent')}
              </span>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.steel }}>
                {t('vibrant.ratio.accent.label')}
              </span>
              <span style={{ fontSize: 12, color: C.steel, marginTop: 4, textAlign: 'right', maxWidth: 220 }}>
                {t('vibrant.ratio.accent.desc')}
              </span>
            </div>
          </div>
        </div>
      </FocusReveal>

      {/* ── Live Demo — three cards, same structure, three Highlights ── */}
      <SubHeader label={t('vibrant.demo.label')} title={t('vibrant.demo.title')} />

      <FocusReveal style={{ margin: `0 ${H_PAD}px`, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, maxWidth: 640, margin: 0 }}>
          {t('vibrant.demo.desc')}
        </p>

        {/* Card trio — matches colors-signal.html layout */}
        <div style={{ display: 'flex', gap: 16 }}>
          {demoCards.map((card) => (
            <DemoCard key={card.accentVar} {...card} />
          ))}
        </div>

        {/* Live accent indicator — uses the randomised --current-accent from root */}
        <div style={{
          marginTop: 8,
          padding: '16px 24px',
          border: hairline,
          borderLeft: `3px solid ${C.accent}`,
          background: C.surface,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 24, height: 24,
            borderRadius: 'var(--bf-corner-1)',
            background: C.accent,
            flexShrink: 0,
          }} />
          <div>
            <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.steel, margin: '0 0 2px' }}>
              --current-accent · este refresh
            </p>
            <p style={{ fontFamily: mono, fontSize: 12, color: C.black, margin: 0 }}>
              var(--current-accent)
            </p>
          </div>
        </div>
      </FocusReveal>

      {/* ── Canonical token ──────────────────────────────────────────── */}
      <SubHeader label={t('vibrant.token.label')} title={t('vibrant.token.title')} />

      <FocusReveal style={{ margin: `0 ${H_PAD}px`, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, maxWidth: 640, margin: 0 }}>
          {t('vibrant.token.desc')}
        </p>

        {/* Token table */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
            <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600, textTransform: 'uppercase' }}>
              {t('vibrant.token.row.var')}
            </span>
            <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600, textTransform: 'uppercase' }}>
              {t('vibrant.token.row.source')}
            </span>
          </div>
          {tokenRows.map(({ key, val }) => (
            <div key={key} style={{
              display: 'grid', gridTemplateColumns: '180px 1fr',
              padding: '13px 0', borderBottom: hairline, alignItems: 'center',
            }}>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.steel, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{key}</span>
              <code style={{ fontFamily: mono, fontSize: 11, color: C.black }}>{val}</code>
            </div>
          ))}
        </div>

        {/* Code snippet — pin example */}
        <div style={{ marginTop: 8 }}>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 6px', textTransform: 'uppercase' }}>
            {t('vibrant.pin.label')}
          </p>
          <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: C.black, margin: '0 0 8px', fontFamily: sans }}>
            {t('vibrant.pin.title')}
          </h3>
          <p style={{ fontSize: 13, color: C.steel, margin: '0 0 12px' }}>
            {t('vibrant.pin.desc')}
          </p>
          <div style={{
            background: 'var(--bf-power-black, #061015)',
            padding: '20px 24px',
            borderRadius: 'var(--bf-corner-2)',
            borderLeft: `2px solid ${C.accent}`,
            overflow: 'auto',
          }}>
            <pre style={{
              fontFamily: mono, fontSize: 11, color: 'rgba(242,248,255,0.8)',
              margin: 0, lineHeight: 1.7, whiteSpace: 'pre',
            }}>{`/* pin a vertical's vibrant on its container */
[data-theme="palmeiras"] {
  --current-accent: var(--bf-sep);   /* green */
}
[data-theme="australia"] {
  --current-accent: var(--bf-australia);  /* lime */
}`}</pre>
          </div>
        </div>
      </FocusReveal>

      {/* ── Hard rules ──────────────────────────────────────────────── */}
      <SubHeader label={t('vibrant.rules.label')} title={t('vibrant.rules.title')} />

      <FocusReveal style={{ margin: `0 ${H_PAD}px 64px` }}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {rules.map((rule, i) => (
            <li key={i} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '16px 0', borderBottom: hairline,
              fontSize: 14, color: C.steel, lineHeight: 1.6,
            }}>
              <span style={{
                fontFamily: mono, fontSize: 10, color: C.accent,
                flexShrink: 0, marginTop: 3, fontWeight: 600,
              }}>
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </FocusReveal>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}
