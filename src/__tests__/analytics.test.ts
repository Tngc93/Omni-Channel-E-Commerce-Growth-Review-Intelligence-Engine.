import { describe, it, expect } from 'vitest';
import {
  REVISION_COHORTS,
  HISTORICAL_SENTIMENT_SERIES,
  calculateTotalRecoveredMetrics,
} from '../lib/ai/analytics-data';

describe('Analytics & ROI Engine', () => {
  it('should calculate accurate consolidated ROI metrics across all cohorts', () => {
    const metrics = calculateTotalRecoveredMetrics(REVISION_COHORTS);

    expect(metrics.totalSavedReturns).toBeGreaterThan(500);
    expect(metrics.totalRecoveredRevenue).toBeGreaterThan(200000);
    expect(metrics.avgDrop).toBeGreaterThan(10); // Average drop > 10 percentage points
    expect(metrics.avgCsatGain).toBeGreaterThan(1.0);
  });

  it('should verify each cohort has valid return rate drop and positive savings', () => {
    for (const cohort of REVISION_COHORTS) {
      expect(cohort.beforeReturnRate).toBeGreaterThan(cohort.afterReturnRate);
      expect(cohort.savedReturnsCount).toBeGreaterThan(0);
      expect(cohort.recoveredRevenue).toBeGreaterThan(0);
      expect(cohort.unitsShippedSince).toBeGreaterThan(100);
    }
  });

  it('should verify 6-month historical sentiment series data consistency', () => {
    expect(HISTORICAL_SENTIMENT_SERIES.length).toBe(6);

    for (const pt of HISTORICAL_SENTIMENT_SERIES) {
      expect(pt.positive).toBeGreaterThan(0);
      expect(pt.csatScore).toBeGreaterThanOrEqual(1.0);
      expect(pt.csatScore).toBeLessThanOrEqual(5.0);
      expect(pt.returnRate).toBeGreaterThan(0);
    }

    // Trend check: recent month (September) has higher CSAT than April
    const april = HISTORICAL_SENTIMENT_SERIES[0];
    const sept = HISTORICAL_SENTIMENT_SERIES[HISTORICAL_SENTIMENT_SERIES.length - 1];
    expect(sept.csatScore).toBeGreaterThan(april.csatScore);
    expect(sept.returnRate).toBeLessThan(april.returnRate);
  });
});
