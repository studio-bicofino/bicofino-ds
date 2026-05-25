import type { Metadata } from 'next'
import './globals.css'
import { ThemeToggle } from '@/components/ThemeToggle'
import { BicofinoLogo } from '@/components/BicofinoLogo'

export const metadata: Metadata = {
  title: 'Itália 2027 — Geografia Bicofino',
  description:
    'Primeira edição da série Geografia Bicofino. Itália: capital criativo, capital financeiro, capital esportivo.',
  robots: 'noindex,nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bf-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}setTimeout(function(){document.documentElement.setAttribute('data-theme-loaded','1');},0);})();`,
          }}
        />

        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'var(--bf-bg-page)',
            borderBottom: '1px solid var(--bf-border)',
            backdropFilter: 'saturate(140%) blur(8px)',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <a
                href="/"
                aria-label="Bicofino — início"
                style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--bf-text-primary)' }}
              >
                <BicofinoLogo height={20} />
              </a>
              <span
                aria-hidden
                style={{ width: 1, height: 20, background: 'var(--bf-border-strong)' }}
              />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: 'var(--bf-text-secondary)',
                    textTransform: 'uppercase',
                  }}
                >
                  Geografia Bicofino · I
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--bf-text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Itália 2027
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main>{children}</main>

        <footer
          style={{
            borderTop: '1px solid var(--bf-border)',
            padding: '48px 32px',
            marginTop: 96,
          }}
        >
          <div
            style={{
              maxWidth: 1080,
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 24,
              color: 'var(--bf-text-secondary)',
              fontSize: 13,
            }}
          >
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Edição nominal · não circula fora do círculo de destinatários
            </div>
            <div style={{ fontSize: 13 }}>Audiência restrita · Membros Club Bicofino</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
