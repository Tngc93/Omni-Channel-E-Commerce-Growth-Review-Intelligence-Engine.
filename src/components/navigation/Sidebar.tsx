'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Lightbulb,
  MessageSquareQuote,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Executive Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Products & Defects', href: '/products', icon: ShoppingBag },
  { label: 'Growth & A/B Lab', href: '/hypotheses', icon: Lightbulb },
  { label: 'Customer Persona Chat', href: '/persona-chat', icon: MessageSquareQuote },
  { label: 'Ingest & Settings', href: '/import', icon: UploadCloud },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('h-4 w-4', isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400')} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Diagnostic Status</h4>
        <div className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex justify-between">
            <span>Critical Defects:</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">3 Active</span>
          </div>
          <div className="flex justify-between">
            <span>Sizing Leakage:</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">$11.4k/mo</span>
          </div>
          <div className="flex justify-between">
            <span>A/B Hypotheses:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">4 Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
