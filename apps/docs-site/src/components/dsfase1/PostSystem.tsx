'use client'

import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { StaggerGroup } from '@/components/motion/StaggerGroup'
import { useLang } from '@/content'

// ─── Design tokens (local aliases) ───────────────────────────────────────────
const C = {
  black:    'var(--bf-text-primary)',
  bg:       'var(--bf-bg-page)',
  surface:  'var(--bf-surface)',
  steel:    'var(--bf-text-secondary)',
  subtle:   'var(--bf-text-subtle)',
  border:   'var(--bf-border)',
  accent:   'var(--current-accent)',
  crema:    'var(--bf-crema)',
  caffe:    'var(--bf-caffe)',
  cacao:    'var(--bf-cacao)',
}

const mono    = '"JetBrains Mono", monospace'
const sans    = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD   = 72

// ─── Shared atoms ─────────────────────────────────────────────────────────────

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
      <p style={{ fontFamily: mono, fontSize: 10, color: C.subtle, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

// ─── Diamond SVG (Bicofino identity seal) ────────────────────────────────────
function DiamondSVG({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 13, color }}
      aria-hidden="true"
    >
      <path
        d="M375.44,200.22c-49.29,1.09-108.78,6.97-142.05,47.77-27.72,33.99-31.82,82.12-33.39,124.41-1.7-51.07-8.08-110.18-52.64-142.47-33.94-24.59-81.99-28.82-122.8-29.71,50.47-1.09,110.17-6.81,143.5-49.48,25.53-32.69,31.44-82.73,31.83-123.15h.22c.46,40.19,6.03,89.21,30.93,122.03,33.12,43.66,93.44,49.53,144.4,50.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ─── Individual Post Card ─────────────────────────────────────────────────────
type PostTheme = 'light' | 'dark'

interface PostCardProps {
  theme: PostTheme
  name: string
  date: string
  accentFigureLight?: string // optional override for light theme figure tones
  accentFigureDark?: string
}

function PostCard({ theme, name, date }: PostCardProps) {
  const isLight = theme === 'light'

  // Token-driven color pairs
  const bg          = isLight ? C.crema   : C.caffe
  const fgPrimary   = isLight ? C.cacao   : 'var(--bf-crema)'
  const arcColor    = isLight ? C.cacao   : 'var(--bf-crema)'

  // Figure silhouette — flat palette token (DESIGN.md: no gradients)
  const figFill = isLight ? 'var(--bf-cacao)' : 'rgba(94, 76, 65, 0.7)'

  return (
    <div
      style={{
        aspectRatio: '4/5',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--bf-corner-2)',
        background: bg,
      }}
    >
      {/* Arc texture — repeating radial gradient, opacity 16% */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-radial-gradient(circle at 50% -8%, transparent 0 15px, ${arcColor} 15px 15.6px, transparent 15.6px 20px)`,
          opacity: 0.16,
          color: arcColor,
        }}
      />

      {/* Frame — inset border, opacity 26% */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 13,
          border: `1px solid ${fgPrimary}`,
          opacity: 0.26,
          borderRadius: 'var(--bf-corner-1)',
        }}
      />

      {/* Diamond seal — top-center */}
      <DiamondSVG color={fgPrimary} />

      {/* Athlete silhouette / cut-out figure */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: '56%',
          height: '76%',
          background: figFill,
        }}
      />

      {/* Name + date — mono, bottom-center */}
      <p
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: mono,
          fontSize: 7.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: fgPrimary,
          margin: 0,
        }}
      >
        {name} ✦ {date}
      </p>
    </div>
  )
}

// ─── Constants Pill ───────────────────────────────────────────────────────────
function ConstantPill({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: mono, fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase',
      color: C.steel, border: hairline, borderRadius: 'var(--bf-radius-pill)',
      padding: '3px 9px', display: 'inline-block',
    }}>
      {children}
    </span>
  )
}

// ─── Vocabulary Row ───────────────────────────────────────────────────────────
function VocabRow({ name, desc }: { name: string; desc: string }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '148px 1fr',
      padding: '16px 0', borderBottom: hairline, gap: 24, alignItems: 'start',
    }}>
      <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, color: C.black, letterSpacing: '0.06em' }}>{name}</span>
      <span style={{ fontSize: 13, color: C.steel, lineHeight: 1.55 }}>{desc}</span>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function PostSystem() {
  const { t } = useLang()

  const posts: Array<{ theme: PostTheme; nameKey: string; dateKey: string }> = [
    { theme: 'light', nameKey: 'postsys.post1.name', dateKey: 'postsys.post1.date' },
    { theme: 'dark',  nameKey: 'postsys.post2.name', dateKey: 'postsys.post2.date' },
    { theme: 'light', nameKey: 'postsys.post3.name', dateKey: 'postsys.post3.date' },
    { theme: 'dark',  nameKey: 'postsys.post4.name', dateKey: 'postsys.post4.date' },
    { theme: 'light', nameKey: 'postsys.post5.name', dateKey: 'postsys.post5.date' },
    { theme: 'dark',  nameKey: 'postsys.post6.name', dateKey: 'postsys.post6.date' },
  ]

  const constants = [
    t('postsys.constants.palette'),
    t('postsys.constants.diamond'),
    t('postsys.constants.arc'),
    t('postsys.constants.mono'),
    t('postsys.constants.cutout'),
  ]

  const vocab = [
    { name: t('postsys.vocab.arc.name'),     desc: t('postsys.vocab.arc.desc') },
    { name: t('postsys.vocab.frame.name'),   desc: t('postsys.vocab.frame.desc') },
    { name: t('postsys.vocab.diamond.name'), desc: t('postsys.vocab.diamond.desc') },
    { name: t('postsys.vocab.cutout.name'),  desc: t('postsys.vocab.cutout.desc') },
    { name: t('postsys.vocab.mono.name'),    desc: t('postsys.vocab.mono.desc') },
  ]

  return (
    <section id="post-system">

      {/* ── Header ── */}
      <SectionHeader eyebrow={t('postsys.eyebrow')}>
        {t('postsys.title')}
      </SectionHeader>

      {/* ── Lead ── */}
      <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('postsys.lead')}</Lead>
      </FocusReveal>

      {/* ── Example grid ── */}
      <div style={{ scrollMarginTop: 88 }}>
        <SubHeader label={t('postsys.grid.label')} title={t('postsys.grid.desc')} />

        {/* Post grid — 3 columns, staggered reveal */}
        <div style={{ padding: `0 ${H_PAD}px 48px` }}>
          <StaggerGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {posts.map((p, i) => (
              <PostCard
                key={i}
                theme={p.theme}
                name={t(p.nameKey)}
                date={t(p.dateKey)}
              />
            ))}
          </StaggerGroup>

          {/* Constants pill row */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap',
            marginTop: 16, paddingTop: 14, borderTop: hairline,
          }}>
            {constants.map((c) => (
              <ConstantPill key={c}>{c}</ConstantPill>
            ))}
          </div>
        </div>
      </div>

      {/* ── 60/40 rule block ── */}
      <div style={{ scrollMarginTop: 88 }}>
        <SubHeader label={t('postsys.rule.label')} title="" />

        <FocusReveal style={{ padding: `0 ${H_PAD}px 64px` }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32,
          }}>
            {/* 60% */}
            <div style={{
              padding: '32px 32px', background: C.crema,
              borderRadius: 'var(--bf-corner-2)', position: 'relative', overflow: 'hidden',
            }}>
              {/* Accent bar — top-left strip (the vibrant in the 40% zone) */}
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
                background: C.accent,
              }} aria-hidden="true" />
              <p style={{
                fontFamily: mono, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em',
                color: C.cacao, margin: '0 0 8px', lineHeight: 1,
              }}>60%</p>
              <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.steel, margin: '0 0 8px' }}>
                {t('postsys.rule.60')}
              </p>
              <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6, margin: 0 }}>
                {t('postsys.rule.60.desc')}
              </p>
            </div>

            {/* 40% */}
            <div style={{
              padding: '32px 32px', background: C.caffe,
              borderRadius: 'var(--bf-corner-2)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
                background: C.accent,
              }} aria-hidden="true" />
              <p style={{
                fontFamily: mono, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em',
                color: 'var(--bf-crema)', margin: '0 0 8px', lineHeight: 1,
              }}>40%</p>
              <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,235,212,0.6)', margin: '0 0 8px' }}>
                {t('postsys.rule.40')}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(243,235,212,0.75)', lineHeight: 1.6, margin: 0 }}>
                {t('postsys.rule.40.desc')}
              </p>
            </div>
          </div>

          {/* Vibrant note */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ color: C.accent, fontFamily: mono, fontSize: 13 }}>✦</span>
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, letterSpacing: '0.08em', margin: 0 }}>
              {t('postsys.rule.note')}
            </p>
          </div>
        </FocusReveal>
      </div>

      {/* ── Visual vocabulary ── */}
      <div style={{ scrollMarginTop: 88 }}>
        <SubHeader label={t('postsys.vocab.label')} title="" />

        <FocusReveal style={{ padding: `0 ${H_PAD}px 80px` }}>
          <div style={{ borderTop: '1px solid var(--bf-border-strong)' }}>
            {vocab.map((v) => (
              <VocabRow key={v.name} name={v.name} desc={v.desc} />
            ))}
          </div>
        </FocusReveal>
      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}
