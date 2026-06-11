import type { Adherence, Person, Tag, Trend } from '../data/types'

/**
 * LA RETE — motor de aderência tendência × pessoa.
 *
 * Determinístico, sem I/O: recebe a tendência, a lista de pessoas e o
 * dicionário de tags; devolve quem na rede "acende" para aquela tendência.
 *
 * Pesos do score:
 * - Base: soma dos pesos dos hooks casados, normalizada para que casar
 *   TODOS os hooks ≈ BASE_MAX (85). O resto até 100 vem dos boosts.
 * - Boost de alcance (+6): networkReach >= 4 — a pessoa distribui a tese.
 * - Boost de disposição (+5): bicofinoDisposition >= 4 — a porta já está aberta.
 * - Boost de sinal (+8): algum signal recente da pessoa compartilha palavra-chave
 *   com o título/setores da tendência — interesse demonstrado, não inferido.
 * - Teto: 100. Corte de entrada: score >= MIN_SCORE (8).
 */

const BASE_MAX = 85
const BOOST_REACH = 6
const BOOST_DISPOSITION = 5
const BOOST_SIGNAL = 8
const MIN_SCORE = 8

/** Palavras curtas/conectivos que não contam como keyword de sinal. */
const STOPWORDS = new Set([
  'para', 'como', 'sobre', 'entre', 'pela', 'pelo', 'pelas', 'pelos',
  'numa', 'numo', 'essa', 'esse', 'esta', 'este', 'mais', 'menos',
])

/** Extrai keywords (>= 4 letras, sem stopwords) do título + setores da tendência. */
function trendKeywords(trend: Trend): string[] {
  const raw = `${trend.title} ${trend.sectors.join(' ')}`.toLowerCase()
  const words = raw.split(/[^a-zà-öø-ÿ0-9]+/i).filter((w) => w.length >= 4 && !STOPWORDS.has(w))
  return Array.from(new Set(words))
}

/** Verdadeiro se algum sinal da pessoa contém alguma keyword da tendência. */
function hasSignalMatch(person: Person, keywords: string[]): boolean {
  return person.signals.some((s) => {
    const content = s.content.toLowerCase()
    return keywords.some((kw) => content.includes(kw))
  })
}

/** Frase única, voz Bicofino: por que essa pessoa importa, a partir do hook dominante. */
function buildReason(
  trend: Trend,
  matched: { tag: Tag; weight: number }[],
  person: Person,
): string {
  // hook dominante = maior peso; empate resolvido por ordem dos hooks (determinístico)
  const dominant = matched[0]
  const others = matched.slice(1, 3).map((m) => m.tag.name)
  const tail = others.length > 0 ? ` e cruza com ${others.join(' e ')}` : ''
  const topic = trend.title.charAt(0).toLowerCase() + trend.title.slice(1)

  let lead: string
  switch (dominant.tag.kind) {
    case 'skill':
      lead = `Atua em ${dominant.tag.name}`
      break
    case 'empresa':
      lead = `Está dentro da ${dominant.tag.name}`
      break
    case 'afiliacao':
      lead = `Tem trânsito direto em ${dominant.tag.name}`
      break
    case 'cargo':
      lead = `Ocupa cadeira de ${dominant.tag.name}`
      break
    case 'familia':
      lead = `Carrega o nome da ${dominant.tag.name}`
      break
    case 'grupo':
      lead = `Circula no ${dominant.tag.name}`
      break
  }

  const reach = person.networkReach >= 4 ? ', com alcance de rede para distribuir a tese' : ''
  return `${lead}${tail}${reach} — porta direta para ${topic}.`
}

/**
 * Calcula a aderência de cada pessoa à tendência.
 * person.tags são IDS de Tag; os hooks da tendência usam NOMES — resolve via tagById.
 */
export function computeAdherence(
  trend: Trend,
  people: Person[],
  tagById: Record<string, Tag>,
): Adherence[] {
  const totalWeight = trend.hooks.reduce((sum, h) => sum + h.weight, 0)
  if (totalWeight <= 0) return []

  const keywords = trendKeywords(trend)
  const result: Adherence[] = []

  for (const person of people) {
    // nomes das tags da pessoa (ids → Tag), ignorando ids desconhecidos
    const personTags = person.tags
      .map((id) => tagById[id])
      .filter((t): t is Tag => t !== undefined)
    const personTagNames = new Set(personTags.map((t) => t.name))

    // hooks casados, em ordem decrescente de peso (estável para o reason)
    const matched = trend.hooks
      .filter((h) => personTagNames.has(h.tagName))
      .map((h) => ({
        tag: personTags.find((t) => t.name === h.tagName) as Tag,
        weight: h.weight,
      }))
      .sort((a, b) => b.weight - a.weight)

    if (matched.length === 0) continue

    // base normalizada: casar todos os hooks ≈ 85
    const matchedWeight = matched.reduce((sum, m) => sum + m.weight, 0)
    let score = (matchedWeight / totalWeight) * BASE_MAX

    // boosts — cap total em 100
    if (person.networkReach >= 4) score += BOOST_REACH
    if (person.bicofinoDisposition >= 4) score += BOOST_DISPOSITION
    if (hasSignalMatch(person, keywords)) score += BOOST_SIGNAL
    score = Math.min(100, Math.round(score))

    if (score < MIN_SCORE) continue

    result.push({
      personId: person.id,
      score,
      matchedTags: matched.map((m) => m.tag.name),
      reason: buildReason(trend, matched, person),
    })
  }

  // ordena por score desc; empate por personId para saída estável
  return result.sort((a, b) => b.score - a.score || a.personId.localeCompare(b.personId))
}

/** Top-N aderentes de uma lista já calculada (re-ordena por segurança). */
export function topAdherent(adherences: Adherence[], n: number): Adherence[] {
  return [...adherences]
    .sort((a, b) => b.score - a.score || a.personId.localeCompare(b.personId))
    .slice(0, Math.max(0, n))
}
