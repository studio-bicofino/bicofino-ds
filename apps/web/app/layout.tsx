import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/content/index'
import { PrivacyNotice } from '@/components/layout/PrivacyNotice'

export const metadata: Metadata = {
  metadataBase: new URL('https://bicofino.com'),
  title: {
    default: 'Bicofino — Unlike Any Other',
    template: '%s — Bicofino',
  },
  description:
    'Bicofino Group — curadoria, conexão e criatividade ao mais alto nível. On Pitch. Off Pitch. São Paulo.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://bicofino.com',
    siteName: 'Bicofino',
    locale: 'pt_BR',
    title: 'Bicofino — Unlike Any Other',
    description: 'Connect. Curate. Create. Consult.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bicofino — Unlike Any Other' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bicofino — Unlike Any Other',
    description: 'Connect. Curate. Create. Consult.',
    images: ['/og-image.png'],
  },
  // Favicons resolved from app/{favicon.ico,icon.svg,icon.png,apple-icon.png}
  // via Next's file-based metadata convention (the Bicofino sparkle).
}

/* Structured data (JSON-LD) — Organization + WebSite, per Google Search Central. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bicofino.com/#organization',
      name: 'Bicofino Group',
      url: 'https://bicofino.com',
      logo: 'https://bicofino.com/icon.png',
      slogan: 'Unlike Any Other.',
      email: 'hello@bicofino.com',
      sameAs: ['https://www.instagram.com/bicofino'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Pedroso de Morais, 1619',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        postalCode: '05019-001',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://bicofino.com/#website',
      name: 'Bicofino',
      url: 'https://bicofino.com',
      publisher: { '@id': 'https://bicofino.com/#organization' },
      inLanguage: ['pt-BR', 'en', 'it'],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="bf-skip-link">Pular para o conteúdo</a>
        <LanguageProvider>
          {children}
          <PrivacyNotice />
        </LanguageProvider>
      </body>
    </html>
  )
}
