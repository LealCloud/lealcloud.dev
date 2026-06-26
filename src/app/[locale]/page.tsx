import Hero from '@/components/home/Hero';
import HowIWork from '@/components/home/HowIWork';
import { getLocalizedMetadata } from '@/config/seo';
import type { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedMetadata(locale, '/');
}

export default function Home() {
  return (
    <main>
      <Hero />
      <HowIWork />
    </main>
  );
}
