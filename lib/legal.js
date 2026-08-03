// Textos legales. Los campos entre [CORCHETES] hay que completarlos con los
// datos reales de la empresa antes de publicar.
export const empresa = {
  titular: '[RAZÓN SOCIAL / NOMBRE Y APELLIDOS]',
  nif: '[NIF / CIF]',
  domicilio: 'Parque, Casa 8, 41420 Écija (Sevilla)',
  email: 'nodariatech@gmail.com',
  telefono: '[TELÉFONO]',
  registro: '[DATOS REGISTRALES, si es sociedad]',
};

export const paginas = {
  'aviso-legal': {
    title: 'Aviso legal',
    intro:
      'Condiciones de uso de este sitio web, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).',
    bloques: [
      {
        h: 'Titular del sitio web',
        p: [
          `Titular: ${empresa.titular}`,
          `NIF: ${empresa.nif}`,
          `Domicilio: ${empresa.domicilio}`,
          `Correo electrónico: ${empresa.email}`,
          `Teléfono: ${empresa.telefono}`,
          `Datos registrales: ${empresa.registro}`,
        ],
      },
      {
        h: 'Objeto',
        p: [
          'Este sitio web tiene por objeto informar sobre los servicios de diseño, desarrollo web y automatización que presta el titular, así como permitir el contacto a través del formulario habilitado.',
          'El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de este aviso legal.',
        ],
      },
      {
        h: 'Propiedad intelectual e industrial',
        p: [
          'Los contenidos del sitio (textos, diseño, código, imágenes y marcas) son titularidad del titular o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.',
        ],
      },
      {
        h: 'Responsabilidad',
        p: [
          'El titular no se hace responsable del uso que los usuarios hagan de los contenidos, ni de los daños derivados de interrupciones del servicio ajenas a su control.',
          'Los enlaces a sitios de terceros se ofrecen a título informativo; el titular no controla ni responde de sus contenidos.',
        ],
      },
      {
        h: 'Legislación aplicable',
        p: [
          'Este aviso legal se rige por la legislación española. Para la resolución de controversias las partes se someten a los juzgados y tribunales del domicilio del usuario cuando este tenga la condición de consumidor.',
        ],
      },
    ],
  },

  privacidad: {
    title: 'Política de privacidad',
    intro:
      'Información sobre el tratamiento de datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    bloques: [
      {
        h: 'Responsable del tratamiento',
        p: [
          `${empresa.titular}, NIF ${empresa.nif}, con domicilio en ${empresa.domicilio}.`,
          `Puedes contactar en ${empresa.email}.`,
        ],
      },
      {
        h: '¿Con qué finalidad tratamos tus datos?',
        p: [
          'Atender las consultas y solicitudes de presupuesto que nos envías a través del formulario de contacto, y gestionar las candidaturas recibidas.',
          'No elaboramos perfiles ni tomamos decisiones automatizadas. No enviamos comunicaciones comerciales salvo que lo autorices expresamente.',
        ],
      },
      {
        h: '¿Qué datos tratamos y por cuánto tiempo?',
        p: [
          'Los que facilitas en el formulario: nombre, correo electrónico, teléfono (opcional), servicio de interés y el contenido de tu mensaje.',
          'Conservamos los datos durante el tiempo necesario para atender tu solicitud y, después, durante los plazos legalmente exigibles para atender posibles responsabilidades.',
        ],
      },
      {
        h: 'Base legitimadora',
        p: [
          'El consentimiento que otorgas al marcar la casilla de aceptación antes de enviar el formulario (art. 6.1.a RGPD), y la aplicación de medidas precontractuales a petición del interesado (art. 6.1.b RGPD).',
        ],
      },
      {
        h: 'Destinatarios',
        p: [
          'No cedemos tus datos a terceros salvo obligación legal. Utilizamos proveedores que actúan como encargados del tratamiento: alojamiento web (Vercel Inc.) y correo electrónico (Google LLC). [REVISAR Y AÑADIR OTROS PROVEEDORES SI LOS HAY.]',
          'Algunos proveedores están ubicados fuera del Espacio Económico Europeo y las transferencias se amparan en las cláusulas contractuales tipo aprobadas por la Comisión Europea.',
        ],
      },
      {
        h: 'Tus derechos',
        p: [
          `Puedes solicitar acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a ${empresa.email}, indicando el derecho que ejercitas y acreditando tu identidad.`,
          'Si consideras que el tratamiento no se ajusta a la normativa, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).',
        ],
      },
    ],
  },

  cookies: {
    title: 'Política de cookies',
    intro: 'Información sobre las cookies y tecnologías similares que utiliza este sitio web.',
    bloques: [
      {
        h: '¿Qué cookies usamos?',
        p: [
          'Actualmente este sitio no instala cookies de analítica ni de publicidad propias. Solo se emplean las estrictamente necesarias para que la web funcione, que están exentas del deber de consentimiento.',
          'El mapa de la página de contacto se carga desde Google Maps, que puede instalar cookies propias al interactuar con él. Puedes consultar su política en policies.google.com.',
          '[SI SE AÑADE GOOGLE ANALYTICS, META PIXEL O SIMILAR, HAY QUE ACTUALIZAR ESTA TABLA E INSTALAR UN BANNER DE CONSENTIMIENTO.]',
        ],
      },
      {
        h: 'Cómo gestionarlas',
        p: [
          'Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar algunas puede afectar al funcionamiento del sitio.',
        ],
      },
    ],
  },
};
