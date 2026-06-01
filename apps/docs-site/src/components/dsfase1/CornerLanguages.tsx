'use client'

import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { useLang } from '@/content'

// ─── Local color map ───────────────────────────────────────────────────────────
const C = {
  black:     'var(--bf-text-primary)',
  bg:        'var(--bf-bg-page)',
  white:     'var(--bf-surface)',
  steel:     'var(--bf-text-secondary)',
  platinum:  'var(--bf-text-subtle)',
  accent:    'var(--current-accent)',
  border:    'var(--bf-border)',
  strong:    'var(--bf-border-strong)',
  surface:   'var(--bf-surface-subtle)',
}

// ─── Design constants ──────────────────────────────────────────────────────────
const mono     = '"JetBrains Mono", monospace'
const sans     = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD    = 72

// ─── File-local atoms (convention: replicate, never import) ───────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: '0.12em',
      color: C.steel,
      margin: '0 0 14px',
      fontWeight: 600,
      textTransform: 'uppercase',
    }}>
      {children}
    </p>
  )
}

function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="text-balance" style={{
      fontSize: 52,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: C.black,
      margin: '0 0 20px',
      lineHeight: 1.0,
      fontFamily: sans,
    }}>
      {children}
    </h1>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-prose text-pretty" style={{
      fontSize: 15,
      lineHeight: 1.7,
      color: C.steel,
      margin: 0,
      maxWidth: 640,
    }}>
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{
      padding: '80px ' + H_PAD + 'px 56px',
      borderBottom: hairline,
    }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: '56px ' + H_PAD + 'px 28px' }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>
        {label}
      </p>
      <h2 className="text-balance" style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: C.black,
        margin: 0,
        lineHeight: 1.1,
        fontFamily: sans,
      }}>
        {title}
      </h2>
    </div>
  )
}

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: '32px ' + H_PAD + 'px 48px', borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

// ─── Corner swatch — a small labeled rectangle ────────────────────────────────
function CornerSwatch({
  radiusVar,
  px,
  tokenLabel,
  pxLabel,
}: {
  radiusVar: string
  px: string
  tokenLabel: string
  pxLabel: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
      <div style={{
        width: 78,
        height: 58,
        background: C.surface,
        border: '1px solid ' + C.strong,
        borderRadius: radiusVar,
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: mono, fontSize: 10, color: C.steel, textAlign: 'center', lineHeight: 1.4 }}>
        <span style={{ color: C.black }}>{tokenLabel}</span>
        {' · '}{pxLabel}
      </span>
    </div>
  )
}

