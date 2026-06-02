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
