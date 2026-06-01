#!/usr/bin/env bash
# Bicofino — setup de máquina nova (iMac ou MacBook)
# Uso: bash scripts/setup-mac.sh

set -e

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

step() { echo -e "\n${BOLD}→ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

echo -e "\n${BOLD}Bicofino — Setup de Máquina${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Homebrew ──────────────────────────────────────────────────────────────
step "Homebrew"
if ! command -v brew &>/dev/null; then
  echo "Instalando Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Apple Silicon: adiciona brew ao PATH desta sessão
  eval "$(/opt/homebrew/bin/brew shellenv)" 2>/dev/null || true
else
  ok "Homebrew já instalado ($(brew --version | head -1))"
fi

# ── 2. Ferramentas via Brewfile ───────────────────────────────────────────────
step "Ferramentas do projeto (Brewfile)"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
brew bundle --file="$REPO_ROOT/Brewfile"
ok "Brewfile aplicado"

# ── 3. Node via fnm ──────────────────────────────────────────────────────────
step "Node.js (via fnm)"
# Garante que fnm está no PATH desta sessão
eval "$(fnm env --use-on-cd 2>/dev/null)" || true

NODE_VERSION="22"
if fnm list | grep -q "v${NODE_VERSION}"; then
  ok "Node v${NODE_VERSION} já instalado"
else
  echo "Instalando Node v${NODE_VERSION}..."
  fnm install "$NODE_VERSION"
fi
fnm use "$NODE_VERSION" --silent
fnm default "$NODE_VERSION"
ok "Node $(node --version) ativo"

# Adiciona fnm ao shell config se ainda não tiver
for RC in ~/.zshrc ~/.bashrc; do
  if [[ -f "$RC" ]] && ! grep -q "fnm env" "$RC"; then
    echo '' >> "$RC"
    echo '# fnm — Node version manager' >> "$RC"
    echo 'eval "$(fnm env --use-on-cd)"' >> "$RC"
    ok "fnm adicionado ao $RC"
  fi
done

# ── 4. Dependências npm do monorepo ──────────────────────────────────────────
step "npm install (monorepo raiz)"
cd "$REPO_ROOT"
npm install
ok "node_modules instalado"

# ── 5. mkcert — certificados HTTPS locais ────────────────────────────────────
step "mkcert (HTTPS local)"
mkcert -install 2>/dev/null && ok "mkcert CA instalado" || warn "mkcert install falhou — rode manualmente: mkcert -install"

# ── 6. Infisical — autenticação ───────────────────────────────────────────────
step "Infisical (secrets)"
if infisical whoami &>/dev/null; then
  ok "Infisical já autenticado ($(infisical whoami 2>/dev/null | head -1))"
else
  warn "Infisical não autenticado. Rodando login interativo..."
  infisical login
fi

# ── 7. Resumo e próximos passos manuais ──────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}Setup concluído. Próximos passos manuais:${NC}"
echo ""
echo "  1. SSH key para GitHub (remoto bicofino):"
echo "     ssh-keygen -t ed25519 -C 'woney@bicofino.com' -f ~/.ssh/id_ed25519_bicofino"
echo "     gh ssh-key add ~/.ssh/id_ed25519_bicofino.pub --title 'Bicofino iMac'"
echo ""
echo "  2. Autenticar GitHub CLI:"
echo "     gh auth login"
echo ""
echo "  3. Autenticar Vercel:"
echo "     vercel login"
echo ""
echo "  4. Configurar remote bicofino (studio-bicofino):"
echo "     git remote add bicofino git@github-bicofino:studio-bicofino/bicofino-ds.git"
echo ""
echo "  5. Testar:"
echo "     npm run docs   # docs-site em localhost:3001"
echo "     npm run web    # site público em localhost:3002"
echo ""
