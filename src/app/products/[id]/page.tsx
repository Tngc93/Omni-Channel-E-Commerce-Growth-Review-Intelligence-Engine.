import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { AlertTriangle, Sparkles, Star, Lightbulb, FileText } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{product.category}</Badge>
            <span className="text-xs text-slate-400 font-mono">SKU: {product.sku}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/hypotheses"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            <Lightbulb className="h-4 w-4" /> View A/B Tests ({product.hypotheses.length})
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <span className="text-xs text-slate-400">Unit Price</span>
          <div className="mt-1 text-xl font-bold text-white">{formatCurrency(product.price)}</div>
        </Card>
        <Card>
          <span className="text-xs text-slate-400">Return Rate</span>
          <div className="mt-1 text-xl font-bold text-rose-400">{formatPercent(product.returnRate)}</div>
        </Card>
        <Card>
          <span className="text-xs text-slate-400">Monthly Margin Drain</span>
          <div className="mt-1 text-xl font-bold text-rose-500">{formatCurrency(totalLoss)}</div>
        </Card>
        <Card>
          <span className="text-xs text-slate-400">Total Reviews</span>
          <div className="mt-1 text-xl font-bold text-emerald-400">{product.reviews.length} Verified</div>
        </Card>
      </div>

      {/* AI Chronic Defect Diagnosis */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          AI Chronic Defect Diagnosis & Root Causes
        </h2>

        {product.insights.map((insight) => (
          <Card key={insight.id} className="border-l-4 border-l-rose-500 bg-slate-900/80">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">{insight.defectType}</span>
                  <Badge variant="danger">{insight.severity}</Badge>
                  <Badge variant="purple">Aspect: {insight.affectedAspect.toUpperCase()}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-300 font-medium">{insight.summary}</p>
                <div className="mt-3 rounded-lg bg-slate-950/60 p-3 text-xs border border-slate-800">
                  <span className="font-semibold text-emerald-400">Technical Root Cause: </span>
                  <span className="text-slate-300">{insight.rootCause}</span>
                </div>
                {insight.evidenceQuote && (
                  <p className="mt-2 text-xs italic text-slate-400">
                    "{insight.evidenceQuote}"
                  </p>
                )}
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase">Estimated Loss</span>
                <div className="text-lg font-bold text-rose-400">{formatCurrency(insight.estimatedMonthlyLoss)} /mo</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Customer Reviews Stream */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Parsed Customer Reviews & Aspect Tags</h2>
        <div className="space-y-3">
          {product.reviews.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white">{r.title || 'Review'}</span>
                  <span className="text-xs text-slate-500">by {r.customerName || 'Customer'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{r.channel}</Badge>
                  <Badge variant={r.sentiment === 'positive' ? 'success' : r.sentiment === 'negative' ? 'danger' : 'warning'}>
                    {r.aspect}
                  </Badge>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-300">"{r.comment}"</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
