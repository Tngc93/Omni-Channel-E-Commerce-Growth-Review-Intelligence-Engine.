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
    productName: 'ApexPro 16" Creator & Gaming Laptop',
    sku: 'APX-16-OLED-4070',
    defectName: 'Termal Throttling (94°C) & Fan Akustiği (56dB)',
    spikePercentage: 42,
    timeframe: 'Son 24 Saat',
    triggerCount: 8,
    channelsAffected: ['Amazon Global', 'Trendyol'],
    recommendedAction: 'Control Center v2.2 güç profili güncellemesini acil OTA olarak yayınlayın ve BIOS fan eğrisini agresifleştirin.',
    status: 'ACTIVE',
    timestamp: '10 dakika önce',
  },
  {
    id: 'alert-spk-002',
    severity: 'CRITICAL',
    category: 'Beauty & Skincare',
    productName: 'Botanical Barrier Repair Peptide Night Serum',
    sku: 'BTR-SERUM-30ML',
    defectName: 'Kargoda Kırık Cam Damlalık & Şişe Sızıntısı',
    spikePercentage: 38,
    timeframe: 'Son 48 Saat',
    triggerCount: 6,
    channelsAffected: ['Hepsiburada', 'Shopify Direct'],
    recommendedAction: 'Depo sevkiyatında tek kat havalı naylon yerine 10mm EPE köpük koruyucu kılıfa geçiş yapın.',
    status: 'ACTIVE',
    timestamp: '25 dakika önce',
  },
  {
    id: 'alert-spk-003',
    severity: 'HIGH',
    category: 'Fashion & Apparel',
    productName: 'Merino Wool Minimalist Tailored Blazer',
    sku: 'MRN-BLZ-SLIM-01',
    defectName: 'İtalyan Dar Kalıp & Omuz Sıkması (Beden Hatası)',
    spikePercentage: 29,
    timeframe: 'Son 72 Saat',
    triggerCount: 9,
    channelsAffected: ['Trendyol', 'Shopify Direct'],
    recommendedAction: 'PDP sayfasındaki beden tablosunun en üstüne "İtalyan dar kalıptır, 1 beden büyük tercih ediniz" uyarısı ekleyin.',
    status: 'INVESTIGATING',
    timestamp: '1 saat önce',
  },
  {
    id: 'alert-spk-004',
    severity: 'MEDIUM',
    category: 'Home & Kitchen',
    productName: 'BaristaCraft Precision Dual-Boiler Smart Espresso',
    sku: 'BC-ESP-15BAR-SS',
    defectName: '15-Bar Portafiltre Conta Kenar Kaçağı',
    spikePercentage: 18,
    timeframe: 'Son 5 Gün',
    triggerCount: 4,
    channelsAffected: ['Amazon Global'],
    recommendedAction: 'Fabrika QA ekibine parti kontrolü emri iletin, conta kalınlık toleransını 3.8mm seviyesinde sabitleyin.',
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
