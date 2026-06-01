'use client'

import React from 'react'
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
  aluminium: 'var(--bf-aluminium)',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 6vw, 72px)'

/* ─── Atoms ─── */
function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' as const }}>
        {eyebrow}
      </p>
      <h2
        className="text-balance section-title"
        style={{ fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 580, fontFamily: sans }}>
        {lead}
      </p>
    </div>
  )
}

function SubLabel({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel, margin: '0 0 12px', textTransform: 'uppercase' as const }}>
      {children}
    </p>
  )
}

/* ─── Athlete Profile Placeholder (CSS/SVG only) ─── */
function AthleteProfilePlaceholder() {
  return (
    <div
      style={{
        background: C.surface,
        border: hairline,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: C.black,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.accent, margin: 0 }}>
          // ATHLETE PROFILE
        </p>
        <div style={{ display: 'flex', gap: 4 }}>
          {['var(--bf-accent)', C.surface, C.steel].map((col, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: col, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        {/* Portrait placeholder */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 8,
              background: C.aluminium,
              border: hairline,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Simple SVG silhouette */}
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
              <circle cx="16" cy="12" r="8" fill="var(--bf-border-strong)" />
              <path d="M2 38 C2 28 8 22 16 22 C24 22 30 28 30 38" fill="var(--bf-border-strong)" />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            {/* Name placeholder */}
            <p style={{ fontFamily: sans, fontSize: 16, fontWeight: 700, color: C.black, margin: '0 0 4px', letterSpacing: '-0.01em' }}>
              — Atleta Bicofino —
            </p>
            {/* Position */}
            <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: '0 0 8px', letterSpacing: '0.06em' }}>
              MEIO-CAMPO · CLUB · #00
            </p>
            {/* Club/nation badges */}
            <div style={{ display: 'flex', gap: 6 }}>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 9,
                  letterSpacing: '0.08em',
                  color: C.accent,
                  background: 'rgba(191,163,122,0.12)',
                  borderRadius: 4,
                  padding: '3px 8px',
                }}
              >
                BRA
              </span>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 9,
                  letterSpacing: '0.08em',
                  color: C.steel,
                  background: C.aluminium,
                  borderRadius: 4,
                  padding: '3px 8px',
                }}
              >
                U-21
              </span>
            </div>
          </div>
        </div>

        {/* Stats rows */}
        {[
          { label: 'Velocidade', value: 88, max: 100, color: 'var(--chart-1)' },
          { label: 'Técnica', value: 91, max: 100, color: C.accent },
          { label: 'Físico', value: 76, max: 100, color: 'var(--chart-2)' },
        ].map(({ label, value, max, color }) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: C.steel }}>{label}</span>
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.06em', color: C.black, fontWeight: 600 }}>{value}</span>
            </div>
            <div style={{ height: 4, background: C.aluminium, borderRadius: 2, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(value / max) * 100}%`,
                  background: color,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        ))}

        {/* Overall rating */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: hairline,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', color: C.steel }}>RATING GERAL</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: sans, fontSize: 28, fontWeight: 700, color: C.black, letterSpacing: '-0.03em', lineHeight: 1 }}>
              85
            </span>
            <span style={{ fontFamily: mono, fontSize: 9, color: C.steel }}>/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Asset Catalog Table ─── */
function AssetCatalogTable({ t }: { t: (key: Parameters<ReturnType<typeof useLang>['t']>[0]) => string }) {
  const rows: Array<{ cat: string; folder: string; format: string }> = [
    { cat: t('vert_onfield_cat_portraits'),  folder: 'assets/on-field/portraits/',  format: 'PNG' },
    { cat: t('vert_onfield_cat_campaigns'),  folder: 'assets/on-field/campaigns/',  format: 'PNG' },
    { cat: t('vert_onfield_cat_brand'),      folder: 'assets/on-field/brand/',      format: 'SVG' },
    { cat: t('vert_onfield_cat_badges'),     folder: 'assets/on-field/badges/',     format: 'SVG' },
    { cat: t('vert_onfield_cat_clubs'),      folder: 'assets/on-field/clubs/',      format: 'SVG' },
    { cat: t('vert_onfield_cat_sponsors'),   folder: 'assets/on-field/sponsors/',   format: 'SVG' },
    { cat: t('vert_onfield_cat_passports'),  folder: 'assets/on-field/passports/',  format: 'SVG' },
    { cat: t('vert_onfield_cat_icons'),      folder: 'assets/on-field/icons/',      format: 'SVG' },
  ]

  const cellBase: React.CSSProperties = {
    padding: '8px 12px',
    fontFamily: mono,
    fontSize: 10,
    color: C.steel,
    borderBottom: hairline,
    textAlign: 'left' as const,
  }

  return (
    <div style={{ border: hairline, borderRadius: 8, overflow: 'hidden', marginTop: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: C.black }}>
            {['Categoria', 'Pasta', 'Formato'].map((h) => (
              <th
                key={h}
                style={{
                  ...cellBase,
                  color: C.accent,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  fontSize: 9,
                  textTransform: 'uppercase' as const,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.folder}
              style={{ background: i % 2 === 0 ? C.bg : C.surface }}
            >
              <td style={{ ...cellBase, color: C.black, fontWeight: 600, borderBottom: i < rows.length - 1 ? hairline : 'none' }}>
                {row.cat}
              </td>
              <td style={{ ...cellBase, color: C.steel, borderBottom: i < rows.length - 1 ? hairline : 'none' }}>
                {row.folder}
              </td>
              <td style={{ ...cellBase, color: C.accent, letterSpacing: '0.06em', borderBottom: i < rows.length - 1 ? hairline : 'none' }}>
                {row.format}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   04.1 — On Field
   ═══════════════════════════════════════════════════════════ */
export function OnFieldSection() {
  const { t } = useLang()

  const deliverables = [
    t('vert_onfield_d1'),
    t('vert_onfield_d2'),
    t('vert_onfield_d3'),
    t('vert_onfield_d4'),
    t('vert_onfield_d5'),
    t('vert_onfield_d6'),
  ]

  return (
    <section id="on-field" style={{ borderBottom: hairline }}>
      {/* Sub-header */}
      <div style={{ padding: `56px ${H_PAD} 28px` }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>
          // 04.1
        </p>
        <h3
          className="text-balance"
          style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}
        >
          {t('vert_onfield_heading')}
        </h3>
      </div>

      {/* Two-column layout */}
      <div
        className="grid-2-col-responsive"
        style={{
          padding: `0 ${H_PAD} 0`,
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 40,
          alignItems: 'start',
        }}
      >
        {/* ── Left column ── */}
        <div>
          {/* Subhead */}
          <p
            style={{
              fontFamily: sans,
              fontSize: 18,
              fontWeight: 600,
              fontStyle: 'italic',
              color: C.black,
              lineHeight: 1.4,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            {t('vert_onfield_subhead')}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: sans,
              fontSize: 14,
              lineHeight: 1.75,
              color: C.steel,
              margin: '0 0 24px',
            }}
          >
            {t('vert_onfield_desc')}
          </p>

          {/* Visual tone block */}
          <div
            style={{
              background: C.surface,
              border: hairline,
              borderLeft: `3px solid ${C.accent}`,
              borderRadius: '0 8px 8px 0',
              padding: '14px 16px',
              marginBottom: 28,
            }}
          >
            <SubLabel>// TOM VISUAL</SubLabel>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: C.steel,
                margin: 0,
              }}
            >
              {t('vert_onfield_tone')}
            </p>
          </div>

          {/* Who it serves */}
          <div style={{ marginBottom: 28 }}>
            <SubLabel>// {t('vert_onfield_serves').toUpperCase()}</SubLabel>
            <p
              style={{
                fontFamily: sans,
                fontSize: 13,
                lineHeight: 1.65,
                color: C.steel,
                margin: 0,
              }}
            >
              {t('vert_onfield_serves_desc')}
            </p>
          </div>

          {/* Deliverables list */}
          <div style={{ marginBottom: 32 }}>
            <SubLabel>// {t('vert_onfield_delivers').toUpperCase()}</SubLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {deliverables.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: sans,
                      fontSize: 12,
                      color: C.accent,
                      flexShrink: 0,
                      marginTop: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    style={{
                      fontFamily: sans,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: C.steel,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column ── */}
        <div style={{ paddingTop: 4 }}>
          <AthleteProfilePlaceholder />
          <div style={{ marginTop: 0 }}>
            <p
              style={{
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: '0.1em',
                color: C.steel,
                margin: '24px 0 8px',
                textTransform: 'uppercase' as const,
              }}
            >
              // {t('vert_onfield_catalog')}
            </p>
            <AssetCatalogTable t={t} />
          </div>
        </div>
      </div>

      {/* Section footer */}
      <div
        style={{
          padding: `24px ${H_PAD}`,
          borderTop: hairline,
          marginTop: 40,
        }}
      >
        <p style={{ fontFamily: mono, fontSize: 9, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
          // ON FIELD v1.0 · BICOFINO DESIGN SYSTEM
        </p>
      </div>
    </section>
  )
}

/* ─── Visual Comparison Table ─── */
function ComparisonTable() {
  const rows: Array<{ onField: string; offField: string }> = [
    { onField: 'Alta intensidade',       offField: 'Quiet luxury' },
    { onField: 'Imagem como herói',      offField: 'Tipografia como herói' },
    { onField: 'Cores de programa',      offField: 'Monocromático + espaço' },
    { onField: 'Urgência editorial',     offField: 'Restraint editorial' },
  ]

  return (
    <div
      style={{
        border: hairline,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 24,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr',
          background: C.surface,
          borderBottom: hairline,
        }}
      >
        <div style={{ padding: '10px 20px' }}>
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: C.black }}>
            ON FIELD
          </span>
        </div>
        <div style={{ background: C.border }} />
        <div style={{ padding: '10px 20px' }}>
          <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: C.accent }}>
            OFF FIELD
          </span>
        </div>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            borderBottom: i < rows.length - 1 ? hairline : 'none',
          }}
        >
          <div style={{ padding: '10px 20px' }}>
            <span style={{ fontFamily: sans, fontSize: 13, color: C.steel }}>{row.onField}</span>
          </div>
          <div style={{ background: C.border }} />
          <div style={{ padding: '10px 20px' }}>
            <span style={{ fontFamily: sans, fontSize: 13, color: C.steel, fontStyle: 'italic' }}>{row.offField}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   04.2 — Off Field
   ═══════════════════════════════════════════════════════════ */
export function OffFieldSection() {
  const { t } = useLang()

  const col1 = [
    { title: 'Branding & Criação', items: [t('vert_offfield_d1'), t('vert_offfield_d2'), t('vert_offfield_d3')] },
  ]
  const col2 = [
    { title: 'Estratégia & Negócios', items: [t('vert_offfield_d4'), t('vert_offfield_d5'), t('vert_offfield_d6'), t('vert_offfield_d7')] },
  ]

  return (
    <section id="off-field" style={{ borderBottom: hairline }}>
      {/* Sub-header */}
      <div style={{ padding: `56px ${H_PAD} 28px` }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>
          // 04.2
        </p>
        <h3
          className="text-balance"
          style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}
        >
          {t('vert_offfield_heading')}
        </h3>
      </div>

      {/* Spacious editorial intro */}
      <div style={{ padding: `0 ${H_PAD} 40px`, maxWidth: 680 }}>
        <p
          style={{
            fontFamily: sans,
            fontSize: 20,
            fontWeight: 600,
            fontStyle: 'italic',
            color: C.black,
            lineHeight: 1.45,
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          {t('vert_offfield_subhead')}
        </p>
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            lineHeight: 1.8,
            color: C.steel,
            margin: '0 0 24px',
          }}
        >
          {t('vert_offfield_desc')}
        </p>

        {/* Visual tone — more open, more space */}
        <div
          style={{
            padding: '20px 24px',
            border: hairline,
            borderRadius: 8,
            background: C.bg,
          }}
        >
          <SubLabel>// TOM VISUAL</SubLabel>
          <p
            style={{
              fontFamily: sans,
              fontSize: 15,
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: C.steel,
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            {t('vert_offfield_tone')}
          </p>
        </div>
      </div>

      {/* 2×2 service grid */}
      <div
        className="grid-2-col-responsive"
        style={{
          padding: `0 ${H_PAD} 40px`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          maxWidth: 800,
        }}
      >
        {[...col1, ...col2].map((group) => (
          <div
            key={group.title}
            style={{
              border: hairline,
              borderRadius: 8,
              padding: '20px 24px',
              background: C.bg,
            }}
          >
            <p
              style={{
                fontFamily: mono,
                fontSize: 9,
                letterSpacing: '0.12em',
                color: C.accent,
                margin: '0 0 14px',
                textTransform: 'uppercase' as const,
                fontWeight: 600,
              }}
            >
              {group.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span aria-hidden="true" style={{ fontFamily: sans, fontSize: 12, color: C.accent, flexShrink: 0, marginTop: 1, lineHeight: 1.6 }}>
                    ✦
                  </span>
                  <span style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.6, color: C.steel }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Who it serves + Differential — two info cards */}
      <div
        className="grid-2-col-responsive"
        style={{
          padding: `0 ${H_PAD} 40px`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          maxWidth: 800,
        }}
      >
        {/* Who it serves */}
        <div
          style={{
            border: hairline,
            borderRadius: 8,
            padding: '20px 24px',
          }}
        >
          <SubLabel>// {t('vert_offfield_serves').toUpperCase()}</SubLabel>
          <p
            style={{
              fontFamily: sans,
              fontSize: 14,
              lineHeight: 1.7,
              color: C.steel,
              margin: 0,
            }}
          >
            {t('vert_offfield_serves_desc')}
          </p>
        </div>

        {/* The Off Field advantage */}
        <div
          style={{
            border: hairline,
            borderRadius: 8,
            padding: '20px 24px',
            background: C.surface,
          }}
        >
          <SubLabel>// {t('vert_offfield_diff').toUpperCase()}</SubLabel>
          <p
            style={{
              fontFamily: sans,
              fontSize: 14,
              lineHeight: 1.7,
              color: C.steel,
              margin: 0,
            }}
          >
            {t('vert_offfield_diff_desc')}
          </p>
        </div>
      </div>

      {/* On-Field vs Off-Field comparison */}
      <div style={{ padding: `0 ${H_PAD} 48px`, maxWidth: 640 }}>
        <SubLabel>// ON FIELD vs OFF FIELD</SubLabel>
        <ComparisonTable />
      </div>

      {/* Section footer */}
      <div style={{ padding: `24px ${H_PAD}`, borderTop: hairline }}>
        <p style={{ fontFamily: mono, fontSize: 9, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
          // OFF FIELD v1.0 · BICOFINO DESIGN SYSTEM
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */
export default function Verticais() {
  const { t } = useLang()

  return (
    <>
      <SectionTitle
        eyebrow={t('vert_eyebrow')}
        title={t('vert_heading')}
        lead={t('vert_intro')}
      />
      <OnFieldSection />
      <OffFieldSection />
    </>
  )
}
