import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://nodaria.vercel.app'),
  title: {
    default: 'Nodaria — Vive la Metamorfosis Digital',
    template: '%s | Nodaria',
  },
  description:
    'Agencia digital: diseño y desarrollo web, posicionamiento, redes sociales y automatizaciones con n8n e IA.',
  openGraph: {
    title: 'Nodaria — Vive la Metamorfosis Digital',
    description:
      'Conectamos diseño, desarrollo y automatización para que tu negocio crezca sin fricciones.',
    type: 'website',
    locale: 'es_ES',
  },
  icons: { icon: '/logo.png', apple: '/logo.png' },
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
