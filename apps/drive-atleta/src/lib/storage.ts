import type { MediaItem, Status } from './types'
import { buildSeedItems } from './seed'

/* ─────────────────────────────────────────────────────────────
   Persistência — Fase 1: localStorage do navegador.
   É a ÚNICA camada que conhece "onde os dados moram". O fluxo de
   upload e o Painel só falam com estas funções. Na Fase 2, trocar
   o corpo destas funções por chamadas ao Supabase não toca em
   nenhum componente.
   ───────────────────────────────────────────────────────────── */

const KEY = 'bicofino:drive-atleta:items:v1'

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage
}

/** Lê o acervo. Na primeira visita, semeia com o mock e persiste. */
export function loadItems(): MediaItem[] {
  if (!canUseStorage()) return buildSeedItems()
  const raw = window.localStorage.getItem(KEY)
  if (!raw) {
    const seeded = buildSeedItems()
    window.localStorage.setItem(KEY, JSON.stringify(seeded))
    return seeded
  }
  try {
    const parsed = JSON.parse(raw) as MediaItem[]
    return Array.isArray(parsed) ? parsed : buildSeedItems()
  } catch {
    return buildSeedItems()
  }
}

function persist(items: MediaItem[]): void {
  if (!canUseStorage()) return
  window.localStorage.setItem(KEY, JSON.stringify(items))
}

/** Acrescenta itens novos no topo do acervo. */
export function addItems(newItems: MediaItem[]): MediaItem[] {
  const all = [...newItems, ...loadItems()]
  persist(all)
  return all
}

/** Atualiza o estágio de curadoria de um item (Painel). */
export function updateStatus(id: string, status: Status): MediaItem[] {
  const all = loadItems().map((it) => (it.id === id ? { ...it, status } : it))
  persist(all)
  return all
}

/** Quantos itens já existem de um atleta (para a sequência _001, _002…). */
export function countForAthlete(slug: string): number {
  return loadItems().filter((it) => it.athleteSlug === slug).length
}

/** Restaura o acervo ao estado-semente (botão de demo). */
export function resetItems(): MediaItem[] {
  const seeded = buildSeedItems()
  persist(seeded)
  return seeded
}
