import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohammed Ayeenuddin Portfolio',
    short_name: 'MdAyeen',
    description: 'Mohammed Ayeenuddin - Full Stack Developer & SaaS Architect',
    start_url: '/',
    display: 'standalone',
    background_color: '#111311',
    theme_color: '#111311',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
