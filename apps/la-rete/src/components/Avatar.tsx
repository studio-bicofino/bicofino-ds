/**
 * Avatar de mockup — busto vetorial estilizado, recortado em círculo
 * (referência: avatar 3D neutro). Sem assets binários: cabelo, pele e
 * camisa variam deterministicamente pelo id da pessoa, então cada membro
 * tem sempre a mesma "foto". Trocar por foto real depois = substituir
 * este componente por <img> com o photo_url do Casa Nostra.
 */

const SKIN = ['#f2cfb3', '#e2b491', '#c68863', '#8d5a3b']
const HAIR = ['#16191d', '#2e2019', '#5b3c25', '#8e9298']
const SHIRT = ['#11181d', '#2a2c2b', '#1d2733', '#3a3f45']

/* estilos de cabelo — paths sobre a cabeça (elipse em 32,28) */
const HAIRSTYLES = [
  /* corte curto */
  'M19.5,28 C18,12 26,7.5 32,7.5 C38,7.5 46,12 44.5,28 C42.5,17.5 38,14 32,14 C26,14 21.5,17.5 19.5,28 Z',
  /* franja varrida pro lado */
  'M19,29 C17.5,11 27,6.5 34,7.5 C43,8.5 46.5,15 45.2,29 C43.5,17 37,15.5 29.5,18.5 C24,20.5 20.2,24 19,29 Z',
  /* longo, cortinas dos lados */
  'M18.5,50 C16.5,32 18,11.5 32,9.5 C46,11.5 47.5,32 45.5,50 C44,38 43.5,29 42.5,24.5 C39.5,16.5 24.5,16.5 21.5,24.5 C20.5,29 20,38 18.5,50 Z',
  /* coque alto */
  'M20,27 C19,14 25.5,9.5 32,9.5 C38.5,9.5 45,14 44,27 C42,17.5 37.5,15 32,15 C26.5,15 22,17.5 20,27 Z M27,7.5 a5,4.6 0 1,1 10,0 a5,4.6 0 1,1 -10,0',
]

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
  const h = hashOf(personId)
  const skin = SKIN[h % SKIN.length]
  const hair = HAIR[(h >> 3) % HAIR.length]
  const shirt = SHIRT[(h >> 6) % SHIRT.length]
  const style = HAIRSTYLES[(h >> 9) % HAIRSTYLES.length]
  // size no id: a mesma pessoa pode estar no painel e no hover ao mesmo tempo
  const clipId = `bf-av-${personId}-${size}`

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Foto de mockup"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="64" height="64" fill="rgba(242, 248, 255, 0.09)" />
        {/* ombros */}
        <path d="M7,64 C9,47 19.5,42.5 32,42.5 C44.5,42.5 55,47 57,64 Z" fill={shirt} />
        {/* pescoço */}
        <rect x="27.5" y="34" width="9" height="10" rx="3.5" fill={skin} />
        {/* cabeça */}
        <ellipse cx="32" cy="26.5" rx="12.5" ry="14.5" fill={skin} />
        {/* cabelo */}
        <path d={style} fill={hair} />
      </g>
    </svg>
  )
}
