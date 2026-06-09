import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { shareAnyone } from '@/lib/drive'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* POST /api/share — torna o arquivo do Drive acessível por "qualquer um com o
   link" e devolve a URL aberta. Só do painel interno (service role). */
export async function POST(req: Request) {
  let id: string
  try {
    ({ id } = (await req.json()) as { id: string })
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }
  if (!id) return NextResponse.json({ error: 'id é obrigatório.' }, { status: 400 })

  const { data, error } = await supabaseAdmin()
    .from('media_items')
    .select('drive_file_id, web_view_link')
    .eq('id', id)
    .single()
  if (error || !data?.drive_file_id) {
    return NextResponse.json({ error: 'Arquivo não encontrado.' }, { status: 404 })
  }

  await shareAnyone(data.drive_file_id)
  const url = data.web_view_link ?? `https://drive.google.com/file/d/${data.drive_file_id}/view`
  return NextResponse.json({ url })
}
