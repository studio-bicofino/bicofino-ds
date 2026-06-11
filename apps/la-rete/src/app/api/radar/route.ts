import { NextResponse } from 'next/server'

/**
 * GET de leitura do Radar: busca a URL server-side (sem CORS) e devolve
 * título + descrição + texto bruto para o léxico do cliente.
 *
 * PRÓXIMA FASE (IA): este endpoint passa a chamar um modelo via AI Gateway
 * com structured output no shape de Trend — a extração abaixo vira o
 * contexto do prompt. A página já consome a mesma resposta.
 */
export async function POST(req: Request) {
  let url: string
  try {
    const body = await req.json()
    url = String(body.url ?? '')
  } catch {
    return NextResponse.json({ error: 'corpo inválido' }, { status: 400 })
  }

  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: 'url inválida' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    })
    if (!res.ok) {
      return NextResponse.json(
        { error: `a página respondeu ${res.status}` },
        { status: 502 },
      )
    }
    const html = (await res.text()).slice(0, 600_000)

    const title =
      match(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ??
      match(html, /<title[^>]*>([^<]+)<\/title>/i) ??
      url

    const description =
      match(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ??
      match(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ??
      ''

    /* corpo: remove script/style/nav, derruba tags, fica com os primeiros ~6k chars */
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<(nav|header|footer|aside)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 6_000)

    const host = new URL(url).hostname.replace(/^www\./, '')

    return NextResponse.json({
      title: decode(title),
      description: decode(description),
      text,
      source: host,
    })
  } catch {
    return NextResponse.json(
      { error: 'não consegui ler o link (timeout, bloqueio ou paywall)' },
      { status: 502 },
    )
  }
}

function match(html: string, re: RegExp): string | null {
  const m = html.match(re)
  return m ? m[1].trim() : null
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}
