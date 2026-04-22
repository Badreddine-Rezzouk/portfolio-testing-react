'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import projectsDataRaw from '@/data/projects.json';
import { ProjectsData } from '@/types/projects';
import { getLocalizedField } from '@/utils/i18n';

const projectsData = projectsDataRaw as unknown as ProjectsData;

export default function ProjectsPage() {
  const t = useTranslations('Projects');
  const locale = useLocale();
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projectsData.projects.filter((project) => {
      let categoryMatch = true;
      if (selectedCategories.size > 0) {
        categoryMatch = project.categories.some(catId => selectedCategories.has(catId));
      }

      const localizedTitle = getLocalizedField(project.title, locale) || '';
      const localizedShort = getLocalizedField(project.shortdescription || project.description, locale) || '';

      const searchMatch = searchTerm 
        ? localizedTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
          localizedShort.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return categoryMatch && searchMatch;
    });
  }, [selectedCategories, searchTerm, locale]);

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

  const getTitle = (projectId: string) => {
    const project = projectsData.projects.find(p => p.id === projectId);
    return project ? (getLocalizedField(project.title, locale) || projectId) : projectId;
  };

  const getShort = (projectId: string) => {
    const project = projectsData.projects.find(p => p.id === projectId);
    if (!project) return '';
    return getLocalizedField(project.shortdescription || project.description, locale) || '';
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
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">{t('filters.category')}</label>
              <button 
                onClick={() => setSelectedCategories(new Set())}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('filters.clear')}
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {projectsData.categories.map(cat => (
                <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    className="rounded border-zinc-300"
                    checked={selectedCategories.has(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    disabled={!selectedCategories.has(cat.id) && selectedCategories.size >= 3}
                  />
                  <span className="text-sm">{getLocalizedField(cat.name, locale)}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <input 
              type="text"
              placeholder="Search projects..."
              className="w-full p-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </aside>

        {/* Project List */}
        <main className="lg:col-span-3 space-y-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block group">
                <div className="flex flex-col md:flex-row bg-white dark:bg-zinc-900 rounded-lg border-4 border-zinc-900 dark:border-zinc-50 overflow-hidden shadow-lg transition-transform group-hover:-translate-y-1">
                  <div className="relative w-full md:w-1/2 aspect-video bg-zinc-100 dark:bg-zinc-800">
                    {project.images && project.images[0] ? (
                      <Image 
                        src={`/Images/projects/${project.id}/${project.images[0]}`}
                        alt={getTitle(project.id)}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                         <span className="text-zinc-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:w-1/2 space-y-2 text-zinc-900 dark:text-zinc-50">
                    <h2 className="text-xl font-bold">{getTitle(project.id)}</h2>
                    {project.date && (
                      <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{project.date}</p>
                    )}
                    <p className="text-zinc-600 dark:text-zinc-300 line-clamp-3">
                      {getShort(project.id)}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-800 rounded-lg border-4 border-zinc-900 dark:border-zinc-50">
              <p className="text-xl font-bold">{t('noProjectsFound')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
