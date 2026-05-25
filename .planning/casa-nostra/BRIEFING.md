# BRIEFING — Casa Nostra (Bicofino)

*Documento de partida. Sessão originadora: 2026-05-25.*
*Para continuar em chat novo: `Lê @.planning/casa-nostra/BRIEFING.md e vamos começar.`*

---

## O que é Casa Nostra

App interno do Bicofino para Fabio (e Woney) cadastrarem e gerenciarem a base de relacionamento da casa. Não é CRM comercial — é "a Casa que organiza nossas relações", backbone do matchmaking que conecta atores (pessoas) com oportunidades (apps vanguarda).

Audiência: 2-3 pessoas internas. Magic link auth. Sem acesso externo.

Localização planejada: `apps/casa-nostra/` (porta `3040`).

---

## Contexto estratégico (pra entender por que existe)

Já foram construídos 3 apps editoriais em `apps/vanguarda/` que materializam o cruzamento do corpus VANGUARDA com a lente Bicofino. Esses apps são *biblioteca de oportunidades* (prospects, teses Wealth, matches On↔Off, 30 ideias × 3 trilhas).

**Casa Nostra é o registro de atores que complementa essa biblioteca.** A integração final — uma terceira camada de matchmaking — é projeto futuro. Por agora: construir bem a base.

Capabilities recorrentes identificadas nos outputs VANGUARDA que justificam Casa Nostra:
- "CRM de relação (não de pipeline)" — registro qualitativo, não pipeline comercial
- "Função de Curadora Soberana" — pessoa nominal que decide matches
- Cadência calibrada: Patriarca = 4 contatos/ano, executivo = 8, atleta = 24

Ver `apps/vanguarda/STATUS.md` para contexto dos apps editoriais já em produção.

---

## Decisões já tomadas (locked in — não rediscutir, exceto se houver objeção forte)

1. **Nome:** Casa Nostra. Pasta `apps/casa-nostra/`. Porta `3040`.
2. **Stack:** Next 16 + React 19 + Supabase JS + motion (Framer Motion) + Bicofino tokens do DESIGN.md.
3. **Auth:** Magic link Supabase Auth com allowlist por email. Apenas Fabio + Woney inicialmente.
4. **Cluster A/B/C:** Campo opcional no schema (nullable).
5. **Cores ops sóbrias (exceção documentada):** Adicionar 2 tokens *só nesta app*, distintos do brand:
   - `--bf-ops-success: #2D7D5A` (verde sóbrio, não saturado) — botões de salvar/confirmar
   - `--bf-ops-edit: #3A6FA8` (azul institucional) — botões de editar
   - Brand accent `#BFA37A` permanece para elementos de marca (logo, eyebrow). Danger usa vermelho discreto.
   - Documentar a exceção no `DESIGN.md` ou no próprio app (decisão a discutir no chat novo).
6. **UI de referência:** Untitled UI dashboard padrão (list + edit modal central, sidebar de seções, rounded corners, search + filters + add button). Adaptado aos tokens Bicofino.
7. **Animações:** motion (já em uso em `apps/web`). Fade-in da lista, slide-up do modal, micro-feedback no save.
8. **Deploy:** Vercel preview gated pelo magic link. Não acessível sem login.

---

## Schema proposto (rever no chat novo antes de implementar)

9 tabelas. RLS em todas. Service role apenas para migrations.

