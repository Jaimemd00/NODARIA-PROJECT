/**
 * Configuración SEO central.
 *
 * Todo el SEO on-page sale de aquí: títulos, descripciones, canonicals,
 * Open Graph y datos estructurados (JSON-LD). Editar este archivo cambia
 * los metadatos de toda la web.
 *
 * REGLAS QUE SE APLICAN (y por qué):
 * - Title: 50-60 caracteres. Más largo, Google lo corta en el resultado.
 * - Description: 140-160 caracteres. No es factor de ranking directo, pero sí
 *   afecta al CTR, que sí lo es.
 * - Cada página tiene title, description y H1 ÚNICOS. Duplicarlos es uno de los
 *   errores que más penaliza en webs pequeñas.
 * - Canonical en todas para evitar contenido duplicado por parámetros o www.
 */

// Cambia esto por tu dominio real y actualiza NEXT_PUBLIC_SITE_URL en Vercel.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nodaria.com').replace(
  /\/$/,
  ''
);

export const negocio = {
  nombre: 'Nodaria',
  nombreLegal: 'Nodaria',
  email: 'nodariatech@gmail.com',
  telefono: '', // ej. '+34600000000' — rellénalo, mejora el SEO local
  calle: 'Parque, Casa 8',
  ciudad: 'Écija',
  provincia: 'Sevilla',
  cp: '41420',
  pais: 'ES',
  // Coordenadas aproximadas de Écija. Ajusta a las exactas del local.
  lat: 37.5413,
  lng: -5.0824,
  fundacion: '2025',
  // Zonas donde captáis clientes: clave para el SEO local
  areaServicio: ['Écija', 'Sevilla', 'Córdoba', 'Andalucía', 'España'],
  precioDesde: '€€',
};

/** Páginas indexables, con su SEO propio. */
export const paginas = {
  home: {
    path: '/',
    title: 'Nodaria | Diseño Web y Automatización con IA en Sevilla',
    description:
      'Agencia digital en Écija (Sevilla). Diseñamos webs que venden y automatizamos tus tareas repetitivas con n8n y Zapier. Pide presupuesto sin compromiso.',
    h1: 'Vive la Metamorfosis Digital con Nodaria',
    keywords: [
      'agencia digital Sevilla',
      'diseño web Écija',
      'automatización n8n',
      'automatización Zapier',
      'desarrollo web Sevilla',
      'posicionamiento SEO Andalucía',
    ],
  },
  quienesSomos: {
    path: '/quienes-somos',
    title: 'Quiénes Somos | El Equipo de Nodaria en Écija',
    description:
      'Conoce al equipo de Nodaria: diseño, desarrollo y automatización desde Écija (Sevilla). Transparencia total, mentalidad de partner y compromiso real.',
    h1: 'Conoce al equipo de Nodaria',
    keywords: ['equipo Nodaria', 'agencia digital Écija', 'sobre nosotros Nodaria'],
  },
  servicios: {
    path: '/servicios',
    title: 'Servicios: Diseño Web, SEO y Automatización | Nodaria',
    description:
      'Diseño y desarrollo web a medida, automatizaciones con n8n y Zapier, posicionamiento SEO y diseño gráfico. Un solo equipo para toda tu presencia digital.',
    h1: 'Servicios de diseño web, desarrollo y automatización',
    keywords: [
      'servicios diseño web',
      'desarrollo web a medida',
      'automatizar tareas n8n',
      'consultoría Zapier',
      'agencia SEO Sevilla',
      'diseño gráfico Écija',
    ],
  },
  contacto: {
    path: '/contacto',
    title: 'Contacto | Pide Presupuesto a Nodaria en Écija, Sevilla',
    description:
      'Cuéntanos tu proyecto y te respondemos en menos de 24 h laborables. Estamos en Écija (Sevilla) y trabajamos con clientes de toda España.',
    h1: 'Hablemos de tu proyecto',
    keywords: ['contacto Nodaria', 'presupuesto diseño web', 'agencia digital Écija contacto'],
  },
};

/** Genera el objeto `metadata` de Next para una página. */
export function metaDe(clave, extra = {}) {
  const p = paginas[clave];
  const url = `${SITE_URL}${p.path}`;

  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url,
      siteName: negocio.nombre,
      title: p.title,
      description: p.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
    },
    ...extra,
  };
}

/* ==================================================================
   DATOS ESTRUCTURADOS (JSON-LD)
   Le dicen a Google qué es el negocio, dónde está y qué ofrece.
   Habilitan resultados enriquecidos y son clave para el SEO local.
   ================================================================== */

