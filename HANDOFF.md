# Bicofino — Handoff Operacional: apps/web

Documento para sessões novas (qualquer modelo: Claude, Gemini, GPT, etc.).
Leia do início ao fim antes de qualquer ação.

---

## Estado atual (11 mai 2026)

| App        | Porta  | URL produção                       | Estado       |
|------------|--------|------------------------------------|--------------|
| docs-site  | 3001   | https://bicofino.vercel.app        | ✅ estável   |
| storybook  | 6006   | —                                  | ✅ estável   |
| apps/web   | 3002   | https://bicofino-web.vercel.app    | ✅ em prod   |

**Último commit estável:** `4bb60bf` — fix(web): nav order on-field→off-field→foundation, Inter Bold nav, H1 44px, footer icon gap
**Branch ativa:** main

### Fase 5 — alterações (11 mai 2026)

- **Header.tsx / MobileMenu.tsx** — ordem do nav invertida: on-field primeiro, off-field segundo, foundation terceiro.
- **Header.tsx** — fonte dos links do nav alterada de JetBrains Mono para Inter Bold 12px / line-height 1.45.
- **FourCsHeading.tsx** — tamanho do H1 fixado em 44px / 1.1 / -0.02em (era `clamp(40px, 7vw, 88px)`).
- **Footer.tsx** — espaçamento ícone↔texto padronizado para 6px: diamond icon movido para dentro do `<a>` do email; instagram gap 4px → 6px.

### Fase 4 — alterações (10 mai 2026)

