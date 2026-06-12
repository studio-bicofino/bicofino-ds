# Bicofino — DESIGN.md

> **The taste, in writing.**
> Visual source of truth: philosophy, the invariants, the modes, and the token canon.
> *v3.1 · São Paulo, BR*

`README.md` carries **who** Bicofino is — the 4 Cs, On/Off Pitch/Club, how the brand writes.
This file carries **how it looks and why** — the taste that must survive across every material,
and the tokens that encode it. Read both. When the two disagree, this file wins on visuals.

> **v3.1 changelog** — adds expression modes (SYSTEM / EDITORIAL), two corner languages
> (sharp / soft), the one-vibrant rule with `--current-accent` randomised per refresh, lines on
> dark, ambient "living-organism" motion, and the five-module pattern library. Reconciled with the
> live values in `packages/design-system/tokens.css` and `apps/docs-site/src/app/globals.css`.

---

## 0 · The one idea

**Bicofino is artistic and versatile — but never incoherent.**

The brand makes wildly different materials: an instagram carousel, a technical dossier, a
luxury poster, a data dashboard, an aggressive diagonal hype-drop. They will *not* share a
layout, and they may not even share a corner radius. What makes all of them unmistakably
Bicofino lives somewhere else:

> **The feeling is Bicofino through cleanliness, color harmony, alignment & spacing, and
> hierarchy — not through any single shape choice.**

So the system is built in two halves: a small set of **invariants** that must always hold, and a
generous set of **degrees of freedom** that are encouraged to vary. Versatility is the point;
incoherence is the only failure.

---

## 1 · The invariants — what is *always* true

No matter how experimental the piece, these hold. If a composition keeps **at least five** of
the seven, it reads Bicofino even with unexpected corners, diagonals, or a big color block.

1. **Respiro is active.** White (or dark) space is a designed element, not leftover. Expressive
   pieces stay ~55–65% breathing. *When in doubt, increase the margin.*
2. **Contained palette + one vibrant.** Core/Special tones carry ~90% of any surface; a single
   highlight plays "vibrant" and marks the few things that matter (the **90/10** rule).
3. **Everything aligns.** Type, edges, and gaps sit on the `4 / 8 / 16 / 32` grid. Alignment is
   the cheapest luxury signal there is.
4. **One primary read + one secondary.** Never three elements fighting for the same weight.
5. **The type system holds.** Inter (≈95%) + JetBrains Mono (metadata). **Gotham** only for 1–2
   impact words. Never more than two type styles per composition.
6. **The connective glyphs.** The Diamond **✦** and the `//` marker appear as quiet signature —
   in metadata, eyebrows, seals.
7. **Structure, not noise.** Hairlines over shadows. No non-intentional gradients. Transparency
   and blur only with purpose, in parcimônia.

These seven are the contract. Everything below is allowed to move.

---

## 2 · The degrees of freedom — what is *meant* to vary

| Axis | Range | Driven by |
|---|---|---|
| **Corner language** | SHARP (cartesian) ↔ SOFT (circular) | material / theme — see §4 |
| **Geometry** | orthogonal grid ↔ aggressive diagonals | intent — order vs. rupture |
| **Expression mode** | SYSTEM (restrained) ↔ EDITORIAL (expressive) | the piece's job — see §3 |
| **The vibrant** | any one Highlight (coral, lime, green, violet…) | theme / club / nation |
| **Ground** | white · blue surface · power-black · Special warm | context |
| **Density** | airy editorial ↔ dense technical schematic | content |

Diagonals are explicitly welcome when a piece is meant to **break attention / shock** — provided
the invariants still hold underneath the aggression.

---

## 3 · Expression modes (D1)

Every piece is built in one of two modes. Set it with `data-mode` so intent is explicit.

### SYSTEM mode — *default*
Product UI, dashboards, the site, proposals, most comms. The accent is a **signal only** — focus,
interaction, the one vibrant — held to **≤ ~10%** of the surface. Quiet luxury. Restraint reads
as confidence.

