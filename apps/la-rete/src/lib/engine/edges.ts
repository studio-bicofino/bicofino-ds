import type { Edge, EdgeKind, Person, Tag, TagKind } from '../data/types'

/**
 * LA RETE — construção do grafo.
 *
 * Determinístico por contrato: nenhuma fonte de aleatoriedade ou relógio.
 * A mesma lista de pessoas produz sempre a mesma lista de arestas,
 * na mesma ordem (pares ordenados lexicograficamente por id).
 */

/**
 * Peso de conexão por kind de tag compartilhada.
 * Família é o laço mais forte da casa; empresa em comum quase tão forte.
 * Cargo compartilhado (dois CEOs) não diz nada sobre proximidade — peso zero.
 */
const KIND_WEIGHT: Record<TagKind, number> = {
  familia: 1.0,
  empresa: 0.8,
  afiliacao: 0.5,
  grupo: 0.45,
  skill: 0.3,
  cargo: 0.0,
}

/** Apresentação direta (introBy) — laço pessoal, pesa mais que afiliação. */
const INTRO_WEIGHT = 0.6

/** Abaixo deste peso bruto acumulado, o fio não existe. */
const EDGE_THRESHOLD = 0.3

/** Teto bruto para normalizar weight em 0–1. */
const RAW_CAP = 2.0

/** Ordem fixa de desempate do kind dominante — do laço mais forte ao mais fraco. */
const KIND_PRIORITY: EdgeKind[] = ['familia', 'empresa', 'intro', 'afiliacao', 'grupo', 'skill']

/**
 * Constrói as arestas do grafo: uma Edge por par (source < target),
 * acumulando o peso de cada relação compartilhada.
 */
export function buildEdges(people: Person[], tagById: Record<string, Tag>): Edge[] {
  // Ordena por id para garantir source < target e saída estável.
  const sorted = [...people].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  const edges: Edge[] = []

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const edge = edgeBetween(sorted[i], sorted[j], tagById)
      if (edge) edges.push(edge)
    }
  }

  return edges
}

/** Calcula a ligação entre duas pessoas; null quando fica abaixo do limiar. */
function edgeBetween(a: Person, b: Person, tagById: Record<string, Tag>): Edge | null {
  const aTags = new Set(a.tags)
  const bTags = new Set(b.tags)

  let raw = 0
  const byKind = new Map<EdgeKind, number>()
  const via: string[] = []

  // Tags compartilhadas, ponderadas pelo kind.
  for (const tagId of aTags) {
    if (!bTags.has(tagId)) continue
    const tag = tagById[tagId]
    if (!tag) continue
    const w = KIND_WEIGHT[tag.kind]
    if (w <= 0) continue // cargo sozinho nunca cria ligação
    raw += w
    // TagKind sem 'cargo' é subconjunto de EdgeKind — seguro após o guard acima.
    const edgeKind = tag.kind as EdgeKind
    byKind.set(edgeKind, (byKind.get(edgeKind) ?? 0) + w)
    via.push(tag.name)
  }

  // Apresentação direta em qualquer direção.
  if (a.introBy === b.id || b.introBy === a.id) {
    raw += INTRO_WEIGHT
    byKind.set('intro', (byKind.get('intro') ?? 0) + INTRO_WEIGHT)
    via.push('Apresentação')
  }

  if (raw < EDGE_THRESHOLD) return null

  return {
    source: a.id,
    target: b.id,
    weight: clamp01(Math.min(raw, RAW_CAP) / RAW_CAP),
    kind: dominantKind(byKind),
    via,
  }
}

/** Kind com maior contribuição acumulada; empate resolve pela ordem fixa de prioridade. */
function dominantKind(byKind: Map<EdgeKind, number>): EdgeKind {
  let winner: EdgeKind = 'skill'
  let best = -Infinity
  for (const kind of KIND_PRIORITY) {
    const value = byKind.get(kind) ?? 0
    if (value > best && value > 0) {
      best = value
      winner = kind
    }
  }
  return winner
}

/** Limita a 0–1 contra erro de ponto flutuante. */
function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

/** Índice de vizinhança: personId → conjunto de ids diretamente ligados. */
export function neighborsOf(edges: Edge[]): Map<string, Set<string>> {
  const neighbors = new Map<string, Set<string>>()
  for (const edge of edges) {
    let fromSource = neighbors.get(edge.source)
    if (!fromSource) {
      fromSource = new Set<string>()
      neighbors.set(edge.source, fromSource)
    }
    fromSource.add(edge.target)

    let fromTarget = neighbors.get(edge.target)
    if (!fromTarget) {
      fromTarget = new Set<string>()
      neighbors.set(edge.target, fromTarget)
    }
    fromTarget.add(edge.source)
  }
  return neighbors
}
