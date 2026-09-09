import { Button } from '@/components/ui/Button';
import { type InternalHref } from '@/config/navigation';
import { type SocialIconName } from '@/lib/icon-map';

type AllowedHref = InternalHref | `http${string}`;

interface SocialLink {
  name: string;
  icon: SocialIconName;
  url: AllowedHref;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'email',
    icon: 'email',
    url: '/contact',
    label: 'Contacto por email',
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
];

const isExternalLink = (url: AllowedHref): boolean => {
  if (typeof url !== 'string') return false;
  return url.startsWith('http');
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const author = 'Steven Leal Talero';

  return (
    <footer className="bg-background/80 relative mt-6 w-full backdrop-blur-sm">
      <div className="via-primary/40 h-px w-full bg-linear-to-r from-transparent to-transparent" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-6 md:flex-row md:justify-between md:py-4">
        <div className="text-foreground-subtle flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm md:justify-start md:text-left">
          <span className="text-foreground font-serif font-medium">
            LealCloud<span className="text-primary">.</span>Dev
          </span>
          <span aria-hidden className="text-border">
            •
          </span>
          <span>
            © {currentYear} Diseñado y desarrollado por {author}
          </span>
        </div>

        <nav aria-label="Enlaces de contacto del pie de página">
          <ul className="m-0 flex list-none gap-1 p-0">
            {SOCIAL_LINKS.map((link) => {
              const external = isExternalLink(link.url);
              return (
                <li key={link.name}>
                  <Button
                    variant="social"
                    size="sm"
                    href={link.url}
                    icon={link.icon}
                    aria-label={link.label}
                    className="transition-transform duration-200 hover:-translate-y-0.5"
                    {...(external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
