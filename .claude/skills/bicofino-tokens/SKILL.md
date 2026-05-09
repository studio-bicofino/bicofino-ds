---
name: bicofino-tokens
description: Reference for Bicofino design tokens. Invoke whenever setting a color, spacing, radius, or font-size in CSS or styled JSX. Prevents introducing values outside the closed token system.
---

# Bicofino Tokens — Closed System

Source: `packages/design-system/tokens.css`, mirror in `tokens.ts`.

## Colors — never use hex outside this list

| Token CSS                | Hex        | When                                          |
|--------------------------|------------|-----------------------------------------------|
| `--bf-primary`           | `#2a2c2b`  | Main ink: body, headlines, primary fill       |
| `--bf-power-black`       | `#061015`  | Dark surfaces, dark mode background           |
| `--bf-secondary`         | `#2C3E50`  | Structural depth, supporting text             |
| `--bf-accent`            | `#BFA37A`  | Hover, active state, focal interactive        |
| `--bf-surface`           | `#F2F8FF`  | Hero/footer panel, card fills                 |
| `--bf-neutral`           | `#E5E7EB`  | Borders, dividers, hairlines                  |
| `--bf-bg-page`           | `#FFFFFF`  | Page background (light)                       |
| `--bf-text-primary`      | semantic   | Adapts to theme                               |
| `--bf-text-secondary`    | semantic   | Adapts to theme                               |
| `--bf-border`            | semantic   | Adapts to theme                               |

If a hex appears in a component file outside this table, it's a bug.

## Typography

Two fonts. Period.

- **Inter** — display, body, UI (~95% of system)
- **JetBrains Mono** — eyebrow, metadata, code, label, footer utility

Forbidden: third font, JBM for body, JBM for headlines.

Sizes:
- Display: 3rem base, custom up to ~88px allowed for hero
- Body: 1rem (16px)
- Label: 0.75rem (12px)

## Spacing — only these three

- `--bf-space-sm` 8px — tight inline gaps
- `--bf-space-md` 16px — default component padding  
- `--bf-space-lg` 32px — section margins, generous breathing room

No 12px, 20px, 24px, 40px, 48px.

## Radius

- `--bf-radius-sm` 4px — inputs, small buttons
- `--bf-radius-md` 8px — cards, containers
- `--bf-radius-lg` 16px — modals, full-bleed surfaces, hero panel

## Iconography

- Library: `lucide-react`
- strokeWidth: 1.5
- size: 20
- Style: stroke-based, never filled
- Custom SVG only for brand: logo, diamond, club key

## Common mistakes

❌ `color: '#333'` → `var(--bf-text-primary)`
❌ `padding: 24px` → `var(--bf-space-lg)` or `--bf-space-md`
❌ `fontFamily: 'Helvetica'` → Inter
❌ `boxShadow: '0 2px 4px rgba(0,0,0,0.1)'` → no shadow unless 
   functionally required
