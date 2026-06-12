---
tipo: processo
titulo: Tudo que é Bicofino roda nas contas da empresa (woney@bicofino.com)
data: 2026-06-01
projetos: []
fontes: [memoria-auto-claude]
status: vigente
tags: [contas, empresa, vercel, supabase, infisical]
---

Separação estrita pessoal × empresa: tudo que é Bicofino roda nas contas abertas com `woney@bicofino.com`. O mapa durável:

- GitHub: `studio-bicofino` (repo da empresa: studio-bicofino/bicofino-ds)
- Vercel: team `studio-bicofinos-projects` — deploys de produção dos apps
- Supabase: auth, storage e DB (Athlete Portal, Consigliere, apps internos)
- OpenRouter: API de Claude para o Consigliere Widget
- Infisical: sync de secrets entre MacBook e iMac
- Google Workspace: Drive para arquivos pesados dos atletas

Lição operacional de 2026-06-01: manter conta pessoal (woneymalian@gmail.com) e empresa logadas juntas no mesmo browser confunde Vercel e GitHub — um deploy chegou a ser bloqueado por "commit email could not be matched to a Git account". A solução em camadas: profile do Chrome dedicado à conta Google da empresa com todos os serviços logados ali (pessoal fica em profile separado); CLIs configuradas para a empresa (`git config user.email woney@bicofino.com`, `gh` como studio-bicofino, `vercel login` como woney@bicofino.com).

Como aplicar: ao criar qualquer projeto, integração ou deploy novo do Bicofino, usar as contas acima por padrão — não a conta pessoal. Ao depurar erro de permissão/identidade em Vercel ou GitHub, primeiro verificar se a sessão/CLI ativa é a da empresa.
