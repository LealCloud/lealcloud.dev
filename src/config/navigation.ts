export const INTERNAL_ROUTES = [
  '/',
  '/projects',
  '/lab',
  '/blog',
  '/contact',
] as const;

export type InternalHref = (typeof INTERNAL_ROUTES)[number];
export type ExternalHref = `http${string}`;
export type AllowedHref = InternalHref | ExternalHref;

export type NavigationLabelKey =
  'home' | 'projects' | 'lab' | 'blog' | 'contact' | 'github' | 'linkedin';

// Diccionario de textos hardcodeados
export const NAVIGATION_LABELS: Record<NavigationLabelKey, string> = {
  home: 'Inicio',
  projects: 'Proyectos',
  lab: 'Laboratorio',
  blog: 'Blog',
  contact: 'Contacto',
  github: 'GitHub',
  linkedin: 'LinkedIn',
};

interface BaseNavLink {
  labelKey: NavigationLabelKey;
  hideInHeader?: boolean;
  exact?: boolean;
}

export type NavLink = BaseNavLink & {
  href: AllowedHref;
};

export const NAVIGATION_MAP: NavLink[] = [
  { href: '/', labelKey: 'home', exact: true },
  { href: '/projects', labelKey: 'projects', hideInHeader: true },
  { href: '/lab', labelKey: 'lab', hideInHeader: true },
  { href: '/blog', labelKey: 'blog', hideInHeader: true },
  { href: '/contact', labelKey: 'contact' },
  {
    href: 'https://github.com/LealCloud',
    labelKey: 'github',
    hideInHeader: true,
  },
  {
    href: 'https://linkedin.com/in/lealcloud/',
    labelKey: 'linkedin',
    hideInHeader: true,
  },
];

export const HEADER_LINKS = NAVIGATION_MAP.filter((link) => !link.hideInHeader);

export type MapHref = (typeof NAVIGATION_MAP)[number]['href'];

// Helper para obtener el texto de un label
export function getNavText(labelKey: NavigationLabelKey): string {
  return NAVIGATION_LABELS[labelKey];
}

function isInternalLink(href: AllowedHref): href is InternalHref {
  return !href.startsWith('http');
}

export function isNavLinkActive(pathname: string, link: NavLink): boolean {
  if (!isInternalLink(link.href)) return false;
  if (link.exact) return pathname === link.href;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}
