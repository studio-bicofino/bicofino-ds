/**
 * LA RETE — contrato de dados.
 *
 * Espelha o schema real do Casa Nostra (apps/casa-nostra/src/lib/db/types.ts)
 * em forma desnormalizada, pronta para o grafo. Quando plugarmos o Supabase,
 * um adapter converte PersonWithRelations → Person daqui; nada na UI muda.
 */

export type TagKind = 'skill' | 'grupo' | 'afiliacao' | 'familia' | 'cargo' | 'empresa'

export type Cluster = 'A' | 'B' | 'C'

export type Seniority = 'pleno' | 'senior' | 'executivo' | 'c-suite' | 'referencia'

/** Escala 1–5 usada nos scores do Casa Nostra. */
export type Score = 1 | 2 | 3 | 4 | 5

export type SignalType = 'interesse' | 'lifeevent' | 'capital_move' | 'ask' | 'recusa'

export interface Tag {
  id: string
  name: string
  kind: TagKind
}

export interface Signal {
  type: SignalType
  content: string
  /** ISO date */
  observedAt: string
}

export interface Person {
  id: string
  fullName: string
  /** Como a pessoa é chamada na rede — vai no nó do grafo. */
  preferredName: string
  honorific: string | null
  /** Sócio nº */
  memberNumber: number | null
  /** '1ª Geração' … '4ª Geração' */
  generation: string | null
  cluster: Cluster
  seniority: Seniority
  /** ISO 3166-1 alpha-2, ex.: ['BR', 'IT'] */
  citizenships: string[]
  ancestries: string[]
  homeCity: string
  /** ISO 3166-1 alpha-2 */
  homeCountry: string
  /** Proximidade com a casa, 1–5 */
  intimacy: Score
  contactEase: Score
  /** Disposição em fazer negócio com/via Bicofino, 1–5 */
  bicofinoDisposition: Score
  /** Alcance de rede, 1–5 — dimensiona o nó no grafo */
  networkReach: Score
  /** ids de Tag (todas as kinds misturadas; o kind vive na Tag) */
  tags: string[]
  /** id de Person que apresentou esta pessoa à casa */
  introBy: string | null
  /** Uma linha, voz Bicofino: o que essa pessoa é na rede. */
  bio: string
  signals: Signal[]
}

/* ── Grafo ──────────────────────────────────────────────────────────── */

export type EdgeKind = 'familia' | 'empresa' | 'afiliacao' | 'grupo' | 'skill' | 'intro'

export interface Edge {
  source: string
  target: string
  /** 0–1: espessura/opacidade do fio */
  weight: number
  /** kind dominante da ligação (para colorir/filtrar) */
  kind: EdgeKind
  /** nomes das tags compartilhadas que geraram a ligação */
  via: string[]
}

/* ── Matchmaking ────────────────────────────────────────────────────── */

export type OpportunityKind = 'entre-membros' | 'com-bicofino' | 'mercado'

export interface Opportunity {
  id: string
  /** Person.id */
  a: string
  /** Person.id — null quando a contraparte é a Bicofino ou o mercado externo */
  b: string | null
  kind: OpportunityKind
  /** 0–100 */
  score: number
  /** Título curto, voz Bicofino. Sem hype. Ex.: 'Mesa de capital — agro × fintech' */
  title: string
  /** Frases curtas explicando o porquê, em ordem de peso. */
  rationale: string[]
  /** nomes de tags compartilhadas/complementares */
  via: string[]
}

/* ── Tendências (Vanguarda) ─────────────────────────────────────────── */

export interface Trend {
  id: string
  title: string
  /** ex.: 'VANGUARDA · Mercados Globais', 'Reuters', 'Sifted' */
  source: string
  /** ISO date da observação */
  observedAt: string
  /** 2–3 frases, voz editorial */
  summary: string
  /**
   * Como a tendência "gruda" na rede: nomes de tags (exatos, como em tags.ts)
   * com peso 0–1. O motor de aderência soma sobre as tags de cada pessoa.
   */
  hooks: { tagName: string; weight: number }[]
  /** setores em mono-label, ex.: ['AGRO', 'FINTECH'] */
  sectors: string[]
}

export interface Adherence {
  personId: string
  /** 0–100 */
  score: number
  /** tags da pessoa que casaram com a tendência */
  matchedTags: string[]
  /** uma frase: por que essa pessoa importa para essa tendência */
  reason: string
}
