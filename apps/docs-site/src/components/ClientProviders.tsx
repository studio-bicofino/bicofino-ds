'use client'

import { LanguageProvider } from '@/content'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
