import React from 'react'

/* Espelho de apps/web/components/primitives/BrandIcons.tsx (só os ícones que
   o rodapé usa) — manter os paths em sincronia com o site público. */

export function IconDiamond({ size = 14, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: size, height: size, display: 'block', flexShrink: 0, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10.42,20h-.83c0-7.26-2.33-9.58-9.58-9.58v-.83c7.26,0,9.58-2.33,9.58-9.58h.83c0,7.26,2.33,9.58,9.58,9.58v.83c-7.26,0-9.58,2.33-9.58,9.58ZM4.36,10c3.16.73,4.91,2.48,5.64,5.64.73-3.16,2.48-4.91,5.64-5.64-3.16-.73-4.91-2.48-5.64-5.64-.73,3.16-2.48,4.91-5.64,5.64Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* O lucide-react do docs-site é mais novo e removeu os ícones de marca —
   este é o desenho do `Instagram` do lucide que o apps/web ainda usa. */
export function IconInstagram({ size = 12, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size, display: 'block', flexShrink: 0, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function IconClub({ size = 14, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      style={{ width: size, height: size, display: 'block', flexShrink: 0, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.49,10.8h-7.4v2.18h-1.02v-1.53h-.51v1.53h-1.02v-1.53h-.51v1.53H0v-3.79h11.49c.16-.86.59-1.63,1.18-2.23.77-.78,1.85-1.26,3.03-1.26s2.26.48,3.04,1.26c.78.77,1.26,1.85,1.26,3.03s-.48,2.26-1.26,3.03c-.77.78-1.85,1.26-3.04,1.26s-2.26-.48-3.03-1.26c-.6-.6-1.02-1.37-1.18-2.23h0ZM17.6,8.1c-.48-.49-1.15-.79-1.9-.79s-1.42.3-1.9.79c-.49.48-.79,1.15-.79,1.9s.3,1.42.79,1.9c.48.49,1.16.78,1.9.78s1.42-.3,1.9-.78c.49-.48.79-1.16.79-1.9s-.3-1.42-.79-1.9h0Z"
        fill="currentColor"
      />
    </svg>
  )
}
