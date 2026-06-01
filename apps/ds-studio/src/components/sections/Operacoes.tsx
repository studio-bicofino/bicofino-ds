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

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div style={{ padding: `80px ${H_PAD} 56px`, borderBottom: hairline }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance section-title" style={{ fontWeight: 700, letterSpacing: '-0.03em', color: C.black, margin: '0 0 20px', lineHeight: 1.0, fontFamily: sans }}>
        {title}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: 0, maxWidth: 640, fontFamily: sans }}>
        {lead}
      </p>
    </div>
  )
}

function SubHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ padding: `56px ${H_PAD} 28px` }}>
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h3 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h3>
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
   06.1 — Arquitetura de Marca
   ═══════════════════════════════════════════════════════════ */
function ArquiteturaSection() {
  const { t } = useLang()

  return (
    <div id="arquitetura" style={{ scrollMarginTop: 88 }}>
      <SubHeader label={t('ops_arch_label')} title={t('ops_arch_title')} />

      <div style={{ margin: `0 ${H_PAD}`, display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>

        {/* On Field */}
        <div style={{ background: C.surface, padding: '40px', borderTop: `3px solid ${C.black}` }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 8px', fontFamily: sans }}>{t('ops_onfield_title')}</h3>
            <p style={{ fontFamily: mono, fontSize: 11, color: C.steel, margin: 0, letterSpacing: '0.04em' }}>{t('ops_onfield_subtitle')}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 24 }}>
            {t('ops_onfield_desc')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontFamily: sans }}>{t('ops_onfield_delivers')}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {([
                  t('ops_onfield_d1'), t('ops_onfield_d2'), t('ops_onfield_d3'),
                  t('ops_onfield_d4'), t('ops_onfield_d5'), t('ops_onfield_d6'),
                ] as string[]).map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: C.steel, display: 'flex', gap: 8 }}>
                    <span style={{ color: C.platinum }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontFamily: sans }}>{t('ops_onfield_serves')}</p>
              <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6 }}>
                {t('ops_onfield_serves_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Off Field */}
        <div style={{ background: C.surface, padding: '40px', borderTop: `3px solid ${C.steel}` }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 8px', fontFamily: sans }}>{t('ops_offfield_title')}</h3>
            <p style={{ fontFamily: mono, fontSize: 11, color: C.steel, margin: 0, letterSpacing: '0.04em' }}>{t('ops_offfield_subtitle')}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 24 }}>
            {t('ops_offfield_desc')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontFamily: sans }}>{t('ops_offfield_delivers')}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {([
                  t('ops_offfield_d1'), t('ops_offfield_d2'), t('ops_offfield_d3'),
                  t('ops_offfield_d4'), t('ops_offfield_d5'), t('ops_offfield_d6'),
                  t('ops_offfield_d7'),
                ] as string[]).map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: C.steel, display: 'flex', gap: 8 }}>
                    <span style={{ color: C.platinum }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontFamily: sans }}>{t('ops_offfield_serves')}</p>
              <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6 }}>
                {t('ops_offfield_serves_desc')}
              </p>
            </div>
          </div>
          <div style={{ padding: '20px', background: 'var(--bf-surface-subtle)', borderRadius: 2 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.04em', fontFamily: sans }}>{t('ops_offfield_diff')}</p>
            <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6, margin: 0 }}>
              {t('ops_offfield_diff_desc')}
            </p>
          </div>
        </div>

        {/* Club */}
        <div style={{ background: C.black, padding: '40px', borderTop: `3px solid ${C.surface}` }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.surface, margin: '0 0 8px', fontFamily: sans }}>{t('ops_club_title')}</h3>
            <p style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0, letterSpacing: '0.04em' }}>{t('ops_club_subtitle')}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.8)', margin: '0 0 16px' }}>
            {t('ops_club_desc')}
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, letterSpacing: '0.04em', fontStyle: 'italic' }}>
            {t('ops_club_confidential')}
          </p>
        </div>

      </div>

      {/* Visual architecture note */}
      <div style={{ margin: `48px ${H_PAD} 0` }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>{t('ops_visual_label')}</p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 20, maxWidth: 640 }}>
          {t('ops_visual_desc')}
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <li style={{ fontSize: 14, color: C.steel, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: C.black, fontWeight: 600, fontFamily: sans }}>On Field:</span>
            <span>{t('ops_visual_onfield')}</span>
          </li>
          <li style={{ fontSize: 14, color: C.steel, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: C.black, fontWeight: 600, fontFamily: sans }}>Off Field:</span>
            <span>{t('ops_visual_offfield')}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   06.2 — Padrões de Entrega
   ═══════════════════════════════════════════════════════════ */
