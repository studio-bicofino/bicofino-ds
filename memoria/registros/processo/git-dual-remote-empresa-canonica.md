---
tipo: processo
titulo: Dual remote git — push duplo, empresa (studio-bicofino) é o remote canônico
data: 2026-06-01
projetos: []
fontes: [memoria-auto-claude]
status: vigente
tags: [git, remotes, github, empresa]
---

O repo tem dois remotes desde 19 de maio de 2026: `origin` → `WoneyMalian/bicofino-ds` (pessoal) e `bicofino` → `studio-bicofino/bicofino-ds` (empresa, via SSH `Host github-bicofino` com a chave `~/.ssh/id_ed25519_bicofino`). O `origin` tem push URL extra, então um `git push` simples envia para os DOIS repos simultaneamente.

Em 2026-06-01 o Woney definiu a preferência canônica: projetos são lançados no GitHub + Vercel da EMPRESA (studio-bicofino / woney@bicofino.com), nunca na conta pessoal. O remote `bicofino` é o canônico — `main` é sincronizado lá e os PRs são abertos lá (`gh` já autentica como studio-bicofino: `gh pr create --repo studio-bicofino/bicofino-ds`). O pessoal (WoneyMalian) fica só como backup.

Como aplicar:
- Identidade git LOCAL do repo: `user.email woney@bicofino.com` + `user.name studio-bicofino` (setado em 2026-06-01 — antes era o gmail pessoal, e isso chegou a bloquear deploy na Vercel por commit email sem match).
- Atenção ao pushar `main`: publica nos dois remotes e pode disparar deploy de produção na Vercel da empresa.
- Se SSH falhar, verificar `gh auth status` (pode precisar de `gh auth refresh`).
- No iMac, replicar: clone via `github-bicofino`, chave SSH própria, `gh auth login` como studio-bicofino.
