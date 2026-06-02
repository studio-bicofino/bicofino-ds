import type { MediaItem, Category, Status } from './types'
import { DEFAULT_ATHLETE } from './athletes'
import { generateFilename, kindFromMime } from './filename'
import { buildDrivePath } from './destination'

/* Acervo mockado do Salvatore — para o Painel Bicofino já abrir com
   vida. Construído pelos mesmos helpers do fluxo real, então os nomes
   de arquivo e caminhos do Drive são idênticos aos de um envio de verdade. */

interface SeedSpec {
  id: string
  mimeType: string
  originalName: string
  sizeBytes: number
  date: string
  match: string
  competition: string
  category: Category
  tags: string[]
  notes: string | null
  status: Status
  uploadedAt: string
  seq: number
}

const SPECS: SeedSpec[] = [
  {
    id: 'seed-01',
    mimeType: 'video/mp4',
    originalName: 'IMG_4821.mov',
    sizeBytes: 184_320_000,
    date: '2026-05-26',
    match: 'Palmeiras x São Paulo',
    competition: 'Campeonato Paulista',
    category: 'gol',
    tags: ['gol no primeiro tempo', 'finalização'],
    notes: 'Gol de fora da área, canto esquerdo.',
    status: 'aprovado',
    uploadedAt: '2026-05-26T22:14:00.000Z',
    seq: 1,
  },
  {
    id: 'seed-02',
    mimeType: 'image/jpeg',
    originalName: 'DSC09112.jpg',
    sizeBytes: 6_280_000,
    date: '2026-05-26',
    match: 'Palmeiras x São Paulo',
    competition: 'Campeonato Paulista',
    category: 'jogo',
    tags: ['comemoração'],
    notes: null,
    status: 'curadoria',
    uploadedAt: '2026-05-26T22:16:00.000Z',
    seq: 2,
  },
  {
    id: 'seed-03',
    mimeType: 'image/jpeg',
    originalName: 'DSC09140.jpg',
    sizeBytes: 5_910_000,
    date: '2026-05-26',
    match: 'Palmeiras x São Paulo',
    competition: 'Campeonato Paulista',
    category: 'assistencia',
    tags: ['assistência', 'desarme'],
    notes: null,
    status: 'recebido',
    uploadedAt: '2026-05-26T22:17:00.000Z',
    seq: 3,
  },
  {
    id: 'seed-04',
    mimeType: 'video/mp4',
    originalName: 'treino-ct.mp4',
    sizeBytes: 92_160_000,
    date: '2026-05-21',
    match: '',
    competition: 'Treino · CT da Barra Funda',
    category: 'treino',
    tags: ['vídeo de treino', 'aquecimento'],
    notes: 'Trabalho de finalização no fim do treino.',
    status: 'aprovado',
    uploadedAt: '2026-05-21T18:02:00.000Z',
    seq: 1,
  },
  {
    id: 'seed-05',
    mimeType: 'image/jpeg',
    originalName: 'bastidor-onibus.jpg',
    sizeBytes: 4_120_000,
    date: '2026-05-19',
    match: '',
    competition: 'Viagem · Série A',
    category: 'bastidor',
    tags: ['bastidor'],
    notes: null,
    status: 'arquivado',
    uploadedAt: '2026-05-19T11:40:00.000Z',
    seq: 4,
  },
  {
    id: 'seed-06',
    mimeType: 'image/jpeg',
    originalName: 'entrevista-zona-mista.jpg',
    sizeBytes: 3_980_000,
    date: '2026-05-12',
    match: 'São Paulo x Corinthians',
    competition: 'Campeonato Paulista',
    category: 'entrevista',
    tags: [],
    notes: 'Zona mista pós-jogo.',
    status: 'recebido',
    uploadedAt: '2026-05-12T23:05:00.000Z',
    seq: 5,
  },
]

export function buildSeedItems(): MediaItem[] {
  const a = DEFAULT_ATHLETE
  return SPECS.map((s) => {
    const kind = kindFromMime(s.mimeType)
    const filename = generateFilename({
      athlete: a,
      date: s.date,
      match: s.match,
      competition: s.competition,
      category: s.category,
      mimeType: s.mimeType,
      originalName: s.originalName,
      seq: s.seq,
    })
    return {
      id: s.id,
      athleteSlug: a.slug,
      athleteName: a.name,
      kind,
      filename,
      originalName: s.originalName,
      mimeType: s.mimeType,
      sizeBytes: s.sizeBytes,
      date: s.date,
      match: s.match || null,
      competition: s.competition || null,
      category: s.category,
      tags: s.tags,
      notes: s.notes,
      status: s.status,
      drivePath: buildDrivePath(a, kind, filename),
      uploadedAt: s.uploadedAt,
    }
  })
}
