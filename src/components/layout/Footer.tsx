import Link from 'next/link';
import { IconMap } from '@/lib/iconMap';

/**
 * @fileoverview Componente estructural del pie de página (Footer) para lealcloud.dev.
 * Centraliza las directivas de copyright, metadatos del autor e inyecta la navegación
 * de redes sociales bajo contratos estrictos de accesibilidad y tipado estricto inferido.
 * @module Components/Sections/Footer
 */

/* ─────────────────────────────────────────────────
   1. FUENTES DE VERDAD & INFERENCIA DE TIPOS
───────────────────────────────────────────────── */

type IconName = keyof typeof IconMap.social;

interface SocialLink {
  name: string;
  icon: IconName;
  url: string;
  label: string;
}

interface FooterContent {
  copyright: string;
  author: string;
  socials: SocialLink[];
}

/* ─────────────────────────────────────────────────
   2. CONFIGURACIÓN DE CONTENIDO (SINGLE SOURCE OF TRUTH)
───────────────────────────────────────────────── */

const FOOTER_CONTENT: FooterContent = {
  copyright: '© 2026 LealCloud.Dev.',
  author: 'Steven Leal',
  socials: [
    {
      name: 'email',
      icon: 'email',
      url: '/contact',
      label: 'Enviar correo electrónico',
    },
    {
      name: 'github',
      icon: 'github',
      url: 'https://github.com/LealCloud',
      label: 'Visitar perfil de GitHub',
    },
    {
      name: 'linkedin',
      icon: 'linkedin',
      url: 'https://linkedin.com/in/lealcloud/',
      label: 'Visitar perfil de LinkedIn',
    },
  ],
};

/* ─────────────────────────────────────────────────
   3. COMPONENTE COMPLEMENTARIO PRINCIPAL
───────────────────────────────────────────────── */
export default function Footer() {
  const { copyright, author, socials } = FOOTER_CONTENT;

  return (
    <footer className="hidden">
      <div>
        {/* Bloque de Identidad y Copyright */}
        <div>
          <span>{copyright}</span>
          <span> Hecho por {author}</span>
        </div>

        {/* Navegación Social Accesible */}
        {/* TODO: Migrar la lógica de enrutamiento a un componente aislado y reutilizable.
                Motivo: Seguir las buenas prácticas oficiales de Next.js. Se debe renderizar un elemento 
                `<a>` nativo para URLs externas y el componente `<Link>` de framework exclusivamente para 
                navegación interna, evitando sobrecargar el enrutador del cliente con prefeching innecesario.
        */}
        <nav aria-label="Enlaces de contacto del pie de página">
          <ul className="m-0 flex list-none p-0">
            {socials.map((link) => {
              const Icon = IconMap.social[link.icon];
              const isExternal = link.url.startsWith('http');
              return (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    target={isExternal ? '_blank' : '_self'}
                    {...(isExternal && { rel: 'noopener noreferrer' })}
                    aria-label={link.label}
                  >
                    {Icon && <Icon aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
