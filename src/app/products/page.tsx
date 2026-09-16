import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductsCatalogPage() {
  const products = await prisma.product.findMany({
    include: {
      insights: true,
      reviews: true,
      hypotheses: true,
    },
    orderBy: { returnRate: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Product Intelligence Catalog
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Deep-dive by SKU to analyze customer reviews, return logs, root causes, and generated growth fixes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const loss = p.insights.reduce((acc, i) => acc + i.estimatedMonthlyLoss, 0);
          const topInsight = p.insights[0];

          return (
            <Card key={p.id} className="flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      {p.category}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-white line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-slate-400">SKU: {p.sku}</p>
                  </div>
                  <Badge variant={p.returnRate > 15 ? 'danger' : p.returnRate > 10 ? 'warning' : 'success'}>
                    {formatPercent(p.returnRate)} Returns
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-800/50 p-3 text-xs">
                  <div>
                    <span className="text-slate-400">Retail Price:</span>
                    <p className="font-semibold text-white">{formatCurrency(p.price)}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Monthly Margin Leak:</span>
                    <p className="font-semibold text-rose-400">{formatCurrency(loss)}</p>
                  </div>
                </div>

                {topInsight && (
                  <div className="mt-4 rounded-lg border border-rose-900/40 bg-rose-950/20 p-3 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{topInsight.defectType}</span>
                    </div>
                    <p className="mt-1 text-slate-300 line-clamp-2">{topInsight.summary}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {p.reviews.length} reviews · {p.hypotheses.length} A/B specs
                </span>
                <Link
                  href={`/products/${p.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Inspect SKU <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
