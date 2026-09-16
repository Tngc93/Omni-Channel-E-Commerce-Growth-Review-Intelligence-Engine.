export interface DefectSpikeAlert {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  category: string;
  productName: string;
  sku: string;
  defectName: string;
  spikePercentage: number; // e.g. +42%
  timeframe: string; // e.g. "Son 24 saat"
  triggerCount: number;
  channelsAffected: string[];
  recommendedAction: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED';
  timestamp: string;
}

export const ACTIVE_DEFECT_ALERTS: DefectSpikeAlert[] = [
  {
    id: 'alert-spk-001',
    severity: 'CRITICAL',
    category: 'Consumer Electronics',
    productName: 'Sony WH-1000XM5 Gürültü Engelleyici Kulaklık',
    sku: 'AMZ-SONY-WH1000XM5',
    defectName: 'Auto NC Optimizer Seviye Dalgalanması & Kafa Bandı Baskısı',
    spikePercentage: 42,
    timeframe: 'Son 24 Saat',
    triggerCount: 8,
    channelsAffected: ['Amazon Global', 'Amazon TR'],
    recommendedAction: 'Headphones Connect uygulamasında sabit ANC kilitleme rehberini acil bildirim olarak yayınlayın ve PDP video kılavuzunu güncelleyin.',
    status: 'ACTIVE',
    timestamp: '10 dakika önce',
  },
  {
    id: 'alert-spk-002',
    severity: 'CRITICAL',
    category: 'Home & Kitchen',
    productName: 'Philips HD9880/90 Airfryer Combi XXL',
    sku: 'HB-PHILIPS-HD9880-XXL',
    defectName: 'NutriU Wi-Fi 2.4GHz Eşleşme Zaman Aşımı & Ray Sıkışması',
    spikePercentage: 38,
    timeframe: 'Son 48 Saat',
    triggerCount: 6,
    channelsAffected: ['Hepsiburada', 'Trendyol'],
    recommendedAction: 'Kutu kapağına "5GHz Mesh Modemler İçin 1 Dakikada Wi-Fi Eşleşme QR Kılavuzu" ekleyin ve fabrika ray toleransını kontrol edin.',
    status: 'ACTIVE',
    timestamp: '25 dakika önce',
  },
  {
    id: 'alert-spk-003',
    severity: 'HIGH',
    category: 'Fashion & Apparel',
    productName: "Levi's 511 Slim Fit Esnek Denim Jean",
    sku: 'AMZ-LEVIS-511-SLIM',
    defectName: 'Menşei Ülke Kaynaklı Bel Kalıbı Sapması (+/- 2.5cm)',
    spikePercentage: 29,
    timeframe: 'Son 72 Saat',
    triggerCount: 9,
    channelsAffected: ['Amazon Global', 'Hepsiburada'],
    recommendedAction: 'PDP sayfasındaki beden tablosunun en üstüne "Bu koyu yıkama modelimizde 1 beden büyük tercih ediniz" uyarısı ekleyin.',
    status: 'INVESTIGATING',
    timestamp: '1 saat önce',
  },
  {
    id: 'alert-spk-004',
    severity: 'MEDIUM',
    category: 'Beauty & Skincare',
    productName: 'The Ordinary Niacinamide 10% + Zinc 1%',
    sku: 'HB-ORD-NIACIN-30',
    defectName: 'Kargoda Damlalık Diş Sıyırması & Pilling (Topaklanma)',
    spikePercentage: 18,
    timeframe: 'Son 5 Gün',
    triggerCount: 4,
    channelsAffected: ['Hepsiburada', 'Trendyol'],
    recommendedAction: 'Depo kargolamasında sünger sabitleyici yuvaya geçin ve şişe etiketine "2 Damla & 90sn Kuruma" piktogramı basın.',
    status: 'INVESTIGATING',
    timestamp: '3 saat önce',
  },
];

export function buildSlackBlockKitPayload(alert: DefectSpikeAlert, customNote?: string) {
  const emoji = alert.severity === 'CRITICAL' ? '🚨' : alert.severity === 'HIGH' ? '⚠️' : 'ℹ️';
  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${emoji} ReviewIQ Kriz Uyarısı: ${alert.defectName}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Ürün:*\n${alert.productName} (\`${alert.sku}\`)`,
          },
          {
            type: 'mrkdwn',
            text: `*Şiddet Seviyesi:*\n*${alert.severity}* (+%${alert.spikePercentage} Sıçrama)`,
          },
          {
            type: 'mrkdwn',
            text: `*Etkilenen Kanallar:*\n${alert.channelsAffected.join(', ')}`,
          },
          {
            type: 'mrkdwn',
            text: `*Zaman Aralığı:*\n${alert.timeframe} (${alert.triggerCount} Olumsuz Yorum)`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*💡 Önerilen Acil Eylem:*\n${alert.recommendedAction}${customNote ? `\n\n*Not:* ${customNote}` : ''}`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'ReviewIQ Dashboard İncele',
              emoji: true,
            },
            url: 'http://localhost:3000',
            style: 'primary',
          },
        ],
      },
    ],
  };
}

export function buildDiscordEmbedPayload(alert: DefectSpikeAlert, customNote?: string) {
  const color = alert.severity === 'CRITICAL' ? 0xef4444 : alert.severity === 'HIGH' ? 0xf59e0b : 0x3b82f6;
  return {
    embeds: [
      {
        title: `🚨 ReviewIQ Kusur Sıçraması: ${alert.defectName}`,
        description: `**${alert.productName}** ürününde olağandışı şikayet artışı saptandı (+%${alert.spikePercentage}).`,
        color,
        fields: [
          { name: 'SKU', value: `\`${alert.sku}\``, inline: true },
          { name: 'Şiddet', value: alert.severity, inline: true },
          { name: 'Zaman Aralığı', value: `${alert.timeframe} (${alert.triggerCount} şikayet)`, inline: true },
          { name: 'Kanallar', value: alert.channelsAffected.join(', '), inline: true },
          { name: 'Önerilen Eylem Planı', value: alert.recommendedAction },
          ...(customNote ? [{ name: 'Mühendislik Notu', value: customNote }] : []),
        ],
        footer: { text: 'ReviewIQ Automated Anomaly Engine' },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}
