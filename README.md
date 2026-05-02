# Bicofino Design System

## Structure

```
SITE BICOFINO/
  DESIGN.md               ← Source of truth for all visual decisions
  CLAUDE.md               ← Instructions for Claude (AI)
  package.json            ← Root scripts
  apps/
    docs-site/            ← Premium editorial documentation site
    storybook/            ← Component lab (technical)
    web/                  ← Main website (coming soon)
  packages/
    design-system/        ← Shared CSS tokens and TS constants
  legacy/
    bicofino-backup/      ← Original project backup (safe copy)
```

---

## How to run each app

### 1. Docs Site (premium editorial documentation)

```bash
cd apps/docs-site
npm install
npm run dev
```

Open: http://localhost:3001

This is the main design system documentation — custom sidebar, editorial layout,
all foundations, brand, components and governance sections.

---

### 2. Storybook (component lab)

```bash
cd apps/storybook
npm run storybook
```

Open: http://localhost:6006

Use this to explore and test individual components interactively.

---

### 3. Next.js dev server (storybook app)

```bash
cd apps/storybook
npm run dev
```

Open: http://localhost:3000

---

## Design tokens

All design tokens live in `packages/design-system/`:

- `tokens.css` — CSS custom properties (import in any app)
- `tokens.ts` — TypeScript constants (import in any TS/TSX file)

---

## Source of truth

`DESIGN.md` is the single source of truth for all visual decisions.
Read it before writing any component, page, or style.

---

## Quick start (from root)

```bash
# Install docs-site dependencies
npm run install:docs

# Run docs-site
npm run docs

# Run storybook
npm run storybook
```
