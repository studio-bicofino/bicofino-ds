import type { Metadata } from 'next'
import './globals.css'
import { ProgressBar } from '@/components/ProgressBar'
import { ClientProviders } from '@/components/ClientProviders'
import { SidebarController } from '@/components/SidebarController'

export const metadata: Metadata = {
  title: 'Bicofino · Design System',
  description: 'Bicofino Design System v1.0 — São Paulo, Brasil',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Synchronous before-paint: restore theme + random accent (no FOUC) */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('bf-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}var a=['#821324','#f0535e','#2fd298','#05185c','#fe4600','#e5ff78','#ed0007','#f4b3cb','#77deff','#0d8aff','#38e0e3','#711cfe'];document.documentElement.style.setProperty('--current-accent',a[Math.floor(Math.random()*a.length)]);})();` }} />
        <ProgressBar />
        <ClientProviders>
          <SidebarController>
            {children}
          </SidebarController>
        </ClientProviders>
      </body>
    </html>
  )
}
