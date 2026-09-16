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
    productName: 'ApexPro 16" Creator & Gaming Laptop',
    sku: 'APX-16-OLED-4070',
    revisionTitle: 'Vapour Chamber Soğutma & Fan Akustiği v2.1',
    revisionDate: 'Haziran 2026',
    rootDefectResolved: '94°C aşırı ısınma ve 56 dB fan gürültüsü şikayetleri giderildi.',
    beforeReturnRate: 24.2,
    afterReturnRate: 7.1,
    unitsShippedSince: 450,
    unitPrice: 1650,
    unitReturnProcessingCost: 35.0,
    savedReturnsCount: 77, // Math.round(450 * (0.242 - 0.071))
    recoveredRevenue: 129745, // 77 * (1650 + 35)
    csatImprovement: 1.4,
  },
  {
    id: 'cohort-fashion',
    category: 'Fashion & Apparel',
    productName: 'Merino Wool Minimalist Tailored Blazer',
    sku: 'MRN-BLZ-SLIM-01',
    revisionTitle: 'Kalıp Toleransı & 3D Beden Ölçü Tablosu',
    revisionDate: 'Temmuz 2026',
    rootDefectResolved: 'Omuz ve koltuk altı dar kalıp şikayetleri giderildi, 1 beden uyarısı eklendi.',
    beforeReturnRate: 22.8,
    afterReturnRate: 5.4,
    unitsShippedSince: 1200,
    unitPrice: 185,
    unitReturnProcessingCost: 12.5,
    savedReturnsCount: 209, // Math.round(1200 * (0.228 - 0.054))
    recoveredRevenue: 41277.5, // 209 * (185 + 12.5)
    csatImprovement: 1.6,
  },
  {
    id: 'cohort-beauty',
    category: 'Beauty & Skincare',
    productName: 'Botanical Barrier Repair Peptide Night Serum',
    sku: 'BTR-SERUM-30ML',
    revisionTitle: 'Darbe Emici Köpük Kutu & Kilitli Damlalık',
    revisionDate: 'Ağustos 2026',
    rootDefectResolved: 'Kargoda cam damlalık çatlama ve sızdırma sorunu %98 oranında kesildi.',
    beforeReturnRate: 18.5,
    afterReturnRate: 2.1,
    unitsShippedSince: 2800,
    unitPrice: 48,
    unitReturnProcessingCost: 8.0,
    savedReturnsCount: 459, // Math.round(2800 * (0.185 - 0.021))
    recoveredRevenue: 25704, // 459 * (48 + 8)
    csatImprovement: 1.8,
  },
  {
    id: 'cohort-home',
    category: 'Home & Kitchen',
    productName: 'BaristaCraft Precision Dual-Boiler Smart Espresso',
    sku: 'BC-ESP-15BAR-SS',
    revisionTitle: 'Gıda Uyumlu 15-Bar Çift Dudaklı Conta',
    revisionDate: 'Ağustos 2026',
    rootDefectResolved: '15 bar basınç altında portafiltre kenarından sıcak su sızması engellendi.',
    beforeReturnRate: 16.0,
    afterReturnRate: 3.2,
    unitsShippedSince: 650,
    unitPrice: 590,
    unitReturnProcessingCost: 28.0,
    savedReturnsCount: 83, // Math.round(650 * (0.160 - 0.032))
    recoveredRevenue: 51294, // 83 * (590 + 28)
    csatImprovement: 1.5,
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
