const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function ServiceIcon({ name }) {
  const paths = {
    layout: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" {...s} />
        <path d="M3 9h18M9 9v11" {...s} />
      </>
    ),
    code: <path d="m8 6-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16" {...s} />,
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" {...s} />
        <path d="m16 16 4.5 4.5" {...s} />
      </>
    ),
    pen: <path d="M15.5 4.5 19.5 8.5 8 20H4v-4L15.5 4.5ZM13.5 6.5l4 4" {...s} />,
    share: (
      <>
        <circle cx="18" cy="5.5" r="2.6" {...s} />
        <circle cx="6" cy="12" r="2.6" {...s} />
        <circle cx="18" cy="18.5" r="2.6" {...s} />
        <path d="m8.4 10.7 7.2-3.9M8.4 13.3l7.2 3.9" {...s} />
      </>
    ),
    play: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" {...s} />
        <path d="m10.5 9.5 4.5 2.5-4.5 2.5V9.5Z" {...s} />
      </>
    ),
    signal: <path d="M12 10.5v9M8.5 8a5 5 0 0 1 7 0M5.5 5a9 9 0 0 1 13 0M12 12.5v0" {...s} />,
    flow: (
      <>
        <rect x="2.5" y="4" width="7" height="5.5" rx="1.6" {...s} />
        <rect x="14.5" y="14.5" width="7" height="5.5" rx="1.6" {...s} />
        <circle cx="12" cy="12" r="2.2" {...s} />
        <path d="M9.5 6.75h1.2A1.3 1.3 0 0 1 12 8.05v1.75M12 14.2v1.75a1.3 1.3 0 0 0 1.3 1.3h1.2" {...s} />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7.5" width="18" height="12.5" rx="2" {...s} />
        <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18" {...s} />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] || paths.layout}
    </svg>
  );
}

export function SocialIcon({ name }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" {...s} />
        <circle cx="12" cy="12" r="4" {...s} />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    x: <path d="M4 4h3.8l4.4 6 5-6H20l-6.6 7.8L20.4 20h-3.8l-4.7-6.4L6.4 20H4l7-8.3L4 4Z" fill="currentColor" stroke="none" />,
    facebook: (
      <path
        d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.5-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.5v3h2.8v8h3.2Z"
        fill="currentColor"
        stroke="none"
      />
    ),
    tiktok: (
      <path
        d="M14.2 3h2.6c.2 1.9 1.4 3.3 3.2 3.5v2.6c-1.2 0-2.3-.4-3.2-1v5.7a5.4 5.4 0 1 1-5.4-5.4c.3 0 .5 0 .8.1v2.7a2.8 2.8 0 1 0 2 2.6V3Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Arrow(props) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" {...props}>
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" {...s} />
    </svg>
  );
}
