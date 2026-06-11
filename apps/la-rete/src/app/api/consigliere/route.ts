import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { TAGS } from '@/lib/data/tags'
import type { Trend } from '@/lib/data/types'

/**
 * O CONSIGLIERE — leitura de material externo com os olhos da casa.
 *
 * Dois modos, decididos pela presença de ANTHROPIC_API_KEY:
 *   IA      → Claude (Haiku por padrão; CONSIGLIERE_MODEL sobrescreve) lê o
 *             material e devolve uma Trend estruturada (json_schema com os
 *             nomes de tag do canon como enum — hooks inválidos são impossíveis).
 *   léxico  → sem chave, devolve a extração bruta e o cliente roda o léxico
 *             local (lib/engine/lexicon.ts). O app nunca quebra.
 *
 * Entradas:
 *   POST JSON      {url} ou {text}  — link de notícia ou texto colado
 *   POST FormData  file (pdf|imagem) + note — exige a chave (Claude lê nativo)
 */

const MODEL = process.env.CONSIGLIERE_MODEL ?? 'claude-haiku-4-5'

const TAG_NAMES = TAGS.map((t) => t.name)

/* shape exato de Trend (menos id/observedAt, que o servidor carimba) */
const TREND_SCHEMA = {
  type: 'object' as const,
  additionalProperties: false,
  properties: {
    title: { type: 'string', description: 'Título curto da leitura, PT-BR' },
    summary: {
      type: 'string',
      description:
        'Resumo em 2–3 frases, voz sóbria: sem hype, sem emoji, sem superlativo, nunca "Não é X, é Y".',
    },
    sectors: {
      type: 'array',
      items: { type: 'string' },
      description: 'Até 3 setores em maiúsculas, ex.: AGRO, FINTECH, ITÁLIA',
    },
    hooks: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          tagName: { type: 'string', enum: TAG_NAMES },
          weight: { type: 'number', description: '0.2 a 1.0 — força da aderência' },
        },
        required: ['tagName', 'weight'],
      },
      description: '3 a 6 tags do canon que esta leitura acende na rede',
    },
  },
  required: ['title', 'summary', 'sectors', 'hooks'],
}

const SYSTEM = `Você é o Consigliere da Bicofino. A casa mantém uma rede de membros (Casa Nostra) etiquetados com as tags do canon. Seu trabalho: ler o material recebido (notícia, análise de mercado, gráfico, transcript) e devolver a leitura estruturada — que temas do canon esse material acende, com que força, e um resumo na voz da casa: sóbrio, concreto, sem hype, sem emoji, sem superlativos. Hooks: escolha SÓ tags que o material realmente sustenta; pesos 0.2–1.0 relativos entre si. Se o material for irrelevante para a rede, devolva hooks vazio.`

