export type NavItem = {
  id: string
  label: string
}

export type NavGroup = {
  chapter: string
  id: string
  title: string
  items: NavItem[]
}

export const NAV: NavGroup[] = [
  {
    chapter: '01',
    id: 'brand-system',
    title: 'Brand System',
    items: [
      { id: 'fundamentos', label: 'Fundamentos' },
      { id: 'posicionamento', label: 'Posicionamento' },
      { id: 'nucleo', label: 'Núcleo da Marca' },
      { id: 'verbal', label: 'Universo Verbal' },
    ],
  },
  {
    chapter: '02',
    id: 'visual-system',
    title: 'Visual System',
    items: [
      { id: 'colors', label: 'Color Palette' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing-motion', label: 'Spacing & Motion' },
      { id: 'logo', label: 'Logo System' },
      { id: 'voice-tone', label: 'Voice & Tone' },
    ],
  },
  {
    chapter: '03',
    id: 'components',
    title: 'Components',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'cards', label: 'Cards' },
      { id: 'charts', label: 'Charts' },
      { id: 'forms', label: 'Forms' },
      { id: 'badges', label: 'Badges' },
      { id: 'feedback', label: 'Feedback' },
    ],
  },
  {
    chapter: '04',
    id: 'verticais',
    title: 'Verticais',
    items: [
      { id: 'on-field', label: 'On-Field' },
      { id: 'off-field', label: 'Off-Field' },
    ],
  },
  {
    chapter: '05',
    id: 'assets',
    title: 'Assets',
    items: [
      { id: 'performance', label: 'Performance Intelligence' },
      { id: 'sponsors', label: 'Sponsors' },
      { id: 'icons', label: 'Icons' },
    ],
  },
  {
    chapter: '06',
    id: 'operacoes',
    title: 'Operações',
    items: [
      { id: 'arquitetura', label: 'Arquitetura' },
      { id: 'delivery', label: 'Delivery' },
    ],
  },
  {
    chapter: '07',
    id: 'governanca',
    title: 'Governança',
    items: [
      { id: 'ownership', label: 'Ownership' },
      { id: 'resources', label: 'Resources' },
    ],
  },
]

export const ALL_SECTION_IDS = NAV.flatMap((g) => g.items.map((i) => i.id))