function DeliverySection() {
  const { t } = useLang()

  const principles = [
    { title: t('ops_p1_title'), desc: t('ops_p1_desc') },
    { title: t('ops_p2_title'), desc: t('ops_p2_desc') },
    { title: t('ops_p3_title'), desc: t('ops_p3_desc') },
    { title: t('ops_p4_title'), desc: t('ops_p4_desc') },
    { title: t('ops_p5_title'), desc: t('ops_p5_desc') },
    { title: t('ops_p6_title'), desc: t('ops_p6_desc') },
  ]

  const tools = [
    { role: t('ops_tool_memory_role'), name: t('ops_tool_memory_name') },
    { role: t('ops_tool_org_role'),    name: t('ops_tool_org_name') },
    { role: t('ops_tool_orch_role'),   name: t('ops_tool_orch_name') },
    { role: t('ops_tool_intel_role'),  name: t('ops_tool_intel_name') },
    { role: t('ops_tool_design_role'), name: t('ops_tool_design_name') },
    { role: t('ops_tool_vi_role'),     name: t('ops_tool_vi_name') },
    { role: t('ops_tool_video_role'),  name: t('ops_tool_video_name') },
    { role: t('ops_tool_motion_role'), name: t('ops_tool_motion_name') },
    { role: t('ops_tool_imggen_role'), name: t('ops_tool_imggen_name') },
    { role: t('ops_tool_vidgen_role'), name: t('ops_tool_vidgen_name') },
  ]

  const deliveryFlow = [
    t('ops_flow_s1'),
    t('ops_flow_s2'),
    t('ops_flow_s3'),
    t('ops_flow_s4'),
    t('ops_flow_s5'),
    t('ops_flow_s6'),
  ]

  const policies = [
    t('ops_policy1'),
    t('ops_policy2'),
    t('ops_policy3'),
    t('ops_policy4'),
  ]

  return (
    <div id="delivery" style={{ scrollMarginTop: 88 }}>
      <SubHeader label={t('ops_delivery_label')} title={t('ops_delivery_title')} />

      {/* Operation principles */}
      <div style={{ margin: `0 ${H_PAD}` }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 32, maxWidth: 640 }}>
          {t('ops_delivery_desc')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24, marginBottom: 64 }}>
          {principles.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px', background: C.surface, border: hairline }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.platinum, fontWeight: 600 }}>{i + 1}.</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.black, margin: '0 0 4px', fontFamily: sans }}>{p.title}</p>
                <p style={{ fontSize: 13, color: C.steel, margin: 0, fontStyle: 'italic' }}>— {p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operation tools */}
      <div style={{ margin: `0 ${H_PAD}` }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' as const }}>{t('ops_tools_label')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 240px) 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('ops_tools_col_role')}</span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('ops_tools_col_tool')}</span>
        </div>
        {tools.map(({ role, name }) => (
          <div key={role} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 240px) 1fr', padding: '16px 0', borderBottom: hairline, alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.black, fontFamily: sans }}>{role}</span>
            <span style={{ fontSize: 13, color: C.steel, lineHeight: 1.5 }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Delivery flow & Commercial policy */}
      <div style={{ margin: `64px ${H_PAD} 0`, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 48 }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' as const }}>{t('ops_flow_label')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {deliveryFlow.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: C.black, color: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 10, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 14, color: C.black, fontFamily: sans }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' as const }}>{t('ops_commercial_label')}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {policies.map((policy, i) => (
              <li key={i} style={{ fontSize: 14, color: C.steel, display: 'flex', gap: 12, lineHeight: 1.5 }}>
                <span style={{ color: C.platinum, marginTop: -2 }}>✦</span> {policy}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Brand signature */}
      <div style={{ margin: `64px ${H_PAD} 0` }}>
        <div style={{ padding: '32px 40px', background: C.black, color: C.surface, borderRadius: 2 }}>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: '0 0 4px' }}>{t('ops_brand_line1')}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{t('ops_brand_line2')}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{t('ops_brand_line3')}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>{t('ops_brand_version')}</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.surface, margin: 0, letterSpacing: '-0.01em', fontFamily: sans }}>{t('ops_brand_tagline')}</p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Export
   ═══════════════════════════════════════════════════════════ */
export default function Operacoes() {
  const { t } = useLang()

  return (
    <>
      <SectionTitle
        eyebrow={t('ops_eyebrow')}
        title={t('ops_heading')}
        lead={t('ops_lead')}
      />

      <ArquiteturaSection />
      <DeliverySection />

      <PageFooter />
    </>
  )
}
