import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 25; // Vercel: corta la función si el SMTP no responde

const DESTINO = process.env.CONTACT_TO || 'nodariatech@gmail.com';
const MAX_POR_HORA = 5;

/* ------------------------------------------------------------------
   Límite de peticiones en memoria (suficiente para una web corporativa).
   Si algún día hay mucho tráfico, se cambia por Upstash Redis.
------------------------------------------------------------------ */
const peticiones = new Map();

function superaLimite(ip) {
  const ahora = Date.now();
  const hace1h = ahora - 3600_000;
  const previas = (peticiones.get(ip) || []).filter((t) => t > hace1h);
  previas.push(ahora);
  peticiones.set(ip, previas);

  // Limpieza ocasional para que el Map no crezca sin control
  if (peticiones.size > 500) {
    for (const [clave, marcas] of peticiones) {
      if (!marcas.some((t) => t > hace1h)) peticiones.delete(clave);
    }
  }

  return previas.length > MAX_POR_HORA;
}

const limpiar = (valor = '') =>
  String(valor)
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, 2000);

const escapar = (valor = '') =>
  String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ------------------------------------------------------------------
   Plantilla del correo
------------------------------------------------------------------ */
function plantilla({ nombre, email, telefono, servicio, mensaje, origen }) {
  const filas = [
    ['Nombre', nombre],
    ['Email', email],
    ['Teléfono', telefono || '—'],
    ['Servicio', servicio || '—'],
    ['Página', origen || '—'],
  ]
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:8px 14px;color:#63719a;font:500 12px/1.4 system-ui;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">${k}</td>
           <td style="padding:8px 14px;color:#eaf0ff;font:400 15px/1.5 system-ui">${escapar(v)}</td>
         </tr>`
    )
    .join('');

  return `<!doctype html><html lang="es"><body style="margin:0;background:#04081c;padding:28px">
    <table role="presentation" style="max-width:600px;margin:0 auto;background:#0b1638;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.09)">
      <tr><td style="padding:22px 26px;background:linear-gradient(120deg,#6c5ce7,#2f7bff 55%,#ffc53d)">
        <h1 style="margin:0;font:600 19px/1.2 system-ui;color:#04081c;letter-spacing:-.02em">Nuevo mensaje desde nodaria.com</h1>
      </td></tr>
      <tr><td style="padding:20px 12px 6px"><table role="presentation" style="width:100%">${filas}</table></td></tr>
      <tr><td style="padding:6px 26px 28px">
        <p style="margin:0 0 8px;color:#63719a;font:500 12px/1.4 system-ui;text-transform:uppercase;letter-spacing:.08em">Mensaje</p>
        <div style="white-space:pre-wrap;color:#eaf0ff;font:400 15px/1.65 system-ui;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:12px;padding:16px">${escapar(
          mensaje
        )}</div>
        <p style="margin:18px 0 0;color:#63719a;font:400 13px/1.5 system-ui">Responde directamente a este correo para contestar a ${escapar(
          nombre
        )}.</p>
      </td></tr>
    </table></body></html>`;
}

/* ------------------------------------------------------------------
   Envío: SMTP (Gmail) → Resend → webhook n8n
------------------------------------------------------------------ */
async function enviar(datos) {
  const asunto = `Web · ${datos.servicio || 'Contacto'} · ${datos.nombre}`;
  const html = plantilla(datos);
  const texto = `Nombre: ${datos.nombre}\nEmail: ${datos.email}\nTeléfono: ${
    datos.telefono || '—'
  }\nServicio: ${datos.servicio || '—'}\n\n${datos.mensaje}`;

  // 1) SMTP — la opción recomendada con Gmail + contraseña de aplicación
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = (await import('nodemailer')).default;
    const transporte = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      // Sin esto, un SMTP que no responde deja la petición colgada
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporte.sendMail({
      from: `"Web Nodaria" <${process.env.SMTP_USER}>`,
      to: DESTINO,
      replyTo: `"${datos.nombre}" <${datos.email}>`,
      subject: asunto,
      text: texto,
      html,
    });
    return 'smtp';
  }

  // 2) Resend — sin dependencias, requiere dominio verificado
  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(15_000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Web Nodaria <onboarding@resend.dev>',
        to: [DESTINO],
        reply_to: datos.email,
        subject: asunto,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend respondió ${res.status}`);
    return 'resend';
  }

  // 3) Webhook de n8n — útil si preferís procesarlo en vuestro propio flujo
  if (process.env.N8N_WEBHOOK_URL) {
    const res = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      signal: AbortSignal.timeout(15_000),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error(`El webhook respondió ${res.status}`);
    return 'n8n';
  }

  return null; // nada configurado
}

/* ------------------------------------------------------------------
   Handler
------------------------------------------------------------------ */
export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'desconocida';

    if (superaLimite(ip)) {
      return NextResponse.json(
        { error: 'Has enviado demasiados mensajes seguidos. Prueba dentro de un rato.' },
        { status: 429 }
      );
    }

    const cuerpo = await request.json();

    // Trampa antispam: si viene rellena, es un bot. Se finge éxito.
    if (cuerpo.web) return NextResponse.json({ ok: true });

    const datos = {
      nombre: limpiar(cuerpo.nombre).slice(0, 120),
      email: limpiar(cuerpo.email).slice(0, 160),
      telefono: limpiar(cuerpo.telefono).slice(0, 40),
      servicio: limpiar(cuerpo.servicio).slice(0, 80),
      mensaje: limpiar(cuerpo.mensaje),
      origen: limpiar(cuerpo.origen).slice(0, 120),
    };

    if (!datos.nombre || !datos.email || !datos.mensaje) {
      return NextResponse.json(
        { error: 'Faltan el nombre, el email o el mensaje.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(datos.email)) {
      return NextResponse.json({ error: 'Revisa el email, no parece válido.' }, { status: 400 });
    }

    if (!cuerpo.consent) {
      return NextResponse.json(
        { error: 'Debes aceptar la política de privacidad.' },
        { status: 400 }
      );
    }

    if (datos.mensaje.length < 10) {
      return NextResponse.json(
        { error: 'Cuéntanos un poco más (mínimo 10 caracteres).' },
        { status: 400 }
      );
    }

    const via = await enviar(datos);

    if (!via) {
      console.warn('[contacto] Sin proveedor de correo configurado. Mensaje recibido:', datos);
      return NextResponse.json(
        {
          error: `El envío automático aún no está configurado. Escríbenos a ${DESTINO} y te contestamos igual.`,
        },
        { status: 503 }
      );
    }

    console.log(`[contacto] Mensaje enviado vía ${via} de ${datos.email}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contacto] Error al enviar:', error);
    return NextResponse.json(
      { error: `No se pudo enviar. Escríbenos a ${DESTINO} y lo vemos.` },
      { status: 500 }
    );
  }
}
