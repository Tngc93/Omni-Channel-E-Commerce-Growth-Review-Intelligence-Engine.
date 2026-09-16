import { describe, it, expect } from 'vitest';
import { MockAiEngine } from '../lib/ai/mock-engine';

describe('Growth & A/B Hypothesis Generator', () => {
  it('should generate a valid structured hypothesis with Gherkin user stories', () => {
    const hypothesis = MockAiEngine.generateHypothesis(
      'Signature Slim Fit Oxford Shirt',
      'Chest & Bicep Taper Miscalibration',
      23.4
    );

    expect(hypothesis.title).toContain('Signature Slim Fit Oxford Shirt');
    expect(hypothesis.problemStatement).toContain('23.4%');
    expect(hypothesis.expectedMetricImpact).toBeDefined();
    expect(hypothesis.gherkinSpec).toContain('Feature:');
    expect(hypothesis.gherkinSpec).toContain('Scenario:');
    expect(hypothesis.gherkinSpec).toContain('Given');
    expect(hypothesis.gherkinSpec).toContain('When');
    expect(hypothesis.gherkinSpec).toContain('Then');
  });
});
