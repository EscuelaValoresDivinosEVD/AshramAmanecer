// Line icons for the visitor app (stroke = currentColor).
const base = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IconFonda = () => (
  <svg {...base} aria-hidden>
    <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 21V3c-2.2 1.2-3.5 3.6-3.5 7v3H17" />
  </svg>
);
export const IconMapa = () => (
  <svg {...base} aria-hidden>
    <path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);
export const IconReloj = () => (
  <svg {...base} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const IconAtras = () => (
  <svg {...base} width={22} height={22} aria-hidden>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
