import type { MetadataRoute } from 'next';
import {
  INDEXABLE_ROUTES,
  getAlternateLanguages,
  getLocalizedUrl,
} from '@/config/site';
import { routing } from '@/i18n/routing';

/**
 * Dynamic sitemap with hreflang alternates for every indexable route.
 * Each entry uses the default-locale URL as `url` and maps all variants
 * under `alternates.languages` (including `x-default`).
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((pathname) => ({
    url: getLocalizedUrl(routing.defaultLocale, pathname),
    lastModified: new Date(),
    changeFrequency: pathname === '/' ? 'weekly' : 'monthly',
    priority: pathname === '/' ? 1 : 0.8,
    alternates: {
      languages: getAlternateLanguages(pathname),
    },
  }));
}
