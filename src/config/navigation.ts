/**
 * @fileoverview Configuración de rutas, contratos de tipado y utilidades de navegación.
 * @module Config/Navigation
 */

export const INTERNAL_ROUTES = [
  '/',
  '/projects',
  '/lab',
  '/blog',
  '/contact',
] as const;

export type InternalHref = (typeof INTERNAL_ROUTES)[number];

export type NavigationLabelKey =
  | 'home'
  | 'projects'
  | 'lab'
  | 'blog'
  | 'contact'
  | 'github'
  | 'linkedin';

interface BaseNavLink {
  labelKey: NavigationLabelKey;
  hideInHeader?: boolean;
  /** Determina si la coincidencia de la ruta debe ser exacta */
  exact?: boolean;
}

export type NavLink = BaseNavLink & {
  href: InternalHref | `http${string}` | (string & {});
};

export const NAVIGATION_MAP = [
  { href: '/', labelKey: 'home', exact: true },
  { href: '/projects', labelKey: 'projects', hideInHeader: true },
  { href: '/lab', labelKey: 'lab', hideInHeader: true },
  { href: '/blog', labelKey: 'blog', hideInHeader: true },
  { href: '/contact', labelKey: 'contact', hideInHeader: true },
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
] satisfies NavLink[];

export const HEADER_LINKS = NAVIGATION_MAP.filter((link) => !link.hideInHeader);

export type MapHref = (typeof NAVIGATION_MAP)[number]['href'];

/**
 * Determina si una ruta de navegación está activa basándose en el pathname actual.
 * Maneja coincidencia exacta, parcial por sub-rutas y descarta enlaces externos o hashes.
 */
export function isNavLinkActive(pathname: string, link: NavLink): boolean {
  const { href, exact } = link;

  if (href === '#' || href.startsWith('http')) return false;
  if (exact) return pathname === href;
  if (href === '/') return pathname === '/';

  return pathname === href || pathname.startsWith(`${href}/`);
}
