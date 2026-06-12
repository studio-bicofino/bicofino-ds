# AUDITORIA DO ECOSSISTEMA — 2026-06-12 (pré-troca Fable → Opus)

> Auditoria completa do monorepo feita na madrugada de 11→12/06 pelo Claude Fable 5,
> a pedido do Woney, antes da volta ao Opus. Três blocos: **(1) o que já foi arrumado
> nesta sessão**, **(2) ações que só o Woney pode fazer**, **(3) guia + backlog para o
> Opus**. Método: 11 builds completos + 5 sub-agentes de auditoria em paralelo
> (higiene git, planning docs vs realidade, dívida técnica/segurança, i18n, deploy).

---

## SAÚDE GERAL: BOA ✅

- **11/11 builds passam limpos** (web, casa-nostra, la-rete, drive-atleta, woney-registro,
  docs-site, motion-lab, masterclass, vanguarda×3). Nenhum app usa `ignoreBuildErrors` /
  `ignoreDuringBuilds` — os builds verdes são verdes de verdade.
- **Nenhum segredo versionado no git** (histórico completo verificado). `.env.local` reais
  existem só no working tree e estão corretamente ignorados.
- **i18n**: web BR/EN em paridade perfeita; docs-site BR/EN/IT em paridade; zero strings
  hardcoded; zero chaves usadas-mas-inexistentes. (O gap do IT no web foi corrigido — ver abaixo.)
- **main = origin/main** sincronizadas no momento da auditoria.

---

## 1 · ARRUMADO NESTA SESSÃO (commitado na main local, **NÃO pushado**)

| # | O quê | Onde | Detalhe |
|---|-------|------|---------|
| 1 | **IT completo no site público** | `apps/web/content/it.ts` | 41 chaves faltantes traduzidas (Foundation, On Pitch, Off Pitch, Club). Visitante italiano via PORTUGUÊS nessas páginas (fallback BR) — péssimo com Italia 2027 no horizonte. Tradução em italiano formal, revisada pelo agente `bicofino-copy-editor` (12 correções de calco/registro aplicadas, ex.: "fondamenti" não "fondamenta", "procura sportiva" não "procura", "affinamento tecnico" não "rifinitura"). |
| 2 | **`turbopack.root` nos 3 apps que faltavam** | `apps/web`, `apps/ds-studio`, `apps/storybook` → `next.config.ts` | Sem isso o dev server sobe mas trava em todo request no monorepo (regra conhecida do projeto que nunca tinha chegado nesses 3 arquivos). Idioma condicional copiado de la-rete (não quebra worktree-deploy). |
| 3 | **Proteção opt-in do painel drive-atleta** | `apps/drive-atleta/src/proxy.ts` (novo) | Ver item crítico §2.1. **No-op até setar as envs** — zero risco pro uso atual do Fabio. |
| 4 | **`ecosystem-overview.md` atualizado** | `.planning/ecosystem-overview.md` | Estava 6 dias defasado e NÃO mencionava la-rete nem motion-lab (ambos em prod). Corrigido tb: apps que o doc dizia viverem em branch já estão na main; intro motion é só star-spin; bicofino.com no ar. |
| 5 | **Consigliere — nota de realidade** | `.planning/consigliere/PLAN.md` | O PLAN era do widget docs-site, mas a implementação real saiu em la-rete (11/06). Nota no topo evita o Opus "reimplementar do zero". |
| 6 | **HANDOFF drive-atleta corrigido** | `.planning/drive-atleta/HANDOFF.md` | Nota "athletes.ts pendente de commit" estava obsoleta (já commitado); documentada a proteção nova e como ativá-la. |
| 7 | **Duplicata removida** | raiz: `club-logo-fox-1.svg` | Byte-idêntico ao `apps/web/public/club/club-logo-fox.svg` versionado. Lixo de export apagado. |

### Adendo 12/06 (dia) — Brand System em `bicofino.com/brandsystem` + Consigliere OFF

