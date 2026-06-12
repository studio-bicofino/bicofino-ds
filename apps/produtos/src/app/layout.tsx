import type { Metadata } from 'next'
import './globals.css'
import { AccentRandomizer } from '@/components/AccentRandomizer'

export const metadata: Metadata = {
  title: 'Produtos — Studio Bicofino',
  description:
    'Sistemas próprios do Studio Bicofino, prontos para novos clientes — com valor de mercado, prazo e infraestrutura.',
  robots: { index: false, follow: false },
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
