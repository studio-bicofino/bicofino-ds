/* Seed — dados reais do briefing (bloco 8).
   Fonte da verdade enquanto rodamos seed-first; ao plugar o Supabase
   estes registros viram as linhas iniciais das tabelas. */

import type { Settings, Sistema, Uso } from './types'

export const settings: Settings = {
  id: 1,
  salario_mensal: 17000,
  horas_uteis_mes: 160,
  ferramenta_usd: 100, // Claude Max 5x, US$/mês
  cambio_usd_brl: 5.04,
  encargos_cartao: 0.0438, // IOF/spread
  stories_mes: 8,
  propostas_mes: 2,
  dev_salario_base: 4500, // vaga de dev júnior — R$/mês (valor da vaga)
  dev_mult_empregador: 1, // a vaga vale R$ 4.500/mês cheios
  dev_fracao_fte: 1, // a capacidade evitada equivale à vaga inteira
  // Drive do Atleta — base da projeção de catalogação de mídia
  drive_fotos_semana: 100, // volume estimado de fotos/vídeos recebidos por semana
  drive_seg_antes: 15, // segundos para nomear/organizar cada arquivo manualmente
  drive_seg_depois: 1, // segundos por arquivo via sistema (30 fotos entram em ~30s)
}

export const sistemas: Sistema[] = [
  {
    id: 'sis-template-stories',
    nome: 'Template de stories animados (jogos)',
    tipo: 'eficiencia',
    criado_em: '2026-03-10',
    investimento_horas: 4,
    tempo_antes_min: 90,
    tempo_depois_min: 20,
    papel: 'template',
    notas: 'Gerador 9:16 HTML/React → MP4. Cada jogo é um uso novo.',
  },
  {
    id: 'sis-propostas-ds',
    nome: 'Propostas via Design System',
    tipo: 'eficiencia',
    criado_em: '2026-03-20',
    investimento_horas: 0,
    tempo_antes_min: 90,
    tempo_depois_min: 40,
    papel: 'propostas',
    notas: 'O capital viabilizador está no Design System.',
  },
  {
    id: 'sis-design-system',
    nome: 'Design System Bicofino',
    tipo: 'infraestrutura',
    criado_em: '2026-02-01',
    investimento_horas: 160,
    destravou:
      'Base das propostas, do site e de toda peça, padrão de marca, capability de Claude Code do zero',
    natureza_valor: 'Ativo permanente — infraestrutura que sustenta o resto',
  },
  {
    id: 'sis-site-v1',
    nome: 'Site Bicofino v1 (em código)',
    tipo: 'projeto',
    criado_em: '2026-04-15',
    investimento_horas: 0,
    tempo_antes_dias: 20,
    tempo_depois_dias: 5,
    notas:
      'Benchmark — site BoviChain levou 6 semanas no Framer; Bicofino é mais simples; base no Design System.',
  },
  {
    id: 'sis-drive-atleta',
    nome: 'Drive do Atleta',
    tipo: 'infraestrutura',
    criado_em: '2026-06-02',
    investimento_horas: 7,
    destravou:
      'Upload catalogado direto do celular do atleta para o Drive — cada arquivo cai já nomeado (atleta, data, jogo) e na pasta certa. Acaba com baixar, renomear e organizar um a um.',
    natureza_valor: 'Ativo permanente — pipeline que faz o acervo se organizar sozinho',
  },
]

export const usos: Uso[] = [
  // Template de stories — 6 usos (vídeos reais gerados pelo card-jogos-motion)
  {
    id: 'uso-1',
    sistema_id: 'sis-template-stories',
    data: '2026-06-01',
    legenda: 'Story Júlio — Brasileirão',
    imagem_url: null,
    video_url: '/pecas/julio-brasileiro-s17-01jun.mp4',
  },
  {
    id: 'uso-2',
    sistema_id: 'sis-template-stories',
    data: '2026-05-30',
    legenda: 'Story Guilherme — Brasileirão',
    imagem_url: null,
    video_url: '/pecas/guilherme-brasileiro-s17-30maio.mp4',
  },
  {
    id: 'uso-5',
    sistema_id: 'sis-template-stories',
    data: '2026-06-04',
    legenda: 'Story Guilherme — Brasileirão',
    imagem_url: null,
    video_url: '/pecas/guilherme-brasileiro-s17-04jun.mp4',
  },
  {
    id: 'uso-6',
    sistema_id: 'sis-template-stories',
    data: '2026-06-06',
    legenda: 'Story Guilherme — Paulista',
    imagem_url: null,
    video_url: '/pecas/guilherme-paulista-s17-06jun.mp4',
  },
  {
    id: 'uso-7',
    sistema_id: 'sis-template-stories',
    data: '2026-06-06',
    legenda: 'Story Júlio — Paulista',
    imagem_url: null,
    video_url: '/pecas/julio-paulista-s17-06jun.mp4',
  },
  {
    id: 'uso-8',
    sistema_id: 'sis-template-stories',
    data: '2026-06-07',
    legenda: 'Story Ronaldo — Copa Rio',
    imagem_url: null,
    video_url: '/pecas/ronaldo-copario-s16-07jun.mp4',
  },
  // Propostas via DS — 2 usos reais (O Outro Mapa, BoviClass). imagem_url aponta pro
  // PNG em /public/pecas/; PecaMedia trata 404 com placeholder limpo.
  {
    id: 'uso-3',
    sistema_id: 'sis-propostas-ds',
    data: '2026-05-06',
    legenda: 'Proposta O Outro Mapa',
    imagem_url: '/pecas/proposta-o-outro-mapa.png',
    link: 'https://o-outro-mapa-6cdojgvbr-woney-malians-projects.vercel.app',
  },
  {
    id: 'uso-4',
    sistema_id: 'sis-propostas-ds',
    data: '2026-05-16',
    legenda: 'Proposta BoviClass',
    imagem_url: '/pecas/proposta-boviclass.png',
    link: 'https://masterclass-bovichain.vercel.app',
  },
  // Showcases — infraestrutura e projeto entram na galeria como prova visual.
  // Sem peso mensal (mesesDisponiveis filtra só eficiência), não afetam o cálculo.
  {
    id: 'uso-ds',
    sistema_id: 'sis-design-system',
    data: '2026-02-01',
    legenda: 'Design System Bicofino',
    imagem_url: '/pecas/design-system.png',
    link: 'https://bicofino-ds-umber.vercel.app',
  },
  {
    id: 'uso-site',
    sistema_id: 'sis-site-v1',
    data: '2026-04-15',
    legenda: 'Site Bicofino',
    imagem_url: '/pecas/site-bicofino.png',
    link: 'https://bicofino.com',
  },
  {
    id: 'uso-drive',
    sistema_id: 'sis-drive-atleta',
    data: '2026-06-02',
    legenda: 'Drive do Atleta',
    imagem_url: '/pecas/drive-atleta.png',
    link: 'https://drive-atleta.vercel.app',
  },
]
