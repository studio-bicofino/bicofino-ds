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
  'p-rubens': 'm1.jpg',
  'p-paula': 'w8.jpg',
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
  'p-marcela': 'w7.jpg',
  'p-davi': 'm12.jpg',
  'p-thiago': 'm3.jpg',
  'p-otavio': 'm10.jpg',
  'p-gennaro': 'm11.jpg',
  /* luxo · Itália */
  'p-vittorio': 'm5.jpg',
  'p-alessandro': 'm6.jpg',
  'p-chiara': 'w6.jpg',
  'p-marisa': 'w5.jpg',
}

const FALLBACK = ['m1.jpg', 'w1.jpg', 'm3.jpg', 'w3.jpg', 'm9.jpg', 'w2.jpg']

const hashOf = (s: string) => {
  let h = 7
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** arquivo do retrato de uma pessoa — usado também pelo balão de hover do grafo */
export function avatarFileOf(personId: string): string {
  return FILE_BY_PERSON[personId] ?? FALLBACK[hashOf(personId) % FALLBACK.length]
}

/** todos os retratos, para preload (primeiro hover sem flash de carregamento) */
export const AVATAR_FILES = [...new Set(Object.values(FILE_BY_PERSON))]

/* basePath '/la-rete': <img>/<image>/Image() crus não ganham o prefixo do Next */
const BASE = '/la-rete'
/** URL de um retrato sob o basePath — usar em vez de `/avatars/...` cru */
export const avatarUrl = (file: string) => `${BASE}/avatars/${file}`

interface AvatarProps {
  personId: string
  size?: number
}

export function Avatar({ personId, size = 64 }: AvatarProps) {
  /* <img> circular simples — contexto HTML (painel). No SVG do grafo o
     balão de hover usa <image> direto com clipPath (ver ForceGraph). */
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={avatarUrl(avatarFileOf(personId))}
      alt="Foto de mockup"
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}
    />
  )
}
