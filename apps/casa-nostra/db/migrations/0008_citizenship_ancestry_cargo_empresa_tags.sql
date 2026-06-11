-- 0008_citizenship_ancestry_cargo_empresa_tags.sql
-- Casa Nostra v2 — Onda 14, ajustes ao vivo com Fabio (2026-06-10)
--
--   citizenships — Cidadania: códigos ISO 3166-1 alpha-2, múltiplos (ex. {BR,IT})
--   ancestries   — Ascendência: idem
--   kinds 'cargo' e 'empresa' — Cargo e Empresa viram tags (múltiplos por pessoa).
--     As colunas legadas people.current_title / current_company seguem recebendo
--     o PRIMEIRO valor de cada lista (listagem /membros e busca continuam funcionando).
--
-- ADITIVO, NÃO DESTRUTIVO. Rodar manualmente no SQL Editor do Supabase.

alter table public.people add column if not exists citizenships text[];
alter table public.people add column if not exists ancestries   text[];

alter table public.tags drop constraint if exists tags_kind_check;
alter table public.tags add constraint tags_kind_check
  check (kind in ('skill','grupo','afiliacao','familia','cargo','empresa'));
