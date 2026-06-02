'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button type="button" className="btn no-print" onClick={() => window.print()}>
      <Printer size={16} strokeWidth={1.5} />
      Exportar PDF
    </button>
  )
}
