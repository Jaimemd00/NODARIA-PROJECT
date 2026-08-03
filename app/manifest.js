import { negocio } from '@/lib/seo';

/** Manifiesto PWA: mejora la experiencia en móvil y el "añadir a inicio". */
export default function manifest() {
  return {
    name: `${negocio.nombre} — Diseño web y automatización`,
    short_name: negocio.nombre,
    description:
      'Agencia digital en Écija (Sevilla): diseño web, desarrollo, SEO y automatización con n8n y Zapier.',
    start_url: '/',
    display: 'standalone',
    background_color: '#04081c',
    theme_color: '#04081c',
    lang: 'es-ES',
    icons: [{ src: '/logo.png', sizes: 'any', type: 'image/png' }],
  };
}
