import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Code2, TrendingUp, Lightbulb } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HypothesesPage() {
  const hypotheses = await prisma.growthHypothesis.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 apple-bg-glow">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Product Management & Growth Lab</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          E-Ticaret Büyüme & A/B Deney Laboratuvarı
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Tüketici elektroniği, moda kalıp iadeleri, kozmetik ambalaj sızıntıları ve ev aletlerinde müşteri şikayetlerinden otomatik türetilen A/B test hipotezleri ve Gherkin kabul kriterleri.
        </p>
      </div>

      <div className="space-y-5">
        {hypotheses.map((h) => (
          <Card key={h.id} className="border-l-4 border-l-emerald-500 bg-white/[0.02]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    {h.product.name}
                  </span>
                  <Badge variant="cyan">{h.testType}</Badge>
                  <Badge variant={h.status === 'VALIDATED' ? 'success' : h.status === 'TESTING' ? 'warning' : 'default'}>
                    {h.status}
                  </Badge>
                </div>

                <h3 className="text-base sm:lg font-bold text-white">{h.title}</h3>

                <div className="rounded-xl bg-black/40 p-3.5 text-xs border border-white/[0.08] space-y-2">
                  <div>
                    <span className="font-semibold text-rose-400 font-mono">Gözlemlenen Müşteri Problemi: </span>
                    <span className="text-slate-300 leading-relaxed">{h.problemStatement}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400 font-mono">A/B Test Hipotezi: </span>
                    <span className="text-slate-200 leading-relaxed">{h.hypothesis}</span>
                  </div>
                </div>

                {h.gherkinSpec && (
                  <div className="mt-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 font-mono mb-1.5">
                      <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Yazılım & QA Gherkin Spesifikasyonu (Cucumber / Playwright):</span>
                    </div>
                    <pre className="rounded-xl bg-[#040609] p-3.5 font-mono text-[11px] text-emerald-300 whitespace-pre-wrap border border-emerald-500/20 leading-relaxed">
                      {h.gherkinSpec}
                    </pre>
                  </div>
                )}
              </div>

              <div className="sm:text-right min-w-[200px] flex-shrink-0">
                <span className="text-[11px] text-slate-500 font-mono uppercase font-semibold">Hedeflenen Etki</span>
                <div className="mt-1 flex items-center sm:justify-end gap-1.5 text-sm font-bold text-emerald-400 font-mono">
                  <TrendingUp className="h-4 w-4" />
                  <span>{h.expectedMetricImpact}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