// ─── Language block (sharp or soft) ──────────────────────────────────────────
function LanguageBlock({
  name,
  tag,
  desc,
  swatches,
  cornerAttr,
}: {
  name: string
  tag: string
  desc: string
  swatches: { radiusVar: string; px: string; token: string; pxLabel: string }[]
  cornerAttr?: 'sharp' | 'soft'
}) {
  return (
    <div
      data-corners={cornerAttr}
      style={{ marginBottom: 32 }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, letterSpacing: '0.02em', color: C.black }}>
          {name}
        </span>
        <span style={{ fontFamily: mono, fontSize: 10, color: C.platinum }}>
          {tag}
        </span>
      </div>
      <p style={{ fontFamily: sans, fontSize: 12, color: C.steel, margin: '0 0 16px', maxWidth: '52ch', lineHeight: 1.55 }}>
        {desc}
      </p>
      <div style={{ display: 'flex', gap: 22, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {swatches.map((s) => (
          <CornerSwatch
            key={s.token}
            radiusVar={s.radiusVar}
            px={s.px}
            tokenLabel={s.token}
            pxLabel={s.pxLabel}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Live demo card — reused inside both sharp/soft containers ────────────────
function LiveCard({
  cardLabel,
  badgeLabel,
}: {
  cardLabel: string
  badgeLabel: string
}) {
  return (
    <div style={{
      background: C.white,
      border: hairline,
      borderRadius: 'var(--bf-corner-3)',
      padding: '20px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      minWidth: 200,
    }}>
      {/* accent bar */}
      <div style={{
        width: 4,
        height: 32,
        background: C.accent,
        borderRadius: 'var(--bf-corner-1)',
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.black, flex: 1 }}>
        {cardLabel}
      </span>
      {/* badge */}
      <span style={{
        fontFamily: mono,
        fontSize: 9,
        letterSpacing: '0.1em',
        color: C.steel,
        background: C.surface,
        border: hairline,
        borderRadius: 'var(--bf-radius-pill)',
        padding: '3px 10px',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        {badgeLabel}
      </span>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
export function CornerLanguages() {
  const { t } = useLang()

  const sharpSwatches = [
    { radiusVar: 'var(--bf-sharp-1)', px: '2px',  token: t('corners.sharp.1.label'), pxLabel: t('corners.sharp.1.value') },
    { radiusVar: 'var(--bf-sharp-2)', px: '4px',  token: t('corners.sharp.2.label'), pxLabel: t('corners.sharp.2.value') },
    { radiusVar: 'var(--bf-sharp-3)', px: '8px',  token: t('corners.sharp.3.label'), pxLabel: t('corners.sharp.3.value') },
  ]

  const softSwatches = [
    { radiusVar: 'var(--bf-soft-1)', px: '12px', token: t('corners.soft.1.label'), pxLabel: t('corners.soft.1.value') },
    { radiusVar: 'var(--bf-soft-2)', px: '18px', token: t('corners.soft.2.label'), pxLabel: t('corners.soft.2.value') },
    { radiusVar: 'var(--bf-soft-3)', px: '28px', token: t('corners.soft.3.label'), pxLabel: t('corners.soft.3.value') },
  ]

  return (
    <section id="corner-languages">

      {/* ── Section header ── */}
      <SectionHeader eyebrow={t('corners.eyebrow')}>
        {t('corners.title')}
      </SectionHeader>

      {/* ── Lead ── */}
      <FocusReveal style={{ padding: '40px ' + H_PAD + 'px 0' }}>
        <Lead>{t('corners.lead')}</Lead>
      </FocusReveal>

      {/* ── Switch note ── */}
      <FocusReveal style={{ padding: '16px ' + H_PAD + 'px 0' }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, letterSpacing: '0.08em', lineHeight: 1.6 }}>
          {t('corners.switch.note')}{' '}
          <span style={{ color: C.black }}>{t('corners.switch.attr')}</span>
          {' '}{t('corners.switch.suffix')}
        </p>
      </FocusReveal>

      {/* ── Scale catalogue ── */}
      <SubHeader
        label={t('corners.eyebrow')}
        title={t('corners.title')}
      />

      <FocusReveal style={{ padding: '0 ' + H_PAD + 'px 0' }}>
        <LanguageBlock
          name={t('corners.sharp.name')}
          tag={t('corners.sharp.tag')}
          desc={t('corners.sharp.desc')}
          swatches={sharpSwatches}
          cornerAttr="sharp"
        />

        <LanguageBlock
          name={t('corners.soft.name')}
          tag={t('corners.soft.tag')}
          desc={t('corners.soft.desc')}
          swatches={softSwatches}
          cornerAttr="soft"
        />

        {/* ── Pill ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4, paddingTop: 24, borderTop: hairline }}>
          <span style={{
            height: 30,
            padding: '0 18px',
            display: 'flex',
            alignItems: 'center',
            background: C.black,
            color: C.bg,
            borderRadius: 'var(--bf-radius-pill)',
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}>
            {t('corners.pill.label')}
          </span>
          <p style={{ fontFamily: sans, fontSize: 12, color: C.steel, margin: 0, lineHeight: 1.5 }}>
            {t('corners.pill.note')}
          </p>
        </div>
      </FocusReveal>

      {/* ── Live demo ── */}
      <div id="corners-demo" style={{ scrollMarginTop: 88 }}>
        <SubHeader
          label={t('corners.eyebrow')}
          title={t('corners.live.section')}
        />

        <FocusReveal style={{ padding: '0 ' + H_PAD + 'px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            marginBottom: 24,
          }}>

            {/* Sharp container */}
            <div
              data-corners="sharp"
              style={{
                background: C.surface,
                border: hairline,
                borderRadius: 'var(--bf-corner-1)',
                padding: 24,
              }}
            >
              <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' }}>
                {t('corners.live.sharp.label')}
              </p>
              <LiveCard
                cardLabel={t('corners.live.sharp.card')}
                badgeLabel={t('corners.live.sharp.badge')}
              />
            </div>

            {/* Soft container */}
            <div
              data-corners="soft"
              style={{
                background: C.surface,
                border: hairline,
                borderRadius: 'var(--bf-corner-3)',
                padding: 24,
              }}
            >
              <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' }}>
                {t('corners.live.soft.label')}
              </p>
              <LiveCard
                cardLabel={t('corners.live.soft.card')}
                badgeLabel={t('corners.live.soft.badge')}
              />
            </div>
          </div>

          <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, letterSpacing: '0.08em', lineHeight: 1.6, marginBottom: 32 }}>
            ✦ {t('corners.live.note')}
          </p>
        </FocusReveal>
      </div>

      {/* ── Rule block ── */}
      <FocusReveal style={{ padding: '0 ' + H_PAD + 'px 0', marginBottom: 64 }}>
        <div style={{
          padding: '24px 32px',
          background: C.white,
          borderTop: '3px solid ' + C.black,
          borderLeft: hairline,
          borderRight: hairline,
          borderBottom: hairline,
        }}>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', color: C.steel, margin: '0 0 8px', textTransform: 'uppercase' }}>
            {t('corners.rule.title')}
          </p>
          <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.65, color: C.black, margin: '0 0 12px' }}>
            {t('corners.rule.body')}
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, color: C.steel, margin: 0, lineHeight: 1.6 }}>
            <span style={{ color: C.black }}>{t('corners.rule.token')}</span>
            {' '}{t('corners.rule.token.suffix')}
          </p>
        </div>
      </FocusReveal>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}
