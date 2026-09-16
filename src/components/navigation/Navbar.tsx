'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Github, ExternalLink, Store, UserCheck, ChevronDown, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageToggle } from '@/components/theme/LanguageToggle';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useStoreRole, STORES, ROLES, StoreId, UserRole } from '@/lib/context/StoreRoleContext';

export function Navbar() {
  const { currentStore, setStore, currentRole, setRole } = useStoreRole();
  const { t } = useLanguage();
  const [storeOpen, setStoreOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#06080d]/80 px-4 sm:px-6 backdrop-blur-2xl transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Layers className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>ReviewIQ</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Omni-Channel</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">Universal E-Commerce Growth & Review Intelligence</p>
          </div>
        </Link>

        {/* 1. Multi-Store Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setStoreOpen(!storeOpen); setRoleOpen(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50/80 dark:bg-white/[0.03] text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all cursor-pointer shadow-sm"
          >
            <Store className="h-3.5 w-3.5 text-emerald-500" />
            <div className="text-left hidden md:block">
              <span className="block font-semibold leading-tight">{currentStore.name}</span>
              <span className="text-[10px] text-slate-400 leading-none">{currentStore.badge}</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
          </button>

          {storeOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-slate-200/90 dark:border-white/[0.1] bg-white dark:bg-[#0c121e] p-2 shadow-2xl backdrop-blur-2xl z-50 space-y-1">
              <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Mağaza & Marka Seçimi (Multi-Store)
              </span>
              {(Object.keys(STORES) as StoreId[]).map((key) => {
                const s = STORES[key];
                const isSelected = currentStore.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => { setStore(s.id); setStoreOpen(false); }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <p className="leading-snug">{s.name}</p>
                      <span className="text-[10px] text-slate-400 font-normal">{s.category}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. RBAC Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setRoleOpen(!roleOpen); setStoreOpen(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50/80 dark:bg-white/[0.03] text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all cursor-pointer shadow-sm"
          >
            <UserCheck className="h-3.5 w-3.5 text-cyan-500" />
            <div className="text-left hidden lg:block">
              <span className="block font-semibold leading-tight">{currentRole.title}</span>
              <span className="text-[10px] text-slate-400 leading-none">Rol / Yetki</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
          </button>

          {roleOpen && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-slate-200/90 dark:border-white/[0.1] bg-white dark:bg-[#0c121e] p-2 shadow-2xl backdrop-blur-2xl z-50 space-y-1">
              <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Rol Tabanlı Erişim (RBAC Profili)
              </span>
              {(Object.keys(ROLES) as UserRole[]).map((key) => {
                const r = ROLES[key];
                const isSelected = currentRole.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => { setRole(r.id); setRoleOpen(false); }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <p className="leading-snug">{r.title}</p>
                      <span className="text-[10px] text-slate-400 font-normal">{r.tagline}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-cyan-500" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Apple-style Language Switcher (TR / EN) */}
        <LanguageToggle />

        {/* Apple-style Light / Dark Mode Switcher */}
        <ThemeToggle />

        <a
          href="https://github.com/Tngc93/ecommerce-growth-intelligence-engine"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-100 dark:bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </a>
      </div>
    </header>
  );
}
