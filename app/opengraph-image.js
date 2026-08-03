export const alt = 'Nodaria — Diseño web y automatización con IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/svg+xml';

/**
 * Imagen que se ve al compartir el enlace en WhatsApp, LinkedIn, X, Slack...
 * Se genera como SVG para evitar errores de compilación en producción.
 */
export default async function OgImage() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#04081c" />
      <rect x="0" y="0" width="1200" height="630" fill="url(#bg)" />
      <circle cx="980" cy="470" r="220" fill="#35d6f5" opacity="0.22" />
      <circle cx="1040" cy="150" r="120" fill="#6c5ce7" opacity="0.3" />
      <text x="90" y="220" fill="#ffc53d" font-size="36" font-family="Arial, sans-serif" letter-spacing="6">
        NODARIA
      </text>
      <text x="90" y="330" fill="#ffffff" font-size="70" font-family="Arial, sans-serif" font-weight="700">
        Vive la Metamorfosis Digital
      </text>
      <text x="90" y="395" fill="#93a0c4" font-size="34" font-family="Arial, sans-serif">
        Diseño web, desarrollo y automatización con n8n y Zapier
      </text>
      <text x="90" y="465" fill="#63719a" font-size="26" font-family="Arial, sans-serif">
        Écija · Sevilla · Toda España
      </text>
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b1638" />
          <stop offset="55%" stop-color="#071026" />
          <stop offset="100%" stop-color="#04081c" />
        </linearGradient>
      </defs>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
}
