import { useTranslations } from 'next-intl';

export default function ProjectsPage() {
  const t = useTranslations('Projects');

  return (
    <div className="max-w-4xl mx-auto p-8 sm:p-20 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm transition-transform hover:scale-[1.02]">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Project 1</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Description coming soon...</p>
        </div>
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm transition-transform hover:scale-[1.02]">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Project 2</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Description coming soon...</p>
        </div>
      </div>
    </div>
  );
}
