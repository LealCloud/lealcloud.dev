import { Button } from '@/components/ui/Button';
import ContactPhoneInput from '@/components/form/ContactPhoneInput'; // Asegura la ruta correcta
import { getLocalizedMetadata } from '@/config/seo';
import { cn } from '@/utilities/cn';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const fieldControl = cn(
  'w-full min-h-11 rounded-lg border border-foreground/10 bg-background px-4 py-2.5',
  'text-base text-foreground placeholder:text-muted-foreground/50',
  'transition-[color,background-color,border-color,box-shadow] duration-200',
  'hover:border-foreground/20',
  'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'aria-invalid:border-red-600 aria-invalid:focus-visible:ring-red-600/25',
);

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });

  return getLocalizedMetadata(locale, '/contact', {
    title: t('title'),
    description: t('description'),
  });
}

export default async function Contact({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations('pages.contact');

  return (
    <main
      className={cn(
        'mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-6 pt-28 pb-20',
        'md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-14 md:gap-y-16',
        'lg:px-8 lg:pb-28',
      )}
    >
      <section aria-labelledby="contact-title" className="contents">
        <header className="col-span-full">
          <h1
            id="contact-title"
            className="font-heading text-accent text-4xl font-black tracking-tight sm:text-5xl"
          >
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
            {t('description')}
          </p>
        </header>

        <section
          aria-labelledby="contact-info-title"
          className="border-foreground/10 bg-card/40 rounded-2xl border p-6 md:p-8"
        >
          <h2
            id="contact-info-title"
            className="text-accent mb-6 text-sm font-semibold tracking-wide uppercase"
          >
            {t('infoTitle')}
          </h2>

          <address className="not-italic">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              <li>
                <Button
                  variant="social"
                  href="mailto:hello@lealcloud.dev"
                  icon="email"
                  fullWidth
                  className="justify-start"
                >
                  hello@lealcloud.dev
                </Button>
              </li>
              <li>
                <Button
                  variant="social"
                  href="https://github.com/LealCloud"
                  icon="github"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  className="justify-start"
                >
                  GitHub
                </Button>
              </li>
              <li>
                <Button
                  variant="social"
                  href="https://www.linkedin.com/in/lealcloud/"
                  icon="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  className="justify-start"
                >
                  LinkedIn
                </Button>
              </li>
            </ul>
          </address>

          <dl className="border-foreground/10 mt-8 flex flex-col gap-5 border-t pt-6">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {t('locationTitle')}
              </dt>
              <dd className="text-foreground text-sm font-medium sm:text-base">
                {t('locationValue')}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {t('availabilityTitle')}
              </dt>
              <dd className="text-foreground text-sm font-medium sm:text-base">
                {t('availabilityValue')}
              </dd>
            </div>
          </dl>
        </section>
      </section>

      <section aria-labelledby="contact-form-title">
        <h2
          id="contact-form-title"
          className="text-accent mb-6 text-lg font-semibold tracking-tight sm:text-xl"
        >
          {t('form.title')}
        </h2>

        <form noValidate className="flex flex-col gap-5 md:gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-foreground text-sm font-medium">
              {t('form.labels.name')}
            </span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t('form.placeholders.name')}
              required
              className={fieldControl}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-foreground text-sm font-medium">
              {t('form.labels.email')}
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t('form.placeholders.email')}
              required
              className={fieldControl}
            />
          </label>

          {/* Renderizado del Client Component para el teléfono */}
          <ContactPhoneInput
            locale={locale}
            labelContactNumber={t('form.labels.contactNumber')}
            labelCountryCode={t('form.labels.countryCode')}
            labelOptional={t('form.labels.optional')}
            placeholderPhone={t('form.placeholders.phoneNumber')}
            className={fieldControl}
          />

          <label className="flex flex-col gap-2">
            <span className="text-foreground text-sm font-medium">
              {t('form.labels.subject')}
            </span>
            <input
              type="text"
              name="subject"
              autoComplete="off"
              placeholder={t('form.placeholders.subject')}
              required
              className={fieldControl}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-foreground text-sm font-medium">
              {t('form.labels.message')}
            </span>
            <textarea
              name="message"
              rows={6}
              placeholder={t('form.placeholders.message')}
              required
              className={cn(
                fieldControl,
                'min-h-36 resize-y py-3 leading-relaxed',
              )}
            />
          </label>

          <Button
            variant="primary"
            type="submit"
            fullWidth
            className="mt-1 md:mt-2 md:w-auto"
            disabled
          >
            {t('form.submitButton')}
          </Button>
        </form>
      </section>
    </main>
  );
}
