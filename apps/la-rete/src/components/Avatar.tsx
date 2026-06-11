/**
 * Avatar de mockup — retratos B&W (banco aprovado pelo Woney, 11/06) em
 * /public/avatars: w1–w5 mulheres, m1–m9 homens. Curadoria explícita por
 * pessoa (idade/vibe do dataset); 26 pessoas > 14 fotos, então há repetição
 * espalhada de propósito. Renderiza <image> dentro de <svg> com recorte
 * circular — funciona standalone (painel) e aninhado no SVG do grafo.
 * Trocar por foto real = mapear o photo_url do Casa Nostra aqui.
 */

const FILE_BY_PERSON: Record<string, string> = {
  /* casa */
  'p-fabio': 'm5.jpg',
  'p-enzo': 'm9.jpg',
  'p-luca': 'm7.jpg',
  /* capital */
  'p-heitor': 'm1.jpg',
  'p-bianca': 'w1.jpg',
  'p-rubens': 'm5.jpg',
  'p-paula': 'w4.jpg',
  'p-rodrigo': 'm9.jpg',
  'p-evelyn': 'w2.jpg',
  'p-sergio': 'm3.jpg',
  /* agro · energia · logística */
  'p-eurico': 'm6.jpg',
  'p-caio': 'm4.jpg',
  'p-tereza': 'w4.jpg',
  'p-nelson': 'm2.jpg',
  /* mídia · publicidade */
  'p-helena': 'w2.jpg',
  'p-otto': 'm8.jpg',
  'p-renata': 'w3.jpg',
  /* futebol */
  'p-marcela': 'w1.jpg',
  'p-davi': 'm7.jpg',
  'p-thiago': 'm3.jpg',
  'p-otavio': 'm1.jpg',
  'p-gennaro': 'm2.jpg',
  /* luxo · Itália */
  'p-vittorio': 'm5.jpg',
  'p-alessandro': 'm6.jpg',
  'p-chiara': 'w3.jpg',
  'p-marisa': 'w5.jpg',
}

const FALLBACK = ['m1.jpg', 'w1.jpg', 'm3.jpg', 'w3.jpg', 'm9.jpg', 'w2.jpg']

const hashOf = (s: string) => {
  let h = 7
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

interface AvatarProps {
  personId: string
  size?: number
}

export function Avatar({ personId, size = 64 }: AvatarProps) {
  const file = FILE_BY_PERSON[personId] ?? FALLBACK[hashOf(personId) % FALLBACK.length]
  // size no id: a mesma pessoa pode estar no painel e no hover ao mesmo tempo
  const clipId = `bf-av-${personId}-${size}`

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Foto de mockup">
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" fill="rgba(242, 248, 255, 0.09)" />
        <image
          href={`/avatars/${file}`}
          width="64"
          height="64"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  )
}
