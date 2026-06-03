import { CATEGORY_LABEL } from './categories'
import { formatDate } from './format'
import type { Category } from './types'

/* Descrição que viaja COM o arquivo no Google Drive (campo "Descrição" /
   painel Detalhes). Assim quem baixa o arquivo pra editar/postar vê o contexto,
   as tags e as observações — não só o nome. Mantida em sincronia com o que o
   atleta preenche. */
export function buildDriveDescription(p: {
  athleteName: string
  date: string
  category: Category
  match: string | null
  competition: string | null
  tags: string[]
  notes: string | null
}): string {
  const lines = [
    `Atleta: ${p.athleteName}`,
    `Data: ${p.date ? formatDate(p.date) : '—'} · Categoria: ${CATEGORY_LABEL[p.category] ?? p.category}`,
  ]
  if (p.match) lines.push(`Jogo: ${p.match}`)
  if (p.competition) lines.push(`Contexto: ${p.competition}`)
  if (p.tags?.length) lines.push(`Tags: ${p.tags.join(', ')}`)
  if (p.notes) lines.push(`Obs.: ${p.notes}`)
  lines.push('', '— Enviado via Drive do Atleta · Bicofino')
  return lines.join('\n')
}
