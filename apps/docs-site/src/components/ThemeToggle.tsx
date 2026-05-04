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
        color: 'var(--bf-text-secondary)',
        opacity: 0.6,
        transition: 'opacity 150ms cubic-bezier(0.2,0,0,1)',
        lineHeight: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
    >
      {isDark
        ? <Sun size={16} strokeWidth={1.5} />
        : <Moon size={16} strokeWidth={1.5} />
      }
    </button>
  )
}
