import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { type SocialIconName } from '@/lib/iconMap';
import { cn } from '@/utilities/cn';

const SOCIAL = [
  { name: 'contact', url: '/contact', icon: 'email', variant: 'social' },
  {
    name: 'github',
    url: 'https://github.com/LealCloud',
    icon: 'github',
    variant: 'social',
  },
  {
    name: 'linkedin',
    url: 'https://linkedin.com/in/lealcloud/',
    icon: 'linkedin',
    variant: 'social',
  },
] as const satisfies ReadonlyArray<{
  name: 'contact' | 'github' | 'linkedin';
  url: string;
  icon: SocialIconName;
  variant: 'social';
}>;

const STAT_KEYS = ['stack', 'focus', 'status', 'location'] as const;

export default async function Hero() {
  const t = await getTranslations('pages.home.hero');

  const name = t('name');
  const badge = t('badge');

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col items-center justify-center gap-12 overflow-hidden px-6 pt-24 lg:flex-row lg:items-center lg:px-16"
    >
      <div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:col-span-7 lg:max-w-[55%] lg:items-start lg:text-left">
        {badge && (
          <div className="border-accent/40 relative inline-flex items-center justify-center overflow-hidden rounded-full border p-px select-none">
            <span
              aria-hidden
              className="absolute inset-0 h-full w-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,var(--color-accent)_50%,var(--color-secondary)_90%,transparent_100%)] opacity-50 will-change-transform"
            />
            <span className="text-accent bg-background/40 relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium backdrop-blur-md">
              <span
                aria-hidden
                className="relative flex size-2.5 items-center justify-center"
              >
                <span className="bg-accent absolute inline-flex size-full animate-[ping_2s_cubic-bezier(0.25,0,0,1)_infinite] rounded-full opacity-75" />
                <span className="bg-accent relative inline-flex size-2.5 rounded-full" />
              </span>
              {badge}
            </span>
          </div>
        )}

        <div className="flex w-full flex-col items-center gap-0.5 lg:items-start">
          <h1
            id="hero-title"
            className="text-foreground text-center text-4xl leading-none font-black sm:text-5xl lg:text-left lg:text-6xl"
          >
            <strong>{name}</strong>
          </h1>
          <h2 className="text-muted-foreground text-center text-xs font-medium tracking-wider uppercase sm:text-sm lg:text-left lg:text-base">
            {t('role')}
          </h2>
        </div>

        <p className="text-muted-foreground/90 max-w-2xl text-center font-sans text-sm leading-relaxed tracking-normal sm:text-base lg:text-left">
          {t.rich('description', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <nav aria-label={t('socialNav')} className="w-full">
          <ul className="m-0 flex list-none flex-wrap justify-center gap-3 p-0 lg:justify-start">
            {SOCIAL.map((network) => {
              const label = t(`social.${network.name}`);

              return (
                <li key={network.name}>
                  <Button
                    href={network.url}
                    variant={network.variant}
                    icon={network.icon}
                    aria-label={t('socialProfileAria', {
                      name,
                      network: label,
                    })}
                    className="capitalize"
                  >
                    {label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        <dl className="border-foreground/10 mt-4 grid w-full grid-cols-2 gap-4 border-t pt-6 sm:gap-3 md:grid-cols-4">
          {STAT_KEYS.map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <dt className="text-primary font-mono text-xs font-medium tracking-widest uppercase opacity-90 lg:text-[11px]">
                {t(`stats.${key}.label`)}
              </dt>
              <dd className="text-foreground balance text-sm font-medium">
                {t(`stats.${key}.value`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="group relative order-1 flex justify-center lg:order-2 lg:justify-end">
        <div
          aria-hidden
          className="border-primary/40 absolute -top-4 -right-4 h-24 w-24 rounded-tr-3xl border-t-2 border-r-2 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
        />
        <div
          aria-hidden
          className="border-secondary/40 absolute -bottom-4 -left-4 h-24 w-24 rounded-bl-3xl border-b-2 border-l-2 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2"
        />

        <div className="ring-foreground/10 group-hover:ring-primary/50 relative z-10 h-64 w-64 overflow-hidden rounded-2xl shadow-2xl ring-1 transition-all duration-500 md:h-80 md:w-80 lg:h-100 lg:w-100">
          <Image
            src="/profilePhoto.webp"
            alt={t('profilePhotoAlt', { name })}
            width={400}
            height={400}
            priority
            className="h-full w-full scale-105 object-cover grayscale transition-all duration-700 hover:scale-100 hover:grayscale-0"
          />
          <div
            aria-hidden
            className="from-background/60 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent"
          />
        </div>

        <div className="border-primary/20 absolute -right-8 bottom-6 z-20 animate-bounce rounded-lg border p-2 shadow-xl hover:animate-none">
          <div className="flex items-center gap-2">
            <svg
              aria-hidden
              className="text-primary size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
            <span className="text-foreground font-mono text-xs">
              {t('floatingTag')}
            </span>
          </div>
        </div>
      </figure>
    </section>
  );
}
