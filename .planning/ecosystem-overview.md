# BICOFINO — ECOSSISTEMA (contexto para LLM externa)

> Documento de visão geral do monorepo, feito para copiar e colar em qualquer LLM externa
> e dar contexto completo sem precisar abrir o repo. Mantido manualmente — atualize ao
> fim de cada frente relevante. Última atualização: 2026-06-06.

## O que é
Monorepo de uma agência/estúdio de marca esportiva (Bicofino). Reúne o **Design System**,
o **site público**, e uma série de **apps internos e propostas comerciais**. Stack dominante:
**Next.js (App Router) + TypeScript + Tailwind/CSS tokens + motion (Framer Motion v12)**.
Deploy em **Vercel**, dados em **Supabase**, automações com **Google Drive API**, **Adobe
Photoshop (ExtendScript)** e segredos em **Infisical**. Idiomas BR/EN/IT.

## Princípio-mestre
`DESIGN.md` na raiz é a **fonte única de verdade** visual e de interação (tokens de cor,
tipografia, espaçamento 9-step, cantos, motion <300ms, regra "um vibrante por composição").
Nenhum valor fora do sistema fechado de tokens. Skills de craft (web-design-guidelines,
emil-design-eng) informam técnica, mas DESIGN.md sempre vence em decisões de marca.

---

## ESTRUTURA DE PASTAS (raiz)
- `DESIGN.md` — fonte de verdade do design system (LER ANTES de qualquer UI)
- `CLAUDE.md` — instruções do projeto (regras de marca, portas, integrações)
- `BRANDCOMPLETO.md` / `BRIEFING.md` / `HANDOFF.md` / `STATUS.md` — docs de marca e estado
- `apps/` — todos os aplicativos (ver abaixo)
- `packages/design-system` — pacote compartilhado de design tokens/componentes
- `.planning/<projeto>/` — BRIEFING.md + HANDOFF.md por frente (contrato a ser lido na íntegra)
- `.claude/` — agents, skills e settings do Claude Code locais ao repo
- `AI-OS-BASE/` — "sistema operacional de IA": governance, agents, prompts, workflows,
  templates, projects, logs, security (ex.: `05_projects/bicofino/image-pipeline`, athlete-cards)
- `scripts/` — `sync.sh`, `setup-mac.sh`, `sync-reminder.sh`
- `legacy/`, `assets Bicofino/`, `design_handoff_bicofino_v3_1/` — material de apoio

Workspace npm com scripts atalho na raiz: `npm run web|docs|storybook|drive|registro|
casa-nostra|masterclass|vanguarda:*` e `npm run sync`.

---

## APPS (todos Next.js, porta de dev entre parênteses)

### Design System & Marca
- **apps/docs-site** (3001) — site de documentação da marca + design system.
  i18n BR/EN/IT via `content/*.ts`. Dark mode. **EM PROD** na Vercel da empresa
  (projeto `bicofino-ds`, team studio-bicofino). DS v3.1 Fase 1 entregue; Fase 2 = fonte Gotham.
- **apps/ds-studio** (3003) — nova geração do docs (Next 16, Tailwind v4, shadcn, motion).
  7 capítulos / 27 seções, orquestrado por 7 agentes `ds-*`. Em construção, conteúdo sendo portado.
- **apps/storybook** (Next) — explorador de componentes.
- **packages/design-system** — tokens/componentes compartilhados.

### Site público
- **apps/web** (3002) — **bicofino.com**. Versão full-bleed (vídeo + overlay). **EM PROD**:
  `bicofino-web-brown.vercel.app` (team studio-bicofinos-projects). Verticais "On Pitch / Off
  Pitch". Sistema de **intro motion** (5 variantes sorteadas 1×/sessão). Token invertido (header
  branco). Accent local `#bfa37a` (fora do canon v3.1). `.webm` em public/media SÃO versionados
  p/ deploy-via-main; `.mp4` gigantes ficam de fora.

