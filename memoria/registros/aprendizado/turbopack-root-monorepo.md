---
tipo: aprendizado
titulo: turbopack.root deve apontar para a raiz do monorepo — senão o servidor sobe mas trava todo request
data: 2026-06-01
projetos: [web, docs-site]
fontes: [memoria-auto-claude]
status: vigente
tags: [turbopack, nextjs, monorepo, build]
---

Nos apps Next.js do monorepo (confirmado em `apps/web` e, em 2026-06-01, também em `apps/docs-site`), o `next.config.ts` precisa de:

```ts
turbopack: {
  root: path.resolve(__dirname, '../..'), // raiz do monorepo
},
```

Sem isso, o sintoma é traiçoeiro: o servidor diz "Ready in Xms", o TCP conecta (`nc -z` OK), mas nenhuma requisição HTTP responde — `curl` retorna `000` em timeout. O `next build` falha com "We couldn't find the Next.js package (next/package.json) from the project directory". A causa: o pacote `next` está instalado no `node_modules/` da RAIZ do monorepo, não no do app; com `root` apontando para o app, o Turbopack não resolve `next/package.json`.

Como aplicar: sempre que tocar num `next.config.ts` de app do monorepo, verificar que `turbopack.root` é `path.resolve(__dirname, '../..')` (com `import path from 'path'`). Nunca `path.resolve(__dirname)` sozinho. Se um app novo subir mas travar em todo request, este é o primeiro suspeito.
