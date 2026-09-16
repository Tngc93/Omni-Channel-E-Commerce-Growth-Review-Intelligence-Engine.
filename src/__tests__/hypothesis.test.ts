import { describe, it, expect } from 'vitest';
import { MockAiEngine } from '../lib/ai/mock-engine';

describe('Growth & A/B Hypothesis Generator', () => {
  it('should generate a valid structured hypothesis with Gherkin user stories', () => {
    const hypothesis = MockAiEngine.generateHypothesis(
      'ApexPro 16" Creator Laptop',
      'Termal Throttling (96°C) ve Fan Gürültüsü',
      18.2
    );

    expect(hypothesis.title).toContain('ApexPro 16" Creator Laptop');
    expect(hypothesis.problemStatement).toContain('18.2');
    expect(hypothesis.expectedMetricImpact).toBeDefined();
    expect(hypothesis.gherkinSpec).toContain('Feature:');
    expect(hypothesis.gherkinSpec).toContain('Scenario:');
    expect(hypothesis.gherkinSpec).toContain('Given');
    expect(hypothesis.gherkinSpec).toContain('When');
    expect(hypothesis.gherkinSpec).toContain('Then');
  });
});
