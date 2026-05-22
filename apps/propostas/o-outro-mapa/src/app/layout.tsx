import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { MobileTopbar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'O Outro Mapa — Bicofino',
  description: 'Proposta de patrocínio — 14 federações estaduais, 4 regiões, uma marca.',
  robots: 'noindex,nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('bf-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}setTimeout(function(){document.documentElement.setAttribute('data-theme-loaded','1');},0);})();` }} />

        {/* Desktop sidebar — hidden on mobile via CSS */}
        <div className="bf-sidebar-desktop-wrap">
          <Sidebar />
        </div>

        {/* Main — scrolls independently */}
        <main
          id="main-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'var(--bf-bg-page)',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Mobile topbar + drawer — sticky inside main, hidden on desktop */}
          <MobileTopbar />
          {children}
        </main>
      </body>
    </html>
  )
}
