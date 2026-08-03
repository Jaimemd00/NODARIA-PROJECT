'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/lib/site';

export default function Nav() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = nav.filter((item) => item.href !== '/');

  return (
    <>
      <header className={`nav${stuck ? ' is-stuck' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" width={30} height={30} />
            {site.name}
          </Link>

          <nav className="nav-links" aria-label="Principal">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${pathname === item.href ? ' active' : ''}`}
              >
                {item.navLabel}
              </Link>
            ))}
          </nav>

          <Link href="/contacto" className="nav-cta">
            Hablemos
          </Link>

          <button
            type="button"
            className={`burger${open ? ' open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? ' open' : ''}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.navLabel}
          </Link>
        ))}
        <Link href="/contacto" className="nav-cta drawer-cta" style={{ display: 'inline-flex' }}>
          Hablemos
        </Link>
      </div>
    </>
  );
}
