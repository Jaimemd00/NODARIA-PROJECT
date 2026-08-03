/**
 * Carrusel infinito de texto con el logo de Nodaria intercalado.
 * Se duplica la pista para que el bucle no tenga saltos.
 */
export default function Marquee({ text, repeat = 4, reverse = false, speed = 34 }) {
  const items = Array.from({ length: repeat });

  const Track = ({ hidden }) => (
    <div className="marquee-track" style={{ animationDuration: `${speed}s` }} aria-hidden={hidden}>
      {items.map((_, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className={`marquee-item${i % 2 ? ' outline' : ''}`}>{text}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="marquee-logo" src="/logo.png" alt="" width={50} height={50} />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee${reverse ? ' reverse' : ''}`}>
      <Track />
      <Track hidden />
    </div>
  );
}
