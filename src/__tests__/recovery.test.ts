import { describe, it, expect } from 'vitest';
import { RecoveryAgent } from '../lib/ai/recovery-agent';

describe('AI Return-Save & Auto-Reply Agent', () => {
  it('should generate sizing exchange resolution for tight apparel complaint', () => {
    const comment = 'Ceketin kalıbı omuzlardan inanılmaz dar geldi, içine sığamadım. İade ediyorum.';
    const res = RecoveryAgent.generateResolutions('Merino Wool Blazer', comment, 1);

    expect(res.detectedDefectAspect).toContain('Kalıp & Beden');
    expect(res.remedies.length).toBeGreaterThan(0);
    expect(res.remedies[0].estimatedSaveRate).toBeGreaterThan(70);
    expect(res.remedies[0].responseMessage).toContain('Beden');
  });

  it('should generate express replacement for shattered glass shipping defect', () => {
    const comment = 'Kargo geldiğinde kutu ezikti ve cam damlalık kırılmış, serum dökülmüş.';
    const res = RecoveryAgent.generateResolutions('Peptide Serum', comment, 1);

    expect(res.detectedDefectAspect).toContain('Kargo Hasarı');
    expect(res.urgencyLevel).toBe('CRITICAL');
    expect(res.remedies[0].compensationOffer).toContain('Ekspres');
  });

  it('should generate silent acoustic profile for noisy fan thermal complaint', () => {
    const comment = 'Oyun oynarken fanlar 56 dB ile uçak gibi bağırıyor ve 94 derece oluyor.';
    const res = RecoveryAgent.generateResolutions('ApexPro Laptop', comment, 2);

    expect(res.detectedDefectAspect).toContain('Termal');
    expect(res.remedies[0].responseMessage).toContain('fan');
  });
});
