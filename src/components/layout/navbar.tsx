'use client';

import { Link } from '@/i18n/request';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('proficiencies'), href: '/proficiencies' },
    { name: t('projects'), href: '/projects' },
    { name: t('game-mods'), href: '/game-mods' },
    { name: t('passions'), href: '/passions' },
  ];

  const isActive = (href: string) => {
    // pathname includes the locale, so we need to handle that
    // e.g., /en/about
    const parts = pathname.split('/');
    const currentPath = parts.slice(2).join('/') || '/';
    const targetPath = href === '/' ? '/' : href.replace(/^\//, '');
    
    if (targetPath === '/') {
        return currentPath === '/';
    }
    return currentPath === targetPath;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-8">
        <nav className="flex items-center gap-1 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 ${
                isActive(item.href)
                  ? 'text-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
