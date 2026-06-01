'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Home, Search, Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Plus, Minus, Edit2, Trash2,
  Copy, Download, Upload, Share2, Link, ExternalLink,
  Check, AlertCircle, AlertTriangle, Info, HelpCircle, Bell,
  Play, Pause, Volume2, Camera, Mic, Settings, Sliders, Filter,
  Grid, List, LayoutGrid,
  Briefcase, Globe, Target, Star, Heart, TrendingUp, BarChart2,
  Code, Terminal, Cpu, Wifi, Lock, Shield, User, Users,
  Mail, Phone, Calendar, Clock, Tag, Bookmark, Zap, Activity,
  Timer, TrendingDown, Layers, Package, Eye, Send,
  type LucideIcon,
} from 'lucide-react'
import { useLang } from '@/content/index'

/* ─── Shared tokens ─── */
const C = {
  black:    'var(--bf-text-primary)',
  surface:  'var(--bf-surface)',
  steel:    'var(--bf-text-secondary)',
  platinum: 'var(--bf-text-subtle)',
  accent:   'var(--bf-accent)',
  border:   'var(--bf-border)',
  bg:       'var(--bf-bg-page)',
  aluminium: '#e2eaf2',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const ease = 'cubic-bezier(0.2,0,0,1)'
const H_PAD = 'clamp(16px, 6vw, 72px)'

/* ─── Shared layout atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: '0.12em',
      color: C.steel,
      margin: '0 0 14px',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance section-title" style={{
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: C.black,
        margin: '0 0 20px',
        lineHeight: 1.0,
        fontFamily: sans,
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: 15,
        lineHeight: 1.7,
        color: C.steel,
        margin: 0,
        maxWidth: 580,
        fontFamily: sans,
      }}>
        {lead}
      </p>
    </div>
  )
}

function SubHeader({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h3 className="text-balance" style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: C.black,
        margin: 0,
        lineHeight: 1.1,
        fontFamily: sans,
      }}>
        {title}
      </h3>
      {desc && (
        <p style={{ fontSize: 14, lineHeight: 1.6, color: C.steel, margin: '10px 0 0', maxWidth: 480, fontFamily: sans }}>
          {desc}
        </p>
      )}
    </div>
  )
}

function PageFooter() {
  return (
    <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        // BICOFINO DESIGN STUDIO · 2026
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Chart geometry & data (ported from docs-site PerformanceChart)
   ═══════════════════════════════════════════════════════════ */

type Mode   = 'time-saved' | 'output' | 'cost-reduction'
type Period = 'day' | 'week' | 'month' | 'year'

const CX = { x0: 48, x1: 640, y0: 16, y1: 180, n: 7 }
const xs = Array.from({ length: CX.n }, (_, i) => CX.x0 + i * ((CX.x1 - CX.x0) / (CX.n - 1)))

function toY(norm: number) { return CX.y1 - norm * (CX.y1 - CX.y0) }

const NORM: Record<Mode, { trad: number[]; bico: number[] }> = {
  'time-saved':     { trad: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30], bico: [0, 0.05, 0.13, 0.27, 0.46, 0.68, 0.92] },
  'output':         { trad: [0, 0.04, 0.08, 0.12, 0.16, 0.20, 0.24], bico: [0, 0.06, 0.15, 0.31, 0.52, 0.75, 0.96] },
  'cost-reduction': { trad: [0, 0.03, 0.06, 0.09, 0.12, 0.16, 0.20], bico: [0, 0.05, 0.12, 0.26, 0.44, 0.60, 0.74] },
}

