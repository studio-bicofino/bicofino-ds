import type { Metadata } from 'next'
import './globals.css'
import { AccentRandomizer } from '@/components/AccentRandomizer'

export const metadata: Metadata = {
  title: 'Registro de Impacto — Studio Bicofino',
  description:
    'O que os sistemas economizam, em horas e em reais. Studio Bicofino.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-mode="system">
      <body>
        <AccentRandomizer />
        {children}
      </body>
    </html>
  )
}
