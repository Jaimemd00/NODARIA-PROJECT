/**
 * Cadena de nodos animada que representa un flujo de automatización.
 * Sustituye a la foto en el bloque de Automatizaciones: es más honesto que
 * una imagen de stock y explica el servicio de un vistazo.
 */

const NODES = [
  { label: 'Formulario' },
  { label: 'n8n', core: true },
  { label: 'CRM' },
  { label: 'Aviso' },
];

export default function FlowDiagram() {
  return (
    <div className="flow">
      <span className="flow-label">Un flujo real, simplificado</span>

      <div className="flow-chain">
        {NODES.map((node, i) => (
          <span key={node.label} style={{ display: 'contents' }}>
            {i > 0 && <span className="flow-link" style={{ '--delay': `${i * 0.55}s` }} />}
            <span
              className={`flow-node${node.core ? ' core' : ''}`}
              style={{ '--delay': `${i * 0.4}s` }}
            >
              <span className="dot" />
              {node.label}
            </span>
          </span>
        ))}
      </div>

      <div className="flow-stats">
        <div className="flow-stat">
          <b>24/7</b>
          <span>Sin supervisión</span>
        </div>
        <div className="flow-stat">
          <b>0</b>
          <span>Copiar y pegar</span>
        </div>
        <div className="flow-stat">
          <b>+200</b>
          <span>Apps conectables</span>
        </div>
      </div>
    </div>
  );
}
