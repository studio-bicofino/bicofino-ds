/* ─────────────────────────────────────────────────────────────
   Atletas como configuração — a forma já está pronta para a Fase 4
   (links individuais por atleta). Cada atleta tem sua rota /a/[slug].
   O mock traz só o Salvatore; adicionar outro é um item neste array.
   ───────────────────────────────────────────────────────────── */

export interface Athlete {
  slug: string
  /** Nome completo de exibição. */
  name: string
  /** Primeiro nome — vira o token do nome do arquivo (SALVATORE_…). */
  firstName: string
  /** Pasta no Drive — espelha BICOFINO/ATLETAS/<driveFolder>. */
  driveFolder: string
  position?: string
  club?: string
  /** Accent fixo opcional (hex). Sem isto, a casa sorteia um vibrante. */
  accent?: string
}

export const ATHLETES: Athlete[] = [
  {
    slug: 'salvatore-brancatelli',
    name: 'Salvatore Brancatelli',
    firstName: 'Salvatore',
    driveFolder: 'SALVATORE BRANCATELLI',
    position: 'Winger',
    club: 'Benfica',
  },
]

export const DEFAULT_ATHLETE = ATHLETES[0]

export function getAthlete(slug: string): Athlete | undefined {
  return ATHLETES.find((a) => a.slug === slug)
}
