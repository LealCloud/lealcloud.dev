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
  pathname: IndexableRoute = '/',
): Promise<Metadata> {
  const lang = (
    locale === 'en' || locale === 'es' ? locale : 'es'
  ) as SupportedLocales;

  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const keywordsArray = t.raw('keywords') as string[];
  const pageUrl = getLocalizedUrl(lang, pathname);

  return {
    ...baseStaticMetadata,
    title: {
      default: t('titleDefault'),
      template: '%s | lealcloud.dev',
    },
    description: t('description'),
    keywords: Array.isArray(keywordsArray) ? keywordsArray : [],
    alternates: {
      canonical: pageUrl,
      languages: getAlternateLanguages(pathname),
    },
    openGraph: {
      type: 'website',
      locale: t('ogLocale'),
      url: pageUrl,
      title: t('ogTitle'),
      description: t('ogDescription'),
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
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/profilePhoto.webp'],
    },
  };
}
