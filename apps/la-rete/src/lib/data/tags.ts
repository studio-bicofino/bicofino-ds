import type { Tag } from './types'

/**
 * Vocabulário canônico de tags da rede — espelha as kinds do Casa Nostra
 * (seeds reais em apps/casa-nostra/db/seeds/0002_tags_v2.sql).
 * Ids estáveis: prefixo da kind + slug. people.ts, matchmaking e trends
 * referenciam SEMPRE estes ids/nomes.
 */
export const TAGS: Tag[] = [
  /* ── skill · atuação ─────────────────────────────────────────────── */
  { id: 'sk-tech', name: 'Tech', kind: 'skill' },
  { id: 'sk-ia', name: 'IA / Dados', kind: 'skill' },
  { id: 'sk-fintech', name: 'Fintech', kind: 'skill' },
  { id: 'sk-agro', name: 'Agro', kind: 'skill' },
  { id: 'sk-wealth', name: 'Wealth Management', kind: 'skill' },
  { id: 'sk-direito', name: 'Direito', kind: 'skill' },
  { id: 'sk-ma', name: 'M&A', kind: 'skill' },
  { id: 'sk-real-estate', name: 'Real Estate', kind: 'skill' },
  { id: 'sk-publicidade', name: 'Publicidade', kind: 'skill' },
  { id: 'sk-midia', name: 'Mídia', kind: 'skill' },
  { id: 'sk-luxo', name: 'Luxo', kind: 'skill' },
  { id: 'sk-energia', name: 'Energia', kind: 'skill' },
  { id: 'sk-logistica', name: 'Logística', kind: 'skill' },
  { id: 'sk-saude', name: 'Saúde / Longevidade', kind: 'skill' },
  { id: 'sk-fut-atleta', name: 'Futebol Atleta', kind: 'skill' },
  { id: 'sk-fut-dirigente', name: 'Futebol Dirigente', kind: 'skill' },
  { id: 'sk-educacao', name: 'Educação', kind: 'skill' },
  { id: 'sk-vc', name: 'Venture Capital', kind: 'skill' },

  /* ── grupo · clubes, escolas, redes ─────────────────────────────── */
  { id: 'gr-pinheiros', name: 'Clube Pinheiros', kind: 'grupo' },
  { id: 'gr-hebraica', name: 'Hebraica', kind: 'grupo' },
  { id: 'gr-usp', name: 'USP', kind: 'grupo' },
  { id: 'gr-fgv', name: 'FGV', kind: 'grupo' },
  { id: 'gr-insper', name: 'Insper', kind: 'grupo' },
  { id: 'gr-harvard', name: 'Harvard', kind: 'grupo' },
  { id: 'gr-ypo', name: 'YPO', kind: 'grupo' },
  { id: 'gr-endeavor', name: 'Endeavor', kind: 'grupo' },
  { id: 'gr-merc-publicitario', name: 'Mercado Publicitário', kind: 'grupo' },

  /* ── afiliação · domínios recorrentes ────────────────────────────── */
  { id: 'af-palmeiras', name: 'Palmeiras', kind: 'afiliacao' },
  { id: 'af-spfc', name: 'São Paulo FC', kind: 'afiliacao' },
  { id: 'af-corinthians', name: 'Corinthians', kind: 'afiliacao' },
  { id: 'af-napoli', name: 'Napoli', kind: 'afiliacao' },
  { id: 'af-torino', name: 'Torino', kind: 'afiliacao' },
  { id: 'af-como', name: 'Como 1907', kind: 'afiliacao' },
  { id: 'af-fifa', name: 'FIFA', kind: 'afiliacao' },
  { id: 'af-cbf', name: 'CBF', kind: 'afiliacao' },
  { id: 'af-fpf', name: 'Federação Paulista', kind: 'afiliacao' },
  { id: 'af-itau', name: 'Itaú', kind: 'afiliacao' },
  { id: 'af-btg', name: 'BTG Pactual', kind: 'afiliacao' },
  { id: 'af-google', name: 'Google', kind: 'afiliacao' },
  { id: 'af-adidas', name: 'Adidas', kind: 'afiliacao' },
  { id: 'af-nike', name: 'Nike', kind: 'afiliacao' },
  { id: 'af-globo', name: 'Globo', kind: 'afiliacao' },
  { id: 'af-loro-piana', name: 'Loro Piana', kind: 'afiliacao' },

  /* ── família ─────────────────────────────────────────────────────── */
  { id: 'fa-brancatelli', name: 'Família Brancatelli', kind: 'familia' },
  { id: 'fa-rossi', name: 'Família Rossi', kind: 'familia' },
  { id: 'fa-almeida-prado', name: 'Família Almeida Prado', kind: 'familia' },
  { id: 'fa-castellani', name: 'Família Castellani', kind: 'familia' },
  { id: 'fa-ferraz', name: 'Família Ferraz', kind: 'familia' },
  { id: 'fa-lombardi', name: 'Família Lombardi', kind: 'familia' },

  /* ── cargo ───────────────────────────────────────────────────────── */
  { id: 'ca-fundador', name: 'Fundador', kind: 'cargo' },
  { id: 'ca-ceo', name: 'CEO', kind: 'cargo' },
  { id: 'ca-cfo', name: 'CFO', kind: 'cargo' },
  { id: 'ca-conselheiro', name: 'Conselheiro', kind: 'cargo' },
  { id: 'ca-presidente', name: 'Presidente', kind: 'cargo' },
  { id: 'ca-diretor', name: 'Diretor', kind: 'cargo' },
  { id: 'ca-atleta', name: 'Atleta', kind: 'cargo' },
  { id: 'ca-investidor', name: 'Investidor', kind: 'cargo' },

  /* ── empresa ─────────────────────────────────────────────────────── */
  { id: 'em-bicofino', name: 'Bicofino', kind: 'empresa' },
  { id: 'em-vetrina', name: 'Vetrina Capital', kind: 'empresa' },
  { id: 'em-solaria', name: 'Solaria Agro', kind: 'empresa' },
  { id: 'em-lumen', name: 'Lumen Partners', kind: 'empresa' },
  { id: 'em-trama', name: 'Trama Studio', kind: 'empresa' },
  { id: 'em-faro', name: 'Faro Saúde', kind: 'empresa' },
  { id: 'em-bastione', name: 'Bastione Real Estate', kind: 'empresa' },
  { id: 'em-vela', name: 'Vela Energia', kind: 'empresa' },
  { id: 'em-ponte', name: 'Ponte Logística', kind: 'empresa' },
  { id: 'em-arsenale', name: 'Arsenale Tech', kind: 'empresa' },
  { id: 'em-ferraz-adv', name: 'Ferraz & Associados', kind: 'empresa' },
  { id: 'em-mercato', name: 'Mercato Ventures', kind: 'empresa' },
  { id: 'em-quadra', name: 'Quadra Sports', kind: 'empresa' },
]

export const TAG_BY_ID: Record<string, Tag> = Object.fromEntries(TAGS.map((t) => [t.id, t]))

export const TAG_BY_NAME: Record<string, Tag> = Object.fromEntries(TAGS.map((t) => [t.name, t]))
