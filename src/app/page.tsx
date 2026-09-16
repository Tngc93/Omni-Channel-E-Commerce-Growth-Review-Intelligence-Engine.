import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const rawProducts = await prisma.product.findMany({
    include: {
      insights: true,
      reviews: true,
      hypotheses: true,
    },
    orderBy: { returnRate: 'desc' },
  });

  // Ensure plain JSON serialization for client component
  const products = JSON.parse(JSON.stringify(rawProducts));

  return <DashboardClient initialProducts={products} />;
}
