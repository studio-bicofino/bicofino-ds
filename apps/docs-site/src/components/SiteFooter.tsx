'use client'

import { BicofinoLogo } from './BicofinoLogo'
import { useLang } from '@/content'

/* ─── Design tokens ─── */
const C = {
  black:    'var(--bf-text-primary)',
  bg:       'var(--bf-bg-page)',
  steel:    'var(--bf-text-secondary)',
  platinum: 'var(--bf-text-subtle)',
}

const mono = '"JetBrains Mono", monospace'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 5vw, 72px)'

function Footer() {
  const { t } = useLang()

  return (
    <footer style={{ borderTop: `3px solid var(--bf-border-strong)`, background: C.bg }}>
      <div style={{ padding: `64px ${H_PAD} 48px`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 'clamp(32px, 4vw, 64px)' }}>
        <div>
          <BicofinoLogo color={C.black} width={130} />
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[t('footer.meta1'), t('footer.meta2'), t('footer.meta3')].map(l => (
              <p key={l} style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>{l}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
          {[
            { label: t('footer.system'),    value: t('footer.system.value') },
            { label: t('footer.docs'),      value: t('footer.docs.value') },
            { label: t('footer.verticals'), value: t('footer.verticals.value') },
          ].map(({ label, value }) => (
            <p key={label} style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, lineHeight: 1.6 }}>
              <span style={{ color: C.black, marginRight: 12, letterSpacing: '0.08em' }}>{label}</span>
              {value}
            </p>
          ))}
        </div>

        <div style={{ paddingTop: 4 }}>
          <p style={{ fontFamily: mono, fontSize: 9, color: C.steel, margin: '0 0 14px', letterSpacing: '0.1em' }}>{t('footer.creative')}</p>
          <p style={{ fontSize: 13, color: C.black, margin: '0 0 3px' }}>woney@bicofino.com</p>
          <p style={{ fontSize: 13, color: C.black, margin: '0 0 16px' }}>branca@bicofino.com</p>
          <p style={{ fontSize: 13, color: C.steel, margin: 0 }}>bicofino.com</p>
        </div>
      </div>

      <div style={{ borderTop: hairline, padding: `14px ${H_PAD}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.06em' }}>{t('footer.tagline')}</p>
        <p style={{ fontFamily: mono, fontSize: 10, color: C.platinum, margin: 0, letterSpacing: '0.1em' }}>// v1.0 · 04 · 2026</p>
      </div>
    </footer>
  )
}

export { Footer as SiteFooter }
