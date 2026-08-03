import { notFound } from 'next/navigation';
import Waves from '@/components/Waves';
import Reveal from '@/components/Reveal';
import { paginas } from '@/lib/legal';

export function generateStaticParams() {
  return Object.keys(paginas).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const pagina = paginas[params.slug];
  if (!pagina) return {};
  // noindex: las legales no aportan tráfico y diluyen el presupuesto de rastreo
  return {
    title: pagina.title,
    description: pagina.intro,
    robots: { index: false, follow: true },
  };
}

export default function LegalPage({ params }) {
  const pagina = paginas[params.slug];
  if (!pagina) notFound();

  return (
    <>
      <section className="legal-hero">
        <div className="shell">
          <span className="eyebrow">Información legal</span>
          <h1 className="h2">{pagina.title}</h1>
          <p>{pagina.intro}</p>
        </div>
      </section>

      <Waves id="l" />

      <section className="section tight">
        <div className="shell">
          <div className="legal">
            {pagina.bloques.map((bloque, i) => (
              <Reveal key={bloque.h} delay={i * 60}>
                <h2>{bloque.h}</h2>
                {bloque.p.map((texto, j) => (
                  <p key={j}>{texto}</p>
                ))}
              </Reveal>
            ))}
            <p className="legal-note">
              Última revisión: enero de 2026. Antes de publicar, sustituye los campos entre
              corchetes por los datos reales de la empresa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
