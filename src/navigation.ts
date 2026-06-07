/**
 * @fileoverview Punto de entrada único para navegación localizada.
 * Re-exporta los helpers de next-intl para garantizar client-side routing
 * sin hard refresh al cambiar de idioma o ruta.
 */
export {
  routing,
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
  type AppLocale,
} from '@/i18n/routing';
