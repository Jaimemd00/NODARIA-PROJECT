const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://nodaria.vercel.app';

export default function sitemap() {
  return ['', '/quienes-somos', '/servicios', '/contacto', '/legal/aviso-legal', '/legal/privacidad', '/legal/cookies'].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path.startsWith('/legal') ? 0.2 : 0.8,
  }));
}
