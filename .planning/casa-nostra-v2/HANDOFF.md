# Casa Nostra v2 — HANDOFF

*Documento autocontido. Lê isto e a Fase 1 pode ser executada do zero, em chat novo, por sub-agentes em paralelo. Versão 1. Criado em 2026-05-27.*

---

## FECHAMENTO DA SESSÃO 2026-06-10 — Ondas 12-15 EM PROD, Fabio aprovou

**Estado ao encerrar:** tudo commitado e pushado (HEAD da sessão `1ba5c2a`), deployado e smoke-testado. Migrations 0006-0009 todas APLICADAS no SQL Editor. Banco com 3 membros reais cadastrados pelo Fabio (família Brancatelli: Fabio, Salvatore, Luigi — Jardim Europa/SP), dados de endereço já limpos (bairro no campo certo, nada preso no Complemento — verificado via REST).

**Pra retomar em chat novo:** ler este HANDOFF (seções Onda 12→15 abaixo) + memória do projeto. Editar direto na main. Deploy: `git worktree add --detach /tmp/cn-deploy main` + copiar `.vercel/project.json` da raiz do checkout pra raiz do worktree + `vercel deploy --prod --yes --scope studio-bicofinos-projects` DO worktree (nunca da raiz do checkout principal — mídia untracked do apps/web estoura o upload). Migrations seguem manuais no SQL Editor (sem connection string).

**Avisos operacionais:**
- Sessão do **Infisical expirada** (login interativo falhou em 10/06). Fallback que funciona: `npx vercel env pull <arquivo> --environment=development --yes --scope studio-bicofinos-projects` da raiz (projeto linkado = casa-nostra) pra obter SUPABASE_URL + SERVICE_ROLE_KEY e operar via REST. Apagar o arquivo depois.
- Colunas legadas `current_title`/`current_company` recebem o 1º valor das tags cargo/empresa — se um dia /membros passar a ler das tags, dá pra aposentar.
- Backlog conhecido: fotos órfãs no storage após delete; Fase 2 (ontologia de tags) e matchmaking (Fases 4-5) não começaram; `/grupos` não gerencia kinds cargo/empresa/skill (só grupo/familia/afiliacao).

---

## STATUS ATUAL — 2026-06-10 (Onda 12 — ajustes ao vivo com Fabio · SOURCE NA MAIN)

**Source migrado pra `main`** (commit `9c0683c` de 03/06, idêntico ao HEAD `756dcfa` da `feature/casa-nostra`). A partir da Onda 12, **ajustes são feitos direto na main** — a branch vira histórico. Este HANDOFF foi portado da branch pra main nesta onda.

### Onda 12 — ajustes da sessão de teste ao vivo (Fabio, 2026-06-10)

1. **Bicofino ID** — campo livre (texto, mono) no header do form, ao lado do título. Coluna `people.bicofino_id text`.
2. **Tratamento** — select Mr / Mrs / Miss à esquerda do Nome. Coluna `people.honorific text`.
3. **Data de nascimento** — date picker à direita do Nome. Coluna `people.birth_date date`. Linha do nome agora é grid `96px 1fr 170px` (`.cn-cadastro-v2__name-grid`, colapsa <720px).
4. **WhatsApp com código de país** — select de país com bandeira emoji (21 países, 🇧🇷 +55 default) antes do input no `ContactBlock`. Valor salvo continua string única `"+55 11 98765-4321"` (parse do dial mais longo primeiro ao reabrir).
5. **Afiliações → Domínios** — rename de LABEL apenas; kind no banco continua `'afiliacao'`.
6. **`/grupos` reescrita como gestão de tags v2** — Fabio cria/renomeia/apaga tags dos kinds `grupo` ("Grupos") e `afiliacao` ("Domínios"), com contagem de uso e confirmação inline. Arquivos novos: `grupos/_actions/tags-admin.ts` (createTagAdmin/renameTagAdmin/deleteTagAdmin) + `grupos/_components/TagManager.tsx`. Esqueleto v0.8.1 da página (AddGroupForm/GroupRow/groups.ts, tabela `groups`) foi APAGADO. Apagar tag limpa `person_tags` via cascade.
7. **Sidebar** — item **Grupos** (lucide `Tags`) de volta, entre Cadastrar e Configurações.

