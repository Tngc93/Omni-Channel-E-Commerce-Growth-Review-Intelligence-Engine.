'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { HISTORICAL_SENTIMENT_SERIES } from '@/lib/ai/analytics-data';

export function SentimentTrendChart() {
  return (
    <div className="w-full h-80 pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={HISTORICAL_SENTIMENT_SERIES}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorNeut" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(12, 18, 30, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              fontSize: '12px',
              backdropFilter: 'blur(12px)',
              color: '#fff',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
          />
          <Area
            type="monotone"
            dataKey="positive"
            name="Pozitif Yorum"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorPos)"
          />
          <Area
            type="monotone"
            dataKey="negative"
            name="Negatif / İade Şikayeti"
            stroke="#f43f5e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorNeg)"
          />
          <Area
            type="monotone"
            dataKey="neutral"
            name="Nötr İnceleme"
            stroke="#94a3b8"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#colorNeut)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
