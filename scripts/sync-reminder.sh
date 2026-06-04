#!/usr/bin/env bash
# Stop hook — LEMBRETE para rodar `npm run sync`. NÃO commita nada.
# Fica silencioso a menos que haja várias mudanças (>=3 arquivos) ou commits não enviados.
# Saída em JSON {"systemMessage": ...} para o Claude Code exibir ao usuário.
# Sem dependências além de git + bash (funciona igual nos 2 computadores).
cd "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || exit 0

changed=$(git status --porcelain 2>/dev/null | grep -c .)
unpushed=$(git log --oneline @{upstream}.. 2>/dev/null | grep -c .)

if [ "${changed:-0}" -ge 3 ] || [ "${unpushed:-0}" -ge 1 ]; then
  msg="${changed} arquivo(s) com mudanca"
  [ "${unpushed:-0}" -ge 1 ] && msg="${msg}, ${unpushed} commit(s) nao enviado(s)"
  # crase é literal aqui (escapada); válida dentro de string JSON; sem aspas-duplas no texto
  msg="${msg} — rode \`npm run sync\` quando terminar."
  printf '{"systemMessage": "%s"}\n' "$msg"
fi
exit 0
