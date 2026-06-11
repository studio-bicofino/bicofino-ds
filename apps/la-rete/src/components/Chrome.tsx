'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BicofinoLogo } from './BicofinoLogo'

export function Chrome({ meta }: { meta: string }) {
  const pathname = usePathname()
  return (
    <header className="lr-chrome">
      <span className="lr-chrome__logo">
        <BicofinoLogo height={12} />
      </span>
      <span className="lr-chrome__brand">// LA RETE</span>
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
