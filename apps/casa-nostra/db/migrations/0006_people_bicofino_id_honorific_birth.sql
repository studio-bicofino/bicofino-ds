-- 0006_people_bicofino_id_honorific_birth.sql
-- Casa Nostra v2 — ajustes ao vivo com Fabio (2026-06-10)
--
-- Três campos novos no cadastro:
--   bicofino_id — identificador livre da Bicofino (sigla ou número, sem formato fixo por enquanto)
--   honorific   — tratamento (Mr, Mrs, Miss); texto livre pra acomodar futuros valores
--   birth_date  — data de nascimento
--
-- ADITIVO, NÃO DESTRUTIVO. Rodar manualmente no SQL Editor do Supabase.

alter table public.people add column if not exists bicofino_id text;
alter table public.people add column if not exists honorific   text;
alter table public.people add column if not exists birth_date  date;
