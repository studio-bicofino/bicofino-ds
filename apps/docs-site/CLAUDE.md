# apps/docs-site — Local Rules

This app is the Bicofino premium editorial documentation site.
All visual decisions defer to the root DESIGN.md and root CLAUDE.md.

## This app's role
- Premium editorial documentation (LPUB-inspired layout)
- Custom sidebar with anchor navigation
- Single long-page with all design system sections

## Tech stack
- Next.js 16 (App Router)
- No Tailwind — uses inline styles with Bicofino tokens
- No external component library — all components are bespoke
- Fonts: Inter + JetBrains Mono (Google Fonts)

## How to run
```bash
npm install    # first time only
npm run dev    # http://localhost:3001
```

## File structure
```
src/
  app/
    globals.css       ← Bicofino CSS tokens + base styles
    layout.tsx        ← Root layout with Sidebar
    page.tsx          ← Full documentation page (all sections)
  components/
    Sidebar.tsx       ← Left sidebar with anchor navigation
    BicofinoLogo.tsx  ← SVG logo component
```
