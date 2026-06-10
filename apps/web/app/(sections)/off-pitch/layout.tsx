import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Off Pitch',
  description:
    'Image. Connection. Legacy. Branding, conteúdo, conexão de marcas e talentos, wealth e PR — o mesmo padrão de curadoria, além do esporte.',
  alternates: { canonical: '/off-pitch' },
}

export default function OffPitchLayout({ children }: { children: React.ReactNode }) {
  return children
}
