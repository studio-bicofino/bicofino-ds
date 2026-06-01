# Bicofino — Project Instructions

## Source of Truth

`DESIGN.md` is the single source of truth for all visual and interaction decisions.

Before writing any component, page, or style:
1. Read `DESIGN.md`.
2. Apply the tokens, philosophy, and rules described there.
3. Do not introduce patterns that are not derivable from that document.

## What This Means in Practice

**Colors** — use only the tokens defined in `DESIGN.md`. No hex values outside that set. One vibrant per composition via `--current-accent` (randomised per refresh from the 12 Highlights; SSR fallback `--bf-spfc`). Never pin a hardcoded accent.

**Typography** — use only Inter (display/body) and JetBrains Mono (label/metadata/code) at the defined sizes. `Gotham` (`--bf-font-impact`) is reserved for 1–2 impact words (post titles, athlete names) once self-hosted — Phase 2.

**Spacing** — use only the 9-step scale `--sp-1…9` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px. No values outside it.

**Radius / Corners** — two corner languages, read via `--bf-corner-1/2/3` (default = sharp): `sharp` 2 / 4 / 8 px · `soft` 12 / 18 / 28 px · `pill` 9999px. Switch a container with `[data-corners="soft"|"sharp"]`. No ad-hoc radius values.

**Icons** — use `lucide-react`, stroke width `1.5`, size `20`. No filled icons.

**Components** — inherit color roles, spacing, and typography from the system. No standalone visual rules.

**Interactions** — subtle, under 300ms (`120/200/360ms`), `ease-out`. No decorative animations. Exception: the M-01 ambient "living-organism" loop (`--dur-ambient` ≈6s, scoped to `.bf-schematic`) — must stop under `prefers-reduced-motion`.

## Hard Rules

- Do not add new colors outside the token set. The accent is `--current-accent` (randomised), not a fixed hex — the old `#bfa37a` tan is dropped from the canon.
- Do not mix more than two type styles per composition.
- Do not use shadows unless functionally necessary.
- Do not use gradients.
- Prefer subtraction over addition.
- Every visual decision must serve a purpose.

## Monorepo Apps

| App             | Port | Purpose                                   |
|-----------------|------|-------------------------------------------|
| `apps/docs-site`| 3001 | Brand & Design System documentation site |
| `apps/storybook`| 6006 | Component explorer                        |
| `apps/web`      | 3002 | Public website — bicofino.com             |

### apps/web specifics
- Token inversion: `--bf-bg-page` = `#ffffff` (white header), `--bf-surface` = `#f2f8ff` (hero/footer)
- `--bf-accent` = `#bfa37a` — an **apps/web-local** accent defined in web globals.css. NOT part of the v3.1 DS canon (DESIGN.md dropped the `#bfa37a` tan in favour of randomised `--current-accent`). Kept only for the public site's existing look; do not propagate it to docs-site or the design system.
- Animation library: `motion` v12 (Framer Motion)
- i18n: BR/EN/IT via `content/index.ts` — same pattern as docs-site
- Run: `npm run web` (root) or `cd apps/web && npm run dev`
- Never commit assets in `public/brand/` or `public/media/` — these are manual uploads
