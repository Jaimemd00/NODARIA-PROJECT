import Link from 'next/link';
import Waves from './Waves';
import { nav, services, site, socials } from '@/lib/site';
import { SocialIcon } from './Icons';

export default function Footer() {
  // Force cache bust and rebuild
  return (
    <footer className="footer">
      <Waves id="f" flip />

      <div className="footer-body">
        <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
          <div className="footer-top">
            <div className="footer-brand">
              <span className="brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="" width={30} height={30} />
                {site.name}
              </span>
              <p>
                Conectamos diseño, desarrollo y automatización para que tu negocio crezca sin
                fricciones.
              </p>
              <a className="footer-mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>

            <div className="footer-col">
              <h4>Navegación</h4>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.navLabel}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Servicios</h4>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href="/servicios">{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-word" aria-hidden="true">
            Nodaria.
          </div>

          <div className="footer-bar">
            <span>
              {site.name} — Desarrollado © {site.year}
            </span>
            <nav className="footer-legal" aria-label="Legal">
              <Link href="/legal/aviso-legal">Aviso legal</Link>
              <Link href="/legal/privacidad">Privacidad</Link>
              <Link href="/legal/cookies">Cookies</Link>
            </nav>
            <div className="footer-social">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
