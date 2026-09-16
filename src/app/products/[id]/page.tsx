import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { Sparkles, Star, Lightbulb, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const rawProduct = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: { orderBy: { createdAt: 'desc' } },
      returns: { orderBy: { createdAt: 'desc' } },
      insights: true,
      hypotheses: true,
    },
  });

  if (!rawProduct) return notFound();

  const product = JSON.parse(JSON.stringify(rawProduct));
  const insights: any[] = Array.isArray(product.insights) ? product.insights : [];
  const reviews: any[] = Array.isArray(product.reviews) ? product.reviews : [];
  const hypotheses: any[] = Array.isArray(product.hypotheses) ? product.hypotheses : [];
  const price = typeof product.price === 'number' ? product.price : 0;
  const returnRate = typeof product.returnRate === 'number' ? product.returnRate : 0;

  const totalLoss = insights.reduce((acc, i) => acc + (Number(i.estimatedMonthlyLoss) || 0), 0);

  return (
    <div className="space-y-8 apple-bg-glow">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Tüm Ürün Kataloğuna Dön
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan">{product.category}</Badge>
            <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/hypotheses"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md"
          >
            <Lightbulb className="h-4 w-4" /> A/B Testlerini Gör ({hypotheses.length})
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Birim Satış Fiyatı</span>
          <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white font-mono">{formatCurrency(price)}</div>
        </Card>
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">İade Oranı</span>
          <div className="mt-1 text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">{formatPercent(returnRate)}</div>
        </Card>
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Aylık Ciro Kaybı</span>
          <div className="mt-1 text-xl font-bold text-rose-600 dark:text-rose-500 font-mono">{formatCurrency(totalLoss)}</div>
        </Card>
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">İncelenen Yorum Sayısı</span>
          <div className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{reviews.length} Doğrulanmış</div>
        </Card>
      </div>

      {/* AI Chronic Defect Diagnosis */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          Yapay Zeka Kök-Neden Teşhisleri & Kalite Analizi
        </h2>

        {insights.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-xs text-slate-500 dark:text-slate-400">Bu ürün için henüz tespit edilmiş kronik kusur teşhisi bulunmuyor.</p>
          </Card>
        ) : (
          insights.map((insight: any) => (
            <Card key={insight.id} className="border-l-4 border-l-rose-500 bg-white/70 dark:bg-white/[0.02]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{insight.defectType}</span>
                    <Badge variant="danger">{insight.severity}</Badge>
                    <Badge variant="purple">Boyut: {insight.affectedAspect?.toUpperCase() || 'GENEL'}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{insight.summary}</p>
                  
                  <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3.5 text-xs border border-slate-200 dark:border-white/[0.08] space-y-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Teknik Kök Neden & Üretim / Kalite Teşhisi: </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{insight.rootCause}</p>
                  </div>

                  {insight.evidenceQuote && (
                    <p className="text-xs italic text-slate-500 dark:text-slate-400 pt-1">
                      "{insight.evidenceQuote}"
                    </p>
                  )}
                </div>

                <div className="sm:text-right min-w-[180px] flex-shrink-0">
                  <span className="text-[11px] text-slate-500 font-mono uppercase font-semibold">Tahmini Aylık Zarar</span>
                  <div className="mt-1 text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">
                    {formatCurrency(insight.estimatedMonthlyLoss || 0)}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Real Ingested Reviews */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          Kanal Bazlı Müşteri İncelemeleri ({reviews.length})
        </h2>

        {reviews.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-xs text-slate-500 dark:text-slate-400">Bu ürün için henüz müşteri yorumu eklenmedi.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reviews.map((rev: any) => (
              <div key={rev.id} className="rounded-2xl border border-slate-200/80 dark:border-white/[0.06] bg-white/70 dark:bg-white/[0.02] p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 font-mono">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>{idx < rev.rating ? '★' : '☆'}</span>
                    ))}
                    <span className="ml-1 text-slate-700 dark:text-slate-300 font-semibold">{rev.rating}/5</span>
                  </div>
                  <Badge variant="cyan">{rev.channel}</Badge>
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed italic">"{rev.comment}"</p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant={rev.sentiment === 'NEGATIVE' ? 'danger' : rev.sentiment === 'POSITIVE' ? 'success' : 'warning'}>
                    {rev.sentiment}
                  </Badge>
                  <span className="text-[11px] text-slate-500 font-mono">Boyut: {rev.aspect}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
