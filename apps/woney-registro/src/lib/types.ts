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
