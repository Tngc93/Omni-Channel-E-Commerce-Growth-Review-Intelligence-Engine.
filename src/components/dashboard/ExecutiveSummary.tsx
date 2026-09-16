import React from 'react';
import { DollarSign, TrendingDown, Layers, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';

interface ExecutiveSummaryProps {
  totalEstimatedLoss: number;
  avgReturnRate: number;
  totalReviewsAnalyzed: number;
  criticalDefectsCount: number;
}

export function ExecutiveSummary({
  totalEstimatedLoss,
  avgReturnRate,
  totalReviewsAnalyzed,
  criticalDefectsCount,
}: ExecutiveSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Aylık İade & Marj Kaybı
          </span>
          <div className="rounded-xl bg-rose-500/10 p-2 text-rose-500 dark:text-rose-400 border border-rose-500/20">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {formatCurrency(totalEstimatedLoss)}
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Kalıp, termal, ambalaj ve conta kaynaklı sızıntılar
        </p>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ortalama İade Oranı
          </span>
          <div className="rounded-xl bg-amber-500/10 p-2 text-amber-500 dark:text-amber-400 border border-amber-500/20">
            <TrendingDown className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {formatPercent(avgReturnRate)}
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Sektörel ortalama iade eşiği: &lt; %12.0
        </p>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            İncelenen Müşteri Yorumu
          </span>
          <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Layers className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {totalReviewsAnalyzed} Doğrulanmış
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Shopify, Amazon Global, Trendyol, Hepsiburada
        </p>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Kritik Kronik Kusurlar
          </span>
          <div className="rounded-xl bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {criticalDefectsCount} Aktif Teşhis
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          PM & Ar-Ge ekipleri için A/B hipotezleri hazır
        </p>
      </Card>
    </div>
  );
}
