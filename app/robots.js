import { SITE_URL } from '@/lib/seo';

/**
 * Genera /robots.txt.
 * Se indexa todo salvo la API y las páginas legales (no aportan tráfico y
 * diluyen el presupuesto de rastreo).
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/legal/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
