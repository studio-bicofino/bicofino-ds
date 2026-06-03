# Drive do Atleta Bicofino

MVP de upload catalogado de fotos e vídeos por atleta, para o acervo Bicofino.
O atleta recebe um link, abre no celular, sobe o material com os metadados certos —
e a Bicofino recebe tudo organizado, com nome de arquivo padrão e caminho de Drive previsível.

App standalone do monorepo · porta **3042** · Next.js 16 · React 19 · CSS + tokens do DS (sem Tailwind, sem libs de motion).

---

## O que foi construído

Duas superfícies, no split de tema do DS:

**1. Fluxo do atleta** — `/a/[slug]` (fundo power-black, exclusivo)
- **Hero** com o nome do atleta em Gotham (M-02), assinatura ✦ e CTA.
- **Upload em lote** — drag-and-drop no desktop, toque no mobile; aceita várias fotos/vídeos de uma vez.
- **Catalogação** — Data (pré-preenchida pelo `lastModified` do arquivo), Jogo, Campeonato/contexto, Categoria, Tags livres (com sugestões) e Observações.
- **Estado de envio** — barra de progresso + etapas (Preparando → Catalogando → Enviando → Recebido).
- **Tela de sucesso** — resumo catalogado + o nome de arquivo gerado e o caminho no Drive de cada item.

**2. Painel Bicofino** — `/painel` (fundo off-white, M-05 Bento de Dados)
- Estatísticas (itens / fotos / vídeos / aprovados).
- Busca + filtros por categoria, status e tipo.
- Cards com preview, metadados, caminho no Drive e **controle de curadoria** (muda o status: Recebido → Em curadoria → Aprovado → Arquivado).

### O que mudou em relação ao briefing inicial (e por quê)

| Acréscimo | Por quê |
|---|---|
| **Nome de arquivo auto-gerado e ordenável** — `SALVATORE_20260526_PALxSAO_gol_001.jpg` | O maior ganho de organização. O material já chega catalogado e pesquisável no acervo, na mesma convenção do que já existe no Drive. |
| **Pasta de destino automática (FOTOS / VIDEOS)** derivada do MIME | Remove o campo "Tipo" confuso que misturava *Foto/Vídeo* com *Gol/Treino*. |
| **Dois eixos limpos**: Categoria (conteúdo) + Tags livres | O tipo de mídia é automático; o atleta só descreve o conteúdo. |
| **Upload em lote** | Atleta sobe 20 fotos de uma vez, não 1 a 1. |
| **Persistência de sessão (localStorage)** | O que o atleta envia aparece de verdade no Painel — a demo é end-to-end. |
| **Microlinha de consentimento (LGPD)** | Higiene de produto: o atleta autoriza a curadoria/arquivamento. |
| **Atletas como config + rota `/a/[slug]`** | A forma já está pronta para a Fase 4 (links individuais). |

---

## Como rodar localmente

```bash
cd apps/drive-atleta
npm install
npm run dev            # http://localhost:3042
```

Ou pela raiz do monorepo: `npm run drive`.

- `/` redireciona para o atleta-mockup (`/a/salvatore-brancatelli`).
- `/painel` abre o painel interno.
- Build de produção: `npm run build && npm run start`.

---

## Dados mockados (Fase 1)

Nada de backend nesta versão — tudo é simulado e mora no navegador.

- **Atleta**: Salvatore Brancatelli, em `src/lib/athletes.ts`.
- **Acervo semente**: 6 itens em `src/lib/seed.ts` (jogo, gol, assistência, treino, bastidor, entrevista), construídos pelos mesmos helpers do fluxo real — os nomes de arquivo e caminhos de Drive são idênticos aos de um envio de verdade.
- **Persistência**: `localStorage` (`bicofino:drive-atleta:items:v1`), via `src/lib/storage.ts`. O botão **"resetar demo"** no Painel restaura a semente.
- O upload **não** envia arquivos a lugar nenhum: lê os metadados do `File`, gera o nome e o caminho, e grava o registro localmente.

### Estrutura simulada de destino

```
BICOFINO / ATLETAS / SALVATORE BRANCATELLI / FOTOS
                                           / VIDEOS
```

`FOTOS` vs `VIDEOS` é decidido pelo tipo do arquivo (`kindFromMime`), nunca por um campo manual.

---

## Arquitetura — pronta para evoluir

A camada `src/lib/` isola toda a lógica de domínio dos componentes:

| Arquivo | Responsabilidade |
|---|---|
| `types.ts` | `MediaItem` — **espelha a futura linha do Supabase**. |
| `athletes.ts` | Config de atletas + `getAthlete(slug)`. |
| `categories.ts` | Rótulos de categoria/status/tipo (fonte única). |
| `filename.ts` | Geração do nome padronizado + `kindFromMime`. |
| `destination.ts` | Monta o caminho no Drive. |
| `storage.ts` | **Única** camada que conhece "onde os dados moram". |
| `seed.ts` / `format.ts` | Mock + formatação. |

Trocar de fase = trocar o corpo de `storage.ts` (e `destination.ts` na Fase 3). **Nenhum componente muda.**

### Fase 2 — Supabase (metadados reais)
- Tabela `media_items` com a mesma forma do `MediaItem` (RLS por atleta — ver [[project_platform_roadmap]] / Athlete Portal).
- `storage.ts` passa a fazer `select/insert/update` no Supabase em vez de `localStorage`.
- Variáveis seguras via **Infisical** (`woney@bicofino.com`), nunca commitadas.

### Fase 3 — Google Drive API (upload real)
- Drive da empresa (`woney@bicofino.com`): `BICOFINO / ATLETAS / <ATLETA> / {FOTOS,VIDEOS}`.
- `destination.ts` cria/resolve a árvore de pastas (`files.create` com `mimeType=folder`) e o upload usa **resumable upload** (vídeos são grandes).
- Service account + escopo `drive.file`; segredos no Infisical.
- O nome de arquivo gerado vira o nome real no Drive — catalogação no destino, sem retrabalho.

### Fase 4 — Links individuais + proteção
- Cada atleta já tem `/a/[slug]`; basta gerar e distribuir o link por atleta.
- Proteção: token assinado por link (magic link / JWT curto) ou OTP por SMS/WhatsApp — sem senha, mantendo o fluxo de celular leve.
- Painel interno atrás de auth da Bicofino (Supabase Auth), separado do link público do atleta.

---

## Design

Segue o `DESIGN.md` (fonte da verdade). SYSTEM mode, cantos SHARP, 90/10 com um vibrante
(`--current-accent`, sorteado por refresh). Split de superfície: **power-black** no fluxo do
atleta (M-02), **off-white** no Painel (M-05 Bento). Inter + JetBrains Mono + Gotham (impacto).
Motion em CSS puro, sob o teto de 360ms, com `prefers-reduced-motion` respeitado.

> Tokens do DS reconciliados com `packages/design-system/tokens.css`. As fontes Gotham
> (`public/fonts/`) são self-hosted — não commitar fontes adicionais sem revisar licença.