### EDITORIAL mode — `data-mode="editorial"`
Campaign artwork, posters, and **any instagram grid or composition declared editorial**.
Declaring a piece editorial **unlocks expressive freedom**:

- the signal/highlight may become a **large compositional color block**;
- **one** big chromatic interference may cut through / sit behind / overlay a neutral photo,
  building layered depth (M-03);
- oversized impact type and aggressive diagonals are allowed.

The freedom is real but bounded: **one** major interference per piece, over a neutral photo,
never a non-intentional gradient — and the seven invariants of §1 still bind. *Editorial is a
license, not an exemption.*

---

## 4 · Corner languages (D2)

Bicofino speaks **two** corner languages. A piece picks one; it does **not** mix them.

- **SHARP** — `2 / 4 / 8px`. Cartesian, ordered, structural. The default. For dossiers,
  data, technical themes, anything that should feel precise and organized.
- **SOFT** — `12 / 18 / 28px`. Circular, in-motion, warm. For carousels and movement themes —
  a player making the ball and the team spin, a piece that should feel fluid.
- **PILL** — `9999px`. Avatars and pills are **full-round in both languages**, always.

Components read the **switchable** scale `--bf-corner-1/2/3` (resolves to SHARP by default). Flip
a whole subtree by putting `data-corners="soft"` (or `.bf-corners-soft`) on a container — no
component CSS changes. The radius is a *free* variable; coherence comes from §1, not from corners.

```html
<section data-corners="soft"> … cards inside are now soft … </section>
```

---

## 5 · Color (D3)

The palette lives in `colors_and_type.css`. Four groups:

- **Core** — `--bf-black #2a2c2b` · `--bf-power-black #061015` · `--bf-bg #f2f8ff` · white ·
  `--bf-steel` · `--bf-aluminium` · `--bf-platinum`. Structural identity.
- **Special** (warm) — `--bf-crema · caffe · champagne · cacao`. Reserved for FC-Bicofino /
  Italian / Loro Piana / Raposa contexts.
- **Highlights** — club / nation / partner colors (SPFC coral, Palmeiras green, Torino maroon,
  Fiorentina violet, Australia lime `#e5ff78`, …). Each is a candidate "vibrant".
- **Semantic** — page/surface/text/border mappings + line-on-dark.

**The rule (90/10, one vibrant per composition):** exactly **one** Highlight plays the vibrant
role in a given composition. The canonical variable is **`--current-accent`** (with `--bf-signal`
as a back-compat alias). Its **default is randomised per page refresh** from the Highlights set —
the house always wears one of its colors, never the same one twice in a row. Any section or piece
may **pin** its own vibrant by overriding the variable locally:

```css
[data-theme="palmeiras"] { --current-accent: var(--bf-sep); }   /* green becomes the vibrant */
```

The randomiser sets `--current-accent` on `:root` after hydration (see `AccentRandomizer`); the
SSR fallback is coral SPFC. More than one vibrant per composition is an **exception**, used only
when explicitly requested.

**Dark grounds.** On power-black surfaces the randomiser draws only from Highlights that hold
**≥ 3:1 contrast** against the ground — `--bf-usa` (`#05185c`, 1.18:1) and `--bf-torino`
(`#821324`, 1.89:1) are excluded. The vibrant is a signal; a signal that can't be seen isn't one.
Pinning either as a local theme on light grounds remains fine. *(measured 2026-06-11; first
applied in `apps/la-rete`.)*
No new colors get invented to satisfy a brief — pick the Highlight that fits. **Non-intentional
gradients are forbidden** in both modes.

---

## 6 · Type

Closed scale; never more than two type styles per piece.

- **Inter** — `300 / 400 / 700` (500·600 map to nearest). Display, headlines, body, UI. Display
  is heavy and tight (lh 1.0, slight negative tracking); body is generous (lh 1.7, 680–760px
  measure, left-aligned).
