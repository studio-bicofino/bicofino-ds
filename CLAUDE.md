# Bicofino — Project Instructions

## Source of Truth

`DESIGN.md` is the single source of truth for all visual and interaction decisions.

Before writing any component, page, or style:
1. Read `DESIGN.md`.
2. Apply the tokens, philosophy, and rules described there.
3. Do not introduce patterns that are not derivable from that document.

## What This Means in Practice

**Colors** — use only the tokens defined in `DESIGN.md`. No hex values outside that set.

**Typography** — use only Inter (display/body) and JetBrains Mono (label/metadata/code) at the defined sizes.

**Spacing** — use only `sm` (8px), `md` (16px), `lg` (32px). Do not introduce intermediate values.

**Radius** — use only `sm` (4px), `md` (8px), `lg` (16px).

**Icons** — use `lucide-react`, stroke width `1.5`, size `20`. No filled icons.

**Components** — inherit color roles, spacing, and typography from the system. No standalone visual rules.

**Interactions** — subtle, under 300ms, `ease-out`. No decorative animations.

## Hard Rules

- Do not add new colors.
- Do not mix more than two type styles per composition.
- Do not use shadows unless functionally necessary.
- Do not use gradients.
- Prefer subtraction over addition.
- Every visual decision must serve a purpose.