- **herovideo.webm** — vídeo hero convertido de MP4 para WebM VP9 (767KB vs 6,1MB; redução de 87%). Proporção 500×500 preservada. Upload manual em `public/media/`.
- **page.tsx** — espaço de 120px em `var(--bf-surface)` (#f2f8ff) entre a barra de navegação e o HeroBlock. Implementado via `<div style={{ height: 120 }} />` dentro do `<main>` com `background: 'var(--bf-surface)'`.

---

## Fontes de verdade — leia antes de editar

1. `DESIGN.md` — tokens, tipografia, espaçamento, regras visuais
2. `CLAUDE.md` — arquitetura do monorepo, regras hard
3. `STATUS.md` — changelog completo

---

## Mapa de arquivos — apps/web

```
apps/web/
├── app/
│   ├── layout.tsx                  # root layout, <html lang>, metadata
│   ├── page.tsx                    # homepage (/)
│   ├── (sections)/
│   │   ├── foundation/page.tsx     # /foundation
│   │   ├── on-field/page.tsx       # /on-field
│   │   ├── off-field/page.tsx      # /off-field
│   │   └── club/page.tsx           # /club (tela de acesso, sem header/footer)
│   └── globals.css                 # tokens CSS do apps/web
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # logo + nav desktop + hamburger
│   │   ├── Footer.tsx              # endereço, email, links sociais, lang switcher
│   │   └── MobileMenu.tsx          # overlay mobile com stagger
│   ├── primitives/
│   │   ├── Container.tsx           # max-width 1280, padding --bf-space-lg
│   │   └── Accordion.tsx           # colapsável motion v12, compartilhado em foundation/off-field/on-field
│   └── home/
│       ├── FourCsHeading.tsx       # heading animado "Connect. Curate. Create. Consult."
│       └── HeroBlock.tsx           # grid com vídeo + 4Cs + Mensch
├── content/
│   ├── br.ts                       # todas as strings PT-BR
│   ├── en.ts                       # todas as strings EN
│   ├── it.ts                       # todas as strings IT
│   └── index.ts                    # useLang() hook, lang storage, types
├── next.config.ts                  # NUNCA adicionar outputFileTracingRoot (ver Pitfalls)
└── package.json                    # sem dependências locais de packages/
```

**Assets manuais (não commitados, só upload manual):**
- `public/brand/` — logo-bicofino.svg, icon-diamond-bicofino.svg, icon-club.svg
- `public/media/` — herovideo.webm, herovideo.mp4, herovideo.gif

---

## Como alterar conteúdo de uma página

### 1. Localizar os textos

Todos os textos visíveis estão em `content/br.ts`, `content/en.ts` e `content/it.ts`.
Nunca escreva texto hardcoded diretamente no JSX.

Exemplo de chave existente em `br.ts`:
```ts
'foundation.heading': 'Connect. Curate. Create. Consult.',
'foundation.intro': 'Texto de introdução da página...',
'foundation.connect.heading': 'Connect.',
'foundation.connect.body': 'Descrição...',
```

### 2. Atualizar as três línguas sempre juntas

Sempre que mudar uma chave em `br.ts`, aplicar a mesma chave em `en.ts` e `it.ts`.
O sistema não tem fallback — chave ausente causa erro de TypeScript.

### 3. Usar o hook useLang no componente

```tsx
import { useLang } from '@/content'

const { t } = useLang()
// uso:
<h1>{t('foundation.heading')}</h1>
```

---

## Estrutura visual das páginas (foundation / on-field / off-field)

```tsx
'use client'
// useState para MobileMenu
// Imports: Header, Footer, MobileMenu, Accordion, useLang

// Layout:
<>
  <Header ... />
  <MobileMenu ... />
  <main style={{ flex: 1, background: 'var(--bf-surface)' }}>  {/* azul — NÃO branco */}
    <section style={{ maxWidth: 720, marginInline: 'auto', paddingBlock: 'calc(32px * 3)' }}>

      {/* Eyebrow da página */}
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase',
                  letterSpacing: '0.14em', color: 'var(--bf-text-secondary)' }}>
        {t('page.eyebrow')}
      </p>

      {/* Título principal */}
      <h1 style={{ fontFamily: 'Inter', fontWeight: 700,
                   fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05 }}>
        {t('page.heading')}
      </h1>

      {/* Intro */}
      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--bf-text-secondary)' }}>
        {t('page.intro')}
      </p>

      {/* Serviços / blocos em Accordion colapsável */}
      <Accordion items={items} />

      {/* CTA/Closing — padrão EYEBROW com prefixo // */}
      <p style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase',
                  letterSpacing: '0.14em', color: 'var(--bf-text-subtle)' }}>
        // {t('page.closing')}
      </p>

    </section>
  </main>
  <Footer ... />
</>
```

**Regras visuais das páginas de seção (fase 3):**
- `<main>` usa `background: 'var(--bf-surface)'` (azul `#f2f8ff`) — não `var(--bf-bg-page)`
- Header fica branco puro (`var(--bf-bg-page)`) SEM `borderBottom`
- Separação header↔conteúdo é feita APENAS pelo contraste de cor
- Serviços e 4Cs são sempre em `<Accordion>` — nunca em lista estática ou grid
- Closing usa padrão EYEBROW (JetBrains Mono 11px uppercase) com `// ` como prefixo JSX

---

## Tokens CSS disponíveis (apps/web globals.css)

```
Cores:
--bf-bg-page          #ffffff   (fundo branco, usado no header)
--bf-surface          #f2f8ff   (hero, footer)
--bf-power-black      #061015   (fundo da página /club)
--bf-text-primary     #0f1e2a
--bf-text-secondary   #3a4a58
--bf-text-subtle      #6d7886
--bf-border           rgba(15,30,42,0.1)
--bf-accent           #bfa37a

Tipografia:
Inter         → display, body, títulos
JetBrains Mono → eyebrows, labels, metadata, código

Espaçamento:
--bf-space-sm  8px
--bf-space-md  16px
--bf-space-lg  32px

Raios:
--bf-radius-sm  4px
--bf-radius-md  8px
--bf-radius-lg  16px
```

---

## Como buildar

```bash
cd /caminho/para/SITE\ BICOFINO/apps/web
npm run build
# comando efetivo: next build --webpack
```

O build gera 6 rotas estáticas: `/`, `/_not-found`, `/foundation`, `/on-field`, `/off-field`, `/club`.
Tempo esperado: ~30s. Se terminar com "✓ Generating static pages" e sem erro, está ok.

**Verificar TypeScript antes:**
```bash
cd apps/web
npx tsc --noEmit
```

---

## Como deployar (preview → produção)

### Verificar autenticação
```bash
export PATH="$HOME/.npm-global/bin:$PATH"
vercel whoami   # deve retornar: woneymalian
```

### Deploy preview
```bash
export PATH="$HOME/.npm-global/bin:$PATH"
cd /caminho/para/SITE\ BICOFINO
vercel --cwd apps/web
# Aguardar URL de preview → validar visualmente
```

### Smoke test (rodar no terminal com curl ou node)
```bash
BASE="https://<url-preview>"
node -e "
const https = require('https');
const paths = ['/', '/foundation', '/on-field', '/off-field', '/club'];
let done = 0;
paths.forEach(p => {
  https.get('$BASE' + p, res => {
    console.log(p + ' → ' + res.statusCode);
    if (++done === paths.length) process.exit(0);
  }).on('error', e => { console.log(p + ' → ERROR'); if (++done === paths.length) process.exit(1); });
});
"
```
Todas as rotas devem retornar 200.

### Promover para produção (apenas com YES explícito do Woney)
```bash
vercel --prod --cwd apps/web
```

**URL de produção:** https://bicofino-web.vercel.app

---

## Configuração Vercel — CRÍTICA

**Projeto Vercel:** `bicofino-web`
- `projectId`: `prj_LwIp7XEmgJVfa8Z0DddeNzUGKdTH`
- `orgId`: `team_HkQi1dra7dG8ocbgNYmLC3qi`
- `projectName`: `bicofino-web`
- **Root Directory no dashboard:** campo **vazio** (não `apps/web`, não `./`)
  - Settings: https://vercel.com/woney-malians-projects/bicofino-web/settings/build-and-deployment
- O deploy usa `--cwd apps/web` via CLI — não precisa de Root Directory no dashboard.

---

## Pitfalls — NUNCA FAZER

### 1. outputFileTracingRoot — BANIDO

**NUNCA** adicionar `outputFileTracingRoot` ao `next.config.ts`. Causa path duplicado
`/vercel/path0/vercel/path0/.next/...` no hook `onBuildComplete` da Vercel → deploy falha.

`apps/web` não tem dependências locais de `packages/` (verifique `package.json`).
O `outputFileTracingRoot` não serve para nada aqui.

**next.config.ts correto (não alterar sem necessidade):**
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
}

