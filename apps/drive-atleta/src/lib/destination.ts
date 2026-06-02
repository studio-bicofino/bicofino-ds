import type { Athlete } from './athletes'
import type { MediaKind } from './types'

/* ─────────────────────────────────────────────────────────────
   Caminho de destino no Shared Drive CENTRAL BICOFINO:
     CENTRAL BICOFINO / ATLETAS / SALVATORE BRANCATELLI / FOTOS
                                                        / VIDEOS
   FOTOS x VIDEOS é derivado do tipo do arquivo (kindFromMime),
   nunca de um campo manual.

   Duas vistas do mesmo caminho:
   • DRIVE_DISPLAY_ROOT → breadcrumb humano (inclui o nome do drive).
   • driveSegments()     → segmentos a resolver via API, SOB o driveId
     (a raiz é o próprio Shared Drive, então NÃO entra como segmento).
   ───────────────────────────────────────────────────────────── */

/** Nome do Shared Drive — só para exibição/breadcrumb. */
export const DRIVE_DISPLAY_ROOT = ['CENTRAL BICOFINO', 'ATLETAS'] as const

export function kindFolder(kind: MediaKind): 'FOTOS' | 'VIDEOS' {
  return kind === 'video' ? 'VIDEOS' : 'FOTOS'
}

/** Segmentos a resolver dentro do driveId (sem o nome do drive). */
export function driveSegments(athlete: Athlete, kind: MediaKind): string[] {
  return ['ATLETAS', athlete.driveFolder, kindFolder(kind)]
}

/** Segmentos da árvore p/ breadcrumb (com o nome do drive), sem o arquivo. */
export function destinationFolder(athlete: Athlete, kind: MediaKind): string[] {
  return [...DRIVE_DISPLAY_ROOT, athlete.driveFolder, kindFolder(kind)]
}

/** Caminho completo de exibição, incluindo o arquivo. */
export function buildDrivePath(
  athlete: Athlete,
  kind: MediaKind,
  filename: string,
): string {
  return [...destinationFolder(athlete, kind), filename].join(' / ')
}