### Apps internos (uso real)
- **apps/drive-atleta** (3042) — **EM USO REAL pelo Fabio**: `drive-atleta.vercel.app`.
  Upload catalogado por atleta. **Supabase + Google Drive API** (upload resumable browser→Drive,
  dedup por hash, thumbs via /api/thumb). Hub + 14 atletas. Tudo na main (PRs #11–#17).
- **apps/woney-registro** (3041) — **EM PROD**: `woney-registro.vercel.app`. App de registro de
  impacto/valor (designer+dev). CSS+tokens do DS. **Supabase** (próximo passo). Source só na
  branch `feat/woney-registro` (editar via worktree, deploy via Vercel CLI).
- **apps/casa-nostra** (3040) — CRM/cadastro de pessoas. **Supabase + Infisical** (segredos via
  `infisical run`). v2 (Ondas 1–11) **EM PROD**: pessoal `casa-nostra-two.vercel.app` + empresa
  `casa-nostra-studio-bicofinos-projects.vercel.app`. Bypass de login (`CASA_NOSTRA_AUTH_BYPASS=1`).
  Banco `people` zerado p/ início limpo; 120 tags intactas. Source na branch `feat/casa-nostra`.

### Editorial — apps/vanguarda (cruza tendências com a lente Bicofino)
- **mercados-globais** (3020), **100-ideias** (3021), **italia-2027** (3022). Branch `feature/vanguarda`.

### Propostas comerciais — apps/propostas
- **o-outro-mapa** (3010) — proposta standalone, 10 seções, mapa SVG do Brasil.
- **masterclass-bovichain** (3011) — proposta de masterclass.

---

## FRENTES EM .planning/ (briefings/handoffs, nem tudo virou app)
- **fluxo-vendas** — funil + roteiros + matchmaking (lead→ICP+score). 12 nós em rascunho, voz
  Bicofino. Uso interno. Regra: validar com o dono antes de gerar em escala.
- **image-pipeline** — toolkit que automatiza Photoshop (recorte + ação "Lomu" + P&B + upscale
  Real-ESRGAN local) e alimenta o card-jogos-motion. Motor = Photoshop via ExtendScript.
- **lancamento-web** — briefing de lançamento do site (Legal + SEO + intro motion).
- **consigliere** — widget de IA contextual (2 camadas) planejado.
- **migracao-monorepo** — trazer casa-nostra, woney-registro, vanguarda, masterclass p/ a main
  (só a pasta de cada app, não mergear branch inteira).
- **drive-atleta**, **casa-nostra**, **vanguarda** — handoffs dos apps acima.

## Ferramentas fora do monorepo de apps (em AI-OS-BASE)
- **card-jogos-motion** — gerador de Stories MP4 9:16 (1080×1920) via captura headless;
  accent = cor do clube. Usado para "Jogos da Semana".
- **athlete-cards** — gerador Node+Puppeteer de cards de atleta 1080×1920 em PDF.

---

## INTEGRAÇÕES (contas em woney@bicofino.com)
- **Vercel** — deploy de todos os apps em produção. Apps da empresa no team
  `studio-bicofinos-projects`; design system no projeto `bicofino-ds`.
- **Supabase** — banco/auth de: casa-nostra, drive-atleta, woney-registro. (Athlete Portal usará RLS.)
- **Google Workspace + Drive API** — drive-atleta (upload e thumbs); contas e e-mail.
- **Adobe Photoshop (ExtendScript)** — motor do image-pipeline (automação de tratamento de imagem).
- **Infisical** — gestão de segredos (usado hoje no casa-nostra via `infisical run --env=dev`).
- **GitHub** — `studio-bicofino` (empresa) + `WoneyMalian` (pessoal); push vai para os dois remotes.
- **OpenRouter** — acesso a modelos. (Real-ESRGAN roda local, não é cloud.)

---

## CONVENÇÕES / CUIDADOS
- Ler `DESIGN.md` e o `.planning/<projeto>/BRIEFING.md`+`HANDOFF.md` na íntegra antes de propor escopo.
- Tokens fechados: cores, espaçamento `--sp-1…9` (4–96px), cantos sharp/soft/pill, ícones
  lucide-react stroke 1.5 size 20. Sem hex/gradientes/sombras fora do sistema.
- Apps em branch (casa-nostra, woney-registro, vanguarda): editar via git worktree, deploy via
  Vercel CLI; commit+push ANTES de remover o worktree.
- Nunca commitar `public/brand/` nem `public/media/*.mp4` (uploads manuais); `.webm` é exceção.
- Atualizar o HANDOFF commitado ANTES de sincronizar entre máquinas.
- i18n sempre com paridade BR/EN/IT.

## ESTADO RESUMIDO (jun/2026)
- EM PROD: docs-site (bicofino-ds), web (bicofino.com), drive-atleta (uso real), woney-registro,
  casa-nostra v2.
- EM CONSTRUÇÃO: ds-studio (nova geração docs), image-pipeline (teste pendente de setup),
  fluxo-vendas (rascunho), consigliere (planejado).
- Branch atual: `main`.
