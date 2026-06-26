import { IconMap } from '@/lib/iconMap';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button } from '../ui/Button';

type FeatureId = 'architecture' | 'validation' | 'solid' | 'growth';

const FEATURE_IDS: FeatureId[] = [
  'architecture',
  'validation',
  'solid',
  'growth',
];

const projectImage = { src: '/speakup.webp', width: 736, height: 1435 };
const cta = 'https://github.com/LealCloud/SpeakUp_Institute';

export default async function HowIWork() {
  const t = await getTranslations('pages.home.howIWork');

  return (
    <section
      aria-labelledby="how-i-work-heading"
      className="relative w-full overflow-hidden px-6 py-24 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="bg-primary/10 pointer-events-none absolute top-1/3 left-1/2 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
      />

      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2
          id="how-i-work-heading"
          className="font-heading text-foreground mb-4 text-3xl leading-tight font-black sm:text-4xl lg:text-6xl"
        >
          {t.rich('title', { strong: (chunks) => <strong>{chunks}</strong> })}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          {t('subtitle')}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURE_IDS.map((id, index) => {
            const IconComponent = IconMap.ui[id];
            return (
              <li
                key={id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group border-primary/20 bg-card/30 motion-safe:animate-fade-in hover:border-primary/50 relative flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_var(--color-primary)]"
              >
                <div
                  aria-hidden="true"
                  className="from-primary/0 via-primary/60 to-primary/0 pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative w-fit">
                  <div
                    aria-hidden="true"
                    className="bg-accent/20 absolute inset-0 rounded-full blur-md motion-safe:animate-pulse"
                  />
                  {IconComponent && (
                    <IconComponent
                      aria-hidden="true"
                      focusable="false"
                      className="text-accent relative z-10 size-6"
                    />
                  )}
                </div>
                <h3 className="font-heading text-foreground text-sm leading-snug font-bold sm:text-base">
                  {t(`features.${id}.title`)}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                  {t.rich(`features.${id}.text`, {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="lg:sticky lg:top-24 lg:h-full">
          <figure className="group border-secondary/20 bg-card/30 hover:border-secondary/50 relative flex h-full min-h-125 flex-col justify-end overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_50px_-10px_var(--color-secondary)] lg:min-h-0">
            <div
              aria-hidden="true"
              className="from-secondary/0 via-secondary/70 to-secondary/0 pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={projectImage.src}
                alt={t('projectCard.alt')}
                width={projectImage.width}
                height={projectImage.height}
                priority={false}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="from-background via-background/60 absolute inset-0 bg-linear-to-t to-transparent"
              />
            </div>

            <div className="relative z-10 flex flex-col gap-4 p-6 pt-8">
              <div
                aria-hidden="true"
                className="bg-background/40 pointer-events-none absolute inset-0 rounded-b-2xl backdrop-blur-sm"
              />
              <figcaption className="relative flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="text-secondary font-mono text-xs"
                  >
                    #
                  </span>
                  <span className="border-secondary/30 bg-secondary/10 text-secondary rounded-full border px-2.5 py-0.5 font-mono text-xs">
                    {t('projectCard.badge')}
                  </span>
                </div>
                <p className="font-heading text-foreground text-xl font-black sm:text-2xl">
                  <strong>{t('projectCard.title')}</strong>
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.rich('projectCard.figcaption', {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
              </figcaption>

              <div className="relative">
                <Button href={cta} variant="primary">
                  {t('cta')}
                </Button>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
