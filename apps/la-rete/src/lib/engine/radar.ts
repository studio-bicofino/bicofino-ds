import type { Trend } from '../data/types'

/**
 * Radar — leitura local de notícia/tendência → Trend sintética.
 *
 * MODO MOCKUP (atual): um léxico determinístico mapeia palavras do texto
 * para nomes de tags do canon (tags.ts) e gera os hooks que o motor de
 * aderência já consome. Sem chave de API, sem custo, resultado na hora.
 *
 * MODO IA (próxima fase): a MESMA assinatura `analyzeText` passa a ser
 * preenchida por um modelo via AI Gateway (rota /api/radar com structured
 * output no shape de Trend). A página não muda — só a origem dos hooks.
 */

interface LexEntry {
  pattern: RegExp
  tagName: string
  weight: number
}

/* padrões em lowercase sem acento (o texto é normalizado antes do match) */
const LEXICON: LexEntry[] = [
  { pattern: /\bagro|soja|cafe\b|carne|fazenda|safra|gado|boi|rastreabilidade|eudr/g, tagName: 'Agro', weight: 1 },
  { pattern: /inteligencia artificial|\bia\b|\bllm\b|machine learning|modelo de linguagem|copilot/g, tagName: 'IA / Dados', weight: 1 },
  { pattern: /fintech|pagament|\bpix\b|credito|banco digital|stablecoin|open finance/g, tagName: 'Fintech', weight: 1 },
  { pattern: /wealth|patrimonio|family office|gestora|private bank|sucessao/g, tagName: 'Wealth Management', weight: 1 },
  { pattern: /juridic|advog|escritorio de advocacia|regulator|compliance|tribunal/g, tagName: 'Direito', weight: 0.9 },
  { pattern: /aquisicao|fusao|fusoes|\bm&a\b|venda da empresa|compra da operacao/g, tagName: 'M&A', weight: 0.9 },
  { pattern: /imovel|imobiliari|real estate|incorporadora|aluguel|proptech/g, tagName: 'Real Estate', weight: 0.9 },
  { pattern: /publicidade|campanha|agencia de propaganda|branding|anunciante/g, tagName: 'Publicidade', weight: 0.9 },
  { pattern: /\bmidia\b|streaming|audiencia|transmissao|direitos de tv|broadcast|newsletter/g, tagName: 'Mídia', weight: 0.9 },
  { pattern: /\bluxo\b|alta costura|grife|cashmere|alfaiataria|joalheria/g, tagName: 'Luxo', weight: 1 },
  { pattern: /energia|solar|eolica|usina|transicao energetica/g, tagName: 'Energia', weight: 0.9 },
  { pattern: /logistica|porto|frete|cadeia de suprimento|armazem|exportacao/g, tagName: 'Logística', weight: 0.8 },
  { pattern: /saude|longevidade|clinica|diagnostico|hospital|bem-estar|wellness/g, tagName: 'Saúde / Longevidade', weight: 1 },
  { pattern: /futebol|atleta|jogador|clube|gramado|selecao/g, tagName: 'Futebol Atleta', weight: 0.8 },
  { pattern: /federacao|dirigente|cartola|cbf\b|fifa\b|liga\b|calendario do futebol/g, tagName: 'Futebol Dirigente', weight: 0.9 },
  { pattern: /educacao|curso|universidade|ensino|mba\b/g, tagName: 'Educação', weight: 0.8 },
  { pattern: /venture|startup|rodada|aporte|seed\b|series [ab]\b|captacao/g, tagName: 'Venture Capital', weight: 0.9 },
  { pattern: /software|saas\b|plataforma digital|aplicativo|nuvem|tecnologia/g, tagName: 'Tech', weight: 0.7 },
  /* Itália acende as afiliações italianas da rede, em peso menor */
  { pattern: /italia|milao|turim|napoles|serie a\b|impatriati|passaporte italiano/g, tagName: 'Como 1907', weight: 0.5 },
  { pattern: /italia|milao|lombardia|borsa/g, tagName: 'Loro Piana', weight: 0.4 },
  { pattern: /napoles|napoli/g, tagName: 'Napoli', weight: 0.6 },
  { pattern: /turim|torino/g, tagName: 'Torino', weight: 0.6 },
]

const SECTOR_BY_TAG: Record<string, string> = {
  Agro: 'AGRO',
  'IA / Dados': 'IA',
  Fintech: 'FINTECH',
  'Wealth Management': 'WEALTH',
  Direito: 'JURÍDICO',
  'M&A': 'M&A',
  'Real Estate': 'IMOBILIÁRIO',
  Publicidade: 'PUBLICIDADE',
  Mídia: 'MÍDIA',
  Luxo: 'LUXO',
  Energia: 'ENERGIA',
  Logística: 'LOGÍSTICA',
  'Saúde / Longevidade': 'SAÚDE',
  'Futebol Atleta': 'FUTEBOL',
  'Futebol Dirigente': 'FUTEBOL',
  Educação: 'EDUCAÇÃO',
  'Venture Capital': 'VC',
  Tech: 'TECH',
  'Como 1907': 'ITÁLIA',
  'Loro Piana': 'ITÁLIA',
  Napoli: 'ITÁLIA',
  Torino: 'ITÁLIA',
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

/**
 * Lê título + texto e devolve uma Trend sintética, ou null quando o léxico
 * não reconhece nada (aí a casa lê com os próprios olhos).
 */
export function analyzeText(input: {
  title: string
  text: string
  source?: string
  observedAt: string
}): Trend | null {
  const haystack = normalize(`${input.title}\n${input.text}`)

  /* ocorrências por tag: o título pesa 3x (assunto declarado) */
  const titleHay = normalize(input.title)
  const scores = new Map<string, number>()
  for (const entry of LEXICON) {
    const bodyHits = (haystack.match(entry.pattern) ?? []).length
    const titleHits = (titleHay.match(entry.pattern) ?? []).length
    const raw = (bodyHits + titleHits * 3) * entry.weight
    if (raw > 0) scores.set(entry.tagName, (scores.get(entry.tagName) ?? 0) + raw)
  }
  if (scores.size === 0) return null

  const top = [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
  const max = top[0][1]
  const hooks = top.map(([tagName, raw]) => ({
    tagName,
    weight: Math.max(0.2, Math.round((raw / max) * 10) / 10),
  }))

  const sectors = [...new Set(top.map(([t]) => SECTOR_BY_TAG[t]).filter(Boolean))].slice(0, 3)

  const excerpt = input.text.trim().replace(/\s+/g, ' ').slice(0, 220)

  return {
    id: `tr-radar-${Math.abs(hashOf(input.title + input.observedAt))}`,
    title: input.title.trim().slice(0, 120) || 'Leitura do radar',
    source: input.source ?? 'Radar · link externo',
    observedAt: input.observedAt,
    summary: excerpt + (input.text.trim().length > 220 ? '…' : ''),
    hooks,
    sectors,
  }
}

function hashOf(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return h
}
