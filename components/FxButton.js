import Link from 'next/link';
import { Arrow } from './Icons';

/**
 * Botón con el efecto de letras que suben al pasar el cursor.
 * Cada carácter se duplica: la copia de arriba sale y la de abajo entra.
 */
function Letters({ text }) {
  return (
    <span className="fx-letters" aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          className="fx-letter"
          key={`${char}-${i}`}
          style={{ '--i': i }}
          aria-hidden="true"
        >
          <i>{char === ' ' ? '\u00A0' : char}</i>
          <i>{char === ' ' ? '\u00A0' : char}</i>
        </span>
      ))}
    </span>
  );
}

export default function FxButton({ href = '/contacto', label = 'Contáctanos', variant, arrow = true }) {
  const className = `fx-btn${variant === 'ghost' ? ' ghost' : ''}`;

  return (
    <Link href={href} className={className}>
      <Letters text={label} />
      {arrow && <Arrow className="fx-arrow" />}
    </Link>
  );
}
