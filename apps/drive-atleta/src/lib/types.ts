/* ─────────────────────────────────────────────────────────────
   Modelo de dados — espelha uma futura linha do Supabase.
   Tudo que o app guarda hoje em localStorage (Fase 1) tem a mesma
   forma que a tabela `media_items` terá na Fase 2. Trocar a camada
   de persistência (lib/storage.ts) não muda nenhum componente.
   ───────────────────────────────────────────────────────────── */

/** Derivado do MIME do arquivo — decide a pasta de destino (FOTOS | VIDEOS). */
export type MediaKind = 'foto' | 'video'

/** Categoria de conteúdo — eixo editorial, escolhido pelo atleta. */
export type Category =
  | 'jogo'
  | 'treino'
  | 'gol'
  | 'assistencia'
  | 'bastidor'
  | 'entrevista'
  | 'viagem'
  | 'outro'

/** Estágio de curadoria — controlado no Painel Bicofino. */
export type Status = 'recebido' | 'curadoria' | 'aprovado' | 'arquivado'

export interface MediaItem {
  id: string
  athleteSlug: string
  athleteName: string

  /** foto | video — derivado do MIME, roteia para FOTOS/VIDEOS. */
  kind: MediaKind
  /** Nome padronizado e ordenável, auto-gerado a partir dos metadados. */
  filename: string
  originalName: string
  mimeType: string
  sizeBytes: number

  /** Data do material (ISO yyyy-mm-dd). */
  date: string
  /** Jogo — ex. "Palmeiras x São Paulo" (ou null). */
  match: string | null
  /** Campeonato ou contexto — ex. "Campeonato Paulista" (ou null). */
  competition: string | null
  category: Category
  tags: string[]
  notes: string | null

  status: Status
  /** Caminho simulado no Drive: BICOFINO / ATLETAS / … / FOTOS / arquivo. */
  drivePath: string
  /** Timestamp ISO de quando entrou no acervo. */
  uploadedAt: string
}

/** Metadados compartilhados de um lote, antes de virarem MediaItem. */
export interface BatchMeta {
  date: string
  match: string
  competition: string
  category: Category
  tags: string[]
  notes: string
}
