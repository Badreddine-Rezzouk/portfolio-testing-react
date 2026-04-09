import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const locales = routing.locales;
export const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  zh: '中文'
};

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
