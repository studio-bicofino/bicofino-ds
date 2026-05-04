'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: 'var(--bf-text-primary)',
  white: 'var(--bf-surface)',
  steel: 'var(--bf-text-secondary)',
  bg:    'var(--bf-bg-page)',
}
const mono = '"JetBrains Mono", monospace'
const ease = 'cubic-bezier(0.2,0,0,1)'

type Mode   = 'time-saved' | 'output' | 'cost-reduction'
type Period = 'day' | 'week' | 'month' | 'year'

/* ─── Chart geometry ─── */
const CX = { x0: 48, x1: 640, y0: 16, y1: 180, n: 7 }
const xs = Array.from({ length: CX.n }, (_, i) => CX.x0 + i * ((CX.x1 - CX.x0) / (CX.n - 1)))

function toY(norm: number) { return CX.y1 - norm * (CX.y1 - CX.y0) }

/* ─── Data ─── */
const NORM: Record<Mode, { trad: number[]; bico: number[] }> = {
  'time-saved':     { trad: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30], bico: [0, 0.05, 0.13, 0.27, 0.46, 0.68, 0.92] },
  'output':         { trad: [0, 0.04, 0.08, 0.12, 0.16, 0.20, 0.24], bico: [0, 0.06, 0.15, 0.31, 0.52, 0.75, 0.96] },
  'cost-reduction': { trad: [0, 0.03, 0.06, 0.09, 0.12, 0.16, 0.20], bico: [0, 0.05, 0.12, 0.26, 0.44, 0.60, 0.74] },
}

const META: Record<Mode, { yLabel: string; peak: string; peakNote: string }> = {
  'time-saved':     { yLabel: 'Hours / Week',      peak: '+127%', peakNote: 'efficiency gain'        },
  'output':         { yLabel: 'Output Multiplier', peak: '+3.2×', peakNote: 'vs. traditional'        },
  'cost-reduction': { yLabel: 'Cost Savings',      peak: '−64%',  peakNote: 'operational overhead'   },
}

