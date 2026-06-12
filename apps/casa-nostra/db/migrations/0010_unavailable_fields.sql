-- 0010_unavailable_fields.sql
-- Casa Nostra v2 — Onda 16 (2026-06-11)
--
-- Algumas pessoas simplesmente não têm site, Instagram, cargo ou endereço.
-- unavailable_fields registra o que foi marcado como "não disponível" no form
-- (valores: 'website' | 'instagram' | 'cargo' | 'address') pra que o marcador
-- vermelho de pendência não acuse campo que não existe.
--
-- ADITIVO, NÃO DESTRUTIVO. Rodar manualmente no SQL Editor do Supabase.

alter table public.people add column if not exists unavailable_fields text[];
