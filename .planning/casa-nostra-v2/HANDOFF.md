# Casa Nostra v2 — HANDOFF

*Documento autocontido. Lê isto e a Fase 1 pode ser executada do zero, em chat novo, por sub-agentes em paralelo. Versão 1. Criado em 2026-05-27.*

---

## 0 · TL;DR

Casa Nostra v0.8.1 ficou complexa demais (Fabio: form de 10 sections). A v2 reduz a captura a **8 campos numa única tela sem scroll**, mantém o mesmo banco Supabase, mantém o visual Bicofino, e estrutura os dados via **sistema de tags** (Skills / Grupos / Afiliações) que vai alimentar um sistema de matchmaking nas fases seguintes. Sem i18n — só PT-BR.

---

## 1 · Por que v2 existe

A v0.8.1 cobriu o escopo original (CRM qualitativo interno, schema 12 tabelas, cluster A/B/C, scores 1-5, signals, organizations idempotentes). Foi entregue, está congelada no commit `a7ba1e8`, e roda em produção como referência viva.

Feedback do Fabio ao usar:

- Form com 10 sections — denso demais pra preencher na rotina.
- Faltou campo crítico: **endereço de correspondência**.
- Muita variável (clusters, scores, signals, evaluation) que ele não usa no dia-a-dia.

A v2 não refatora a v0.8.1 — **constrói paralelo a ela**, no mesmo app, mesmo banco, dividindo apenas o suficiente do schema e da UI. A v0.8.1 segue acessível como `/p/[id]` e `/p/novo` para consulta. A v2 é a **nova porta de entrada** de cadastros.

---

## 2 · Decisões travadas

| # | Decisão | Status |
|---|---------|--------|
| 1 | **8 campos** no form, **tela única sem scroll** | ✅ travado |
| 2 | **3 tipos de tag** distintos: Skills, Grupos, Afiliações (cada um com autocomplete + criar novo) | ✅ travado |
| 3 | **Pendência** = marcador vermelho na lista (não no form). Disparada por: foto faltando OU endereço totalmente vazio | ✅ travado |
| 4 | **Ontologia de tags** (metadados: categoria, geo, tipo) entra só na **Fase 2**, separada da captura | ✅ travado |
| 5 | **Schema aditivo**. Não destrói nada da v0.8.1. Adiciona apenas: tabelas `tags` + `person_tags`, colunas de endereço estruturado em `people` | ✅ travado |
| 6 | **Sem i18n.** Só PT-BR. Sem language switcher, sem content/{br,en,it}.ts. | ✅ travado |
| 7 | **Branding**: "Casa Nostra" grande no topo + `// BICOFINO // CASA NOSTRA v2` micro no rodapé | ✅ travado |
| 8 | **Cargo e Empresa** = dois campos separados (não unificados) | ✅ travado |
| 9 | **Endereço** = estruturado (rua, número, complemento, cidade, estado, CEP, país) mas tolerante — cidade sozinha já vale | ✅ travado |
| 10 | **Foto** = opcional (mas dispara pendência se vazia) | ✅ travado |

---

## 3 · Escopo da Fase 1

**Entregar:**

1. Rota `/cadastro` com o componente `<CadastroV2 />` — form de 8 campos, uma tela.
2. Rota `/membros` — listagem com marcadores de pendência (vermelho).
3. Migration aditiva: tabelas `tags`, `person_tags` + colunas de endereço em `people` + (se necessário) tipo `website` em `contact_methods`.
4. Reutilização dos componentes da v0.8.1 (PhotoUploader, AutocompleteField, ChipInput) — adaptados, não duplicados.
5. Footer com selo `// BICOFINO // CASA NOSTRA v2`.

**Não fazer na Fase 1:**

- Ontologia de tags (metadados, normalização) — fica pra Fase 2.
- Matchmaking, busca por interseção, briefing → ativação — Fases 4-5.
- Migrar dados das tabelas antigas (`person_categories`, `groups`, `futebol_links`, etc.) pra tags — projeto separado se vier.
- Trocar v0.8.1 por v2 — convivem.

---

## 4 · Schema — o que muda, o que não muda

### Tabelas e colunas existentes (NÃO mexer)

Manter intactas:
`people`, `contact_methods`, `person_categories`, `work_history`, `futebol_links`, `bicofino_history`, `groups`, `person_groups`, `geography_action`, `signals`, `organizations`, `person_organizations`.

Buckets: `people-photos`, `org-logos` — reusar.

### Mudanças aditivas (migration `0004_tags_v2.sql`)

**Nova tabela `tags`**

