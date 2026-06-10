import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { type SocialIconName } from '@/lib/iconMap';

interface SocialLink {
  name: string;
  icon: SocialIconName;
  url: string;
  labelKey: 'email' | 'github' | 'linkedin';
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'email',
    icon: 'email',
    url: '/contact',
    labelKey: 'email',
  },
  {
    name: 'github',
    icon: 'github',
    url: 'https://github.com/LealCloud',
    labelKey: 'github',
  },
  {
    name: 'linkedin',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/lealcloud/',
    labelKey: 'linkedin',
  },
];

export default async function Footer() {
  const t = await getTranslations('layout.footer');
  const author = t('author');

  return (
    <footer className="border-primary/10 bg-background/80 mt-6 w-full border-t backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-6 md:flex-row md:justify-between md:py-4">
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm md:justify-start md:text-left">
          <span>{t('copyright')}</span>
          <span>{t('designedBy', { author })}</span>
        </div>

        <nav aria-label={t('socialNavAria')}>
          <ul className="m-0 flex list-none gap-1 p-0">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.name}>
                <Button
                  href={link.url}
                  variant="social"
                  size="sm"
                  icon={link.icon}
                  aria-label={t(`social.${link.labelKey}`)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
