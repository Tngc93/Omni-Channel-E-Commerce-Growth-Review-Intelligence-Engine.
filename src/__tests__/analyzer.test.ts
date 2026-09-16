import { describe, it, expect } from 'vitest';
import { MockAiEngine } from '../lib/ai/mock-engine';

describe('Review & Defect Intelligence Analyzer', () => {
  it('should accurately classify negative sizing reviews as fit aspect defects', () => {
    const comment = 'The shirt is way too tight around the shoulders and chest. Sizing is misleading!';
    const result = MockAiEngine.analyzeReview(comment, 1);

    expect(result.sentiment).toBe('negative');
    expect(result.sentimentScore).toBeLessThan(-0.5);
    expect(result.isUrgentReturnRisk).toBe(true);

    const fitAspect = result.aspects.find((a) => a.aspect === 'fit');
    expect(fitAspect).toBeDefined();
    expect(fitAspect?.sentiment).toBe('negative');
  });

  it('should classify battery issues as quality/durability defects', () => {
    const comment = 'Left earbud battery dies in 40 minutes every single time.';
    const result = MockAiEngine.analyzeReview(comment, 1);

    expect(result.sentiment).toBe('negative');
    const qualityAspect = result.aspects.find((a) => a.aspect === 'quality');
    expect(qualityAspect).toBeDefined();
  });

  it('should accurately detect shipping and packaging failures', () => {
    const comment = 'Glass dropper arrived shattered and leaked all over the package envelope.';
    const result = MockAiEngine.analyzeReview(comment, 2);

    expect(result.sentiment).toBe('negative');
    const shippingAspect = result.aspects.find((a) => a.aspect === 'shipping');
    expect(shippingAspect).toBeDefined();
    expect(shippingAspect?.sentiment).toBe('negative');
  });

  it('should classify high-rating praise as positive sentiment', () => {
    const comment = 'Absolutely perfect fabric and beautiful stitching! Love it!';
    const result = MockAiEngine.analyzeReview(comment, 5);

    expect(result.sentiment).toBe('positive');
    expect(result.sentimentScore).toBeGreaterThan(0.7);
    expect(result.isUrgentReturnRisk).toBe(false);
  });
});
