import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { isAuthBypassed } from '@/lib/auth/session'

type SetCookie = { name: string; value: string; options?: CookieOptions }

/**
 * Middleware Supabase SSR — mantém sessão fresca a cada request.
 * Não bloqueia rotas (allowlist é decidida em /login). Apenas:
 *  - Refresca token quando perto de expirar
 *  - Propaga cookies atualizados pro browser
 *  - Redireciona pra /login se usuário não autenticado tentar acessar área protegida
 *
 * Em CASA_NOSTRA_AUTH_BYPASS=1 (período de construção): early return — sem
 * sessão, sem redirect, sem refresh. Religar removendo a env var.
 */
export async function middleware(request: NextRequest) {
  if (isAuthBypassed()) {
    return NextResponse.next({ request })
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: SetCookie[]) {
          cookiesToSet.forEach(({ name, value }: SetCookie) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }: SetCookie) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/auth')
  const isPublicAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico)$/)

  if (!user && !isAuthRoute && !isPublicAsset) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Tudo exceto:
     *  - _next/static, _next/image
     *  - favicon, arquivos com extensão estática
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
