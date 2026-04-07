import { useTranslations } from 'next-intl';

export default function PassionsPage() {
  const t = useTranslations('Passions');

  return (
    <div className="max-w-4xl mx-auto p-8 sm:p-20 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t('title')}</h1>
      <div className="flex flex-wrap gap-3 mt-8">
        <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-base text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">Coding</span>
        <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-base text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">Gaming</span>
        <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-base text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">Language Learning</span>
      </div>
    </div>
  );
}
