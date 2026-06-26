import { routing, type AppLocale } from '@/i18n/routing';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lealcloud.dev';

/** Public routes included in sitemap.xml and hreflang alternates. */
export const INDEXABLE_ROUTES = ['/', '/contact'] as const;

export type IndexableRoute = (typeof INDEXABLE_ROUTES)[number];

export function getLocalizedUrl(
  locale: AppLocale,
  pathname: IndexableRoute | string = '/',
): string {
  const normalizedPath =
    pathname === '/' || pathname === '' ? '' : pathname.replace(/\/$/, '');

  if (locale === routing.defaultLocale) {
    return normalizedPath ? `${SITE_URL}${normalizedPath}` : SITE_URL;
  }

  return normalizedPath
    ? `${SITE_URL}/${locale}${normalizedPath}`
    : `${SITE_URL}/${locale}`;
}

export function getAlternateLanguages(
  pathname: IndexableRoute | string = '/',
): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedUrl(locale, pathname)]),
  );

  return {
    ...languages,
    'x-default': getLocalizedUrl(routing.defaultLocale, pathname),
  };
}
