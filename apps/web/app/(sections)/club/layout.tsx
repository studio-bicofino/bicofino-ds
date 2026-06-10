import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Club',
  // Members only — fora do índice (espelha o disallow do robots.ts).
  robots: { index: false, follow: false },
}

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return children
}
