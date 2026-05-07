'use client';

import { useTranslations } from 'next-intl';
import { Mail, Globe, MessageSquare, Info } from 'lucide-react';

export const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: t('links.github'),
      href: 'https://github.com',
      icon: Globe,
    },
    {
      name: t('links.twitter'),
      href: 'https://twitter.com',
      icon: MessageSquare,
    },
    {
      name: t('links.linkedin'),
      href: 'https://linkedin.com',
      icon: Info,
    },
    {
      name: t('links.email'),
      href: 'mailto:badreddinerezzouk@protonmail.com',
      icon: Mail,
    },
  ];

  return (
    <footer className="snap-end w-full py-12 px-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors duration-300 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 px-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
            >
              <link.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            © {currentYear} {t('license')}
          </p>
        </div>
      </div>
    </footer>
  );
};
