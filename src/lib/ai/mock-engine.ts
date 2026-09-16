import { AspectCategory, ReviewAnalysisResult, GeneratedHypothesis } from './types';

export class MockAiEngine {
  static analyzeReview(comment: string, rating: number): ReviewAnalysisResult {
    const lower = comment.toLowerCase();

    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    let sentimentScore = 0.0;
    if (rating >= 4) {
      sentiment = 'positive';
      sentimentScore = 0.82 + (rating === 5 ? 0.16 : 0.0);
    } else if (rating <= 2) {
      sentiment = 'negative';
      sentimentScore = -0.78 - (rating === 1 ? 0.2 : 0.0);
    }

    const aspects: Array<{
      aspect: AspectCategory;
      sentiment: 'positive' | 'neutral' | 'negative';
      score: number;
      confidence: number;
      extractedPhrase: string;
    }> = [];

    // 1. Fashion / Sizing / Fit
    if (
      lower.includes('size') ||
      lower.includes('beden') ||
      lower.includes('kalıp') ||
      lower.includes('omuz') ||
      lower.includes('dar') ||
      lower.includes('tight') ||
      lower.includes('chest') ||
      lower.includes('small') ||
      lower.includes('large')
    ) {
      const isNeg = lower.includes('dar') || lower.includes('tight') || lower.includes('small') || lower.includes('küçük') || lower.includes('yanıltıcı');
      aspects.push({
        aspect: 'fit',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.88 : 0.85,
        confidence: 0.95,
        extractedPhrase: 'beden ve kalıp uyumu',
      });
    }

    // 2. Tech / Thermals & Acoustic
    if (
      lower.includes('ısın') ||
      lower.includes('fan') ||
      lower.includes('ses') ||
      lower.includes('thermal') ||
      lower.includes('heat') ||
      lower.includes('throttle') ||
      lower.includes('gürültü') ||
      lower.includes('94') ||
      lower.includes('96')
    ) {
      const isNeg = lower.includes('fazla') || lower.includes('uçak') || lower.includes('yanıyor') || lower.includes('throttle') || lower.includes('yüksek') || lower.includes('rahatsız') || lower.includes('iade');
      aspects.push({
        aspect: 'thermals',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.92 : 0.85,
        confidence: 0.96,
        extractedPhrase: 'termal performans ve fan akustiği',
      });
    }

    // 3. Tech / Display & Panel
    if (
      lower.includes('ekran') ||
      lower.includes('panel') ||
      lower.includes('ips') ||
      lower.includes('glow') ||
      lower.includes('piksel') ||
      lower.includes('pixel') ||
      lower.includes('monitör') ||
      lower.includes('oled') ||
      lower.includes('hz') ||
      lower.includes('ışık sız')
    ) {
      const isNeg = lower.includes('sarı') || lower.includes('sız') || lower.includes('ölü') || lower.includes('flicker') || lower.includes('kusur');
      aspects.push({
        aspect: 'display',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.89 : 0.88,
        confidence: 0.94,
        extractedPhrase: 'ekran paneli ve piksel doğruluğu',
      });
    }

    // 4. Tech / Software & Firmware & BIOS
    if (
      lower.includes('yazılım') ||
      lower.includes('driver') ||
      lower.includes('sürücü') ||
      lower.includes('bios') ||
      lower.includes('mux') ||
      lower.includes('çök') ||
      lower.includes('mavi ekran') ||
      lower.includes('bsod') ||
      lower.includes('control center')
    ) {
      const isNeg = lower.includes('çök') || lower.includes('hata') || lower.includes('mavi') || lower.includes('kilitlen') || lower.includes('sorun');
      aspects.push({
        aspect: 'software',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.86 : 0.82,
        confidence: 0.92,
        extractedPhrase: 'yazılım kararlılığı ve sürücüler',
      });
    }

    // 5. Beauty / Formula / Skin
    if (
      lower.includes('serum') ||
      lower.includes('cilt') ||
      lower.includes('tahriş') ||
      lower.includes('irritat') ||
      lower.includes('retinol') ||
      lower.includes('koku') ||
      lower.includes('sivilce') ||
      lower.includes('alerji')
    ) {
      const isNeg = lower.includes('tahriş') || lower.includes('alerji') || lower.includes('kızardı') || lower.includes('kötü') || lower.includes('yakıyor');
      aspects.push({
        aspect: 'formula',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.85 : 0.92,
        confidence: 0.94,
        extractedPhrase: 'cilt reaksiyonu ve formül etkisi',
      });
    }

    // 6. Home / Appliance / Durability / Leaks
    if (
      lower.includes('sız') ||
      lower.includes('conta') ||
      lower.includes('basınç') ||
      lower.includes('leak') ||
      lower.includes('gasket') ||
      lower.includes('damlat') ||
      lower.includes('espresso') ||
      lower.includes('buhar')
    ) {
      const isNeg = lower.includes('sızdır') || lower.includes('damlat') || lower.includes('gevşek') || lower.includes('bozuldu');
      aspects.push({
        aspect: 'durability',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.87 : 0.88,
        confidence: 0.93,
        extractedPhrase: 'mekanik sızdırmazlık ve conta dayanıklılığı',
      });
    }

    // 7. Shipping & Packaging
    if (
      lower.includes('kargo') ||
      lower.includes('paket') ||
      lower.includes('kırık') ||
      lower.includes('kutu') ||
      lower.includes('damlalık') ||
      lower.includes('dropper') ||
      lower.includes('darbe')
    ) {
      const isNeg = lower.includes('kırık') || lower.includes('akmış') || lower.includes('ezik') || lower.includes('hasar') || lower.includes('parçalan');
      aspects.push({
        aspect: 'shipping',
        sentiment: isNeg ? 'negative' : 'positive',
        score: isNeg ? -0.89 : 0.8,
        confidence: 0.91,
        extractedPhrase: 'kargo ve koruyucu ambalaj durumu',
      });
    }

    // 8. Service & Warranty
    if (
      lower.includes('servis') ||
      lower.includes('garanti') ||
      lower.includes('bakım') ||
      lower.includes('destek') ||
      lower.includes('müşteri hizmetleri')
    ) {
      const isPos = lower.includes('harika') || lower.includes('iyi') || lower.includes('hızlı') || lower.includes('ücretsiz');
      aspects.push({
        aspect: 'service',
        sentiment: isPos ? 'positive' : 'negative',
        score: isPos ? 0.9 : -0.85,
        confidence: 0.92,
        extractedPhrase: 'müşteri hizmetleri ve servis desteği',
      });
    }

    if (aspects.length === 0) {
      aspects.push({
        aspect: 'quality',
        sentiment,
        score: sentimentScore,
        confidence: 0.75,
        extractedPhrase: 'genel ürün kalite değerlendirmesi',
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
      title: `${productName} İçin Çok Kanallı Büyüme & İade Azaltma Hipotezi`,
      problemStatement: `%${returnRate} iade oranına sebep olan kronik "${topDefect}" şikayetleri doğrudan ciro ve kargo marj kaybı oluşturuyor.`,
      hypothesis: `Ürün sayfasına interaktif seçim kılavuzu, net tolerans/boyut yönergeleri ve kutulama iyileştirmesi eklenmesi, beklenti uyuşmazlığı kaynaklı iadeleri en az %28 oranında düşürecektir.`,
      expectedMetricImpact: `-%5.4 İade Oranı, +$18,200/Ay Korunan Net Kâr`,
      testType: 'PDP UX / İnteraktif Kılavuz & Paketleme',
      gherkinSpec: `Feature: Müşteri Beklenti & İade Önleme Optimizasyonu\n  As an e-commerce customer\n  I want clear pre-purchase guidance on ${productName}\n  So that I make the right purchase decision on first attempt.\n\n  Scenario: Müşteri ürün sayfasında detaylı inceleme yapar\n    Given Kullanıcı ürün detay sayfasındadır\n    When Kritik özellik ve boyut kılavuzunu incelediğinde\n    Then Dinamik öneri motoru kişiselleştirilmiş seçim önerisi sunar\n    And Olası uyumsuzluk riski %75 oranında engellenir.`,
    };
  }

  static simulatePersonaResponse(userMessage: string, customerContext: string): string {
    const lower = userMessage.toLowerCase();
    const contextLower = customerContext.toLowerCase();

    if (contextLower.includes('blazer') || contextLower.includes('giyim') || contextLower.includes('tekstil')) {
      return `Beden tablonuzda Medium için omuz genişliği 44 cm yazıyordu ama ceket omuzlarıma yapıştı, kollarımı kaldıramadım. Eğer 'Kalıbımız İtalyan Slim kesimdir, rahat giyim için 1 beden büyük tercih ediniz' uyarısı olsaydı doğrudan Large sipariş ederdim ve iadeyle uğraşmazdım.`;
    }

    if (contextLower.includes('serum') || contextLower.includes('kozmetik') || contextLower.includes('cilt')) {
      return `Serumun formülü ve cildime etkisi harikaydı ancak cam damlalık kargoda çatlamış ve yarısı zarfa dökülmüştü. Cam pipet yerine hava temassız pompalı şişeye (airless pump) geçseniz hem formül oksitlenmez hem de kargoda dökülme riski sıfıra iner.`;
    }

    if (contextLower.includes('espresso') || contextLower.includes('kahve') || contextLower.includes('ev')) {
      return `Makinenin basıncı ve kahve lezzeti çok iyi fakat portafiltre contası 15 bar basınç altında yandan kahve damlatıyor. Kutu içine yedek gıda uyumlu silikon conta ve contanın nasıl oturtulacağını gösteren bir QR video koysaydınız iade etmezdim.`;
    }

    // Default to Consumer Tech
    return `Laptopun işlemci ve ekran performansı canavar gibi ama Turbo moda aldığım an fanlar 56 dB ile yan odadan duyuluyor. Ürün sayfasına 'Ofis Modunda 24dB sessizliğinde çalışır, Turbo modda kulaklık önerilir' gibi gerçek desibel örnekleri koysaydınız beklentimi ona göre ayarlardım.`;
  }
}
