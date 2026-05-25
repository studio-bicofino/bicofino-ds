import type { Metadata } from 'next'
import './globals.css'
import { BicofinoLogo } from '@/components/BicofinoLogo'

export const metadata: Metadata = {
  title: 'BoviClass — Orçamento Studio Bicofino',
  description: 'Orçamento Studio Bicofino para BoviChain — Campanha BoviClass.',
  robots: 'noindex,nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('bf-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}setTimeout(function(){document.documentElement.setAttribute('data-theme-loaded','1');},0);})();` }} />

        {/* Header global — logo Bicofino no topo */}
        <header
          style={{
            padding: '28px 72px',
            borderBottom: '1px solid var(--bf-border)',
            background: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <BicofinoLogo color="var(--bf-text-primary)" width={120} />
            <p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.12em',
                color: 'var(--bf-text-subtle)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Documento confidencial · BoviChain
            </p>
          </div>
        </header>

        <main id="main-content" style={{ background: 'var(--bf-bg-page)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
