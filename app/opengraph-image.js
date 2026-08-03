import { ImageResponse } from 'next/og';
import { SITE_URL } from '@/lib/seo';

export const alt = 'Nodaria — Diseño web y automatización con IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Imagen que se ve al compartir el enlace en WhatsApp, LinkedIn, X, Slack...
 * Se genera en el servidor, así que no hay que mantener un PNG a mano.
 */
export default async function OgImage() {
  const url = SITE_URL;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #04081c 0%, #0b1638 55%, #071026 100%)',
          color: '#eaf0ff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#ffc53d',
          }}
        >
          Nodaria
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 28,
            maxWidth: 940,
          }}
        >
          Vive la Metamorfosis Digital
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: '#93a0c4',
            marginTop: 26,
            maxWidth: 900,
          }}
        >
          Diseño web, desarrollo y automatización con n8n y Zapier
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 26,
            color: '#63719a',
          }}
        >
          Écija · Sevilla · Toda España
        </div>

        <div
          style={{
            position: 'absolute',
            right: -160,
            bottom: -160,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6c5ce7, #2f7bff 55%, #35d6f5)',
            opacity: 0.35,
          }}
        />
      </div>
    ),
    size
  );
}
