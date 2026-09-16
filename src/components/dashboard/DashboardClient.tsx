'use client';

import React, { useState } from 'react';
import { ExecutiveSummary } from '@/components/dashboard/ExecutiveSummary';
import { DefectRadarChart } from '@/components/dashboard/DefectRadarChart';
import { RevenueLeakageCard } from '@/components/dashboard/RevenueLeakageCard';
import { RecentIssuesFeed } from '@/components/dashboard/RecentIssuesFeed';
import { Layers, Laptop, Shirt, Sparkles, Coffee, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface ProductData {
  id: string;
  name: string;
  category: string;
  returnRate: number;
  price: number;
  insights: Array<{
    defectType: string;
    severity: string;
    affectedAspect: string;
    estimatedMonthlyLoss: number;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    aspect: string;
    channel: string;
    sentiment: string;
  }>;
}

const CATEGORY_RADAR_MAP: Record<string, Array<{ aspect: string; complaintScore: number; returnImpact: number }>> = {
  ALL: [
    { aspect: 'Kalıp & Beden (Fit)', complaintScore: 88, returnImpact: 92 },
    { aspect: 'Termal & Fan (94°C)', complaintScore: 85, returnImpact: 89 },
    { aspect: 'Kargo & Ambalaj', complaintScore: 78, returnImpact: 82 },
    { aspect: 'Conta & Basınç', complaintScore: 70, returnImpact: 68 },
    { aspect: 'Formül & Cilt', complaintScore: 62, returnImpact: 55 },
    { aspect: 'Yazılım & Sürücü', complaintScore: 58, returnImpact: 60 },
  ],
  'Consumer Electronics': [
    { aspect: 'Auto NC Algoritma Dalgalanması', complaintScore: 92, returnImpact: 95 },
    { aspect: 'Dar Kafa Bandı Baskısı', complaintScore: 88, returnImpact: 89 },
    { aspect: 'LDAC Ses Sahnesi & Tizler', complaintScore: 40, returnImpact: 25 },
    { aspect: 'Mikrofon Açık Ofis Netliği', complaintScore: 35, returnImpact: 20 },
    { aspect: 'Menteşe Katlanmama / Çanta Hacmi', complaintScore: 78, returnImpact: 74 },
    { aspect: 'Pil Tüketimi (30h)', complaintScore: 45, returnImpact: 35 },
  ],
  'Fashion & Apparel': [
    { aspect: 'Menşei Kaynaklı Bel Kalıbı Sapması', complaintScore: 95, returnImpact: 98 },
    { aspect: 'Paça Boyu Uzunluğu (+4cm)', complaintScore: 86, returnImpact: 89 },
    { aspect: 'Kumaş Elastan & Esneme Payı', complaintScore: 45, returnImpact: 30 },
    { aspect: 'Koyu Yıkama Çekme Oranı', complaintScore: 72, returnImpact: 75 },
    { aspect: 'Ağ Bölgesi Aşınması', complaintScore: 60, returnImpact: 58 },
    { aspect: 'Fermuar & Perçin Kalitesi', complaintScore: 50, returnImpact: 45 },
  ],
  'Beauty & Skincare': [
    { aspect: 'Damlalık Diş Sıyırma (Kargo Sızıntısı)', complaintScore: 94, returnImpact: 96 },
    { aspect: 'Makyaj Altında Pilling (Topaklanma)', complaintScore: 89, returnImpact: 92 },
    { aspect: 'Gözenek & Sebum Dengeleme', complaintScore: 30, returnImpact: 20 },
    { aspect: 'Hassas Ciltte Kızarıklık / Alışma', complaintScore: 65, returnImpact: 60 },
    { aspect: 'Formül Emilim Hızı (90sn)', complaintScore: 55, returnImpact: 48 },
    { aspect: 'Şişe Doluluk Oranı', complaintScore: 40, returnImpact: 35 },
  ],
  'Home & Kitchen': [
    { aspect: 'NutriU Wi-Fi 2.4GHz Eşleşme Kopması', complaintScore: 94, returnImpact: 96 },
    { aspect: 'FlowState Kapak Yan Yatış Sızıntısı', complaintScore: 91, returnImpact: 94 },
    { aspect: 'Hazne Teleskopik Ray Sıkışması', complaintScore: 78, returnImpact: 82 },
    { aspect: 'Et Termometresi (Prob) Hassasiyeti', complaintScore: 35, returnImpact: 25 },
    { aspect: 'Stanley Kulp Vidası Gevşemesi', complaintScore: 70, returnImpact: 68 },
    { aspect: '48h Buz Tutma & Yalıtım', complaintScore: 25, returnImpact: 15 },
  ],
};

interface DashboardClientProps {
  initialProducts?: ProductData[];
}

export function DashboardClient({ initialProducts = [] }: DashboardClientProps) {
  const [products] = useState<ProductData[]>(Array.isArray(initialProducts) ? initialProducts : []);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Tüm Sektörler', icon: Layers, count: '5 SKU (Amazon & HB)' },
    { id: 'Consumer Electronics', label: 'Consumer Tech', icon: Laptop, count: 'Sony XM5' },
    { id: 'Fashion & Apparel', label: 'Fashion & Denim', icon: Shirt, count: "Levi's 511" },
    { id: 'Beauty & Skincare', label: 'Beauty & Care', icon: Sparkles, count: 'The Ordinary' },
    { id: 'Home & Kitchen', label: 'Home & Kitchen', icon: Coffee, count: 'Philips & Stanley' },
  ];

  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = selectedCategory === 'ALL'
    ? safeProducts
    : safeProducts.filter((p) => {
        const cat = p.category?.toLowerCase() || '';
        const target = selectedCategory.toLowerCase();
        return cat.includes(target) || target.includes(cat);
      });

  const totalLoss = filteredProducts.reduce((sum, p) => {
    const insights = Array.isArray(p.insights) ? p.insights : [];
    return sum + insights.reduce((acc, i) => acc + (Number(i.estimatedMonthlyLoss) || 0), 0);
  }, 0);

  const avgReturnRate = filteredProducts.length > 0
    ? filteredProducts.reduce((sum, p) => sum + (Number(p.returnRate) || 0), 0) / filteredProducts.length
    : 14.8;

  const totalReviewsCount = filteredProducts.reduce((sum, p) => {
    return sum + (Array.isArray(p.reviews) ? p.reviews.length : 0);
  }, 0);

  const criticalDefects = filteredProducts.reduce((sum, p) => {
    return sum + (Array.isArray(p.insights) ? p.insights.length : 0);
  }, 0);

  const radarData = CATEGORY_RADAR_MAP[selectedCategory] || CATEGORY_RADAR_MAP.ALL;

  const leakingProducts = filteredProducts.map((p) => {
    const insights = Array.isArray(p.insights) ? p.insights : [];
    const monthlyLoss = insights.reduce((acc, i) => acc + (Number(i.estimatedMonthlyLoss) || 0), 0);
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      returnRate: p.returnRate,
      monthlyLoss,
      primaryDefect: insights[0]?.defectType || 'Genel Kalite & Tolerans',
    };
  }).sort((a, b) => b.monthlyLoss - a.monthlyLoss);

  const allReviewsFeed = filteredProducts.flatMap((p) => {
    const reviews = Array.isArray(p.reviews) ? p.reviews : [];
    return reviews.map((r) => ({
      id: r.id,
      productName: p.name,
      rating: r.rating,
      comment: r.comment,
      aspect: r.aspect,
      channel: r.channel,
      sentiment: r.sentiment,
    }));
  }).slice(0, 6);

  return (
    <div className="space-y-6 apple-bg-glow">
      {/* 1. Header Area: Clean, Spacious Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Layers className="h-3.5 w-3.5" />
          <span>Universal E-Commerce Growth Intelligence</span>
          <span>•</span>
          <span className="text-slate-500 dark:text-slate-400">Çok Sektörlü Analiz</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Yönetici Büyüme & İade Teşhis Paneli
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Tüketici elektroniği, moda/tekstil, kozmetik ve ev aletlerinde müşteri incelemelerini ve iade nedenlerini kategoriye özel yapay zeka ile ayrıştırın.
        </p>
      </div>

      {/* 2. Dedicated Apple-Grade Segmented Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-2 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-2xl shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 px-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md shadow-slate-900/10 dark:shadow-white/10 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.05]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400 dark:text-emerald-600' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive
                      ? 'bg-white/20 dark:bg-slate-900/10 text-white dark:text-slate-900 font-semibold'
                      : 'bg-slate-200/70 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3 pr-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 pl-3 border-l border-slate-200 dark:border-white/[0.08]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Telemetri Aktif</span>
          </div>
          <Link
            href="/import"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>+ Ürün Ekle</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* 3. Executive Metrics */}
      <ExecutiveSummary
        totalEstimatedLoss={totalLoss}
        avgReturnRate={avgReturnRate}
        totalReviewsAnalyzed={totalReviewsCount}
        criticalDefectsCount={criticalDefects}
      />

      {/* 4. Radar & Leakage Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <DefectRadarChart data={radarData} />
        <RevenueLeakageCard products={leakingProducts} />
      </div>

      {/* 5. Ingested Feedback Feed */}
      <RecentIssuesFeed reviews={allReviewsFeed} />
    </div>
  );
}
