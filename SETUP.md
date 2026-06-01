# Bicofino — Setup de Máquina

Guia para configurar uma máquina nova (iMac ou MacBook) e continuar trabalhando no ecossistema Bicofino sem atrito.

---

## O que foi preparado

| Arquivo | O que faz |
|---|---|
| `Brewfile` | Declara todas as ferramentas de sistema necessárias |
| `scripts/setup-mac.sh` | Onboarding completo: Homebrew → ferramentas → Node → npm → Infisical |

### Ferramentas instaladas pelo Brewfile

| Ferramenta | Para que serve |
|---|---|
| `fnm` | Gerencia versões do Node.js |
| `git` | Git atualizado (o macOS vem com versão antiga) |
| `gh` | GitHub CLI — autenticação, PRs, clone via terminal |
| `vercel-cli` | Deploy para Vercel via terminal |
| `infisical` | Secrets manager — sincroniza variáveis de ambiente entre máquinas |
| `ffmpeg` | Converter e comprimir vídeos `.webm` / `.mp4` (hero do site) |
| `imagemagick` | Otimizar imagens e assets |
| `mkcert` | Certificados HTTPS para desenvolvimento local |
| `jq` | Manipular JSON no terminal |

---

## Como funciona o Infisical

Em vez de copiar `.env.local` manualmente em cada máquina, os secrets ficam no Infisical (conta `woney@bicofino.com`, org Studio Bicofino). Cada máquina faz login uma vez e passa a puxar os secrets automaticamente ao rodar `npm run docs`.

```
Infisical (nuvem)
    └── projeto: bicofino-ecossistema
            └── env: dev
                    ├── OPENROUTER_API_KEY = sk-or-v1-xxx
                    └── CONSIGLIERE_MODEL  = google/gemma-4-31b-it:free

MacBook ──→ infisical login ──→ npm run docs ──→ secrets injetados automaticamente
iMac    ──→ infisical login ──→ npm run docs ──→ secrets injetados automaticamente
```

O arquivo `.infisical.json` na raiz do repo aponta para o projeto. Ele é commitado — só contém metadados, nunca os valores das chaves.

---

## PARTE 1 — Configuração inicial (fazer UMA VEZ no MacBook atual)

Estes passos só precisam ser feitos uma vez. Depois, o iMac e qualquer outra máquina futura só precisam fazer a Parte 2.

### 1. Instalar o Infisical CLI

```bash
brew install infisical
```

### 2. Criar o projeto no Infisical

Acesse **app.infisical.com** com `woney@bicofino.com`:
- Org: Studio Bicofino
- Clique em **Secret Management → New Project**
- Nome: `bicofino-ecossistema`
- Clique em **Create**

### 3. Autenticar e vincular o repo

```bash
# Autenticar (abre o navegador)
infisical login

# Na raiz do repo, vincular ao projeto criado
cd /caminho/para/Bicofino-ecossistema
infisical init
# → selecione a org "Studio Bicofino"
# → selecione o projeto "bicofino-ecossistema"
# Isso cria o arquivo .infisical.json
```

### 4. Adicionar os secrets

```bash
# Adicionar a chave do OpenRouter
infisical secrets set OPENROUTER_API_KEY=sk-or-v1-xxxxxxxx --env=dev

# (Opcional) Override do modelo — se quiser mudar o default
infisical secrets set CONSIGLIERE_MODEL=google/gemma-4-31b-it:free --env=dev

# Verificar se ficou correto
infisical secrets --env=dev
```

### 5. Commitar o .infisical.json

```bash
git add .infisical.json
git commit -m "chore: add infisical project link"
git push
```

### 6. Testar no MacBook

```bash
npm run docs
# O terminal deve mostrar "injecting X secret(s)" antes de subir o Next.js
```

A partir daqui o MacBook está funcionando com Infisical. O `.env.local` pode ser removido.

---

## PARTE 2 — Máquina nova (iMac ou qualquer outra)

### 1. Gerar SSH key

```bash
# Gerar chave para a conta Bicofino
ssh-keygen -t ed25519 -C "woney@bicofino.com" -f ~/.ssh/id_ed25519_bicofino

# Adicionar ao ssh-agent
ssh-add ~/.ssh/id_ed25519_bicofino

# Configurar alias no SSH config
cat >> ~/.ssh/config << 'EOF'

Host github-bicofino
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_bicofino
EOF
```

Adicione a chave pública ao GitHub:

