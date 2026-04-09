import { getTranslations } from 'next-intl/server';
import modsDataRaw from '@/data/mods.json';
import { ModsData } from '@/types/mods';

const modsData = modsDataRaw as unknown as ModsData;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; modId: string }>;
}) {
  const { modId } = await params;
  const mod = modsData.mods.find(m => m.id === modId);

  if (!mod) {
    const t = await getTranslations('GameMods');
    return {
      title: t('notFound'),
    };
  }

  return {
    title: mod.title,
  };
}

export default function ModDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