```sql
-- People (tabela principal)
people
  id uuid primary key default gen_random_uuid()
  full_name text not null
  preferred_name text
  photo_url text  -- Supabase Storage
  current_company text
  current_role text
  cluster text check (cluster in ('A','B','C') or cluster is null)  -- opcional
  seniority text  -- enum: pleno | sênior | executivo | C-suite | referência
  expertise_area text
  intimacy smallint check (intimacy between 1 and 5)
  contact_ease smallint check (contact_ease between 1 and 5)
  bicofino_disposition smallint check (bicofino_disposition between 1 and 5)
  network_reach smallint check (network_reach between 1 and 5)  -- 1=local, 5=global
  home_city text
  home_country text
  languages text[]  -- ['pt-BR', 'it', 'en']
  passports text[]  -- ['BR', 'IT']
  intro_by_person_id uuid references people(id)  -- quem apresentou
  cadence_target_per_year smallint  -- 4 (Patriarca) | 8 (executivo) | 24 (atleta)
  last_contact_date date
  private_notes text  -- markdown longo, substância qualitativa
  restrict_visibility boolean default false  -- só admin vê
  created_by uuid references auth.users
  updated_by uuid references auth.users
  created_at timestamptz default now()
  updated_at timestamptz default now()

-- Contatos múltiplos por pessoa
contact_methods
  id uuid primary key
  person_id uuid references people(id) on delete cascade
  type text  -- email | phone | whatsapp | instagram | linkedin
  value text
  is_primary boolean default false
  label text  -- "trabalho", "pessoal", etc.

-- Categorias como tags multi-seleção
person_categories
  person_id uuid references people(id) on delete cascade
  category_value text  -- ver seeds abaixo
  primary key (person_id, category_value)

-- Histórico profissional
work_history
  id uuid primary key
  person_id uuid references people(id) on delete cascade
  company text
  role text
  start_year smallint
  end_year smallint  -- null se atual
  notes text

-- Conexões com futebol (vetor único Bicofino)
futebol_links
  id uuid primary key
  person_id uuid references people(id) on delete cascade
  link_type text  -- time | atleta | estadio | patrocinio | entidade | comissao
  entity_name text
  relation text  -- "sócio do conselho", "ex-jogador", "patrocinador de"
  notes text

-- Histórico com Bicofino ou empresas anteriores de Fabio
bicofino_history
  id uuid primary key
  person_id uuid references people(id) on delete cascade
  project text
  year smallint
  role text
  outcome text

-- Grupos master (extensível por Fabio via UI)
groups
  id uuid primary key default gen_random_uuid()
  name text not null
  group_type text  -- clube | educacional | profissional | empresarial | entidade | pessoal
  created_by uuid references auth.users
  created_at timestamptz default now()

-- Junction many-to-many
person_groups
  person_id uuid references people(id) on delete cascade
  group_id uuid references groups(id) on delete cascade
  joined_year smallint  -- opcional
  notes text
  primary key (person_id, group_id)

-- Geografia de atuação (não confunde com home_city/country)
geography_action
  id uuid primary key
  person_id uuid references people(id) on delete cascade
  region text  -- "São Paulo", "Milão", "EUA leste", etc.
  scope text  -- cidade | estado | país | continente | global
  context text  -- mora | atua | tem_negocio | tem_familia

-- Sinais qualitativos (eventos, mudanças, pedidos — gatilho de matchmaking)
signals
  id uuid primary key
  person_id uuid references people(id) on delete cascade
  signal_type text  -- interesse | lifeevent | capital_move | ask | recusa
  observed_at date
  content text  -- "Em junho/2026 mencionou venda da propriedade em Trancoso"
  source text  -- "jantar 12/06", "ligação", "carta", etc.
```

---

## Seeds iniciais (rever no chat novo, posso ajustar)

**Categorias (multi-tag):**
- cliente
- ex-cliente
- prospect
- parceiro
- fornecedor
- investidor
- concorrente
- imprensa
- referência (abre portas sem ser parceiro formal)
- família

**Senioridade:**
- pleno
- sênior
- executivo
- C-suite
- referência (lendário, top global)

**Tipos de grupo (extensível):**
- clube
- educacional
- profissional
- empresarial
- entidade
- pessoal

**Grupos iniciais para seed:**

| Nome | Tipo |
|---|---|
| Clube Pinheiros | clube |
| Clube Atlético São Paulo | clube |
| Esporte Clube Sírio | clube |
| Hebraica | clube |
| Harmonia | clube |
| CBF | entidade |
| CONMEBOL | entidade |
| FIFA | entidade |
| Federação Paulista de Futebol | entidade |
| Grupo Empresários | empresarial |
| Grupo Publicitários | profissional |
| Mundo Corporativo | profissional |
| Financeiro / Wealth | profissional |
| Mídia / Jornalistas | profissional |
| Colégio Bandeirantes | educacional |
| Colégio Dante Alighieri | educacional |
| Colégio Móbile | educacional |
| FGV | educacional |
| Insper | educacional |
| USP | educacional |
| Amigos Particulares | pessoal |
| Família | pessoal |

Fabio adiciona novos grupos via UI quando precisar.

---

## UI direction

### Tela principal: lista de pessoas
- Sidebar de seções à esquerda (Pessoas, Grupos, Sinais, Configurações)
- Tabela central: foto · nome · empresa · cluster · cadência (status visual de "em dia" ou "atrasado") · última atividade · botão de ação
- Topo: search bar + filtros (cluster, categoria, grupo, cidade, alcance) + botão "+ Adicionar pessoa"
- Paginação editorial discreta

### Modal de adicionar/editar pessoa
- Centralizado, fundo overlay sutil
- Slide-up animation (motion)
- Seções colapsáveis no modal:
  1. Identidade (nome, foto, empresa atual, cargo)
  2. Categorização (cluster, categorias multi-tag, senioridade, alcance)
  3. Contatos (lista de email/phone/whatsapp/etc)
  4. Histórico (work_history, bicofino_history)
  5. Conexões (grupos, futebol_links, intro_by)
  6. Geografia (home + actions)
  7. Avaliação (intimacy, contact_ease, bicofino_disposition + cadência)
  8. Notas privadas (textarea grande markdown)
  9. Sinais (lista de sinais recentes — adicionar inline)
