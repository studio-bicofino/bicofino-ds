// DS v3.1 — Phase 1 content fragments.
// Each new section ships its own flat i18n dict (br/en/it); they are merged
// into the root dicts in ../index.ts. Sidebar nav labels for the new anchors
// live here too, keyed `nav.*` to match the existing Sidebar convention.

import { cornerLanguagesI18n } from './cornerLanguages'
import { oneVibrantI18n } from './oneVibrant'
import { bentoDataI18n } from './bentoData'
import { grafismoTecnicoI18n } from './grafismoTecnico'
import { postSystemI18n } from './postSystem'
import { intervencaoCorI18n } from './intervencaoCor'

const navLabels = {
  br: {
    'nav.corners':     'Cantos',
    'nav.vibrant':     'Um Vibrante',
    'nav.bento':       'Bento de Dados',
    'nav.grafismo':    'Grafismo Técnico',
    'nav.postsys':     'Post-System 60/40',
    'nav.intervencao': 'Intervenção de Cor',
  },
  en: {
    'nav.corners':     'Corners',
    'nav.vibrant':     'One Vibrant',
    'nav.bento':       'Data Bento',
    'nav.grafismo':    'Technical Schematic',
    'nav.postsys':     'Post-System 60/40',
    'nav.intervencao': 'Color Intervention',
  },
  it: {
    'nav.corners':     'Angoli',
    'nav.vibrant':     'Un Vibrante',
    'nav.bento':       'Bento di Dati',
    'nav.grafismo':    'Grafismo Tecnico',
    'nav.postsys':     'Post-System 60/40',
    'nav.intervencao': 'Intervento di Colore',
  },
} as const

export const fase1 = {
  br: {
    ...cornerLanguagesI18n.br,
    ...oneVibrantI18n.br,
    ...bentoDataI18n.br,
    ...grafismoTecnicoI18n.br,
    ...postSystemI18n.br,
    ...intervencaoCorI18n.br,
    ...navLabels.br,
  },
  en: {
    ...cornerLanguagesI18n.en,
    ...oneVibrantI18n.en,
    ...bentoDataI18n.en,
    ...grafismoTecnicoI18n.en,
    ...postSystemI18n.en,
    ...intervencaoCorI18n.en,
    ...navLabels.en,
  },
  it: {
    ...cornerLanguagesI18n.it,
    ...oneVibrantI18n.it,
    ...bentoDataI18n.it,
    ...grafismoTecnicoI18n.it,
    ...postSystemI18n.it,
    ...intervencaoCorI18n.it,
    ...navLabels.it,
  },
}
