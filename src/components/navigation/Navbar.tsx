'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Navbar() {
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
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Universal E-Commerce Growth & Review Intelligence</p>
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-white/[0.08]">
          <Badge variant="cyan">Tech</Badge>
          <Badge variant="purple">Fashion</Badge>
          <Badge variant="success">Beauty</Badge>
          <Badge variant="warning">Home</Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/[0.08] bg-slate-100/80 dark:bg-white/[0.02] px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px]">Multi-Store AI Active</span>
        </div>

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
