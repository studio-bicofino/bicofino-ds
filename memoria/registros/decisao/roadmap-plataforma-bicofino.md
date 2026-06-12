---
tipo: decisao
titulo: Roadmap de plataforma — Consigliere Widget, Athlete Portal e workflow de 2 máquinas
data: 2026-06-12
projetos: [docs-site]
fontes: [memoria-auto-claude]
status: em-aberto
tags: [roadmap, consigliere, athlete-portal, infraestrutura]
---

Contexto: a plataforma Bicofino tem três sistemas estruturais decididos, em estágios diferentes de execução.

1. Consigliere Widget — conselheiro IA contextual treinado na marca, em duas camadas. Camada 1 (Cloud): chat com o brand no system prompt + conteúdo da página atual; auth via Supabase, API via OpenRouter → Claude, acesso por login. Camada 2 (Local only): Supabase em Docker no iMac, com dados de clientes e matchmaking de oportunidades — esses dados NUNCA sobem para cloud. Estado: UI inline pronta na página /consigliere do docs-site (não flutuante, por enquanto); falta integrar com AI SDK (`useChat`) na API route `/api/consigliere/chat`, que já existe. Na Camada 1, injetar BRAND.md + BRANDCOMPLETO.md + rota atual no system prompt.

2. Athlete Portal — área de uploads por atleta dentro do docs-site (`/atletas`, `/atletas/[slug]`, `/atletas/[slug]/upload`). Auth + Storage + RLS via Supabase; arquivos <50MB no Supabase Storage, pesados no Google Drive do Workspace. Cada atleta vê e sobe só a própria pasta; o Woney tem acesso admin a todas. Não iniciado como portal — o Drive do Atleta (app standalone em uso real pelo Fabio) já cobre parte da necessidade.

3. Workflow de duas máquinas — MacBook pessoal + iMac do escritório, sincronizados via GitHub studio-bicofino (push duplo) e Infisical para secrets. Parcialmente concluído.

Porquê: o Consigliere é o produto estratégico de IA da marca; o portal resolve a centralização de mídia dos atletas com controle de acesso individual; o workflow garante continuidade entre as duas máquinas. Status em-aberto: as três frentes ainda têm execução pendente e o escopo pode evoluir.
