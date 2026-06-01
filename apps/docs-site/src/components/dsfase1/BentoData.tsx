'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { useLang } from '@/content'
import {
  Activity,
  Zap,
  Target,
  TrendingUp,
  Users,
  Clock,
} from 'lucide-react'

// ─── Token aliases ────────────────────────────────────────────────────────────
const C = {
  black:       'var(--bf-text-primary)',
  bg:          'var(--bf-bg-page)',
  surface:     'var(--bf-surface)',
  surfaceSubtle: 'var(--bf-surface-subtle)',
  steel:       'var(--bf-text-secondary)',
  subtle:      'var(--bf-text-subtle)',
  border:      'var(--bf-border)',
  accent:      'var(--current-accent)',
  powerBlack:  '#061015',
}

const mono   = '"JetBrains Mono", monospace'
const sans   = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD  = 72

// ─── Local atoms (canonical pattern from OperationsSection) ──────────────────
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
    <h1
      className="text-balance"
      style={{
        fontSize: 52,
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: C.black,
        margin: '0 0 20px',
        lineHeight: 1.0,
        fontFamily: sans,
      }}
    >
      {children}
    </h1>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="editorial-prose text-pretty"
      style={{
        fontSize: 15,
        lineHeight: 1.7,
        color: C.steel,
        margin: 0,
        maxWidth: 640,
      }}
    >
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div
      className="bf-text-reveal"
      style={{ padding: `80px ${H_PAD}px 56px`, borderBottom: hairline }}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div
      className="bf-text-reveal"
      style={{ padding: `56px ${H_PAD}px 28px` }}
    >
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>
        {label}
      </p>
      <h2
        className="text-balance"
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: C.black,
          margin: 0,
          lineHeight: 1.1,
          fontFamily: sans,
        }}
      >
        {title}
      </h2>
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

// ─── Intersection-observer hook ───────────────────────────────────────────────
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

// ─── Sparkline bar ────────────────────────────────────────────────────────────
// heights as 0–1 normalised values; last bar is "hot" (accent colour)
const SPARK_DATA = [0.40, 0.55, 0.48, 0.70, 1.00, 0.82, 0.64, 0.90, 0.58, 0.74]

function Sparkline({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        height: 32,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 3,
      }}
    >
      {SPARK_DATA.map((h, i) => {
        const isHot = i === 4 // peak bar gets accent
        return (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 1,
              background: isHot ? C.accent : 'rgba(168,201,229,0.25)',
              height: inView ? `${h * 100}%` : '4%',
              transition: `height 480ms cubic-bezier(0.16,1,0.3,1) ${100 + i * 40}ms`,
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Pill group ───────────────────────────────────────────────────────────────
function Pill({
  children,
  active = false,
}: {
  children: string
  active?: boolean
}) {
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 8.5,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        border: active ? 'none' : hairline,
        borderRadius: 'var(--bf-radius-pill)',
        padding: '3px 9px',
        color: active ? '#fff' : C.steel,
        background: active ? C.accent : 'transparent',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  )
}

// ─── Count-up helper ──────────────────────────────────────────────────────────
function useCountUp(target: number, decimals: number, inView: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf: number
    const dur = 820
    let start: DOMHighResTimeStamp | null = null
    function frame(ts: DOMHighResTimeStamp) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / dur, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(target * eased)
      if (progress < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])
  return decimals > 0
    ? parseFloat(val.toFixed(decimals))
    : Math.round(val)
}

// ─── Individual bento cells ───────────────────────────────────────────────────

/** Large left cell — index score + pill group */
function CellAthleteIndex({
  labelAtleta, labelIndice, labelOnField, labelDossie, inView,
}: {
  labelAtleta: string
  labelIndice: string
  labelOnField: string
  labelDossie: string
  inView: boolean
}) {
  const val = useCountUp(94.2, 1, inView)
  return (
    <div
      style={{
        gridRow: 'span 2',
        border: hairline,
        background: C.surface,
        borderRadius: 'var(--bf-corner-2)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 320ms ease-out, transform 320ms ease-out',
      }}
    >
      <p style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle, margin: 0 }}>
        {labelAtleta} · {labelIndice}
      </p>
      <div>
        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 40, letterSpacing: '-0.03em', color: C.black, lineHeight: 1, marginBottom: 12 }}>
          {val.toFixed(1)}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Pill active>{labelOnField}</Pill>
          <Pill>{labelDossie}</Pill>
        </div>
      </div>
    </div>
  )
}

