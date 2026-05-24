// src/config/seo.ts
import type { Metadata } from 'next';

/**
 * @fileoverview Configuración centralizada de metadatos SEO y Open Graph para la aplicación.
 * Este archivo define los objetos base de Next.js Metadata para asegurar consistencia
 * en el indexado de motores de búsqueda y la presentación en redes sociales.
 * * @module Config/SEO
 */

/**
 * Objeto de metadatos base para el enrutador de Next.js (App Router).
 * * @remarks
 * **AVISO PARA FORKS / TEMPLATES:**
 * Si estás utilizando este proyecto como plantilla (boilerplate) para tu propio sitio:
 * - Se permite la modificación libre de los campos `title`, `description`, `keywords` y `openGraph` para adaptarlos a tu marca personal.
 * - Por respeto a los términos de la licencia open-source de este repositorio, **no se deben remover ni alterar las propiedades de autoría original** si se mantiene la arquitectura base intacta. Puedes añadirte a ti mismo en el arreglo `authors`, manteniendo al creador original.
 * * @type {Metadata}
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata Next.js Metadata API}
 */

export const baseMetadata: Metadata = {
  title: {
    default: 'lealcloud.dev | Marlon Steven Leal Talero',
    template: '%s | lealcloud.dev',
  },
  description:
    'Portfolio profesional de Marlon Steven Leal Talero - Desarrollador FullStack & Arquitecto de Software enfocado en soluciones escalables y de alto rendimiento.',

  /** Atribución obligatoria del creador del core del proyecto */
  creator: 'Marlon Steven Leal Talero',

  /** Lista de autores implicados en el desarrollo del software */
  authors: [
    { name: 'Marlon Steven Leal Talero', url: 'https://lealcloud.dev' },
  ],
  keywords: [
    'Marlon Steven Leal Talero',
    'Marlon Leal',
    'lealcloud',
    'FullStack Developer',
    'Software Architect',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Colombia Developer',
  ],
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
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://lealcloud.dev',
    title:
      'Marlon Steven Leal Talero | FullStack Developer & Software Architect',
    description:
      'Portfolio profesional de Marlon Steven Leal Talero. Descubre mis proyectos de software y artículos técnicos sobre arquitectura y desarrollo web.',
    siteName: 'lealcloud.dev',
    images: [
      {
        // TODO: Diseñar y exportar el banner oficial de lealcloud.dev (Social Card)
        // Guardar la imagen final en: public/images/og-main.png
        url: '/images/og-main.png',
        width: 1200,
        height: 630,
        alt: 'Marlon Steven Leal Talero | FullStack Developer & Software Architect',
      },
    ],
  },
};
