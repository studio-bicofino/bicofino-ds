'use client'

import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { useLang } from '@/content'

const C = {
  black:    'var(--bf-text-primary)',
  bg:       'var(--bf-bg-page)',
  surface:  'var(--bf-surface)',
  steel:    'var(--bf-text-secondary)',
  subtle:   'var(--bf-text-subtle)',
  border:   'var(--bf-border)',
  power:    'var(--bf-power-black)',
  accent:   'var(--current-accent)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 72

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

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: '80px ' + H_PAD + 'px 56px', borderBottom: hairline }}>
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
    <div style={{ padding: '32px ' + H_PAD + 'px 48px', borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.subtle, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

/* ─── Editorial demo composition (faithfully from reference) ─── */
function EditorialComposition({ label, headline, subline }: { label: string; headline: string; subline: string }) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16 / 8',
        overflow: 'hidden',
        background: 'var(--bf-surface-subtle)',
        borderRadius: 'var(--bf-corner-2)',
      }}
    >
      {/* Accent color block — the chromatic interference */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '12%',
          width: '44%',
          height: '66%',
          background: C.accent,
        }}
      />

      {/* Neutral subject silhouette (B&W trapezoid) */}
      <div
        style={{
          position: 'absolute',
          right: '15%',
          bottom: 0,
          width: '38%',
          height: '84%',
          background: 'var(--bf-steel)',
          clipPath: 'polygon(22% 0, 78% 0, 100% 100%, 0 100%)',
        }}
      />

      {/* Dashed trace line */}
      <svg
        style={{ position: 'absolute', right: '11%', bottom: '7%', width: '46%', height: '78%' }}
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M30 180 C 10 120, 60 90, 80 70 S 150 40, 170 20"
          fill="none"
          stroke={C.power}
          strokeWidth="1.4"
          strokeDasharray="3 4"
          opacity={0.8}
        />
      </svg>

      {/* Top-left mono label */}
      <p style={{
        position: 'absolute', left: 22, top: 20,
        fontFamily: mono, fontSize: 9.5, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: C.steel, margin: 0,
      }}>
        {label}
      </p>

      {/* Bottom-left impact title block */}
      <div style={{ position: 'absolute', left: 20, bottom: 20 }}>
        <p style={{
          fontFamily: mono, fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: 'clamp(30px, 7vw, 60px)',
          lineHeight: 0.84,
          color: C.power,
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {headline}
        </p>
        <p style={{
          fontFamily: mono, fontWeight: 400, fontSize: 9.5,
          letterSpacing: '0.1em', color: C.steel, marginTop: 8, margin: '8px 0 0',
        }}>
          {subline}
        </p>
      </div>
    </div>
  )
}

/* ─── Interference type card ─── */
function InterferenceCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div style={{
      padding: '24px', background: C.surface,
      border: hairline, borderTop: '3px solid ' + C.accent,
    }}>
      <p style={{
        fontFamily: mono, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: C.black, margin: '0 0 8px',
      }}>
        {name}
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.6, color: C.steel, margin: 0 }}>
        {desc}
      </p>
    </div>
  )
}

/* ─── Invariant row ─── */
function InvariantRow({ index, text }: { index: number; text: string }) {
  return (
    <div style={{
      display: 'flex', gap: 16, alignItems: 'flex-start',
      padding: '16px 0', borderBottom: hairline,
    }}>
      <span style={{
        fontFamily: mono, fontSize: 10, color: C.subtle,
        fontWeight: 600, minWidth: 20, flexShrink: 0, marginTop: 1,
      }}>
        {String(index).padStart(2, '0')}
      </span>
      <span style={{ fontSize: 14, color: C.steel, lineHeight: 1.5 }}>
        {text}
      </span>
    </div>
  )
}

