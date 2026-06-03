-- Drive do Atleta · Fase backend (Fatia 1)
-- Tabela media_items — espelha src/lib/types.ts (MediaItem) + os campos reais
-- do Drive (drive_file_id, web_view_link). Fonte da verdade do acervo (D3).
-- Snake_case no banco; o app converte de/para camelCase em lib/storage.ts.

create extension if not exists "pgcrypto";

create table if not exists public.media_items (
  id            uuid primary key default gen_random_uuid(),

  athlete_slug  text not null,
  athlete_name  text not null,

  -- 'foto' | 'video' — derivado do MIME, roteia FOTOS/VIDEOS no Drive.
  kind          text not null check (kind in ('foto', 'video')),
  filename      text not null,
  original_name text not null,
  mime_type     text not null,
  size_bytes    bigint not null default 0,

  date          date,
  match         text,
  competition   text,
  category      text not null,
  tags          text[] not null default '{}',
  notes         text,

  status        text not null default 'recebido'
                check (status in ('recebido', 'curadoria', 'aprovado', 'arquivado')),

  -- Caminho de exibição: CENTRAL BICOFINO / ATLETAS / <atleta> / FOTOS / arquivo.
  drive_path    text not null,
  -- Identidade real no Google Drive (preenchida após o upload).
  drive_file_id text,
  web_view_link text,

  uploaded_at   timestamptz not null default now()
);

create index if not exists media_items_athlete_idx on public.media_items (athlete_slug);
create index if not exists media_items_uploaded_idx on public.media_items (uploaded_at desc);

-- RLS ligado. Leitura pública no MVP (o link do atleta e o painel não têm login
-- ainda — D4/Fase 4 traz token assinado + auth do painel). Escrita só via service
-- role no servidor (que ignora RLS): inserts no /api/upload/complete, status no /api/curate.
alter table public.media_items enable row level security;

drop policy if exists "media_items leitura pública (MVP)" on public.media_items;
create policy "media_items leitura pública (MVP)"
  on public.media_items for select
  to anon, authenticated
  using (true);
