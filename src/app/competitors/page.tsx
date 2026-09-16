'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { COMPETITOR_BENCHMARKS } from '@/lib/ai/competitor-data';
import { CompetitorEngine } from '@/lib/ai/competitor-engine';
import { CompetitorRadarChart } from '@/components/competitor/CompetitorRadarChart';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import {
  Swords,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Laptop,
  Shirt,
  Coffee,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function CompetitorsPage() {
  const [selectedSector, setSelectedSector] = useState<'tech' | 'fashion' | 'beauty' | 'home'>('tech');

  const benchmark = COMPETITOR_BENCHMARKS[selectedSector];
  const { ourAverage, competitorAverage, netAdvantage } = CompetitorEngine.calculateAdvantageScore(benchmark);

  const sectors = [
    { id: 'tech', label: 'Consumer Electronics', icon: Laptop },
    { id: 'fashion', label: 'Fashion & Apparel', icon: Shirt },
    { id: 'beauty', label: 'Beauty & Skincare', icon: Sparkles },
    { id: 'home', label: 'Home & Kitchen', icon: Coffee },
  ];

  return (
    <div className="space-y-6 apple-bg-glow">
      {/* 1. Header Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Swords className="h-3.5 w-3.5" />
          <span>Competitive Intelligence & Pazar Boşluğu Radarı</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Rakip Kıyaslama & Pazar Açığı Teşhisi
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Kendi ürününüzü pazar lideri rakiplerle birebir çarpıştırın. Rakiplerin zayıf kaldığı pazarlama kozlarımızı (Moat) ve bizde iadeye yol açan tasarım zafiyetlerimizi (Blindspot) yapay zeka ile ayrıştırın.
        </p>
      </div>

      {/* 2. Apple Segmented Sector Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-2xl w-fit shadow-sm">
        {sectors.map((s) => {
          const Icon = s.icon;
          const isActive = selectedSector === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSector(s.id as any)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Matchup Head-to-Head Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Our Product Card */}
        <Card className="border-l-4 border-l-emerald-500 bg-white/80 dark:bg-white/[0.02]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                BİZİM ÜRÜNÜMÜZ
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {benchmark.ourProduct.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{benchmark.ourProduct.brand}</p>
            </div>
            <Badge variant="success">Puan: {benchmark.ourProduct.rating} ★</Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] p-3 text-center text-xs">
            <div>
              <span className="text-slate-400 text-[10px]">Satış Fiyatı</span>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {formatCurrency(benchmark.ourProduct.price)}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">İade Oranı</span>
              <p className="font-mono font-bold text-rose-500 mt-0.5">
                %{benchmark.ourProduct.returnRate.toFixed(1)}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">İnceleme Hacmi</span>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {benchmark.ourProduct.reviewCount} Adet
              </p>
            </div>
          </div>
        </Card>

        {/* Competitor Product Card */}
        <Card className="border-l-4 border-l-indigo-500 bg-white/80 dark:bg-white/[0.02]">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                RAKİP BENCHMARK
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {benchmark.competitorProduct.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{benchmark.competitorProduct.brand}</p>
            </div>
            <Badge variant="cyan">Puan: {benchmark.competitorProduct.rating} ★</Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] p-3 text-center text-xs">
            <div>
              <span className="text-slate-400 text-[10px]">Rakip Fiyatı</span>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {formatCurrency(benchmark.competitorProduct.price)}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">İade Oranı</span>
              <p className="font-mono font-bold text-emerald-500 mt-0.5">
                %{benchmark.competitorProduct.returnRate.toFixed(1)}
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Pazar İncelemesi</span>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                {benchmark.competitorProduct.reviewCount} Adet
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. Radar Chart & AI Executive Teardown */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <CompetitorRadarChart
          data={benchmark.radarMetrics}
          ourProductName={benchmark.ourProduct.name}
          competitorProductName={benchmark.competitorProduct.name}
        />

        {/* AI Teardown Summary Card */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <CardTitle>Yapay Zeka Stratejik Teşhisi</CardTitle>
            </div>
            <CardDescription>
              İki ürün arasındaki binlerce müşteri yorumunun çapraz korelasyonu
            </CardDescription>
          </CardHeader>

          <div className="space-y-3 my-2">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {benchmark.aiExecutiveSummary}
            </p>

            <div className="rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] p-3.5 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Genel Ürün Yetenek Skoru:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Biz: {ourAverage}/100</span>
                <span className="text-slate-400">vs</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">Rakip: {competitorAverage}/100</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">Net Rekabet Avantajı:</span>
            <span className={`font-mono font-bold ${netAdvantage >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {netAdvantage >= 0 ? `+${netAdvantage} Puan Öndeyiz` : `${netAdvantage} Puan Gerideyiz`}
            </span>
          </div>
        </Card>
      </div>

      {/* 5. Marketing Moats vs Product Blindspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MOATS (Our Strengths / Marketing Hooks) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Rekabetçi Kalelerimiz (Marketing Moats)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Pazarlama & Reklam
            </span>
          </div>

          {benchmark.moats.map((m, idx) => (
            <Card key={idx} className="border-l-4 border-l-emerald-500 bg-white/70 dark:bg-white/[0.02] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
                <Badge variant="success">%{m.advantagePct} Daha Başarılı</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.description}</p>
              <div className="mt-2 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 p-2.5 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <span className="font-semibold font-mono">🎯 Pazarlama & Büyüme Aksiyonu:</span>
                <p className="text-[11px] leading-relaxed">{m.actionHook}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* BLINDSPOTS (Competitor Strengths / Our Vulnerabilities) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            <span>Kritik Zafiyetlerimiz (Product Blindspots)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              Tasarım & Ar-Ge
            </span>
          </div>

          {benchmark.blindspots.map((b, idx) => (
            <Card key={idx} className="border-l-4 border-l-rose-500 bg-white/70 dark:bg-white/[0.02] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h4>
                <Badge variant="danger">%{b.deficitPct} Zayıf Nokta</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{b.description}</p>
              <div className="mt-2 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 p-2.5 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                <span className="font-semibold font-mono">🛠️ Ar-Ge & Tedarikçi Düzeltme Brifi:</span>
                <p className="text-[11px] leading-relaxed">{b.remediationAction}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
