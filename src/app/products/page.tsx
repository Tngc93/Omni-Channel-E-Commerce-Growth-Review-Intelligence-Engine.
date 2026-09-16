import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { ArrowRight, AlertCircle, Cpu, Shirt, Sparkles, Coffee, Package, PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductsCatalogPage() {
  const rawProducts = await prisma.product.findMany({
    include: {
      insights: true,
      reviews: true,
      hypotheses: true,
    },
    orderBy: { returnRate: 'desc' },
  });

  const products: any[] = JSON.parse(JSON.stringify(rawProducts || []));

  const getCategoryIcon = (cat: string = '') => {
    const c = cat.toLowerCase();
    if (c.includes('tech') || c.includes('elektronik') || c.includes('laptop')) {
      return <Cpu className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />;
    }
    if (c.includes('fashion') || c.includes('apparel') || c.includes('giyim') || c.includes('moda')) {
      return <Shirt className="h-5 w-5 text-purple-500 dark:text-purple-400" />;
    }
    if (c.includes('beauty') || c.includes('skincare') || c.includes('kozmetik')) {
      return <Sparkles className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
    }
    if (c.includes('home') || c.includes('kitchen') || c.includes('mutfak') || c.includes('espresso')) {
      return <Coffee className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
    }
    return <Package className="h-5 w-5 text-slate-400" />;
  };

  const getCategoryBadgeVariant = (cat: string = '') => {
    const c = cat.toLowerCase();
    if (c.includes('tech')) return 'cyan';
    if (c.includes('fashion')) return 'purple';
    if (c.includes('beauty')) return 'success';
    if (c.includes('home')) return 'warning';
    return 'default';
  };

  return (
    <div className="space-y-8 apple-bg-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span>Omni-Channel Multi-Vertical Catalog</span>
            <span>•</span>
            <span className="text-slate-500 dark:text-slate-400">Çoklu Sektör Kalite & İade Analizi</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Çok Sektörlü Ürün & Kusur Kataloğu
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Tüketici elektroniği, moda/tekstil, kozmetik ve ev aletlerinde tespit edilen kronik kusurları, finansal kayıpları ve Ar-Ge büyüme hipotezlerini inceleyin.
          </p>
        </div>

        <Link
          href="/import"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" /> Yeni Ürün Ekle
        </Link>
      </div>

      {products.length === 0 ? (
        <Card className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Katalogda Henüz Ürün Yok</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            İlk ürününüzü eklemek için Veri Aktarımı ekranını kullanabilirsiniz.
          </p>
          <Link
            href="/import"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all shadow-md"
          >
            Ürün Ekle / İçe Aktar
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((p) => {
            const insights = Array.isArray(p.insights) ? p.insights : [];
            const reviews = Array.isArray(p.reviews) ? p.reviews : [];
            const hypotheses = Array.isArray(p.hypotheses) ? p.hypotheses : [];
            const returnRate = typeof p.returnRate === 'number' && !isNaN(p.returnRate) ? p.returnRate : 0;
            const price = typeof p.price === 'number' && !isNaN(p.price) ? p.price : 0;

            const loss = insights.reduce((acc: number, i: any) => acc + (Number(i.estimatedMonthlyLoss) || 0), 0);
            const topInsight = insights[0];

            return (
              <Card key={p.id} className="flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all group">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex-shrink-0">
                        {getCategoryIcon(p.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getCategoryBadgeVariant(p.category) as any}>{p.category || 'Genel'}</Badge>
                          <span className="text-[11px] text-slate-500 font-mono">SKU: {p.sku || 'N/A'}</span>
                        </div>
                        <h3 className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white leading-snug">{p.name}</h3>
                      </div>
                    </div>

                    <Badge variant={returnRate > 15 ? 'danger' : returnRate > 10 ? 'warning' : 'success'}>
                      %{returnRate.toFixed(1)} İade
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] p-3 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Birim Fiyat:</span>
                      <p className="font-semibold text-slate-900 dark:text-white font-mono text-sm mt-0.5">{formatCurrency(price)}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Aylık Ciro Sızıntısı:</span>
                      <p className="font-semibold text-rose-600 dark:text-rose-400 font-mono text-sm mt-0.5">{formatCurrency(loss)}</p>
                    </div>
                  </div>

                  {topInsight && (
                    <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-3.5 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-rose-700 dark:text-rose-300">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{topInsight.defectType}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2">{topInsight.summary}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {reviews.length} Doğrulanmış Yorum · {hypotheses.length} A/B Testi
                  </span>
                  <Link
                    href={`/products/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
                  >
                    Detaylı İnceleme
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
