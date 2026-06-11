'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Chrome({ meta }: { meta: string }) {
  const pathname = usePathname()
  return (
    <header className="lr-chrome">
      <span className="lr-chrome__brand">
        <span className="diamond">✦</span> LA RETE
      </span>
      <nav className="lr-chrome__nav" aria-label="Seções">
        <Link className="lr-chrome__link" href="/" data-active={pathname === '/'}>
          Rete
        </Link>
        <Link
          className="lr-chrome__link"
          href="/tendencias"
          data-active={pathname === '/tendencias'}
        >
          Tendências
        </Link>
      </nav>
      <span className="lr-chrome__meta">{meta} // casa nostra // bicofino</span>
    </header>
  )
}
