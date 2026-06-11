'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Radar, TrendingUp, Waypoints } from 'lucide-react'
import { BicofinoLogo } from './BicofinoLogo'
import { MoodDial } from './MoodDial'

/* 16px no lugar dos 20 do canon: o rótulo mono é 11px — em 20 o ícone
   engole o texto (mesma lógica do chevron do trilho) */
const NAV = [
  { href: '/', label: 'Rete', Icon: Waypoints },
  { href: '/tendencias', label: 'Tendências', Icon: TrendingUp },
  { href: '/radar', label: 'Radar', Icon: Radar },
]

export function Chrome({ meta }: { meta: string }) {
  const pathname = usePathname()
  return (
    <header className="lr-chrome">
      <div className="lr-chrome__top">
        <span className="lr-chrome__logo">
          <BicofinoLogo height={32} />
        </span>
        <span className="lr-chrome__brand">La Rete</span>
        <div className="lr-chrome__right">
          <MoodDial storageKey="bf-mood:la-rete" />
        </div>
      </div>
      <div className="lr-chrome__bottom">
        <nav className="lr-chrome__nav" aria-label="Seções">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              className="lr-chrome__link"
              href={href}
              data-active={pathname === href}
            >
              <Icon size={16} strokeWidth={1.5} aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
        <span className="lr-chrome__meta">{meta}</span>
      </div>
    </header>
  )
}
