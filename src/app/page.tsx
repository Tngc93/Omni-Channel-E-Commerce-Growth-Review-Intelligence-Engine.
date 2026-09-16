import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { ExecutiveSummary } from '@/components/dashboard/ExecutiveSummary';
import { DefectRadarChart } from '@/components/dashboard/DefectRadarChart';
import { RevenueLeakageCard } from '@/components/dashboard/RevenueLeakageCard';
import { RecentIssuesFeed } from '@/components/dashboard/RecentIssuesFeed';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const products = await prisma.product.findMany({
    include: {
      insights: true,
      reviews: { take: 5, orderBy: { createdAt: 'desc' } },
      returns: true,
    },
  });

  const allReviews = await prisma.review.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  let totalLoss = 0;
  let totalReturnRateSum = 0;
  let criticalDefects = 0;

  products.forEach((p) => {
    p.insights.forEach((i) => {
      totalLoss += i.estimatedMonthlyLoss;
      if (i.severity === 'CRITICAL' || i.severity === 'HIGH') criticalDefects++;
    });
    totalReturnRateSum += p.returnRate;
  });

  const avgReturnRate = products.length > 0 ? totalReturnRateSum / products.length : 0;
  const totalReviewsCount = await prisma.review.count();

  // Hardware & Tech Radar Data
  const radarData = [
    { aspect: 'Termal & Fan (96°C/58dB)', complaintScore: 92, returnImpact: 95 },
    { aspect: 'Panel & Işık Sızması (IPS)', complaintScore: 84, returnImpact: 88 },
    { aspect: 'Kasa & Menteşe Mekaniği', complaintScore: 68, returnImpact: 60 },
    { aspect: 'BIOS & MUX Switch Yazılımı', complaintScore: 72, returnImpact: 76 },
    { aspect: 'Kargo & Sıvı Soğutma Şoku', complaintScore: 65, returnImpact: 70 },
    { aspect: '2.4GHz RF & Sinyal Paraziti', complaintScore: 54, returnImpact: 45 },
  ];

  const leakingProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    returnRate: p.returnRate,
    monthlyLoss: p.insights.reduce((acc, i) => acc + i.estimatedMonthlyLoss, 0),
    primaryDefect: p.insights[0]?.defectType || 'İnceleme altında',
  }));

  const reviewFeedItems = allReviews.map((r) => ({
    id: r.id,
    productName: r.product.name,
    rating: r.rating,
    comment: r.comment,
    aspect: r.aspect,
    channel: r.channel,
    sentiment: r.sentiment,
  }));

  return (
    <div className="space-y-8 apple-bg-glow">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <span>Monster Hardware Intelligence Engine</span>
          <span>•</span>
          <span className="text-slate-400">Canlı Telemetri & İade Analitiği</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Donanım & İade Zekası Yönetici Paneli
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Oyun laptopları, yüksek yenileme hızlı monitörler, masaüstü canavarları ve oyuncu ekipmanlarındaki kronik arıza kök-nedenlerini teşhis edin, ciro kaybını önleyin.
        </p>
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

      <RecentIssuesFeed reviews={reviewFeedItems} />
    </div>
  );
}
