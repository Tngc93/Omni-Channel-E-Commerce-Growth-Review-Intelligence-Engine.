import { COMPETITOR_BENCHMARKS, CompetitorComparison } from './competitor-data';

export class CompetitorEngine {
  static getBenchmark(sectorId: string): CompetitorComparison {
    return COMPETITOR_BENCHMARKS[sectorId] || COMPETITOR_BENCHMARKS.tech;
  }

  static calculateAdvantageScore(benchmark: CompetitorComparison): {
    ourAverage: number;
    competitorAverage: number;
    netAdvantage: number;
  } {
    const ourTotal = benchmark.radarMetrics.reduce((sum, m) => sum + m.ourScore, 0);
    const compTotal = benchmark.radarMetrics.reduce((sum, m) => sum + m.competitorScore, 0);
    const count = benchmark.radarMetrics.length;

    const ourAverage = Math.round(ourTotal / count);
    const competitorAverage = Math.round(compTotal / count);
    const netAdvantage = ourAverage - competitorAverage;

    return { ourAverage, competitorAverage, netAdvantage };
  }
}
