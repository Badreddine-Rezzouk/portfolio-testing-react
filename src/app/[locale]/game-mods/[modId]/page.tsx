'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import modsDataRaw from '@/data/mods.json';
import { ModsData } from '@/types/mods';
import { getLocalizedField } from '@/utils/i18n';

const modsData = modsDataRaw as unknown as ModsData;

export default function ModDetailPage() {
  const params = useParams();
  const modId = params.modId as string;
  const locale = useLocale();
  const t = useTranslations('GameMods');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const mod = modsData.mods.find(m => m.id === modId);

  if (!mod) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">{t('notFound')}</h1>
        <Link href="/game-mods" className="text-blue-600 hover:underline mt-4 inline-block">
          {t('backToMods') || 'Back to mods'}
        </Link>
      </div>
    );
  }

  const game = modsData.games.find(g => g.id === mod.game);
  const modCategories = mod.categories.map(cid => {
    return modsData.categories.find(c => c.id === cid)?.name || cid;
  }).join(', ');

  const title = getLocalizedField(mod.title, locale);
  const description = getLocalizedField(mod.description, locale);
  const credits = getLocalizedField(mod.credits, locale);
  const guide = getLocalizedField(game?.guide, locale);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 border-4 border-zinc-900 dark:border-zinc-50 p-4 inline-block rounded-lg shadow-xl bg-white dark:bg-zinc-900">
          {title}
        </h1>
      </section>

      <div className={`bg-white dark:bg-zinc-900 p-6 rounded-lg border-4 border-zinc-900 dark:border-zinc-50 shadow-lg ${
        mod.categories.length === 1 && mod.categories[0] === 'sinder' ? 'border-orange-500' : 
        mod.categories.length === 1 && mod.categories[0] === 'aura-gx' ? 'border-purple-500' : ''
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-900 dark:text-zinc-50">
          <div className="space-y-4">
            <div>
              <h5 className="font-bold">{t('details.game')}: <span className="font-normal text-zinc-600 dark:text-zinc-400">{game?.name || mod.game}</span></h5>
              <h5 className="font-bold">{t('details.date')}: <span className="font-normal text-zinc-600 dark:text-zinc-400">{mod.date}</span></h5>
              <p className="font-bold">{t('details.categories')}: <span className="font-normal text-zinc-600 dark:text-zinc-400">{modCategories}</span></p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                mod.status === 'released' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              }`}>
                {t(`status.${mod.status}`)}
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold">{t('details.downloads')}</h5>
              <div className="flex flex-wrap gap-2">
                {mod.download?.direct && (
                  <a href={`/Files/Mods/${mod.download.direct}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" download>
                    ⬇️ {t('details.direct')}
                  </a>
                )}
                {mod.download?.nexus && (
                  <a href={mod.download.nexus} className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-800 transition" target="_blank">
                    ⬇️ {t('details.nexus')}
                  </a>
                )}
                {mod.download?.modworkshop && (
                  <a href={mod.download.modworkshop} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition" target="_blank">
                    ⬇️ {t('details.modworkshop')}
                  </a>
                )}
                {mod.download?.steam && (
                  <a href={mod.download.steam} className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-900 transition" target="_blank">
                    ⬇️ {t('details.steam')}
                  </a>
                )}
                {mod.download?.overtake && (
                  <a href={mod.download.overtake} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" target="_blank">
                    ⬇️ {t('details.overtake')}
                  </a>
                )}
              </div>
            </div>

            {guide && (
              <details className="border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                <summary className="font-bold cursor-pointer">{t('details.howToInstall') || 'How to install'}</summary>
                <div className="mt-2 text-sm space-y-2 prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{ __html: guide }} />
              </details>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative aspect-video border-4 border-zinc-900 dark:border-zinc-50 rounded overflow-hidden shadow-md">
              <Image 
                src={`/Images/mod/${mod.id}/${mod.images[activeImageIndex]}`}
                alt={`${title} screenshot ${activeImageIndex + 1}`}
                fill
                className="object-cover cursor-pointer"
                onClick={() => window.open(`/Images/mod/${mod.id}/${mod.images[activeImageIndex]}`, '_blank')}
              />
            </div>
            {mod.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mod.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-video rounded overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-blue-500 scale-105' : 'border-zinc-300 dark:border-zinc-700'
                    }`}
                  >
                    <Image 
                      src={`/Images/mod/${mod.id}/${img}`}
                      alt={`${title} thumb ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: description || '' }} />
          
          {credits && (
            <details className="border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
              <summary className="font-bold cursor-pointer">{t('details.credits')}</summary>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: credits }} />
            </details>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/game-mods" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-2 underline-offset-4 font-medium transition-colors">
          ← {t('backToMods') || 'Back to all mods'}
        </Link>
      </div>
    </div>
  );
}
