import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',

  /** Default locale (es) at `/` without prefix; `/en` for English. */
  localePrefix: 'as-needed',

  /**
   * Disable Accept-Language / cookie negotiation to prevent 307 redirects
   * that confuse crawlers. Locale is resolved only from the URL prefix.
   * @see https://next-intl.dev/docs/routing/configuration#locale-detection
   */
  localeDetection: false,

  /**
   * hreflang is emitted via Next.js `generateMetadata` and `sitemap.ts`
   * to keep a single, predictable source of truth for Googlebot.
   */
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
