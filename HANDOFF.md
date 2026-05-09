# Handoff — Fase 3: Ajustes pós-deploy do apps/web

Você está no monorepo Bicofino (root). Sessão nova. Leia tudo 
antes de agir.

---

## Antes de qualquer coisa, leia:

1. `DESIGN.md` — fonte da verdade visual
2. `CLAUDE.md` — regras e arquitetura do monorepo
3. `STATUS.md` — estado completo do design system e changelog

---

## Estado do monorepo

| App            | Porta | URL prod                       | Estado          |
|----------------|-------|--------------------------------|-----------------|
| docs-site      | 3001  | https://bicofino.vercel.app    | ✅ estável      |
| storybook      | 6006  | —                              | ✅ estável      |
| apps/web       | 3002  | https://bicofino-web.vercel.app| ✅ deployado    |

---

## apps/web — estado atual

**Commit mais recente:** `5108e06`
**Branch:** main (ahead 0 de origin/main — já pushado)

### Componentes existentes

```
app/
  layout.tsx          — RootLayout, metadata, anti-FOUC script, LanguageProvider
  globals.css         — tokens CSS, reset, utilitárias web
  page.tsx            — HomePage (Header + MobileMenu + HeroBlock + Footer)
  (sections)/
    foundation/page.tsx   — placeholder "Em breve."
    off-field/page.tsx    — placeholder "Em breve."
    on-field/page.tsx     — placeholder "Em breve."

components/
  layout/
    Header.tsx        — logo + nav desktop + hamburger mobile
    Footer.tsx        — 2 linhas: endereço+Club / email+IG+copyright+lang
    MobileMenu.tsx    — overlay full-screen, focus trap, stagger 40ms
  home/
    FourCsHeading.tsx — 4Cs em Inter 700, fade-up stagger via motion
    HeroBlock.tsx     — grid 3col desktop / 2col tablet / 1col mobile
  primitives/
    Container.tsx     — max-width 1280, padding --bf-space-lg

content/
  br.ts / en.ts / it.ts / index.ts  — i18n trilíngue, useLang()

providers/
  LanguageProvider.tsx  — contexto de idioma, persiste em localStorage
  ThemeProvider.tsx     — contexto de tema (light/dark)
```

### Assets em disco (NÃO commitados — uploads manuais)

```
apps/web/public/brand/
  logo-bicofino.svg         ✅
  icon-diamond-bicofino.svg ✅
  icon-club.svg             ✅

apps/web/public/media/
  herovideo.gif             ✅ (5.1MB)
  herovideo.webm            ❌ pendente upload
  herovideo.mp4             ❌ pendente upload
```

### Assets commitados (placeholders)

```
apps/web/public/
  favicon.ico    — 32×32 cor sólida #2a2c2b (placeholder)
  og-image.png   — 1200×630 branco + BICOFINO + tagline (placeholder)
```

### Vercel

- **Projeto:** `bicofino-web` (woney-malians-projects) — NOVO, separado 
  do projeto `bicofino` que serve `bicofino.vercel.app` (docs-site)
- **Preview:** https://bicofino-gbkgcmnlq-woney-malians-projects.vercel.app
- **Alias:** https://bicofino-web.vercel.app
- **Build:** SUCCESS — TypeScript limpo, 5 rotas estáticas
- **Pendente do usuário:** desativar Deployment Protection no dashboard:
  Settings → Deployment Protection → Vercel Authentication → Disabled

### Agentes disponíveis

```
.claude/agents/
  bicofino-design-reviewer.md   — audita UI contra DESIGN.md
  bicofino-copy-editor.md       — audita copy contra voz Bicofino
  bicofino-motion-curator.md    — audita animações e transições
  bicofino-deploy-conductor.md  — orquestra build + git + vercel deploy
```

### Skills disponíveis

```
.claude/skills/
  bicofino-tokens/SKILL.md           — referência de tokens fechados
  bicofino-i18n-pattern/SKILL.md     — padrão BR/EN/IT para apps/web
  bicofino-component-template/SKILL.md — boilerplate de novos componentes
```

---

## Regras desta sessão (herdadas do CLAUDE.md)

- NÃO toque em `apps/docs-site` nem `apps/storybook` a menos que 
  explicitamente pedido
- NÃO altere `packages/design-system` (read-only salvo instrução)
- NÃO instale dependências novas além das presentes em 
  `apps/web/package.json`
- NÃO commita assets em `public/brand/` ou `public/media/` — 
  são uploads manuais
- NÃO faça git push sem YES explícito do usuário
- NÃO promova para production no Vercel sem YES explícito
- NÃO rode `vercel login` interativo — se faltar auth, pare e 
  reporte

### Vercel CLI

Instalado em `~/.npm-global/bin/vercel`. Se não estiver no PATH:

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
vercel whoami   # deve retornar "woneymalian"
```

---

## Próximas ações esperadas

O usuário vai passar ajustes visuais/funcionais para a homepage. 
Para cada ajuste:

1. Leia o componente afetado
2. Aplique apenas o que foi pedido (sem refactor adicional)
3. Rode `cd apps/web && npm run build` para confirmar TypeScript limpo
4. Reporte o que mudou em uma frase
5. Quando o usuário pedir deploy, use o agente `bicofino-deploy-conductor`
   ou siga a sequência: build → git add → commit → push (YES) → 
   `vercel --yes` (preview) → smoke test → `vercel --prod --yes` (YES)

### Etapas futuras (sessão própria, não agora)

- Migrar DNS de `bicofino.com` de Framer para Vercel
- Substituir favicon.ico e og-image.png pelos finais
- Upload de herovideo.webm e herovideo.mp4 para public/media/
- Construir páginas `/foundation`, `/off-field`, `/on-field`
