'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import projectsDataRaw from '@/data/projects.json';
import { ProjectsData } from '@/types/projects';
import { getLocalizedField } from '@/utils/i18n';

const projectsData = projectsDataRaw as unknown as ProjectsData;

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const locale = useLocale();
  const t = useTranslations('Projects');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projectsData.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">{t('notFound')}</h1>
        <Link href="/projects" className="text-blue-600 hover:underline mt-4 inline-block">
          {t('backToProjects')}
        </Link>
      </div>
    );
  }

  const projectCategories = project.categories.map(cid => {
    return projectsData.categories.find(c => c.id === cid)?.name || cid;
  }).join(', ');

  const title = getLocalizedField(project.title, locale);
  const description = getLocalizedField(project.description, locale);

  // @ts-expect-error - description is dangerouslySetInnerHTML string
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 border-4 border-zinc-900 dark:border-zinc-50 p-4 inline-block rounded-lg shadow-xl bg-white dark:bg-zinc-900 text-left md:text-center">
          {title}
        </h1>
      </section>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border-4 border-zinc-900 dark:border-zinc-50 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-900 dark:text-zinc-50">
          <div className="space-y-6">
            <div className="space-y-2">
              {project.date && (
                <p className="font-bold">{t('details.date')}: <span className="font-normal text-zinc-600 dark:text-zinc-400">{project.date}</span></p>
              )}
              <p className="font-bold">{t('details.categories')}: <span className="font-normal text-zinc-600 dark:text-zinc-400">{projectCategories}</span></p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {project.link && (
                <a href={project.link} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md" target="_blank" rel="noopener noreferrer">
                  🔗 {t('details.link')}
                </a>
              )}
              {project.github && (
                <a href={project.github} className="bg-zinc-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition shadow-md" target="_blank" rel="noopener noreferrer">
                  <span className="mr-2">📁</span> {t('details.github')}
                </a>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {project.images && project.images.length > 0 ? (
              <>
                <div className="relative aspect-video border-4 border-zinc-900 dark:border-zinc-50 rounded overflow-hidden shadow-md">
                  <Image 
                    src={`/Images/projects/${project.id}/${project.images[activeImageIndex]}`}
                    alt={`${title} screenshot ${activeImageIndex + 1}`}
                    fill
                    className="object-contain cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
                {isModalOpen && (
                  <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                      <Image 
                        src={`/Images/projects/${project.id}/${project.images[activeImageIndex]}`}
                        alt={`${title} enlarged`}
                        fill
                        className="object-contain"
                      />
                      <button
                        className="absolute top-0 right-0 m-4 text-white text-3xl font-bold bg-zinc-900 bg-opacity-50 w-12 h-12 rounded-full hover:bg-opacity-75 transition"
                        onClick={() => setIsModalOpen(false)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
                {project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {project.images.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 aspect-video rounded overflow-hidden border-2 transition ${
                          activeImageIndex === idx ? 'border-blue-500 scale-105' : 'border-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        <Image 
                          src={`/Images/projects/${project.id}/${img}`}
                          alt={`${title} thumb ${idx + 1}`}
                          fill
                          className="object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded border-4 border-zinc-900 dark:border-zinc-50 flex items-center justify-center">
                <span className="text-zinc-400">No images available</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{ __html: description || '' }} />
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/projects" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline decoration-2 underline-offset-4 font-medium transition-colors">
          ← {t('backToProjects')}
        </Link>
      </div>
    </div>
  );
}
