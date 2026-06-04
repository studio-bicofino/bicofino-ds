-- Registro de Impacto — schema inicial (bloco 4 do briefing).
-- Pronto para quando o app sair do modo seed-first e plugar o Supabase.
-- Os tipos em src/lib/types.ts mapeiam 1:1 para estas tabelas.

-- Configurações globais (uma única linha, id = 1)
create table if not exists settings (
  id int primary key default 1,
  salario_mensal numeric default 17000,
  horas_uteis_mes numeric default 160,
  ferramenta_usd numeric default 100,       -- Claude Max 5x, US$/mês
  cambio_usd_brl numeric default 5.04,
  encargos_cartao numeric default 0.0438,   -- IOF/spread
  stories_mes numeric default 8,            -- premissa de projeção
  propostas_mes numeric default 2,
  dev_salario_base numeric default 5000,    -- dev júnior, base R$/mês (SP, jun/2026)
  dev_mult_empregador numeric default 1.8,  -- CLT carregado; ~1.0–1.1 se PJ
  dev_fracao_fte numeric default 0.5        -- fração de um dev que eu cubro
);

-- Sistemas e automações construídos
create table if not exists sistemas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text not null check (tipo in ('eficiencia','infraestrutura','projeto')),
  criado_em date default now(),
  investimento_horas numeric default 0,     -- custo único de construir
  tempo_antes_min numeric,                  -- só eficiência (por peça)
  tempo_depois_min numeric,                 -- só eficiência (por peça)
  tempo_antes_dias numeric,                 -- só projeto (escala de projeto)
  tempo_depois_dias numeric,                -- só projeto
  destravou text,                           -- só infraestrutura
  natureza_valor text,                      -- só infraestrutura
  papel text check (papel in ('template','propostas')),  -- papel na projeção recorrente
  notas text
);

-- Cada aplicação de um sistema de eficiência (gera a galeria)
create table if not exists usos (
  id uuid primary key default gen_random_uuid(),
  sistema_id uuid references sistemas(id) on delete cascade,
  data date default now(),
  legenda text,                             -- ex: "Story Kerchner x Santos"
  imagem_url text                           -- screenshot da peça no Storage
);

-- Bucket de Storage 'pecas' (público para leitura) — criar no painel do Supabase
-- ou via: insert into storage.buckets (id, name, public) values ('pecas','pecas',true);

-- Linha única de settings
insert into settings (id) values (1) on conflict (id) do nothing;
