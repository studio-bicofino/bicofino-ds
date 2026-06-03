import type { Category, Status, MediaKind } from './types'

/* Rótulos e ordenação — fonte única para selects, filtros e pills. */

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'jogo', label: 'Jogo' },
  { value: 'gol', label: 'Gol' },
  { value: 'assistencia', label: 'Assistência' },
  { value: 'treino', label: 'Treino' },
  { value: 'bastidor', label: 'Bastidor' },
  { value: 'entrevista', label: 'Entrevista' },
  { value: 'viagem', label: 'Viagem' },
  { value: 'outro', label: 'Outro' },
]

export const CATEGORY_LABEL: Record<Category, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
) as Record<Category, string>

/** Pipeline de curadoria, em ordem. */
export const STATUSES: { value: Status; label: string }[] = [
  { value: 'recebido', label: 'Recebido' },
  { value: 'curadoria', label: 'Em curadoria' },
  { value: 'aprovado', label: 'Aprovado' },
  { value: 'arquivado', label: 'Arquivado' },
]

export const STATUS_LABEL: Record<Status, string> = Object.fromEntries(
  STATUSES.map((s) => [s.value, s.label]),
) as Record<Status, string>

export const KIND_LABEL: Record<MediaKind, string> = {
  foto: 'Foto',
  video: 'Vídeo',
}

/** Sugestões de tags livres — viram chips clicáveis no formulário. */
export const TAG_SUGGESTIONS = [
  'gol no primeiro tempo',
  'finalização',
  'assistência',
  'desarme',
  'aquecimento',
  'vídeo de treino',
  'bastidor',
  'comemoração',
]
