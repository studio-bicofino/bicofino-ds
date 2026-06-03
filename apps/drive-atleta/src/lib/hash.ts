/* SHA-256 dos bytes do arquivo, em hex — a "impressão digital" usada para
   detectar reenvio do arquivo idêntico. Roda no navegador (Web Crypto). */
export async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer()
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
