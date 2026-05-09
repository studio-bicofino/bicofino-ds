'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeCtx {
  theme: Theme
  setTheme: (t: Theme) => void
}

const Ctx = createContext<ThemeCtx>({ theme: 'light', setTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bf-theme') as Theme | null
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored)
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setThemeState(prefersDark ? 'dark' : 'light')
      }
    } catch {
      // localStorage unavailable
    }
    document.documentElement.setAttribute('data-theme-loaded', '')
  }, [])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('bf-theme', t)
    } catch {
      // localStorage unavailable
    }
  }

  return React.createElement(Ctx.Provider, { value: { theme, setTheme } }, children)
}

export function useTheme(): ThemeCtx {
  return useContext(Ctx)
}
