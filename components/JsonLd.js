/**
 * Inyecta datos estructurados (JSON-LD) en el HTML.
 * Es la forma que recomienda Google frente a microdatos en los atributos.
 */
export default function JsonLd({ data }) {
  const bloques = Array.isArray(data) ? data : [data];

  return (
    <>
      {bloques.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // El contenido lo generamos nosotros en lib/seo.js, no viene del usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
