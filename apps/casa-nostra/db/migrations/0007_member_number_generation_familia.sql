-- 0007_member_number_generation_familia.sql
-- Casa Nostra v2 — Onda 13, ajustes ao vivo com Fabio (2026-06-10)
--
--   member_number — Sócio nº (ordem de associado, só numerais)
--   generation    — Geração (1ª Geração … 4ª Geração)
--   kind 'familia' — novo tipo de tag pra agrupar membros por família
--
-- ADITIVO, NÃO DESTRUTIVO. Rodar manualmente no SQL Editor do Supabase.

alter table public.people add column if not exists member_number integer;
alter table public.people add column if not exists generation    text;

-- Amplia o CHECK de tags.kind pra incluir 'familia'.
-- (constraint inline do 0004 ganhou o nome default tags_kind_check)
alter table public.tags drop constraint if exists tags_kind_check;
alter table public.tags add constraint tags_kind_check
  check (kind in ('skill','grupo','afiliacao','familia'));
