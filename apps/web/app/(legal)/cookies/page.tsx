'use client'

import { LegalPageBody } from '@/components/legal/LegalPageBody'
import { cookies } from '@/content/legal'

export default function CookiesPage() {
  return <LegalPageBody doc={cookies} />
}
