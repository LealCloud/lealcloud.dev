import { CustomLink } from '../Link';
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
      label: 'Visitar la página de contacto',
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
   3. COMPONENTE PRINCIPAL
───────────────────────────────────────────────── */

export default function Footer() {
  const { copyright, author, socials } = FOOTER_CONTENT;

  return (
    <footer className="border-primary/10 bg-background/80 mt-6 w-full border-t backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-6 md:flex-row md:justify-between md:py-4">
        {/* Identidad y Autoría */}
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm md:justify-start md:text-left">
          <span>{copyright}</span>
          <span>Diseñado y Desarrollado por {author}</span>
        </div>

        {/* Barra de Navegación Social */}
        <nav aria-label="Enlaces de contacto del pie de página">
          <ul className="m-0 flex list-none gap-1 p-0">
            {socials.map((link) => {
              const Icon = IconMap.social[link.icon];

              return (
                <li key={link.name}>
                  {/* TODO: Reemplazar el renderizado manual de `<CustomLink />` por el componente de UI `<Button />`.
                Motivo: Estandarizar los tokens de interacción del sistema de diseño (hover, transiciones y rings de enfoque), 
                configurando el componente para que actúe como un wrapper polimórfico que use internamente `<CustomLink />` si se provee un `href`.
                */}
                  <CustomLink
                    href={link.url}
                    aria-label={link.label}
                    className="text-muted-foreground hover:bg-primary flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200 hover:text-white"
                  >
                    {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