```sql
create table tags (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  name_key      text not null,                       -- normalizeKey(name)
  kind          text not null check (kind in ('skill','grupo','afiliacao')),
  metadata      jsonb default '{}'::jsonb,           -- Fase 2: {categoria, geo, org_type}
  created_at    timestamptz not null default now(),
  created_by    uuid references auth.users(id),
  unique (kind, name_key)                            -- idempotência por tipo
);
create index on tags (kind);
create index on tags (name_key);
```

**Nova tabela `person_tags`** (junção M:N)

```sql
create table person_tags (
  person_id     uuid not null references people(id) on delete cascade,
  tag_id        uuid not null references tags(id) on delete cascade,
  sort_order    int default 0,
  created_at    timestamptz not null default now(),
  primary key (person_id, tag_id)
);
create index on person_tags (tag_id);
```

**Novas colunas em `people`** (endereço estruturado, opcionais)

```sql
alter table people add column address_street     text;
alter table people add column address_number     text;
alter table people add column address_complement text;
alter table people add column address_state      text;
alter table people add column address_zip        text;
-- Reaproveitar home_city e home_country existentes para cidade/país.
```

**Possível ajuste em `contact_methods`**

Verificar se `kind` já aceita `website`. Se não, adicionar via check constraint:

```sql
-- só se necessário
alter table contact_methods drop constraint contact_methods_kind_check;
alter table contact_methods add constraint contact_methods_kind_check
  check (kind in ('email','phone','whatsapp','instagram','linkedin','website','outro'));
```

### Mapeamento Form → Schema

| Campo do form | Tabela / coluna |
|---|---|
| Foto | `people.photo_url` (bucket `people-photos`) |
| Nome | `people.full_name` |
| Cargo | `people.current_title` |
| Empresa | `people.current_company` |
| Contato WhatsApp | `contact_methods` (kind=`whatsapp`) |
| Contato Email | `contact_methods` (kind=`email`) |
| Endereço | `people.address_*` + `home_city` + `home_country` |
| Contato Site | `contact_methods` (kind=`website`) |
| Contato Instagram | `contact_methods` (kind=`instagram`) |
| Skills (tags) | `tags` (kind=`skill`) + `person_tags` |
| Grupos (tags) | `tags` (kind=`grupo`) + `person_tags` |
| Afiliações (tags) | `tags` (kind=`afiliacao`) + `person_tags` |

---

## 5 · UI/UX — tela única, 8 campos

### Layout (desktop, sem scroll em 1440×900)

```
┌─────────────────────────────────────────────────────────────┐
│  Casa Nostra                                       [Salvar] │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐   Nome ___________________________________   │
│  │   foto   │                                                │
│  │    ⊕     │   Cargo ____________   Empresa ____________  │
│  └──────────┘                                                │
│                                                              │
│  Contatos                                                    │
│  📞 _______  ✉ _______  📍 _______  🌐 _______  📷 ____    │
│                                                              │
│  Skills / Atuação                                            │
│  [Comunicação ×] [Futebol Atleta ×] [+ tag]                │
│                                                              │
│  Grupos                                                      │
│  [Colégio ×] [Clube Pinheiros ×] [+ tag]                   │
│                                                              │
│  Afiliações                                                  │
│  [FIFA ×] [Napoli ×] [Globo ×] [+ tag]                     │
│                                                              │
│                                                              │
│                                                              │
│                            // BICOFINO // CASA NOSTRA v2    │
└─────────────────────────────────────────────────────────────┘
```

### Comportamentos

- **Foto**: clique no avatar abre upload. Sem foto → placeholder neutro + pendência.
- **Cargo / Empresa**: input com autocomplete vindo dos valores já cadastrados em `people` (padrão `AutocompleteField.tsx` da v0.8.1, com `normalizeKey` + `pickCanonical`).
- **Contatos**: 5 ícones inline. Cada ícone abre input compacto inline (não modal). Endereço (📍) abre popover com os 7 sub-campos.
- **Tags (3 blocos)**: input que digita → mostra sugestões (tags existentes com mesmo `kind`) → enter cria a tag se não existir. Reusar/adaptar `ChipInput.tsx`. Cada bloco filtra sugestões por `kind`.
- **Salvar**: aceita salvar com qualquer estado (form não trava). Validação só de `full_name` obrigatório (idêntico ao v1).

### Listagem `/membros`

- Reaproveitar layout/filtros da listagem atual (`/`) o quanto fizer sentido.
- Em cada linha: avatar, nome, cargo, empresa, **marcador de pendência** (●) vermelho se: foto faltando **OU** endereço totalmente vazio.
- Tooltip no marcador explica o que falta.

### Tokens / visual

