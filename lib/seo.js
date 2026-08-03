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

// Dominio real del proyecto; se puede sobrescribir desde Vercel con NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nodariatech.es').replace(
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
    title: 'Nodaria | Consultora Tecnológica AI First en Sevilla',
    description:
      'Consultora tecnológica en Écija (Sevilla) especializada en desarrollo de software, IA y automatizaciones inteligentes. Transformamos procesos empresariales con tecnología.',
    h1: 'Consultora Tecnológica AI First',
    keywords: [
      'consultora tecnológica Sevilla',
      'desarrollo de software Écija',
      'IA y automatización',
      'automatización procesos n8n',
      'consultoría tecnológica Andalucía',
      'desarrollo custom Python',
    ],
  },
  quienesSomos: {
    path: '/quienes-somos',
    title: 'Equipo | Consultora Tecnológica Especializada en IA y Desarrollo',
    description:
      'Equipo de ingenieros y especialistas en IA de Nodaria. Experiencia en desarrollo de software, machine learning y automatizaciones empresariales desde Sevilla.',
    h1: 'Equipo de Ingenieros y Especialistas en IA',
    keywords: ['equipo técnico Sevilla', 'ingenieros IA', 'desarrolladores Nodaria', 'consultora tecnológica Écija'],
  },
  servicios: {
    path: '/servicios',
    title: 'Servicios: Desarrollo, IA y Automatización | Consultora Técnica',
    description:
      'Desarrollo de software custom, inteligencia artificial, automatizaciones inteligentes con n8n, machine learning y consultoría tecnológica para empresas.',
    h1: 'Desarrollo, IA y Automatización Empresarial',
    keywords: [
      'desarrollo de software',
      'machine learning Sevilla',
      'IA y automatización',
      'n8n automatizaciones',
      'consultoría técnica',
      'desarrollo custom Python',
    ],
  },
  contacto: {
    path: '/contacto',
    title: 'Contacto | Consultoría Tecnológica en Sevilla',
    description:
      'Contacta con nuestra consultora tecnológica en Écija (Sevilla). Evaluamos tu necesidad y proponemos soluciones en desarrollo, IA y automatización.',
    h1: 'Consulta Técnica y Presupuesto',
    keywords: ['consultoría técnica Sevilla', 'contacto desarrolladores', 'presupuesto software', 'consultora tecnológica Écija'],
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
    description: 'Consultora tecnológica especializada en desarrollo de software, inteligencia artificial y automatizaciones empresariales.',
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
      'Desarrollo de Software',
      'Machine Learning',
      'Inteligencia Artificial',
      'Automatización de Procesos',
      'n8n',
      'Python',
      'Cloud Computing',
      'APIs y Integraciones',
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
