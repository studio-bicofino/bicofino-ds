import type { Metadata } from 'next'
import './globals.css'
import { AccentRandomizer } from '@/components/AccentRandomizer'

export const metadata: Metadata = {
  title: 'Drive do Atleta — Bicofino',
  description:
    'Envie fotos e vídeos do seu material esportivo para o acervo Bicofino. Quanto melhor catalogado, mais fácil transformar seu conteúdo em oportunidades.',
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
