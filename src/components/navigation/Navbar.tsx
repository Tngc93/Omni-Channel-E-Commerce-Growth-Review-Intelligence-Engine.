'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Cpu, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/[0.06] bg-[#06080d]/80 px-6 backdrop-blur-2xl">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
              <span>Review Intelligence</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">v1.2</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Monster Tech & Hardware Diagnostics</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/[0.08]">
          <Badge variant="cyan">Laptop & Desktop</Badge>
          <Badge variant="purple">Monitör & Aksesuar</Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px]">Local SQLite & AI Active</span>
        </div>

        <a
          href="https://github.com/Tngc93/ecommerce-growth-intelligence-engine"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/[0.08] hover:border-white/20 transition-all"
        >
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </a>
      </div>
    </header>
  );
}
