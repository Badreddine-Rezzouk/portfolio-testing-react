import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function ToolsPage() {
  const t = useTranslations('Navigation');
  const tGacha = useTranslations('Tools.GachaCalc');

  const tools = [
    {
      title: tGacha('title'),
      description: tGacha('description') || 'Calculate your gacha odds for Arknights Endfield.',
      href: '/tools/endfield-calc',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 border-b-4 border-zinc-900 dark:border-zinc-50 pb-2 inline-block">
        {t('tools')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block p-6 bg-white dark:bg-zinc-900 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-900 dark:hover:border-zinc-50 transition-all"
          >
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 mb-2">
              {tool.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
