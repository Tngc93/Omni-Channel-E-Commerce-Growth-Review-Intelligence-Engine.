import React from 'react';
import { DollarSign, TrendingDown, MessageSquare, AlertTriangle } from 'lucide-react';
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
      <Card className="border-l-4 border-l-rose-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Est. Monthly Return Waste
          </span>
          <div className="rounded-full bg-rose-50 p-2 dark:bg-rose-950/40">
            <DollarSign className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {formatCurrency(totalEstimatedLoss)}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          From returns, shipping friction & packaging failures
        </p>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Avg Catalog Return Rate
          </span>
          <div className="rounded-full bg-amber-50 p-2 dark:bg-amber-950/40">
            <TrendingDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {formatPercent(avgReturnRate)}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Benchmark target: &lt; 9.5% across peer catalogs
        </p>
      </Card>

      <Card className="border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Reviews & Returns Analyzed
          </span>
          <div className="rounded-full bg-emerald-50 p-2 dark:bg-emerald-950/40">
            <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {totalReviewsAnalyzed}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Multi-channel (Shopify, Amazon, Trendyol)
        </p>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Chronic Product Defects
          </span>
          <div className="rounded-full bg-purple-50 p-2 dark:bg-purple-950/40">
            <AlertTriangle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {criticalDefectsCount} Urgent
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Actionable A/B test hypotheses prepared
        </p>
      </Card>
    </div>
  );
}
