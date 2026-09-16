'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center gap-1.5 h-9 px-2.5 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-100 dark:bg-white/[0.03] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm cursor-pointer"
      title={language === 'tr' ? 'Switch to English' : 'Türkçe Dil Seçeneğine Geç'}
    >
      <Globe className="h-3.5 w-3.5 text-emerald-500" />
      <span className="font-mono text-[11px] uppercase tracking-wider">
        {language === 'tr' ? 'TR' : 'EN'}
      </span>
    </button>
  );
}
