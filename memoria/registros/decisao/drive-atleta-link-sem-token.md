---
tipo: decisao
titulo: Link do atleta é o /a/<slug> nu — sem token, sem login; isolamento é só "não dar saída"
data: 2026-06-09
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [auth, produto, atalho-consciente]
---
Era preciso distribuir um link de upload para cada atleta. As opções iam de capability-URL com token assinado até login completo.

**Decisão do Woney:** o link é o próprio `/a/<slug>` — nome do atleta, adivinhável, fácil de ditar e de manter. SEM token por ora; login fica para o futuro se precisar. O isolamento é apenas não dar saída: a página do atleta não expõe o hub (lista de todos) nem o `/painel`; a marca no TopBar fica inerte. Woney acessa hub e painel direto pela URL.

**Por quê:** o risco aceito é um atleta adivinhar `/a/<outro-nome>` e ver/enviar no espaço do colega — nas palavras do Woney, "não é o fim do mundo". O custo de token/auth não se pagava no estágio atual, e fricção zero no link é parte do motivo de o Fabio e os atletas usarem de verdade.

Complemento de 2026-06-12: o lado de **escrita perigosa** (painel: `/api/delete`, `/api/share`, `/api/curate`) ganhou HTTP Basic Auth opt-in via `src/proxy.ts` — só ativa quando `DRIVE_ATLETA_PANEL_USER/PASS` existem nas envs. O fluxo do atleta fica fora do matcher de propósito: upload não pode pedir senha.
