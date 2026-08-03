import Hero from '@/components/Hero';
import Waves from '@/components/Waves';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import FxButton from '@/components/FxButton';
import SmartImage from '@/components/SmartImage';
import FlowDiagram from '@/components/FlowDiagram';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { services } from '@/lib/site';
import {
  faqsServicios,
  jsonLdBreadcrumb,
  jsonLdFaq,
  jsonLdServicios,
  metaDe,
  paginas,
} from '@/lib/seo';

export const metadata = metaDe('servicios');

export default function ServiciosPage() {
  return (
    <>
      <JsonLd
        data={[
          jsonLdServicios(services),
          jsonLdFaq(faqsServicios),
          jsonLdBreadcrumb([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/servicios' },
          ]),
        ]}
      />

      <Hero title={paginas.servicios.h1} eyebrow="Servicios" ctaSecondary={false} />

      <Waves id="s" />

      <Marquee text="Diseño · Desarrollo · Automatización" speed={38} />

      <section className="section tight">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Catálogo</span>
            <h2>Lo que hacemos, sin relleno</h2>
            <p>
              Cada servicio funciona por separado, pero rinde mucho más combinado. Te decimos qué
              necesitas de verdad y qué puedes esperar.
            </p>
          </Reveal>

          <div className="svc-rows">
            {services.map((s, i) => (
              <Reveal className={`svc-row${i % 2 ? ' flip' : ''}`} key={s.slug} delay={60}>
                {s.flow ? (
                  <FlowDiagram />
                ) : (
                  <figure className="svc-row-media">
                    <SmartImage src={s.image} fallback={s.fallback} alt={s.title} />
                    <figcaption>{s.title}</figcaption>
                  </figure>
                )}

                <div className="svc-row-body">
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, '0')} · {s.title}
                  </span>
                  <h3>{s.headline}</h3>
                  <p>{s.text}</p>
                  {s.slug === 'automatizaciones' && (
                    <p>
                      Facturas que se archivan solas, leads que entran directos al CRM, informes que
                      llegan cada lunes sin que nadie los prepare.
                    </p>
                  )}
                  <div className="btn-wrap">
                    <FxButton href="/contacto" label="Pedir presupuesto" variant="ghost" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqsServicios} title="Preguntas sobre nuestros servicios" />

      <section className="section tight">
        <div className="shell">
          <Reveal className="cta-split single">
            <div className="cta-copy">
              <span className="eyebrow">Siguiente paso</span>
              <h2>¿No sabes por dónde empezar?</h2>
              <p>
                Cuéntanos tu situación en dos líneas y te decimos qué servicio tiene más sentido
                para ti ahora mismo.
              </p>
              <FxButton href="/contacto" label="Contáctanos" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
