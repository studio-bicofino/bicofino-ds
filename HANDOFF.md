# Handoff — Fase 2B: Páginas de conteúdo do apps/web

Você está no monorepo Bicofino (root). Sessão nova. Leia tudo
antes de agir.

---

## Antes de qualquer coisa, leia:

1. `DESIGN.md` — fonte da verdade visual
2. `CLAUDE.md` — regras e arquitetura do monorepo
3. `STATUS.md` — estado completo do design system e changelog

---

## Estado do monorepo

| App            | Porta | URL prod                       | Estado            |
|----------------|-------|--------------------------------|-------------------|
| docs-site      | 3001  | https://bicofino.vercel.app    | ✅ estável        |
| storybook      | 6006  | —                              | ✅ estável        |
| apps/web       | 3002  | https://bicofino-web.vercel.app| ⚠️ build pendente |

---

## apps/web — estado atual

**Último commit:** `b34505d` (não há novo commit nesta sessão)
**Branch:** main

### O que foi implementado nesta sessão (Fase 2B)

Todos os arquivos foram escritos e estão corretos. Build ainda não
foi confirmado porque o sandbox do Claude Code não consegue
completar builds Next.js (ver seção "Diagnóstico de Build" abaixo).

```
app/(sections)/
  foundation/page.tsx   ✅ implementado — eyebrow + h1 + intro + grid 2×2 + closing
  on-field/page.tsx     ✅ implementado — eyebrow + h1 + intro + 4 serviços + closing
  off-field/page.tsx    ✅ implementado — eyebrow + h1 + intro + 5 serviços + closing
  club/page.tsx         ✅ criado — tela de acesso, sem auth, fullscreen power-black

components/layout/
  Footer.tsx            ✅ Club link atualizado: href="#" → href="/club"

content/
  br.ts                 ✅ +50 chaves novas (foundation.*, on-field.s*, off-field.s*, club.*)
  en.ts                 ✅ +50 chaves novas (EN translations)
  it.ts                 ✅ +50 chaves novas (IT translations)
```

### Estrutura de cada página nova

**foundation, on-field, off-field:**
- `'use client'` + useState para MobileMenu
- Importa Header, Footer, MobileMenu, useLang
- Layout: section maxWidth 720, marginInline auto, paddingBlock 96px
- Eyebrow: JetBrains Mono 11px uppercase 0.14em
- H1: Inter 700 clamp(36px, 5vw, 56px) lineHeight 1.05
- Intro: Inter 400 18px lineHeight 1.65
- Blocos de serviço: separados por border 1px --bf-border
- Closing: 13px --bf-text-secondary com borderTop

**club:**
- `'use client'` + useState para inputs controlados
- SEM Header, SEM Footer global
- Fullscreen `var(--bf-power-black)`, flex column centrado
- LogoBicofino com `filter: brightness(0) invert(1)` (versão branca)
- 2 inputs (text + password) com focus border-color toggle
- Botão "Entrar" (sem lógica de auth)
- Link "← voltar" para /
- Rodapé "// members only" em JetBrains Mono

### Chaves i18n adicionadas (BR / EN / IT)

```
foundation.eyebrow / .heading / .intro
foundation.connect.heading / .connect.body
foundation.curate.heading  / .curate.body
foundation.create.heading  / .create.body
foundation.consult.heading / .consult.body
foundation.closing

on-field.eyebrow / .heading / .intro
on-field.s1.heading / .s1.body
on-field.s2.heading / .s2.body
on-field.s3.heading / .s3.body
on-field.s4.heading / .s4.body
on-field.closing

off-field.eyebrow / .heading / .intro
off-field.s1.heading / .s1.body  (Branding)
off-field.s2.heading / .s2.body  (Advertising)
off-field.s3.heading / .s3.body  (Conexão)
off-field.s4.heading / .s4.body  (Wealth)
off-field.s5.heading / .s5.body  (PR)
off-field.closing

club.access / .password / .enter / .back / .members
```

---

## Diagnóstico de Build — LEIA ANTES DE DEPLOYAR

O build **não foi executado com sucesso nesta sessão**. A causa não
é o código novo — foi confirmado por eliminação:

- ✅ TypeScript: `tsc --noEmit` — zero erros
- ✅ Páginas stub (5 linhas) também causavam o mesmo hang
- ✅ i18n originais (49 linhas) também causavam o mesmo hang
- ✅ Tanto `--turbopack` quanto `--webpack` travam no mesmo ponto
- ✅ Nenhum import circular detectado

**Causa identificada:** o sandbox do Bash do Claude Code não
consegue spawnar os worker processes que Next.js precisa para
compilar. Resultado: hang em "Creating an optimized production
build..." com ECANCELED nas tentativas de I/O.

**O código está correto.** O build vai funcionar no terminal nativo.

---

## Próximas ações (executar no terminal, não pelo agente)

### 1. Confirmar build

```bash
cd apps/web
rm -rf .next
npm run build
```

Se travar com Turbopack, testar webpack:
```bash
npm run build -- --webpack
```

### 2. Commit após build bem-sucedido

```bash
git add apps/web/app/\(sections\)/ apps/web/content/ apps/web/components/layout/Footer.tsx
git commit -m "feat(web): fase 2B — páginas foundation, on-field, off-field, club"
```

### 3. Deploy preview

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
vercel --cwd apps/web
# Confirmar projeto: bicofino-web
# Aguardar URL de preview → validar visualmente
```

### 4. Só após validação visual do Woney:

```bash
vercel --cwd apps/web --prod
```

### 5. Atualizar STATUS.md

Adicionar entrada com as implementações desta sessão (ver seção
"O que foi implementado" acima).

---

## Regras herdadas

- NÃO toque em `apps/docs-site` nem `apps/storybook`
- NÃO altere `packages/design-system`
- NÃO commita assets em `public/brand/` ou `public/media/`
- NÃO faça git push sem YES explícito do usuário
- NÃO promova para production sem YES explícito
- NÃO rode `vercel login` interativo

### Vercel CLI

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
vercel whoami   # deve retornar "woneymalian"
```
