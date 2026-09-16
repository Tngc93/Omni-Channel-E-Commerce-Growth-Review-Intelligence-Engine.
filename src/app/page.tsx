'use client';

import React, { useState, useEffect } from 'react';
import { ExecutiveSummary } from '@/components/dashboard/ExecutiveSummary';
import { DefectRadarChart } from '@/components/dashboard/DefectRadarChart';
import { RevenueLeakageCard } from '@/components/dashboard/RevenueLeakageCard';
import { RecentIssuesFeed } from '@/components/dashboard/RecentIssuesFeed';
import { Layers } from 'lucide-react';

interface ProductData {
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
    { aspect: 'Termal Throttling (94°C)', complaintScore: 94, returnImpact: 96 },
    { aspect: 'Fan Akustiği (56dB)', complaintScore: 88, returnImpact: 90 },
    { aspect: 'OLED Renk & Panel', complaintScore: 65, returnImpact: 58 },
    { aspect: 'Control Center Yazılımı', complaintScore: 72, returnImpact: 75 },
    { aspect: 'Pil & Şarj Tüketimi', complaintScore: 80, returnImpact: 78 },
    { aspect: 'Kasa Isınması', complaintScore: 85, returnImpact: 82 },
  ],
  'Fashion & Apparel': [
    { aspect: 'Omuz & Koltukaltı Darlığı', complaintScore: 96, returnImpact: 98 },
    { aspect: 'Yanıltıcı Beden Tablosu', complaintScore: 92, returnImpact: 95 },
    { aspect: 'Kumaş Dökümü & Yün', complaintScore: 45, returnImpact: 35 },
    { aspect: 'Yıkama / Çekme', complaintScore: 68, returnImpact: 72 },
    { aspect: 'Dikiş Mukavemeti', complaintScore: 55, returnImpact: 50 },
    { aspect: 'Renk Tonu Uyuşmazlığı', complaintScore: 40, returnImpact: 30 },
  ],
  'Beauty & Skincare': [
    { aspect: 'Kırık Cam Damlalık', complaintScore: 95, returnImpact: 98 },
    { aspect: 'Kargo Sıvı Sızıntısı', complaintScore: 90, returnImpact: 94 },
    { aspect: 'Damlalık Hava Kaçağı', complaintScore: 75, returnImpact: 70 },
    { aspect: 'Serum Oksitlenmesi', complaintScore: 68, returnImpact: 65 },
    { aspect: 'Cilt Hassasiyeti', complaintScore: 50, returnImpact: 45 },
    { aspect: 'Koku & Yapışkanlık', complaintScore: 35, returnImpact: 25 },
  ],
  'Home & Kitchen': [
    { aspect: '15 Bar Portafiltre Sızıntısı', complaintScore: 92, returnImpact: 95 },
    { aspect: 'Silikon Conta Aşınması', complaintScore: 86, returnImpact: 90 },
    { aspect: 'Kılavuz & İlk Kurulum', complaintScore: 78, returnImpact: 75 },
    { aspect: 'Su Pompası Hava Yapması', complaintScore: 70, returnImpact: 65 },
    { aspect: 'Buhar Çubuğu Gücü', complaintScore: 52, returnImpact: 48 },
    { aspect: 'Temizlik & Kireç', complaintScore: 42, returnImpact: 35 },
  ],
};

export default function DashboardPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['ALL', 'Consumer Electronics', 'Fashion & Apparel', 'Beauty & Skincare', 'Home & Kitchen'];

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  let totalLoss = 0;
  let totalReturnRateSum = 0;
  let criticalDefects = 0;

  filteredProducts.forEach((p) => {
    p.insights?.forEach((i) => {
      totalLoss += i.estimatedMonthlyLoss;
      if (i.severity === 'CRITICAL' || i.severity === 'HIGH') criticalDefects++;
    });
    totalReturnRateSum += p.returnRate;
  });

  const avgReturnRate = filteredProducts.length > 0 ? totalReturnRateSum / filteredProducts.length : 0;
  const totalReviewsCount = filteredProducts.reduce((acc, p) => acc + (p.reviews?.length || 0), 0);

  const radarData = CATEGORY_RADAR_MAP[selectedCategory] || CATEGORY_RADAR_MAP.ALL;

  const leakingProducts = filteredProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    returnRate: p.returnRate,
    monthlyLoss: p.insights?.reduce((acc, i) => acc + i.estimatedMonthlyLoss, 0) || 0,
    primaryDefect: p.insights?.[0]?.defectType || 'İnceleme altında',
  }));

  const allReviewsFeed = filteredProducts.flatMap((p) =>
    (p.reviews || []).map((r) => ({
      id: r.id,
      productName: p.name,
      rating: r.rating,
      comment: r.comment,
      aspect: r.aspect,
      channel: r.channel,
      sentiment: r.sentiment,
    }))
  ).slice(0, 6);

  return (
    <div className="space-y-8 apple-bg-glow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Universal E-Commerce Growth Intelligence</span>
            <span>•</span>
            <span className="text-slate-400">Çok Sektörlü Analiz</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Yönetici Büyüme & İade Teşhis Paneli
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl">
            Tüketici elektroniği, moda/tekstil, kozmetik ve ev aletlerinde müşteri incelemelerini ve iade nedenlerini kategoriye özel yapay zeka ile ayrıştırın.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat === 'ALL' ? 'Tüm Sektörler' : cat}
            </button>
          ))}
        </div>
      </div>

      <ExecutiveSummary
        totalEstimatedLoss={totalLoss}
        avgReturnRate={avgReturnRate}
        totalReviewsAnalyzed={totalReviewsCount}
        criticalDefectsCount={criticalDefects}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <DefectRadarChart data={radarData} />
        <RevenueLeakageCard products={leakingProducts} />
      </div>

      <RecentIssuesFeed reviews={allReviewsFeed} />
    </div>
  );
}
