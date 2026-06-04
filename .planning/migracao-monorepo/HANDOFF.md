# HANDOFF — Migração para Monorepo Trunk-Based

**Status:** EM EXECUÇÃO — Fases 0–4 ✅ concluídas. PR aberto. Falta Fase 5 (Vercel) + Fase 6 (merge/limpeza).
**Data:** 2026-06-03
**Decisão do Woney:** SIM para (1) todos os apps no `main`, (2) cofre único da empresa, (3) deploy via git na Vercel.

**Branch de migração:** `chore/consolidate-apps-into-main` (pushed em `bicofino`).
**PR:** https://github.com/studio-bicofino/bicofino-ds/pull/18
**Commits:** `799e323` woney-registro · `9c0683c` casa-nostra · `57197c8` vanguarda · `7cd18af` masterclass · `644eb85` briefing→o-outro-mapa · `08d8b09` scripts raiz.
**Builds:** todos os 6 apps passam `npm install` + `next build` local.

---

## 0. Por que estamos fazendo isso (o contrato)

Hoje vários apps importantes vivem **só em branches isoladas** e nunca foram trazidos pro `main`.
Resultado: o `main` **não é** a fonte de verdade completa, e isso quebra o uso em **2 computadores**
(MacBook pessoal + iMac da empresa), porque `git clone`/`git pull` no segundo PC não traz tudo.

**Objetivo final:** `main` contém TODOS os apps → `git clone` + `npm install` em qualquer máquina = ecossistema completo.
Cada app = 1 projeto Vercel com deploy automático no push do `main`.

**Analogia:** trazer cada "restaurante" (app) que está escrito num rascunho (branch) pra dentro da
**edição oficial do caderno** (`main`), eleger **um cofre** (remote da empresa) e fazer cada unidade
**reabrir sozinha** quando o caderno oficial muda (deploy via git).

---

## 1. Estado atual (raio-x de 2026-06-03)

### Apps JÁ no `main` ✅
`web` · `docs-site` · `drive-atleta` · `ds-studio` · `propostas/o-outro-mapa`

### Apps FORA do `main` (a migrar)
| App | Pasta destino | Branch(es) com a versão | Observação |
|-----|---------------|--------------------------|------------|
| woney-registro | `apps/woney-registro` | `feat/woney-registro` | Branch LIMPA — só difere no próprio app + `package.json`. Migração fácil. |
| casa-nostra | `apps/casa-nostra` | `feature/casa-nostra` | Deploy em prod (casa-nostra-studio). HEAD 756dcfa. |
| vanguarda | `apps/vanguarda` | `feature/casa-nostra` **e** `feature/vanguarda` | ⚠️ Existe em 2 branches — decidir a mais nova antes de trazer. |
| masterclass-bovichain | `apps/propostas/masterclass-bovichain` | `feature/casa-nostra` **e** `feature/vanguarda` | ⚠️ idem — 2 branches. |
| maio-2026-patrocinio-federacoes | `apps/propostas/maio-2026-patrocinio-federacoes` | `feature/casa-nostra`, `feature/vanguarda` | proposta |

### Trabalho do docs-site ainda não no `main`
A versão mais recente do `docs-site` (sidebar clara + Consigliere) está em
`feat/sidebar-light-consigliere` (branch atual), **não mergeada**. Tratar como **merge separado** da migração.

### Furo de sincronização
`feature/casa-nostra` tem **2 commits no `origin` (pessoal) que faltam no `bicofino` (empresa)**:
`4457ab4` (drag estilo Apple + desfazer) e `756dcfa` (HANDOFF). → resolver com push.

### Remotes
- `origin` = WoneyMalian (pessoal) — `https://github.com/WoneyMalian/bicofino-ds.git`
- `bicofino` = studio-bicofino (empresa) — `git@github-bicofino:studio-bicofino/bicofino-ds.git`
- **Decisão:** `bicofino` (empresa) é o **canônico**. `origin` vira espelho opcional, não co-igual.

### Lixo confirmado seguro de apagar
- 3× `.gitignore 4` (restos mortos da era iCloud, 01/jun — não regeneram; repo já está em `~/Developer`, fora do iCloud).
- Working-tree órfão `apps/woney-registro/` desta branch: ~722M de `node_modules`/`.next`/`tsbuildinfo`
  (source seguro em `feat/woney-registro`). **Preservar só `.vercel/` se for redeployar via CLI antes da migração Vercel.**

---

## 2. Regra de ouro da migração

> **Trazer SÓ a pasta de cada app, nunca mergear a branch inteira.**

As branches isoladas divergiram pesado de `main` em arquivos compartilhados (`DESIGN.md`, `apps/docs-site/*`,
`.planning/*`, `apps/propostas/o-outro-mapa/*`). Mergear a branch arrastaria versões VELHAS desses arquivos
por cima do `main` atual. Técnica correta, por app:

```bash
# a partir do main atualizado:
git checkout <branch-com-a-versão> -- <pasta-do-app>
# revisar, depois commitar só aquela pasta
```

Isso pega a pasta do app na versão da branch e **ignora** o resto da divergência.

---

## 3. Passo a passo