Seguir `DESIGN.md` à risca:
- Cores: wrapper crema `--bf-cn-crema` (`#f3ebd4`, token do app shell), accent `#bfa37a`, sem hex novos. (Versão inicial deste handoff citava `#f9f4e8` — corrigido em 2026-05-27 pra alinhar com o token consolidado no commit `c75f3b8`.)
- Tipografia: Inter + JetBrains Mono.
- Spacing: `sm` 8 / `md` 16 / `lg` 32 — só.
- Radius: `sm` 4 / `md` 8 / `lg` 16.
- Ícones: `lucide-react`, stroke 1.5, size 20.
- Sem shadows, sem gradients, sem animações decorativas.

Selo de rodapé: `// BICOFINO // CASA NOSTRA v2` em JetBrains Mono ~11px, opacity ~0.5, alinhado à direita.

---

## 6 · Reaproveitamento da v0.8.1

| Da v0.8.1 | Como usar na v2 |
|---|---|
| `PhotoUploader.tsx` | Usar direto, bucket `people-photos` |
| `AutocompleteField.tsx` + `normalizeKey` / `pickCanonical` | Usar direto em Cargo / Empresa |
| `ChipInput.tsx` | Base do componente `<TagInput kind="skill\|grupo\|afiliacao" />` da v2 |
| `Field.tsx` + `fieldInputBaseStyle` | Reusar pra consistência visual |
| `src/lib/auth/session.ts` (bypass) | Intacto — v2 herda o mesmo bypass |
| `src/lib/utils/strings.ts` (`normalizeKey`) | Usar pra `tags.name_key` (mesma idempotência das `organizations`) |
| Padrão `organizations.name_key UNIQUE` | Replicar exatamente em `tags (kind, name_key) UNIQUE` |

**Não reusar** os 10 sections do form atual — desenhar `<CadastroV2 />` do zero.

---

## 7 · Stack e convenções

- **Next.js 16.2.6** + **React 19.2.4** (App Router, Turbopack)
- **Supabase JS 2.45.4** + **SSR 0.5.2**
- **react-hook-form 7.53.0** + **zod 3.23.8**
- **Tailwind v4** (via tokens do monorepo)
- **TypeScript strict**
- **Porta dev**: 3040 (mesma da v1, app único)
- **Bypass**: `CASA_NOSTRA_AUTH_BYPASS=1` ativo (Vercel 3 envs + Infisical) — manter

**i18n: NÃO.** Tudo em PT-BR direto no JSX. Sem `content/`, sem switcher.

**Rotas v2:**
- `/cadastro` — form novo
- `/membros` — listagem com pendência

**Rotas v0.8.1 (intocadas):** `/`, `/p/[id]`, `/p/novo`, `/grupos`, `/sinais`, `/configuracoes`.

---

## 8 · Skills disponíveis pra esse projeto

Já instaladas — usar:

- `emil-design-eng` — polish, micro-interações, "invisible details" do form
- `ui-ux-pro-max` — layout tela-única, hierarquia visual, padrões de autocomplete
- `web-design-guidelines` — acessibilidade (labels, focus, ARIA)
- `bicofino-tokens` — enforcement do sistema fechado
- `bicofino-component-template` — boilerplate dos novos componentes
- `vercel:react-best-practices` — review final dos TSX

Pra QA visual final (instalar quando chegar a hora, opcional):
- `gstack` (Garry Tan) — scoring 0-10 por dimensão de design

Skips:
- `anthropic-frontend-design` — overlap com `emil-design-eng`
- `bicofino-i18n-pattern` — não aplicável (sem i18n)

---

## 9 · Plano de execução (sub-agentes em paralelo)

A Fase 1 é executada em **3 ondas**. Cada onda usa os agentes em paralelo onde possível.

### Onda 1 — Schema (sequencial; bloqueia o resto)

| Agent | Tarefa |
|---|---|
| `ds-dev` | Escrever migration `apps/casa-nostra/db/migrations/0004_tags_v2.sql` com: tabelas `tags` + `person_tags`, colunas `address_*` em `people`, ajuste opcional em `contact_methods.kind`. Rodar no Supabase local/prod (confirmar com user antes). Atualizar `src/lib/db/types.ts`. |

### Onda 2 — Build em paralelo (3 agents em uma única mensagem)

| Agent | Tarefa |
|---|---|
| `ds-dev` (A) | Criar `<CadastroV2 />` em `apps/casa-nostra/src/app/(app)/cadastro/page.tsx` + componentes filhos (`ContactBlock`, `TagInput`, `AddressPopover`) reaproveitando PhotoUploader / AutocompleteField / ChipInput |
| `ds-dev` (B) | Criar `/membros/page.tsx` adaptado da listagem atual, com lógica de pendência (foto faltando OR endereço vazio) e marcador vermelho |
| `ds-designer` | Validar a composição (tela única em 1440×900, 1280, 1024 — flagrar onde quebra) **com base nos arquivos produzidos por A e B** — só roda DEPOIS de A e B terminarem |

