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
  title: 'Bicofino Motion Lab',
  description:
    'Zona franca de experimentação de motion — GSAP, ScrollTrigger, Lenis. Experimentos viram receitas no DESIGN.md.',
  robots: { index: false, follow: false },
}

// Subset de Highlights legíveis sobre power-black (o lab roda dark).
const ACCENTS = [
  '#f0535e', '#2fd298', '#fe4600', '#e5ff78', '#f4b3cb',
  '#77deff', '#0d8aff', '#38e0e3', '#711cfe',
]

const accentScript = `(function(){var a=${JSON.stringify(ACCENTS)};document.documentElement.style.setProperty('--current-accent',a[Math.floor(Math.random()*a.length)])})()`

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
