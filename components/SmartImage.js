'use client';

import { useState } from 'react';

/**
 * Muestra la imagen local de /public/img. Si todavía no se ha descargado
 * (o falla), cae automáticamente a la URL original de Framer.
 */
export default function SmartImage({ src, fallback, alt = '', className, ...rest }) {
  const [current, setCurrent] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
      {...rest}
    />
  );
}
