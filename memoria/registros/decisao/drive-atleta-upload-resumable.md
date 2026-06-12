---
tipo: decisao
titulo: Upload resumable direto browser→Google — o arquivo nunca passa pela Vercel
data: 2026-06-02
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [google-drive, upload, vercel, video]
---
Vídeo de jogo tem 100MB+; função serverless da Vercel tem teto de corpo (~4.5MB) e de tempo. Rotear bytes de vídeo pela Vercel era inviável.

**Decidido:** o servidor (route handler `POST /api/upload/session`) só inicia uma sessão de upload resumable do Drive (`uploadType=resumable`, no Shared Drive) e devolve a `uploadUrl` descartável; o **navegador faz PUT dos bytes direto no Google**. Ao concluir, `POST /api/upload/complete` grava o metadado no Supabase. A credencial do Google nunca vai pro navegador (só a uploadUrl efêmera), e o arquivo nunca toca a Vercel.

**Alternativa descartada:** navegador → Vercel Blob / Supabase Storage (signed URL) → job move pro Drive. Mais peças móveis e custo de storage intermediário.

**Provado em produção:** o CORS do PUT resumable funciona — a rota de sessão repassa o `Origin` do request ao iniciar, e o Google devolve `Access-Control-Allow-Origin: <origin>`. Verificado em localhost e em drive-atleta.vercel.app. Hoje é single-PUT (sem retry por chunk) — suficiente para foto e vídeo médio; chunked com retry fica para quando conexão de celular caindo no meio de vídeo grande virar dor real.
