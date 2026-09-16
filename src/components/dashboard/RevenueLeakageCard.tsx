import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/formatters';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface LeakingProduct {
  id: string;
  name: string;
  category: string;
  returnRate: number;
  monthlyLoss: number;
  primaryDefect: string;
}

interface RevenueLeakageCardProps {
  products: LeakingProduct[];
}

export function RevenueLeakageCard({ products }: RevenueLeakageCardProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Top Revenue Leaks by Product</CardTitle>
          <CardDescription>
            Prioritized by monthly cost of returns and negative brand churn
          </CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/50"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">{p.name}</span>
                <Badge variant="outline">{p.category}</Badge>
              </div>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                Root Cause: {p.primaryDefect}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatCurrency(p.monthlyLoss)}
                  <span className="text-xs font-normal text-slate-400"> /mo</span>
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {p.returnRate.toFixed(1)}% return rate
                </div>
              </div>

              <Link
                href={`/products/${p.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
