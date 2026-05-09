---
name: bicofino-component-template
description: Boilerplate and conventions for new components in apps/web. Invoke whenever creating a new .tsx file under apps/web/components/.
---

# Bicofino Component Template

## File location

- Layout shells: `apps/web/components/layout/`
- Homepage blocks: `apps/web/components/home/`
- Reusable primitives: `apps/web/components/primitives/`
- Section blocks: `apps/web/components/{foundation,off-field,on-field}/`

One component per file. Filename = component name = PascalCase.

## Boilerplate

```tsx
'use client' // omit if pure server component (no hooks/events)

import { motion } from 'motion/react'
import { useLang } from '@/content'
import styles from './ComponentName.module.css'

interface ComponentNameProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function ComponentName({ 
  variant = 'default',
  className 
}: ComponentNameProps) {
  const { t } = useLang()

  return (
    <section 
      className={`${styles.root} ${className ?? ''}`}
      data-variant={variant}
    >
      {/* content */}
    </section>
  )
}
```

## CSS Module

`ComponentName.module.css` next to the .tsx:

```css
.root {
  padding: var(--bf-space-lg);
  background: var(--bf-surface);
  color: var(--bf-text-primary);
}

.root[data-variant="compact"] {
  padding: var(--bf-space-md);
}

@media (max-width: 768px) {
  .root { padding: var(--bf-space-md); }
}

@media (prefers-reduced-motion: reduce) {
  .root * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Imports order

1. `'use client'` directive (first line if needed)
2. External packages (react, motion, lucide-react)
3. Internal packages (`@bicofino/design-system`)
4. App imports (`@/content`, `@/components/...`)
5. Styles (last)

## Never in a component file

- Inline hex values
- Hardcoded user-visible strings
- Arbitrary spacing
- More than 2 type styles in one composition
- console.log in committed code

## After creating

1. Add to parent (e.g., page.tsx) and verify render
2. `npm run build` from apps/web
3. If interactive: ensure focus state works
4. If animated: ensure prefers-reduced-motion fallback
