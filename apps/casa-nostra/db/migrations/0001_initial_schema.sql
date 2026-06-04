-- Casa Nostra — schema inicial
-- Migration 0001 · 2026-05-25
-- Para rodar: psql ou SQL editor do painel Supabase
--
-- Cobre as 9 tabelas do briefing:
-- people, contact_methods, person_categories, work_history,
-- futebol_links, bicofino_history, groups, person_groups,
-- geography_action, signals
--
-- RLS: ativa em todas. Policy: qualquer usuário autenticado da allowlist
-- pode ler/escrever tudo (audiência interna 2-3 pessoas).
-- restrict_visibility=true em people é honrado por policy adicional.

-- ============================================================
-- 1. PEOPLE (tabela principal)
-- ============================================================
create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  preferred_name text,
  photo_url text,
  current_company text,
  current_title text,  -- "current_role" é palavra reservada em PostgreSQL; renomeado
  cluster text check (cluster in ('A','B','C') or cluster is null),
  seniority text check (seniority in ('pleno','senior','executivo','c-suite','referencia') or seniority is null),
  expertise_area text,
  intimacy smallint check (intimacy between 1 and 5),
  contact_ease smallint check (contact_ease between 1 and 5),
  bicofino_disposition smallint check (bicofino_disposition between 1 and 5),
  network_reach smallint check (network_reach between 1 and 5),
  home_city text,
  home_country text,
  languages text[] default '{}',
  passports text[] default '{}',
  intro_by_person_id uuid references public.people(id) on delete set null,
  cadence_target_per_year smallint,
  last_contact_date date,
  private_notes text,
  restrict_visibility boolean not null default false,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists people_full_name_idx on public.people (full_name);
create index if not exists people_cluster_idx on public.people (cluster);
create index if not exists people_last_contact_idx on public.people (last_contact_date desc nulls last);

-- ============================================================
-- 2. CONTACT_METHODS
-- ============================================================
create table if not exists public.contact_methods (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  type text not null check (type in ('email','phone','whatsapp','instagram','linkedin','outro')),
  value text not null,
  is_primary boolean not null default false,
  label text,
  created_at timestamptz not null default now()
);

create index if not exists contact_methods_person_idx on public.contact_methods (person_id);

-- ============================================================
-- 3. PERSON_CATEGORIES (tags multi-seleção)
-- ============================================================
create table if not exists public.person_categories (
  person_id uuid not null references public.people(id) on delete cascade,
  category_value text not null,
  primary key (person_id, category_value)
);

-- ============================================================
-- 4. WORK_HISTORY
-- ============================================================
create table if not exists public.work_history (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  company text not null,
  role text,
  start_year smallint,
  end_year smallint,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists work_history_person_idx on public.work_history (person_id);

-- ============================================================
-- 5. FUTEBOL_LINKS (vetor único Bicofino)
-- ============================================================
create table if not exists public.futebol_links (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  link_type text not null check (link_type in ('time','atleta','estadio','patrocinio','entidade','comissao','outro')),
  entity_name text not null,
  relation text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists futebol_links_person_idx on public.futebol_links (person_id);

-- ============================================================
-- 6. BICOFINO_HISTORY
-- ============================================================
create table if not exists public.bicofino_history (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  project text not null,
  year smallint,
  role text,
  outcome text,
  created_at timestamptz not null default now()
);

create index if not exists bicofino_history_person_idx on public.bicofino_history (person_id);

-- ============================================================
-- 7. GROUPS (master, extensível via UI)
-- ============================================================
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  group_type text not null check (group_type in ('clube','educacional','profissional','empresarial','entidade','pessoal')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists groups_type_idx on public.groups (group_type);

-- ============================================================
-- 8. PERSON_GROUPS (junction)
-- ============================================================
create table if not exists public.person_groups (
  person_id uuid not null references public.people(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  joined_year smallint,
  notes text,
  primary key (person_id, group_id)
);

-- ============================================================
-- 9. GEOGRAPHY_ACTION
-- ============================================================
create table if not exists public.geography_action (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  region text not null,
  scope text check (scope in ('cidade','estado','pais','continente','global') or scope is null),
  context text check (context in ('mora','atua','tem_negocio','tem_familia','outro') or context is null),
  created_at timestamptz not null default now()
);

create index if not exists geography_action_person_idx on public.geography_action (person_id);

-- ============================================================
-- 10. SIGNALS (gatilho de matchmaking)
-- ============================================================
create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  signal_type text not null check (signal_type in ('interesse','lifeevent','capital_move','ask','recusa','outro')),
  observed_at date not null default current_date,
  content text not null,
  source text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create index if not exists signals_person_idx on public.signals (person_id);
create index if not exists signals_observed_idx on public.signals (observed_at desc);

-- ============================================================
-- updated_at trigger para people
-- ============================================================
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists people_touch_updated_at on public.people;
create trigger people_touch_updated_at
  before update on public.people
  for each row execute function public.touch_updated_at();

-- ============================================================
-- RLS — Row Level Security
-- ============================================================
-- Estratégia: audiência interna (2-3 pessoas autenticadas). Qualquer usuário
-- autenticado pode ler/escrever tudo, exceto pessoas com restrict_visibility=true
-- que só são visíveis ao created_by ou a uma claim 'is_admin' (futuro).

alter table public.people              enable row level security;
alter table public.contact_methods     enable row level security;
alter table public.person_categories   enable row level security;
alter table public.work_history        enable row level security;
alter table public.futebol_links       enable row level security;
alter table public.bicofino_history    enable row level security;
alter table public.groups              enable row level security;
alter table public.person_groups       enable row level security;
alter table public.geography_action    enable row level security;
alter table public.signals             enable row level security;

-- PEOPLE: leitura geral exceto restritos (só criador vê)
drop policy if exists people_select_authenticated on public.people;
create policy people_select_authenticated on public.people
  for select to authenticated
  using (
    restrict_visibility = false
    or created_by = auth.uid()
  );

drop policy if exists people_insert_authenticated on public.people;
create policy people_insert_authenticated on public.people
  for insert to authenticated
  with check (auth.uid() is not null);

drop policy if exists people_update_authenticated on public.people;
create policy people_update_authenticated on public.people
  for update to authenticated
  using (restrict_visibility = false or created_by = auth.uid())
  with check (auth.uid() is not null);

drop policy if exists people_delete_authenticated on public.people;
create policy people_delete_authenticated on public.people
  for delete to authenticated
  using (created_by = auth.uid());

-- Demais tabelas: acesso amplo a authenticated (filhas seguem visibilidade do parent via FK + uso explícito)
do $$
declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'contact_methods','person_categories','work_history','futebol_links',
      'bicofino_history','groups','person_groups','geography_action','signals'
    ])
  loop
    execute format('drop policy if exists %I_all_authenticated on public.%I;', tbl, tbl);
    execute format(
      'create policy %I_all_authenticated on public.%I for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);',
      tbl, tbl
    );
  end loop;
end $$;
