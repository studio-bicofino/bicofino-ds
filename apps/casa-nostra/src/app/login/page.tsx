import { Suspense } from 'react'
import { LoginForm } from './LoginForm'

export const metadata = { title: 'Entrar — Casa Nostra' }

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--bf-bg-page)',
      }}
    >
      <Suspense>
        <LoginFormWrapper searchParams={searchParams} />
      </Suspense>
    </main>
  )
}

async function LoginFormWrapper({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const params = await searchParams
  return <LoginForm next={params.next} initialError={params.error} />
}
