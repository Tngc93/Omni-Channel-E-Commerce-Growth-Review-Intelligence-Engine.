'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Swords,
  Lightbulb,
  MessageSquareQuote,
  MessageSquareReply,
  UploadCloud,
  ChevronRight,
  Laptop,
  Shirt,
  Sparkles,
  Coffee
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Executive Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Catalog & Chronic Defects', href: '/products', icon: ShoppingBag },
  { label: 'Competitor Benchmark', href: '/competitors', icon: Swords },
  { label: 'Growth & A/B Lab', href: '/hypotheses', icon: Lightbulb },
  { label: 'Multi-Persona Chat', href: '/persona-chat', icon: MessageSquareQuote },
  { label: 'AI Return-Save Agent', href: '/recovery', icon: MessageSquareReply },
  { label: 'Review Ingestion & Add Product', href: '/import', icon: UploadCloud },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200/80 dark:border-white/[0.06] bg-white/70 dark:bg-[#07090e]/60 p-4 backdrop-blur-xl flex flex-col justify-between transition-colors duration-300">
      <div className="space-y-6">
        <div>
          <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation
          </span>
          <nav className="mt-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'bg-slate-900 dark:bg-white/[0.08] text-white dark:text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        'h-4 w-4 transition-colors',
                        isActive
                          ? 'text-emerald-400'
                          : 'text-slate-400 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Multi-Vertical Indicators */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-slate-50/80 dark:bg-white/[0.02] p-3.5 space-y-2.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Aktif Sektörel Kapsam
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Laptop className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
              <span>Consumer Tech</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Shirt className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
              <span>Fashion & Apparel</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Beauty & Skincare</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Coffee className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
              <span>Home & Kitchen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-slate-50/80 dark:bg-white/[0.02] p-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 dark:text-slate-400 font-medium">ReviewIQ</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">v2.4 Pro</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
          Marka-Bağımsız Çok Kanallı AI Büyüme Motoru
        </p>
      </div>
    </aside>
  );
}
