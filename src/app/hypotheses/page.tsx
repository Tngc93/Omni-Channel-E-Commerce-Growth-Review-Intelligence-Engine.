import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Lightbulb, Code2, CheckCircle2, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HypothesesPage() {
  const hypotheses = await prisma.growthHypothesis.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          AI Product Manager & Growth Experimentation Lab
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Actionable A/B tests, PDP copy fixes, and ready-to-implement Gherkin specifications generated from review analytics.
        </p>
      </div>

      <div className="space-y-6">
        {hypotheses.map((h) => (
          <Card key={h.id} className="border-l-4 border-l-emerald-500 bg-slate-900/90">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {h.product.name}
                  </span>
                  <Badge variant="outline">{h.testType}</Badge>
                  <Badge variant={h.status === 'VALIDATED' ? 'success' : h.status === 'TESTING' ? 'warning' : 'default'}>
                    {h.status}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white">{h.title}</h3>

                <div className="rounded-lg bg-slate-950/60 p-3 text-xs border border-slate-800 space-y-2">
                  <div>
                    <span className="font-semibold text-rose-400">Observed Customer Problem: </span>
                    <span className="text-slate-300">{h.problemStatement}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-400">Test Hypothesis: </span>
                    <span className="text-slate-200">{h.hypothesis}</span>
                  </div>
                </div>

                {h.gherkinSpec && (
                  <div className="mt-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
                      <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Developer & QA Gherkin Specification:</span>
                    </div>
                    <pre className="rounded-lg bg-black/60 p-3 font-mono text-[11px] text-emerald-300 whitespace-pre-wrap border border-emerald-950">
                      {h.gherkinSpec}
                    </pre>
                  </div>
                )}
              </div>

              <div className="sm:text-right min-w-[200px]">
                <span className="text-xs text-slate-500 uppercase font-semibold">Expected Impact</span>
                <div className="mt-1 flex items-center sm:justify-end gap-1.5 text-sm font-bold text-emerald-400">
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
