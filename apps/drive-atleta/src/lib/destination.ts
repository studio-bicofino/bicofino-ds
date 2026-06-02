import type { Athlete } from './athletes'
import type { MediaKind } from './types'

/* ─────────────────────────────────────────────────────────────
   Caminho de destino no Drive — espelha a árvore real:
     BICOFINO / ATLETAS / SALVATORE BRANCATELLI / FOTOS
                                                / VIDEOS
   FOTOS x VIDEOS é derivado do tipo do arquivo (kindFromMime),
   nunca de um campo manual. Na Fase 3 isto vira o destino real
   da Google Drive API (createFolderPath + upload).
   ───────────────────────────────────────────────────────────── */

export const DRIVE_ROOT = ['BICOFINO', 'ATLETAS'] as const

export function kindFolder(kind: MediaKind): 'FOTOS' | 'VIDEOS' {
  return kind === 'video' ? 'VIDEOS' : 'FOTOS'
}

/** Segmentos da árvore, sem o arquivo — útil para breadcrumbs. */
export function destinationFolder(athlete: Athlete, kind: MediaKind): string[] {
  return [...DRIVE_ROOT, athlete.driveFolder, kindFolder(kind)]
}

/** Caminho completo incluindo o arquivo. */
export function buildDrivePath(
  athlete: Athlete,
  kind: MediaKind,
  filename: string,
): string {
  return [...destinationFolder(athlete, kind), filename].join(' / ')
}
