-- 0003_organizations.sql
-- Casa Nostra · Frente 16 — Organizations + Logos (2026-05-26)
--
-- Cria as duas tabelas novas e o bucket público `org-logos`.
--
-- organizations         → registro mestre com logo e kind (empresa | clube | midia | escola | entidade).
--                         name_key UNIQUE garante convergência de grafias ("Bicofino" / "Bicofino ❇️").
-- person_organizations  → vínculo M:N pessoa↔org com role/period/is_current/sort_order.
--                         Múltiplos vínculos com a MESMA org são permitidos (jogou em 2 momentos, etc.):
--                         PK em (id), não em (person_id, org_id).
-- bucket org-logos      → público, mesmo padrão de people-photos (audiência interna, paths UUID).
--
-- Estratégia: HÍBRIDO. current_company / work_history / futebol_links continuam intocados.
-- Organizations é fonte da verdade pra vínculos com logo. Backfill via script idempotente
-- (scripts/backfill-organizations.mjs) — não corre na migration pra manter SQL determinístico.

-- ============================================================
-- 11. ORGANIZATIONS
-- ============================================================
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_key text not null unique,
  kind text not null check (kind in ('empresa','clube','midia','escola','entidade')),
  logo_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists organizations_kind_idx on public.organizations (kind);
create index if not exists organizations_name_idx on public.organizations (name);

-- ============================================================
-- 12. PERSON_ORGANIZATIONS (junction)
-- ============================================================
create table if not exists public.person_organizations (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  org_id uuid not null references public.organizations(id) on delete cascade,
  role text,
  start_year smallint,
  end_year smallint,
  is_current boolean not null default false,
  notes text,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists person_organizations_person_idx on public.person_organizations (person_id);
create index if not exists person_organizations_org_idx on public.person_organizations (org_id);
create index if not exists person_organizations_sort_idx on public.person_organizations (person_id, sort_order);

-- ============================================================
-- RLS — mesma estratégia das demais filhas (acesso amplo a authenticated)
-- ============================================================
alter table public.organizations         enable row level security;
alter table public.person_organizations  enable row level security;

drop policy if exists organizations_all_authenticated on public.organizations;
create policy organizations_all_authenticated on public.organizations
  for all to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists person_organizations_all_authenticated on public.person_organizations;
create policy person_organizations_all_authenticated on public.person_organizations
  for all to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================
-- Storage bucket `org-logos`
-- ============================================================
insert into storage.buckets (id, name, public)
values ('org-logos', 'org-logos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "org-logos: authenticated upload" on storage.objects;
drop policy if exists "org-logos: authenticated update" on storage.objects;
drop policy if exists "org-logos: authenticated delete" on storage.objects;

create policy "org-logos: authenticated upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'org-logos');

create policy "org-logos: authenticated update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'org-logos')
  with check (bucket_id = 'org-logos');

create policy "org-logos: authenticated delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'org-logos');
