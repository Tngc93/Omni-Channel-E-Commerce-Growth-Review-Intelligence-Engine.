import { describe, it, expect } from 'vitest';
import { VisionAiEngine } from '../lib/ai/vision-engine';

describe('Vision AI & Defect Inspection Engine', () => {
  describe('Liability Attribution Meta', () => {
    it('should map each liability type to accurate operational labels and badges', () => {
      const carrier = VisionAiEngine.getLiabilityMeta('LOGISTICS_CARRIER');
      expect(carrier.label).toContain('Kargo');
      expect(carrier.badgeVariant).toBe('danger');
      expect(carrier.description).toContain('tazminat');

      const supplier = VisionAiEngine.getLiabilityMeta('SUPPLIER_FACTORY');
      expect(supplier.label).toContain('Üretici');
      expect(supplier.badgeVariant).toBe('warning');
      expect(supplier.description).toContain('chargeback');

      const packaging = VisionAiEngine.getLiabilityMeta('PACKAGING_DESIGN');
      expect(packaging.label).toContain('Ambalaj');
      expect(packaging.badgeVariant).toBe('purple');

      const misuse = VisionAiEngine.getLiabilityMeta('CUSTOMER_MISUSE');
      expect(misuse.label).toContain('Kullanım');
      expect(misuse.badgeVariant).toBe('cyan');
    });
  });

  describe('Offline Domain-Aware Image & Review Analysis', () => {
    it('should diagnose headphone headband stress and map to supplier ergonomics', async () => {
      const result = await VisionAiEngine.analyzeImage({
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        productName: 'Sony WH-1000XM5 Kablosuz Kulaklık',
        reviewComment: 'Kafa bandı tepe süngeri 2 saat sonra başımda şiddetli ağrı yapıyor.',
      });

      expect(result.confidenceScore).toBeGreaterThanOrEqual(0.85);
      expect(result.damageCategory).toContain('Ergonomi');
      expect(result.affectedPart).toContain('Kafa Bandı');
      expect(result.liability).toBe('SUPPLIER_FACTORY');
      expect(result.focusCoordinates.x).toBeGreaterThan(0);
      expect(result.focusCoordinates.y).toBeGreaterThan(0);
      expect(result.detectedTags.length).toBeGreaterThan(0);
    });

    it('should diagnose kitchen appliance teflon peeling as critical supplier defect', async () => {
      const result = await VisionAiEngine.analyzeImage({
        imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62',
        productName: 'Philips XXL Airfryer',
        reviewComment: 'Teflon taban ızgarası kaplaması soyuldu ve yemeğe döküldü.',
      });

      expect(result.severity).toBe('CRITICAL');
      expect(result.affectedPart).toContain('Teflon');
      expect(result.liability).toBe('SUPPLIER_FACTORY');
      expect(result.actionRequired).toContain('chargeback');
    });

    it('should diagnose tumbler liquid leak as packaging seal defect', async () => {
      const result = await VisionAiEngine.analyzeImage({
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38',
        productName: 'Stanley Quencher Tumbler',
        reviewComment: 'Döner kapak contasından su sızdırıyor, çantam ıslandı.',
      });

      expect(result.liability).toBe('PACKAGING_DESIGN');
      expect(result.affectedPart).toContain('Kapak');
      expect(result.actionRequired).toContain('PDP');
    });

    it('should diagnose broken dropper glass bottle as carrier logistics liability', async () => {
      const result = await VisionAiEngine.analyzeImage({
        imageUrl: 'https://images.unsplash.com/photo-1608248597359-009df13429fa',
        productName: 'The Ordinary Niacinamide Serum',
        reviewComment: 'Kargo paketini açtım cam damlalık kırılmış, kutu sırıl sıklam.',
      });

      expect(result.severity).toBe('CRITICAL');
      expect(result.liability).toBe('LOGISTICS_CARRIER');
      expect(result.affectedPart).toContain('Cam');
      expect(result.actionRequired).toContain('kargo');
    });

    it('should diagnose clothing sizing discrepancy as supplier factory liability', async () => {
      const result = await VisionAiEngine.analyzeImage({
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        productName: "Levi's 511 Slim Fit Jeans",
        reviewComment: 'Etiket 32 beden ama bel ölçüsü en az 4 cm dar geldi, kapanmıyor.',
      });

      expect(result.liability).toBe('SUPPLIER_FACTORY');
      expect(result.affectedPart).toContain('Bel');
      expect(result.actionRequired).toContain('kalite kontrol');
    });

    it('should handle generic unknown image gracefully without throwing', async () => {
      const result = await VisionAiEngine.analyzeImage({
        imageUrl: 'https://images.unsplash.com/photo-general-item',
        productName: 'Unknown Widget X',
      });

      expect(result).toHaveProperty('damageCategory');
      expect(result).toHaveProperty('severity');
      expect(result).toHaveProperty('liability');
      expect(result).toHaveProperty('focusCoordinates');
      expect(result.focusCoordinates.x).toBeGreaterThanOrEqual(0);
      expect(result.focusCoordinates.x).toBeLessThanOrEqual(100);
      expect(result.focusCoordinates.y).toBeGreaterThanOrEqual(0);
      expect(result.focusCoordinates.y).toBeLessThanOrEqual(100);
    });
  });

  describe('Product Defect Anatomy & CAD Schematic Hotspots', () => {
    it('should return CAD hotspot coordinates and liability split for Sony headphones', () => {
      const anatomy = VisionAiEngine.getDefectAnatomy('Sony WH-1000XM5 Kulaklık', 'sony-1', [
        {
          affectedPart: 'Kafa Bandı Tepe Süngeri',
          severity: 'HIGH',
          damageCategory: 'Ergonomi',
          liability: 'SUPPLIER_FACTORY',
          focusX: 50,
          focusY: 18,
        },
      ]);

      expect(anatomy.productName).toContain('Sony');
      expect(anatomy.hotspots.length).toBeGreaterThanOrEqual(3);

      const headband = anatomy.hotspots.find((h) => h.partName.includes('Kafa Bandı'));
      expect(headband).toBeDefined();
      expect(headband?.x).toBe(50);
      expect(headband?.y).toBe(18);

      expect(anatomy.supplierLiabilityPct + anatomy.carrierLiabilityPct + anatomy.packagingLiabilityPct).toBe(100);
    });

    it('should return CAD hotspot coordinates and liability split for Philips Airfryer', () => {
      const anatomy = VisionAiEngine.getDefectAnatomy('Philips HD9880 Airfryer', 'philips-1');

      expect(anatomy.hotspots.length).toBeGreaterThanOrEqual(3);
      const mesh = anatomy.hotspots.find((h) => h.partName.includes('Teflon') || h.partName.includes('Sepet'));
      expect(mesh).toBeDefined();
      expect(mesh?.criticalSharePct).toBeGreaterThan(50);
    });

    it('should return CAD hotspot coordinates and liability split for Stanley Tumbler', () => {
      const anatomy = VisionAiEngine.getDefectAnatomy('Stanley Quencher 1.18L', 'stanley-1');

      expect(anatomy.hotspots.length).toBeGreaterThanOrEqual(2);
      const gasket = anatomy.hotspots.find((h) => h.partName.includes('Kapak') || h.partName.includes('Conta'));
      expect(gasket).toBeDefined();
    });

    it('should handle custom unknown product without errors', () => {
      const anatomy = VisionAiEngine.getDefectAnatomy('Custom Smart Clock', 'custom-1');

      expect(anatomy.hotspots.length).toBeGreaterThanOrEqual(2);
      expect(anatomy.productName).toBe('Custom Smart Clock');
    });
  });
});
