import { notFound } from 'next/navigation'
import { ATHLETES, getAthlete } from '@/lib/athletes'
import { UploadFlow } from '@/components/UploadFlow'

/* Link individual do atleta. Na Fase 1 só o Salvatore existe; a forma
   já está pronta para a Fase 4 (um link/rota por atleta). */
export function generateStaticParams() {
  return ATHLETES.map((a) => ({ slug: a.slug }))
}

export default async function AthletePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const athlete = getAthlete(slug)
  if (!athlete) notFound()
  return <UploadFlow athlete={athlete} />
}
