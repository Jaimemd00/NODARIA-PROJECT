/**
 * Ondas de enlace entre secciones.
 *
 * En vez de masas de color con borde recto (que creaban un corte visible y
 * demasiada opacidad), esto son trazos finos que fluyen y se desvanecen por los
 * lados y por arriba/abajo con una máscara. Se funden con el fondo continuo del
 * body: minimalista y sin costuras.
 *
 * El trazado se repite dentro del viewBox con un periodo que divide su mitad,
 * así translateX(-50%) cae en el mismo punto de la curva y el bucle no salta.
 */

// periodo 480 → cabe exacto en 2880 (mitad = 1440 = 3 × 480)
const LINE_A =
  'M0,70 q120,-40 240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0';
// periodo 720 → mitad 1440 = 2 × 720
const LINE_B =
  'M0,80 q180,44 360,0 t360,0 t360,0 t360,0 t360,0 t360,0 t360,0 t360,0';
// periodo 480, desfasada
const LINE_C =
  'M0,92 q120,32 240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0 t240,0';

export default function Waves({ flip = false, id = 'w', className = '' }) {
  return (
    <div
      className={`waves${flip ? ' flip' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 2880 150" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}-cool`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f7bff" stopOpacity="0" />
            <stop offset="35%" stopColor="#2f7bff" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#35d6f5" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#35d6f5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-cool2`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0" />
            <stop offset="50%" stopColor="#4c7dff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2f7bff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-aqua`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#35d6f5" stopOpacity="0" />
            <stop offset="50%" stopColor="#4aa8ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2f7bff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path className="w1" d={LINE_B} fill="none" stroke={`url(#${id}-cool)`} strokeWidth="1.4" />
        <path className="w2" d={LINE_A} fill="none" stroke={`url(#${id}-cool2)`} strokeWidth="1.2" />
        <path className="w3" d={LINE_C} fill="none" stroke={`url(#${id}-aqua)`} strokeWidth="1" />
      </svg>
    </div>
  );
}
