/**
 * Allowlist de emails autorizados a entrar via magic link.
 * Fonte: env var CASA_NOSTRA_ALLOWLIST (lista separada por vírgula).
 */
export function getAllowlist(): string[] {
  const raw = process.env.CASA_NOSTRA_ALLOWLIST ?? ''
  return raw
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowed(email: string): boolean {
  return getAllowlist().includes(email.trim().toLowerCase())
}
