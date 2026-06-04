-- ============================================================
-- 0005 — list_order: ordenação manual da lista de Membros (v2)
-- ============================================================
-- Aditiva. Não toca nas 12 tabelas/colunas existentes.
-- `list_order` guarda a posição manual definida por drag-and-drop
-- em /membros. NULL = ainda não ordenado (cai no fim, alfabético).
-- ============================================================

alter table public.people
  add column if not exists list_order integer;

-- Backfill: numera os registros existentes pela ordem atual (full_name asc),
-- pra que o primeiro drag tenha uma base estável.
with ordered as (
  select id, row_number() over (order by full_name asc) as rn
  from public.people
)
update public.people p
set list_order = o.rn
from ordered o
where p.id = o.id
  and p.list_order is null;

create index if not exists people_list_order_idx
  on public.people (list_order asc nulls last);
