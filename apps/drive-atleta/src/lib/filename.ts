import type { Athlete } from './athletes'
import type { Category, MediaKind } from './types'

/* ─────────────────────────────────────────────────────────────
   Nome de arquivo padronizado — o maior ganho de organização.
   O atleta sobe a foto e ela já chega catalogada, ordenável e
   pesquisável no acervo. Convenção alinhada ao que já existe no
   Drive (ex.: Trace-FullGame-20260526-period-2):

     {ATLETA}_{AAAAMMDD}_{JOGO}_{categoria}_{seq}.{ext}
     SALVATORE_20260526_PALxSAO_gol_001.jpg

   Sem jogo, o token de contexto cai para o campeonato ou a categoria.
   ───────────────────────────────────────────────────────────── */

/** Remove acentos e baixa para ASCII. "São Paulo" → "Sao Paulo". */
export function deburr(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/** Token curto e maiúsculo de um nome de time/contexto. "São Paulo" → "SAO". */
function teamToken(s: string): string {
  const clean = deburr(s).toUpperCase().replace(/[^A-Z0-9 ]/g, '').trim()
  if (!clean) return ''
  // Primeira palavra significativa, 3 letras (FC/EC/SC ignorados).
  const word = clean.split(/\s+/).find((w) => !['FC', 'EC', 'SC', 'AC', 'DE', 'DO', 'DA'].includes(w)) ?? clean
  return word.slice(0, 3)
}

/** "Palmeiras x São Paulo" → "PALxSAO". "Treino CT" → "TREINO". */
export function matchToken(match: string): string {
  const sides = match.split(/\s*(?:x|×|vs\.?|×)\s*/i).filter(Boolean)
  if (sides.length >= 2) {
    return `${teamToken(sides[0])}x${teamToken(sides[1])}`
  }
  // Sem confronto: um token de até 8 chars do texto inteiro.
  return deburr(match).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
}

/** Campeonato/contexto → token CamelCase legível e ordenável.
    "Apresentacao Alashkert" → "ApresentacaoAlashkert" · "Campeonato Paulista" → "CampeonatoPaulista". */
export function contextToken(text: string): string {
  const clean = deburr(text).replace(/[^A-Za-z0-9 ]/g, ' ').trim()
  if (!clean) return ''
  const camel = clean
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
  return camel.slice(0, 28)
}

/** Extensão derivada do MIME, com fallbacks sensatos. */
export function extFromMime(mime: string, originalName: string): string {
  const fromName = originalName.includes('.') ? originalName.split('.').pop()!.toLowerCase() : ''
  if (fromName && /^[a-z0-9]{2,4}$/.test(fromName)) return fromName
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/heic': 'heic',
    'image/webp': 'webp',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'video/webm': 'webm',
  }
  return map[mime] ?? (mime.startsWith('video/') ? 'mp4' : 'jpg')
}

/** foto | video a partir do MIME — define a pasta de destino. */
export function kindFromMime(mime: string): MediaKind {
  return mime.startsWith('video/') ? 'video' : 'foto'
}

const MONTHS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function dateToken(isoDate: string): string {
  // yyyy-mm-dd → "2026mai21" (ano + mês em 3 letras + dia). Sem data → "0000---00".
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return '0000---00'
  return `${y}${MONTHS_PT[m - 1]}${String(d).padStart(2, '0')}`
}

export interface FilenameParts {
  athlete: Athlete
  date: string
  match: string
  competition: string
  category: Category
  mimeType: string
  originalName: string
  /** Posição no lote/acervo — vira o sufixo _001, _002… */
  seq: number
}

export function generateFilename(p: FilenameParts): string {
  const athlete = deburr(p.athlete.firstName).toUpperCase().replace(/[^A-Z0-9]/g, '')
  const date = dateToken(p.date)
  // Jogo (se houver) + Campeonato/contexto (se houver). Sem nenhum, cai na categoria.
  const segs: string[] = []
  if (p.match.trim()) segs.push(matchToken(p.match))
  if (p.competition.trim()) segs.push(contextToken(p.competition))
  if (segs.length === 0) segs.push(p.category.toUpperCase())
  const seq = String(p.seq).padStart(3, '0')
  const ext = extFromMime(p.mimeType, p.originalName)
  return `${athlete}_${date}_${segs.join('_')}_${p.category}_${seq}.${ext}`
}