- **JetBrains Mono** — `400 / 500 / 700` + italic. Metadata, eyebrows (`// FOUNDATION`), tags,
  index markers, the orbiting satellite labels (`.bf-orbit-label`, M-02).
- **Gotham** — `300 Light · 500 Medium · 700 Bold · 900 Black` (+ italics), **uppercase**, impact
  only: 1–2 punchy words — post titles, athlete names (`KERCHNER`). Never headlines >2 words,
  never body. The **heavy/light pairing** (Black title + Light contracanto, e.g. `KERCHNER` over
  `present future`) is the signature editorial title block.

**Measure (v3.1).** No text runs the full container width. Long body holds a **680–760px**
(~66–75ch) measure; short text — intros, captions, eyebrows, the contracanto under an impact
title — gets a tighter **~34–48ch** so it reads as a designed block, not a stretched line.
Constrain with a `ch`-based `max-width`, left-aligned. *(craft folded in from `web-design-guidelines`.)*

Presets in `colors_and_type.css`: `.bf-display · .bf-impact · .bf-h1 · .bf-h2 · .bf-h3 ·
.bf-body · .bf-body-sm · .bf-eyebrow · .bf-mono`.

---

## 7 · Space, line & depth

- **Spacing ramp** — `4 / 8 / 16 / 32 / 48 / 64 / 96`. Canonical trio `8 · 16 · 32`.
- **Hairlines over shadows** — `--bf-hairline` (light grounds), `--bf-hairline-dark` /
  `--bf-line-on-dark` (power-black). Shadows only when functionally necessary (a true popover).
- **Layered depth** comes from **one** intervention — a block, a dashed trace, a translucent
  band crossing a neutral subject — not from drop shadows or glows.
- **Transparency & blur** — parcimônia only: the mobile scrim, an occasional editorial band.

---

## 8 · Motion

