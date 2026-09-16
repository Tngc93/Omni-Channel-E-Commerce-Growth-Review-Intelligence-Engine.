import { describe, it, expect } from 'vitest';
import { CompetitorEngine } from '../lib/ai/competitor-engine';
import { COMPETITOR_BENCHMARKS } from '../lib/ai/competitor-data';

describe('Competitor Benchmark & Gap Analysis Engine', () => {
  it('should retrieve accurate benchmark data for tech sector', () => {
    const data = CompetitorEngine.getBenchmark('tech');
    expect(data.sectorName).toBe('Consumer Electronics');
    expect(data.ourProduct.name).toContain('Sony');
    expect(data.competitorProduct.name).toContain('AirPods');
    expect(data.moats.length).toBeGreaterThan(0);
    expect(data.blindspots.length).toBeGreaterThan(0);
  });

  it('should calculate valid comparative score metrics', () => {
    const data = CompetitorEngine.getBenchmark('tech');
    const { ourAverage, competitorAverage, netAdvantage } = CompetitorEngine.calculateAdvantageScore(data);
    expect(ourAverage).toBeGreaterThan(0);
    expect(competitorAverage).toBeGreaterThan(0);
    expect(netAdvantage).toBe(ourAverage - competitorAverage);
  });

  it('should support all 4 e-commerce sectors', () => {
    const sectors = ['tech', 'fashion', 'beauty', 'home'];
    sectors.forEach((sec) => {
      const benchmark = COMPETITOR_BENCHMARKS[sec];
      expect(benchmark).toBeDefined();
      expect(benchmark.radarMetrics.length).toBe(6);
    });
  });
});