Feito depois da auditoria, a pedido do Woney (apresentação à vista):

- **Multi-zone**: docs-site agora roda com `basePath: '/brandsystem'`; o apps/web ganhou
  rewrites `/brandsystem(/:path*)` → `bicofino-ds-umber.vercel.app/brandsystem/...`.
  **Gotcha que custou um fix**: o domínio prod do projeto é `bicofino-ds-umber.vercel.app`
  — `bicofino-ds.vercel.app` (sem sufixo) pertence a OUTRO projeto (conta pessoal) e servia
  o build antigo. Todas as refs a `public/` do docs-site levaram o prefixo manualmente
  (37× `/assets`, 6 fontes no globals.css) — o Next não prefixa `public/` sozinho. Rewrite
  cego de `/assets`/`/fonts` era inviável (o web tem pastas homônimas). **Efeito colateral**:
  a raiz de `bicofino-ds-umber.vercel.app` vira 404 — o site vive sob `/brandsystem`.
  **Validado em prod 12/06**: HTML/assets/fontes/favicon 200, sem SSO, consigliere ausente,
  home do web intacta.
- **Consigliere desligado PROVISORIAMENTE** (p/ apresentação; religar depois): marcador
  `CONSIGLIERE-OFF` em `apps/docs-site/src/app/page.tsx` (`<ConsigliereHero />`) e
  `Sidebar.tsx` (ícone). Religar = descomentar os 2 blocos + imports. A rota
  `/consigliere` existe mas nada aponta pra ela.
- **Favicon + rodapé espelhados do apps/web**: favicons copiados p/ `src/app/`;
  `SiteFooter.tsx` reescrito = Footer do web com 3 adaptações de sistema (espaçamento
  `--sp-*`, hover do Club em `--current-accent` — nunca o `--bf-accent` web-local —,
  links Club/Privacidade/Cookies em URL absoluta `bicofino.com`). Chaves `footer.*` novas
  nos 3 dicts do docs-site, valores idênticos aos do web (já auditados pelo copy-editor
  no lançamento — não re-auditadas). Pegadinha: o lucide novo do docs-site não tem ícones
  de marca → `IconInstagram` replicado em `BrandIcons.tsx` local.
- **Conferir após o deploy**: Deployment Protection do `bicofino-ds` precisa estar
  "Standard" (prod pública), senão `bicofino.com/brandsystem` serve a página de SSO.

---

## 2 · AÇÕES QUE SÓ O WONEY PODE FAZER (em ordem de prioridade)

### 2.1 🔴 ATIVAR a proteção do drive-atleta (5 min)
**O problema (CRÍTICO):** as rotas `/api/delete`, `/api/share`, `/api/curate` (e o `/painel`)
estavam SEM NENHUMA auth numa URL pública — qualquer pessoa que descobrisse
`drive-atleta.vercel.app` podia **apagar arquivos do Drive**, tornar mídia privada pública
ou bagunçar a curadoria. O app tem uploads reais do Fabio.

**O fix já está no código** (`src/proxy.ts`, HTTP Basic Auth), mas dorme até existirem as envs:
```bash
# na Vercel (projeto drive-atleta, team studio-bicofinos-projects), nos 3 ambientes:
DRIVE_ATLETA_PANEL_USER=<escolher>
DRIVE_ATLETA_PANEL_PASS=<senha forte>
# depois: Deployments → ⋯ no deploy mais recente → Redeploy
```
O navegador pede usuário/senha uma vez ao abrir o `/painel` — combinar a senha com o Fabio.
O fluxo do atleta (`/a/<slug>` + upload) continua sem senha, de propósito.

> **Atualização 12/06 (manhã):** o projeto drive-atleta está **git-connected na main**
> (constatado no dashboard — Source: main, deploy automático). O procedimento de worktree
> do HANDOFF caducou p/ esse app. E NÃO basta tirar o botão de deletar da interface:
> a rota `/api/delete` continua pública pra quem chamar direto (curl/console) — o botão
> é só UM jeito de chamar a rota; a tranca tem que ser no servidor (é o que o proxy faz).

