'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, locales, localeNames } from '@/i18n/request';
import { Languages, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 px-3 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 gap-2"
        aria-label={t('switch')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="h-4 w-4" />
        <span className="text-sm font-medium uppercase">{locale}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md border border-zinc-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  locale === l ? 'bg-zinc-50 font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300'
                }`}
                role="menuitem"
              >
                {localeNames[l] || l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
