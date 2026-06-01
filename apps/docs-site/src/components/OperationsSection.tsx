'use client'

import React from 'react'
import { FocusReveal } from '@/components/motion/FocusReveal'
import { useLang } from '@/content'

const C = {
  black:     'var(--bf-text-primary)',
  bg:        'var(--bf-bg-page)',
  white:     'var(--bf-surface)',
  steel:     'var(--bf-text-secondary)',
  platinum:  'var(--bf-text-subtle)',
  aluminium: '#e2eaf2',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 72

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
    <p className="editorial-prose text-pretty" style={{ fontSize: 15, lineHeight: 1.7, color: C.steel, margin: '0 0 0', maxWidth: 640 }}>
      {children}
    </p>
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
      <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 10px' }}>{label}</p>
      <h2 className="text-balance" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: 0, lineHeight: 1.1, fontFamily: sans }}>{title}</h2>
    </div>
  )
}

function PageFooter({ line }: { line: string }) {
  return (
    <div style={{ padding: '32px ' + H_PAD + 'px 48px', borderTop: hairline }}>
      <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>
        {line}
      </p>
    </div>
  )
}

export function OperationsSection() {
  const { t } = useLang()

  const tools = [
    { role: t('ops.tool.memory.role'), name: t('ops.tool.memory.name') },
    { role: t('ops.tool.org.role'),    name: t('ops.tool.org.name') },
    { role: t('ops.tool.orch.role'),   name: t('ops.tool.orch.name') },
    { role: t('ops.tool.intel.role'),  name: t('ops.tool.intel.name') },
    { role: t('ops.tool.design.role'), name: t('ops.tool.design.name') },
    { role: t('ops.tool.vi.role'),     name: t('ops.tool.vi.name') },
    { role: t('ops.tool.video.role'),  name: t('ops.tool.video.name') },
    { role: t('ops.tool.motion.role'), name: t('ops.tool.motion.name') },
    { role: t('ops.tool.imggen.role'), name: t('ops.tool.imggen.name') },
    { role: t('ops.tool.vidgen.role'), name: t('ops.tool.vidgen.name') },
  ]

  const principles = [
    { title: t('ops.p1.title'), desc: t('ops.p1.desc') },
    { title: t('ops.p2.title'), desc: t('ops.p2.desc') },
    { title: t('ops.p3.title'), desc: t('ops.p3.desc') },
    { title: t('ops.p4.title'), desc: t('ops.p4.desc') },
    { title: t('ops.p5.title'), desc: t('ops.p5.desc') },
    { title: t('ops.p6.title'), desc: t('ops.p6.desc') },
  ]

  const deliveryFlow = [
    t('ops.flow.step1'),
    t('ops.flow.step2'),
    t('ops.flow.step3'),
    t('ops.flow.step4'),
    t('ops.flow.step5'),
    t('ops.flow.step6'),
  ]

  const policies = [
    t('ops.policy1'),
    t('ops.policy2'),
    t('ops.policy3'),
    t('ops.policy4'),
  ]

  return (
    <section id="operacoes">
      <SectionHeader eyebrow={t('ops.eyebrow')}>{t('ops.title')}</SectionHeader>

      <FocusReveal style={{ padding: '40px ' + H_PAD + 'px 0' }}>
        <Lead>{t('ops.lead')}</Lead>
      </FocusReveal>

      {/* Brand Architecture */}
      <div id="ops-arch" style={{ scrollMarginTop: 88 }}>
      <SubHeader label={t('ops.arch.label')} title={t('ops.arch.title')} />
      
      <div style={{ margin: '0 ' + H_PAD + 'px', display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
        
        {/* On Pitch */}
        <div style={{ background: C.white, padding: '40px', borderTop: '3px solid ' + C.black }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 8px', fontFamily: sans }}>{t('ops.onfield.title')}</h3>
            <p style={{ fontFamily: mono, fontSize: 11, color: C.steel, margin: 0, letterSpacing: '0.04em' }}>{t('ops.onfield.subtitle')}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 24 }}>
            {t('ops.onfield.desc')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t('ops.onfield.delivers.label')}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  t('ops.onfield.d1'), t('ops.onfield.d2'), t('ops.onfield.d3'),
                  t('ops.onfield.d4'), t('ops.onfield.d5'), t('ops.onfield.d6'),
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: C.steel, display: 'flex', gap: 8 }}>
                    <span style={{ color: C.platinum }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t('ops.onfield.serves.label')}</p>
              <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6 }}>
                {t('ops.onfield.serves.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Off Pitch */}
        <div style={{ background: C.white, padding: '40px', borderTop: '3px solid ' + C.steel }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.black, margin: '0 0 8px', fontFamily: sans }}>{t('ops.offfield.title')}</h3>
            <p style={{ fontFamily: mono, fontSize: 11, color: C.steel, margin: 0, letterSpacing: '0.04em' }}>{t('ops.offfield.subtitle')}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 24 }}>
            {t('ops.offfield.desc')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t('ops.offfield.delivers.label')}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  t('ops.offfield.d1'), t('ops.offfield.d2'), t('ops.offfield.d3'),
                  t('ops.offfield.d4'), t('ops.offfield.d5'), t('ops.offfield.d6'),
                  t('ops.offfield.d7'),
                ].map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: C.steel, display: 'flex', gap: 8 }}>
                    <span style={{ color: C.platinum }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t('ops.offfield.serves.label')}</p>
              <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6 }}>
                {t('ops.offfield.serves.desc')}
              </p>
            </div>
          </div>
          <div style={{ padding: '20px', background: 'var(--bf-surface-subtle)', borderRadius: 2 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.black, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t('ops.offfield.diff.label')}</p>
            <p style={{ fontSize: 13, color: C.steel, lineHeight: 1.6, margin: 0 }}>
              {t('ops.offfield.diff.desc')}
            </p>
          </div>
        </div>

        {/* Club */}
        <div style={{ background: C.black, padding: '40px', borderTop: '3px solid ' + C.white }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: C.white, margin: '0 0 8px', fontFamily: sans }}>{t('ops.club.title')}</h3>
            <p style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0, letterSpacing: '0.04em' }}>{t('ops.club.subtitle')}</p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.8)', margin: '0 0 16px' }}>
            {t('ops.club.desc')}
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, letterSpacing: '0.04em', fontStyle: 'italic' }}>
            {t('ops.club.confidential')}
          </p>
        </div>
      </div>

      <div style={{ margin: '48px ' + H_PAD + 'px 0' }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' }}>{t('ops.visual.label')}</p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 20, maxWidth: 640 }}>
          {t('ops.visual.desc')}
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <li style={{ fontSize: 14, color: C.steel, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: C.black, fontWeight: 600 }}>On Pitch:</span>
            <span>{t('ops.visual.onfield')}</span>
          </li>
          <li style={{ fontSize: 14, color: C.steel, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: C.black, fontWeight: 600 }}>Off Pitch:</span>
            <span>{t('ops.visual.offfield')}</span>
          </li>
        </ul>
      </div>

      </div>

      {/* Delivery Standards */}
      <div id="ops-delivery" style={{ scrollMarginTop: 88 }}>
      <SubHeader label={t('ops.delivery.label')} title={t('ops.delivery.title')} />
      
      <div style={{ margin: '0 ' + H_PAD + 'px' }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: C.steel, marginBottom: 32, maxWidth: 640 }}>
          {t('ops.delivery.desc')}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 64 }}>
          {principles.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px', background: C.white, border: hairline }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.platinum, fontWeight: 600 }}>{i + 1}.</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.black, margin: '0 0 4px' }}>{p.title}</p>
                <p style={{ fontSize: 13, color: C.steel, margin: 0, fontStyle: 'italic' }}>— {p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operation tools */}
      <div style={{ margin: '0 ' + H_PAD + 'px' }}>
        <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 16px', textTransform: 'uppercase' }}>{t('ops.tools.label')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', padding: '8px 0', borderBottom: '1px solid var(--bf-border-strong)' }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('ops.tools.col.role')}</span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: C.steel, fontWeight: 600 }}>{t('ops.tools.col.tool')}</span>
        </div>
        {tools.map(({ role, name }) => (
          <div key={role} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', padding: '16px 0', borderBottom: '1px solid var(--bf-border)', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.black, fontFamily: sans }}>{role}</span>
            <span style={{ fontSize: 13, color: C.steel, lineHeight: 1.5 }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Delivery flow & Commercial policy */}
      <div style={{ margin: '64px ' + H_PAD + 'px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' }}>{t('ops.flow.label')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {deliveryFlow.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: C.black, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 10, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 14, color: C.black }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.steel, margin: '0 0 24px', textTransform: 'uppercase' }}>{t('ops.commercial.label')}</p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {policies.map((policy, i) => (
              <li key={i} style={{ fontSize: 14, color: C.steel, display: 'flex', gap: 12, lineHeight: 1.5 }}>
                <span style={{ color: C.platinum, marginTop: -2 }}>✦</span> {policy}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ margin: '64px ' + H_PAD + 'px 0' }}>
        <div style={{ padding: '32px 40px', background: C.black, color: C.white, borderRadius: 2 }}>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: '0 0 4px' }}>{t('ops.brand.line1')}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{t('ops.brand.line2')}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{t('ops.brand.line3')}</p>
          <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: '0 0 16px' }}>{t('ops.brand.version')}</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: C.white, margin: 0, letterSpacing: '-0.01em' }}>{t('ops.brand.tagline')}</p>
        </div>
      </div>

      </div>

      <PageFooter line={t('page.footer.line')} />
    </section>
  )
}
