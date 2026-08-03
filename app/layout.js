import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SITE_URL, negocio, paginas } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: paginas.home.title,
    // Las páginas internas heredan " | Nodaria" automáticamente
    template: '%s',
  },
  description: paginas.home.description,
  applicationName: negocio.nombre,
  authors: [{ name: negocio.nombre, url: SITE_URL }],
  creator: negocio.nombre,
  publisher: negocio.nombre,
  alternates: { canonical: SITE_URL },
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: negocio.nombre,
    title: paginas.home.title,
    description: paginas.home.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: paginas.home.title,
    description: paginas.home.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Pega aquí el código que te da Google Search Console al verificar el dominio
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: { icon: '/logo.png', apple: '/logo.png' },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: '#05060b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
