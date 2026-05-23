import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { buildSystemPrompt, type Lang } from '@/lib/consigliere/system-prompt'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const MODEL_ID = process.env.CONSIGLIERE_MODEL ?? 'google/gemma-4-31b-it:free'

interface ChatRequestBody {
  messages: UIMessage[]
  pageContext?: {
    key?: string
    lang?: Lang
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: 'OPENROUTER_API_KEY is not configured.' },
      { status: 500 },
    )
  }

  let body: ChatRequestBody
  try {
    body = (await req.json()) as ChatRequestBody
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: 'messages must be a non-empty array.' }, { status: 400 })
  }

  const openrouter = createOpenRouter({ apiKey })
  const system = buildSystemPrompt({
    pageKey: body.pageContext?.key,
    lang: body.pageContext?.lang,
  })

  const modelMessages = await convertToModelMessages(body.messages)

  const result = streamText({
    model: openrouter.chat(MODEL_ID),
    system,
    messages: modelMessages,
    temperature: 0.4,
  })

  return result.toUIMessageStreamResponse()
}
