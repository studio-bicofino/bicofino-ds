'use client'

import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { useLang } from '@/content'

// ─── Design tokens (inline, dark-panel variant) ──────────────────────────────
const C = {
  // Light surface (page / section)
  black:     'var(--bf-text-primary)',
  bg:        'var(--bf-bg-page)',
  white:     'var(--bf-surface)',
  steel:     'var(--bf-text-secondary)',
  platinum:  'var(--bf-text-subtle)',
  border:    'var(--bf-border)',
  // Dark panel tokens
  dark:      'var(--bf-power-black)',           // #061015
  lineWeak:  'var(--bf-line-on-dark)',          // rgba(168,201,229,0.20)
  lineStr:   'var(--bf-line-on-dark-strong)',   // rgba(168,201,229,0.32)
  dot:       'var(--bf-dot-on-dark)',           // rgba(168,201,229,0.10)
  accent:    'var(--current-accent)',
  // Text on dark
  textDark:  'rgba(232, 238, 243, 0.90)',
  metaDark:  'rgba(168, 201, 229, 0.65)',
  dimDark:   'rgba(109, 120, 134, 0.80)',
}

const mono  = '"JetBrains Mono", monospace'
const sans  = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 72

// ─── Atom components (replicated locally per canonical pattern) ──────────────

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
      <p style={{
        fontFamily: mono, fontSize: 10, letterSpacing: '0.1em',
        color: C.steel, margin: '0 0 10px',
      }}>{label}</p>
      <h2 className="text-balance" style={{
        fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em',
        color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans,
      }}>{title}</h2>
    </div>
  )
}

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: `32px ${H_PAD}px 48px`, borderTop: hairline }}>
      <p style={{
        fontFamily: mono, fontSize: 10, color: C.platinum,
        margin: 0, letterSpacing: '0.1em',
      }}>
        {line}
      </p>
    </div>
  )
}