**Migration `0006_people_bicofino_id_honorific_birth.sql`** (bicofino_id, honorific, birth_date) — APLICADA no SQL Editor em 2026-06-10 ("Success. No rows returned").

### Onda 13 — segunda rodada da mesma sessão (Fabio aprovou a 12)

1. **Sócio nº** — campo só-numerais no header, ANTES do Bicofino ID (ordem de associado). Coluna `people.member_number integer` (form envia string de dígitos, action converte via `toIntOrNull`).
2. **Geração** — dropdown 1ª/2ª/3ª/4ª Geração ao lado do Nascimento (grid do nome virou `96px 1fr 170px 150px`). Coluna `people.generation text` (guarda o label inteiro, ex. "2ª Geração").
3. **Família** — novo bloco de tags entre Grupos e Domínios no cadastro. **Kind novo `'familia'`** em tags (check constraint ampliado). `/grupos` virou "Grupos, Famílias & Domínios" — seção Famílias com o mesmo CRUD.
4. `TagKind` em `lib/db/types.ts` ampliado com `'familia'`.

**Migration `0007_member_number_generation_familia.sql`** (member_number, generation, tags_kind_check c/ familia) — APLICADA no SQL Editor em 2026-06-10.

### Onda 14 — terceira rodada da mesma sessão

1. **Cidadania + Ascendência** — pills multi-select de países no ContactBlock, depois de Endereço (ícones lucide `Flag` e `Sprout`). Autocomplete pt-BR (digitou → bandeira+nome), seleção múltipla em chips removíveis; pill fechada mostra as bandeirinhas. Colunas `people.citizenships text[]` e `people.ancestries text[]` guardando códigos ISO alpha-2 (ex. `{BR,IT}`). Infra nova: `src/lib/utils/countries.ts` (~249 códigos ISO, `flagEmoji` via regional indicators, `countryName` via `Intl.DisplayNames(['pt'])` memoizado, `searchCountries` com normalização de acentos) + `cadastro/_components/CountryMultiSelect.tsx` (componente controlado `{label, icon, value: string[], onChange}`).
2. **Cargo e Empresa viraram TAGS multi-valor** — kinds novos `'cargo'` e `'empresa'`. No form, os dois AutocompleteFields viraram TagInputs lado a lado. **Compat legado:** o PRIMEIRO valor de cada lista segue gravado em `people.current_title`/`current_company` (listagem e busca de /membros intactas); na edição, pessoa antiga sem tags de cargo/empresa cai no fallback das colunas legadas (vira chip). Schema do form: `cargos`/`empresas`/`citizenships`/`ancestries` substituem `current_title`/`current_company`.
3. **"V2" removido das telas** — eyebrow de /membros ("// CASA NOSTRA"), header de edição ("// EDITAR"), selo do footer do form ("// BICOFINO // CASA NOSTRA") e header mobile (caiu "v1.0 // Maio 2026"). Decisão do Fabio: versão não é mais informação de UI.

**Migration `0008_citizenship_ancestry_cargo_empresa_tags.sql`** (citizenships, ancestries, tags_kind_check c/ cargo+empresa) — APLICADA no SQL Editor em 2026-06-10.

### Onda 15.1 — Sócio nº na listagem de /membros

A linha de /membros mostra "SÓCIO Nº N" em mono 10px ao lado do nome (quando preenchido). `member_number` entrou na query da page e no `MemberRowData`. Sem migration (coluna já existia da 0007).

### Onda 16 — "não disponível" (N/D) em todos os campos preenchíveis (2026-06-11)

Pessoas que simplesmente NÃO TÊM site/instagram/cargo/endereço etc. não devem acusar pendência. Coluna `people.unavailable_fields text[]` guarda as marcações; chaves: `photo`, `bicofino_id`, `birth_date`, `generation`, `cargo`, `empresa`, `whatsapp`, `email`, `website`, `instagram`, `address`, `citizenships`, `ancestries`, `skills`, `grupos`, `familias`, `afiliacoes`. EXCLUÍDOS (sempre obrigatórios/sem N/D): Nome, Tratamento, Sócio nº.