### Fase 0 — Segurança (antes de tudo)
- [ ] `git push bicofino feature/casa-nostra` (fecha o furo dos 2 commits).
- [ ] Garantir `feat/sidebar-light-consigliere` está pushed no `bicofino` (já estava em 03/jun — reconfirmar).
- [ ] Working tree limpo na branch de trabalho (sem WIP perdido). Conferir `git stash list` (há 1 stash em experiment/design-review — não relacionado).

### Fase 1 — Preparar o main
- [ ] `git checkout main && git pull bicofino main`.
- [ ] Criar branch de migração: `git checkout -b chore/consolidate-apps-into-main`.

### Fase 2 — Decidir versões duplicadas (vanguarda, masterclass, maio-2026)
- [ ] Comparar `feature/casa-nostra` vs `feature/vanguarda` para cada pasta duplicada
      (`git log -1 --format=%ci <branch>:<pasta>` ou diff) e escolher a mais nova/correta.
- [x] Registrar a escolha aqui:
      **RESOLVIDO (2026-06-03):** os três apps têm árvores Git BYTE-IDÊNTICAS nas duas
      branches (vanguarda `cfc22c3`, masterclass `9401b7b`, maio-2026 `b568df3`). Só os
      metadados/datas de commit diferem. Escolha = `feature/casa-nostra` para os três (branch
      mais nova + onde o app casa-nostra também vive → Fase 3 puxa tudo de uma branch só).
      - vanguarda → branch: `feature/casa-nostra`
      - masterclass-bovichain → branch: `feature/casa-nostra`
      - maio-2026-patrocinio-federacoes → branch: `feature/casa-nostra`

### Fase 3 — Trazer cada app (um commit por app)
Ordem sugerida (do mais limpo pro mais complexo):
- [x] **woney-registro** (mais limpo): `799e323` (52 arquivos, de feat/woney-registro)
- [x] **casa-nostra**: `9c0683c` (96 arquivos, de feature/casa-nostra)
- [x] **vanguarda**: `57197c8` (35 arquivos: mercados-globais + 100-ideias + italia-2027)
- [x] **masterclass-bovichain**: `7cd18af` (13 arquivos; casca não-rastreada excluída)
- [x] **maio-2026**: NÃO era app — só continha `BRIEFING_MESTRE_O_OUTRO_MAPA.md`. Briefing
      relocado para `apps/propostas/o-outro-mapa/` (`644eb85`); pasta vazia descartada.
- [x] Cada um: `git status` revisado, `.gitignore` da pasta incluído, **commit isolado**.
      Husk/junk não-rastreado nunca foi staged (técnica `git checkout <branch> -- <path>`).

### Fase 4 — Workspaces e build
- [x] **Sem npm workspaces** — descoberto que o monorepo usa instalação independente por app
      (cada app tem package.json + package-lock.json + node_modules próprios; tokens do DS são
      copiados, não importados via workspace). Logo NÃO há `workspaces` array a atualizar e o
      risco "DS antigo" é nulo (apps são auto-contidos). Em vez disso: scripts de conveniência
      na raiz (`registro`, `casa-nostra`, `masterclass`, `vanguarda:*`) — commit `08d8b09`.
- [x] Build de cada app migrado, um a um → **TODOS PASSAM** (`npm install` + `next build`):
      - vanguarda/100-ideias ✅ · vanguarda/mercados-globais ✅ · vanguarda/italia-2027 ✅
      - masterclass-bovichain ✅ · woney-registro ✅ · casa-nostra ✅
      Lockfiles não mudaram no install. (next-env.d.ts do masterclass teve churn dev→build,
      restaurado.) Logs em /tmp/migracao-builds/.
- [x] Nenhuma dependência quebrada — todos compilam idênticos ao estado da branch de origem.

