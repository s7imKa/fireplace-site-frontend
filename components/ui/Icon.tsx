import type { SVGProps } from "react";

/** Єдиний набір лінійних іконок FireHome: 24×24, stroke 1.6, currentColor. */
const paths = {
  flame: (
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-2.7 1.6-4.6 3.2-6.4.3 1.7 1.2 2.9 2.4 3.4-.3-3.1 1-6.1 3.6-8.3-.2 2.6.8 4.4 2.3 6.1 1.2 1.4 1.9 3 1.9 4.9 0 3.8-2.8 6.5-6.9 6.5Zm0 0c-1.7 0-2.8-1.1-2.8-2.6 0-1.4 1-2.4 2-3.4.3 1 .9 1.6 1.7 1.8.9.3 1.8 1.1 1.8 2.2 0 1.2-1.1 2-2.7 2Z" />
  ),
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  cart: <><path d="M3 4h2.2l2.1 10.4a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2" /><circle cx="9.5" cy="19.5" r="1.2" /><circle cx="17" cy="19.5" r="1.2" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowRight: <path d="M5 12h14m-5-5 5 5-5 5" />,
  arrowLeft: <path d="M19 12H5m5-5-5 5 5 5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  shield: <><path d="M12 3 5 6v5.5c0 4.3 2.9 8 7 9.5 4.1-1.5 7-5.2 7-9.5V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  tools: <><path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6L20 12l-7.5 7.5a2.1 2.1 0 0 1-3-3L17 9" /><path d="M14.5 6.5 17 4l3 3-2.5 2.5" /><path d="m4 4 5.5 5.5M4 4l-1 3 2 2 3-1" /></>,
  consult: <><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-1.8 2.5-5 2.5" /></>,
  truck: <><path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  phone: <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2.1-2.2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  stove: <><rect x="5" y="8" width="14" height="11" rx="1.5" /><path d="M10 3h4v5h-4zM8 19v2M16 19v2" /><rect x="8" y="11" width="8" height="5" rx="1" /></>,
  home: <><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5h4v5" /></>,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  star: <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8L12 3.8Z" />,
  ruler: <><path d="m3 16 13-13 5 5-13 13z" /><path d="m7 12 2 2M10 9l2 2M13 6l2 2" /></>,
  card: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>,
  quote: <path d="M9.5 7H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1.5A2.5 2.5 0 0 1 6.5 17M19 7h-3.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1.5A2.5 2.5 0 0 1 16 17" />,
  chimney: <><path d="M9 3h6v4H9zM10 7v6h4V7" /><path d="M5 21v-6h14v6M5 15l7-3 7 3" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  trash: <path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 22, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