const X_LABELS: Record<Period, string[]> = {
  day:   ['9AM', '11AM', '1PM', '3PM', '5PM', '7PM', '9PM'],
  week:  ['Mon', 'Tue',  'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  month: ['W1',  'W2',   'W3',  'W4',  'W5',  'W6',  'W7'],
  year:  ['Q1',  'Q2',   'Q3',  'Q4',  'Q5',  'Q6',  'Q7'],
}

function buildPoints(norms: number[]) {
  return norms.map((n, i) => `${xs[i]},${toY(n)}`).join(' ')
}

function buildArea(tradNorms: number[], bicoNorms: number[]) {
  const fwd = tradNorms.map((n, i) => `${xs[i]},${toY(n)}`).join(' ')
  const rev = [...bicoNorms].reverse().map((n, i) => `${xs[CX.n - 1 - i]},${toY(n)}`).join(' ')
  return `${fwd} ${rev}`
}

/* ─── Underline-style toggle — no pills ─── */
function Toggle<T extends string>({
  options, value, onChange, size = 'md',
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
  size?: 'sm' | 'md'
}) {
  return (
    <div style={{ display: 'flex', gap: 0, alignItems: 'flex-end' }}>
      {options.map(({ id, label }, i) => {
        const active = value === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: active ? C.black : 'rgba(109,120,134,0.45)',
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${active ? C.black : 'var(--bf-border)'}`,
              padding: size === 'sm' ? '3px 10px 5px' : '3px 14px 5px',
              cursor: 'pointer',
              fontWeight: active ? 600 : 400,
              transition: `color 140ms ${ease}, border-color 140ms ${ease}`,
              whiteSpace: 'nowrap' as const,
              marginRight: i < options.length - 1 ? 6 : 0,
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function PerformanceChart() {
  const [mode, setMode]             = useState<Mode>('time-saved')
  const [period, setPeriod]         = useState<Period>('week')
  const [drawing, setDrawing]       = useState(false)
  const [visible, setVisible]       = useState(true)
  const [activeMode, setActiveMode] = useState<Mode>('time-saved')

  const wrapRef = useRef<HTMLDivElement>(null)
  const tradRef = useRef<SVGPolylineElement>(null)
  const bicoRef = useRef<SVGPolylineElement>(null)

  /* Trigger draw on scroll entry — once only */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setDrawing(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Reset dasharray after mode change */
  useEffect(() => {
    const tEl = tradRef.current
    const bEl = bicoRef.current
    if (tEl) {
      const l = tEl.getTotalLength()
      tEl.style.strokeDasharray  = `${l}`
      tEl.style.strokeDashoffset = `${l}`
    }
    if (bEl) {
      const l = bEl.getTotalLength()
      bEl.style.strokeDasharray  = `${l}`
      bEl.style.strokeDashoffset = `${l}`
    }
  }, [activeMode])

  /* Animate on scroll entry or mode switch */
  useEffect(() => {
    if (!drawing) return
    const tEl = tradRef.current
    const bEl = bicoRef.current
    if (tEl) tEl.style.strokeDashoffset = '0'
    if (bEl) {
      setTimeout(() => { if (bEl) bEl.style.strokeDashoffset = '0' }, 420)
    }
  }, [drawing, activeMode])

  function switchMode(m: Mode) {
    if (m === mode) return
    setMode(m)
    setVisible(false)
    setTimeout(() => {
      setActiveMode(m)
      setTimeout(() => {
        const tEl = tradRef.current
        const bEl = bicoRef.current
        if (tEl) { const l = tEl.getTotalLength(); tEl.style.strokeDasharray = `${l}`; tEl.style.strokeDashoffset = `${l}` }
        if (bEl) { const l = bEl.getTotalLength(); bEl.style.strokeDasharray = `${l}`; bEl.style.strokeDashoffset = `${l}` }
        setVisible(true)
        setTimeout(() => {
          if (tradRef.current) tradRef.current.style.strokeDashoffset = '0'
          if (bicoRef.current) setTimeout(() => { if (bicoRef.current) bicoRef.current.style.strokeDashoffset = '0' }, 420)
        }, 20)
      }, 20)
    }, 160)
  }

  const { trad, bico } = NORM[activeMode]
  const { yLabel, peak, peakNote } = META[activeMode]
  const tradPts = buildPoints(trad)
  const bicoPts = buildPoints(bico)
  const areaPts = buildArea(trad, bico)

  /* Divergence label — midpoint of gap at the final segment */
  const lastTrad = trad[CX.n - 1]
  const lastBico = bico[CX.n - 1]
  const labelX   = xs[CX.n - 1] - 10
  const labelY   = toY((lastTrad + lastBico) / 2)

  const chartOpacity = visible ? 1 : 0

  return (
    <div ref={wrapRef}>
      {/* Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap' as const,
        gap: 12,
        marginBottom: 24,
      }}>
        <Toggle<Mode>
          options={[
            { id: 'time-saved',     label: 'Time Saved'     },
            { id: 'output',         label: 'Output'         },
            { id: 'cost-reduction', label: 'Cost Reduction' },
          ]}
          value={mode}
          onChange={switchMode}
        />
        <Toggle<Period>
          options={[
            { id: 'day',   label: 'Day'   },
            { id: 'week',  label: 'Week'  },
            { id: 'month', label: 'Month' },
            { id: 'year',  label: 'Year'  },
          ]}
          value={period}
          onChange={setPeriod}
          size="sm"
        />
      </div>

      {/* Chart */}
      <div style={{
        position: 'relative',
        background: C.white,
        border: '1px solid var(--bf-border)',
        borderRadius: 4,
        overflow: 'hidden',
        padding: '20px 20px 4px',
      }}>
        {/* Y-axis label */}
        <p style={{
          fontFamily: mono,
          fontSize: 9,
          color: 'rgba(109,120,134,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          margin: '0 0 8px',
          opacity: chartOpacity,
          transition: `opacity 160ms ${ease}`,
        }}>
          {yLabel}
        </p>

        <svg
          viewBox="0 0 680 210"
          style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
        >
          {/* Horizontal grid lines — extremely subtle */}
          {[0.25, 0.5, 0.75, 1.0].map(v => (
            <line
              key={v}
              x1={CX.x0} y1={toY(v)}
              x2={CX.x1} y2={toY(v)}
              stroke="var(--bf-border)"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis value marks */}
          {[0.25, 0.5, 0.75, 1.0].map(v => (
            <text
              key={`yl-${v}`}
              x={CX.x0 - 6}
              y={toY(v) + 3}
              fontFamily={mono}
              fontSize={8}
              style={{ fill: 'var(--bf-text-subtle)' }}
              textAnchor="end"
            >
              {Math.round(v * 100)}
            </text>
          ))}

          {/* Fill area — very low opacity, fades in after lines draw */}
          <polygon
            points={areaPts}
            fill="var(--bf-border)"
            style={{
              opacity: drawing ? chartOpacity : 0,
              transition: `opacity 500ms ${ease} 1000ms`,
            }}
          />

          {/* Traditional line — draws linearly, steady pace */}
          <polyline
            ref={tradRef}
            points={tradPts}
            fill="none"
            stroke="rgba(109,120,134,0.45)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: chartOpacity,
              transition: `opacity 160ms ${ease}, stroke-dashoffset 1000ms linear`,
            }}
          />

          {/* Bicofino line — ease-out after delay, accelerates away from traditional */}
          <polyline
            ref={bicoRef}
            points={bicoPts}
            fill="none"
            stroke={C.black}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: chartOpacity,
              transition: `opacity 160ms ${ease}, stroke-dashoffset 820ms cubic-bezier(0.16,1,0.3,1) 420ms`,
            }}
          />

          {/* Divergence label — plain text, no badge */}
          <g
            style={{
              opacity: drawing ? chartOpacity : 0,
              transition: `opacity 320ms ${ease} 1300ms`,
            }}
          >
            <text
              x={labelX}
              y={labelY - 5}
              fontFamily={mono}
              fontSize={9}
              fontWeight={600}
              letterSpacing="0.06em"
              fill={C.black}
              textAnchor="end"
            >
              {peak}
            </text>
            <text
              x={labelX}
              y={labelY + 8}
              fontFamily={mono}
              fontSize={8}
              letterSpacing="0.04em"
              style={{ fill: 'var(--bf-text-subtle)' }}
              textAnchor="end"
            >
              {peakNote}
            </text>
          </g>

          {/* X-axis labels */}
          {xs.map((x, i) => (
            <text
              key={i}
              x={x}
              y={200}
              fontFamily={mono}
              fontSize={9}
              style={{ fill: 'var(--bf-text-subtle)' }}
              textAnchor="middle"
              letterSpacing="0.03em"
            >
              {X_LABELS[period][i]}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', paddingTop: 4, paddingBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 1, background: 'rgba(109,120,134,0.45)' }} />
            <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(109,120,134,0.5)', letterSpacing: '0.08em' }}>Traditional</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 1.5, background: C.black, borderRadius: 1 }} />
            <span style={{ fontFamily: mono, fontSize: 9, color: C.steel, letterSpacing: '0.08em' }}>Bicofino OS</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(109,120,134,0.45)', letterSpacing: '0.06em' }}>
              {peak} {peakNote}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
