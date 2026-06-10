import { SITE_URL, getLocalizedUrl } from '@/config/site';
import type { SupportedLocales } from '@/config/seo';

interface JsonLdProps {
  locale: SupportedLocales;
  description: string;
}

export function JsonLd({ locale, description }: JsonLdProps) {
  const pageUrl = getLocalizedUrl(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'lealcloud.dev',
        description,
        inLanguage: ['es-CO', 'en-US'],
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: 'lealcloud.dev',
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        inLanguage: locale === 'es' ? 'es-CO' : 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Marlon Steven Leal Talero',
        alternateName: ['Steven Leal', 'LealCloud'],
        url: pageUrl,
        image: `${SITE_URL}/profilePhoto.webp`,
        jobTitle: 'Software Engineer & Architect',
        sameAs: [
          'https://github.com/LealCloud',
          'https://linkedin.com/in/lealcloud/',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