export function jsonLdNegocio() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#negocio`,
    name: negocio.nombre,
    legalName: negocio.nombreLegal,
    url: SITE_URL,
    email: negocio.email,
    ...(negocio.telefono ? { telephone: negocio.telefono } : {}),
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    priceRange: negocio.precioDesde,
    foundingDate: negocio.fundacion,
    description: paginas.home.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: negocio.calle,
      addressLocality: negocio.ciudad,
      addressRegion: negocio.provincia,
      postalCode: negocio.cp,
      addressCountry: negocio.pais,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: negocio.lat,
      longitude: negocio.lng,
    },
    areaServed: negocio.areaServicio.map((n) => ({ '@type': 'Place', name: n })),
    knowsAbout: [
      'Diseño web',
      'Desarrollo web',
      'Automatización de procesos',
      'n8n',
      'Zapier',
      'Posicionamiento SEO',
      'Diseño gráfico',
    ],
    sameAs: [
      'https://instagram.com',
      'https://x.com',
      'https://facebook.com',
      'https://tiktok.com',
    ],
  };
}

export function jsonLdWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: negocio.nombre,
    inLanguage: 'es-ES',
    publisher: { '@id': `${SITE_URL}/#negocio` },
  };
}

/** Migas de pan: Google las muestra en el resultado en vez de la URL cruda. */
export function jsonLdBreadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** Catálogo de servicios: ayuda a Google a entender qué vendéis. */
export function jsonLdServicios(servicios) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de Nodaria',
    itemListElement: servicios.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.text,
        provider: { '@id': `${SITE_URL}/#negocio` },
        areaServed: negocio.areaServicio.map((n) => ({ '@type': 'Place', name: n })),
      },
    })),
  };
}

/** FAQ: puede aparecer como desplegable en el propio resultado de Google. */
export function jsonLdFaq(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/* ==================================================================
   CONTENIDO FAQ
   Responde a búsquedas de cola larga ("cuánto cuesta una página web").
   Es de lo que más tráfico cualificado atrae en webs de servicios.
   ================================================================== */

export const faqsHome = [
  {
    q: '¿Cuánto cuesta una página web profesional?',
    a: 'Depende del alcance. Una web corporativa de presentación parte de un presupuesto cerrado que te damos antes de empezar, y una tienda online o un desarrollo a medida se valoran según funcionalidades. Analizamos tu caso y te pasamos un precio claro, sin costes ocultos ni letra pequeña.',
  },
  {
    q: '¿Qué es la automatización de procesos con n8n o Zapier?',
    a: 'Consiste en conectar las herramientas que ya usas (correo, CRM, hojas de cálculo, facturación) para que las tareas repetitivas se ejecuten solas. Por ejemplo: que un formulario de la web cree automáticamente el cliente en tu CRM y te avise por Slack. Eliminas el copiar y pegar y reduces errores humanos.',
  },
  {
    q: '¿Cuánto se tarda en tener la web lista?',
    a: 'Una web corporativa suele estar publicada en unas semanas, contando diseño, desarrollo y revisiones. Los plazos concretos dependen sobre todo de la rapidez con la que nos facilites los textos y las imágenes; te damos un calendario al aceptar el presupuesto.',
  },
  {
    q: '¿Trabajáis con clientes fuera de Sevilla?',
    a: 'Sí. Estamos en Écija (Sevilla) y atendemos presencialmente en la provincia y en Córdoba, pero trabajamos en remoto con clientes de toda España. Las reuniones por videollamada funcionan igual de bien.',
  },
];

export const faqsServicios = [
  {
    q: '¿Puedo contratar solo un servicio o hay que coger el pack completo?',
    a: 'Puedes contratar solo lo que necesites. Cada servicio funciona de forma independiente, aunque combinarlos suele dar mejor resultado: por ejemplo, una web nueva rinde mucho más si se acompaña de posicionamiento SEO desde el principio.',
  },
  {
    q: '¿La web estará optimizada para móvil y para Google?',
    a: 'Sí, en todos los casos. Desarrollamos con diseño adaptable a cualquier pantalla y aplicamos las bases técnicas de SEO: velocidad de carga, etiquetas semánticas, datos estructurados y sitemap. El posicionamiento por palabras clave concretas es un servicio aparte y continuado.',
  },
  {
    q: '¿Qué tareas se pueden automatizar en una pyme?',
    a: 'Las más habituales son el alta de leads en el CRM, el envío de presupuestos y facturas, la sincronización de stock entre plataformas, los informes periódicos y las notificaciones internas al equipo. Si una tarea se repite y sigue reglas claras, casi siempre se puede automatizar.',
  },
  {
    q: '¿Ofrecéis mantenimiento después de entregar el proyecto?',
    a: 'Sí. Podemos encargarnos de las actualizaciones, las copias de seguridad, la seguridad y los cambios de contenido mediante un servicio de mantenimiento mensual, para que no tengas que preocuparte de la parte técnica.',
  },
];
