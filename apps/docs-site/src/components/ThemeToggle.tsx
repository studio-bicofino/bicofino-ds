'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/content/theme'

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="bf-theme-btn"
    >
      {/* Sun — visible when dark (to switch back to light) */}
      <span className={`bf-theme-icon${isDark ? '' : ' bf-theme-icon--hidden'}`}>
        <Sun size={16} strokeWidth={1.5} />
      </span>
      {/* Moon — visible when light (to switch to dark) */}
      <span className={`bf-theme-icon${isDark ? ' bf-theme-icon--hidden' : ''}`}>
        <Moon size={16} strokeWidth={1.5} />
      </span>
    </button>
  )
}
