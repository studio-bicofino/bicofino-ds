import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'On Pitch',
  description:
    'The Athlete Is the Asset. Agenciamento, performance, posicionamento internacional e marca pessoal — do Brasil para o mundo, um atleta por vez.',
  alternates: { canonical: '/on-pitch' },
}

export default function OnPitchLayout({ children }: { children: React.ReactNode }) {
  return children
}
