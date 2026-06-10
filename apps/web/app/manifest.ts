import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bicofino',
    short_name: 'Bicofino',
    description: 'Bicofino Group — Unlike Any Other.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff', // --bf-bg-page
    theme_color: '#061015', // --bf-power-black
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon.png', sizes: '256x256', type: 'image/png' },
    ],
  }
}
