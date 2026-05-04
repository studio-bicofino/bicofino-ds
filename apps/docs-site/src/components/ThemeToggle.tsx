'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/content/theme'

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        color: 'var(--bf-sidebar-subtle)',
        transition: 'color 150ms cubic-bezier(0.2,0,0,1)',
        lineHeight: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(242,248,255,0.85)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--bf-sidebar-subtle)')}
    >
      {isDark
        ? <Sun size={13} strokeWidth={1.5} />
        : <Moon size={13} strokeWidth={1.5} />
      }
    </button>
  )
}
