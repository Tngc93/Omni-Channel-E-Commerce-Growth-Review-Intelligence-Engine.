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

  // Calculate metrics
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

  // Radar data
  const radarData = [
    { aspect: 'Beden / Kalıp (Fit)', complaintScore: 88, returnImpact: 92 },
    { aspect: 'Kalite / Dikiş', complaintScore: 65, returnImpact: 58 },
    { aspect: 'Kargo & Paketleme', complaintScore: 45, returnImpact: 40 },
    { aspect: 'Fiyat / Değer', complaintScore: 28, returnImpact: 15 },
    { aspect: 'Kullanım / Arayüz', complaintScore: 35, returnImpact: 30 },
    { aspect: 'Müşteri Desteği', complaintScore: 22, returnImpact: 18 },
  ];

  const leakingProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    returnRate: p.returnRate,
    monthlyLoss: p.insights.reduce((acc, i) => acc + i.estimatedMonthlyLoss, 0),
    primaryDefect: p.insights[0]?.defectType || 'Under investigation',
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          E-Commerce Growth & Review Intelligence
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Continuous AI diagnostics uncovering hidden catalog defects, return costs, and PM growth hypotheses.
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
