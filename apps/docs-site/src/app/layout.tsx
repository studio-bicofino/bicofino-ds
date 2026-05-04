import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { ProgressBar } from '@/components/ProgressBar'
import { RevealObserver } from '@/components/RevealObserver'
import { ClientProviders } from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: 'Bicofino · Design System',
  description: 'Bicofino Design System v2.0 — São Paulo, Brasil',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Synchronous before-paint: restore theme + random accent (no FOUC) */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('bf-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}var a=['#821324','#f0535e','#2fd298','#05185c','#fe4600','#e5ff78','#ed0007','#f4b3cb','#77deff','#0d8aff','#38e0e3','#711cfe'];document.documentElement.style.setProperty('--current-accent',a[Math.floor(Math.random()*a.length)]);})();` }} />
        <ProgressBar />
        <ClientProviders>
          <Sidebar />
          <div id="main-content" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {children}
            <RevealObserver />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
