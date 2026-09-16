import { AspectCategory, ReviewAnalysisResult, GeneratedHypothesis } from './types';

export class MockAiEngine {
  static analyzeReview(comment: string, rating: number): ReviewAnalysisResult {
    const lower = comment.toLowerCase();

    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    let sentimentScore = 0.0;
    if (rating >= 4) {
      sentiment = 'positive';
      sentimentScore = 0.8 + (rating === 5 ? 0.18 : 0.0);
    } else if (rating <= 2) {
      sentiment = 'negative';
      sentimentScore = -0.75 - (rating === 1 ? 0.2 : 0.0);
    }

    const aspects: Array<{
      aspect: AspectCategory;
      sentiment: 'positive' | 'neutral' | 'negative';
      score: number;
      confidence: number;
      extractedPhrase: string;
    }> = [];

    // 1. Hardware: Thermals & Fan Noise
    if (
      lower.includes('ısın') ||
      lower.includes('sicak') ||
      lower.includes('sıcak') ||
      lower.includes('fan') ||
      lower.includes('thermal') ||
      lower.includes('heat') ||
      lower.includes('throttle') ||
      lower.includes('gürültü') ||
      lower.includes('ses') ||
      lower.includes('derece')
    ) {
      const isNeg = lower.includes('fazla') || lower.includes('uçak') || lower.includes('yanıyor') || lower.includes('drop') || lower.includes('throttle') || lower.includes('yüksek');
      aspects.push({
        aspect: 'thermals',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.9 : 0.85,
        confidence: 0.96,
        extractedPhrase: 'termal performans ve fan akustiği',
      });
    }

    // 2. Hardware: Display & Panel
    if (
      lower.includes('ekran') ||
      lower.includes('panel') ||
      lower.includes('piksel') ||
      lower.includes('pixel') ||
      lower.includes('ışık sız') ||
      lower.includes('glow') ||
      lower.includes('ghosting') ||
      lower.includes('hz') ||
      lower.includes('renk')
    ) {
      const isNeg = lower.includes('ölü') || lower.includes('sızma') || lower.includes('ghosting') || lower.includes('kötü') || lower.includes('soluk');
      aspects.push({
        aspect: 'display',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.88 : 0.9,
        confidence: 0.95,
        extractedPhrase: 'panel ve görüntü kalitesi',
      });
    }

    // 3. Hardware: Build & Chassis
    if (
      lower.includes('kasa') ||
      lower.includes('menteşe') ||
      lower.includes('hinge') ||
      lower.includes('plastik') ||
      lower.includes('tuş') ||
      lower.includes('klavye') ||
      lower.includes('esneme') ||
      lower.includes('gıcırtı')
    ) {
      const isNeg = lower.includes('kırık') || lower.includes('esniyor') || lower.includes('kalitesiz') || lower.includes('gıcırd') || lower.includes('sert');
      aspects.push({
        aspect: 'build',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.82 : 0.8,
        confidence: 0.92,
        extractedPhrase: 'kasa mekaniği ve malzeme kalitesi',
      });
    }

    // 4. Hardware: Software & BIOS
    if (
      lower.includes('bios') ||
      lower.includes('driver') ||
      lower.includes('sürücü') ||
      lower.includes('control center') ||
      lower.includes('mux') ||
      lower.includes('mavi ekran') ||
      lower.includes('bsod') ||
      lower.includes('çök') ||
      lower.includes('fps')
    ) {
      const isNeg = lower.includes('çök') || lower.includes('mavi') || lower.includes('hata') || lower.includes('açılmıyor') || lower.includes('düşük');
      aspects.push({
        aspect: 'software',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.85 : 0.85,
        confidence: 0.93,
        extractedPhrase: 'yazılım ve BIOS kararlılığı',
      });
    }

    // 5. Hardware: Battery & Power
    if (
      lower.includes('pil') ||
      lower.includes('batarya') ||
      lower.includes('şarj') ||
      lower.includes('adaptör') ||
      lower.includes('battery') ||
      lower.includes('power')
    ) {
      const isNeg = lower.includes('bitiyor') || lower.includes('yetmiyor') || lower.includes('ısındı') || lower.includes('hızlı');
      aspects.push({
        aspect: 'power',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.8 : 0.8,
        confidence: 0.9,
        extractedPhrase: 'güç ve batarya ömrü',
      });
    }

    // 6. Service & Maintenance
    if (
      lower.includes('servis') ||
      lower.includes('bakım') ||
      lower.includes('garanti') ||
      lower.includes('termal macun') ||
      lower.includes('teknik') ||
      lower.includes('destek')
    ) {
      const isNeg = lower.includes('geç') || lower.includes('ilgisiz') || lower.includes('çizik') || lower.includes('çözmedi');
      aspects.push({
        aspect: 'service',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.75 : 0.92,
        confidence: 0.91,
        extractedPhrase: 'teknik servis ve bakım deneyimi',
      });
    }

    // Fallback if no specific tech aspect triggered
    if (aspects.length === 0) {
      aspects.push({
        aspect: 'quality',
        sentiment,
        score: sentimentScore,
        confidence: 0.75,
        extractedPhrase: 'genel ürün değerlendirmesi',
      });
    }

    return {
      sentiment,
      sentimentScore,
      aspects,
      primaryDefect: aspects.find((a) => a.sentiment === 'negative')?.aspect,
      isUrgentReturnRisk: rating <= 2,
    };
  }

