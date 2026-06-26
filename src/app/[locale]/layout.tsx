import type { Metadata } from 'next';
import { Lato, Lexend } from 'next/font/google';
import { getLocalizedMetadata, type SupportedLocales } from '@/config/seo';
import '../globals.css';

import { Providers } from '@/providers';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

/** Client Components in the global shell — exclude server-only namespaces like `footer`. */
const CLIENT_LAYOUT_NAMESPACES = [
  'header',
  'themeToggle',
  'languageSwitcher',
] as const;

function pickClientLayoutMessages(
  messages: Awaited<ReturnType<typeof getMessages>>,
) {
  const layout = messages.layout as Record<
    (typeof CLIENT_LAYOUT_NAMESPACES)[number],
    unknown
  >;

  return {
    layout: Object.fromEntries(
      CLIENT_LAYOUT_NAMESPACES.map((key) => [key, layout[key]]),
    ),
  };
}

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: Omit<RootLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  return await getLocalizedMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allMessages = await getMessages();
  const clientMessages = pickClientLayoutMessages(allMessages);
  const lang = (locale === 'en' || locale === 'es' ? locale : 'es') as SupportedLocales;
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });

  return (
    <html lang={locale} className={`${lato.variable} ${lexend.variable}`}>
      <body>
        <JsonLd locale={lang} description={t('description')} />
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
