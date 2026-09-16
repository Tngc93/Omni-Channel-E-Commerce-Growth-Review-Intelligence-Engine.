'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-base tracking-tight sm:text-lg">
            Growth & Review <span className="text-emerald-600 dark:text-emerald-400">Intelligence</span>
          </span>
        </Link>
        <Badge variant="success" className="hidden sm:inline-flex">
          <Sparkles className="h-3 w-3" /> AI-Native Engine
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Local Engine Active</span>
        </div>
        <a
          href="https://github.com/Tngc93"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          @Tngc93
        </a>
      </div>
    </header>
  );
}
