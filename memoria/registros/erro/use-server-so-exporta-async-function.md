---
tipo: erro
titulo: Arquivo 'use server' com export de valor passa no build e crasha em prod
data: 2026-05-28
projetos: [casa-nostra]
fontes: [.planning/casa-nostra-v2/HANDOFF.md]
status: vigente
tags: [nextjs, server-actions, runtime]
---

O que aconteceu: na Fase 1 da Casa Nostra v2, o schema zod do cadastro (`export const cadastroV2Schema = z.object(...)`) vivia no mesmo arquivo `'use server'` das actions. **Passa no tsc e passa no build** — mas crasha em runtime: `"A 'use server' file can only export async functions, found object"`. Quem bateu no erro foi o Fabio, no PRIMEIRO submit em produção (Onda 7, fix crítico em `e169f1b`). O pior tipo de bug: invisível pra toda a pipeline local, fatal na primeira interação do usuário real.

Regra extraída — a partir de agora:
- Arquivo `'use server'` SÓ exporta `async function`. Nada de `export const` de schema, objeto, array ou qualquer valor.
- Schemas zod e constantes vivem num arquivo irmão sem a diretiva (na Casa Nostra: `cadastro-schema.ts` ao lado de `cadastro.ts`).
- Exports de **types** são OK — são apagados em runtime.
- Como build não pega, o smoke test de um form novo em prod inclui obrigatoriamente UM submit real antes de entregar pro usuário.

A v1 já tinha registrado a regra ("Server actions Next 'use server' só exportam funções", decisão 13 do HANDOFF v0.8.1) — o erro se repetiu porque a regra estava enterrada numa lista de 27 decisões. Regra que custa prod merece registro próprio.