export default nextConfig
```

### 2. Root Directory no dashboard Vercel

Se Root Directory for setado para `apps/web` no dashboard E o deploy usar `--cwd apps/web`,
o path duplica → mesmo erro acima. O campo deve ficar **vazio**.

### 3. Imports diretos de ESM do lucide-react

**Errado:**
```ts
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
```

**Correto:**
```ts
import { MapPin } from 'lucide-react'
```

O `optimizePackageImports` no `next.config.ts` já garante tree-shaking. Imports diretos
de `dist/esm/` não têm `.d.ts` e quebram o TypeScript.

### 4. Commitar assets

Nunca commitar arquivos de `public/brand/` ou `public/media/`. São uploads manuais.
O `.gitignore` já os exclui — não remover essas entradas.

### 5. git push sem YES

Nunca rodar `git push` ou `vercel --prod` sem confirmação explícita do Woney.

---

## Regras de design (resumo)

- Cores: só os tokens listados acima. Sem hex fora do sistema.
- Tipografia: Inter + JetBrains Mono. Nada mais.
- Espaçamento: só `--bf-space-sm/md/lg` (8/16/32px).
- Ícones: `lucide-react`, strokeWidth 1.5, size 20. Sem ícones preenchidos.
- Animações: `motion` v12, sob 300ms, ease-out. Sem animações decorativas.
- Sombras: não usar a menos que seja funcionalmente necessário.
- Gradientes: não usar.
- Comentários no código: só quando o porquê não é óbvio.

---

## Não tocar

- `apps/docs-site` — site do design system, independente
- `apps/storybook` — component explorer
- `packages/design-system` — tokens e Storybook stories
