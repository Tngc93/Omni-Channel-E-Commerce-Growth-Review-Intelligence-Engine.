import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils/formatters';
import Link from 'next/link';
import { ArrowUpRight, Flame, Monitor, Cpu, Headphones } from 'lucide-react';

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
    if (cat.includes('Laptop')) return <Flame className="h-4 w-4 text-rose-400" />;
    if (cat.includes('Monitör')) return <Monitor className="h-4 w-4 text-cyan-400" />;
    if (cat.includes('Masaüstü')) return <Cpu className="h-4 w-4 text-purple-400" />;
    return <Headphones className="h-4 w-4 text-amber-400" />;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>En Çok Marj Kaybettiren Donanım Modelleri</CardTitle>
          <CardDescription>
            İade lojistiği, servis tamir maliyeti ve müşteri churn'üne göre sıralı
          </CardDescription>
        </div>
      </CardHeader>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/10"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {getCategoryIcon(p.category)}
                <span className="font-medium text-white text-xs sm:text-sm line-clamp-1">{p.name}</span>
                <Badge variant="outline">{p.category}</Badge>
              </div>
              <p className="text-xs text-rose-400/90 font-medium">
                Kök Neden: {p.primaryDefect}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-bold text-white font-mono">
                  {formatCurrency(p.monthlyLoss)}
                  <span className="text-[11px] font-normal text-slate-400"> /ay</span>
                </div>
                <div className="text-xs text-amber-400 font-mono">
                  %{p.returnRate.toFixed(1)} iade oranı
                </div>
              </div>

              <Link
                href={`/products/${p.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
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