// ─── Diamond glyph (Bicofino connective) ─────────────────────────────────────
function DiamondSvg({ size = 9, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} style={{ color }} aria-hidden="true">
      <path
        d="M375.44,200.22c-49.29,1.09-108.78,6.97-142.05,47.77-27.72,33.99-31.82,82.12-33.39,124.41-1.7-51.07-8.08-110.18-52.64-142.47-33.94-24.59-81.99-28.82-122.8-29.71,50.47-1.09,110.17-6.81,143.5-49.48,25.53-32.69,31.44-82.73,31.83-123.15h.22c.46,40.19,6.03,89.21,30.93,122.03,33.12,43.66,93.44,49.53,144.4,50.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ─── The ambient SVG schematic (M-01 living organism) ────────────────────────
// className="bf-schematic" activates all ambient keyframes from globals.css.
// Sub-classes:
//   .bf-orbit-ring  → bf-orbit-draw (stroke-dashoffset loop)
//   .bf-node        → bf-node-pulse (scale + opacity)
//   .bf-unit        → bf-ant (opacity 0.25→0.95)
//   .bf-digit-strip → bf-digit-roll (translateY steps)
// No custom @keyframes here — all defined globally.

function UnitCell({ hot, delay }: { hot?: boolean; delay: string }) {
  return (
    <i
      className="bf-unit"
      aria-hidden="true"
      style={{
        display: 'block',
        aspectRatio: '1',
        background: hot ? C.accent : C.lineWeak,
        animationDelay: delay,
        // reduced-motion fallback handled globally in globals.css
      }}
    />
  )
}

// 20 cells per row, 2 rows = 40 cells with distributed delays
const UNIT_CELLS: Array<{ hot?: boolean; delay: string }> = [
  // Row 1
  { delay: '0s' },      { delay: '.3s' },  { delay: '.6s' },  { hot: true, delay: '.9s' },
  { delay: '1.2s' },    { delay: '.2s' },  { delay: '1.5s' }, { delay: '.8s' },
  { delay: '2s' },      { delay: '1.1s' }, { delay: '.5s' },  { delay: '2.4s' },
  { delay: '1.8s' },    { delay: '.4s' },  { hot: true, delay: '2.8s' }, { delay: '1.4s' },
  { delay: '.7s' },     { delay: '3.1s' }, { delay: '1.7s' }, { delay: '2.2s' },
  // Row 2
  { delay: '1.3s' },    { delay: '2.6s' }, { delay: '.1s' },  { delay: '3.4s' },
  { delay: '1.9s' },    { delay: '.9s' },  { delay: '2.1s' }, { hot: true, delay: '3.7s' },
  { delay: '1.6s' },    { delay: '.3s' },  { delay: '2.9s' }, { delay: '1.0s' },
  { delay: '3.2s' },    { delay: '.6s' },  { delay: '2.3s' }, { delay: '1.5s' },
  { delay: '3.9s' },    { delay: '.8s' },  { delay: '2.7s' }, { delay: '1.2s' },
]

function SchematicDemo({ t }: { t: (k: string) => string }) {
  return (
    // bf-schematic scopes ALL ambient animation — required on the root dark container
    <div
      className="bf-schematic"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: C.dark,
        color: C.textDark,
        padding: 26,
        fontFamily: mono,
        borderRadius: 'var(--bf-corner-3)',           // 8px sharp
        border: `1px solid ${C.lineStr}`,
      }}
    >
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${C.dot} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />

      {/* Top row: spec-tags */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          border: `1px solid ${C.lineWeak}`,
          padding: '4px 8px',
          fontSize: 9,
          letterSpacing: '0.1em',
          color: C.metaDark,
        }}>
          <DiamondSvg size={9} color={C.accent} />
          {t('grafismo.demo.tag1')}
        </span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          border: `1px solid ${C.lineWeak}`,
          padding: '4px 8px',
          fontSize: 9,
          letterSpacing: '0.1em',
          color: C.metaDark,
        }}>
          {t('grafismo.demo.tag2')}
        </span>
      </div>

      {/* Orbit SVG — absolutely positioned top-right */}
      <svg
        viewBox="0 0 120 120"
        width={120}
        height={120}
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 24,
          top: 50,
          overflow: 'visible',
        }}
      >
        {/* Axis lines */}
        <line
          x1="60" y1="6" x2="60" y2="114"
          stroke={C.lineStr} strokeWidth={1}
        />
        <line
          x1="6" y1="60" x2="114" y2="60"
          stroke={C.lineStr} strokeWidth={1}
        />

        {/* Orbit rings — .bf-orbit-ring triggers bf-orbit-draw from globals.css */}
        <circle
          className="bf-orbit-ring"
          cx="60" cy="60" r="51"
          fill="none"
          stroke={C.lineStr}
          strokeWidth={1}
          strokeDasharray="320"
          // @ts-expect-error custom CSS property via style
          style={{ '--len': '320' }}
        />
        <circle
          className="bf-orbit-ring"
          cx="60" cy="60" r="33"
          fill="none"
          stroke={C.lineStr}
          strokeWidth={1}
          strokeDasharray="210"
          style={{ '--len': '210', animationDelay: '.5s' } as React.CSSProperties}
        />
        <circle
          className="bf-orbit-ring"
          cx="60" cy="60" r="16"
          fill="none"
          stroke={C.lineStr}
          strokeWidth={1}
          strokeDasharray="100"
          style={{ '--len': '100', animationDelay: '1s' } as React.CSSProperties}
        />

        {/* Nodes — .bf-node triggers bf-node-pulse from globals.css */}
        {/* Primary "hot" node carries --current-accent */}
        <circle
          className="bf-node"
          cx="60" cy="9" r="3.2"
          fill={C.accent}
          stroke="none"
          style={{ animationDuration: '3.2s' } as React.CSSProperties}
        />
        <circle
          className="bf-node"
          cx="108" cy="60" r="2.6"
          fill={C.metaDark}
          stroke="none"
          style={{ animationDuration: '4.1s', animationDelay: '.6s' } as React.CSSProperties}
        />
        <circle
          className="bf-node"
          cx="44" cy="100" r="2.4"
          fill={C.metaDark}
          stroke="none"
          style={{ animationDuration: '3.6s', animationDelay: '1.2s' } as React.CSSProperties}
        />
        <circle
          className="bf-node"
          cx="24" cy="42" r="2.2"
          fill={C.metaDark}
          stroke="none"
          style={{ animationDuration: '4.8s', animationDelay: '.3s' } as React.CSSProperties}
        />
      </svg>

      {/* Digit counters */}
      <div style={{
        position: 'relative',
        display: 'flex',
        gap: 22,
        marginTop: 18,
      }}>
        {/* Counter 1 — ÍNDICE */}
        <div>
          <div style={{ fontSize: 8.5, letterSpacing: '0.1em', color: C.dimDark }}>
            {t('grafismo.demo.idx.label')}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 2,
            fontSize: 15,
            color: C.textDark,
            marginTop: 4,
          }}>
            {/* Digit 1 */}
            <span style={{ display: 'inline-block', height: '1em', overflow: 'hidden' }}>
              <span
                className="bf-digit-strip"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1em',
                  animationDuration: '5.5s',
                } as React.CSSProperties}
              >
                <span>9</span><span>3</span><span>9</span><span>4</span><span>9</span>
              </span>
            </span>
            {/* Digit 2 */}
            <span style={{ display: 'inline-block', height: '1em', overflow: 'hidden' }}>
              <span
                className="bf-digit-strip"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1em',
                  animationDuration: '7s',
                } as React.CSSProperties}
              >
                <span>4</span><span>1</span><span>4</span><span>2</span><span>4</span>
              </span>
            </span>
            <span style={{ color: C.dimDark }}>,</span>
            {/* Digit 3 */}
            <span style={{ display: 'inline-block', height: '1em', overflow: 'hidden' }}>
              <span
                className="bf-digit-strip"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1em',
                  animationDuration: '6.2s',
                } as React.CSSProperties}
              >
                <span>2</span><span>8</span><span>2</span><span>5</span><span>2</span>
              </span>
            </span>
          </div>
        </div>

        {/* Counter 2 — VELOCIDADE */}
        <div>
          <div style={{ fontSize: 8.5, letterSpacing: '0.1em', color: C.dimDark }}>
            {t('grafismo.demo.spd.label')}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 2,
            fontSize: 15,
            color: C.textDark,
            marginTop: 4,
          }}>
            {/* Digit 1 */}
            <span style={{ display: 'inline-block', height: '1em', overflow: 'hidden' }}>
              <span
                className="bf-digit-strip"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1em',
                  animationDuration: '6.2s',
                } as React.CSSProperties}
              >
                <span>3</span><span>2</span><span>3</span><span>1</span><span>3</span>
              </span>
            </span>
            {/* Digit 2 */}
            <span style={{ display: 'inline-block', height: '1em', overflow: 'hidden' }}>
              <span
                className="bf-digit-strip"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '1em',
                  animationDuration: '5.5s',
                } as React.CSSProperties}
              >
                <span>2</span><span>4</span><span>2</span><span>6</span><span>2</span>
              </span>
            </span>
            <span style={{ fontSize: 9, color: C.dimDark, marginLeft: 2 }}>
              {t('grafismo.demo.spd.unit')}
            </span>
          </div>
        </div>
      </div>

      {/* Unit grid — the anthill */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 1fr)',
          gap: 3,
          marginTop: 20,
          maxWidth: '62%',
        }}
      >
        {UNIT_CELLS.map((cell, i) => (
          <UnitCell key={i} hot={cell.hot} delay={cell.delay} />
        ))}
      </div>

      {/* Foot stats */}
      <div style={{
        position: 'relative',
        display: 'flex',
        gap: 24,
        marginTop: 20,
        flexWrap: 'wrap',
      }}>
        {[
          { k: t('grafismo.demo.height.label'), v: t('grafismo.demo.height.val') },
          { k: t('grafismo.demo.foot.label'),   v: t('grafismo.demo.foot.val') },
          { k: t('grafismo.demo.pass.label'),   v: t('grafismo.demo.pass.val') },
        ].map(({ k, v }) => (
          <div key={k}>
            <div style={{ fontSize: 8, letterSpacing: '0.1em', color: C.dimDark }}>{k}</div>
            <div style={{ fontSize: 12, color: C.textDark, marginTop: 3 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Anatomy row — orbit / counters / units spec cards ───────────────────────
function AnatomyCard({
  label,
  title,
  desc,
  accent = false,
}: {
  label: string
  title: string
  desc: string
  accent?: boolean
}) {
  return (
    <div style={{
      padding: 24,
      background: C.white,
      border: hairline,
      borderTop: `2px solid ${accent ? C.accent : 'var(--bf-border-strong)'}`,
    }}>
      <p style={{
        fontFamily: mono, fontSize: 9, letterSpacing: '0.12em',
        color: C.steel, margin: '0 0 10px', textTransform: 'uppercase' as const,
        fontWeight: 600,
      }}>{label}</p>
      <h3 style={{
        fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em',
        color: C.black, margin: '0 0 12px', fontFamily: sans,
      }}>{title}</h3>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: C.steel, margin: 0 }}>{desc}</p>
    </div>
  )
}

// ─── Rules card ──────────────────────────────────────────────────────────────
function RuleCard({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <div style={{
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      padding: '20px',
      background: C.white,
      border: hairline,
    }}>
      <span style={{ fontFamily: mono, fontSize: 12, color: C.platinum, fontWeight: 600, flexShrink: 0 }}>
        {index}.
      </span>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: C.black, margin: '0 0 4px' }}>{title}</p>
        <p style={{ fontSize: 13, color: C.steel, margin: 0, fontStyle: 'italic' as const }}>— {desc}</p>
      </div>
    </div>
  )
}

// ─── Spec pill ───────────────────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      padding: '12px 0',
      borderBottom: hairline,
      alignItems: 'center',
      gap: 16,
    }}>
      <span style={{ fontFamily: mono, fontSize: 11, color: C.steel, letterSpacing: '0.04em' }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 12, color: C.black }}>{value}</span>
    </div>
  )
}

