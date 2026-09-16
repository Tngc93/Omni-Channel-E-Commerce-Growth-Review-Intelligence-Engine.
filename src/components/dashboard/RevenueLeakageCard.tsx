import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/formatters';
import Link from 'next/link';
import { ArrowUpRight, Laptop, Shirt, Sparkles, Coffee, Package } from 'lucide-react';

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
  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('tech') || c.includes('laptop')) return <Laptop className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />;
    if (c.includes('fashion') || c.includes('blazer')) return <Shirt className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
    if (c.includes('beauty') || c.includes('serum')) return <Sparkles className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
    if (c.includes('home') || c.includes('espresso')) return <Coffee className="h-4 w-4 text-amber-500 dark:text-amber-400" />;
    return <Package className="h-4 w-4 text-slate-400" />;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>En Çok Marj Kaybettiren Ürünler & SKU'lar</CardTitle>
          <CardDescription>
            İade lojistiği, servis tamir maliyeti ve müşteri churn'üne göre sıralı
          </CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-slate-50/80 dark:bg-white/[0.02] p-4 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:border-slate-300 dark:hover:border-white/10"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getCategoryIcon(p.category)}
                <span className="font-medium text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1">{p.name}</span>
                <Badge variant="outline">{p.category}</Badge>
              </div>
              <p className="text-xs text-rose-500 dark:text-rose-400/90 font-medium">
                Kök Neden: {p.primaryDefect}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {formatCurrency(p.monthlyLoss)}
                  <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400"> /ay</span>
                </div>
                <div className="text-xs text-amber-600 dark:text-amber-400 font-mono">
                  %{p.returnRate.toFixed(1)} iade oranı
                </div>
              </div>

              <Link
                href={`/products/${p.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white transition-colors shadow-sm"
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
