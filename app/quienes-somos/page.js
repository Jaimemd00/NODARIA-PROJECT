import Hero from '@/components/Hero';
import Waves from '@/components/Waves';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import FxButton from '@/components/FxButton';
import ContactForm from '@/components/ContactForm';
import SmartImage from '@/components/SmartImage';
import { media, team, values } from '@/lib/site';

export const metadata = {
  title: '¿Quiénes somos?',
  description:
    'Un equipo un poco geek, diferente pero compenetrado, unido por una pasión: crear soluciones digitales únicas.',
};

export default function QuienesSomosPage() {
  return (
    <>
      <Hero eyebrow="Conoce nuestro equipo" ctaSecondary={false} />

      <Waves id="q" />

      <section className="section tight">
        <div className="shell">
          <div className="about-lead">
            <Reveal>
              <span className="eyebrow">¿Quieres conocer nuestro equipo?</span>
              <h2>
                ¿Somos buenos porque nos gusta lo que hacemos o nos gusta lo que hacemos porque
                somos buenos?
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="lead">
                En cualquier caso, somos el tipo de personas con las que te gusta trabajar. Un poco
                geeks, diferentes pero compenetrados, con hambre de gol y unidos por una pasión:{' '}
                <strong>crear soluciones digitales únicas</strong>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow cool">El equipo</span>
            <h2>Las personas detrás de cada proyecto</h2>
          </Reveal>

          <div className="team">
            {team.map((m, i) => (
              <Reveal className="card member" key={m.name} delay={i * 120}>
                <div className="member-photo">
                  <SmartImage src={m.image} fallback={m.fallback} alt={`Retrato de ${m.name}`} />
                </div>
                <div className="member-body">
                  <h3>{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                  <p>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee text="Lleva nuestro sello" />

      <section className="section tight">
        <div className="shell">
          <Reveal className="section-head">
            <span className="eyebrow">Cómo trabajamos</span>
            <h2>Seis principios que se notan en el resultado</h2>
          </Reveal>

          <div className="values">
            {values.map((v, i) => (
              <Reveal className="card value" key={v.title} delay={(i % 3) * 110}>
                <span className="value-idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell">
          <Reveal className="cta-split">
            <div className="cta-media with-copy">
              <SmartImage
                src={media.equipoCta.image}
                fallback={media.equipoCta.fallback}
                alt={media.equipoCta.alt}
              />
              <div className="cta-copy">
                <span className="eyebrow">¿Buscas un equipo?</span>
                <h2>Sé uno de nosotros</h2>
                <p>
                  Si te mueve la tecnología, el diseño y hacer las cosas bien, queremos leerte.
                  Escríbenos y cuéntanos qué sabes hacer.
                </p>
                <FxButton href="/contacto" label="Envíanos tu CV" variant="ghost" />
              </div>
            </div>
            <div>
              <ContactForm
                cta="Enviar candidatura"
                note="Adjunta tu portfolio o LinkedIn en el mensaje."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