### Onda 3 — QA e polish (em paralelo)

| Agent | Tarefa |
|---|---|
| `bicofino-design-reviewer` | Auditar `<CadastroV2 />` e `/membros` contra `DESIGN.md` |
| `bicofino-motion-curator` | Auditar qualquer transição/motion adicionada |
| `ds-qa` | Build TypeScript, responsividade 1440 → 375, smoke test do fluxo (criar registro com 1 tag de cada tipo + sem foto → conferir marcador de pendência) |
| `Responsive QA / Layout Doctor` | Pass específico em breakpoints intermediários se `ds-qa` flagrar algo |

### Convenção pra paralelizar

Disparar agents da mesma onda em **uma única mensagem com múltiplas chamadas Agent**. Não esperar resposta de um pra disparar o próximo da mesma onda.

---

## 10 · Acceptance criteria

A Fase 1 está pronta quando:

- [ ] Migration `0004_tags_v2.sql` rodada com sucesso, sem regredir v0.8.1
- [ ] `/cadastro` carrega em < 500ms e cabe em 1440×900 sem scroll
- [ ] Form salva registro com apenas `full_name` preenchido (sem foto, sem tags, sem endereço)
- [ ] Tags Skills/Grupos/Afiliações: autocomplete funciona; criar nova tag persiste em `tags` com `kind` correto; reuso de tag existente (mesmo `name_key`) não duplica
- [ ] Endereço: popover abre, salva parcial (só cidade), salva completo
- [ ] `/membros` lista registros com marcador vermelho pra quem falta foto ou endereço; tooltip explica o que falta
- [ ] Selo `// BICOFINO // CASA NOSTRA v2` no rodapé
- [ ] Zero hex/spacing/radius fora dos tokens do `DESIGN.md`
- [ ] Sem i18n: sem `content/`, sem switcher
- [ ] v0.8.1 (`/`, `/p/[id]`, `/p/novo`) segue funcionando idêntica
- [ ] Build TypeScript sem erros

---

## 11 · Fora de escopo (Fase 1)

- Sincronia entre tags novas e tabelas antigas (`person_categories`, `groups`, `futebol_links`, etc.)
- Ontologia de tags (metadados categoria/geo/org_type) — Fase 2
- Painel curatorial pra normalizar tags duplicadas — Fase 2
- Busca/filtro avançado por tags — Fase 4
- Matchmaking de qualquer tipo — Fases 4-5
- Migração da v0.8.1 — convivem indefinidamente

---

## 12 · Próximas fases (preview, fora deste handoff)

| Fase | Resumo |
|---|---|
| **Fase 2** | Ontologia de tags: painel interno onde Bicofino normaliza duplicadas, adiciona metadados (categoria, geo, tipo de organização). Sem mexer no cadastro. |
| **Fase 3** | Enriquecimento de afiliações: mini-ficha por organização (país, setor, tipo). |
| **Fase 4** | Matchmaking V1: busca por interseção de tags (booleano). Interface separada. |
| **Fase 5** | Matchmaking V2: briefing/URL/notícia → LLM extrai sinais → ranking de ativações na rede com justificativa. Caso de teste canônico: o exemplo Caio Ribeiro × Henrique Galhardo × Napoli × Agro. |
| **Fase 6** | Loop ativo: monitora fontes (outputs VANGUARDA, notícias) e notifica padrões de ativação. |

---

## 13 · Referências e contexto preservado

- **v0.8.1 congelada** em `a7ba1e8` — referência viva, não migrar
- **BRIEFING original** em `.planning/casa-nostra/BRIEFING.md`
- **HANDOFF v0.8.1** em `.planning/casa-nostra/HANDOFF.md`
- **DESIGN.md** — fonte única de verdade visual (raiz do monorepo)
- **CLAUDE.md** — instruções do projeto
- **Memórias do user relevantes**:
  - `project_casa_nostra_status` — v0.8.1 congelada por feedback Fabio
  - `project_casa_nostra_bypass` — bypass de auth ativo
  - `feedback_briefing_first` — ler briefing/handoff integralmente é contrato
  - `feedback_subagent_orchestration` — orquestrar agents em paralelo
  - `feedback_destructive_git` — nunca git reset destrutivo

---

## 14 · Como abrir a próxima sessão

Em chat novo, cole:

> Leia `.planning/casa-nostra-v2/HANDOFF.md` integralmente e execute a Fase 1 conforme a seção 9 (3 ondas, sub-agentes em paralelo onde indicado). Antes da Onda 1, confirme comigo se posso rodar a migration `0004_tags_v2.sql` no Supabase.

*Fim do handoff.*
