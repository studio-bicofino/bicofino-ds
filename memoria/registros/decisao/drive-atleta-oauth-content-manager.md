---
tipo: decisao
titulo: Drive do Atleta escreve no Shared Drive via OAuth como o usuário Content-manager, não via service account
data: 2026-06-02
projetos: [drive-atleta]
fontes: [.planning/drive-atleta/HANDOFF.md]
status: vigente
tags: [google-drive, oauth, auth, infra]
---
O backend do Drive do Atleta precisava de credencial para escrever no Shared Drive `CENTRAL BICOFINO` (driveId `0AFqfyA1jOTXGUk9PVA`), destino definitivo de todo o acervo de mídia dos atletas.

**Decidido:** OAuth agindo como o próprio Woney (Content manager do drive), com refresh token gerado via OAuth Playground e guardado no Infisical. O app OAuth é "Internal" no Workspace — sem tela de app não-verificado, sem processo de verificação do Google.

**Por quê:** verificou-se em 2026-06-02 que o Woney é apenas Content manager do CENTRAL BICOFINO; o Manager é `hello@bicofino.com` (Fabio/org), que estava fora do país. Content manager **não pode adicionar membros** ao Shared Drive — logo o Woney não conseguia adicionar uma service account sozinho. OAuth como o próprio usuário destrava o projeto sem depender do Manager. Bônus estrutural: os arquivos caem dentro do Shared Drive, ou seja, no storage agrupado do Workspace — aguenta vídeo grande, não esbarra nos 15GB de um My Drive pessoal.

**Alternativa descartada (por ora):** service account — mais robusta (sem refresh token), mas bloqueada pela permissão. Migração planejada para quando o Fabio voltar: Manager adiciona a SA como Content manager e troca-se só a auth no backend; nenhum componente muda.
