-- 0009_address_neighborhood.sql
-- Casa Nostra v2 — Onda 15, ajustes ao vivo com Fabio (2026-06-10)
--
-- Bairro vira campo próprio no endereço. Antes o autocomplete de CEP jogava o
-- bairro do ViaCEP em address_complement; agora Complemento é 100% manual
-- (ex. número do apartamento) e o ViaCEP preenche address_neighborhood.
--
-- ADITIVO, NÃO DESTRUTIVO. Rodar manualmente no SQL Editor do Supabase.

alter table public.people add column if not exists address_neighborhood text;
