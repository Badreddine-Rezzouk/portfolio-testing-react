import { useTranslations } from 'next-intl';

export default function ProficienciesPage() {
  const t = useTranslations('Proficiencies');

  return (
    <div className="max-w-4xl mx-auto p-8 sm:p-20 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t('title')}</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        {t('list')}
      </p>
    </div>
  );
}
