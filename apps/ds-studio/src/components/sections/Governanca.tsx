'use client'

import React from 'react'
import { useLang } from '@/content/index'

/* ─── Shared tokens ─── */
const C = {
  black:    'var(--bf-text-primary)',
  surface:  'var(--bf-surface)',
  steel:    'var(--bf-text-secondary)',
  platinum: 'var(--bf-text-subtle)',
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

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-balance section-title" style={{ fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
      {children}
    </h2>
  )
}

function SubHeader({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px', textTransform: 'uppercase' as const }}>{eyebrow}</p>
      <h3 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{heading}</h3>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   07.1 — Ownership
   ═══════════════════════════════════════════════════════════ */
function OwnershipSection() {
  const { t } = useLang()

  const rows = [
    {
      layer: 'Foundations',
      owner: 'Woney Malian',
      scope: t('gov_foundations_scope'),
    },
    {
      layer: 'Brand',
      owner: 'Woney Malian / Fabio Brancatelli',
      scope: t('gov_brand_scope'),
    },
    {
      layer: 'Components',
      owner: 'Direção Criativa + Engenharia',
      scope: t('gov_components_scope'),
    },
    {
      layer: 'Governance',
      owner: 'Woney Malian',
      scope: t('gov_governance_scope'),
    },
  ]

  return (
    <div id="ownership" style={{ scrollMarginTop: 88 }}>
      <SubHeader eyebrow={t('gov_ownership_eyebrow')} heading={t('gov_ownership_heading')} />

      <div style={{ margin: `0 ${H_PAD}` }}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 40px', maxWidth: 640, fontFamily: sans }}>
          {t('gov_ownership_lead')}
        </p>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 180px) 1fr 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('gov_col_layer')}</span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('gov_col_owner')}</span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('gov_col_scope')}</span>
        </div>

        {/* Table rows */}
        {rows.map(({ layer, owner, scope }) => (
          <div key={layer} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 180px) 1fr 1fr', padding: '16px 0', borderBottom: hairline, alignItems: 'start' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.black, fontFamily: sans }}>{layer}</span>
            <span style={{ fontSize: 14, color: C.black, fontFamily: sans }}>{owner}</span>
            <span style={{ fontSize: 13, color: C.steel, fontFamily: sans }}>{scope}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   07.2 — Resources
   ═══════════════════════════════════════════════════════════ */
function ResourcesSection() {
  const { t } = useLang()

  const rows = [
    { file: 'src/app/globals.css',           purpose: t('gov_r1_purpose') },
    { file: 'CLAUDE.md',                      purpose: t('gov_r2_purpose') },
    { file: 'DESIGN.md',                      purpose: t('gov_r3_purpose') },
    { file: 'HANDOFF.md',                     purpose: t('gov_r4_purpose') },
    { file: 'src/config/navigation.ts',       purpose: t('gov_r5_purpose') },
    { file: 'src/content/br.ts',              purpose: t('gov_r6_purpose') },
    { file: 'src/providers/ThemeProvider.tsx', purpose: t('gov_r7_purpose') },
    { file: 'PROJECT-TRACKER.md',             purpose: t('gov_r8_purpose') },
  ]

  return (
    <div id="resources" style={{ scrollMarginTop: 88 }}>
      <SubHeader eyebrow={t('gov_resources_eyebrow')} heading={t('gov_resources_heading')} />

      <div style={{ margin: `0 ${H_PAD}` }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 280px) 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('gov_col_file')}</span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('gov_col_purpose')}</span>
        </div>

        {/* Table rows */}
        {rows.map(({ file, purpose }) => (
          <div key={file} style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 280px) 1fr', padding: '14px 0', borderBottom: hairline, alignItems: 'center' }}>
            <code style={{ fontFamily: mono, fontSize: 12, color: C.black }}>{file}</code>
            <span style={{ fontSize: 13, color: C.steel, fontFamily: sans, lineHeight: 1.5 }}>{purpose}</span>
          </div>
        ))}
      </div>

      {/* Closing brand block */}
      <div style={{ margin: `64px ${H_PAD} 0` }}>
        <div style={{ padding: '32px 40px', background: C.black, color: C.surface, borderRadius: 2 }}>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '0 0 4px' }}>{'// Bicofino Design System v1.0'}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '0 0 4px' }}>{'// DS Studio — apps/ds-studio'}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>Woney Malian / Fabio Brancatelli</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>v1.0 · São Paulo, BR · Maio 2026</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.surface, margin: 0, letterSpacing: '-0.01em', fontFamily: sans }}>Unlike Any Other.</p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */
export default function Governanca() {
  const { t } = useLang()

  return (
    <>
      {/* Section header */}
      <div style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
        <Eyebrow>{t('gov_eyebrow')}</Eyebrow>
        <SectionTitle>{t('gov_heading')}</SectionTitle>
      </div>

      <OwnershipSection />
      <ResourcesSection />

      {/* Page footer */}
      <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
          // BICOFINO DESIGN SYSTEM · 2026
        </p>
      </div>
    </>
  )
}
