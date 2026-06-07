import type { Metadata } from 'next';
import { Lato, Lexend } from 'next/font/google';
import { getLocalizedMetadata } from '@/config/seo';
import '../globals.css';

import { Providers } from '@/providers';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${lato.variable} ${lexend.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
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