```bash
pbcopy < ~/.ssh/id_ed25519_bicofino.pub
# github.com → Settings → SSH and GPG keys → New SSH key → colar
```

### 2. Clonar o repositório

```bash
git clone git@github-bicofino:studio-bicofino/bicofino-ds.git Bicofino-ecossistema
cd Bicofino-ecossistema
```

### 3. Rodar o script de setup

```bash
bash scripts/setup-mac.sh
```

O script faz automaticamente:
- Instala Homebrew (se não tiver)
- Instala todas as ferramentas do `Brewfile` (incluindo `infisical`)
- Instala Node 22 via `fnm` e configura o shell
- Roda `npm install` no monorepo
- Instala o CA do `mkcert`
- Abre o login interativo do Infisical

No passo do Infisical, faça login com `woney@bicofino.com`. Após isso, o `.infisical.json` já commitado aponta para o projeto e os secrets são puxados automaticamente.

### 4. Autenticar os outros serviços

```bash
# GitHub CLI
gh auth login
# escolha: GitHub.com → SSH → selecionar ~/.ssh/id_ed25519_bicofino

# Vercel
vercel login
# usa woney@bicofino.com
```

### 5. Configurar os remotes do Git

```bash
git remote -v   # verificar o que já existe

# Se faltar o remote bicofino:
git remote add bicofino git@github-bicofino:studio-bicofino/bicofino-ds.git

# Para o origin empurrar para os dois repositórios:
git remote set-url --add --push origin https://github.com/WoneyMalian/bicofino-ds.git
git remote set-url --add --push origin git@github-bicofino:studio-bicofino/bicofino-ds.git
```

### 6. Testar

```bash
npm run docs    # docs-site em localhost:3001
npm run web     # site público em localhost:3002
```

O terminal deve mostrar `injecting X secret(s)` antes de subir o Next.js. Isso confirma que o Infisical está funcionando.

---

## Referência rápida — comandos do dia a dia

```bash
# Apps
npm run docs        # docs-site (localhost:3001)
npm run web         # site público (localhost:3002)
npm run dev         # todos via PM2
npm run stop        # parar todos
npm run logs:docs   # logs do docs-site
npm run logs:web    # logs do web

# Secrets (Infisical)
infisical secrets --env=dev              # listar secrets
infisical secrets set KEY=valor --env=dev  # adicionar/atualizar secret

# Git
git push            # envia para origin (ambos os remotes)
git push bicofino   # envia só para studio-bicofino

# Deploy
vercel              # preview deploy
vercel --prod       # produção
```

---

## Estrutura do monorepo

```
Bicofino-ecossistema/
├── apps/
│   ├── docs-site/    # Brand & Design System — localhost:3001
│   ├── web/          # Site público — localhost:3002
│   └── storybook/    # Component explorer — localhost:6006
├── packages/
│   └── design-system/
├── .infisical.json   # Vínculo com o projeto Infisical (commitado, sem secrets)
├── Brewfile          # Dependências de sistema
├── scripts/
│   └── setup-mac.sh  # Script de onboarding
├── CLAUDE.md         # Instruções para o Claude Code
├── DESIGN.md         # Source of truth de design — ler antes de qualquer componente
└── SETUP.md          # Este arquivo
```

---

## Próximos passos

### Imediato (ainda no MacBook)
- [ ] Criar projeto `bicofino-ecossistema` no Infisical (Parte 1 acima)
- [ ] Rodar `infisical init` e adicionar os secrets
- [ ] Commitar `.infisical.json` e confirmar que `npm run docs` mostra "injecting secrets"

### Ao chegar no iMac
- [ ] Seguir a Parte 2 deste documento
- [ ] Confirmar que `npm run docs` e `npm run web` sobem sem erros

### Médio prazo
- [ ] Usar `ffmpeg` para otimizar os vídeos hero (`video-onpitch.webm`, `video-offpitch.webm`)
- [ ] Adicionar `.node-version` na raiz para o `fnm` detectar a versão automaticamente
- [ ] Documentar o fluxo de atualização de assets em `public/brand/` e `public/media/`

### Longo prazo (roadmap)
- [ ] **Consigliere Widget** — chat IA contextual em 2 camadas (já iniciado no docs-site)
- [ ] **Athlete Portal** — portal com Supabase RLS para gestão de atletas
- [ ] **Workflow 2 máquinas** — sincronização de contexto entre iMac e MacBook

---

> Dúvidas ou problemas? Abra o Claude Code (`claude`) na raiz do projeto — o contexto do projeto já está carregado via `CLAUDE.md`.
