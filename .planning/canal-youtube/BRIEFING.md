# Canal YouTube Bicofino — BRIEFING

> Status: **parcialmente validado** — 2026-06-11.
> Woney validou: highlights públicos + jogos completos não listados. Pediu handle
> `@bicofino`, mas está TOMADO (ver §3). Canal ainda não criado — exige login
> interativo na conta Google (passo a passo no §4).
> Nascido de conversa sobre criar o canal: vídeos de atletas (material de análise
> para scouts) + conteúdo Off Pitch (Bicofino FC × Loro Piana, Bicofino Fox × Vespa).

## 1. Propósito do canal

Dois públicos, um canal:

| Público | Conteúdo | Função |
|---|---|---|
| Scouts / clubes | Highlights e jogos por atleta | Repositório técnico — chegam por link direto, não por algoritmo |
| Audiência de marca | Séries Off Pitch, manifesto | Construção de marca — esse é o conteúdo "descobrível" |

O canal funciona mais como **portfólio com endereço público** do que como jogo de
algoritmo. Scout recebe um link de playlist e vê tudo do menino em um lugar.

## 2. Estrutura — seções e playlists

### Eixo On Pitch (scouts)
- **1 playlist por atleta** — `Nome Sobrenome (ano) · Posição | Bicofino`
  - Highlights da temporada (públicos)
  - Jogos completos / footage bruto (**não listados** — não poluem o canal,
    mas aparecem dentro da playlist pra quem tem o link)
  - Scout recebe UM link (a playlist do atleta) e vê tudo
- Padrão de título de vídeo (busca de scout): `Nome | Posição | 2008 | Highlights 2026 | Bicofino`
- Descrição padronizada bilíngue PT/EN com ficha: posição, pé dominante, altura,
  nascimento, clube atual, contato da agência

### Eixo Off Pitch (marca)
- Playlist geral **Off Pitch** + 1 playlist por série quando tiver 3+ episódios:
  - `Bicofino FC × Loro Piana`
  - `Bicofino Fox × Vespa`
- Naming consistente de episódio: `Série — Episódio | Bicofino`

### Eixo Marca
- Trailer do canal = manifesto (já existe o manifesto "fluência" do site como base)
- Institucionais

### Shorts
- Os MP4 1080×1920 do card-jogos-motion **já são Shorts prontos** — publicar a
  rodada de cards também no YouTube (custo ~zero, ativa o canal toda semana)

## 3. Decisões

1. ✅ **Visibilidade** (validado por Woney 11/06): highlights públicos + jogos
   completos não listados, agrupados na playlist do atleta.
2. **Handle**: `@bicofino` está **TOMADO** por canal de terceiro
   ("Elias cesar da silva Cesar" — youtube.com/@bicofino, checado 11/06).
   Livres na mesma data: `@studiobicofino` · `@bicofinofc` · `@bicofinobr` ·
   `@bicofinoagency` · `@bicofinooficial` · `@bicofino_`.
   Recomendação: `@studiobicofino` (casa com o GitHub studio-bicofino) ou
   `@bicofinofc`. **Woney escolhe na hora de criar.**
3. **Idioma das descrições** (aberto): PT/EN fixo na descrição, ou traduções de
   metadados do YouTube (BR/EN/IT, mesmo trio do site)?
4. Shorts dos cards de jogos (aberto): publicar mesmo, ou guardar YouTube só
   pra conteúdo longo?

## 4. Setup do canal (passo a passo)

1. Logado como **woney@bicofino.com** → `youtube.com/channel_switcher` →
   **Criar um canal** com nome "Bicofino" — isso cria conta de marca, que permite
   adicionar gerentes depois (Fabio etc.) sem compartilhar senha.
2. Reivindicar handle `@bicofino`.
3. **Verificar o canal** em `youtube.com/verify` (telefone) — desbloqueia thumbnail
   customizada e vídeos >15min. Sem isso não tem identidade visual nas thumbs.
4. `studio.youtube.com` → Personalização:
   - **Branding**: avatar 800×800 (logo), banner 2560×1440 (área segura central
     1546×423 — é o que aparece no mobile), marca d'água de inscrição 150×150.
   - **Informações**: descrição do canal, links (site, Instagram), e-mail de
     contato pra scouts.
   - **Layout**: trailer pra não inscritos (manifesto), seções da home
     (Atletas em destaque / Off Pitch / Shorts).
5. Configurações → **Predefinições de upload**: template de descrição, categoria
   Sports, idioma, visibilidade padrão. É a "automação de graça" do Studio.
6. Configurações → Canal → palavras-chave do canal, país.
7. Primeira leva: manifesto + 2–3 atletas + 1 off pitch → montar playlists e home.

## 5. Automação — fases (não construir app agora)

- **Fase 0 (agora)**: zero código. Studio + predefinições de upload + um doc de
  templates (título/descrição por tipo de vídeo). Volume atual não justifica app.
- **Fase 1 (barato, alto impacto)**: **gerador de thumbnail** 1280×720 no padrão
  Puppeteer do athlete-cards / cards-estaticos, com tokens do DS. Consistência
  visual das thumbs é o que mais constrói cara de canal.
- **Fase 2 (quando a cadência doer)**: estender o **Drive do Atleta** (vídeo já
  entra catalogado por atleta lá) com fluxo "Publicar no YouTube" — app monta
  título/descrição/tags dos metadados e sobe via YouTube Data API v3.
  - **Realidade da API**: upload = 1600 unidades da cota diária de 10.000
    (~6 uploads/dia — suficiente); e projeto de API **não auditado pelo Google
    tem todo upload travado como privado** até passar auditoria de compliance.
  - **Caminho intermediário recomendado**: o app prepara o pacote (arquivo final +
    título + descrição + tags + thumbnail) e o upload é manual no Studio
    (~2 min/vídeo, zero burocracia de auditoria).

## 6. Referências

- Trava de upload privado p/ projetos não auditados: developers.google.com/youtube/v3/revision_history
- Cotas: developers.google.com/youtube/v3/determine_quota_cost
