import Reveal from './Reveal';

/**
 * Bloque de preguntas frecuentes.
 * Usa <details>/<summary> nativo: accesible, funciona sin JavaScript y Google
 * indexa el contenido aunque esté plegado.
 */
export default function Faq({ items, title = 'Preguntas frecuentes', eyebrow = 'Dudas habituales' }) {
  return (
    <section className="section tight" id="faq">
      <div className="shell">
        <Reveal className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </Reveal>

        <div className="faq">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 70}>
              <details className="faq-item" name="faq">
                <summary>
                  <span>{item.q}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <div className="faq-body">
                  <p>{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
