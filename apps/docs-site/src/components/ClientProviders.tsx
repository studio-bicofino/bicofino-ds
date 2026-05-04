'use client'

import React from 'react'
import { LanguageProvider } from '@/content'
import { ThemeProvider } from '@/content/theme'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
