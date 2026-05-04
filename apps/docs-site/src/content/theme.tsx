'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeCtx {
  theme: Theme
  setTheme: (t: Theme) => void
  isDark: boolean
}

const Ctx = createContext<ThemeCtx>({
  theme: 'light',
  setTheme: () => {},
  isDark: false,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bf-theme') as Theme | null
      if (stored === 'dark' || stored === 'light') {
        setThemeState(stored)
        document.documentElement.setAttribute('data-theme', stored)
      }
    } catch {}
    document.documentElement.setAttribute('data-theme-loaded', '')
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('bf-theme', t)
    } catch {}
  }

  return (
    <Ctx.Provider value={{ theme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </Ctx.Provider>
  )
}

export function useTheme(): ThemeCtx {
  return useContext(Ctx)
}