// ─── Main section export ─────────────────────────────────────────────────────
export function GrafismoTecnico() {
  const { t } = useLang()

  return (
    <section id="grafismo-tecnico">

      {/* ── Section header ── */}
      <SectionHeader eyebrow={t('grafismo.eyebrow')}>
        {t('grafismo.title')}
      </SectionHeader>

      {/* ── Lead paragraph ── */}
      <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('grafismo.lead')}</Lead>
      </FocusReveal>

      {/* ── Live demo ── */}
      <div style={{ scrollMarginTop: 88 }}>
        <SubHeader
          label={t('grafismo.demo.label')}
          title={t('grafismo.demo.title')}
        />

        <FocusReveal style={{ padding: `0 ${H_PAD}px 64px` }}>
          <SchematicDemo t={t} />
          <p style={{
            fontFamily: mono, fontSize: 9.5,
            color: C.platinum, marginTop: 14, letterSpacing: '0.04em',
          }}>
            {t('grafismo.note')}
          </p>
        </FocusReveal>
      </div>

      {/* ── Anatomy ── */}
      <div style={{ scrollMarginTop: 88 }}>
        <SubHeader
          label={t('grafismo.sub.anatomy.label')}
          title={t('grafismo.sub.anatomy.title')}
        />

        <FocusReveal style={{ padding: `0 ${H_PAD}px 0` }}>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, maxWidth: 640, marginBottom: 32 }}>
            {t('grafismo.anatomy.desc')}
          </p>
        </FocusReveal>

        <div style={{
          margin: `0 ${H_PAD}px 64px`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16,
        }}>
          <AnatomyCard
            label={t('grafismo.orbit.label')}
            title={t('grafismo.orbit.title')}
            desc={t('grafismo.orbit.desc')}
            accent
          />
          <AnatomyCard
            label={t('grafismo.counters.label')}
            title={t('grafismo.counters.title')}
            desc={t('grafismo.counters.desc')}
          />
          <AnatomyCard
            label={t('grafismo.units.label')}
            title={t('grafismo.units.title')}
            desc={t('grafismo.units.desc')}
          />
        </div>
      </div>

      {/* ── Technical specifications ── */}
      <div style={{ margin: `0 ${H_PAD}px 64px` }}>
        <p style={{
          fontFamily: mono, fontSize: 10, letterSpacing: '0.1em',
          color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const,
        }}>
          {t('grafismo.specs.label')}
        </p>
        <SpecRow label="--dur-ambient"          value="6000ms" />
        <SpecRow label="--ease-out"             value="cubic-bezier(0.16, 1, 0.3, 1)" />
        <SpecRow label="bf-orbit-draw delay"    value="0s / 0.5s / 1s (3 rings)" />
        <SpecRow label="bf-node-pulse range"    value="3.2s – 4.8s" />
        <SpecRow label="bf-ant range"           value="0s – 3.9s (distributed)" />
        <SpecRow label="bf-digit-roll range"    value="5.5s – 7s (steps(1))" />
        <SpecRow label="--bf-line-on-dark"      value="rgba(168, 201, 229, 0.20)" />
        <SpecRow label="--bf-line-on-dark-strong" value="rgba(168, 201, 229, 0.32)" />
        <SpecRow label="--current-accent (hot)" value="randomised from 12 Highlights / SSR → --bf-spfc" />
        <SpecRow label="prefers-reduced-motion" value="animation: none !important → still schematic" />
      </div>

      {/* ── Usage rules ── */}
      <div style={{ scrollMarginTop: 88 }}>
        <SubHeader
          label={t('grafismo.rules.label')}
          title={t('grafismo.rules.title')}
        />

        <div style={{
          margin: `0 ${H_PAD}px 64px`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}>
          <RuleCard index={1} title={t('grafismo.rule1.title')} desc={t('grafismo.rule1.desc')} />
          <RuleCard index={2} title={t('grafismo.rule2.title')} desc={t('grafismo.rule2.desc')} />
          <RuleCard index={3} title={t('grafismo.rule3.title')} desc={t('grafismo.rule3.desc')} />
          <RuleCard index={4} title={t('grafismo.rule4.title')} desc={t('grafismo.rule4.desc')} />
        </div>
      </div>

      {/* ── Page footer ── */}
      <PageFooter line={t('page.footer.line')} />

    </section>
  )
}
