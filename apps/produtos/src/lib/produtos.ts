/* Catálogo de produtos — sistemas construídos e validados em produção no Bicofino,
   prontos para serem adaptados e vendidos a novos clientes.
   Valores de mercado: pesquisa BR 2025/26 (12/jun/2026), câmbio US$ 1 ≈ R$ 5,40.
   Mesma base de dados do Registro de Impacto (apps/woney-registro/src/lib/seed.ts). */

export interface InfraItem {
  nome: string
  custo: string // texto curto: '~R$ 110/mês', 'R$ 0 (ferramenta aberta)'
}

export interface Produto {
  id: string
  nome: string
  pitch: string // uma linha — o que resolve
  prova: string // validação em produção no Bicofino
  mercado: {
    min: number
    medio: number
    max: number
    prazoSemanas: number
    porEntrega?: boolean // valores por entrega (proposta), em vez de custo único
  }
  infra: InfraItem[]
  infraMensal: string // soma aproximada do custo recorrente do cliente
  infraNota?: string // contexto extra (ex.: SaaS equivalente de mercado)
  modulo?: boolean // módulo adicional de outro produto
  tela?: string // screenshot do produto (servido de /public/telas), exibido no mockup
}

/* ── Custos de referência das ferramentas (jun/2026) ── */

export const ferramentas = [
  {
    nome: 'Vercel',
    papel: 'Hospedagem e deploy',
    custo: 'Pro ~R$ 110/mês por time',
    nota: 'plano gratuito atende projetos em validação',
  },
  {
    nome: 'Supabase',
    papel: 'Banco de dados e autenticação',
    custo: 'Pro ~R$ 135/mês',
    nota: 'camada gratuita atende o início da operação',
  },
  {
    nome: 'Google Workspace',
    papel: 'Drive compartilhado do acervo',
    custo: '~R$ 74/usuário/mês',
    nota: 'Business Standard, necessário para Drives compartilhados',
  },
  {
    nome: 'Adobe Photoshop',
    papel: 'Motor do tratamento de imagem',
    custo: '~R$ 140/mês',
    nota: 'licença Creative Cloud individual',
  },
  {
    nome: 'API Claude (Anthropic)',
    papel: 'Inteligência do mapa de rede',
    custo: '~R$ 30 a 160/mês',
    nota: 'cobrança por uso; faixa dos volumes atuais',
  },
  {
    nome: 'Domínio próprio',
    papel: 'Endereço da marca',
    custo: '~R$ 40/ano',
    nota: 'registro.br',
  },
  {
    nome: 'Motor aberto',
    papel: 'Node, ffmpeg, Playwright, Real-ESRGAN',
    custo: 'R$ 0',
    nota: 'ferramentas de código aberto, rodam em máquina própria',
  },
] as const

/* ── Os produtos ── */

