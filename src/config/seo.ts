/**
 * @fileoverview Configuración centralizada e internacionalizada de metadatos SEO y Open Graph.
 * Consume los mensajes asíncronos gestionados por next-intl.
 * @module Config/SEO
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export type SupportedLocales = 'es' | 'en';

/**
 * Metadatos estáticos base independientes del idioma del usuario.
 */
export const baseStaticMetadata: Partial<Metadata> = {
  creator: 'Marlon Steven Leal Talero',
  authors: [
    { name: 'Marlon Steven Leal Talero', url: 'https://lealcloud.dev' },
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

/**
 * Genera el objeto completo de Metadata consumiendo las traducciones de next-intl.
 * @param locale - Código del idioma actual obtenido desde los parámetros de la ruta.
 * @returns Promesa que resuelve el objeto Metadata de Next.js App Router.
 */
export async function getLocalizedMetadata(locale: string): Promise<Metadata> {
  // Aseguramos fallback en caso de un locale inválido antes de invocar los mensajes
  const lang = (locale === 'en' || locale === 'es' ? locale : 'es') as SupportedLocales;
  
  // Cargamos el namespace 'Metadata' de los JSONs correspondientes
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });

  // Recuperamos el array de keywords de forma segura mediante t.raw
  const keywordsArray = t.raw('keywords') as string[];

  return {
    ...baseStaticMetadata,
    title: {
      default: t('titleDefault'),
      template: '%s | lealcloud.dev',
    },
    description: t('description'),
    keywords: Array.isArray(keywordsArray) ? keywordsArray : [],
    openGraph: {
      type: 'website',
      locale: t('ogLocale'),
      url: 'https://lealcloud.dev',
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'lealcloud.dev',
      images: [
        {
        // TODO: Diseñar y exportar el banner oficial de lealcloud.dev (Social Card)
        // Guardar la imagen final en: public/images/og-main.png
          url: '/images/og-main.png',
          width: 1200,
          height: 630,
          alt: t('ogAlt'),
        },
      ],
    },
  };
}