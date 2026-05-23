'use client'

import { ThemeToggle } from './ThemeToggle'
import { useLang, type Lang } from '@/content'

/* ─── Design tokens ─── */
const C = {
  black:      'var(--bf-text-primary)',
  bg:         'var(--bf-bg-page)',
  steel:      'var(--bf-text-secondary)',
  aluminium:  '#e2eaf2',
  como:       '#0d8aff',
  sep:        '#2fd298',
  benfica:    '#ed0007',
}

const mono = '"JetBrains Mono", monospace'
const sans = '"Inter", sans-serif'
const hairline = '1px solid var(--bf-border)'
const H_PAD = 'clamp(16px, 5vw, 72px)'

function TopBarLangToggle() {
  const { lang, setLang } = useLang()
  const options: { code: Lang; label: string; activeColor: string }[] = [
    { code: 'en', label: 'EN', activeColor: C.como },
    { code: 'br', label: 'BR', activeColor: C.sep },
    { code: 'it', label: 'IT', activeColor: C.benfica },
  ]
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'var(--bf-pill-bg)',
      borderRadius: 4,
      padding: 2,
      gap: 1,
    }}>
      {options.map(({ code, label, activeColor }) => {
        const isActive = lang === code
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isActive ? '#ffffff' : C.steel,
              background: isActive ? activeColor : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '5px 9px',
              borderRadius: 3,
              fontWeight: isActive ? 600 : 400,
              transition: 'background 200ms cubic-bezier(0.2,0,0,1), color 200ms cubic-bezier(0.2,0,0,1)',
              lineHeight: 1,
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function TopBar() {
  const { t } = useLang()
  return (
    <div className="bf-topbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: C.bg,
      borderBottom: hairline,
      padding: `24px ${H_PAD}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      rowGap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 12px)', flexWrap: 'wrap', minWidth: 0 }}>
        <span style={{ fontFamily: sans, fontSize: 13, color: C.black, fontWeight: 400 }}>{t('topbar.title')}</span>
        <span style={{ color: C.aluminium, fontSize: 13 }}>·</span>
        <span style={{ fontFamily: sans, fontSize: 13, color: C.black, fontWeight: 600 }}>{t('topbar.subtitle')}</span>
        <span style={{ color: C.aluminium, fontSize: 13 }}>·</span>
        <span style={{ fontFamily: sans, fontSize: 12, color: C.steel, fontWeight: 400 }}>{t('topbar.version')}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, whiteSpace: 'nowrap' }}>
        <ThemeToggle />
        <TopBarLangToggle />
        <p style={{ fontFamily: mono, fontSize: 10, color: C.steel, margin: 0, letterSpacing: '0.08em', display: 'flex', alignItems: 'center' }}>
          {t('topbar.date')}
        </p>
      </div>
    </div>
  )
}

export { TopBar }