/** Small stat cell (velocity / pass / games) */
function CellStat({
  label, value, unit, delay, inView,
}: {
  label: string
  value: number
  unit: string
  delay: number
  inView: boolean
}) {
  const val = useCountUp(value, unit === 'km/h' ? 1 : 0, inView)
  return (
    <div
      style={{
        border: hairline,
        background: C.surface,
        borderRadius: 'var(--bf-corner-2)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 320ms ease-out ${delay}ms, transform 320ms ease-out ${delay}ms`,
      }}
    >
      <p style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle, margin: 0 }}>
        {label}
      </p>
      <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: C.black, lineHeight: 1 }}>
        {unit === 'km/h' ? (val as number).toFixed(1) : val}
        <span style={{ fontSize: 11, fontWeight: 400, color: C.subtle, marginLeft: 2 }}>{unit}</span>
      </div>
    </div>
  )
}

/** Wide dark sparkline cell */
function CellSparkline({
  label, inView,
}: {
  label: string
  inView: boolean
}) {
  return (
    <div
      style={{
        gridColumn: 'span 2',
        background: C.powerBlack,
        border: 'none',
        borderRadius: 'var(--bf-corner-2)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 400ms ease-out 120ms, transform 400ms ease-out 120ms',
      }}
    >
      <p style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(168,201,229,0.45)', margin: 0 }}>
        {label}
      </p>
      <Sparkline inView={inView} />
    </div>
  )
}

/** Icon + stat cell (used for KPI cluster) */
function CellIconStat({
  label, value, unit, Icon, delay, inView,
}: {
  label: string
  value: number
  unit: string
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  delay: number
  inView: boolean
}) {
  const val = useCountUp(value, 0, inView)
  return (
    <div
      style={{
        border: hairline,
        background: C.surface,
        borderRadius: 'var(--bf-corner-2)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 320ms ease-out ${delay}ms, transform 320ms ease-out ${delay}ms`,
      }}
    >
      <div style={{ color: C.steel, opacity: 0.45 }}>
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div>
        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: C.black, lineHeight: 1 }}>
          {val}
          <span style={{ fontSize: 11, fontWeight: 400, color: C.subtle, marginLeft: 2 }}>{unit}</span>
        </div>
        <p style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.subtle, margin: '6px 0 0' }}>
          {label}
        </p>
      </div>
    </div>
  )
}

/** Accent highlight cell — single large number on coloured background */
function CellAccent({
  label, value, unit, delay, inView,
}: {
  label: string
  value: number
  unit: string
  delay: number
  inView: boolean
}) {
  const val = useCountUp(value, 0, inView)
  return (
    <div
      style={{
        border: 'none',
        background: C.accent,
        borderRadius: 'var(--bf-corner-2)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 320ms ease-out ${delay}ms, transform 320ms ease-out ${delay}ms`,
      }}
    >
      <p style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
        {label}
      </p>
      <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1 }}>
        {val}
        <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.7)', marginLeft: 2 }}>{unit}</span>
      </div>
    </div>
  )
}

