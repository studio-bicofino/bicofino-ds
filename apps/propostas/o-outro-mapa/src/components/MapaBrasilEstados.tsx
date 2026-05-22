import type { CSSProperties } from 'react'

type Categoria = 'A' | 'B' | 'C'

interface Estado {
  nome: string
  cat: Categoria
  path: string
}

const ESTADOS: Record<string, Estado> = {
  // Categoria A — Pacote inicial (14 estados)
  RR: { nome: 'Roraima',             cat: 'A', path: 'M 230,40 L 280,38 L 315,75 L 300,120 L 255,132 L 210,105 L 215,65 Z' },
  AM: { nome: 'Amazonas',            cat: 'A', path: 'M 85,80 L 215,68 L 290,90 L 305,125 L 295,255 L 230,305 L 145,295 L 80,248 L 68,155 Z' },
  RO: { nome: 'Rondônia',            cat: 'A', path: 'M 138,295 L 255,288 L 272,365 L 215,405 L 128,382 Z' },
  AC: { nome: 'Acre',                cat: 'A', path: 'M 65,345 L 138,298 L 215,378 L 182,422 L 88,415 L 58,382 Z' },
  MT: { nome: 'Mato Grosso',         cat: 'A', path: 'M 255,292 L 422,285 L 452,402 L 445,495 L 342,522 L 232,495 L 215,412 L 255,362 Z' },
  TO: { nome: 'Tocantins',           cat: 'A', path: 'M 445,222 L 535,218 L 558,315 L 525,385 L 445,385 L 422,302 Z' },
  PI: { nome: 'Piauí',               cat: 'A', path: 'M 582,92 L 645,110 L 655,182 L 598,232 L 535,218 L 535,162 L 572,130 Z' },
  PB: { nome: 'Paraíba',             cat: 'A', path: 'M 665,178 L 748,165 L 748,198 L 695,212 L 645,208 L 643,186 Z' },
  PE: { nome: 'Pernambuco',          cat: 'A', path: 'M 595,208 L 748,200 L 750,232 L 682,258 L 582,252 L 572,235 Z' },
  AL: { nome: 'Alagoas',             cat: 'A', path: 'M 682,258 L 748,248 L 752,280 L 705,290 L 668,278 Z' },
  SE: { nome: 'Sergipe',             cat: 'A', path: 'M 662,282 L 705,275 L 715,305 L 682,315 L 658,302 Z' },
  BA: { nome: 'Bahia',               cat: 'A', path: 'M 552,252 L 705,262 L 725,362 L 685,475 L 602,515 L 522,515 L 512,442 L 522,362 Z' },
  MS: { nome: 'Mato Grosso do Sul',  cat: 'A', path: 'M 232,495 L 402,492 L 422,582 L 362,635 L 252,615 L 222,555 Z' },
  ES: { nome: 'Espírito Santo',      cat: 'A', path: 'M 652,502 L 692,492 L 702,552 L 672,572 L 642,548 Z' },

  // Categoria B — Expansão futura (9 estados)
  AP: { nome: 'Amapá',               cat: 'B', path: 'M 315,38 L 375,25 L 405,80 L 365,112 L 315,100 Z' },
  PA: { nome: 'Pará',                cat: 'B', path: 'M 310,88 L 500,58 L 545,100 L 515,200 L 445,265 L 365,272 L 295,255 L 305,160 Z' },
  MA: { nome: 'Maranhão',            cat: 'B', path: 'M 500,62 L 585,88 L 595,162 L 535,215 L 445,222 L 445,162 L 482,132 Z' },
  CE: { nome: 'Ceará',               cat: 'B', path: 'M 642,98 L 705,110 L 715,172 L 665,202 L 602,202 L 592,162 L 638,128 Z' },
  RN: { nome: 'Rio Grande do Norte', cat: 'B', path: 'M 705,110 L 748,122 L 748,162 L 705,178 L 665,170 L 665,138 Z' },
  GO: { nome: 'Goiás',               cat: 'B', path: 'M 432,375 L 562,368 L 572,462 L 512,515 L 422,515 L 402,452 Z' },
  DF: { nome: 'Distrito Federal',    cat: 'B', path: 'M 512,432 L 532,432 L 537,452 L 515,458 Z' },
  SC: { nome: 'Santa Catarina',      cat: 'B', path: 'M 292,722 L 432,718 L 442,762 L 382,792 L 282,778 L 265,748 Z' },
  PR: { nome: 'Paraná',              cat: 'B', path: 'M 272,622 L 422,602 L 472,672 L 432,722 L 302,722 L 252,672 Z' },

  // Categoria C — Big 4 (ocupados)
  SP: { nome: 'São Paulo',           cat: 'C', path: 'M 352,562 L 512,542 L 552,612 L 502,682 L 382,682 L 332,632 Z' },
  RJ: { nome: 'Rio de Janeiro',      cat: 'C', path: 'M 582,582 L 652,562 L 668,602 L 622,628 L 578,612 Z' },
  MG: { nome: 'Minas Gerais',        cat: 'C', path: 'M 442,462 L 625,452 L 665,535 L 612,615 L 492,635 L 422,602 L 402,542 Z' },
  RS: { nome: 'Rio Grande do Sul',   cat: 'C', path: 'M 242,772 L 392,758 L 412,845 L 372,882 L 272,882 L 218,842 Z' },
}

function baseStyle(cat: Categoria): CSSProperties {
  if (cat === 'A') return { fill: 'var(--current-accent)', opacity: 0.75, stroke: 'var(--bf-bg-page)', strokeWidth: 1 }
  if (cat === 'B') return { fill: '#a8c9e5',               opacity: 0.55, stroke: 'var(--bf-bg-page)', strokeWidth: 1 }
  return                  { fill: '#6d7886',               opacity: 0.4,  stroke: 'var(--bf-bg-page)', strokeWidth: 1 }
}

export function MapaBrasilEstados() {
  return (
    <svg
      viewBox="0 0 800 900"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-label="Mapa do Brasil com estados do pacote O Outro Mapa"
      role="img"
    >
      {Object.entries(ESTADOS).map(([uf, estado]) => (
        <path
          key={uf}
          d={estado.path}
          className={`estado-${estado.cat.toLowerCase()}`}
          style={baseStyle(estado.cat)}
          aria-label={`${estado.nome} — ${estado.cat === 'A' ? 'Pacote inicial' : estado.cat === 'B' ? 'Expansão futura' : 'Big 4 (ocupado)'}`}
        />
      ))}
    </svg>
  )
}
