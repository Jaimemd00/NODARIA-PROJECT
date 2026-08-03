'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Arrow } from './Icons';
import Link from 'next/link';
import { services } from '@/lib/site';

const VACIO = { nombre: '', email: '', telefono: '', servicio: '', mensaje: '', web: '' };

function Letras({ texto }) {
  return (
    <span className="fx-letters" aria-label={texto}>
      {texto.split('').map((c, i) => (
        <span className="fx-letter" key={i} style={{ '--i': i }} aria-hidden="true">
          <i>{c === ' ' ? '\u00A0' : c}</i>
          <i>{c === ' ' ? '\u00A0' : c}</i>
        </span>
      ))}
    </span>
  );
}

export default function ContactForm({
  note = 'Respondemos en menos de 24 h laborables.',
  cta = 'Enviar mensaje',
  compact = false,
}) {
  const pathname = usePathname();
  const [valores, setValores] = useState(VACIO);
  const [estado, setEstado] = useState('idle'); // idle | enviando | ok | error
  const [error, setError] = useState('');
  const [tocado, setTocado] = useState({});
  const [consiente, setConsiente] = useState(false);

  const cambiar = (campo) => (e) => {
    setValores((v) => ({ ...v, [campo]: e.target.value }));
    if (estado === 'error') setEstado('idle');
  };

  const marcar = (campo) => () => setTocado((t) => ({ ...t, [campo]: true }));

  const invalido = (campo) => {
    if (!tocado[campo]) return false;
    if (campo === 'email') return !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valores.email);
    return !valores[campo].trim();
  };

  async function enviar(e) {
    e.preventDefault();
    setTocado({ nombre: true, email: true, mensaje: true });

    if (!valores.nombre.trim() || !valores.mensaje.trim() || invalido('email')) {
      setEstado('error');
      setError('Revisa los campos marcados antes de enviar.');
      return;
    }

    if (!consiente) {
      setEstado('error');
      setError('Necesitamos que aceptes la política de privacidad para poder responderte.');
      return;
    }

    setEstado('enviando');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...valores, consent: true, origen: pathname }),
        signal: AbortSignal.timeout(25_000),
      });
      const datos = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(datos.error || 'No se pudo enviar el mensaje.');
        setEstado('error');
        return;
      }

      setValores(VACIO);
      setTocado({});
      setConsiente(false);
      setEstado('ok');
    } catch (err) {
      setError(
        err?.name === 'TimeoutError'
          ? 'El envío está tardando demasiado. Escríbenos a nodariatech@gmail.com y lo vemos.'
          : 'Sin conexión con el servidor. Inténtalo de nuevo en un momento.'
      );
      setEstado('error');
    }
  }

  return (
    <form className="form" onSubmit={enviar} noValidate>
      <div className="form-row">
        <div className={`field${invalido('nombre') ? ' invalid' : ''}`}>
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            autoComplete="name"
            value={valores.nombre}
            onChange={cambiar('nombre')}
            onBlur={marcar('nombre')}
            placeholder="Cómo te llamas"
          />
          {invalido('nombre') && <span className="field-error">Necesitamos tu nombre.</span>}
        </div>

        <div className={`field${invalido('email') ? ' invalid' : ''}`}>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={valores.email}
            onChange={cambiar('email')}
            onBlur={marcar('email')}
            placeholder="tu@email.com"
          />
          {invalido('email') && <span className="field-error">Ese email no parece válido.</span>}
        </div>
      </div>

      {!compact && (
        <div className="form-row">
          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={valores.telefono}
              onChange={cambiar('telefono')}
              placeholder="Opcional"
            />
          </div>

          <div className="field">
            <label htmlFor="servicio">Qué necesitas</label>
            <select
              id="servicio"
              name="servicio"
              value={valores.servicio}
              onChange={cambiar('servicio')}
            >
              <option value="">Elige una opción</option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Trabajar con vosotros">Trabajar con vosotros</option>
              <option value="Otra cosa">Otra cosa</option>
            </select>
          </div>
        </div>
      )}

      <div className={`field${invalido('mensaje') ? ' invalid' : ''}`}>
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={valores.mensaje}
          onChange={cambiar('mensaje')}
          onBlur={marcar('mensaje')}
          placeholder="Cuéntanos qué necesitas"
        />
        {invalido('mensaje') && <span className="field-error">Escribe tu mensaje.</span>}
      </div>

      {/* Trampa antispam: oculta para personas */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="web">No rellenar</label>
        <input id="web" name="web" tabIndex={-1} autoComplete="off" value={valores.web} onChange={cambiar('web')} />
      </div>

      <label className={`consent${estado === 'error' && !consiente ? ' invalid' : ''}`}>
        <input
          type="checkbox"
          name="consent"
          checked={consiente}
          onChange={(e) => {
            setConsiente(e.target.checked);
            if (estado === 'error') setEstado('idle');
          }}
        />
        <span>
          He leído y acepto la{' '}
          <Link href="/legal/privacidad">política de privacidad</Link>. Usaremos tus datos solo para
          responderte.
        </span>
      </label>

      <button type="submit" className="fx-btn" disabled={estado === 'enviando'}>
        <Letras texto={estado === 'enviando' ? 'Enviando…' : cta} />
        <Arrow className="fx-arrow" />
      </button>

      <div role="status" aria-live="polite">
        {estado === 'ok' ? (
          <p className="form-msg ok">
            Mensaje enviado. Te escribimos a la mayor brevedad.
          </p>
        ) : estado === 'error' ? (
          <p className="form-msg err">{error}</p>
        ) : (
          <p className="form-note">{note}</p>
        )}
      </div>
    </form>
  );
}
