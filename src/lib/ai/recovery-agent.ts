export interface RecoveryResolution {
  tone: string;
  strategyTitle: string;
  responseMessage: string;
  compensationOffer: string;
  estimatedSaveRate: number; // e.g. 72%
}

export interface ComplaintAnalysis {
  productName: string;
  customerName: string;
  channel: string;
  rating: number;
  detectedDefectAspect: string;
  urgencyLevel: 'HIGH' | 'CRITICAL' | 'MEDIUM';
  remedies: RecoveryResolution[];
}

export class RecoveryAgent {
  static generateResolutions(productName: string, customerComment: string, rating: number = 1): ComplaintAnalysis {
    const lower = customerComment.toLowerCase();
    let defectAspect = 'Kalite & Müşteri Deneyimi';
    let urgency: 'HIGH' | 'CRITICAL' | 'MEDIUM' = rating === 1 ? 'CRITICAL' : 'HIGH';

    if (lower.includes('omuz') || lower.includes('beden') || lower.includes('kalıp') || lower.includes('dar') || lower.includes('tight')) {
      defectAspect = 'Kalıp & Beden Sapması (Fit)';
      return {
        productName,
        customerName: 'Değerli Müşterimiz',
        channel: 'Pazar Yeri / Mağaza',
        rating,
        detectedDefectAspect: defectAspect,
        urgencyLevel: urgency,
        remedies: [
          {
            tone: 'Empatik & Hızlı Telafi',
            strategyTitle: '1 Tıkla Ücretsiz Beden Değişimi (İadesiz)',
            compensationOffer: 'Ücretsiz 1 Beden Büyük Kargo + Kişiye Özel Beden Rehberi',
            estimatedSaveRate: 78,
            responseMessage: `Merhaba, ${productName} ürünümüzün kalıbının omuz bölgenizde yarattığı rahatsızlıktan dolayı içtenlikle özür dileriz. İtalyan Slim kesimimizin her vücut tipine aynı oturmadığının farkındayız. Sizi kargo iade süreçleriyle uğraştırmamak adına, hesabınıza tek tıkla kullanabileceğiniz 'Ücretsiz 1 Beden Büyük Değişim Kuponu' tanımladık. Dilerseniz mevcut ürünü iade etmeden önce bir üst bedeni deneyebilir, uymayanı kapınızdan kuryeyle teslim edebilirsiniz.`,
          },
          {
            tone: 'VIP Müşteri Hizmetleri',
            strategyTitle: 'Kişisel Terzi / Tadilat Desteği veya Anında Hediye Çeki',
            compensationOffer: '%20 İndirim Çeki + Kargo Ücreti İadesi',
            estimatedSaveRate: 64,
            responseMessage: `Merhaba, yaşadığınız olumsuz beden deneyimi markamızın kalite standartlarıyla bağdaşmıyor. Siparişinizin faturasına istinaden %20 telafi indirim çeki hesabınıza aktarılmıştır. Memnun kalmamanız durumunda iadenizi kapınızdan ücretsiz kurye ile aldırabilir veya terzi düzeltme masrafınızı karşılayabiliriz.`,
          },
        ],
      };
    }

    if (lower.includes('kırık') || lower.includes('damlalık') || lower.includes('cam') || lower.includes('akmış') || lower.includes('kargo')) {
      defectAspect = 'Kargo Hasarı & Cam Ambalaj Kırılması';
      return {
        productName,
        customerName: 'Değerli Müşterimiz',
        channel: 'Pazar Yeri / Mağaza',
        rating,
        detectedDefectAspect: defectAspect,
        urgencyLevel: 'CRITICAL',
        remedies: [
          {
            tone: 'Acil Telafi & Sıfır Bürokrasi',
            strategyTitle: 'Hava Yastıklı Yeni Ürün Ekspres Sevkiyatı',
            compensationOffer: 'Ücretsiz Aynı Gün Ekspres Gönderim + Hediye Seyahat Boyu',
            estimatedSaveRate: 85,
            responseMessage: `Merhaba, ${productName} ürünümüzün kargo taşıma sürecinde cam damlalığının hasar görmesinden ve bu kötü deneyimden dolayı çok üzgünüz. Kırık ürünü kargoya geri taşımakla kesinlikle uğraşmanızı istemiyoruz (lütfen güvenli şekilde bertaraf ediniz). Sipariş adresinize çift katmanlı darbe emici özel ambalajıyla YENİ bir tam boy serum ve yanında hediye seyahat boyu bugün ekspres kuryeyle yola çıkarılmıştır. Takip numarası SMS ile iletilmiştir.`,
          },
        ],
      };
    }

    if (lower.includes('fan') || lower.includes('ses') || lower.includes('ısın') || lower.includes('94') || lower.includes('96') || lower.includes('gürültü')) {
      defectAspect = 'Termal Throttling & Yüksek Fan Desibeli';
      return {
        productName,
        customerName: 'Değerli Müşterimiz',
        channel: 'Pazar Yeri / Mağaza',
        rating,
        detectedDefectAspect: defectAspect,
        urgencyLevel: urgency,
        remedies: [
          {
            tone: 'Mühendislik & Çözüm Odaklı',
            strategyTitle: 'Tek Tıkla Sessiz Fan BIOS / Yazılım Profili & Bakım Güvencesi',
            compensationOffer: 'Özel Akustik Profil Rehberi + Ömür Boyu Ücretsiz Macun Yenileme',
            estimatedSaveRate: 71,
            responseMessage: `Merhaba, ${productName} laptopumuzda ağır render/oyun yükü altında fanların 56dB seviyesine çıkması ve sıcaklık hissi konusundaki haklı şikayetinizi aldık. Cihazınızın maksimum performansta çalışırken akustik olarak rahatsız etmemesi için Control Center v3.4 güncellememiz yayına alınmıştır. Bu profille işlemci gücünden ödün vermeden fan sesini %35 oranında (38dB seviyesine) indirebilirsiniz. Dilerseniz teknik ekibimiz uzaktan bağlantı ile optimizasyonu hemen yapabilir.`,
          },
        ],
      };
    }

    if (lower.includes('conta') || lower.includes('basınç') || lower.includes('sız') || lower.includes('espresso') || lower.includes('damlat')) {
      defectAspect = 'Portafiltre Conta Basınç Kaçağı';
      return {
        productName,
        customerName: 'Değerli Müşterimiz',
        channel: 'Pazar Yeri / Mağaza',
        rating,
        detectedDefectAspect: defectAspect,
        urgencyLevel: urgency,
        remedies: [
          {
            tone: 'Uzman Barista Desteği',
            strategyTitle: 'Ücretsiz Yedek Silikon Conta Kiti & Video Rehber',
            compensationOffer: '2 Adet Gıda Uyumlu Silikon Conta + 250g Premium Çekirdek Kahve',
            estimatedSaveRate: 82,
            responseMessage: `Merhaba, ${productName} espresso makinenizde 15 bar basınç altında yaşanan conta sızdırmazlık sorunundan dolayı çok üzgünüz. Fabrika montaj toleranslarının bazen contanın tam oturmamasına neden olduğunu tespit ettik. Adresinize bugün ücretsiz 2 adet gıda uyumlu silikon yedek conta kiti ve baristalarımızın hazırladığı 1 dakikalık montaj videosunun yer aldığı QR kartı kargolanmıştır. Yanında espresso keyfiniz için taze kavrulmuş 250g hediye çekirdek kahvemiz de pakete eklenmiştir.`,
          },
        ],
      };
    }

    // Default universal fallback
    return {
      productName,
      customerName: 'Değerli Müşterimiz',
      channel: 'Pazar Yeri / Mağaza',
      rating,
      detectedDefectAspect: defectAspect,
      urgencyLevel: urgency,
      remedies: [
        {
          tone: 'Hızlı Müşteri Memnuniyeti',
          strategyTitle: 'Birebir Değişim veya Koşulsuz Hızlı Destek',
          compensationOffer: 'Tam İade Güvencesi / Hediye İndirim Çeki',
          estimatedSaveRate: 65,
          responseMessage: `Merhaba, ${productName} siparişinizde yaşadığınız olumsuzluk markamızın titiz kalite standartlarıyla kesinlikle örtüşmemektedir. Memnuniyetsizliğinizi telafi etmek adına dilerseniz ürünün birebir yenisini kargolayabilir veya ödediğiniz tutarı tek tıkla kartınıza kesintisiz iade edebiliriz. Müşteri deneyim ekibimiz size özel çözüm üretmek için hazır beklemektedir.`,
        },
      ],
    };
  }
}
