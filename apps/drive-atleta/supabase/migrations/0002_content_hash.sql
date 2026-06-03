-- Detecção de foto repetida (arquivo idêntico).
-- Guarda o SHA-256 dos bytes do arquivo (calculado no navegador antes do upload).
-- Index por (atleta, hash) para a checagem rápida no /api/check-duplicate.

alter table public.media_items add column if not exists content_hash text;

create index if not exists media_items_hash_idx
  on public.media_items (athlete_slug, content_hash);
