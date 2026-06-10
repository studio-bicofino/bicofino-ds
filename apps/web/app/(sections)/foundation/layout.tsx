import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Foundation',
  description:
    'Connect. Curate. Create. Consult. Os quatro princípios que filtram toda decisão, projeto e relação que passa pela casa Bicofino.',
  alternates: { canonical: '/foundation' },
}

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return children
}
