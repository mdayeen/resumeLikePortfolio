import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mohammed Ayeenuddin Portfolio',
    short_name: 'MdAyeen',
    description: 'Mohammed Ayeenuddin - Full Stack MERN Developer & SaaS Architect',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