- UI: toggle mono `n/d` por campo — ao lado do label (campos do form e blocos de tags, helpers `NdToggle`/`NdNote` no CadastroV2), ao lado do input aberto (pills de contato e CountryMultiSelect), no topo do popover (Endereço), abaixo do uploader (Foto). Pills fechadas marcadas mostram "não disponível" em mono subtle.
- Regras: toggle só aparece com o campo vazio; **preencher de verdade desfaz a marcação automaticamente** (`patch`/`addCountry`/`onChange` limpam a flag); helper `unavFor(key, isEmpty)` no CadastroV2.
- **Pendência de /membros agora respeita N/D**: `missingPhoto` ignora se `photo` marcado, `missingAddress` ignora se `address` marcado.
- Gotcha corrigido: botão n/d junto de input precisa de `onMouseDown={e => e.preventDefault()}` — sem isso o blur do input desmonta o botão antes do click registrar.

**Migration `0010_unavailable_fields.sql`** — APLICADA em 2026-06-11 (verificada via REST).

### Onda 18 — Sócio nº auto-sugerido, hover nos campos, sidebar limpa (2026-06-12)

1. **Sócio nº auto-sugerido**: /cadastro pré-preenche com o MENOR número livre (preenche buracos: 1,2,4 → 3; `getNextMemberNumber` na page, prop `suggestedMemberNumber`). **Unicidade no servidor**: `memberNumberTaken` barra duplicata no create e no update (excluindo o próprio id) com erro "Sócio nº X já está em uso."
2. **Hover sutil nos campos do cadastro**: border vira `--bf-cn-caffe` no hover (input/select/.cn-field-shell dentro de .cn-cadastro-v2; !important porque o border é inline).
3. **Sidebar**: bloco email+Sair ("modo construção") REMOVIDO; Configurações foi pro rodapé da sidebar (FOOTER_ITEM). LogoutButton não é mais usado.
4. **Configurações**: roadmap atualizado — "Vincular pessoas ao app La Rete Bicofino".
5. Preview local: `vercel env pull apps/casa-nostra/.env.local` + `next start -p 3040` (driblando o Infisical expirado); URLs sob /casa-nostra por causa do basePath.
6. **PENDENTE DE DEPLOY** (limite de 100 deploys/dia do team Free estourou em 12/06): Onda 18 + favicon (`src/app/icon.svg`, C em Gotham Black sobre #2FD298, commit d207040). Deployar quando a janela resetar.

### Onda 17 — hover verde, sparkles e bicofino.com/casa-nostra (2026-06-12)

1. **Hover da linha de /membros** = verde do botão Novo membro (`--bf-ops-success` em background+border no `.cn-people-row:hover`).
2. **Sparkles de celebração** (exceção decorativa SANCIONADA, mesmo estatuto do cn-pulse): ao Salvar com sucesso, burst de 14 estrelinhas 4 pontas saindo do botão (~800ms, tokens cn: napoli/sep/spfc/amber/torino) e navegação adiada 650ms; em create navega pra `/membros?novo=<id>` e a linha do recém-criado dispara o mesmo burst 1×, limpando o param via `router.replace` após 1,5s. Componente `src/components/SparkleBurst.tsx` (tabela determinística, sem Math.random; reduced-motion → nada + onDone imediato).
3. **MULTI-ZONE: bicofino.com/casa-nostra** — mesmo padrão do /brandsystem: `basePath: '/casa-nostra'` no next.config do app + rewrites no apps/web (`/casa-nostra` e `/casa-nostra/:path*` → casa-nostra-studio-bicofinos-projects.vercel.app). Sidebar convertida de `<a>` pra `next/link` (basePath não se aplica a `<a>` cru). **EFEITO COLATERAL: as URLs do vercel.app mudaram** — raiz dá 404, tudo vive sob `/casa-nostra/...`; canônico passa a ser bicofino.com/casa-nostra.
4. **ALERTA privacidade**: bypass de login continua ATIVO — o CRM (dados pessoais da família) fica acessível publicamente sob o domínio público. Ligar o login real é o próximo passo recomendado.

### Onda 15 — fix Bairro × Complemento

Bug: o lookup de CEP (ViaCEP) jogava `bairro` em `address_complement`. Fix: **Bairro é campo próprio** (`people.address_neighborhood`, preenchido pelo CEP, lado a lado com Complemento no popover) e **Complemento é 100% manual** (ex. nº do apto — o ViaCEP não toca mais nele). `AddressValue` ganhou `neighborhood` em toda a cadeia (popover → CadastroV2 → schema → actions → edição → types).

**Migration `0009_address_neighborhood.sql`** — APLICADA em 2026-06-10. SQL opcional de correção de dados legados (mover address_complement→address_neighborhood) foi oferecido mas NÃO rodado — registros antigos com bairro no Complemento precisam de ajuste manual na edição.

**Deploy:** Vercel CLI da **raiz** do repo/worktree (rootDirectory do projeto = `apps/casa-nostra`), `vercel deploy --prod --yes --scope studio-bicofinos-projects`. NÃO deployar da raiz do checkout principal — os ~382MB de mídia untracked de `apps/web/public/media` estouram o upload; usar worktree limpo de main.

---

## STATUS ANTERIOR — 2026-06-03 (v2 EM PRODUÇÃO NA CONTA DA EMPRESA)

**URL prod (EMPRESA, canônica):** https://casa-nostra-studio-bicofinos-projects.vercel.app — projeto `casa-nostra` no team `studio-bicofinos-projects` (woney@bicofino.com). Último deploy `casa-nostra-j32x8je93`.
**URL prod (PESSOAL, ainda viva):** https://casa-nostra-two.vercel.app (woney-malians-projects) — não aposentada; convive apontando pro MESMO Supabase. Migrar/aposentar depois.
**Branch:** `feature/casa-nostra` · último commit `4457ab4` (Onda 11). NÃO mergeia na main (branch de deploy independente — evita conflito com a #1 DS v3.1 em DESIGN.md/globals.css).
**Banco:** `people` ZERADO de propósito (Fabio quer começar limpo — Henrique foi apagado testando o delete; cascade limpou junções, 0 órfãos). **120 tags intactas** (43 skills/32 grupos/45 afiliações) — apagar pessoa não apaga vocabulário.

### Deploy / infra (2026-06-03)
- Deploy via **Vercel CLI** (`vercel deploy --prod --yes --scope studio-bicofinos-projects`) a partir de `apps/casa-nostra` em **git worktree** sobre `feature/casa-nostra`. App self-contained (sem workspace deps, lockfile próprio). SEM conexão git no Vercel (linkado via `vercel link`).
- Envs no projeto da empresa (production+development) puxadas do Infisical `env=dev`: NEXT_PUBLIC_SUPABASE_URL/ANON_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CASA_NOSTRA_ALLOWLIST, CASA_NOSTRA_AUTH_BYPASS=1, NEXT_PUBLIC_SITE_URL (placeholder `https://casa-nostra.vercel.app` — corrigir p/ domínio canônico SE ligar magic-link). Preview env não setada (CLI exige git-branch, irrelevante sem deploy de preview).
- **Vercel Deployment Protection (ssoProtection)** vinha LIGADA por padrão no team novo → 401. Desligada via REST `PATCH /v9/projects/{id}?teamId=… {"ssoProtection":null}`.
- **bypass=1** (acesso aberto, sem login) por decisão atual. Migrations sempre MANUAIS no SQL Editor (sem connection string no Infisical, só as 6 chaves de app — ver `db/README.md`).
- **REGRA de processo:** deploy via worktree → **COMMITAR (e push) ANTES** de `git worktree remove`. `--force` descarta working tree não-commitada (perdi a fonte uma vez na Onda 10, recuperei do contexto).

### O que está rodando em prod (Ondas 1 → 11)

| Onda | Frente | Commit |
|------|--------|--------|
| 1-4 | Fase 1: /cadastro 8 campos, /membros, sistema de tags, migration `0004_tags_v2.sql` | `23e3068` |
| 5 | Entry `/` → `/membros`, sidebar enxuta, CTA verde pulsante (cn-pulse v0.8.1 restaurado) | `c265929` |
| 6 | Seed 120 tags (`db/seeds/0002_tags_v2.sql` + runner `.mjs`) | `5ef82ec` |
| 7 | **CRITICAL FIX** `'use server'` schema + edit mode (`/membros/[id]`) | `e169f1b` |
| 8 | CEP autocomplete via ViaCEP no `AddressPopover` | `d838801` |
| 9 | Typeahead em `/membros` (`MemberSearch`) + autocomplete de cidade no `AddressPopover` (reusa `AutocompleteField`) | `9c92ac5` |
| 10 | **Apagar + reordenar** membros na lista. Migration `0005_people_list_order.sql` (coluna `list_order`). `members.ts`: `deletePersonV2` (cascade) + `reorderPeopleV2`. `MembersList.tsx` (drag via motion `Reorder`, substitui `MemberRowClient`). | `6437ee0` |
| 11 | **Drag estilo Apple** (lift `whileDrag` + spring ζ≈1 sem overshoot) + **Desfazer ao apagar** (delete otimista adiado 5s + toast, substitui confirm inline). | `4457ab4` |

### Fluxo end-to-end funcionando

1. `/` → redireciona `/membros` (esqueleto v0.8.1 fica em `/p/[id]`, `/grupos`, `/sinais`, `/configuracoes` por URL direta)
2. `/membros` → lista de pessoas com botão "+ Novo membro" verde pulsante
3. `/cadastro` → form 8 campos (foto + nome + cargo + empresa + 5 contatos + 3 blocos de tags). Foto upload OK, CEP autopreenche endereço, salva e volta pra `/membros` (novo membro entra no fim da lista, `list_order = max+1`)
4. Click no card em `/membros` → `/membros/[id]` em modo edit (mesmo form prefilled). Salvar volta pra `/membros`
5. **Na linha de `/membros`** (hover/foco revela handle ⠿ e lixeira): arrastar pelo handle reordena (persiste `list_order` no soltar); lixeira apaga com **undo** (some na hora + toast "Desfazer" 5s, só deleta de vez depois). Drag desligado quando há busca/filtro/paginação (`reorderable={!hasFilters && totalPages===1}`).

### Lição cara: bug do `'use server'` (Onda 7)

`'use server'` files SÓ podem ter `export async function`. Qualquer outro export de valor (`export const schema = z.object(...)`) passa no tsc + build mas crasha no runtime: `"A 'use server' file can only export async functions, found object"`. O Fabio bateu nesse bug no 1º submit em prod. Schema agora vive em `cadastro-schema.ts` (sem 'use server'). **Types são OK** (são erased em runtime).

### Onda 9 — ENTREGUE (2026-05-29 noite, commit `9c92ac5`)

1. ✅ **Typeahead na busca de `/membros`** — `membros/_components/MemberSearch.tsx` (client). Pool leve client-side (query `limit(500)` na page), dropdown nome+empresa, navega pra `/membros/[id]` ao selecionar; Enter sem seleção faz busca server-side. Substitui o `<form>` GET.
2. ✅ **Autocomplete de cidade no `AddressPopover`** — `AutocompleteField` ganhou prop opcional `inputStyle` e é reaproveitado no campo Cidade com o estilo compacto do popover. `home_city` suggestions propagadas: `cadastro/page` + `membros/[id]/page` (`getFormSuggestions`) → `CadastroV2` → `ContactBlock` → `AddressPopover`.

Preview: https://casa-nostra-l8k7u4yre-woney-malians-projects.vercel.app (READY, commit `6d011d3`, inclui fix do z-index do dropdown) — **pendente promoção pra prod** (Fabio escolheu validar o preview primeiro). Promover com `vercel --prod` em `apps/casa-nostra` após OK.

**Fix `6d011d3`:** o dropdown do `MemberSearch` aparecia ATRÁS do contador "N membros" e da tabela (ambos filhos de `.cn-stagger`, animados com transform → criam stacking context). Resolvido forçando `.cn-toolbar` com `zIndex: 40` (inline) e o `<p>` do contador com `zIndex: 0`. `.cn-toolbar` original tinha só `z-index: 1` no globals.css — insuficiente contra os irmãos animados.

### Arquivos-chave da v2 (mapa rápido pra próximo chat)

| Arquivo | Função |
|---------|--------|
| `src/app/(app)/cadastro/page.tsx` | Server component que carrega allTags + suggestions, renderiza CadastroV2 em create mode |
| `src/app/(app)/cadastro/_components/CadastroV2.tsx` | Form com modos `create`/`edit`, props `personId` + `initialData` |
| `src/app/(app)/cadastro/_components/AddressPopover.tsx` | Popover de endereço com CEP autocomplete via ViaCEP |
| `src/app/(app)/cadastro/_components/TagInput.tsx` | Chip input com autocomplete client-side filtrado por kind |
| `src/app/(app)/cadastro/_actions/cadastro.ts` | `createPersonV2` + `updatePersonV2` (ambos com try/catch top-level) |
| `src/app/(app)/cadastro/_actions/cadastro-schema.ts` | `cadastroV2Schema` (zod) + `CadastroV2Input` (tipo) — isolado pra não quebrar 'use server' |
| `src/app/(app)/cadastro/_actions/tags.ts` | `findOrCreateTagInternal` + `listTags` |
| `src/app/(app)/membros/page.tsx` | Lista de pessoas, `MemberSearch` (typeahead), botão Novo Membro pulsante. Ordena por `list_order asc nulls last`. Passa `reorderable` + `baseOffset` pro MembersList |
| `src/app/(app)/membros/_components/MembersList.tsx` | **(Onda 10/11)** lista client: drag-to-reorder (motion `Reorder` + `useDragControls`, lift estilo Apple), apagar com undo (delete adiado + toast `UndoToasts`). Substitui o antigo `MemberRowClient` (removido) |
| `src/app/(app)/membros/_actions/members.ts` | **(Onda 10)** `deletePersonV2` (DELETE em people, cascade limpa junções) + `reorderPeopleV2(orderedIds, baseOffset)` (grava `list_order`) |
| `src/app/(app)/membros/[id]/page.tsx` | Server component que carrega person + contacts + person_tags, renderiza CadastroV2 em edit mode |
| `src/app/(app)/_components/Sidebar.tsx` | Sidebar enxuta (Membros, Cadastrar, Configurações) |
| `src/app/globals.css` | Tokens Casa Nostra + `cn-pulse` keyframe (scale + halo, 1.6s ease-in-out infinite no hover) |
| `db/seeds/seed-tags-v2.mjs` | Runner idempotente do seed via REST + service role |

### Bypass auth (ainda ativo)

`CASA_NOSTRA_AUTH_BYPASS=1` nas 3 envs Vercel + Infisical. `created_by`/`updated_by` ficam `null` em registros novos. Service role no server bypassa RLS. Pra reativar login real: deletar env nas 3 + redeploy.

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

**Fase 1 + Ondas 1–11 ENTREGUES e em prod (empresa).** O app faz o ciclo completo: cadastrar / listar / buscar (typeahead) / editar / **reordenar (drag)** / **apagar (com undo)**. Banco zerado, pronto pro Fabio popular do zero.

Em chat novo, ler PRIMEIRO o memory `project-casa-nostra-v2` + este HANDOFF (topo). Depois confirmar o escopo antes de mexer.

### Candidatos a próximo passo (não priorizados — confirmar com o user)
**Polish / curto:**
- ⌘Z pra desfazer o último apagado; ajustar janela do undo (hoje 5s).
- Limpar foto órfã no storage ao apagar (hoje fica no bucket `people-photos`).
- Domínio limpo (custom domain Bicofino) pro projeto da empresa.
- Aposentar o prod pessoal (`casa-nostra-two`) quando migrar de vez.
- Ligar magic-link (bypass=0) + corrigir `NEXT_PUBLIC_SITE_URL` + redirect no Supabase.

**Visão de longo prazo (Fase 2 → 6, ver memory):**
- Fase 2: ontologia de tags (painel curatorial, normalizar duplicadas).
- Fase 3: enriquecimento de afiliações (mini-ficha por organização).
- Fase 4: matchmaking V1 (busca booleana por interseção de tags).
- Fase 5: matchmaking V2 (briefing/URL → LLM extrai sinais → ranking justificado).
- Fase 6: loop ativo monitorando fontes (VANGUARDA, notícias).

### Lembretes operacionais
- Deploy: worktree sobre `feature/casa-nostra` → `vercel deploy --prod --yes --scope studio-bicofinos-projects` em `apps/casa-nostra`. **Commitar+push ANTES de remover o worktree.**
- Migrations: SQL Editor do Supabase (manual). Secrets via `infisical secrets --env=dev`.
- `'use server'` files: SÓ `export async function` (ver lição da Onda 7).
- Disparar agents da mesma onda em paralelo (uma mensagem, múltiplas chamadas Agent).

*Fim do handoff.*
