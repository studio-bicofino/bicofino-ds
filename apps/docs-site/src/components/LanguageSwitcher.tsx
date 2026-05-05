'use client'

import { useLang, type Lang } from '@/content'

const mono = '"JetBrains Mono", monospace'

const LANGS: { code: Lang; label: string; activeColor: string }[] = [
  { code: 'en', label: 'EN', activeColor: 'var(--bf-como)' },
  { code: 'br', label: 'BR', activeColor: 'var(--bf-sep)' },
  { code: 'it', label: 'IT', activeColor: '#ed0007' },
]

export function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      {LANGS.map(({ code, label, activeColor }, i) => (
        <span key={code} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {i > 0 && (
            <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(242,248,255,0.18)', userSelect: 'none' }}>
              •
            </span>
          )}
          <button
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: lang === code ? activeColor : '#a8c9e5',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontWeight: lang === code ? 600 : 400,
              transition: 'color 150ms cubic-bezier(0.2,0,0,1)',
              lineHeight: 1,
            }}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  )
}
