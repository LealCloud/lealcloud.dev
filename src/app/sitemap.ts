import type { MetadataRoute } from 'next';
import {
  INDEXABLE_ROUTES,
  getAlternateLanguages,
  getLocalizedUrl,
} from '@/config/site';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((pathname) => ({
    url: getLocalizedUrl(routing.defaultLocale, pathname),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: pathname === '/' ? 1 : 0.8,
    alternates: {
      languages: getAlternateLanguages(pathname),
    },
  }));
}
