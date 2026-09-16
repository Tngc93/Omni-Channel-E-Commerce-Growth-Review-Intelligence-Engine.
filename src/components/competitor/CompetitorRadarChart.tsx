'use client';

import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface CompetitorRadarChartProps {
  data: Array<{
    aspect: string;
    ourScore: number;
    competitorScore: number;
  }>;
  ourProductName: string;
  competitorProductName: string;
}

export function CompetitorRadarChart({ data, ourProductName, competitorProductName }: CompetitorRadarChartProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Birebir Yetenek & Zafiyet Radarı</CardTitle>
          <CardDescription>
            {ourProductName} ile {competitorProductName} arasındaki boyutsal kıyaslama
          </CardDescription>
        </div>
      </CardHeader>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(150, 150, 150, 0.2)" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="aspect" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(150, 150, 150, 0.15)" />
            <Radar
              name={ourProductName}
              dataKey="ourScore"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.35}
            />
            <Radar
              name={competitorProductName}
              dataKey="competitorScore"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.25}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '12px',
                backdropFilter: 'blur(16px)',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="font-medium text-slate-900 dark:text-white">Bizim Ürünümüz</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          <span className="font-medium text-slate-900 dark:text-white">Rakip Benchmark</span>
        </div>
      </div>
    </Card>
  );
}
