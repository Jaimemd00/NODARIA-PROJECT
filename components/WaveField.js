/**
 * Campo de ondas de fondo (el "haz" azul de la referencia).
 *
 * Genera N líneas repartidas por todo el alto de la sección. Cada línea es una
 * senoide muestreada punto a punto, con fase y amplitud propias, de modo que el
 * conjunto ondula de forma orgánica en lugar de ser líneas paralelas planas.
 * Todo es determinista (sin Math.random) para que servidor y cliente rendericen
 * igual y no haya parpadeo de hidratación.
 *
 * Se anima con un desplazamiento horizontal lento (translateX) sobre un lienzo
 * más ancho que el viewBox, así el bucle es continuo.
 */

const VW = 1600; // ancho del viewBox visible
const VH = 620; // alto del viewBox
const OVER = 1.6; // se dibuja 1.6× de ancho para poder desplazar sin huecos
const W = VW * OVER;
const STEP = 24; // resolución de la curva (menor = más suave, más puntos)

function linea(fase, amp, yBase, curva) {
  let d = '';
  for (let x = -40; x <= W + 40; x += STEP) {
    // Dos senoides superpuestas → ondulación menos regular
    const y =
      yBase +
      Math.sin(x / 260 + fase) * amp +
      Math.sin(x / 90 + fase * 1.7) * amp * 0.28 +
      curva;
    d += `${x === -40 ? 'M' : 'L'}${x.toFixed(0)},${y.toFixed(1)} `;
  }
  return d.trim();
}

export default function WaveField({ id = 'wf', lines = 22, className = '' }) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const t = i / (lines - 1); // 0..1 de arriba a abajo
    const yBase = VH * (0.08 + t * 0.84); // reparte por casi todo el alto
    const amp = 26 + Math.sin(t * Math.PI) * 30; // más amplitud en el centro del haz
    const fase = t * 5.2; // desfasa cada línea
    const curva = Math.sin(t * Math.PI) * -40; // leve arqueo del conjunto
    const opacity = 0.14 + Math.sin(t * Math.PI) * 0.5; // el centro brilla más
    return { d: linea(fase, amp, yBase, curva), opacity, key: i };
  });

  return (
    <div className={`wavefield${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f7bff" stopOpacity="0" />
            <stop offset="20%" stopColor="#2f7bff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#4aa8ff" stopOpacity="1" />
            <stop offset="80%" stopColor="#35d6f5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#35d6f5" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="wavefield-g" stroke={`url(#${id}-stroke)`} fill="none" strokeWidth="1">
          {paths.map((p) => (
            <path key={p.key} d={p.d} style={{ opacity: p.opacity }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
