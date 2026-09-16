'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SentimentTrendChart } from '@/components/analytics/SentimentTrendChart';
import { REVISION_COHORTS, calculateTotalRecoveredMetrics, RevisionCohort } from '@/lib/ai/analytics-data';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { useStoreRole } from '@/lib/context/StoreRoleContext';
import {
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Filter
} from 'lucide-react';

export default function AnalyticsPage() {
  const { currentStore, currentRole } = useStoreRole();
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  const metrics = calculateTotalRecoveredMetrics(REVISION_COHORTS);

  const filteredCohorts = selectedSector === 'ALL'
    ? REVISION_COHORTS
    : REVISION_COHORTS.filter((c) => {
        const cat = c.category.toLowerCase();
        const target = selectedSector.toLowerCase();
        return cat.includes(target) || target.includes(cat);
      });

  const sectors = [
    { id: 'ALL', label: 'Tüm Sektörler (Konsolide)' },
    { id: 'tech', label: 'Consumer Electronics' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'beauty', label: 'Beauty & Skincare' },
    { id: 'home', label: 'Home & Kitchen' },
  ];

  return (
    <div className="space-y-6 apple-bg-glow">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Time-Series Sentiment Intelligence & Recovered Margin Hub</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Zaman Serisi Duygu Analitiği & Kurtarılan Ciro (ROI)
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Müşteri incelemelerindeki 6 aylık duygu değişimini izleyin. Ar-Ge ve fabrika revizyonları sonrasında iade oranı düşüşünün sağladığı net finansal kazancı (ROI) kohort bazında kanıtlayın.
          </p>
        </div>

        {/* Role & Store Context Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="cyan">{currentStore.name}</Badge>
          <Badge variant="purple">{currentRole.title}</Badge>
        </div>
      </div>

      {/* 2. Executive KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
              Kurtarılan Net Ciro
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {formatCurrency(metrics.totalRecoveredRevenue)}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>İade önleme tasarrufu</span>
          </div>
        </Card>

        <Card className="border-l-4 border-l-cyan-500 bg-white/80 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
              Ortalama İade Düşüşü
            </span>
            <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
            -%{metrics.avgDrop.toFixed(1)} Puan
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Revizyon öncesi vs. sonrası</span>
          </div>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-white/80 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
              Kurtarılan Sipariş Sayısı
            </span>
            <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {metrics.totalSavedReturns} Adet
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Tersine lojistikten korunan ürün</span>
          </div>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-white/80 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
              CSAT Memnuniyet Artışı
            </span>
            <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-500 font-mono">
            +{metrics.avgCsatGain.toFixed(1)} ★
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>3.2'den 4.7 puana yükseliş</span>
          </div>
        </Card>
      </div>

      {/* 3. Recharts Sentiment Trend Area Chart Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              6 Aylık Müşteri Duygu & Şikayet Eğilimi (Sentiment Timeline)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kritik kök neden revizyonlarının uygulanmasıyla negatif yorum hacminin kademeli olarak sıfıra yaklaşması.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold self-start sm:self-auto">
            CANLI AGREGASYON
          </span>
        </div>

        <SentimentTrendChart />
      </Card>

      {/* 4. Before / After Revision Cohorts */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-500" />
              Revizyon Kohortları & Üretim Düzeltmeleri (Before vs. After ROI)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hangi ürün revizyonunun iade oranını ne kadar düşürdüğü ve kurtarılan net kâr analizi.
            </p>
          </div>

          {/* Sector Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] overflow-x-auto no-scrollbar">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSector(s.id)}
                className={`px-3 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSector === s.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredCohorts.map((cohort) => (
            <Card key={cohort.id} className="p-5 border-l-4 border-l-cyan-500 bg-white/80 dark:bg-white/[0.02] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan">{cohort.category}</Badge>
                    <span className="text-[11px] font-mono text-slate-400">{cohort.sku}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{cohort.productName}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{cohort.revisionTitle}</span>
                    <span className="text-slate-400 font-normal">({cohort.revisionDate})</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Kurtarılan Net Ciro</span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatCurrency(cohort.recoveredRevenue)}
                  </p>
                </div>
              </div>

              {/* Before vs After Visual Pill Comparison */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Revizyon Öncesi İade</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">
                      %{cohort.beforeReturnRate.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-rose-500 font-medium">Yüksek Risk</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Revizyon Sonrası İade</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      %{cohort.afterReturnRate.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-emerald-500 font-medium">
                      (-%{(cohort.beforeReturnRate - cohort.afterReturnRate).toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-100 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
                <span className="font-semibold text-slate-900 dark:text-white">Çözülen Kök Neden: </span>
                {cohort.rootDefectResolved}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                <span>Yeni Sevkiyat: {cohort.unitsShippedSince} Adet</span>
                <span>Önlenen İade: {cohort.savedReturnsCount} Adet</span>
                <span>CSAT Kazancı: +{cohort.csatImprovement} ★</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
