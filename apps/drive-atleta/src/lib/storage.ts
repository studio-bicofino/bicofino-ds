import type { MediaItem, Status } from './types'
import { supabaseBrowser } from './supabase-browser'
import { rowToItem, type MediaRow } from './media-row'

/* ─────────────────────────────────────────────────────────────
   Persistência — fase backend: Supabase é a fonte da verdade (D3).
   Leitura pelo navegador com a chave anon (RLS: policy de select).
   Escrita (insert do upload, mudança de status) passa pelas rotas
   /api com service role. Esta é a ÚNICA camada que o app consulta —
   o que mudou da Fase 1 foi só o corpo destas funções.
   ───────────────────────────────────────────────────────────── */

/** Lê o acervo do Supabase, mais recente primeiro. */
export async function loadItems(): Promise<MediaItem[]> {
  const { data, error } = await supabaseBrowser
    .from('media_items')
    .select('*')
    .order('uploaded_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data as MediaRow[]).map(rowToItem)
}

/** Lê só o material de um atleta (galeria read-only do /a/<slug>). */
export async function loadItemsByAthlete(slug: string): Promise<MediaItem[]> {
  const { data, error } = await supabaseBrowser
    .from('media_items')
    .select('*')
    .eq('athlete_slug', slug)
    .order('uploaded_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data as MediaRow[]).map(rowToItem)
}

/** Gera/garante a URL aberta ("qualquer um com o link") do arquivo (via /api/share). */
export async function shareItem(id: string): Promise<string> {
  const res = await fetch('/api/share', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Falha ao gerar o link aberto.')
  return json.url as string
}

/** Manda o arquivo pra lixeira do Drive e remove a linha (via /api/delete). */
export async function deleteItem(id: string): Promise<void> {
  const res = await fetch('/api/delete', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) {
    const json = await res.json().catch(() => ({}))
    throw new Error(json.error ?? 'Falha ao apagar o arquivo.')
  }
}

/** Muda o estágio de curadoria de um item (via /api/curate, service role). */
export async function updateStatus(id: string, status: Status): Promise<MediaItem> {
  const res = await fetch('/api/curate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, status }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Falha ao atualizar o status.')
  return json.item as MediaItem
}
