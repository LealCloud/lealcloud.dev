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

interface BaseNavLink {
  label: string;
  hideInHeader?: boolean;
  /** Determina si la coincidencia de la ruta debe ser exacta */
  exact?: boolean;
}

export type NavLink = BaseNavLink & {
  href: InternalHref | `http${string}` | (string & {});
};

export const NAVIGATION_MAP = [
  { href: '/', label: 'Inicio', exact: true },
  { href: '/projects', label: 'Proyectos' },
  { href: '/lab', label: 'Laboratorio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto', hideInHeader: true },
  { href: 'https://github.com/LealCloud', label: 'GitHub', hideInHeader: true },
  {
    href: 'https://linkedin.com/in/lealcloud/',
    label: 'LinkedIn',
    hideInHeader: true,
  },
] satisfies NavLink[];

export const HEADER_LINKS = NAVIGATION_MAP.filter((link) => !link.hideInHeader);

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
