import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin/*', '/login', '/auth/', '/api/'],
      },
    ],
    sitemap: 'https://www.orionjech7.site/sitemap.xml',
  }
}