export function IntervencaoCor() {
  const { t } = useLang()

  const interferenceTypes = [
    { name: t('intervencao.types.block.name'), desc: t('intervencao.types.block.desc') },
    { name: t('intervencao.types.trace.name'), desc: t('intervencao.types.trace.desc') },
    { name: t('intervencao.types.band.name'),  desc: t('intervencao.types.band.desc') },
  ]

  const invariants = [
    t('intervencao.invariant.1'),
    t('intervencao.invariant.2'),
    t('intervencao.invariant.3'),
    t('intervencao.invariant.4'),
    t('intervencao.invariant.5'),
    t('intervencao.invariant.6'),
    t('intervencao.invariant.7'),
  ]

  return (
    <section id="intervencao-cor">
      <SectionHeader eyebrow={t('intervencao.eyebrow')}>
        {t('intervencao.title')}
      </SectionHeader>

      <FocusReveal style={{ padding: '40px ' + H_PAD + 'px 0' }}>
        <p className="editorial-prose text-pretty" style={{
          fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 640,
        }}>
          {t('intervencao.lead')}
        </p>
      </FocusReveal>

      {/* ── Full-bleed editorial intervention block ── */}
      <FocusReveal style={{ margin: '48px 0 0' }}>
        <div
          style={{
            background: C.accent,
            padding: '64px ' + H_PAD + 'px',
          }}
        >
          {/* Mono system label */}
          <p style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: C.power, opacity: 0.6,
            margin: '0 0 48px',
          }}>
            {t('intervencao.eyebrow')}
          </p>

          {/* Editorial demo composition */}
          <EditorialComposition
            label={t('intervencao.demo.label')}
            headline={t('intervencao.demo.headline')}
            subline={t('intervencao.demo.subline')}
          />

          {/* Rule row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginTop: 16 }}>
            <span style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#ffffff', background: C.power, borderRadius: 'var(--bf-radius-pill)',
              padding: '3px 10px', flexShrink: 0,
            }}>
              {t('intervencao.badge.editorial')}
            </span>
            <span style={{ fontSize: 11.5, color: C.power, lineHeight: 1.5, opacity: 0.8 }}>
              {t('intervencao.rule.note')}
            </span>
          </div>
        </div>
      </FocusReveal>

      {/* ── Concept: SYSTEM vs EDITORIAL ── */}
      <SubHeader
        label={t('intervencao.concept.label')}
        title={t('intervencao.concept.title')}
      />

      <FocusReveal style={{ padding: '0 ' + H_PAD + 'px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* SYSTEM mode — accent as signal (≤10%) */}
          <div style={{ padding: '32px', background: C.surface, border: hairline }}>
            <p style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: C.steel, margin: '0 0 16px',
            }}>
              // SYSTEM
            </p>
            <div style={{ position: 'relative', height: 64, background: C.bg, marginBottom: 16, borderRadius: 'var(--bf-corner-1)' }}>
              {/* ~10% accent stripe — signal only */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: '10%', background: C.accent, borderRadius: 'var(--bf-corner-1) 0 0 var(--bf-corner-1)',
              }} />
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.08em' }}>
                  ≤ 10% · sinal
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.steel, margin: 0 }}>
              {t('intervencao.concept.body').split('.')[0]}.
            </p>
          </div>

          {/* EDITORIAL mode — accent as block */}
          <div style={{ padding: '32px', background: C.surface, border: hairline, borderTop: '3px solid ' + C.accent }}>
            <p style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: C.steel, margin: '0 0 16px',
            }}>
              // EDITORIAL
            </p>
            <div style={{ position: 'relative', height: 64, background: C.bg, marginBottom: 16, borderRadius: 'var(--bf-corner-1)' }}>
              {/* ~50%+ accent block */}
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0,
                width: '50%', background: C.accent, borderRadius: '0 var(--bf-corner-1) var(--bf-corner-1) 0',
              }} />
              <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>
                <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.08em' }}>
                  bloco composicional
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.steel, margin: 0 }}>
              {t('intervencao.concept.body').split('. ').slice(1).join('. ')}
            </p>
          </div>
        </div>
      </FocusReveal>

      {/* ── Interference types ── */}
      <SubHeader
        label={t('intervencao.types.label')}
        title={t('intervencao.types.label')}
      />

      <FocusReveal style={{ padding: '0 ' + H_PAD + 'px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {interferenceTypes.map((type) => (
            <InterferenceCard key={type.name} name={type.name} desc={type.desc} />
          ))}
        </div>
      </FocusReveal>

      {/* ── Seven invariants checklist ── */}
      <div style={{ margin: '0 ' + H_PAD + 'px 64px' }}>
        <p style={{
          fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: C.steel, margin: '0 0 4px',
        }}>
          {t('intervencao.invariants.label')}
        </p>
        <div style={{ borderTop: hairline, marginTop: 16 }}>
          {invariants.map((inv, i) => (
            <InvariantRow key={i} index={i + 1} text={inv} />
          ))}
        </div>
      </div>

      {/* ── Token reference ── */}
      <FocusReveal style={{ margin: '0 ' + H_PAD + 'px 64px' }}>
        <div style={{
          padding: '32px 40px', background: C.power, borderRadius: 'var(--bf-corner-2)',
        }}>
          <p style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(168,201,229,0.6)', margin: '0 0 8px',
          }}>
            {t('intervencao.token.label')}
          </p>
          <p style={{
            fontFamily: mono, fontSize: 18, fontWeight: 600,
            color: C.accent, margin: '0 0 12px', letterSpacing: '-0.01em',
          }}>
            {t('intervencao.token.var')}
          </p>
          <p style={{
            fontSize: 14, lineHeight: 1.65, color: 'rgba(168,201,229,0.8)',
            margin: 0, maxWidth: 560,
          }}>
            {t('intervencao.token.desc')}
          </p>
        </div>
      </FocusReveal>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}
