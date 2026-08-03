import Link from 'next/link';

export const metadata = { title: 'Página no encontrada' };

export default function NotFound() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-orb" src="/logo.png" alt="" aria-hidden="true" />
      <div className="hero-inner">
        <span className="hero-tag">Error 404</span>
        <h1>Esta página no existe</h1>
        <p className="hero-sub">Puede que el enlace haya cambiado de sitio</p>
        <div className="hero-actions">
          <Link href="/" className="fx-btn">Volver al inicio</Link>
        </div>
      </div>
    </section>
  );
}
