# Nodaria — Web corporativa

Next.js 14 (App Router) + React 18. Sin Tailwind ni librerías de animación: React y CSS propio, para
que cargue rápido y se despliegue en Vercel sin configurar nada.

---

## 1. Arrancar en local

```bash
npm install
npm run imagenes     # descarga las fotos de Framer a public/img
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

---

## 2. Que el formulario llegue a nodariatech@gmail.com

**Sin esto, el formulario avisa al usuario de que escriba al correo, pero no envía nada.**

### Opción recomendada: Gmail con contraseña de aplicación

Google no deja usar la contraseña normal desde una aplicación. Hay que generar una específica:

1. Entra en la cuenta `nodariatech@gmail.com` → [myaccount.google.com/security](https://myaccount.google.com/security).
2. Activa la **verificación en dos pasos** (es obligatorio para el paso siguiente).
3. Busca **Contraseñas de aplicaciones** → crea una nueva, nómbrala «Web Nodaria».
4. Google te da 16 caracteres. Cópialos **sin espacios**.
5. Pégalos en `.env.local`:

```bash
CONTACT_TO=nodariatech@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=nodariatech@gmail.com
SMTP_PASS=abcdabcdabcdabcd
```

6. Reinicia `npm run dev` y prueba a enviar un mensaje.

Gmail permite unos 500 envíos al día, de sobra para una web corporativa.

### Alternativas

| Opción | Cuándo usarla | Variables |
| --- | --- | --- |
| **Resend** | Cuando tengáis dominio propio: mejor entregabilidad y no toca Gmail | `RESEND_API_KEY`, `RESEND_FROM` |
| **Webhook n8n** | Si preferís procesar los leads en vuestro propio flujo | `N8N_WEBHOOK_URL` |

El código las prueba en orden: SMTP → Resend → n8n. La primera configurada gana.

### Qué trae ya el endpoint

- Validación en cliente y en servidor.
- Campo trampa (honeypot) contra bots.
- Límite de 5 envíos por hora y por IP.
- Casilla de consentimiento RGPD obligatoria.
- `Reply-To` con el email del remitente: respondes desde Gmail y le llega directo.
- Tiempos de espera para que nunca se quede la petición colgada.

---

## 3. Desplegar en Vercel

1. Sube la carpeta a un repositorio de GitHub (incluye `public/img`, no lo ignores).
2. [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo. Detecta Next.js solo.
3. **Antes de dar a Deploy**, en *Environment Variables* añade las mismas del `.env.local`
   (`CONTACT_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NEXT_PUBLIC_SITE_URL`).
   Márcalas para Production, Preview y Development.
4. Deploy. Cada `git push` vuelve a desplegar solo.

> Si cambias una variable después, hay que hacer **Redeploy** para que se aplique.

---

## 4. Estructura

```
app/
  layout.js               Nav + Footer + fuentes + metadatos
  page.js                 Inicio
  quienes-somos/          ¿Quiénes somos?
  servicios/              Servicios
  contacto/               Contacto (formulario + mapa)
  legal/[slug]/           Aviso legal, privacidad y cookies
  api/contacto/route.js   Envío de correo
  globals.css             TODO el diseño
components/
  Nav, Footer, Hero, Waves, Marquee, FxButton, FlowDiagram,
  Reveal, ContactForm, SmartImage, Icons