- Footer fixo do modal: [Cancelar] [Salvar] — Salvar usa `--bf-ops-success`

### Tela de detalhes (view-only)
- Modal pop-up ou rota dedicada `/p/[id]`
- Layout editorial limpo, parecido com card vanguarda
- Botão "Editar" no canto superior (`--bf-ops-edit`)

### Animations (motion)
- Fade-in da lista ao carregar (stagger leve, ~50ms entre itens)
- Slide-up do modal (200ms, ease-out)
- Micro-feedback no save: pequeno checkmark animado dentro do botão, depois fecha modal
- Hover em linha da tabela: leve background subtle

---

## Tech stack confirmado

- **Next.js 16** com Turbopack (igual aos vanguarda apps)
- **React 19**
- **`@supabase/supabase-js`** (client) e Supabase Auth UI helpers
- **`motion`** v12 (Framer Motion)
- **`lucide-react`** para ícones (stroke 1.5, size 20)
- **`react-hook-form`** + **`zod`** para validação de formulários
- Tokens DESIGN.md como CSS variables + os 2 tokens ops adicionais

---

## O que precisa ser fornecido para começar (BLOQUEIA)

### 1. Supabase project
- URL do projeto: `https://___________.supabase.co`
- anon key (pública)
- service role key (privada — só pra rodar migrations)

**Se ainda não existe:** sugiro criar projeto dedicado chamado `bicofino-casa-nostra` no painel Supabase (5 min). Tier gratuito cobre folgado.

### 2. Email do Fabio
Pra entrar na allowlist do magic link:
- Fabio: `_______@bicofino.com` (?)
- Woney: `woney@bicofino.com` (confirmado)
- Outros?

### 3. Validações no schema
Rever as 9 tabelas e seeds acima. Cortar / adicionar / renomear antes de eu rodar as migrations.

---

## Plano de execução (depois de receber o que falta)

1. **Scaffold `apps/casa-nostra/`** com Next 16 + Supabase + motion + tokens (~30 min)
2. **Migrations SQL** das 9 tabelas + RLS + seeds (~45 min)
3. **Auth flow magic link** com allowlist por email (~1h)
4. **Tela de lista** com search + filtros + paginação (~1.5h)
5. **Modal de edit/add** com formulário completo (9 seções) + foto upload pra Supabase Storage (~2h)
6. **Animações motion** (lista, modal, save feedback) (~30 min)
7. **Deploy Vercel preview** gated pelo magic link (~15 min)

Total estimado: **~6 horas concentradas** para v0.1 funcional.

Depois iteramos: edição inline na tabela, busca avançada (full-text em notes), exportação, vinculação com vanguarda apps, etc.

---

## Hard rules a seguir (vêm de memórias persistentes)

1. **NUNCA `git reset --hard` ou `checkout --` com working tree modificada.** Em 2026-05-25 destruí 22 arquivos com WIP fazendo isso. Antes de qualquer comando destrutivo, `git status` completo. Se há `M` em qualquer arquivo (mesmo de outra frente), parar. Cherry-pick em vez de reset+branch.
2. **DESIGN.md é a fonte da verdade** para tokens do brand. Os 2 tokens ops desta app são exceção documentada — só nesta app, não nos vanguarda/web/docs-site/ds-studio.
3. **turbopack.root deve ser `path.resolve(__dirname, '../..')`** no `next.config.ts` (3 níveis acima pra monorepo root quando app está em `apps/casa-nostra/`).
4. **GitHub dual remote setup:** `git push` envia para origin (WoneyMalian) + bicofino (studio-bicofino) automaticamente.
5. **Confirmar com usuário antes de ações em infraestrutura compartilhada** — deploys Vercel, criação de Supabase projects, push de branches novas.

---

## Referências cruzadas

- `apps/vanguarda/STATUS.md` — apps editoriais já em produção (mercados-globais, 100-ideias, italia-2027)
- `DESIGN.md` — tokens do brand
- `CLAUDE.md` — instruções do projeto
- `.planning/vanguarda/` — briefings + outputs VANGUARDA
- `apps/propostas/o-outro-mapa/` — padrão de sub-app standalone a copiar (estrutura de pastas, next.config, tsconfig)

---

## Decisões que ainda precisam ser tomadas (no chat novo)

- Documentação da exceção dos tokens ops: onde mora? `apps/casa-nostra/DESIGN-OPS.md` ou seção em `DESIGN.md`?
- Migration tool: Supabase CLI local (`supabase migrations`) ou SQL direto no painel?
- Storage bucket: `people-photos` (nome sugerido)
- Branch nova `feature/casa-nostra` ou usar `feature/vanguarda` atual?
- Deploy quando: incremental ou só no final?
- Cadência do projeto: build em uma sessão longa, ou dividido em iterações?

---

*Fim do briefing. Bom trabalho.*
