# Bicofino Design System

---

## Metadata

```yaml
name: Bicofino
style: quiet luxury, editorial, minimal, sophisticated

colors:
  primary: "#2a2c2b"
  power_black: "#061015"
  secondary: "#2C3E50"
  accent: "#BFA37A"
  surface: "#F2F8FF"
  neutral: "#E5E7EB"

typography:
  display:
    fontFamily: "Inter"
    fontSize: 3rem
  body:
    fontFamily: "Inter"
    fontSize: 1rem
  label:
    fontFamily: "JetBrains Mono"
    fontSize: 0.75rem

spacing:
  sm: 8px
  md: 16px
  lg: 32px

radius:
  sm: 4px
  md: 8px
  lg: 16px

icons:
  system: "lucide-react"
  style: "stroke-based"
  strokeWidth: 1.5
  size: 20
```

---

## Overview

Bicofino Design System expresses a refined and curated aesthetic.
It balances architectural minimalism with editorial sophistication.

The interface should feel intentional, restrained, and premium.
Every element must serve a purpose — nothing is decorative without meaning.

---

## Color Philosophy

| Token         | Value     | Role                                            |
|---------------|-----------|-------------------------------------------------|
| `primary`     | `#2a2c2b` | Authority, clarity, and elegance — the ink      |
| `power_black` | `#061015` | Maximum depth — backgrounds, dark surfaces      |
| `secondary`   | `#2C3E50` | Structural depth, supporting hierarchy          |
| `accent`      | `#BFA37A` | Interaction moments and emphasis — use sparingly |
| `surface`     | `#F2F8FF` | Neutral ground — allows content to breathe     |
| `neutral`     | `#E5E7EB` | Borders, dividers, and subtle separations       |

**Rules:**
- Never introduce colors outside this token system.
- Accent is a signal, not a decoration — reserve it for interactive or focal elements.
- Surface must remain visually passive; content is the foreground.

---

## Typography Philosophy

Two fonts. No exceptions.

Inter for editorial and UI text. JetBrains Mono for metadata, eyebrows, and code.
Closed scale — no size outside the system.

| Role      | Family           | Size     | Usage                                      |
|-----------|------------------|----------|--------------------------------------------|
| Display   | Inter            | 3rem     | Headlines, section titles, hero text       |
| Body      | Inter            | 1rem     | Reading content, UI copy, descriptions     |
| Label     | JetBrains Mono   | 0.75rem  | Metadata, eyebrows, captions, code         |

**Principles:**
- Inter covers ~95% of the system — headlines, body, and UI.
- JetBrains Mono is reserved for structural metadata and code: eyebrows, tags, timestamps, index markers.
- Do not use JetBrains Mono for body copy or primary headlines.
- Spacing and rhythm take priority over font variation.
- Do not mix more than two type styles in a single composition.

---

## Editorial Text Composition

Long-form content must use restrained editorial measure:
- Paragraph max-width: 680–760px
- Line-height: ~1.75
- Balanced headings with `text-wrap: balance`
- Pretty paragraph wrapping with `text-wrap: pretty`
- Portuguese content should use `lang="pt-BR"`
- Never allow long-form text to span the full viewport width

---

## Spacing & Layout

| Token | Value |
|-------|-------|
| `sm`  | 8px   |
| `md`  | 16px  |
| `lg`  | 32px  |

Whitespace is a core design element — not an absence of content, but an active compositional choice.

**Principles:**
- Layouts should feel open, breathable, and structured.
- Avoid dense compositions.
- When in doubt, increase the margin.

---

## Radius

| Token | Value |
|-------|-------|
| `sm`  | 4px   |
| `md`  | 8px   |
| `lg`  | 16px  |

Use radius intentionally. Prefer `sm` for form inputs and cards, `md` for containers, `lg` for modals or full-bleed surfaces.

---

## Components

Components must not introduce new visual rules.

They inherit:
- Color roles from the token system
- Spacing values from the spacing scale
- Typography from the defined hierarchy

### Buttons

| Variant     | Use case                     |
|-------------|------------------------------|
| `primary`   | Main actions only            |
| `secondary` | Neutral or supporting actions |
| `ghost`     | Low-emphasis, contextual     |

No gradients. No shadows unless functionally necessary.

### Navigation

- Clean and minimal.
- Predictable placement.
- Active states use `accent` or weight contrast — not color overload.

### Forms

- Clear visual hierarchy between label, input, and helper text.
- Minimal friction — avoid unnecessary fields.
- Error states use color sparingly; prefer inline messaging.

---

## Icons

- System: `lucide-react`
- Style: stroke-based
- Stroke width: `1.5`
- Default size: `20px`

**Rules:**
- Icons must never overpower accompanying text.
- Maintain consistent stroke weight across all icons.
- Custom icons may only be introduced to express brand identity — not as decoration.
- Icons stand alone only when their meaning is universally clear.

---

## Interaction Principles

Interactions should feel subtle and precise.

- Avoid exaggerated animations or transitions over `300ms`.
- Prefer `ease-out` curves — they feel intentional, not playful.
- Focus states must always be visible and accessible.
- Hover states should be understated; reinforcing, not distracting.

---

## Rules

1. Do not introduce new colors outside the token system.
2. Do not mix typography styles excessively.
3. Do not overload layouts with elements.
4. Prefer subtraction over addition.
5. Every visual decision must serve a purpose.

---

## Anti-patterns

Avoid:
- Decorative gradients or textures without editorial intent
- Bright or saturated accent overuse
- Dense component stacking
- Rounded corners exceeding `lg` (16px)
- Icon sizes above 24px in body contexts
- Typography hierarchies with more than three distinct sizes per screen
