import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/google'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* GET /api/thumb?id=<driveFileId>
   Proxy de miniatura: os arquivos vivem num Shared Drive privado, então o
   navegador não os acessa direto. O servidor pega o thumbnailLink do Drive
   (baixa resolução) com o token de serviço e devolve a imagem. O Painel usa
   <img src="/api/thumb?id=…">. ~10–30KB por foto. */

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id')
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return NextResponse.json({ error: 'id inválido' }, { status: 400 })
  }

  try {
    const token = await getAccessToken()
    const auth = { Authorization: `Bearer ${token}` }

    const metaRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${id}?fields=thumbnailLink&supportsAllDrives=true`,
      { headers: auth, cache: 'no-store' },
    )
    if (!metaRes.ok) return new NextResponse(null, { status: metaRes.status })
    const { thumbnailLink } = (await metaRes.json()) as { thumbnailLink?: string }
    if (!thumbnailLink) return new NextResponse(null, { status: 404 })

    // Sobe a resolução do thumbnail (default ~s220) p/ caber no card em retina.
    const url = thumbnailLink.replace(/=s\d+$/, '=s640')
    const imgRes = await fetch(url, { headers: auth, cache: 'no-store' })
    if (!imgRes.ok) return new NextResponse(null, { status: imgRes.status })

    const buf = await imgRes.arrayBuffer()
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'content-type': imgRes.headers.get('content-type') ?? 'image/jpeg',
        // Cache só no navegador (imagem privada do atleta) por 1h.
        'cache-control': 'private, max-age=3600',
      },
    })
  } catch {
    return new NextResponse(null, { status: 502 })
  }
}
