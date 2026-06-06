import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/content/index'

export const metadata: Metadata = {
  metadataBase: new URL('https://bicofino.com'),
  title: 'Bicofino — Unlike Any Other',
  description:
    'Bicofino Group — curadoria, conexão e criatividade ao mais alto nível. On Pitch. Off Pitch. São Paulo.',
  openGraph: {
    title: 'Bicofino — Unlike Any Other',
    description:
      'Bicofino Group — curation, connection, and creativity at the highest level.',
    images: [{ url: '/og-image.png' }],
  },
  // Favicons resolved from app/{favicon.ico,icon.svg,icon.png,apple-icon.png}
  // via Next's file-based metadata convention (the Bicofino sparkle).
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
        <style>{`.bf-skip-link{position:absolute;left:-9999px;top:16px;z-index:9999;padding:8px 16px;background:var(--bf-bg-page);color:var(--bf-text-primary);font-family:"Inter",ui-sans-serif,sans-serif;font-size:14px;text-decoration:none;border-radius:var(--bf-radius-md);border:1px solid var(--bf-border)}.bf-skip-link:focus{left:16px}`}</style>
        {/* No-JS fallback: hide the intro overlay and force-reveal any content
            that waits on entrance motion, so nothing is trapped behind JS. */}
        <noscript><style>{`.bf-intro-overlay{display:none!important}.bf-reveal{opacity:1!important;transform:none!important}`}</style></noscript>
      </head>
      <body>
        <a href="#main-content" className="bf-skip-link">Pular para o conteúdo</a>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
