-- 0004_tags_v2.sql
-- Casa Nostra v2 — Fase 1 · Onda 1 (2026-05-27)
--
-- Propósito: introduzir o sistema de tags (Skills / Grupos / Afiliações) e
-- as colunas de endereço estruturado em `people`. Também amplia o check
-- constraint de `contact_methods.type` pra incluir 'website' (usado no novo
-- form de cadastro v2).
--
-- ADITIVO, NÃO DESTRUTIVO, NÃO REGRIDE v0.8.1.
-- Tabelas existentes (people, contact_methods, person_categories,
-- work_history, futebol_links, bicofino_history, groups, person_groups,
-- geography_action, signals, organizations, person_organizations) ficam
-- intactas em estrutura e dados. Aqui só:
--   1) cria duas tabelas novas (tags, person_tags)
--   2) adiciona colunas opcionais em people (address_*)
--   3) amplia o domínio do check de contact_methods.type pra incluir 'website'
--
-- v0.8.1 continua funcionando idêntica.

-- ============================================================
-- 13. TAGS (Skills / Grupos / Afiliações)
-- ============================================================
-- Mesma idempotência das organizations: name_key UNIQUE por kind.
-- Metadata reservado pra Fase 2 (categoria, geo, org_type).

create table if not exists public.tags (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  name_key    text not null,
  kind        text not null check (kind in ('skill','grupo','afiliacao')),
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  created_by  uuid references auth.users(id),
  unique (kind, name_key)
);

create index if not exists tags_kind_idx on public.tags (kind);
create index if not exists tags_name_key_idx on public.tags (name_key);

-- ============================================================
-- 14. PERSON_TAGS (junction M:N)
-- ============================================================
create table if not exists public.person_tags (
  person_id   uuid not null references public.people(id) on delete cascade,
  tag_id      uuid not null references public.tags(id) on delete cascade,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  primary key (person_id, tag_id)
);

create index if not exists person_tags_tag_idx on public.person_tags (tag_id);

-- ============================================================
-- PEOPLE — colunas de endereço estruturado (opcionais)
-- ============================================================
-- Cidade e país reaproveitam home_city / home_country existentes.
-- Form v2 tolera endereço parcial (cidade sozinha já vale).

alter table public.people add column if not exists address_street     text;
alter table public.people add column if not exists address_number     text;
alter table public.people add column if not exists address_complement text;
alter table public.people add column if not exists address_state      text;
alter table public.people add column if not exists address_zip        text;

-- ============================================================
-- CONTACT_METHODS — ampliar domínio de `type` pra incluir 'website'
-- ============================================================
-- Constraint default gerada pelo Postgres em 0001 é `contact_methods_type_check`.
-- DROP + ADD é a forma idiomática de ampliar um CHECK em Postgres.

alter table public.contact_methods drop constraint if exists contact_methods_type_check;
alter table public.contact_methods add constraint contact_methods_type_check
  check (type in ('email','phone','whatsapp','instagram','linkedin','website','outro'));

-- ============================================================
-- RLS — mesmo padrão das demais filhas (acesso amplo a authenticated)
-- ============================================================
-- Réplica do padrão usado em organizations (0003). Observação: o bypass de
-- auth (CASA_NOSTRA_AUTH_BYPASS=1) usa service_role no server-side, que
-- bypassa RLS. Linhas legacy com created_by IS NULL continuam visíveis sob
-- esse caminho — coerente com os registros existentes.

alter table public.tags        enable row level security;
alter table public.person_tags enable row level security;

drop policy if exists tags_all_authenticated on public.tags;
create policy tags_all_authenticated on public.tags
  for all to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists person_tags_all_authenticated on public.person_tags;
create policy person_tags_all_authenticated on public.person_tags
  for all to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);
