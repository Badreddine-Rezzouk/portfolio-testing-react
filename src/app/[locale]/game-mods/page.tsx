'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import modsDataRaw from '@/data/mods.json';
import { ModsData } from '@/types/mods';
import { getLocalizedField } from '@/utils/i18n';

const modsData = modsDataRaw as unknown as ModsData;

export default function GameModsPage() {
  const t = useTranslations('GameMods');
  const locale = useLocale();
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredMods = useMemo(() => {
    return modsData.mods.filter((mod) => {
      const gameMatch = selectedGame ? mod.game === selectedGame : true;
      
      let categoryMatch = true;
      if (selectedCategories.size > 0) {
        categoryMatch = mod.categories.some(catId => selectedCategories.has(catId));
      }

      const localizedTitle = getLocalizedField(mod.title, locale) || '';
      const localizedShort = getLocalizedField(mod.shortdescription, locale) || '';

      const searchMatch = searchTerm 
        ? localizedTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
          localizedShort.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return gameMatch && categoryMatch && searchMatch;
    });
  }, [selectedGame, selectedCategories, searchTerm]);

  const toggleCategory = (catId: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(catId)) {
      newSelected.delete(catId);
    } else {
      if (newSelected.size < 3) {
        newSelected.add(catId);
      }
    }
    setSelectedCategories(newSelected);
  };

  const getGameName = (gameId: string) => {
    return modsData.games.find(g => g.id === gameId)?.name || gameId;
  };

  const getTitle = (modId: string) => {
    const mod = modsData.mods.find(m => m.id === modId);
    return mod ? (getLocalizedField(mod.title, locale) || modId) : modId;
  };

  const getShort = (modId: string) => {
    const mod = modsData.mods.find(m => m.id === modId);
    return mod ? (getLocalizedField(mod.shortdescription, locale) || '') : '';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 border-4 border-zinc-900 dark:border-zinc-50 p-4 inline-block rounded-lg shadow-xl bg-white dark:bg-zinc-800">
          {t('title')}
        </h1>
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg border-4 border-zinc-900 dark:border-zinc-50 shadow-lg text-left">
          <p className="text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border-4 border-zinc-900 dark:border-zinc-50 shadow-lg h-fit text-zinc-900 dark:text-zinc-50">
          <div>
            <label htmlFor="gameFilter" className="block text-sm font-medium mb-2">{t('filters.game')}</label>
            <select
              id="gameFilter"
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
            >
              <option value="">{t('filters.all_games')}</option>
              {modsData.games.map(game => (
                <option key={game.id} value={game.id}>{game.name}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">{t('filters.category')}</label>
              <button 
                onClick={() => setSelectedCategories(new Set())}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('filters.clear')}
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {modsData.categories.map(cat => (
                <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    className="rounded border-zinc-300"
                    checked={selectedCategories.has(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    disabled={!selectedCategories.has(cat.id) && selectedCategories.size >= 3}
                  />
                  <span className="text-sm">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <input 
              type="text"
              placeholder="Search mods..."
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </aside>

        {/* Mod List */}
        <main className="lg:col-span-3 space-y-6">
          {filteredMods.length > 0 ? (
            filteredMods.map((mod) => (
              <Link key={mod.id} href={`/game-mods/${mod.id}`} className="block group">
                <div className={`flex flex-col md:flex-row bg-white dark:bg-zinc-900 rounded-lg border-4 border-zinc-900 dark:border-zinc-50 overflow-hidden shadow-lg transition-transform group-hover:-translate-y-1 ${
                  mod.categories.length === 1 && mod.categories[0] === 'sinder' ? 'border-orange-500' : 
                  mod.categories.length === 1 && mod.categories[0] === 'aura-gx' ? 'border-purple-500' : ''
                }`}>
                  <div className="relative w-full md:w-1/2 aspect-video">
                    <Image 
                      src={`/Images/mod/${mod.id}/${mod.images[0]}`}
                      alt={getTitle(mod.id)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-1/2 space-y-2 text-zinc-900 dark:text-zinc-50">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold">{getTitle(mod.id)}</h2>
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        mod.status === 'released' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}>
                        {t(`status.${mod.status}`)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{getGameName(mod.game)} | {mod.date}</p>
                    <p className="text-zinc-600 dark:text-zinc-300 line-clamp-3">
                      {getShort(mod.id)}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-800 rounded-lg border-4 border-zinc-900 dark:border-zinc-50">
              <p className="text-xl font-bold">{t('noModsFound') || 'No mods found matching your criteria.'}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
