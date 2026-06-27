import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  SITE_URL,
  getAlternateLanguages,
  getLocalizedUrl,
  type IndexableRoute,
} from '@/config/site';

export type SupportedLocales = 'es' | 'en';

export const baseStaticMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  creator: 'Marlon Steven Leal Talero',
  authors: [
    { name: 'Marlon Steven Leal Talero', url: SITE_URL },
  ],
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export async function getLocalizedMetadata(
  locale: string,
  pathname: IndexableRoute | string = '/',
  overrides?: {
    title?: string;
    description?: string;
  },
): Promise<Metadata> {
  const lang = (
    locale === 'en' || locale === 'es' ? locale : 'es'
  ) as SupportedLocales;

  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const keywordsArray = t.raw('keywords') as string[];
  const pageUrl = getLocalizedUrl(lang, pathname);
  const title = overrides?.title ?? t('titleDefault');
  const description = overrides?.description ?? t('description');

  return {
    ...baseStaticMetadata,
    title: pathname === '/' ? { default: title, template: '%s | lealcloud.dev' } : title,
    description,
    keywords: Array.isArray(keywordsArray) ? keywordsArray : [],
    alternates: {
      canonical: pageUrl,
      languages: getAlternateLanguages(pathname),
    },
    openGraph: {
      type: 'website',
      locale: t('ogLocale'),
      url: pageUrl,
      title: overrides?.title ?? t('ogTitle'),
      description: overrides?.description ?? t('ogDescription'),
      siteName: 'lealcloud.dev',
      images: [
        {
          url: '/profilePhoto.webp',
          width: 400,
          height: 400,
          alt: t('ogAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: overrides?.title ?? t('ogTitle'),
      description: overrides?.description ?? t('ogDescription'),
      images: ['/profilePhoto.webp'],
    },
  };
}
