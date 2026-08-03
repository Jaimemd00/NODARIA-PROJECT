// Contenido centralizado del sitio. Edita aquí y cambia en todas las páginas.
//
// IMÁGENES: cada una tiene `image` (archivo local en /public/img) y `fallback`
// (la URL original de Framer). Ejecuta `npm run imagenes` para descargarlas.
// Si el archivo local todavía no existe, el sitio carga el fallback solo.

const FRAMER = 'https://framerusercontent.com/images/';

export const site = {
  name: 'Nodaria',
  claim: 'Vive la Metamorfosis Digital con Nodaria',
  email: 'nodariatech@gmail.com',
  year: 2026,
};

export const nav = [
  { href: '/', label: 'Inicio', navLabel: 'Inicio' },
  { href: '/quienes-somos', label: '¿Quiénes somos?', navLabel: '¿Quiénes somos?' },
  { href: '/servicios', label: 'Servicios', navLabel: 'Servicios' },
  { href: '/contacto', label: 'Contacto', navLabel: 'Contacto' },
];

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'X', href: 'https://x.com', icon: 'x' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Tik Tok', href: 'https://tiktok.com', icon: 'tiktok' },
];

// Imágenes sueltas (no ligadas a un servicio)
export const media = {
  oficina: {
    image: '/img/oficina.jpg',
    fallback: `${FRAMER}mgRdbBZJGPn94ft58M4tL0u810.jpg?width=1800`,
    alt: 'Oficina de Nodaria',
  },
  equipoCta: {
    image: '/img/equipo-cta.jpg',
    fallback: `${FRAMER}XrAkB5lDZ7p7k8FlKgFA3Z8Uxw.jpg?width=1800`,
    alt: 'El equipo de Nodaria trabajando',
  },
};

// Los PNG 1-3 de tu lista. Sin saber qué son, quedan declarados aquí para
// colocarlos en cuanto los identifiques.
export const marcas = [
  { image: '/img/marca-1.png', fallback: `${FRAMER}ZnDS1sLoNXXyxKTTzxtwajPYc.png`, alt: '' },
  { image: '/img/marca-2.png', fallback: `${FRAMER}5oMD8T6MEjYlTXCXsgjZlmpDGY.png`, alt: '' },
  { image: '/img/marca-3.png', fallback: `${FRAMER}HtSI9peN5sWhUTmdOBxunxyO6T4.png`, alt: '' },
];

export const benefits = [
  {
    title: 'Ahorro Total',
    text: 'Elimina costes ocultos y optimiza tu presupuesto. Automatizamos lo repetitivo para que tu inversión se centre en crecer.',
  },
  {
    title: 'Cero Errores',
    text: 'Sustituye la duda por precisión absoluta. Flujos inteligentes que garantizan datos fiables y eliminan el riesgo humano.',
  },
  {
    title: 'Mayor Eficiencia',
    text: 'Sincroniza tus herramientas y acelera resultados. Escala tu operativa sin necesidad de aumentar tus recursos actuales.',
  },
];

export const services = [
  {
    slug: 'diseno-web',
    title: 'Diseño Web',
    headline: 'Tu negocio abierto al mundo',
    text: 'Ya sea una página corporativa o una tienda online, es fundamental para llevar tu negocio al siguiente nivel.',
    icon: 'layout',
    image: '/img/diseno-web.jpg',
    fallback: `${FRAMER}yCcyXXnlSxsnynkfXT6uzTu1dY.jpg?width=1800`,
  },
  {
    slug: 'desarrollo-web',
    title: 'Desarrollo Web',
    headline: 'Tecnología a tu medida',
    text: 'Creamos soluciones adaptadas a tu negocio. ERP/CRM, App, desarrollos a medida, además de ciberseguridad.',
    icon: 'code',
    image: '/img/desarrollo-web.jpg',
    fallback: `${FRAMER}eoUdREFfjogISB3XYJJK9Wr2s.jpg?width=1800`,
  },
  {
    slug: 'automatizaciones',
    title: 'Automatizaciones',
    headline: 'Que el trabajo repetitivo se haga solo',
    text: 'Conectamos tus herramientas con n8n y Zapier para que las tareas manuales se ejecuten sin que nadie las toque.',
    icon: 'flow',
    flow: true, // usa el diagrama animado en vez de una foto
  },
  {
    slug: 'posicionamiento-web',
    title: 'Posicionamiento Web',
    headline: 'Haz que te encuentren',
    text: 'Posicionamos tu sitio web en los primeros resultados de búsqueda para aumentar tu tráfico web y ventas.',
    icon: 'search',
    image: '/img/posicionamiento-web.jpg',
    fallback: `${FRAMER}yfMmkpVDpnZUduaLy9mKK9R835o.jpg?width=1800`,
  },
  {
    slug: 'diseno-grafico',
    title: 'Diseño Gráfico',
    headline: 'Identidad que impacta',
    text: 'Diseños capaces de impactar y transmitir tu marca a tu público objetivo. Logo, tarjetas, catálogos, etc.',
    icon: 'pen',
    image: '/img/diseno-grafico.jpg',
    fallback: `${FRAMER}zWHIxkz9zb6gD7w73TyvSnPXcZU.jpg?width=1800`,
  },
];

export const values = [
  {
    title: 'Transparencia total',
    text: 'No nos escondemos detrás de palabras complejas. Te hablamos claro, te explicamos cada paso y nos aseguramos de que siempre sepas qué está pasando con tu inversión. Sin letra pequeña.',
  },
  {
    title: 'ADN Creativo',
    text: 'No hacemos proyectos en serie. Buscamos esa "chispa única" para que tu marca destaque. Fusionamos la estética con la innovación para que el resultado sea siempre auténtico.',
  },
  {
    title: 'Mentalidad de Partner',
    text: 'No somos un simple proveedor; somos tu equipo externo. Trabajamos codo con codo contigo porque tus objetivos son los nuestros. Si tú ganas, nosotros ganamos.',
  },
  {
    title: 'Simplicidad resolutiva',
    text: 'Aplicamos la máxima de "menos es más". Creamos soluciones tecnológicas y de marketing que realmente te facilitan la vida y eliminan fricciones, no que te añaden problemas.',
  },
  {
    title: 'Equilibrio Forma-Función',
    text: 'Dominamos el arte de hacer que lo bonito sea útil. No concebimos un diseño que no convierta, ni una funcionalidad que no sea agradable de usar. Estilo y practicidad van de la mano.',
  },
  {
    title: 'Compromiso real',
    text: 'Nos mojamos por tu proyecto. Si algo no nos convence, te lo decimos; si algo no funciona, lo arreglamos. Ponemos toda nuestra energía en que el resultado final sea, simplemente, excelente.',
  },
];

export const team = [
  {
    name: 'Jaime',
    role: 'Imagen pública y líder',
    text: 'Combina desarrollo web, creación de apps y automatizaciones con IA.',
    image: '/img/jaime.jpg',
    fallback: `${FRAMER}HEqa9cuWzQPeAaKu8yOKbl6zOrA.jpeg?width=1000`,
  },
];
