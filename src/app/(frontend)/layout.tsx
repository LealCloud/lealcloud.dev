import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import Header from '@/components/layout/Header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LealCloud | Portafolio',
  description: 'Sitio web personal y profesional de desarrollo de software.',
};

export default function RootLayout(props: LayoutProps<'/'>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider
          storageKey="theme"
          defaultTheme="system"
          enableSystem={true}
          enableColorScheme={true}
          themes={['light', 'dark']}
          attribute="data-theme"
        >
          <Header />
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}