### Fase 5 — Vercel (deploy via git) ✅
Team empresa: `studio-bicofinos-projects` (`team_i0JJAtJE82qUjMOqY08RTD3o`). Repo: `studio-bicofino/bicofino-ds` (repoId 1243948647).
- [x] **6 projetos** git-connected ao repo, `productionBranch=main`, `rootDirectory` correto:
      - `casa-nostra` (existia) → apps/casa-nostra · `woney-registro` (existia) → apps/woney-registro
      - `masterclass-bovichain` (criado) → apps/propostas/masterclass-bovichain
      - `vanguarda-mercados-globais` / `vanguarda-100-ideias` / `vanguarda-italia-2027` (criados) → apps/vanguarda/*
- [x] **Ignored Build Step** em todos: `git diff --quiet HEAD^ HEAD .` (só rebuilda o app que mudou).
- [x] Env vars preservadas nos 2 de prod (Supabase, bypass casa-nostra) — connect não apaga env.
- [x] **Primeiro deploy-via-main: os 6 READY, domínios canônicos HTTP 200** (woney-registro.vercel.app,
      casa-nostra-five.vercel.app, vanguarda-*.vercel.app, masterclass-bovichain-sand.vercel.app).
      Nada de prod foi derrubado.

### Fase 6 — Merge e limpeza ✅
- [x] PR #18 aberto e **mergeado** no `main` (merge commit `4ed78c9`, preserva commits por app).
- [x] `main` sincronizado em `bicofino` (cofre da empresa).
- [x] Todos os deploys de prod validados no ar (6× HTTP 200).
- [x] Branches apagadas **local + bicofino**: `chore/consolidate-apps-into-main`, `feat/woney-registro`,
      `feature/casa-nostra`, `feature/vanguarda`. **Mantidas no `origin` (pessoal) como backup** (decisão §6).
- [x] Lixo morto apagado (4× iCloud dups: `.gitignore 4` ×3 + `package-lock 4.json`).

### Fase 7 — Conveniência (DEPOIS da limpeza) ✅
- [x] Comando `sync` instalado: `npm run sync [-- "msg"]` → `scripts/sync.sh` (add+commit+push da
      branch atual). Commit `deb87a8`/rebased `c92a01a`.
- [x] **Pré-requisito de segurança feito junto:** `.gitignore` raiz agora exclui
      `apps/web/public/{brand,media}` (uploads grandes never-commit) → `git add -A` do sync não varre mídia.
- [x] Hook do Claude Code: **Stop hook que LEMBRA** de rodar `npm run sync` (NÃO auto-commita —
      auto-commit conflita com "commit só quando pedido"). `scripts/sync-reminder.sh` + project-level
      `.claude/settings.json` (viaja pro iMac). Silencioso a menos que >=3 arquivos mudados ou commits
      não enviados. Commit `7f3e4c7`.

### Regra de trabalho firmada (2026-06-03)
- **Antes de todo `sync` de mudança relevante, atualizar este HANDOFF.** A memória auto é por-máquina
  e NÃO viaja pro iMac; só o repo (HANDOFF/CLAUDE.md/.planning) atravessa via git. Logo o HANDOFF
  commitado é o que dá continuidade entre chats E entre os 2 computadores. (Memória: feedback-handoff-before-sync.)

### Merge à parte — docs-site (não era da migração) ✅
- [x] `feat/sidebar-light-consigliere` (Consigliere no topo + sidebar clara + footer) mergeado no `main`
      via PR #19 (merge commit `b964d65`). Escopo limpo: só `apps/docs-site/` (7 arquivos). Deploy
      do projeto `bicofino-ds` rebuildado do `main`.

### Fase 8 — `bicofino-web` entra no deploy-via-main (2026-06-04) ✅
- [x] **Os 6 `.webm` que o app realmente usa (~16M no total) agora SÃO versionados** → web passa a
      deployar pelo `main` como os outros. Arquivos: `herovideo[2].webm`, `video-on/offpitch.webm`,
      `video-on/offfield.webm`. (commit `9a29f64`)
- [x] **`.gitignore` ajustado:** a regra `apps/web/public/media/` virou `media/*` + exceção
      `!media/*.webm`. Os `.mp4` gigantes (199M/84M/47M…) **continuam fora** — a regra "never commit media"
      do CLAUDE.md sempre mirou neles.
- [x] **CLAUDE.md** atualizado: a nota "never commit `public/media/`" agora registra a exceção `.webm`.
- [x] **Projeto `bicofino-web` git-connected** (faltava — era o "9º app" fora do padrão; deploys antigos
      eram via CLI). Via REST: `rootDirectory=apps/web`, `commandForIgnoringBuildStep=git diff --quiet HEAD^
      HEAD .`; `vercel git connect studio-bicofino/bicofino-ds`; `productionBranch=main`.
- [x] **1º deploy git-connected READY** (`dpl_BpWb8HA7…`): `bicofino-web-brown.vercel.app` HTTP 200 e
      `/media/video-onpitch.webm` servindo `video/webm` 200.
- [x] Com isso, **9/9 apps no padrão deploy-automático-via-main**. ✅

---

## 4. Riscos e mitigação
- **Drift de arquivos compartilhados** → mitigado pela regra "só a pasta do app" (Fase 2/§2).
- **Apps antigos não buildam** (DS desatualizado) → Fase 4 valida um a um antes do merge.
- **Quebrar deploy em prod** → nunca apagar branch/redirecionar domínio antes de confirmar o novo deploy no ar (Fase 6).
- **Perda de trabalho** → nada é apagado até estar no `main` + no ar. Tudo já tem backup em remote hoje.

## 5. Dia a dia depois da migração (2 computadores)
- **iMac empresa (uma vez):** criar pasta fora do iCloud (ex. `~/Developer`), `git clone` do repo da empresa, `npm install`.
- **Sempre:** `git pull` ao começar → trabalhar → `git commit` → `git push` (ou `sync`) ao terminar.
- **Deploy:** push no `main` = deploy automático. Push em branch curta = preview na Vercel.

## 6. Decisões pendentes do Woney
- [~] Manter `origin` (pessoal) como espelho ou remover de vez? → **decidido: manter por enquanto** como
      backup das branches apagadas; remover quando estiver 100% tranquilo.
- [ ] Versões duplicadas (Fase 2): qual branch para vanguarda/masterclass/maio-2026?
- [ ] Executar neste chat ou em chat novo (memória + este handoff cobrem os dois caminhos).
