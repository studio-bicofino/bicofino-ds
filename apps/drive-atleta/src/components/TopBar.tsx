import Link from 'next/link'
import { BicofinoLogo } from './BicofinoLogo'

/* Barra de marca — wordmark Bicofino + atalho em pill outline.
   Herda as cores da superfície (clara ou escura) via tokens semânticos.
   brandHref/rightHref = null deixam a marca inerte e escondem a pill —
   usado na página individual do atleta, que não expõe hub nem painel. */
export function TopBar({
  brandHref = '/',
  rightHref = '/painel',
  rightLabel = '// painel',
}: {
  brandHref?: string | null
  rightHref?: string | null
  rightLabel?: string
}) {
  const brandStyle = { color: 'var(--bf-text-primary)', display: 'inline-flex' as const }
  const brand = <BicofinoLogo color="currentColor" width={104} />
  return (
    <header
      className="shell between"
      style={{ height: 64, borderBottom: 'var(--bf-hairline)' }}
    >
      {brandHref ? (
        <Link href={brandHref} aria-label="Bicofino" style={brandStyle}>
          {brand}
        </Link>
      ) : (
        <span aria-label="Bicofino" style={brandStyle}>{brand}</span>
      )}
      {rightHref ? (
        <Link href={rightHref} className="pill-btn">
          {rightLabel}
        </Link>
      ) : null}
    </header>
  )
}
