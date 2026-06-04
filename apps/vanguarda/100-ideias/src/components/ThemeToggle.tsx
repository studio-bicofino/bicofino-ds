'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('bf-theme')) as
      | 'light'
      | 'dark'
      | null
    const initial =
      stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('bf-theme', next)
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
      style={{
        background: 'transparent',
        border: '1px solid var(--bf-border)',
        borderRadius: 4,
        width: 36,
        height: 36,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--bf-text-secondary)',
        cursor: 'pointer',
        transition: 'color 180ms ease-out, border-color 180ms ease-out',
      }}
    >
      {theme === 'light' ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
    </button>
  )
}