**Interaction motion** — subtle, unhurried. Durations `120 / 200 / 360ms`
(`--dur-fast / base / slow`), standard ease `cubic-bezier(0.2, 0, 0, 1)`; `--ease-out`
(`cubic-bezier(0.16, 1, 0.3, 1)`) for draw-in / orbit reveals. Entrances = short fade + 8–12px
upward translate, ~55–70ms stagger (the site's `.bf-reveal` / `.bf-stagger-parent` system). No
bounces, no springs, nothing over `360ms`. Focus is always visible: a visible outline, 2px offset.

**Properties & focus (v3.1).** Animate **only `transform` and `opacity`** — never `width`,
`height`, `margin`, `top` (they force layout; use `transform: scaleX()` for a progress bar, not
`width`). List the properties explicitly; **never `transition: all`**. Nothing enters from
`scale(0)` — start at `≥0.94` + `opacity`, since nothing real appears from nothing. Focus is
shown via **`:focus-visible`** (keyboard), never `outline: none` without an equivalent
replacement. *(craft folded in from `emil-design-eng` + `web-design-guidelines`.)*

### Ambient motion — *the living organism*

Bicofino's design should feel like a **living, pulsing organism** — quietly. Ambient motion lives
**mostly in the technical graphics (M-01)** and works at background level: it does **not** steal
the scene. The mental model is an **anthill** — many tiny rows shifting, almost imperceptibly,
in constant low-amplitude movement.

- **Pulsing dots** — nodes breathing in opacity/scale on long offset loops.
- **Wires forming** — hairlines and orbits drawing themselves in and resting.
- **Micro-type forming** — small numbers and letters resolving / cycling in mono.
- **Shifting rows** — unit grids where individual cells fade on and off, like ants moving.

Rules: amplitude stays small (opacity 0.2→1, ≤2–3px translate, ≤3% scale); loops are **long and
desynchronised** (`--dur-ambient ≈ 6s`, each element offset) so the field never pulses in unison;
nothing is large. The sensation is *alive*, never *busy*. **Always** gate it behind
`@media (prefers-reduced-motion: reduce)` — ambient motion stops entirely, the schematic stays
legible as a still. Reserve it for M-01 surfaces and the occasional seal; UI and editorial type
stay calm.

### Sanctioned exception — the brand intro

A **second named exception** to the interaction rules, alongside the M-01 ambient loop. The public
site (`apps/web`) opens with a **brand reveal**: a full-screen `--bf-power-black` overlay that
clears to expose the site rendered underneath. The opening is the **star-spin** — the brand sparkle
punched out of the black as a window that spins, then scales open. (Five variants were prototyped
and ran randomised per visit; on 2026-06-10 the star was chosen as the single opening and the
others — glitch, split, fractured-fall, lake-ripples — were retired.)

Within this overlay — **and nowhere else** — motion may **enter from `scale(0)` / `r=0`** (the
star): the whole gesture *is* something appearing from a point, so the §8 "nothing from
nothing" rule is deliberately lifted. It still obeys the spirit of the system: animates **only
`transform` / `opacity`** (plus SVG `r` / `mask`), eases on **`--ease-out`** (or a paired ease-in
for a punch), uses **only canon tokens** (the overlay is `--bf-power-black`; the star is the brand
asset), and runs **short** (~1s). Hard safeguards, all mandatory:

- **`prefers-reduced-motion: reduce` → the intro is skipped entirely** (no overlay, content shown).
- **Plays on every full page load** (amended 2026-06-10; was once-per-session via `sessionStorage` —
  Chrome's session restore resurrects `sessionStorage`, which effectively hid the intro from
  returning visitors). Client-side navigation within the site does not replay it.
- **Content renders underneath** (the overlay is purely visual) → no SEO / LCP cost; a `<noscript>`
  rule hides the overlay and force-reveals entrance-gated content when JS is off.

Lives in `apps/web/components/intro/`. Treat any new variant as part of this one exception — do not
let "intro freedom" leak into product UI, which stays at the calm `120 / 200 / 360ms` register.

---

## 9 · Pattern library — the five modules

Distilled from the reference diagnostic. Each is a named, reusable composition pattern.

| # | Module | What it is | When | Lives in |
|---|---|---|---|---|
| **M-01** | **Grafismo Técnico** | mono + fio + ✦ instrumentation: spec-tags, orbit diagrams, unit grids. High density, small footprint (≤ one quadrant). Carries the **ambient "living-organism" motion** (§8). | dossiers, On Pitch data, seals | `--bf-line-on-dark`, `--dur-ambient`, mono |
| **M-02** | **Órbita Editorial** | heavy Gotham title block anchored low + mono satellite labels orbiting the corners + optional visible column guides. | campaign covers, athlete pieces | `.bf-orbit-label`, Gotham heavy/light |
| **M-03** | **Intervenção de Cor** | neutral (B&W / mono) photo + ONE chromatic interference (block / trace / band) for layered depth. | EDITORIAL only | `--current-accent`, `data-mode="editorial"` |
| **M-04** | **Post-System 60/40** | social grid where unity comes from repeated constants (palette, ✦, arc, mono name, cut-out) while layout varies; ~60% breathing, symmetric filled zone vs. empty zone. | instagram campaigns | constants checklist, Special palette |
| **M-05** | **Bento de Dados** | bento cells (varied sizes, even gap), hairline separation, pill groups, sparklines; 90% one tone + one vibrant. | dashboards, platforms | `--bf-corner-*`, `--current-accent`, pills |

We will build **several dashboards on the same chassis** (database control, athlete media
upload, client-data intake, …): same M-05 bento + hairlines + pills, each setting its own
`--current-accent` and corner language for its theme.

---

## 10 · Anti-patterns

- "**Not X. It's Y.**" copy *as a declarative device*. Empty superlatives. Corporate-speak. (See README §3.)
  **Narrow exception (BS v1.1, jun/2026):** in manifesto register only, when the text builds the
  reasoning first and the negation resolves it with substance — reference: "Bicofino não traduz.
  É fluente." Outside manifesto register the prohibition is total.
- **The word "premium"** — banned in any language, context or material (house veto, Fabio, jun/2026).
  Describe the standard instead of naming it. Quoting it as a counter-example is the only permitted mention.
- **Emoji** — ever. Only ✦ and `//`.
- **Mixing two corner languages** in one piece.
- **More than one vibrant** per composition (unless explicitly requested).
- **Accent as decoration in SYSTEM mode** — it's a signal there; blocks belong to EDITORIAL.
- **Non-intentional gradients**, decorative drop-shadows, fake speed/explosion FX.
- **Three competing reads.** Dense stacking with no respiro. Center-aligning non-ceremonial layouts.
- **Inventing colors** outside the token set to satisfy a brief.

---

## 11 · Token index — what changed in v3.1

The canon lives in **`packages/design-system/tokens.css`** (+ the `tokens.ts` mirror); the live app
re-declares the same set in **`apps/docs-site/src/app/globals.css`**. New in this revision:

- **`--current-accent`** — the one vibrant of the current composition; **randomised per refresh**
  from the Highlights set, section-overridable. `--bf-signal` is a back-compat alias. SSR fallback
  is coral SPFC. (D3)
- **Corner languages** — `--bf-sharp-1/2/3`, `--bf-soft-1/2/3`, and the switchable
  `--bf-corner-1/2/3` (+ `[data-corners="soft|sharp"]`). `--bf-radius-pill` is round in both. (D2)
- **Lines on dark** — `--bf-line-on-dark`, `--bf-line-on-dark-strong`, `--bf-dot-on-dark`,
  `--bf-hairline-dark`. (M-01)
- **Ambient motion** — `--dur-ambient` (≈6s) + `--ease-out`, scoped to `.bf-schematic`. (§8)
- **Verbal canon v1.1 (jun/2026)** — entry manifesto (fluência / a casa) registered as canonical text;
  "Não é X. É Y." refined from absolute ban to a manifesto-register-only exception with substance (§10);
  the word "premium" banned outright — house veto (§10). Canon: `BRANDCOMPLETO.md` v3.1 +
  `apps/docs-site/src/content/brandSystemContent.ts`.
- **`[data-mode="editorial"]`** — the expression-mode hook. (D1)
- **Measure rule** — §6: no text runs full container width; short text tightens to ~34–48ch.
  First principle folded in via the *Design Craft Layer* (`CLAUDE.md`), from `web-design-guidelines`.
- **Motion properties & focus** — §8: animate only `transform`/`opacity`, no `transition: all`,
  no `scale(0)` entries, focus via `:focus-visible`. From `emil-design-eng` + `web-design-guidelines`.
- **Brand intro (sanctioned exception)** — §8: the `apps/web` opening overlay, the **star-spin**
  reveal on every full page load (2026-06-10; originally once-per-session — amended because browser
  session restore hid it from returning visitors. Same date: the star chosen as the single opening
  from five prototyped variants; glitch · split · fractured-fall · lake-ripples retired). The *only*
  place motion may enter from `scale(0)`/`r=0`; still `transform`/`opacity`-only, `--ease-out`,
  canon tokens, ~1s, skipped under `prefers-reduced-motion`, content rendered underneath. Mirrors
  the M-01 ambient precedent. (`apps/web/components/intro/`)

- **Dark-ground accent pool (2026-06-11)** — §5: on power-black the `--current-accent` randomiser
  excludes Highlights below 3:1 contrast against the ground (usa 1.18:1, torino 1.89:1; the other
  ten pass). Surfaced by the design-reviewer audit of `apps/la-rete`, approved by Woney.

Interaction durations stay at the live `120 / 200 / 360ms`. `--radius` (2px) remains as the legacy
base; new work should prefer `--bf-corner-*`.
