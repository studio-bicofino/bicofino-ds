import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/content/index'

export const metadata: Metadata = {
  metadataBase: new URL('https://bicofino.com'),
  title: 'Bicofino — Unlike Any Other',
  description:
    'Bicofino Group — curadoria, conexão e criatividade ao mais alto nível. On Field. Off Field. São Paulo.',
  openGraph: {
    title: 'Bicofino — Unlike Any Other',
    description:
      'Bicofino Group — curation, connection, and creativity at the highest level.',
    images: [{ url: '/og-image.png' }],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

/* Anti-FOUC: runs before paint, sets data-theme from localStorage */
const themeScript = `
try {
  var t = localStorage.getItem('bf-theme');
  if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
} catch(e) {}
document.documentElement.setAttribute('data-theme-loaded', '');
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
