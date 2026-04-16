import { getTranslations } from 'next-intl/server';
import projectsDataRaw from '@/data/projects.json';
import { ProjectsData } from '@/types/projects';
import { getLocalizedField } from '@/utils/i18n';

const projectsData = projectsDataRaw as unknown as ProjectsData;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; projectId: string }>;
}) {
  const { locale, projectId } = await params;
  const project = projectsData.projects.find(p => p.id === projectId);

  if (!project) {
    const t = await getTranslations({ locale, namespace: 'Projects' });
    return {
      title: t('notFound'),
    };
  }

  const title = getLocalizedField(project.title, locale);
  const description = getLocalizedField(project.shortdescription || project.description, locale);
  const mainImage = project.images && project.images.length > 0 ? `/Images/projects/${project.id}/${project.images[0]}` : null;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      ...(mainImage && {
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      ...(mainImage && { images: [mainImage] }),
    },
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
