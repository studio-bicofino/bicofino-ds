'use client'

import React, { useState } from 'react'
import { useLang } from '@/content/index'
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Inbox,
  Loader2,
  User,
  TrendingUp,
  Activity,
} from 'lucide-react'

/* ─── Shared tokens ─── */
const C = {
  black:    'var(--bf-text-primary)',
  surface:  'var(--bf-surface)',
  steel:    'var(--bf-text-secondary)',
  platinum: 'var(--bf-text-subtle)',
  accent:   'var(--bf-accent)',
  border:   'var(--bf-border)',
  bg:       'var(--bf-bg-page)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 6vw, 72px)'

/* ─── Atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' as const }}>
      {children}
    </p>
  )
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance section-title" style={{ fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
        {title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 580, fontFamily: sans }}>
        {lead}
      </p>
    </div>
  )
}

function SubHeader({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h3 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h3>
      {desc && <p style={{ fontSize: 14, lineHeight: 1.6, color: C.steel, margin: '10px 0 0', maxWidth: 480, fontFamily: sans }}>{desc}</p>}
    </div>
  )
}

function PageFooter() {
  return (
    <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        // BICOFINO DESIGN SYSTEM · 2026
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   03.1 — Buttons
   ═══════════════════════════════════════════════════════════ */
function ButtonsSection() {
  const { t } = useLang()
  const [loadingClick, setLoadingClick] = useState(false)

  function handleLoadingClick() {
    setLoadingClick(true)
    setTimeout(() => setLoadingClick(false), 1800)
  }

  const baseBtn: React.CSSProperties = {
    fontFamily: sans,
    fontWeight: 500,
    letterSpacing: '-0.01em',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
    lineHeight: 1,
  }

  const btnMd: React.CSSProperties = { ...baseBtn, fontSize: 14, padding: '10px 20px' }
  const btnSm: React.CSSProperties = { ...baseBtn, fontSize: 12, padding: '7px 14px' }
  const btnLg: React.CSSProperties = { ...baseBtn, fontSize: 16, padding: '14px 28px' }

  const variants: Array<{ label: string; style: React.CSSProperties }> = [
    {
      label: t('comp_buttons_primary'),
      style: { ...btnMd, background: 'var(--bf-text-primary)', color: 'var(--bf-bg-page)' },
    },
    {
      label: t('comp_buttons_secondary'),
      style: { ...btnMd, background: 'var(--bf-surface)', color: 'var(--bf-text-primary)', border: '1px solid var(--bf-border-strong)' } as React.CSSProperties,
    },
    {
      label: t('comp_buttons_ghost'),
      style: { ...btnMd, background: 'transparent', color: 'var(--bf-text-primary)', border: '1px solid var(--bf-border)' } as React.CSSProperties,
    },
    {
      label: t('comp_buttons_destructive'),
      style: { ...btnMd, background: '#f0535e', color: '#ffffff' },
    },
  ]

  return (
    <section id="buttons">
      <SubHeader
        label="// 03.1"
        title={t('comp_buttons_heading')}
        desc={t('comp_buttons_desc')}
      />

      <div style={{ padding: `0 ${H_PAD}`, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Row 1 — variants */}
        <div>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>// variantes</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
            {variants.map(({ label, style }) => (
              <button key={label} style={style}>{label}</button>
            ))}
          </div>
        </div>

        {/* Row 2 — sizes */}
        <div>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>// tamanhos</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 12 }}>
            <button style={{ ...btnSm, background: 'var(--bf-text-primary)', color: 'var(--bf-bg-page)' }}>sm</button>
            <button style={{ ...btnMd, background: 'var(--bf-text-primary)', color: 'var(--bf-bg-page)' }}>md</button>
            <button style={{ ...btnLg, background: 'var(--bf-text-primary)', color: 'var(--bf-bg-page)' }}>lg</button>
          </div>
        </div>

        {/* Row 3 — states */}
        <div style={{ paddingBottom: 32 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>// estados</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: 12 }}>
            <button
              onClick={handleLoadingClick}
              style={{ ...btnMd, background: 'var(--bf-text-primary)', color: 'var(--bf-bg-page)', opacity: loadingClick ? 0.7 : 1 }}
            >
              {loadingClick ? (
                <>
                  <Loader2 size={14} strokeWidth={1.5} style={{ animation: 'spin 0.7s linear infinite' }} />
                  {t('comp_buttons_loading')}
                </>
              ) : (
                t('comp_buttons_primary')
              )}
            </button>
            <button
              disabled
              style={{ ...btnMd, background: 'var(--bf-surface)', color: 'var(--bf-text-subtle)', cursor: 'not-allowed', border: '1px solid var(--bf-border)' } as React.CSSProperties}
            >
              {t('comp_buttons_disabled')}
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   03.2 — Cards
   ═══════════════════════════════════════════════════════════ */
function CardsSection() {
  const { t } = useLang()

  const cardBase: React.CSSProperties = {
    background: 'var(--bf-bg-page)',
    border: hairline,
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <section id="cards">
      <SubHeader
        label="// 03.2"
        title={t('comp_cards_heading')}
        desc={t('comp_cards_desc')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px`, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>

        {/* Default card */}
        <div style={cardBase}>
          <div style={{ padding: '24px 24px 20px' }}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 8px', textTransform: 'uppercase' as const }}>{t('comp_cards_default')}</p>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: C.black, margin: '0 0 8px', letterSpacing: '-0.01em', fontFamily: sans, lineHeight: 1.3 }}>
              Análise de Desempenho
            </h4>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.steel, margin: 0, fontFamily: sans }}>
              Métricas de performance coletadas ao longo da temporada 2025/26.
            </p>
          </div>
          <div style={{ marginTop: 'auto', padding: '16px 24px', borderTop: hairline, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.steel, fontFamily: sans }}>Temporada 25/26</span>
            <button style={{ fontFamily: sans, fontSize: 12, fontWeight: 500, color: C.accent, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
              Ver detalhes →
            </button>
          </div>
        </div>

        {/* Metric card */}
        <div style={cardBase}>
          <div style={{ padding: '24px 24px 20px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: 0, textTransform: 'uppercase' as const }}>{t('comp_cards_metric')}</p>
              <Activity size={16} strokeWidth={1.5} style={{ color: 'var(--chart-1)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 42, fontWeight: 700, color: C.black, letterSpacing: '-0.03em', lineHeight: 1, fontFamily: sans }}>87.4</span>
              <span style={{ fontSize: 14, color: C.steel, marginBottom: 6, fontFamily: sans }}>pts</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(47,210,152,0.1)', borderRadius: 4, padding: '3px 8px' }}>
              <TrendingUp size={12} strokeWidth={1.5} style={{ color: '#2fd298' }} />
              <span style={{ fontFamily: mono, fontSize: 10, color: '#2fd298', fontWeight: 600 }}>+12%</span>
            </div>
          </div>
          <div style={{ padding: '12px 24px 16px', borderTop: hairline }}>
            <span style={{ fontSize: 11, color: C.steel, fontFamily: sans }}>vs. temporada anterior</span>
          </div>
        </div>

        {/* Athlete card */}
        <div style={cardBase}>
          <div style={{ padding: '24px 24px 20px', flex: 1 }}>
            <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>{t('comp_cards_athlete')}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bf-aluminium)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={20} strokeWidth={1.5} style={{ color: C.steel }} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.black, margin: '0 0 2px', letterSpacing: '-0.01em', fontFamily: sans }}>Lucas Ferreira</p>
                <p style={{ fontSize: 12, color: C.steel, margin: 0, fontFamily: sans }}>Meio-campo · Torino FC</p>
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 24px 16px', borderTop: hairline, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 500, color: '#2fd298', background: 'rgba(47,210,152,0.1)', borderRadius: 4, padding: '3px 8px' }}>
              {t('comp_badges_active')}
            </span>
            <span style={{ fontFamily: mono, fontSize: 9, color: C.platinum, letterSpacing: '0.08em' }}>ID-0084</span>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   03.3 — Charts (SVG puro — recharts não instalado)
   ═══════════════════════════════════════════════════════════ */
function ChartsSection() {
  const { t } = useLang()

  /* Bar chart data */
  const barData = [
    { label: 'Jan', value: 72 },
    { label: 'Fev', value: 85 },
    { label: 'Mar', value: 68 },
    { label: 'Abr', value: 91 },
    { label: 'Mai', value: 78 },
    { label: 'Jun', value: 88 },
  ]
  const barMax = 100
  const barW = 36
  const barGap = 16
  const barChartH = 120
  const barColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--chart-1)']

  /* Line chart data */
  const lineData = [42, 58, 51, 73, 65, 80, 74, 88]
  const lineW = 320
  const lineH = 100
  const lineMin = Math.min(...lineData) - 5
  const lineMax = Math.max(...lineData) + 5
  const linePoints = lineData.map((v, i) => {
    const x = (i / (lineData.length - 1)) * lineW
    const y = lineH - ((v - lineMin) / (lineMax - lineMin)) * lineH
    return `${x},${y}`
  }).join(' ')

  /* Donut chart */
  const donutData = [
    { value: 45, color: 'var(--chart-1)' },
    { value: 30, color: 'var(--chart-2)' },
    { value: 25, color: 'var(--chart-3)' },
  ]
  const total = donutData.reduce((s, d) => s + d.value, 0)
  const r = 48
  const cx = 64
  const cy = 64
  let cumAngle = -90
  const donutPaths = donutData.map((d) => {
    const startAngle = cumAngle
    const sweep = (d.value / total) * 360
    cumAngle += sweep
    const endAngle = cumAngle
    const rad = (a: number) => (a * Math.PI) / 180
    const x1 = cx + r * Math.cos(rad(startAngle))
    const y1 = cy + r * Math.sin(rad(startAngle))
    const x2 = cx + r * Math.cos(rad(endAngle - 0.01))
    const y2 = cy + r * Math.sin(rad(endAngle - 0.01))
    const largeArc = sweep > 180 ? 1 : 0
    return { path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`, color: d.color, value: d.value }
  })

  const cardBase: React.CSSProperties = {
    background: 'var(--bf-bg-page)',
    border: hairline,
    borderRadius: 8,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  }

  return (
    <section id="charts">
      <SubHeader
        label="// 03.3"
        title={t('comp_charts_heading')}
        desc={t('comp_charts_desc')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px`, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>

        {/* Bar chart */}
        <div style={cardBase}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: 0, textTransform: 'uppercase' as const }}>{t('comp_charts_bar')}</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: barGap, height: barChartH + 24 }}>
            {barData.map((d, i) => (
              <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: mono, fontSize: 9, color: C.steel }}>{d.value}</span>
                <div
                  style={{
                    width: barW,
                    height: (d.value / barMax) * barChartH,
                    background: barColors[i],
                    borderRadius: '2px 2px 0 0',
                    opacity: 0.9,
                  }}
                />
                <span style={{ fontFamily: mono, fontSize: 9, color: C.steel }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line chart */}
        <div style={cardBase}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: 0, textTransform: 'uppercase' as const }}>{t('comp_charts_line')}</p>
          <svg width="100%" viewBox={`-4 -4 ${lineW + 8} ${lineH + 8}`} style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                x1={0} y1={lineH * (1 - f)}
                x2={lineW} y2={lineH * (1 - f)}
                stroke="var(--bf-border)"
                strokeWidth={1}
              />
            ))}
            {/* Line */}
            <polyline
              points={linePoints}
              fill="none"
              stroke="var(--chart-1)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Points */}
            {lineData.map((v, i) => {
              const x = (i / (lineData.length - 1)) * lineW
              const y = lineH - ((v - lineMin) / (lineMax - lineMin)) * lineH
              return <circle key={i} cx={x} cy={y} r={3} fill="var(--chart-1)" />
            })}
          </svg>
        </div>

        {/* Donut chart */}
        <div style={cardBase}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: 0, textTransform: 'uppercase' as const }}>{t('comp_charts_donut')}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width={128} height={128} viewBox="0 0 128 128">
              {donutPaths.map((d, i) => (
                <path key={i} d={d.path} fill={d.color} opacity={0.9} />
              ))}
              <circle cx={cx} cy={cy} r={28} fill="var(--bf-bg-page)" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {donutData.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: mono, fontSize: 10, color: C.steel }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   03.4 — Forms
   ═══════════════════════════════════════════════════════════ */
function FormsSection() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [sport, setSport] = useState('')
  const [active, setActive] = useState(true)
  const [notify, setNotify] = useState(false)

  const sports = ['Natação', 'Atletismo', 'Ciclismo', 'Triathlon']

  const inputBase: React.CSSProperties = {
    fontFamily: sans,
    fontSize: 14,
    color: 'var(--bf-text-primary)',
    background: 'var(--bf-bg-page)',
    border: '1px solid var(--bf-border-strong)',
    borderRadius: 8,
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 150ms ease-out',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.08em',
    color: C.steel,
    display: 'block',
    marginBottom: 6,
    textTransform: 'uppercase' as const,
  }

  return (
    <section id="forms">
      <SubHeader
        label="// 03.4"
        title={t('comp_forms_heading')}
        desc={t('comp_forms_desc')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 32, maxWidth: 720 }}>

          {/* Name input */}
          <div>
            <label style={labelStyle}>{t('comp_forms_label_name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('comp_forms_placeholder_name')}
              style={inputBase}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--bf-accent)' }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--bf-border-strong)' }}
            />
          </div>

          {/* Sport select */}
          <div>
            <label style={labelStyle}>{t('comp_forms_label_sport')}</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              style={{ ...inputBase, appearance: 'none', cursor: 'pointer' } as React.CSSProperties}
              onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = 'var(--bf-accent)' }}
              onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = 'var(--bf-border-strong)' }}
            >
              <option value="">—</option>
              {sports.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Error state */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              defaultValue="email-invalido"
              readOnly
              style={{ ...inputBase, borderColor: '#f0535e', color: '#f0535e' }}
            />
            <p style={{ fontFamily: sans, fontSize: 11, color: '#f0535e', margin: '5px 0 0', display: 'flex', alignItems: 'center', gap: 4 } as React.CSSProperties}>
              <XCircle size={12} strokeWidth={1.5} />
              Endereço de email inválido.
            </p>
          </div>

          {/* Success state */}
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              defaultValue="lucas.ferreira"
              readOnly
              style={{ ...inputBase, borderColor: '#2fd298', paddingRight: 36 }}
            />
            <p style={{ fontFamily: sans, fontSize: 11, color: '#2fd298', margin: '5px 0 0', display: 'flex', alignItems: 'center', gap: 4 } as React.CSSProperties}>
              <CheckCircle size={12} strokeWidth={1.5} />
              Disponível.
            </p>
          </div>

          {/* Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              onClick={() => setActive(!active)}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setActive(!active) } }}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: active ? '2px solid var(--bf-text-primary)' : '2px solid var(--bf-border-strong)',
                background: active ? 'var(--bf-text-primary)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 150ms ease-out',
              }}
            >
              {active && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="var(--bf-bg-page)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <label
              onClick={() => setActive(!active)}
              style={{ fontFamily: sans, fontSize: 13, color: C.black, cursor: 'pointer', userSelect: 'none' as const }}
            >
              {t('comp_forms_label_active')}
            </label>
          </div>

          {/* Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              role="switch"
              aria-checked={notify}
              tabIndex={0}
              onClick={() => setNotify(!notify)}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setNotify(!notify) } }}
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: notify ? 'var(--bf-text-primary)' : 'var(--bf-border-strong)',
                cursor: 'pointer',
                position: 'relative' as const,
                transition: 'background 150ms ease-out',
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#ffffff',
                position: 'absolute' as const,
                top: 3,
                left: notify ? 21 : 3,
                transition: 'left 150ms ease-out',
              }} />
            </div>
            <label
              onClick={() => setNotify(!notify)}
              style={{ fontFamily: sans, fontSize: 13, color: C.black, cursor: 'pointer', userSelect: 'none' as const }}
            >
              {t('comp_forms_label_notify')}
            </label>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   03.5 — Badges
   ═══════════════════════════════════════════════════════════ */
function BadgesSection() {
  const { t } = useLang()

  type BadgeVariant = {
    label: string
    bg: string
    color: string
    dot: string
  }

  const semantic: BadgeVariant[] = [
    { label: t('comp_badges_active'),   bg: 'rgba(47,210,152,0.12)',  color: '#1a9e70', dot: '#2fd298' },
    { label: t('comp_badges_inactive'), bg: 'rgba(109,120,134,0.12)', color: '#5f6b77', dot: '#6d7886' },
    { label: t('comp_badges_pending'),  bg: 'rgba(255,185,0,0.12)',   color: '#b37d00', dot: '#ffb900' },
  ]

  const informational: BadgeVariant[] = [
    { label: t('comp_badges_new'),      bg: 'rgba(13,138,255,0.12)',  color: '#0065cc', dot: '#0d8aff' },
    { label: t('comp_badges_featured'), bg: 'rgba(191,163,122,0.15)', color: '#8c6d3f', dot: '#bfa37a' },
    { label: t('comp_badges_archived'), bg: 'rgba(42,44,43,0.08)',    color: '#5f6b77', dot: '#2a2c2b' },
  ]

  function Badge({ label, bg, color, dot, withDot = false }: BadgeVariant & { withDot?: boolean }) {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: bg,
        color: color,
        borderRadius: 4,
        padding: '4px 10px',
        fontFamily: mono,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}>
        {withDot && (
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, flexShrink: 0 }} />
        )}
        {label}
      </span>
    )
  }

  return (
    <section id="badges">
      <SubHeader
        label="// 03.5"
        title={t('comp_badges_heading')}
        desc={t('comp_badges_desc')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px`, display: 'flex', flexDirection: 'column', gap: 32 }}>

        <div>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 14px', textTransform: 'uppercase' as const }}>// semânticos</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {semantic.map((b) => <Badge key={b.label} {...b} />)}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginTop: 8 }}>
            {semantic.map((b) => <Badge key={b.label + '-dot'} {...b} withDot />)}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 14px', textTransform: 'uppercase' as const }}>// informativos</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {informational.map((b) => <Badge key={b.label} {...b} />)}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginTop: 8 }}>
            {informational.map((b) => <Badge key={b.label + '-dot'} {...b} withDot />)}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   03.6 — Feedback
   ═══════════════════════════════════════════════════════════ */
function FeedbackSection() {
  const { t } = useLang()

  type AlertVariant = {
    icon: React.ReactNode
    border: string
    bg: string
    color: string
    message: string
  }

  const alerts: AlertVariant[] = [
    {
      icon: <CheckCircle size={16} strokeWidth={1.5} />,
      border: '#2fd298',
      bg: 'rgba(47,210,152,0.06)',
      color: '#1a9e70',
      message: t('comp_feedback_alert_success'),
    },
    {
      icon: <AlertTriangle size={16} strokeWidth={1.5} />,
      border: '#ffb900',
      bg: 'rgba(255,185,0,0.06)',
      color: '#b37d00',
      message: t('comp_feedback_alert_warning'),
    },
    {
      icon: <XCircle size={16} strokeWidth={1.5} />,
      border: '#f0535e',
      bg: 'rgba(240,83,94,0.06)',
      color: '#c62c36',
      message: t('comp_feedback_alert_error'),
    },
  ]

  return (
    <section id="feedback">
      <SubHeader
        label="// 03.6"
        title={t('comp_feedback_heading')}
        desc={t('comp_feedback_desc')}
      />

      <div style={{ padding: `0 ${H_PAD} 64px`, display: 'flex', flexDirection: 'column', gap: 48 }}>

        {/* Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 6px', textTransform: 'uppercase' as const }}>// alertas</p>
          {alerts.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 8,
                borderLeft: `3px solid ${a.border}`,
                background: a.bg,
                color: a.color,
              }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}>{a.icon}</span>
              <span style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.5 }}>{a.message}</span>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>// estado vazio</p>
          <div
            style={{
              border: hairline,
              borderRadius: 8,
              background: 'var(--bf-surface)',
              padding: '48px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center' as const,
              gap: 12,
            }}
          >
            <Inbox size={40} strokeWidth={1} style={{ color: C.platinum }} />
            <div>
              <p style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: C.black, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                {t('comp_feedback_empty_title')}
              </p>
              <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.6, color: C.steel, margin: 0, maxWidth: 300 }}>
                {t('comp_feedback_empty_desc')}
              </p>
            </div>
            <button style={{
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--bf-bg-page)',
              background: 'var(--bf-text-primary)',
              border: 'none',
              borderRadius: 8,
              padding: '9px 20px',
              cursor: 'pointer',
              marginTop: 4,
              transition: 'opacity 150ms ease-out',
            }}>
              Adicionar dados
            </button>
          </div>
        </div>

        {/* Skeleton */}
        <div style={{ maxWidth: 560 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>// skeleton</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="bf-skeleton" style={{ height: 20, borderRadius: 4, background: 'var(--bf-border)', width: '75%' }} />
            <div className="bf-skeleton" style={{ height: 14, borderRadius: 4, background: 'var(--bf-border)', width: '100%' }} />
            <div className="bf-skeleton" style={{ height: 14, borderRadius: 4, background: 'var(--bf-border)', width: '55%' }} />
          </div>
        </div>

      </div>

      <PageFooter />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */
export default function ComponentsGallery() {
  const { t } = useLang()

  return (
    <>
      {/* Section header */}
      <SectionTitle
        eyebrow={t('comp_eyebrow')}
        title={t('comp_heading')}
        lead={t('comp_intro')}
      />

      <ButtonsSection />
      <CardsSection />
      <ChartsSection />
      <FormsSection />
      <BadgesSection />
      <FeedbackSection />
    </>
  )
}
