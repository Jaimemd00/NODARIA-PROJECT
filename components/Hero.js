import FxButton from './FxButton';
import { site } from '@/lib/site';

export default function Hero({
  eyebrow,
  title = site.claim,
  cta = true,
  ctaSecondary = true,
  scroll = true,
}) {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-orb" src="/logo.png" alt="" aria-hidden="true" />

      <div className="hero-inner">
        <span className="hero-tag">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={20} height={20} />
          {site.name}
        </span>

        <h1>{title}</h1>

        {eyebrow && <p className="hero-sub">{eyebrow}</p>}

        {cta && (
          <div className="hero-actions">
            <FxButton href="/contacto" label="Contáctanos" />
            {ctaSecondary && (
              <FxButton href="/servicios" label="Ver servicios" variant="ghost" arrow={false} />
            )}
          </div>
        )}
      </div>

      {/* En flujo, nunca superpuesto al texto */}
      {scroll && <div className="hero-scroll">Scroll</div>}
    </section>
  );
}