/** Wide rule/description cell */
function CellDescription({
  label, text, inView,
}: {
  label: string
  text: string
  inView: boolean
}) {
  return (
    <div
      style={{
        gridColumn: 'span 3',
        border: hairline,
        background: C.surfaceSubtle,
        borderRadius: 'var(--bf-corner-2)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        opacity: inView ? 1 : 0,
        transition: 'opacity 400ms ease-out 200ms',
      }}
    >
      <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.subtle, margin: 0, whiteSpace: 'nowrap' }}>
        {label}
      </p>
      <div style={{ width: 1, height: 24, background: C.border, flexShrink: 0 }} />
      <p style={{ fontFamily: sans, fontSize: 13, color: C.steel, margin: 0, lineHeight: 1.5, maxWidth: 680 }}>
        {text}
      </p>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function BentoData() {
  const { t } = useLang()

  // Grid 1 — athlete profile bento
  const grid1Ref = useRef<HTMLDivElement>(null)
  const grid1InView = useInView(grid1Ref)

  // Grid 2 — KPI cluster bento
  const grid2Ref = useRef<HTMLDivElement>(null)
  const grid2InView = useInView(grid2Ref)

  return (
    <section id="bento">

      {/* ── Section header ── */}
      <SectionHeader eyebrow={t('bento.eyebrow')}>
        {t('bento.title')}
      </SectionHeader>

      {/* ── Lead ── */}
      <FocusReveal style={{ padding: `40px ${H_PAD}px 0` }}>
        <Lead>{t('bento.lead')}</Lead>
      </FocusReveal>

      {/* ── Anatomy sub-section ── */}
      <SubHeader label={t('bento.anatomy.label')} title={t('bento.anatomy.title')} />

      <FocusReveal style={{ padding: `0 ${H_PAD}px 32px` }}>
        <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.65, color: C.steel, margin: 0, maxWidth: 640 }}>
          {t('bento.anatomy.desc')}
        </p>
      </FocusReveal>

      {/* ── Bento Grid 1 — athlete profile ── */}
      <div
        ref={grid1Ref}
        style={{
          margin: `0 ${H_PAD}px 48px`,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gridAutoRows: 96,
          gap: 10,
        }}
      >
        {/* Large left: athlete index */}
        <CellAthleteIndex
          labelAtleta={t('bento.cell.atleta')}
          labelIndice={t('bento.cell.indice')}
          labelOnField={t('bento.cell.onfield')}
          labelDossie={t('bento.cell.dossie')}
          inView={grid1InView}
        />

        {/* Top-right pair */}
        <CellStat label={t('bento.cell.velocidade')} value={32.4} unit="km/h" delay={60}  inView={grid1InView} />
        <CellStat label={t('bento.cell.passe')}      value={91}   unit="%"    delay={120} inView={grid1InView} />

        {/* Wide dark sparkline */}
        <CellSparkline label={t('bento.cell.temporada')} inView={grid1InView} />

        {/* Bottom-right: games */}
        <CellStat label={t('bento.cell.jogos')} value={28} unit="" delay={180} inView={grid1InView} />
      </div>

      {/* ── Anatomy rule strip ── */}
      <FocusReveal style={{ margin: `0 ${H_PAD}px 64px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {([
            ['bento.rule1.label', 'bento.rule1.desc'],
            ['bento.rule2.label', 'bento.rule2.desc'],
            ['bento.rule3.label', 'bento.rule3.desc'],
          ] as [string, string][]).map(([lKey, dKey]) => (
            <div
              key={lKey}
              style={{
                padding: '16px 20px',
                border: hairline,
                borderRadius: 'var(--bf-corner-2)',
                background: C.surface,
              }}
            >
              <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.accent, margin: '0 0 8px' }}>
                {t(lKey)}
              </p>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.steel, margin: 0, lineHeight: 1.5 }}>
                {t(dKey)}
              </p>
            </div>
          ))}
        </div>
      </FocusReveal>

      {/* ── KPI cluster sub-section ── */}
      <div style={{ borderTop: hairline }}>
        <SubHeader label={t('bento.kpi.label')} title={t('bento.kpi.title')} />
      </div>

      <FocusReveal style={{ padding: `0 ${H_PAD}px 32px` }}>
        <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.65, color: C.steel, margin: 0, maxWidth: 640 }}>
          {t('bento.kpi.desc')}
        </p>
      </FocusReveal>

      {/* ── Bento Grid 2 — KPI cluster ── */}
      <div
        ref={grid2Ref}
        style={{
          margin: `0 ${H_PAD}px 48px`,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: 96,
          gap: 10,
        }}
      >
        {/* Row 1 */}
        <CellIconStat label={t('bento.kpi.minutos')}  value={2340} unit="min" Icon={Clock}     delay={0}   inView={grid2InView} />
        <CellIconStat label={t('bento.kpi.gols')}     value={18}   unit=""    Icon={Target}    delay={60}  inView={grid2InView} />
        <CellIconStat label={t('bento.kpi.assistencias')} value={11} unit=""  Icon={Zap}       delay={120} inView={grid2InView} />
        <CellAccent   label={t('bento.kpi.nota')}     value={87}   unit="/100"             delay={180} inView={grid2InView} />

        {/* Row 2 */}
        <CellIconStat label={t('bento.kpi.distancia')}  value={312} unit="km"  Icon={Activity}  delay={60}  inView={grid2InView} />
        <CellIconStat label={t('bento.kpi.sprints')}    value={847} unit=""    Icon={TrendingUp} delay={120} inView={grid2InView} />
        <CellIconStat label={t('bento.kpi.clubes')}     value={3}   unit=""    Icon={Users}     delay={180} inView={grid2InView} />
        <CellIconStat label={t('bento.kpi.temporadas')} value={6}   unit=""    Icon={Clock}     delay={240} inView={grid2InView} />

        {/* Full-width description footer */}
        <CellDescription
          label={t('bento.kpi.nota.label')}
          text={t('bento.kpi.nota.desc')}
          inView={grid2InView}
        />
      </div>

      {/* ── Tokens used strip ── */}
      <FocusReveal style={{ margin: `0 ${H_PAD}px 64px` }}>
        <div style={{
          padding: '24px 32px',
          background: C.powerBlack,
          borderRadius: 'var(--bf-corner-2)',
          display: 'flex',
          gap: 48,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(168,201,229,0.45)', margin: '0 0 8px' }}>
              {t('bento.tokens.label')}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['--bf-corner-*', '--current-accent', '--bf-border', '--bf-surface'].map(tok => (
                <span
                  key={tok}
                  style={{
                    fontFamily: mono,
                    fontSize: 9,
                    letterSpacing: '0.06em',
                    color: 'rgba(168,201,229,0.7)',
                    border: '1px solid rgba(168,201,229,0.2)',
                    borderRadius: 'var(--bf-corner-2)',
                    padding: '3px 8px',
                  }}
                >
                  {tok}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(168,201,229,0.45)', margin: '0 0 8px' }}>
              {t('bento.tokens.pattern')}
            </p>
            <p style={{ fontFamily: sans, fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
              {t('bento.tokens.desc')}
            </p>
          </div>
        </div>
      </FocusReveal>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}
