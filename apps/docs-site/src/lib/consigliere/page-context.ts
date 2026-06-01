/**
 * Mapa de rotas do docs-site → resumo curto injetado no system prompt do Consigliere.
 * Mantém o LLM ciente do que o usuário está vendo sem depender de DOM scraping.
 *
 * Para adicionar uma nova rota: registre aqui com 2–4 frases descrevendo o que a página apresenta.
 */

export type PageKey =
  | '/'
  | '/brand'
  | '/design-system'
  | '/componentes'
  | '/verticais'
  | '/operacoes'
  | '/governanca'
  | '/consigliere'
  | '/start-here'

export const PAGE_CONTEXT: Record<PageKey, string> = {
  '/':
    'Home (Start Here) do Brand & Design System Bicofino. Apresenta a estrutura editorial do sistema e direciona o leitor para os sete capítulos: Fundamentos, Posicionamento, Núcleo da Marca, Universo Verbal, Universo Visual, Visual System e Operações.',
  '/brand':
    'Núcleo da Marca. Cobre a origem do nome ("bico fino" como filtro e execução), princípios, os 4Cs (filtro de toda decisão), arquétipos, craft e proxies. É o documento que define como a marca pensa antes de pensar em como aparece.',
  '/design-system':
    'Tokens visuais do Bicofino: paleta (text-primary #2A2C2B, text-secondary #5F6B77, surface #F2F8FF, accent #BFA37A), tipografia Inter + JetBrains Mono, escala de espaçamento sm/md/lg (8/16/32px), radius e regras hard (sem novos hex, sem gradientes, sem sombras decorativas).',
  '/componentes':
    'Biblioteca de componentes do design system Bicofino, com exemplos de uso, anatomia e variantes. Cada componente herda cores, espaçamento e tipografia do sistema — sem regras visuais standalone.',
  '/verticais':
    'Verticais Bicofino — as frentes em que a marca atua (esporte, marcas, talentos, cultura). Cada vertical com seu escopo, critério de entrada e formato de relação.',
  '/operacoes':
    'Operações Bicofino — como o sistema funciona no dia a dia: governança de marca, fluxos de aprovação, vocabulário operacional e cadências.',
  '/governanca':
    'Governança da marca — quem decide o quê, como mudanças no sistema são propostas, revisadas e aplicadas, e como evoluções ficam rastreáveis.',
  '/consigliere':
    'Página dedicada do Consigliere — o copiloto IA do Bicofino. Interface de chat completa, com voz da marca, capaz de responder sobre qualquer parte do universo Bicofino.',
  '/start-here':
    'Página de boas-vindas e orientação inicial. Indica por onde começar a leitura do sistema para diferentes perfis (designer, redator, parceiro, atleta).',
}

export function getPageContext(pathname: string): { key: string; summary: string } {
  const normalized = (pathname || '/').split('?')[0].split('#')[0].replace(/\/$/, '') || '/'
  const key = normalized as PageKey
  const summary = PAGE_CONTEXT[key]

  if (summary) return { key, summary }

  return {
    key: normalized,
    summary: `Rota não mapeada no docs-site. Trate como contexto genérico do Brand & Design System Bicofino. Se o usuário perguntar algo específico da página, peça para ele citar o tópico que está vendo.`,
  }
}
