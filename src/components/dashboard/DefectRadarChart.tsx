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
          <CardTitle>Aspect Defect & Return Vulnerability Radar</CardTitle>
          <CardDescription>
            Multi-dimensional sensitivity score across customer complaint categories
          </CardDescription>
        </div>
      </CardHeader>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="aspect" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
            <Radar
              name="Complaint Volume"
              dataKey="complaintScore"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.4}
            />
            <Radar
              name="Return Impact"
              dataKey="returnImpact"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#1e293b',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span>Negative Feedback Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>Dollar Margin Impact Weight</span>
        </div>
      </div>
    </Card>
  );
}