### 2.2 ✅ Push da main local — FEITO 12/06 (manhã)
Woney aprovou o italiano; os 4 commits da auditoria foram pushados (deploy automático
dos apps git-connected, incluindo o proxy do drive-atleta — dormindo até as envs).
Conferir `bicofino.com` em IT.

### 2.3 🟡 `ANTHROPIC_API_KEY` para o la-rete — **EM ABERTO por decisão (12/06)**
Woney: "ainda não fizemos a API, deixar em aberto". O Consigliere do la-rete fica sem
IA em prod até criar a chave em console.anthropic.com e setar nas envs (3 ambientes).

### 2.4 🟡 Search Console do bicofino.com + aposentar o Framer
Pendência do lançamento (11/06), registrada no HANDOFF de lancamento-web.

### 2.5 🟡 Faxina de branches e stash — Woney ainda decidindo (12/06: "ainda não sei")
- `stash@{0}` (em `experiment/design-review`): contém WIP de HANDOFF da auditoria de
  design de maio. Decidir: `git stash apply` numa branch ou drop.
- Branches locais sem remote: `experiment/design-review`, `experiment/ui-skills`,
  `feat/ds-v3.1-fase2` — push de backup ou deletar.
- Provavelmente deletáveis (1 commit, antigas): `feat/web-video-fullbleed`, `feat/ds-v3.1-fase2`.
- `feat/woney-registro`, `feat/drive-atleta`, `feat/ds-v3.1-fase1`: conteúdo já na main —
  podem ser apagadas com calma.

### 2.6 🟢 Vercel — projetos no team errado
`ds-studio`, `storybook`, `o-outro-mapa`, `masterclass-bovichain` estão linkados (no
`.vercel/project.json` local) a um **team diferente** (`team_HkQi1d…`, provável conta
pessoal antiga) — e `apps/storybook` compartilha o MESMO projectId do `legacy/bicofino-backup`.
Quando for mexer nesses apps: relinkar no team da empresa (`team_i0JJAtJE82qUjMOqY08RTD3o`).

### 2.7 🟢 Higiene de credenciais (sem urgência, sem vazamento detectado)
Os `.env.local` de docs-site e drive-atleta têm chaves fortes (OpenRouter, Google OAuth,
Supabase service_role, senha de banco). Nada disso está no git — mas numa eventual troca
de máquina/suspeita, rotacionar.

---

## 3 · PARA O OPUS — GUIA DE OPERAÇÃO + BACKLOG

### 3.1 Regras de ouro (já existem, mas valem repetição — o custo de errar é alto)
1. **`DESIGN.md` é a fonte única** de decisões visuais; skills informam craft, nunca marca.
2. **`.planning/<projeto>/BRIEFING.md` + `HANDOFF.md` são contrato** — ler na íntegra antes de propor escopo.
3. **NUNCA `git reset --hard`/`checkout --` com working tree sujo** (incidente real em 25/05: 22 arquivos perdidos).
4. **Atualizar o HANDOFF commitado ANTES de sincronizar** — memória de sessão não viaja entre máquinas, só o repo.
5. **Texto user-visible** (br/en/it.ts): passar pelo agente `bicofino-copy-editor` antes de commitar; paridade BR/EN/IT sempre (skill `bicofino-i18n-pattern`).
6. **Push na main = deploy em produção** dos apps git-connected (web, docs-site, la-rete, motion-lab, woney-registro, vanguarda, masterclass). Não pushar sem o usuário pedir/saber.
7. **casa-nostra deploya via worktree limpo** de main + cópia do `.vercel/project.json` — NUNCA `vercel` da raiz do checkout (media untracked estoura o upload). Procedimento exato no HANDOFF. (drive-atleta ERA assim, mas está git-connected desde ~09/06 — push na main deploya.)
8. **Sub-agentes em paralelo** em features grandes (preserva janela de contexto — pedido explícito do Woney).

