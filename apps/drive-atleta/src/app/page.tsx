import { redirect } from 'next/navigation'
import { DEFAULT_ATHLETE } from '@/lib/athletes'

/* A raiz encaminha para o link do atleta-mockup. Na Fase 4, cada atleta
   recebe seu próprio /a/<slug> e esta rota pode virar um seletor interno. */
export default function Home() {
  redirect(`/a/${DEFAULT_ATHLETE.slug}`)
}
