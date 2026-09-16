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
  { label: 'Growth & A/B Lab', href: '/hypotheses', icon: Lightbulb },
  { label: 'Multi-Persona Chat', href: '/persona-chat', icon: MessageSquareQuote },
  { label: 'Review Ingestion & Add Product', href: '/import', icon: UploadCloud },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/[0.06] bg-[#07090e]/60 p-4 backdrop-blur-xl flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
            Navigation
          </span>
          <div className="mt-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200',
                    isActive
                      ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('h-4 w-4', isActive ? 'text-emerald-400' : 'text-slate-500')} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
            E-Commerce Verticals
          </span>
          <div className="mt-2 space-y-1.5 px-3 text-xs text-slate-400">
            <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Laptop className="h-3.5 w-3.5 text-cyan-400" />
                <span>Consumer Tech</span>
              </div>
              <span className="font-mono text-[11px] text-cyan-400">$32.4k</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Shirt className="h-3.5 w-3.5 text-purple-400" />
                <span>Fashion & Apparel</span>
              </div>
              <span className="font-mono text-[11px] text-purple-400">$26.8k</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Beauty & Care</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400">$14.2k</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Coffee className="h-3.5 w-3.5 text-amber-400" />
                <span>Home & Kitchen</span>
              </div>
              <span className="font-mono text-[11px] text-amber-400">$18.6k</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-slate-400">Toplam Portföy Sızıntısı</span>
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
        </div>
        <div className="mt-2 text-xl font-bold tracking-tight text-white font-mono">
          $92,000<span className="text-xs font-normal text-slate-400"> /ay</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-400 leading-tight">
          Beden uyumsuzluğu, termal şikayetler ve ambalaj hasarı kaynaklı iade maliyeti
        </p>
      </div>
    </aside>
  );
}