### 3.2 Riscos conhecidos e ACEITOS (não "consertar" sem alinhar com o Woney)
- **casa-nostra `CASA_NOSTRA_AUTH_BYPASS=1` em prod**: o bypass devolve um client Supabase
  com **service_role** (RLS ignorada) e pula o login. É decisão consciente do período de
  construção com o Fabio (`src/lib/supabase/server.ts:9`). Quando o app estabilizar, a
  saída combinada é desligar o bypass e religar o auth — não fazer por conta própria.
- **`#bfa37a` accent local do apps/web**: fora do canon v3.1, mantido de propósito. Não propagar.
- **eyebrow 11px / sidebar meta 9px no docs-site**: intencionais, não "corrigir" em auditorias.
- **Intro do apps/web toca a cada visita** (não 1×/sessão): exceção sancionada, DESIGN.md §8/§11.

### 3.3 Backlog técnico encontrado (nenhum bloqueia nada — priorizar com o Woney)
| Prioridade | Item | Onde |
|---|---|---|
| Média | Migrar Consigliere la-rete de dados fake → adapter Supabase (próximo passo declarado) | `apps/la-rete` |
| Média | woney-registro → persistência Supabase (hoje seed-first) | `apps/woney-registro` |
| Média | `sponsor-publicis.svg` tem **11 MB** — otimizar com svgo (peso absurdo p/ um SVG) | `apps/docs-site/public/assets/on-field/sponsors/` |
| Baixa | Extrair clients Supabase duplicados (casa-nostra × drive-atleta) p/ `packages/` | `src/lib/supabase*` dos dois apps |
| Baixa | `ds-studio` e `storybook` estão sem `node_modules` (não buildam até `npm install`) | `apps/ds-studio`, `apps/storybook` |
| Baixa | `hyphens: auto` pendente nos dois sites (auditoria tipográfica antiga) | web + docs-site |
| Baixa | DS v3.1 Fase 2 = fonte Gotham self-hosted (`--bf-font-impact`) | docs-site / DESIGN.md |
| Baixa | motion-lab: sessão de escolha dos experimentos → emenda §8 do DESIGN.md | `.planning/motion-lab/` |

### 3.4 Pendências por projeto (estado 12/06, conferido contra o repo)
- **web**: Search Console; aposentar Framer; conferir IT em prod após push.
- **la-rete**: calibragem com Fabio/Woney; IA no Radar/Consigliere com chave real; adapter Supabase.
- **casa-nostra v2**: retomada guiada pelo bloco FECHAMENTO do HANDOFF (sessão 10/06 encerrada e sincronizada).
- **drive-atleta**: ativar proteção do painel (§2.1); fatias futuras: ARTES, retry de vídeo.
- **woney-registro**: Supabase; continuar registrando stories (premissa medida: 24min/story).
- **image-pipeline**: código vive em `AI-OS-BASE/05_projects/bicofino/image-pipeline` (FORA do
  git de apps — clone não traz); teste Jean+Cialone pendente de setup (Action Lomu + creds Drive).
- **canal-youtube**: Woney cria o canal (recomendação registrada no BRIEFING: nome "Bicofino TV",
  handle `@bicofinotv`); decisões de idioma/Shorts em aberto.
- **fluxo-vendas**: 12 nós em rascunho; regra de ouro = validar com Woney antes de gerar em escala.
- **ds-studio**: em construção (7 capítulos/27 seções); rodar `npm install` antes de retomar.

### 3.5 O que esta auditoria NÃO cobriu (limites honestos)
- Testes manuais de UI/fluxo em produção (só builds + leitura de código).
- O conteúdo de `AI-OS-BASE/` (fora do escopo de apps).
- Verificação das envs reais na Vercel (sem rodar `vercel env ls` em cada projeto).
- `legacy/` e `assets Bicofino/` (material de apoio, intocados).
