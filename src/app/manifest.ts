import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Opsight - AI-Powered Business Analytics Dashboard',
    short_name: 'Opsight',
    description: 'Transform your business data into actionable insights with AI-powered analytics dashboards. Real-time KPIs, custom visualizations, and automated reporting.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ec4899',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity', 'analytics'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
