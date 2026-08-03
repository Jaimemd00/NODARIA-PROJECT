import Link from 'next/link';
import Hero from '@/components/Hero';
import Waves from '@/components/Waves';
import WaveField from '@/components/WaveField';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import FxButton from '@/components/FxButton';
import ContactForm from '@/components/ContactForm';
import { ServiceIcon } from '@/components/Icons';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { benefits, services } from '@/lib/site';
import {
  faqsHome,
  jsonLdFaq,
  jsonLdNegocio,
  jsonLdServicios,
  jsonLdWebSite,
  metaDe,
  paginas,
} from '@/lib/seo';

export const metadata = metaDe('home');

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          jsonLdNegocio(),
          jsonLdWebSite(),
          jsonLdServicios(services),
          jsonLdFaq(faqsHome),
        ]}
      />

      <Hero title={paginas.home.h1} eyebrow="Conecta el diseño. Automatiza el futuro" />

      <Waves id="h" />

      <Marquee text="Automatiza tu éxito" />

      <section className="section tight has-field">
        <WaveField id="benefits" />
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Automatización</span>
            <h2>
              Menos tareas manuales, <span className="hl">más tiempo para crecer</span>
            </h2>
            <p>
              Orquestamos tus herramientas digitales con <strong>n8n</strong> y{' '}
              <strong>Zapier</strong>. Diseñamos flujos que eliminan lo repetitivo para que tu equipo
              se centre en lo que importa:&nbsp;<strong>crecer</strong>.
            </p>
          </Reveal>

          <div className="benefits">
            {benefits.map((b, i) => (
              <Reveal className="card benefit" key={b.title} delay={i * 110}>
                <span className="benefit-num">0{i + 1}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <span className="benefit-glow" aria-hidden="true" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee text="Nuestros servicios" reverse speed={40} />

      <section className="section tight">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow cool">Qué hacemos</span>
            <h2>Cinco disciplinas, un solo interlocutor</h2>
            <p>
              Trabajamos en lo que de verdad mueve la aguja de tu negocio. Elige un servicio o
              combínalos: funcionamos como tu equipo digital completo.
            </p>
          </Reveal>

          <div className="svc-grid">
            {services.map((s, i) => (
              <Reveal className="card svc" key={s.slug} delay={(i % 3) * 90}>
                <span className="svc-mark">
                  <ServiceIcon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}

            <Reveal className="card svc cta-card" delay={120}>
              <span className="svc-path">./servicios</span>
              <div>
                <h3>Ver todos los servicios</h3>
                <p>Entra al detalle de cada disciplina y cómo trabajamos.</p>
              </div>
              <Link
                href="/servicios"
                style={{ position: 'absolute', inset: 0 }}
                aria-label="Ver todos los servicios"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Faq items={faqsHome} title="Lo que suelen preguntarnos" />

      <section className="section tight">
        <div className="shell">
          <Reveal className="cta-split">
            <div className="cta-copy">
              <span className="eyebrow">Empecemos</span>
              <h2>¿Hablamos de tu proyecto?</h2>
              <p>
                Cuéntanos qué necesitas y te proponemos el camino más corto para conseguirlo. Sin
                compromiso y con presupuesto claro desde el primer día.
              </p>
              <FxButton href="/contacto" label="Ir a contacto" variant="ghost" />
            </div>
            <div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
