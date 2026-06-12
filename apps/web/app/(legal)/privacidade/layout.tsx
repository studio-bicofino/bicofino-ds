import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacidade',
  description:
    'Política de Privacidade da Bicofino. Este site não coleta, não rastreia e não vende dados pessoais.',
  alternates: { canonical: '/privacidade' },
}

export default function PrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return children
}
