import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return {
    title: t('game-mods'),
  };
}

export default function GameModsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
