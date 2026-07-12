const paths = {
  overview: <><path d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-16v4h6V4h-6Z" /></>,
  risks: <><path d="M12 3 2.8 19a1.3 1.3 0 0 0 1.1 2h16.2a1.3 1.3 0 0 0 1.1-2L12 3Z" /><path d="M12 9v4m0 4h.01" /></>,
  trace: <><circle cx="5" cy="12" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="m7 11 8.8-4M7 13l8.8 4" /></>,
  evidence: <><path d="M7 3h8l4 4v14H7V3Z" /><path d="M15 3v5h4M10 13l1.5 1.5L16 10m-6 8h6" /></>,
  memory: <><path d="M8 4a3 3 0 0 0-3 3v1.2A3.5 3.5 0 0 0 4 15v1a3 3 0 0 0 3 3h1m8-15a3 3 0 0 1 3 3v1.2a3.5 3.5 0 0 1 1 6.8v1a3 3 0 0 1-3 3h-1M8 4v16m8-16v16M8 9h3m2 6h3m-8 1h3m2-8h3" /></>,
  recorder: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2M8 3.9 6.5 2.5M16 3.9l1.5-1.4" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.7 2.8 7.8 7 9.5 4.2-1.7 7-4.8 7-9.5V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></>,
  compare: <><rect x="3" y="5" width="7" height="14" rx="2" /><rect x="14" y="5" width="7" height="14" rx="2" /><path d="M7 9v6m10-8v10" /></>,
  command: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
  arrow: <><path d="M5 12h14m-5-5 5 5-5 5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  spark: <><path d="m12 2 1.2 5.8L19 9l-5.8 1.2L12 16l-1.2-5.8L5 9l5.8-1.2L12 2Z" /><path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z" /></>,
  copy: <><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" /></>,
  file: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h4" /></>,
  filter: <path d="M4 6h16M7 12h10m-7 6h4" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 20h14" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
};

export default function Icon({ name, size = 18, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.file}
    </svg>
  );
}
