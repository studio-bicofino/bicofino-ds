import Link from 'next/link'
import { BicofinoLogo } from './BicofinoLogo'

/* Barra de marca — wordmark Bicofino + atalho em pill outline.
   Herda as cores da superfície (clara ou escura) via tokens semânticos. */
export function TopBar({
  rightHref = '/painel',
  rightLabel = '// painel',
}: {
  rightHref?: string
  rightLabel?: string
}) {
  return (
    <header
      className="shell between"
      style={{ height: 64, borderBottom: 'var(--bf-hairline)' }}
    >
      <Link href="/" aria-label="Bicofino" style={{ color: 'var(--bf-text-primary)', display: 'inline-flex' }}>
        <BicofinoLogo color="currentColor" width={104} />
      </Link>
      <Link href={rightHref} className="pill-btn">
        {rightLabel}
      </Link>
    </header>
  )
}