function hasKey() {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

async function readWithClaude(
  blocks: Anthropic.ContentBlockParam[],
  source: string,
): Promise<Trend> {
  const client = new Anthropic()
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    system: SYSTEM,
    output_config: { format: { type: 'json_schema', schema: TREND_SCHEMA } },
    messages: [{ role: 'user', content: blocks }],
  })

  const text = response.content.find((b) => b.type === 'text')?.text ?? '{}'
  const parsed = JSON.parse(text) as Pick<Trend, 'title' | 'summary' | 'sectors' | 'hooks'>

  /* cinto e suspensório: o enum já restringe, mas validamos mesmo assim */
  const valid = new Set(TAG_NAMES)
  const hooks = (parsed.hooks ?? [])
    .filter((h) => valid.has(h.tagName))
    .map((h) => ({ tagName: h.tagName, weight: Math.min(1, Math.max(0.2, h.weight)) }))
    .slice(0, 6)

  const observedAt = new Date().toISOString().slice(0, 10)
  return {
    id: `tr-consigliere-${Math.abs(hashOf(parsed.title + observedAt))}`,
    title: parsed.title.slice(0, 120),
    source,
    observedAt,
    summary: parsed.summary,
    hooks,
    sectors: (parsed.sectors ?? []).slice(0, 3),
  }
}

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') ?? ''

  /* ── arquivo (PDF / imagem de gráfico) — só no modo IA ─────────────── */
  if (contentType.includes('multipart/form-data')) {
    if (!hasKey()) {
      return NextResponse.json(
        { error: 'leitura de arquivo exige a chave da Anthropic (ANTHROPIC_API_KEY) no ambiente' },
        { status: 503 },
      )
    }
    const form = await req.formData()
    const file = form.get('file')
    const note = String(form.get('note') ?? '')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'arquivo ausente' }, { status: 400 })
    }
    if (file.size > 8_000_000) {
      return NextResponse.json({ error: 'arquivo acima de 8MB' }, { status: 413 })
    }
    const data = Buffer.from(await file.arrayBuffer()).toString('base64')

    const blocks: Anthropic.ContentBlockParam[] = []
    if (file.type === 'application/pdf') {
      blocks.push({
        type: 'document',
        source: { type: 'base64', media_type: 'application/pdf', data },
      })
    } else if (['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
      blocks.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: file.type as 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif',
          data,
        },
      })
    } else {
      return NextResponse.json({ error: `formato não suportado: ${file.type}` }, { status: 415 })
    }
    blocks.push({
      type: 'text',
      text: note ? `Contexto de quem enviou: ${note}` : 'Leia este material para a casa.',
    })

    try {
      const trend = await readWithClaude(blocks, `Consigliere · ${file.name}`)
      return NextResponse.json({ mode: 'ia', trend })
    } catch {
      return NextResponse.json({ error: 'a leitura com IA falhou — tente de novo' }, { status: 502 })
    }
  }

  /* ── JSON: {url} ou {text} ─────────────────────────────────────────── */
  let url = ''
  let pastedText = ''
  try {
    const body = await req.json()
    url = String(body.url ?? '')
    pastedText = String(body.text ?? '')
  } catch {
    return NextResponse.json({ error: 'corpo inválido' }, { status: 400 })
  }

  /* texto colado (notícia, transcript de vídeo…) */
  if (pastedText) {
    if (!hasKey()) {
      return NextResponse.json({ mode: 'lexico' })
    }
    try {
      const trend = await readWithClaude(
        [{ type: 'text', text: pastedText.slice(0, 30_000) }],
        'Consigliere · texto colado',
      )
      return NextResponse.json({ mode: 'ia', trend })
    } catch {
      return NextResponse.json({ mode: 'lexico' })
    }
  }

  if (!/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: 'url inválida' }, { status: 400 })
  }

  try {
    const extracted = await extractFromUrl(url)
    if (hasKey()) {
      try {
        const trend = await readWithClaude(
          [
            {
              type: 'text',
              text: `TÍTULO: ${extracted.title}\nDESCRIÇÃO: ${extracted.description}\nTEXTO:\n${extracted.text}`,
            },
          ],
          extracted.source,
        )
        return NextResponse.json({ mode: 'ia', trend })
      } catch {
        /* IA caiu → devolve extração pro léxico local */
      }
    }
    return NextResponse.json({ mode: 'lexico', ...extracted })
  } catch {
    return NextResponse.json(
      { error: 'não consegui ler o link (timeout, bloqueio ou paywall)' },
      { status: 502 },
    )
  }
}

/* ── extração de página, server-side (sem CORS) ──────────────────────── */

async function extractFromUrl(url: string) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`status ${res.status}`)
  const html = (await res.text()).slice(0, 600_000)

  const title =
    match(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ??
    match(html, /<title[^>]*>([^<]+)<\/title>/i) ??
    url

  const description =
    match(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ??
    match(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ??
    ''

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(nav|header|footer|aside)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, 6_000)

  const host = new URL(url).hostname.replace(/^www\./, '')
  return { title: decode(title), description: decode(description), text, source: host }
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

function hashOf(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return h
}