  static generateHypothesis(productName: string, topDefect: string, returnRate: number): GeneratedHypothesis {
    return {
      title: `${productName} İçin AI Destekli Donanım & PDP Optimizasyonu`,
      problemStatement: `%${returnRate} iade oranına yol açan kronik "${topDefect}" şikayetleri müşteri kaybına ve yüksek kargo/servis maliyetine sebep oluyor.`,
      hypothesis: `Ürün sayfasına (PDP) donanım performans simülatörü, ses/fan modu kılavuzu ve kutu içerisine hızlı optimizasyon rehberi eklenmesi, donanım kaynaklı iadeleri %30 azaltacaktır.`,
      expectedMetricImpact: `-%6.2 İade Oranı, +$14,500/Ay Korunan Marj`,
      testType: 'PDP UX / Donanım Simülatörü & Kılavuz',
      gherkinSpec: `Feature: Donanım Performans & Fan Kılavuzu\n  Kullanıcı oyun laptopu veya monitör incelerken\n  Gerçek yük altındaki sıcaklık ve fan desibel değerlerini görmeli\n  Böylece beklenti uyuşmazlığı kaynaklı iadeler önlenmeli.\n\n  Scenario: Kullanıcı fan profili simülasyonunu test eder\n    Given Kullanıcı ${productName} ürün sayfasındadır\n    When "Ofis / Oyun / Turbo Fan Modu" simülasyonunu seçtiğinde\n    Then Desibel (dB) ve sıcaklık grafiği canlı olarak güncellenir\n    And "Monster Control Center ile Tek Tıkla Sessiz Mod" ipucu gösterilir.`,
    };
  }

  static simulatePersonaResponse(userMessage: string, customerContext: string): string {
    const lower = userMessage.toLowerCase();
    if (lower.includes('fan') || lower.includes('ısın') || lower.includes('sıcak') || lower.includes('ses')) {
      return `Bak dostum, Tulpar'ı aldığımda oyun performansı harikaydı ama Cyberpunk açınca fanlar 58 dB'ye fırlıyor, yan odadan duyuluyor! Eğer ürün sayfasına "Ofis modunda 25 dB fısıltı sessizliğinde, Turbo modunda kulaklıkla oynanması önerilir" uyarısı koysaydınız iade etmezdim.`;
    }
    if (lower.includes('ekran') || lower.includes('monitör') || lower.includes('piksel')) {
      return `Aryond monitörde 165Hz akıcılık çok iyi ama karanlık sahnelerde sol alt köşeden sarı ışık sızması (IPS glow) var. Kutuyu açtığımda ölü piksel testini servis garantili yapabileceğimi belirten bir karekod olsaydı servise danışırdım, doğrudan iade butonuna basmazdım.`;
    }
    return `Monster cihazları güçlü ama beklenti yönetimi çok önemli. Kutu içerisindeki Control Center rehberini daha belirgin yaparsanız müşteriler gereksiz yere iade sürecine girmez.`;
  }
}
