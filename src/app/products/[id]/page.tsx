import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { Sparkles, Star, Lightbulb, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      reviews: { orderBy: { createdAt: 'desc' } },
      returns: { orderBy: { createdAt: 'desc' } },
      insights: true,
      hypotheses: true,
    },
  });

  if (!product) return notFound();

  const totalLoss = product.insights.reduce((acc, i) => acc + i.estimatedMonthlyLoss, 0);

  return (
    <div className="space-y-8 apple-bg-glow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="cyan">{product.category}</Badge>
            <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/hypotheses"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-slate-100 transition-all shadow-md"
          >
            <Lightbulb className="h-4 w-4" /> A/B Testlerini Gör ({product.hypotheses.length})
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-400">Birim Satış Fiyatı</span>
          <div className="mt-1 text-xl font-bold text-white font-mono">{formatCurrency(product.price)}</div>
        </Card>
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-400">İade Oranı</span>
          <div className="mt-1 text-xl font-bold text-rose-400 font-mono">{formatPercent(product.returnRate)}</div>
        </Card>
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-400">Aylık Ciro Kaybı</span>
          <div className="mt-1 text-xl font-bold text-rose-500 font-mono">{formatCurrency(totalLoss)}</div>
        </Card>
        <Card>
          <span className="text-[11px] font-mono uppercase text-slate-400">İncelenen Yorum Sayısı</span>
          <div className="mt-1 text-xl font-bold text-emerald-400 font-mono">{product.reviews.length} Doğrulanmış</div>
        </Card>
      </div>

      {/* AI Chronic Defect Diagnosis */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          Yapay Zeka Kök-Neden Teşhisleri & Kalite Analizi
        </h2>

        {product.insights.map((insight) => (
          <Card key={insight.id} className="border-l-4 border-l-rose-500 bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-sm sm:text-base">{insight.defectType}</span>
                  <Badge variant="danger">{insight.severity}</Badge>
                  <Badge variant="purple">Boyut: {insight.affectedAspect.toUpperCase()}</Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{insight.summary}</p>
                
                <div className="rounded-xl bg-black/40 p-3.5 text-xs border border-white/[0.08] space-y-1">
                  <span className="font-semibold text-emerald-400 font-mono">Teknik Kök Neden & Üretim / Kalite Teşhisi: </span>
                  <p className="text-slate-300 leading-relaxed">{insight.rootCause}</p>
                </div>

                {insight.evidenceQuote && (
                  <p className="text-xs italic text-slate-400 pt-1">
                    "{insight.evidenceQuote}"
                  </p>
                )}
              </div>

              <div className="sm:text-right min-w-[180px] flex-shrink-0">
                <span className="text-[11px] text-slate-500 font-mono uppercase font-semibold">Tahmini Aylık Zarar</span>
                <div className="mt-1 text-lg font-bold text-rose-400 font-mono">
                  {formatCurrency(insight.estimatedMonthlyLoss)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Real Ingested Reviews */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-400" />
          Kanal Bazlı Müşteri İncelemeleri ({product.reviews.length})
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.reviews.map((rev) => (
            <div key={rev.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400 font-mono">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx}>{idx < rev.rating ? '★' : '☆'}</span>
                  ))}
                  <span className="ml-1 text-slate-300 font-semibold">{rev.rating}/5</span>
                </div>
                <Badge variant="cyan">{rev.channel}</Badge>
              </div>
              <p className="text-slate-200 leading-relaxed italic">"{rev.comment}"</p>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant={rev.sentiment === 'NEGATIVE' ? 'danger' : rev.sentiment === 'POSITIVE' ? 'success' : 'warning'}>
                  {rev.sentiment}
                </Badge>
                <span className="text-[11px] text-slate-500 font-mono">Boyut: {rev.aspect}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
