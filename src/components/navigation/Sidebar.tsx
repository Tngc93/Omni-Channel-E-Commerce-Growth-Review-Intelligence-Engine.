'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  Lightbulb,
  MessageSquareQuote,
  UploadCloud,
  ChevronRight,
  Flame,
  Monitor,
  Headphones
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Executive Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Hardware & Defects', href: '/products', icon: Cpu },
  { label: 'Growth & A/B Lab', href: '/hypotheses', icon: Lightbulb },
  { label: 'Customer Persona Chat', href: '/persona-chat', icon: MessageSquareQuote },
  { label: 'Review Ingestion & AI', href: '/import', icon: UploadCloud },
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
            Hardware Categories
          </span>
          <div className="mt-2 space-y-1.5 px-3 text-xs text-slate-400">
            <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-rose-400" />
                <span>Tulpar Laptop</span>
              </div>
              <span className="font-mono text-[11px] text-rose-400">96°C Hot</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Monitor className="h-3.5 w-3.5 text-cyan-400" />
                <span>Aryond Monitör</span>
              </div>
              <span className="font-mono text-[11px] text-cyan-400">165Hz Glow</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-purple-400" />
                <span>Semruk Desktop</span>
              </div>
              <span className="font-mono text-[11px] text-purple-400">AIO Şok</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Headphones className="h-3.5 w-3.5 text-amber-400" />
                <span>Pusat Ekipman</span>
              </div>
              <span className="font-mono text-[11px] text-amber-400">2.4GHz RF</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-slate-400">Aylık İade Maliyeti</span>
          <span className="h-2 w-2 rounded-full bg-rose-500" />
        </div>
        <div className="mt-2 text-xl font-bold tracking-tight text-white font-mono">
          $97,000<span className="text-xs font-normal text-slate-400"> /ay</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-400 leading-tight">
          Donanım termal, panel ve kargo hasarı kaynaklı toplam marj kaybı
        </p>
      </div>
    </aside>
  );
}
