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
      <div
          data-home-page
          className="min-h-screen snap-start snap-always"
      >
        {/* LANDING */}
        <section
            id="landing"
            className="relative min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 text-center snap-start"
        >
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

        {/* QUOTES */}
        <section
            id="quotes"
            className="py-20 bg-zinc-100 dark:bg-zinc-900/50 min-h-screen flex flex-col justify-center snap-start"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Bainville */}
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

            {/* Einstein */}
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

        {/* PRESENTATION */}
        <section
            id="presentation"
            className="py-20 bg-zinc-50 dark:bg-zinc-900 min-h-screen flex flex-col items-center justify-center snap-start"
        >
          <div className="max-w-4xl mx-auto space-y-12 px-4">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl text-center border-4 border-zinc-200 dark:border-zinc-700 shadow-2xl">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                {t('welcome')}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {t('presentation_text')}
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl border-4 border-zinc-200 dark:border-zinc-700 shadow-2xl flex flex-col md:flex-row items-center gap-6">
              <Image
                  src="/Images/general-img-square.png"
                  alt="an image"
                  width={250}
                  height={250}
                  className="rounded-xl border-4 border-zinc-200 dark:border-zinc-700"
              />
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  {t('about_me')}
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {t('presentation_me')}
                </p>
              </div>
            </div>
          </div>
          <div className="h-250">
          </div>
        </section>

      </div>
  );
}