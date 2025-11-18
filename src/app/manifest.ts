import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arian Saeed Industrial Group Inc.',
    short_name: 'ASIGI',
    description: 'A value-driven company established in 1982, operating 32 companies across wood-based panels, petrochemicals, trade, AI, construction, investment, and many other industries.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#76193A',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
