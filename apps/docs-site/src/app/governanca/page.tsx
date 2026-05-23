'use client'

import { useLang } from '@/content'
import React from 'react'

/* ─── Design tokens ─── */
const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  white:      'var(--bf-surface)',
  steel:      'var(--bf-text-secondary)',
  platinum:   'var(--bf-text-subtle)',
  aluminium:  '#e2eaf2',
  powerBlack: '#061015',
  crema:      '#f3ebd4',
  caffe:      '#33111a',
  cacao:      '#5e4c41',
  spfc:       '#f0535e',
  sep:        '#2fd298',
  usa:        '#05185c',
  niederland: '#fe4600',
  australia:  '#e5ff78',
  benfica:    '#ed0007',
  miami:      '#f4b3cb',
  napoli:     '#77deff',
  torino:     '#821324',
  como:       '#0d8aff',
  venezia:    '#38e0e3',
  fiorentina: '#711cfe',
  champagne:  '#d8d7d3',
}

const PALETTE = {
  bg:       '#f2f8ff',
  black:    '#2a2c2b',
  steel:    '#6d7886',
  white:    '#ffffff',
  platinum: '#a8c9e5',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 5vw, 72px)'

/* ─── Shared atoms ─── */
function Eyebrow({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: C.steel, margin: '0 0 14px', fontWeight: 600, textTransform: 'uppercase' }}>
      {children}
    </p>
  )
}

function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="text-balance" style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
      {children}
    </h1>
  )
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-prose" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 0', maxWidth: 580 }}>
      {children}
    </p>
  )
}

function SectionHeader({ children, eyebrow }: { children: string; eyebrow: string }) {
  return (
    <div className="bf-text-reveal" style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <PageTitle>{children}</PageTitle>
    </div>
  )
}

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: `32px ${H_PAD} 48px`, borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — Governance
   ═══════════════════════════════════════════════════════════════════════════ */
function Governance() {
  const { t } = useLang()

  const owners = [
    { layer: 'Foundations', owner: 'Woney Malian',                   scope: t('governance.foundations.scope') },
    { layer: 'Brand',        owner: 'Woney Malian / Fabio Brancatelli', scope: t('governance.brand.scope') },
    { layer: 'Components',   owner: 'Direção Criativa + Engenharia',  scope: t('governance.components.scope') },
    { layer: 'Governance',   owner: 'Woney Malian',                   scope: t('governance.governance.scope') },
  ]

  const resources = [
    { file: 'tokens.css',              purpose: t('resource.tokens.css') },
    { file: 'tokens.ts',               purpose: t('resource.tokens.ts') },
    { file: 'globals.css',             purpose: t('resource.globals.css') },
    { file: 'DESIGN.md',               purpose: t('resource.design.md') },
    { file: 'CLAUDE.md',               purpose: t('resource.claude.md') },
    { file: 'apps/storybook/',         purpose: t('resource.storybook') },
    { file: 'apps/docs-site/',         purpose: t('resource.docs.site') },
    { file: 'packages/design-system/', purpose: t('resource.design.system') },
  ]

  return (
    <>
      <section id="governance">
        <SectionHeader eyebrow="// 08 • GOVERNANÇA">{t('governance.title')}</SectionHeader>
        <div style={{ padding: `40px ${H_PAD} 0` }}>
          <Lead>{t('governance.lead')}</Lead>
        </div>

        <div style={{ margin: `40px ${H_PAD} 0` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
            {[t('governance.col.layer'), t('governance.col.owner'), t('governance.col.scope')].map(h => (
              <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
            ))}
          </div>
          {owners.map(({ layer, owner, scope }) => (
            <div key={layer} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', padding: '18px 0', borderBottom: hairline, alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.black, fontFamily: sans }}>{layer}</span>
              <span style={{ fontSize: 13, color: C.steel }}>{owner}</span>
              <span style={{ fontSize: 13, color: C.steel }}>{scope}</span>
            </div>
          ))}
        </div>
        <PageFooter line={t('page.footer.line')} />
      </section>

      <section id="resources">
        <SectionHeader eyebrow="// 08.2">{t('resources.title')}</SectionHeader>
        <div style={{ margin: `40px ${H_PAD} 0` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
            {[t('resources.col.file'), t('resources.col.purpose')].map(h => (
              <span key={h} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{h}</span>
            ))}
          </div>
          {resources.map(({ file, purpose }) => (
            <div key={file} style={{ display: 'grid', gridTemplateColumns: '280px 1fr', padding: '16px 0', borderBottom: hairline, alignItems: 'center', gap: 32 }}>
              <code style={{ fontFamily: mono, fontSize: 12, color: C.black }}>{file}</code>
              <span style={{ fontSize: 13, color: C.steel, lineHeight: 1.5 }}>{purpose}</span>
            </div>
          ))}
        </div>
        <PageFooter line={t('page.footer.line')} />
      </section>
    </>
  )
}

export default function Page() {
  return <Governance />
}
