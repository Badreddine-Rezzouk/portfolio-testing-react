import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const tHome = await getTranslations({ locale, namespace: 'Home' });

  return {
    title: t('home'),
    description: tHome('subtitle'),
    openGraph: {
      title: t('home'),
      description: tHome('subtitle'),
    },
  };
}

export default function Home() {
  const t = useTranslations('Home');
  const tNav = useTranslations('Navigation');

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      <section id="landing" className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 sm:p-20 text-center snap-start">
        <main className="max-w-2xl space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            {t('title')}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
                href="/about"
                className="px-8 py-3 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 rounded-full font-medium transition-transform hover:scale-105"
            >
              {tNav('about')}
            </Link>
            <Link
                href="/projects"
                className="px-8 py-3 border border-zinc-200 dark:border-zinc-800 rounded-full font-medium transition-transform hover:scale-105 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              {tNav('projects')}
            </Link>
          </div>
        </main>
      </section>

      <section id="quotes" className="py-20 bg-zinc-100 dark:bg-zinc-900/50 min-h-[calc(100vh-4rem)] flex flex-col justify-center snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Bainville Quote */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:mr-auto max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 transition-transform hover:scale-[1.02]">
            <div className="shrink-0 relative w-32 h-32 overflow-hidden rounded-xl border-4 border-zinc-100 dark:border-zinc-700">
              <Image
                  src="/Images/bainville.jpg"
                  alt={t('quotes.bainville.author')}
                  fill
                  sizes="128px"
                  className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xl italic font-serif text-zinc-800 dark:text-zinc-200">
                {t('quotes.bainville.text')}
              </p>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                — {t('quotes.bainville.author')}
              </p>
            </div>
          </div>

          {/* Einstein Quote */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:ml-auto max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 transition-transform hover:scale-[1.02]">
            <div className="shrink-0 relative w-32 h-32 overflow-hidden rounded-xl border-4 border-zinc-100 dark:border-zinc-700">
              <Image
                  src="/Images/einstein-langue-1600-1600.jpg"
                  alt={t('quotes.einstein.author')}
                  fill
                  sizes="128px"
                  className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center md:text-right">
              <p className="text-xl italic font-serif text-zinc-800 dark:text-zinc-200">
                {t('quotes.einstein.text')}
              </p>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                — {t('quotes.einstein.author')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="presentation" className="py-20 bg-zinc-50 dark:bg-zinc-900 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-visible snap-start">
        <div className="h-[20vh]"></div>
        <div className="w-full relative">
          {/* Top Wave */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-15">
              <defs>
                <linearGradient id="wave-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-blue)" />
                  <stop offset="25%" stopColor="var(--secondary-blue)" />
                  <stop offset="50%" stopColor="var(--middle-color)" />
                  <stop offset="75%" stopColor="var(--secondary-pink)" />
                  <stop offset="100%" stopColor="var(--primary-pink)" />
                </linearGradient>
              </defs>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#wave-gradient-top)"></path>
            </svg>
          </div>

          <div className="presentation-gradient py-24 px-4 sm:px-6 lg:px-8 w-full relative z-10" style={{ background: 'var(--gradient)' }}>
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl text-center border-4 border-zinc-200 dark:border-zinc-700 shadow-2xl transform hover:scale-[1.01] transition-transform">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  {t('welcome')}
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {t('presentation_text')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform translate-y-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-15">
              <defs>
                <linearGradient id="wave-gradient-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-blue)" />
                  <stop offset="25%" stopColor="var(--secondary-blue)" />
                  <stop offset="50%" stopColor="var(--middle-color)" />
                  <stop offset="75%" stopColor="var(--secondary-pink)" />
                  <stop offset="100%" stopColor="var(--primary-pink)" />
                </linearGradient>
              </defs>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V95.33A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#wave-gradient-bottom)"></path>
            </svg>
          </div>
        </div>
        <div className="h-[50vh]"></div>
        <div className="w-full relative">
          {/* Top Wave */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-15">
              <defs>
                <linearGradient id="wave-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-blue)" />
                  <stop offset="25%" stopColor="var(--secondary-blue)" />
                  <stop offset="50%" stopColor="var(--middle-color)" />
                  <stop offset="75%" stopColor="var(--secondary-pink)" />
                  <stop offset="100%" stopColor="var(--primary-pink)" />
                </linearGradient>
              </defs>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#wave-gradient-top)"></path>
            </svg>
          </div>

          <div className="presentation-gradient py-24 px-4 sm:px-6 lg:px-8 w-full relative z-10" style={{ background: 'var(--gradient)' }}>
            <div className="w-7xl mx-auto space-y-12 flex flex-row">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl text-center border-4 border-zinc-200 dark:border-zinc-700 shadow-2xl transform hover:scale-[1.01] transition-transform flex flex-row">
                <Image src="/Images/general-img-square.png" alt="an image"
                       width={300}
                       height={300}
                       className="border-4 border-zinc-200 dark:border-zinc-700 shadow-2xl transform hover:scale-[1.01] transition-transform">
                </Image>
                <div className="flex flex-col p-4">
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                    {t('about_me')}
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {t('presentation_me')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform translate-y-full">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-15">
              <defs>
                <linearGradient id="wave-gradient-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary-blue)" />
                  <stop offset="25%" stopColor="var(--secondary-blue)" />
                  <stop offset="50%" stopColor="var(--middle-color)" />
                  <stop offset="75%" stopColor="var(--secondary-pink)" />
                  <stop offset="100%" stopColor="var(--primary-pink)" />
                </linearGradient>
              </defs>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V95.33A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#wave-gradient-bottom)"></path>
            </svg>
          </div>
        </div>
        <div className="h-[10vh]"></div>
      </section>
    </div>
  );
}
