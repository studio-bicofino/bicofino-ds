import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookies',
  description:
    'Política de Cookies da Bicofino. Este site não usa nenhum cookie — só preferências locais que nunca saem do seu navegador.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
