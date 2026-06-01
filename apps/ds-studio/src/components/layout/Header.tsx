'use client'

import { Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { useLang, type Lang } from '@/content/index'

export function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { theme, toggle } = useTheme()
  const { lang, setLang, t } = useLang()

  const langs: Lang[] = ['br', 'en', 'it']

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-md lg:hidden"
      style={{
        height: 56,
        background: 'var(--bf-black)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuOpen}
        className="p-sm rounded-sm"
        style={{ color: 'var(--bf-surface)' }}
        aria-label={t('ui.menu.open')}
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Logo */}
      <span
        className="text-xs uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--bf-accent)' }}
      >
        Bicofino DS
      </span>

      {/* Controls */}
      <div className="flex items-center gap-sm">
        {/* Language switcher */}
        <div className="flex items-center gap-[4px]">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="text-xs px-[6px] py-[2px] rounded-sm uppercase tracking-wider transition-colors"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                color: lang === l ? 'var(--bf-accent)' : 'rgba(242,248,255,0.45)',
                background: lang === l ? 'rgba(191,163,122,0.12)' : 'transparent',
              }}
              aria-pressed={lang === l}
            >
              {l === 'br' ? 'PT' : l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-sm rounded-sm transition-colors"
          style={{ color: 'rgba(242,248,255,0.6)' }}
          aria-label={t('ui.theme.toggle')}
        >
          {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
        </button>
      </div>
    </header>
  )
}