export const produtos: Produto[] = [
  {
    id: 'brand-system',
    nome: 'Brand System digital',
    pitch: 'A marca inteira num endereço próprio: cores, vozes, componentes e regras de uso.',
    prova: 'No ar em bicofino.com/brandsystem — 3 idiomas, modo escuro, 8 capítulos navegáveis.',
    tela: '/telas/design-system.png',
    mercado: { min: 90000, medio: 150000, max: 300000, prazoSemanas: 16 },
    infra: [
      { nome: 'Vercel Pro', custo: '~R$ 110/mês' },
      { nome: 'Domínio próprio', custo: '~R$ 40/ano' },
    ],
    infraMensal: '~R$ 110/mês',
  },
  {
    id: 'site',
    nome: 'Site institucional em código',
    pitch: 'Site de marca com motion e vídeo em tela cheia, em código próprio do cliente.',
    prova: 'bicofino.com em produção — intro de marca, verticais On/Off Pitch, 3 idiomas.',
    tela: '/telas/site-bicofino.png',
    mercado: { min: 50000, medio: 90000, max: 150000, prazoSemanas: 8 },
    infra: [
      { nome: 'Vercel Pro', custo: '~R$ 110/mês' },
      { nome: 'Domínio próprio', custo: '~R$ 40/ano' },
    ],
    infraMensal: '~R$ 110/mês',
  },
  {
    id: 'crm',
    nome: 'CRM proprietário',
    pitch: 'O cadastro vivo das pessoas que importam — campos, vínculos e grupos do jeito da casa.',
    prova: 'Em produção em bicofino.com/casa-nostra — moldado em 18 rodadas de uso real com o decisor.',
    tela: '/telas/casa-nostra.png',
    mercado: { min: 100000, medio: 140000, max: 220000, prazoSemanas: 16 },
    infra: [
      { nome: 'Vercel Pro', custo: '~R$ 110/mês' },
      { nome: 'Supabase Pro', custo: '~R$ 135/mês' },
      { nome: 'Domínio próprio', custo: '~R$ 40/ano' },
    ],
    infraMensal: '~R$ 245/mês',
  },
  {
    id: 'acervo',
    nome: 'Acervo de mídia que se organiza sozinho',
    pitch: 'Upload direto do celular; cada arquivo cai nomeado, catalogado e na pasta certa do Drive.',
    prova: 'Em uso diário na operação Bicofino — 16 atletas, detecção de duplicata, painel de curadoria.',
    tela: '/telas/drive-atleta.png',
    mercado: { min: 80000, medio: 115000, max: 160000, prazoSemanas: 14 },
    infra: [
      { nome: 'Vercel Pro', custo: '~R$ 110/mês' },
      { nome: 'Supabase Pro', custo: '~R$ 135/mês' },
      { nome: 'Google Workspace (Drive compartilhado)', custo: '~R$ 74/usuário/mês' },
    ],
    infraMensal: '~R$ 320/mês',
  },
  {
    id: 'rede',
    nome: 'Mapa de rede com IA',
    pitch: 'A rede de contatos vira grafo navegável: oportunidades por complementaridade e leitura de tendências.',
    prova: 'Em produção para o grupo Bicofino — 70 sócios mapeados, motor de oportunidades, IA de tendências.',
    tela: '/telas/la-rete.png',
    mercado: { min: 60000, medio: 90000, max: 140000, prazoSemanas: 9 },
    infra: [
      { nome: 'Vercel Pro', custo: '~R$ 110/mês' },
      { nome: 'Supabase Pro', custo: '~R$ 135/mês' },
      { nome: 'API Claude (por uso)', custo: '~R$ 30 a 160/mês' },
    ],
    infraMensal: '~R$ 275 a 405/mês',
  },
  {
    id: 'stories',
    nome: 'Fábrica de stories em vídeo',
    pitch: 'Artes 9:16 animadas geradas por comando: cada peça sai em minutos, no padrão da marca.',
    prova: '16 stories reais publicados — cada jogo vira vídeo 1080×1920 em ~24 min, ponta a ponta.',
    mercado: { min: 40000, medio: 65000, max: 100000, prazoSemanas: 8 },
    infra: [
      { nome: 'Estação local com Node, ffmpeg e Playwright', custo: 'R$ 0 (ferramentas abertas)' },
    ],
    infraMensal: 'R$ 0/mês',
    infraNota: 'SaaS equivalentes de mercado cobram de R$ 290 a R$ 2.700/mês (Creatomate, Rocketium).',
  },
  {
    id: 'estaticos',
    nome: 'Cards estáticos',
    pitch: 'A mesma arte do vídeo vira PNG 1080×1920 com um comando — dois formatos pelo trabalho de um.',
    prova: 'Criado durante uma rodada de produção real; calibrou junto com o vídeo, custo extra zero.',
    mercado: { min: 8000, medio: 12000, max: 20000, prazoSemanas: 1 },
    infra: [{ nome: 'Incluída na Fábrica de stories', custo: 'R$ 0' }],
    infraMensal: 'R$ 0/mês',
    modulo: true,
  },
  {
    id: 'pipeline',
    nome: 'Pipeline de tratamento de imagem',
    pitch: 'Foto bruta entra, peça tratada sai: recorte, granulado e P&B em lote, direto pelo Photoshop.',
    prova: 'Na operação Bicofino, cada imagem caiu de 20 para 4 min — rodando em lote desde junho.',
    mercado: { min: 55000, medio: 75000, max: 110000, prazoSemanas: 9 },
    infra: [
      { nome: 'Adobe Photoshop (Creative Cloud)', custo: '~R$ 140/mês' },
      { nome: 'Estação macOS + upscale aberto (Real-ESRGAN)', custo: 'R$ 0' },
    ],
    infraMensal: '~R$ 140/mês',
  },
  {
    id: 'propostas',
    nome: 'Propostas interativas',
    pitch: 'A proposta comercial como microsite: números animados, marca em movimento, enviada num link.',
    prova: 'Duas entregues e aprovadas — O Outro Mapa e BoviClass.',
    tela: '/telas/proposta-boviclass.png',
    mercado: { min: 12000, medio: 18000, max: 30000, prazoSemanas: 3, porEntrega: true },
    infra: [{ nome: 'Vercel', custo: 'plano gratuito atende; Pro ~R$ 110/mês com domínio próprio' }],
    infraMensal: 'R$ 0 a 110/mês',
  },
]

/* ── Agregados do portfólio ── */

export const portfolio = {
  /* soma das médias de construção + propostas pelas 2 já entregues */
  valorMercadoBrl: produtos.reduce(
    (acc, p) => acc + p.mercado.medio * (p.mercado.porEntrega ? 2 : 1),
    0,
  ),
  valorMinBrl: produtos.reduce((acc, p) => acc + p.mercado.min * (p.mercado.porEntrega ? 2 : 1), 0),
  valorMaxBrl: produtos.reduce((acc, p) => acc + p.mercado.max * (p.mercado.porEntrega ? 2 : 1), 0),
  filaSemanasTotal: produtos
    .filter((p) => !p.mercado.porEntrega)
    .reduce((acc, p) => acc + p.mercado.prazoSemanas, 0),
  totalProdutos: produtos.length,
}
