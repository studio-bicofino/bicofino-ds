import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Casa Nostra — Bicofino',
  description: 'Registro interno de relações da Casa Bicofino.',
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
        {children}
      </body>
    </html>
  )
}
