'use client';

import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface DefectDataPoint {
  aspect: string;
  complaintScore: number;
  returnImpact: number;
}

interface DefectRadarChartProps {
  data: DefectDataPoint[];
}

export function DefectRadarChart({ data }: DefectRadarChartProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Çok Sektörlü Kusur & Zafiyet Radarı</CardTitle>
          <CardDescription>
            Seçilen kategoride müşteri şikayet frekansı ve marj kaybı korelasyonu
          </CardDescription>
        </div>
      </CardHeader>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(150, 150, 150, 0.2)" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="aspect" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(150, 150, 150, 0.15)" />
            <Radar
              name="Şikayet Hacmi"
              dataKey="complaintScore"
              stroke="#f43f5e"
              fill="#f43f5e"
              fillOpacity={0.35}
            />
            <Radar
              name="İade & Marj Maliyeti"
              dataKey="returnImpact"
              stroke="#10b981"
              fill="#10b981"
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
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span>Şikayet & Yorum Yoğunluğu</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Dolar Marj Kaybı Ağırlığı</span>
        </div>
      </div>
    </Card>
  );
}
