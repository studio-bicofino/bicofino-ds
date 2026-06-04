#!/usr/bin/env bash
# sync — stage tudo, commita e dá push da branch atual.
#
# O fluxo de 2 computadores: ao terminar de trabalhar, rode `npm run sync`.
# Seguro porque o .gitignore (raiz + por app) já exclui node_modules/.next/.vercel/
# .env/tsbuildinfo e os assets grandes do web (public/brand, public/media).
#
# Uso:
#   npm run sync                 # commit com mensagem padrão
#   npm run sync -- "minha msg"  # commit com mensagem própria
#   bash scripts/sync.sh "msg"   # direto
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

branch="$(git rev-parse --abbrev-ref HEAD)"
msg="${1:-sync: ${branch}}"

git add -A
if git diff --cached --quiet; then
  echo "Nada novo para commitar."
else
  git commit -m "$msg"
fi

# push para o upstream da branch (cofre da empresa = bicofino)
git push
echo "✅ sync concluído — branch '${branch}' enviada."
