import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-inter',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'La Rete · Casa Nostra // Bicofino',
  description:
    'Matchmaking da rede Casa Nostra: ligações entre membros, oportunidades de negócio e aderência a tendências de mercado.',
}

/* Um vibrante por composição, sorteado a cada refresh (DESIGN.md §5).
   Fallback SSR: coral SPFC. Em chão power-black o sorteio exclui os
   Highlights que reprovam contraste no escuro (usa #05185c, torino #821324). */
const ACCENTS = [
  '#f0535e',
  '#2fd298',
  '#fe4600',
  '#e5ff78',
  '#f4b3cb',
  '#77deff',
  '#0d8aff',
  '#38e0e3',
  '#711cfe',
  '#ed0007',
]

const accentScript = `(function(){var a=${JSON.stringify(
  ACCENTS,
)};document.documentElement.style.setProperty('--current-accent',a[Math.floor(Math.random()*a.length)])})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