const META: Record<Mode, { yLabel: string; peak: string; peakNote: string }> = {
  'time-saved':     { yLabel: 'Hours / Week',      peak: '+127%', peakNote: 'efficiency gain'      },
  'output':         { yLabel: 'Output Multiplier', peak: '+3.2×', peakNote: 'vs. traditional'      },
  'cost-reduction': { yLabel: 'Cost Savings',      peak: '−64%',  peakNote: 'operational overhead' },
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

/* ─── Underline-style toggle ─── */
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

/* ═══════════════════════════════════════════════════════════
   05.1 — Performance Intelligence
   ═══════════════════════════════════════════════════════════ */
function PerformanceSection() {
  const { t } = useLang()

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

  const lastTrad = trad[CX.n - 1]
  const lastBico = bico[CX.n - 1]
  const labelX   = xs[CX.n - 1] - 10
  const labelY   = toY((lastTrad + lastBico) / 2)
  const chartOpacity = visible ? 1 : 0

  /* Metric cards data */
  const metrics = [
    { value: '15h',    label: t('assets_perf_c1_label'), desc: t('assets_perf_c1_desc') },
    { value: '3.2×',   label: t('assets_perf_c2_label'), desc: t('assets_perf_c2_desc') },
    { value: '−64%',   label: t('assets_perf_c3_label'), desc: t('assets_perf_c3_desc') },
    { value: '+127%',  label: t('assets_perf_c4_label'), desc: t('assets_perf_c4_desc') },
    { value: '24',     label: t('assets_perf_c5_label'), desc: t('assets_perf_c5_desc') },
    { value: '<200ms', label: t('assets_perf_c6_label'), desc: t('assets_perf_c6_desc') },
  ]

  return (
    <section id="performance" style={{ borderTop: hairline }}>
      <SubHeader
        label="// 05.1"
        title={t('assets_perf_heading')}
        desc={t('assets_perf_lead')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px` }}>

        {/* Metric cards — 3×2 grid */}
        <p style={{
          fontFamily: mono,
          fontSize: 9,
          letterSpacing: '0.1em',
          color: C.steel,
          margin: '0 0 16px',
          textTransform: 'uppercase' as const,
        }}>
          // {t('assets_perf_metrics_title')}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 1,
          background: 'var(--bf-border)',
          border: hairline,
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 48,
        }}>
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                background: C.bg,
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <p style={{
                fontFamily: mono,
                fontSize: 9,
                letterSpacing: '0.1em',
                color: C.steel,
                margin: 0,
                textTransform: 'uppercase' as const,
              }}>
                {m.label}
              </p>
              <p style={{
                fontFamily: sans,
                fontSize: 36,
                fontWeight: 700,
                color: C.black,
                margin: 0,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>
                {m.value}
              </p>
              <p style={{
                fontFamily: sans,
                fontSize: 12,
                color: C.steel,
                margin: 0,
                lineHeight: 1.4,
              }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <p style={{
          fontFamily: mono,
          fontSize: 9,
          letterSpacing: '0.1em',
          color: C.steel,
          margin: '0 0 24px',
          textTransform: 'uppercase' as const,
        }}>
          // {t('assets_perf_chart_title')}
        </p>

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

          {/* Chart canvas */}
          <div style={{
            position: 'relative',
            background: C.surface,
            border: hairline,
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
              {/* Horizontal grid lines */}
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

              {/* Fill area */}
              <polygon
                points={areaPts}
                fill="var(--bf-border)"
                style={{
                  opacity: drawing ? chartOpacity : 0,
                  transition: `opacity 500ms ${ease} 1000ms`,
                }}
              />

              {/* Traditional line */}
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

              {/* Bicofino line */}
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

              {/* Divergence label */}
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

          {/* Chart lead */}
          <p style={{
            fontFamily: sans,
            fontSize: 13,
            lineHeight: 1.65,
            color: C.steel,
            margin: '16px 0 0',
            maxWidth: 560,
          }}>
            {t('assets_perf_chart_lead')}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   05.2 — Sponsors
   ═══════════════════════════════════════════════════════════ */
const SPONSORS: { name: string; category: string }[] = [
  { name: 'Nike',          category: 'Apparel'    },
  { name: 'Adidas',        category: 'Apparel'    },
  { name: 'Puma',          category: 'Apparel'    },
  { name: 'EA Sports',     category: 'Gaming'     },
  { name: 'Betano',        category: 'Betting'    },
  { name: 'Penalty',       category: 'Equipment'  },
  { name: 'Oakley',        category: 'Eyewear'    },
  { name: 'Red Bull',      category: 'Energy'     },
  { name: 'Gatorade',      category: 'Nutrition'  },
  { name: 'Globo Esporte', category: 'Media'      },
  { name: 'Sportv',        category: 'Media'      },
  { name: 'ESPN Brasil',   category: 'Media'      },
]

function SponsorsSection() {
  const { t } = useLang()

  return (
    <section id="sponsors" style={{ borderTop: hairline }}>
      <SubHeader
        label="// 05.2"
        title={t('assets_sponsors_heading')}
        desc={t('assets_sponsors_lead')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px` }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 1,
          background: 'var(--bf-border)',
          border: hairline,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          {SPONSORS.map(({ name, category }) => (
            <div
              key={name}
              style={{
                background: C.bg,
                padding: '24px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <p style={{
                fontFamily: mono,
                fontSize: 9,
                letterSpacing: '0.1em',
                color: C.steel,
                margin: 0,
                textTransform: 'uppercase' as const,
              }}>
                {category}
              </p>
              <p style={{
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 600,
                color: C.black,
                margin: 0,
                letterSpacing: '-0.01em',
              }}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   05.3 — Icons
   ═══════════════════════════════════════════════════════════ */
type LucideEntry = { name: string; Icon: LucideIcon }

const ICON_LIST: LucideEntry[] = [
  { name: 'Home',           Icon: Home           },
  { name: 'Search',         Icon: Search         },
  { name: 'Menu',           Icon: Menu           },
  { name: 'X',              Icon: X              },
  { name: 'ChevronRight',   Icon: ChevronRight   },
  { name: 'ChevronLeft',    Icon: ChevronLeft    },
  { name: 'ChevronUp',      Icon: ChevronUp      },
  { name: 'ChevronDown',    Icon: ChevronDown    },
  { name: 'ArrowRight',     Icon: ArrowRight     },
  { name: 'ArrowLeft',      Icon: ArrowLeft      },
  { name: 'ArrowUp',        Icon: ArrowUp        },
  { name: 'ArrowDown',      Icon: ArrowDown      },
  { name: 'Plus',           Icon: Plus           },
  { name: 'Minus',          Icon: Minus          },
  { name: 'Edit2',          Icon: Edit2          },
  { name: 'Trash2',         Icon: Trash2         },
  { name: 'Copy',           Icon: Copy           },
  { name: 'Download',       Icon: Download       },
  { name: 'Upload',         Icon: Upload         },
  { name: 'Share2',         Icon: Share2         },
  { name: 'Link',           Icon: Link           },
  { name: 'ExternalLink',   Icon: ExternalLink   },
  { name: 'Check',          Icon: Check          },
  { name: 'AlertCircle',    Icon: AlertCircle    },
  { name: 'AlertTriangle',  Icon: AlertTriangle  },
  { name: 'Info',           Icon: Info           },
  { name: 'HelpCircle',     Icon: HelpCircle     },
  { name: 'Bell',           Icon: Bell           },
  { name: 'Play',           Icon: Play           },
  { name: 'Pause',          Icon: Pause          },
  { name: 'Volume2',        Icon: Volume2        },
  { name: 'Camera',         Icon: Camera         },
  { name: 'Mic',            Icon: Mic            },
  { name: 'Settings',       Icon: Settings       },
  { name: 'Sliders',        Icon: Sliders        },
  { name: 'Filter',         Icon: Filter         },
  { name: 'Grid',           Icon: Grid           },
  { name: 'List',           Icon: List           },
  { name: 'LayoutGrid',     Icon: LayoutGrid     },
  { name: 'Briefcase',      Icon: Briefcase      },
  { name: 'Globe',          Icon: Globe          },
  { name: 'Target',         Icon: Target         },
  { name: 'Star',           Icon: Star           },
  { name: 'Heart',          Icon: Heart          },
  { name: 'TrendingUp',     Icon: TrendingUp     },
  { name: 'TrendingDown',   Icon: TrendingDown   },
  { name: 'BarChart2',      Icon: BarChart2      },
  { name: 'Code',           Icon: Code           },
  { name: 'Terminal',       Icon: Terminal       },
  { name: 'Cpu',            Icon: Cpu            },
  { name: 'Wifi',           Icon: Wifi           },
  { name: 'Lock',           Icon: Lock           },
  { name: 'Shield',         Icon: Shield         },
  { name: 'User',           Icon: User           },
  { name: 'Users',          Icon: Users          },
  { name: 'Mail',           Icon: Mail           },
  { name: 'Phone',          Icon: Phone          },
  { name: 'Calendar',       Icon: Calendar       },
  { name: 'Clock',          Icon: Clock          },
  { name: 'Tag',            Icon: Tag            },
  { name: 'Bookmark',       Icon: Bookmark       },
  { name: 'Zap',            Icon: Zap            },
  { name: 'Activity',       Icon: Activity       },
  { name: 'Timer',          Icon: Timer          },
  { name: 'Layers',         Icon: Layers         },
  { name: 'Package',        Icon: Package        },
  { name: 'Eye',            Icon: Eye            },
  { name: 'Send',           Icon: Send           },
]

function IconsSection() {
  const { t } = useLang()
  const [query, setQuery]     = useState('')
  const [copied, setCopied]   = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = query.trim()
    ? ICON_LIST.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    : ICON_LIST

  function handleCopy(entry: LucideEntry) {
    const text = `<${entry.name} size={20} strokeWidth={1.5} />`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(entry.name)
      setTimeout(() => setCopied(null), 1800)
    })
  }

  return (
    <section id="icons" style={{ borderTop: hairline }}>
      <SubHeader
        label="// 05.3"
        title={t('assets_icons_heading')}
        desc={t('assets_icons_lead')}
      />

      <div style={{ padding: `0 ${H_PAD} 0` }}>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <label
            htmlFor="icon-search-ds"
            style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
          >
            Buscar ícones
          </label>
          <Search
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: C.steel,
              pointerEvents: 'none',
            }}
          />
          <input
            id="icon-search-ds"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search icons…"
            style={{
              width: '100%',
              padding: '9px 12px 9px 34px',
              fontFamily: mono,
              fontSize: 11,
              color: C.black,
              background: C.surface,
              border: hairline,
              borderRadius: 4,
              letterSpacing: '0.02em',
              outline: 'none',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Limpar busca"
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: C.steel,
                padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={12} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Count */}
        <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, letterSpacing: '0.1em', margin: '0 0 16px' }}>
          {filtered.length} / {ICON_LIST.length} ICONS · lucide-react · size 20 · strokeWidth 1.5
        </p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
          gap: 1,
          background: 'rgba(42,44,43,0.07)',
          border: hairline,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          {filtered.map((entry) => {
            const { name, Icon: IconComp } = entry
            const isHov  = hovered === name
            const isDone = copied === name
            return (
              <button
                key={name}
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleCopy(entry)}
                title={`${t('assets_icons_copy_hint')}: <${name} size={20} strokeWidth={1.5} />`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  padding: '20px 8px 16px',
                  background: isDone ? 'rgba(47,210,152,0.06)' : isHov ? C.aluminium : C.bg,
                  border: 'none',
                  cursor: 'pointer',
                  transition: `background 140ms ${ease}`,
                }}
              >
                <div style={{
                  color: isDone ? '#2fd298' : isHov ? C.black : C.steel,
                  transition: `color 140ms ${ease}`,
                }}>
                  <IconComp size={20} strokeWidth={1.5} />
                </div>
                <span style={{
                  fontFamily: mono,
                  fontSize: 8,
                  letterSpacing: '0.03em',
                  color: isDone ? '#2fd298' : isHov ? C.black : C.platinum,
                  wordBreak: 'break-all' as const,
                  textAlign: 'center' as const,
                  lineHeight: 1.4,
                  transition: `color 140ms ${ease}`,
                }}>
                  {isDone ? t('assets_icons_copied') : name}
                </span>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p style={{
            fontFamily: mono,
            fontSize: 11,
            color: C.steel,
            padding: '32px 0',
            textAlign: 'center' as const,
            letterSpacing: '0.06em',
          }}>
            no icons match &quot;{query}&quot;
          </p>
        )}
      </div>

      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */
export default function Assets() {
  const { t } = useLang()

  return (
    <>
      <SectionTitle
        eyebrow={t('assets_eyebrow')}
        title={t('assets_heading')}
        lead={t('assets_intro')}
      />

      <PerformanceSection />
      <SponsorsSection />
      <IconsSection />
    </>
  )
}
