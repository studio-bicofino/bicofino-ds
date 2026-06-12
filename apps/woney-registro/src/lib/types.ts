/* Modelo de dados — espelha o schema Supabase do briefing (bloco 4).
   Enquanto rodamos seed-first, estes tipos são a fonte da verdade;
   ao plugar o Supabase, as tabelas mapeiam 1:1 para estes shapes. */

export type TipoSistema = 'eficiencia' | 'infraestrutura' | 'projeto'

export interface Settings {
  id: number
  salario_mensal: number
  horas_uteis_mes: number
  ferramenta_usd: number
  cambio_usd_brl: number
  encargos_cartao: number
  stories_mes: number
  propostas_mes: number
  dev_salario_base: number
  dev_mult_empregador: number
  dev_fracao_fte: number
  /* Drive do Atleta — projeção de catalogação de mídia */
  drive_fotos_semana: number
  drive_seg_antes: number
  drive_seg_depois: number
}

/* Terceirização — o que custaria contratar o mesmo sistema fora
   (software house / agência, mercado BR 2025/26, pesquisa 2026-06-12).
   Valores em R$; faixa mín–média–máx + prazo de entrega. */
export interface Terceirizacao {
  valor_min_brl: number
  valor_brl: number // média de mercado — o número citável
  valor_max_brl: number
  prazo_semanas: number
  /* true = estimativa por entrega (multiplica pelos usos), não custo único de build */
  por_uso?: boolean
  escopo: string // o que a estimativa cobre
  fontes?: string | null // referências curtas da pesquisa de mercado
}

export interface Sistema {
  id: string
  nome: string
  tipo: TipoSistema
  criado_em: string // YYYY-MM-DD
  investimento_horas: number
  /* eficiência — por peça */
  tempo_antes_min?: number | null
  tempo_depois_min?: number | null
  /* projeto — escala de dias */
  tempo_antes_dias?: number | null
  tempo_depois_dias?: number | null
  /* infraestrutura */
  destravou?: string | null
  natureza_valor?: string | null
  notas?: string | null
  /* papel na projeção recorrente — não persiste no DB, derivado por nome no seed */
  papel?: 'template' | 'propostas' | null
  /* benchmark de mercado — quanto custaria terceirizar este sistema */
  terceirizacao?: Terceirizacao | null
}

export interface Uso {
  id: string
  sistema_id: string
  data: string // YYYY-MM-DD
  legenda: string
  imagem_url?: string | null // poster/screenshot estático (servido de /public)
  video_url?: string | null // preview em vídeo (mp4, servido de /public) — toca no hover
  link?: string | null // "ver ao vivo" — URL externa do artefato
}
