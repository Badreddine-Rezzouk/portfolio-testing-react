'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('proficiencies'), href: '/proficiencies' },
    { name: t('projects'), href: '/projects' },
    { name: t('game-mods'), href: '/game-mods' },
    { name: t('passions'), href: '/passions' },
  ];

  const isActive = (href: string) => {
    const parts = pathname.split('/');
    const currentPath = parts.slice(2).join('/') || '/';
    const targetPath = href === '/' ? '/' : href.replace(/^\//, '');
    
    if (targetPath === '/') {
        return currentPath === '/';
    }
    return currentPath === targetPath;
  };

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
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

      {/* Mobile retractable canvas (off-canvas menu) */}
      <div 
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-zinc-900/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div className="relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 shadow-xl dark:bg-zinc-950">
          <div className="flex items-center justify-between px-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Menu</span>
            <button
              className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-12 items-center rounded-md px-4 text-base font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  isActive(item.href)
                    ? 'bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-zinc-100 p-6 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-4">
               <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Settings</span>
               <div className="flex gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
