import Hero from '@/components/Hero';
import Waves from '@/components/Waves';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import SmartImage from '@/components/SmartImage';
import JsonLd from '@/components/JsonLd';
import { media, site } from '@/lib/site';
import { jsonLdBreadcrumb, jsonLdNegocio, metaDe, paginas } from '@/lib/seo';

export const metadata = metaDe('contacto');

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={[
          jsonLdNegocio(),
          jsonLdBreadcrumb([
            { name: 'Inicio', path: '/' },
            { name: 'Contacto', path: '/contacto' },
          ]),
        ]}
      />

      <Hero title={paginas.contacto.h1} eyebrow="Forma parte de nosotros" cta={false} scroll={false} />

      <Waves id="c" />

      <section className="section tight">
        <div className="shell">
          <div className="contact-grid">
            <Reveal>
              <span className="eyebrow">Conoce nuestra ofi</span>
              <h2 className="h2">Convertimos tu visión en una experiencia digital única</h2>
              <p style={{ color: 'var(--muted)', margin: '18px 0 30px', maxWidth: '46ch' }}>
                Nos sumergimos en tu proyecto para entender exactamente lo que necesitas y te
                orientamos con una web profesional, SEO y automatizaciones pensadas para crecer.
              </p>

              <div className="contact-block">
                <h3>Dónde estamos</h3>
                <p className="addr">
                  Parque, Casa 8
                  <br />
                  41420 Écija, Sevilla
                </p>
              </div>

              <div className="contact-block">
                <h3>Escríbenos</h3>
                <p>
                  <a href={`mailto:${site.email}`} className="footer-mail">
                    {site.email}
                  </a>
                </p>
              </div>

              <div className="contact-block">
                <h3>¿Buscas equipo?</h3>
                <p>Sé nuestro próximo fichaje: mándanos tu CV al mismo correo.</p>
              </div>

              <div className="contact-photo">
                <SmartImage
                  src={media.oficina.image}
                  fallback={media.oficina.fallback}
                  alt={media.oficina.alt}
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="contact-block" style={{ padding: 'clamp(22px, 3vw, 34px)' }}>
                <h3>¿Quieres hablar de tu proyecto?</h3>
                <ContactForm note="Te contestamos al correo que nos dejes. Nada de listas de spam." />
              </div>

              <div className="map">
                <iframe
                  title="Mapa de la oficina de Nodaria en Écija"
                  src="https://maps.google.com/maps?q=ecija&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
