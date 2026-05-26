/**
 * Normalização e canonicalização de strings free-text.
 *
 * Casa Nostra aceita entrada livre em campos como cidade, país, empresa,
 * línguas, passaportes — onde "São Paulo", "Sao Paulo" e "sao paulo" devem
 * agrupar como o mesmo valor.
 *
 * Estratégia:
 *  - `normalizeKey(s)` produz a CHAVE de agrupamento (NFD + lower + trim + colapsar espaços).
 *    Usada SÓ pra comparação. Nunca persistida.
 *  - `pickCanonical(variants)` escolhe a melhor grafia entre variantes que
 *    compartilham a mesma chave: mais frequente → mais acentuada → começa
 *    com maiúscula → ordem alfabética.
 *  - `canonicalizeValue(input, canonicals)` substitui um valor digitado pela
 *    grafia canônica se houver match exato de chave. Caso contrário,
 *    devolve o input apenas com trim.
 */

export function normalizeKey(s: string | null | undefined): string {
  if (!s) return ''
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

function countNonAscii(s: string): number {
  let n = 0
  for (const ch of s) {
    if (ch.charCodeAt(0) > 127) n++
  }
  return n
}

function startsUppercase(s: string): boolean {
  const first = s.trim().charAt(0)
  return first !== '' && first === first.toUpperCase() && first !== first.toLowerCase()
}

export function pickCanonical(variants: string[]): string {
  const cleaned = variants.map((v) => v.trim()).filter(Boolean)
  if (cleaned.length === 0) return ''
  if (cleaned.length === 1) return cleaned[0]

  const freq = new Map<string, number>()
  for (const v of cleaned) freq.set(v, (freq.get(v) ?? 0) + 1)

  const unique = Array.from(freq.keys())

  unique.sort((a, b) => {
    const fa = freq.get(a) ?? 0
    const fb = freq.get(b) ?? 0
    if (fa !== fb) return fb - fa

    const da = countNonAscii(a)
    const db = countNonAscii(b)
    if (da !== db) return db - da

    const ua = startsUppercase(a) ? 1 : 0
    const ub = startsUppercase(b) ? 1 : 0
    if (ua !== ub) return ub - ua

    return a.localeCompare(b, 'pt-BR')
  })

  return unique[0]
}

export function canonicalizeValue(
  input: string | null | undefined,
  canonicalsByKey: Map<string, string>,
): string | null {
  if (input === null || input === undefined) return null
  const trimmed = input.trim()
  if (!trimmed) return null
  const key = normalizeKey(trimmed)
  return canonicalsByKey.get(key) ?? trimmed
}

export function canonicalizeArray(
  input: string[] | null | undefined,
  canonicalsByKey: Map<string, string>,
): string[] {
  if (!input || input.length === 0) return []
  const out: string[] = []
  const seenKeys = new Set<string>()
  for (const raw of input) {
    const v = canonicalizeValue(raw, canonicalsByKey)
    if (!v) continue
    const key = normalizeKey(v)
    if (seenKeys.has(key)) continue
    seenKeys.add(key)
    out.push(v)
  }
  return out
}

/**
 * Agrupa uma lista crua de valores em sugestões canônicas com contagem.
 * `nulls` e strings vazias são ignoradas. Resultado vem ordenado por count desc.
 */
export type Suggestion = { value: string; key: string; count: number }

export function buildSuggestions(rawValues: (string | null | undefined)[]): Suggestion[] {
  const buckets = new Map<string, string[]>()
  for (const raw of rawValues) {
    if (!raw) continue
    const trimmed = raw.trim()
    if (!trimmed) continue
    const key = normalizeKey(trimmed)
    if (!key) continue
    const arr = buckets.get(key)
    if (arr) arr.push(trimmed)
    else buckets.set(key, [trimmed])
  }

  const out: Suggestion[] = []
  for (const [key, variants] of buckets) {
    out.push({ value: pickCanonical(variants), key, count: variants.length })
  }
  out.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value, 'pt-BR'))
  return out
}
