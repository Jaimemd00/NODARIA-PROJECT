import { SITE_URL, paginas } from '@/lib/seo';

/**
 * Genera /sitemap.xml solo con las páginas indexables.
 * Las legales quedan fuera a propósito (van con noindex).
 */
export default function sitemap() {
  const ahora = new Date();

  const prioridades = {
    '/': 1,
    '/servicios': 0.9,
    '/contacto': 0.8,
    '/quienes-somos': 0.7,
  };

  return Object.values(paginas).map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: ahora,
    changeFrequency: p.path === '/' ? 'weekly' : 'monthly',
    priority: prioridades[p.path] ?? 0.6,
  }));
}
