import React from 'react';
import { DollarSign, TrendingDown, Cpu, AlertTriangle } from 'lucide-react';
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
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Aylık İade & Donanım Kaybı
          </span>
          <div className="rounded-xl bg-rose-500/10 p-2 text-rose-400 border border-rose-500/20">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-white font-mono">
          {formatCurrency(totalEstimatedLoss)}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Isınma, panel ölü piksel ve kargo şoku kaynaklı
        </p>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Ortalama İade Oranı
          </span>
          <div className="rounded-xl bg-amber-500/10 p-2 text-amber-400 border border-amber-500/20">
            <TrendingDown className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-white font-mono">
          {formatPercent(avgReturnRate)}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Oyun laptopu & monitör sektörel eşik: &lt; %10.5
        </p>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            İncelenen Donanım Yorumu
          </span>
          <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
            <Cpu className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-white font-mono">
          {totalReviewsAnalyzed} Doğrulanmış
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Monster Web, Trendyol, Hepsiburada, Amazon TR
        </p>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Kronik Donanım Kusurları
          </span>
          <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400 border border-purple-500/20">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 text-2xl font-bold tracking-tight text-white font-mono">
          {criticalDefectsCount} Aktif Teşhis
        </div>
        <p className="mt-1 text-xs text-slate-400">
          PM & Ar-Ge ekipleri için A/B hipotezleri hazır
        </p>
      </Card>
    </div>
  );
}
