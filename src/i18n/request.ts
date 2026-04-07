import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'fr', 'zh'];

export const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  zh: '中文'
};

export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales, localePrefix: 'as-needed' });

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'en';
  if (!locales.includes(currentLocale)) notFound();

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});
