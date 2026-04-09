import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return {
    title: t('home'),
  };
}

export default function Home() {
  const t = useTranslations('Home');
  const tNav = useTranslations('Navigation');

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center p-8 sm:p-20 text-center">
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

      <footer className="mt-auto pt-12 text-sm text-zinc-500">
        © {new Date().getFullYear()} Portfolio
      </footer>
    </div>
  );
}
