export interface SentimentTimeSeriesPoint {
  date: string;
  month: string;
  positive: number;
  neutral: number;
  negative: number;
  csatScore: number; // Out of 5.0
  returnRate: number; // %
}

export interface RevisionCohort {
  id: string;
  category: string;
  productName: string;
  sku: string;
  revisionTitle: string;
  revisionDate: string;
  rootDefectResolved: string;
  beforeReturnRate: number;
  afterReturnRate: number;
  unitsShippedSince: number;
  unitPrice: number;
  unitReturnProcessingCost: number;
  savedReturnsCount: number;
  recoveredRevenue: number;
  csatImprovement: number;
}

export const HISTORICAL_SENTIMENT_SERIES: SentimentTimeSeriesPoint[] = [
  { date: '2026-04-01', month: 'Nis 26', positive: 65, neutral: 25, negative: 45, csatScore: 3.2, returnRate: 23.4 },
  { date: '2026-05-01', month: 'May 26', positive: 72, neutral: 22, negative: 48, csatScore: 3.3, returnRate: 24.1 },
  { date: '2026-06-01', month: 'Haz 26', positive: 88, neutral: 20, negative: 36, csatScore: 3.7, returnRate: 19.8 },
  { date: '2026-07-01', month: 'Tem 26', positive: 110, neutral: 18, negative: 24, csatScore: 4.1, returnRate: 13.5 },
  { date: '2026-08-01', month: 'Ağu 26', positive: 135, neutral: 15, negative: 16, csatScore: 4.4, returnRate: 8.9 },
  { date: '2026-09-01', month: 'Eyl 26', positive: 158, neutral: 12, negative: 10, csatScore: 4.7, returnRate: 5.8 },
];

export const REVISION_COHORTS: RevisionCohort[] = [
  {
    id: 'cohort-tech',
    category: 'Consumer Electronics',
    productName: 'Sony WH-1000XM5 Gürültü Engelleyici Kulaklık',
    sku: 'AMZ-SONY-WH1000XM5',
    revisionTitle: 'Headphones Connect Sabit ANC Kilitleme & Kafa Bandı Pedi',
    revisionDate: 'Haziran 2026',
    rootDefectResolved: 'Auto NC Optimizer seviye dalgalanması ve kafa tepe baskısı şikayetleri giderildi.',
    beforeReturnRate: 18.2,
    afterReturnRate: 4.8,
    unitsShippedSince: 1850,
    unitPrice: 420,
    unitReturnProcessingCost: 28.0,
    savedReturnsCount: 248, // Math.round(1850 * (0.182 - 0.048))
    recoveredRevenue: 111104, // 248 * (420 + 28)
    csatImprovement: 1.4,
  },
  {
    id: 'cohort-fashion',
    category: 'Fashion & Apparel',
    productName: "Levi's 511 Slim Fit Esnek Denim Jean",
    sku: 'AMZ-LEVIS-511-SLIM',
    revisionTitle: 'Menşei Bel Kalıp Kalibrasyonu & Canlı Beden Asistanı',
    revisionDate: 'Temmuz 2026',
    rootDefectResolved: 'Mısır ve Pakistan üretimi arasındaki 3cm bel darlığı toleransı standartlaştırıldı.',
    beforeReturnRate: 21.4,
    afterReturnRate: 5.6,
    unitsShippedSince: 3800,
    unitPrice: 58,
    unitReturnProcessingCost: 8.0,
    savedReturnsCount: 600, // Math.round(3800 * (0.214 - 0.056))
    recoveredRevenue: 39600, // 600 * (58 + 8)
    csatImprovement: 1.5,
  },
  {
    id: 'cohort-beauty',
    category: 'Beauty & Skincare',
    productName: 'The Ordinary Niacinamide 10% + Zinc 1%',
    sku: 'HB-ORD-NIACIN-30',
    revisionTitle: 'Kilitli Damlalık Kapağı & 2 Damla Rutin Kılavuzu',
    revisionDate: 'Ağustos 2026',
    rootDefectResolved: 'Kargoda damlalık diş sıyırması ve fazla sürmekten kaynaklanan pilling (soyulma) çözüldü.',
    beforeReturnRate: 14.5,
    afterReturnRate: 2.2,
    unitsShippedSince: 5200,
    unitPrice: 16,
    unitReturnProcessingCost: 5.0,
    savedReturnsCount: 640, // Math.round(5200 * (0.145 - 0.022))
    recoveredRevenue: 13440, // 640 * (16 + 5)
    csatImprovement: 1.7,
  },
  {
    id: 'cohort-home',
    category: 'Home & Kitchen',
    productName: 'Philips HD9880/90 Airfryer Combi XXL',
    sku: 'HB-PHILIPS-HD9880-XXL',
    revisionTitle: 'NutriU Wi-Fi 90s Handshake Firmware & Hızlı Kurulum QR Kartı',
    revisionDate: 'Ağustos 2026',
    rootDefectResolved: 'Modern 5GHz modemlerle yaşanan 2.4GHz eşleşme zaman aşımı ve ray sürtünmesi giderildi.',
    beforeReturnRate: 16.8,
    afterReturnRate: 3.5,
    unitsShippedSince: 2200,
    unitPrice: 340,
    unitReturnProcessingCost: 32.0,
    savedReturnsCount: 293, // Math.round(2200 * (0.168 - 0.035))
    recoveredRevenue: 108996, // 293 * (340 + 32)
    csatImprovement: 1.6,
  },
];

export function calculateTotalRecoveredMetrics(cohorts: RevisionCohort[] = REVISION_COHORTS) {
  const totalSavedReturns = cohorts.reduce((acc, c) => acc + c.savedReturnsCount, 0);
  const totalRecoveredRevenue = cohorts.reduce((acc, c) => acc + c.recoveredRevenue, 0);
  const avgDrop = cohorts.reduce((acc, c) => acc + (c.beforeReturnRate - c.afterReturnRate), 0) / cohorts.length;
  const avgCsatGain = cohorts.reduce((acc, c) => acc + c.csatImprovement, 0) / cohorts.length;

  return {
    totalSavedReturns,
    totalRecoveredRevenue,
    avgDrop: Number(avgDrop.toFixed(1)),
    avgCsatGain: Number(avgCsatGain.toFixed(1)),
  };
}
