/* ─────────────────────────────────────────────────────────────
   Atletas como configuração — cada um tem sua rota /a/[slug] e a
   raiz `/` é um hub que lista todos. `driveFolder` espelha EXATAMENTE
   o nome da pasta em CENTRAL BICOFINO / ATLETAS / <driveFolder>
   (acentos inclusos). Adicionar atleta = uma entrada neste array.
   ───────────────────────────────────────────────────────────── */

export interface Athlete {
  slug: string
  /** Nome completo de exibição. */
  name: string
  /** Primeiro nome — vira o token do nome do arquivo (SALVATORE_…). */
  firstName: string
  /** Pasta no Drive — espelha CENTRAL BICOFINO/ATLETAS/<driveFolder>. */
  driveFolder: string
  position?: string
  club?: string
  /** Accent fixo opcional (hex). Sem isto, a casa sorteia um vibrante. */
  accent?: string
}

export const ATHLETES: Athlete[] = [
  { slug: 'eloi-gomez-saus', name: 'Eloi Gómez Saus', firstName: 'Eloi', driveFolder: 'ELOI GÓMEZ SAUS' },
  { slug: 'gabriel-mendes', name: 'Gabriel Mendes', firstName: 'Gabriel', driveFolder: 'GABRIEL MENDES' },
  { slug: 'guilherme-kerchner', name: 'Guilherme Kerchner', firstName: 'Guilherme', driveFolder: 'GUILHERME KERCHNER' },
  { slug: 'jean-jesus', name: 'Jean Jesus', firstName: 'Jean', driveFolder: 'JEAN JESUS' },
  { slug: 'joao-kheirallah', name: 'João Kheirallah', firstName: 'João', driveFolder: 'JOÃO KHEIRALLAH' },
  { slug: 'joaquim-miranda', name: 'Joaquim Miranda', firstName: 'Joaquim', driveFolder: 'JOAQUIM MIRANDA' },
  { slug: 'julio-cezar', name: 'Julio Cezar', firstName: 'Julio', driveFolder: 'JULIO CEZAR' },
  { slug: 'lucas-henrique', name: 'Lucas Henrique', firstName: 'Lucas', driveFolder: 'LUCAS HENRIQUE' },
  { slug: 'luigi-brancatelli', name: 'Luigi Brancatelli', firstName: 'Luigi', driveFolder: 'LUIGI BRANCATELLI' },
  { slug: 'pedro-cialone', name: 'Pedro Cialone', firstName: 'Pedro', driveFolder: 'PEDRO CIALONE' },
  { slug: 'rhian-marinho', name: 'Rhian Marinho', firstName: 'Rhian', driveFolder: 'RHIAN MARINHO' },
  { slug: 'ronaldo-prado', name: 'Ronaldo Prado', firstName: 'Ronaldo', driveFolder: 'RONALDO PRADO' },
  {
    slug: 'salvatore-brancatelli',
    name: 'Salvatore Brancatelli',
    firstName: 'Salvatore',
    driveFolder: 'SALVATORE BRANCATELLI',
    position: 'Winger',
    club: 'Benfica',
  },
  { slug: 'yuri-lima', name: 'Yuri Lima', firstName: 'Yuri', driveFolder: 'YURI LIMA' },
]

export const DEFAULT_ATHLETE = ATHLETES[0]

export function getAthlete(slug: string): Athlete | undefined {
  return ATHLETES.find((a) => a.slug === slug)
}