lib/site.js               Textos, servicios, valores, equipo, imágenes
lib/legal.js              Textos legales
scripts/                  descargar-imagenes.mjs
```

### Dónde tocar cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Textos, servicios, valores, equipo | `lib/site.js` |
| Colores y tipografías | `app/globals.css`, bloque `:root` |
| Redes sociales | `lib/site.js` → `socials` |
| Datos fiscales y textos legales | `lib/legal.js` |
| Secciones de una página | `app/<pagina>/page.js` |

---

## 5. Diseño

Paleta azul noche + amarillo, tomada del sitio original y combinada con los azules del logo:

```
--night-900  #04081C   fondo base
--night-700  #0B1638   fondo elevado
--gold       #FFC53D   acento principal (CTAs, eyebrows, subrayados)
--iris       #6C5CE7   ┐
--azure      #2F7BFF   ├ degradado del logo
--aqua       #35D6F5   ┘
```

El fondo es **uno solo para toda la web** (degradado fijo en `body`), así que las secciones no
cortan el color: se separan con ritmo vertical y con las ondas de `components/Waves.js`, tres capas
SVG animadas a distinta velocidad cuyo bucle es continuo.

Todo el tipo y los espaciados usan `clamp()`, y las rejillas usan `auto-fit` + `minmax(min(100%, X))`,
así que se adaptan por contenido y no por puntos de ruptura fijos.

---

## 6. Imágenes

```bash
npm run imagenes        # descarga las que falten
npm run imagenes -- -f  # vuelve a descargar todas
```

Se ejecuta solo antes de `npm run build`. Si un archivo local falta, `SmartImage` carga la URL de
Framer como respaldo, así que nunca se ven huecos.

| Archivo | Se usa en |
| --- | --- |
| `diseno-web.jpg`, `desarrollo-web.jpg`, `posicionamiento-web.jpg`, `diseno-grafico.jpg` | Servicios |
| `equipo-cta.jpg` | ¿Quiénes somos? → «Sé uno de nosotros» |
| `oficina.jpg` | Contacto |
| `jaime.jpg` | Ficha del equipo |
| `marca-1/2/3.png` | **Sin asignar** — declaradas en `lib/site.js` (`marcas`) |

Automatizaciones no lleva foto: usa el diagrama animado de `components/FlowDiagram.js`.

---

## 7. Lo que falta para publicar

### Imprescindible

- [ ] **Contraseña de aplicación de Gmail** y variables en Vercel (apartado 2).
- [ ] **Datos fiscales en `lib/legal.js`**: razón social, NIF, domicilio, teléfono y datos
      registrales. Ahora están entre corchetes. Sin esto la web incumple la LSSI.
- [ ] **Revisar los textos legales** con un asesor o un generador de confianza. Son una base
      correcta, no un documento validado jurídicamente.
- [ ] **Enlaces reales de redes sociales** en `lib/site.js` → `socials` (ahora apuntan a las
      portadas de cada red).
- [ ] **Dirección completa** en `app/contacto/page.js`: «Parque, Casa 8» está incompleto, y el mapa
      apunta a Écija en general, no al local.
- [ ] **Dominio** en Vercel → *Settings → Domains*, y `NEXT_PUBLIC_SITE_URL` con ese dominio.

### Recomendable

- [ ] Sustituir las fotos de Framer por material propio (las de stock se repiten en muchas webs).
- [ ] Fotos y fichas del resto del equipo en `lib/site.js` → `team`.
- [ ] Imagen de Open Graph propia (1200×630) en `public/og.jpg` y referenciarla en
      `app/layout.js` → `metadata.openGraph.images`.
- [ ] Analítica. Si usas Vercel Analytics no hace falta banner de cookies; con Google Analytics sí
      (y habría que actualizar `lib/legal.js`).
- [ ] Google Search Console y envío del `sitemap.xml`.
- [ ] Casos de éxito o portfolio: es lo que más convierte en una web de agencia y ahora no hay.
- [ ] Copia de los leads en una hoja de cálculo o CRM vía `N8N_WEBHOOK_URL`, para no depender solo
      del correo.

---

## 8. Accesibilidad y rendimiento

Ya contemplado: foco visible, `aria-live` en el formulario, `aria-expanded` en el menú móvil,
`prefers-reduced-motion` respetado, contraste alto sobre azul noche y todas las imágenes con `alt`.

Pendiente al añadir contenido: comprobar Lighthouse tras subir las imágenes definitivas y, si pesan,
convertirlas a WebP.
