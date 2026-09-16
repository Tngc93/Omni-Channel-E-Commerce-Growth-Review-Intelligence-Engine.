import { describe, it, expect } from 'vitest';
import { MockAiEngine } from '../lib/ai/mock-engine';

describe('Review & Defect Intelligence Analyzer (Hardware & Tech)', () => {
  it('should accurately classify laptop overheating and fan noise as thermal defect', () => {
    const comment = 'Cyberpunk açtığımda fanlar 58dB ile uçak gibi çalışıyor ve 96 dereceye kadar ısınıyor. İade ettim.';
    const result = MockAiEngine.analyzeReview(comment, 1);

    expect(result.sentiment).toBe('negative');
    expect(result.sentimentScore).toBeLessThan(-0.5);
    expect(result.isUrgentReturnRisk).toBe(true);

    const thermalAspect = result.aspects.find((a) => a.aspect === 'thermals');
    expect(thermalAspect).toBeDefined();
    expect(thermalAspect?.sentiment).toBe('negative');
  });

  it('should detect monitor IPS glow and dead pixel as display defect', () => {
    const comment = 'Karanlık sahnelerde sol alt köşede sarı ışık sızması (IPS glow) ve 1 adet ölü piksel var.';
    const result = MockAiEngine.analyzeReview(comment, 1);

    expect(result.sentiment).toBe('negative');
    const displayAspect = result.aspects.find((a) => a.aspect === 'display');
    expect(displayAspect).toBeDefined();
  });

  it('should detect BIOS and driver crashes as software defect', () => {
    const comment = 'Control Center yazılımı çöküyor ve MUX switch geçişinde mavi ekran hatası veriyor.';
    const result = MockAiEngine.analyzeReview(comment, 2);

    expect(result.sentiment).toBe('negative');
    const softwareAspect = result.aspects.find((a) => a.aspect === 'software');
    expect(softwareAspect).toBeDefined();
  });

  it('should classify high-FPS and lifetime service praise as positive sentiment', () => {
    const comment = 'Ömür boyu ücretsiz bakım servisi ve termal macun yenileme harika! 300+ FPS veriyor.';
    const result = MockAiEngine.analyzeReview(comment, 5);

    expect(result.sentiment).toBe('positive');
    expect(result.sentimentScore).toBeGreaterThan(0.7);
    expect(result.isUrgentReturnRisk).toBe(false);
  });
});
