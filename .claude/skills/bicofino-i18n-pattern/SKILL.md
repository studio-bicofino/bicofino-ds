---
name: bicofino-i18n-pattern
description: How to add or modify localized strings in apps/web. Invoke whenever user-visible text is added, edited, or removed. Ensures BR/EN/IT parity at all times.
---

# Bicofino i18n — Trilingual Always

Three locales: `br`, `en`, `it`. Every visible string must exist 
in all three. Never add a key to one without the others.

## Files

- `apps/web/content/br.ts` — Portuguese (default)
- `apps/web/content/en.ts` — American English
- `apps/web/content/it.ts` — Italian (formal)
- `apps/web/content/index.ts` — Lang type, dictionary map, useLang
- `apps/web/providers/LanguageProvider.tsx` — context, persistence

## Namespace pattern

Match docs-site convention. Top-level by surface:

```ts
{
  nav: { foundation, offField, onField },
  home: {
    hero: {
      heading: "Connect. Curate. Create. Consult.",
      eyebrow: "UNLIKE ANY OTHER.",
      lead: "...",
      lead2: "...",
      lead3: "..."
    }
  },
  footer: {
    address: "...",
    club: "CLUB",
    rights: "© 2010 — now | BICOFINO GROUP S.A."
  }
}
```

Keys in English even when values are in PT — easier to grep.

## Adding a new key

1. Open all three files at once
2. Add same key path in all three
3. Translate carefully — IT formal, EN American, BR atelier-premium
4. Component usage:

```tsx
'use client'
import { useLang } from '@/content'

export function MyComponent() {
  const { t } = useLang()
  return <h2>{t('home.hero.heading')}</h2>
}
```

5. If Server Component, pass strings as props from closest client 
   boundary, or convert to client component

## Persistence

- localStorage key: `bf-lang` accepts `'br' | 'en' | 'it'`
- HTML `lang` attribute updates dynamically
- Switcher order in footer: `EN • IT • BR`
- Active state colors: EN `--bf-como`, BR `--bf-sep`, IT `#ed0007`

## Forbidden

❌ Hardcoded user-visible strings in JSX
❌ Adding key to br.ts only ("translate later" never happens)
❌ String concatenation with translated fragments — use full 
   sentences per key
