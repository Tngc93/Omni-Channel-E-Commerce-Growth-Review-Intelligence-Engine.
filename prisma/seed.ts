import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Monster Notebook & Tech Hardware Growth Intelligence Database...');

  // Clean existing records
  await prisma.growthHypothesis.deleteMany();
  await prisma.intelligenceInsight.deleteMany();
  await prisma.returnLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  // 1. Monster Tulpar T7 V20.5 Gaming Laptop
  const laptop = await prisma.product.create({
    data: {
      name: 'Monster Tulpar T7 V20.5 17.3" Gaming Laptop (i7-12700H, RTX 4070, 32GB RAM)',
      sku: 'MONS-TLP-T7-4070',
      category: 'Gaming Laptop',
      price: 1450.0,
      cost: 980.0,
      monthlySales: 620,
      returnRate: 18.2,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
      description: '17.3 inç QHD 165Hz IPS ekran, Intel Core i7 12. Nesil işlemci ve NVIDIA GeForce RTX 4070 ekran kartlı yüksek performanslı canavar.',
      reviews: {
        create: [
          {
            rating: 2,
            title: 'Cyberpunk oynarken fanlar uçak motoru gibi çalışıyor ve 96 dereceye çıkıyor',
            comment: 'Cihazın FPS performansı canavar gibi ama Turbo moda aldığım an fan sesi 58 desibele fırlıyor, kulaklıksız oynamak imkansız. Klavyenin WASD tuşlarına sıcaklık vuruyor. Isınma yüzünden iade ettim.',
            channel: 'Trendyol',
            aspect: 'thermals',
            sentiment: 'negative',
            sentimentScore: -0.85,
            verifiedPurchase: true,
            customerName: 'Arda K. (Esports Oyuncusu)',
          },
          {
            rating: 1,
            title: 'Control Center yazılımı çöküyor ve MUX Switch geçişinde mavi ekran veriyor',
            comment: 'Harici ekran kartına (D-GPU) geçmek için MUX switch açtım, Windows yeniden başlarken mavi ekran (BSOD) hatası verdi. Sürücüyü güncellemek için saatlerce uğraştım. Yazılım desteği zayıf.',
            channel: 'Hepsiburada',
            aspect: 'software',
            sentiment: 'negative',
            sentimentScore: -0.92,
            verifiedPurchase: true,
            customerName: 'Berkan D.',
          },
          {
            rating: 5,
            title: 'Ömür boyu ücretsiz bakım servisi ve canavar FPS',
            comment: 'Kadıköy servisine götürüp termal macununu yenilettim, 8 derece düştü. CS2 ve Valorantta 300+ FPS veriyor. Fiyat/performans olarak rakipsiz.',
            channel: 'Shopify / Monster Web',
            aspect: 'service',
            sentiment: 'positive',
            sentimentScore: 0.95,
            verifiedPurchase: true,
            customerName: 'Tolga M.',
          },
          {
            rating: 3,
            title: 'Adaptör tuğla gibi ağır ve pil prize takılı değilken 1 saat gidiyor',
            comment: '280W adaptör neredeyse 1 kilo. Prizden çıkardığımda pil 55 dakikada tükendi. Taşınabilir bir cihaz değil, masaüstü yerine kullanılmalı.',
            channel: 'Amazon TR',
            aspect: 'power',
            sentiment: 'neutral',
            sentimentScore: -0.2,
            verifiedPurchase: true,
            customerName: 'Caner S.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Aşırı fan gürültüsü ve klavye yüzey sıcaklığı (96°C)', orderValue: 1450.0, returnCost: 45.0, customerNote: 'Evde bebek var, fan sesi yan odadan duyuluyor.' },
          { reason: 'MUX Switch mavi ekran hatası', orderValue: 1450.0, returnCost: 45.0, customerNote: 'D-GPU modunda Windows açılmadı.' },
          { reason: 'Beklentiyi karşılamayan fan akustiği', orderValue: 1450.0, returnCost: 45.0, customerNote: 'Turbo mod çok gürültülü.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Yüksek Yükte Termal Throttling (96°C) ve 58dB Fan Akustiği',
            severity: 'CRITICAL',
            affectedAspect: 'thermals',
            summary: 'İadelerin %68i ve olumsuz yorumların %74ü yüksek fan sesi ve klavye sıcaklığından kaynaklanıyor.',
            rootCause: 'Fabrika termal macun uygulamasında hava boşluğu kalması ve varsayılan Turbo fan profilinin çok agresif desibele çıkması.',
            estimatedMonthlyLoss: 38400.0,
            evidenceQuote: 'Cyberpunk açınca fanlar uçak gibi ses çıkarıyor, klavye ısınıyor. İade etmek zorunda kaldım.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'PDP İnteraktif Fan Desibel & Sıcaklık Simülatörü ve "Ofis Sessiz Mod" Rehberi',
            problemStatement: 'Müşteriler cihazın ağır oyun modundaki fan sesini bilmeden alıp ev ortamında hayal kırıklığıyla iade ediyor (%18.2 iade oranı, $38.4k aylık kayıp).',
            hypothesis: 'Ürün sayfasına 3D interaktif "Ofis (24dB) vs Oyun (42dB) vs Turbo (58dB)" ses simülatörü ve tek tıkla sessiz mod optimizasyon ipuçları eklemek iadeleri %32 düşürecektir.',
            expectedMetricImpact: '-%5.8 İade Oranı, +$24,000/Ay Kurtarılan Ciro',
            status: 'TESTING',
            testType: 'PDP UX / Donanım Akustik Simülatörü',
            gherkinSpec: 'Feature: Laptop Fan & Termal Simülasyonu\n  Scenario: Müşteri PDP üzerinde fan modlarını dinler\n    Given Kullanıcı Tulpar T7 laptop sayfasındadır\n    When "Ofis Modu (Fısıltı Sessizliği - 24dB)" seçeneğine tıkladığında\n    Then Gerçek desibel ses örneği dinletilir\n    And "Monster Control Center ile Fan Hızını Özelleştirme" rehberi gösterilir.',
          },
        ],
      },
    },
  });

  // 2. Monster Aryond A32 V1.3 Curved Gaming Monitör
  const monitor = await prisma.product.create({
    data: {
      name: 'Monster Aryond A32 V1.3 31.5" 165Hz 1ms QHD Curved Oyuncu Monitörü',
      sku: 'MONS-ARY-A32-165',
      category: 'Oyuncu Monitörü',
      price: 340.0,
      cost: 190.0,
      monthlySales: 1150,
      returnRate: 14.8,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
      description: '1500R kavisli yarıçap, 2560x1440 QHD çözünürlük, 165Hz yenileme hızı ve HDR400 destekli sürükleyici oyun monitörü.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Karanlık sahnelerde sol alt köşede aşırı ışık sızması (IPS glow) var',
            comment: 'Korku oyunu oynarken sol alt köşe sarı parlıyor, siyahlar griye dönüyor. Ayrıca 1 adet kırmızı takılı piksel çıktı. Değişim talep ettim.',
            channel: 'Hepsiburada',
            aspect: 'display',
            sentiment: 'negative',
            sentimentScore: -0.88,
            verifiedPurchase: true,
            customerName: 'Murat Y.',
          },
          {
            rating: 5,
            title: '165Hz kavisli deneyim CS ve FIFA için muhteşem',
            comment: 'Renk canlılığı ve 1500R kavis hissi harika. Masada çok şık duruyor. Fiyatına göre bu boyutta rakibi yok.',
            channel: 'Monster Web',
            aspect: 'display',
            sentiment: 'positive',
            sentimentScore: 0.94,
            verifiedPurchase: true,
            customerName: 'Emir B.',
          },
          {
            rating: 2,
            title: 'Kutu içinden çıkan DisplayPort kablosu 165Hz vermiyor',
            comment: 'Kutudaki DP kablosuyla taktığımda en fazla 144Hz alabildim. Kendi aldığım Vesa sertifikalı kabloyla 165Hz açıldı. Kutu içeriğindeki kablo kalitesiz.',
            channel: 'Amazon TR',
            aspect: 'build',
            sentiment: 'negative',
            sentimentScore: -0.65,
            verifiedPurchase: true,
            customerName: 'Serhat K.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Sol alt köşe ışık sızması ve ölü piksel', orderValue: 340.0, returnCost: 28.0, customerNote: 'Siyah ekranda sarı parlama çok rahatsız edici.' },
          { reason: '165Hz görüntü titremesi (flicker)', orderValue: 340.0, returnCost: 28.0, customerNote: 'G-Sync açınca ekran göz kırpıyor.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: '1500R Kavisli Panel Kenar Çerçeve Baskısı (IPS Glow / Işık Sızması)',
            severity: 'HIGH',
            affectedAspect: 'display',
            summary: 'Monitör iadelerinin %62si karanlık odalardaki ışık sızması ve sub-pixel şikayetlerinden kaynaklanıyor.',
            rootCause: 'Kavisli panelin montaj çerçevesi vidalanırken köşe tork basıncının kalibrasyon eksikliği nedeniyle panele mikro baskı yapması.',
            estimatedMonthlyLoss: 24600.0,
            evidenceQuote: 'Karanlık sahnelerde sol alt köşe sarı parlıyor, siyahlar griye dönüyor.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: '"Sıfır Ölü Piksel & Işık Sızması Kalite Kontrol Mührü" ve Hızlı Değişim Güvencesi',
            problemStatement: 'Kullanıcılar küçük ışık sızmalarında doğrudan cayma hakkıyla iadeye başvuruyor (%14.8 iade oranı, $24.6k aylık maliyet).',
            hypothesis: 'Kutu üzerine ve PDPye "Birebir Mağaza/Servis Hızlı Panel Değişim Garantisi" ve "Işık Sızması Kalibrasyon Test Kılavuzu" eklenmesi, gereksiz iadeleri %28 azaltacaktır.',
            expectedMetricImpact: '-%4.2 İade Oranı, +$16,800/Ay Kurtarılan Ciro',
            status: 'TESTING',
            testType: 'Kutu İçi Deneyim & Servis Güvence Bannerı',
            gherkinSpec: 'Feature: Monitör Panel Değişim Güvencesi\n  Scenario: Kullanıcı ölü piksel kontrolü yapar\n    Given Kullanıcı monitörü kutudan çıkardığında\n    When Ekrandaki QR kodu taratarak piksel testini açtığında\n    Then "Monster 1 Ay İçinde Sıfır Ölü Piksel Hızlı Değişim" desteğine yönlendirilir.',
          },
        ],
      },
    },
  });

  // 3. Monster Semruk S8 Sıvı Soğutmalı Extreme Gaming Desktop
  const desktop = await prisma.product.create({
    data: {
      name: 'Monster Semruk S8 Extreme Sıvı Soğutmalı Gaming Desktop (i9-14900KF, RTX 4090, 64GB DDR5)',
      sku: 'MONS-SMR-S8-4090',
      category: 'Masaüstü PC',
      price: 2890.0,
      cost: 1950.0,
      monthlySales: 180,
      returnRate: 9.4,
      imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80',
      description: '360mm RGB sıvı soğutma, Intel Core i9 14. Nesil, 64GB 6000MHz RAM ve RTX 4090 ile profesyonel yayıncı ve oyuncu kasası.',
      reviews: {
        create: [
          {
            rating: 2,
            title: 'Kargo geldiğinde sıvı soğutma radyatör vidası yerinden çıkmıştı',
            comment: 'Kasa çok ağır ve kargo kutusu köşeden darbe almıştı. İçindeki sünger köpük yetersiz kaldığı için sıvı soğutma bloğu esnemiş. Çalıştırmadan iade etmek zorunda kaldım.',
            channel: 'Shopify / Monster Web',
            aspect: 'shipping',
            sentiment: 'negative',
            sentimentScore: -0.78,
            verifiedPurchase: true,
            customerName: 'Burak A.',
          },
          {
            rating: 3,
            title: 'BIOS ta XMP profili kapalı geldi, RAM ler 4800MHz de çalışıyordu',
            comment: 'Teknik bilgisi olmayan birisi fark etmez ama 6000MHz RAM parasını verip 4800de çalıştığını görünce canım sıkıldı. BIOStan elle XMP açmam gerekti. Hazır sistemde bu test edilmeliydi.',
            channel: 'Hepsiburada',
            aspect: 'software',
            sentiment: 'neutral',
            sentimentScore: -0.3,
            verifiedPurchase: true,
            customerName: 'Koray G.',
          },
          {
            rating: 5,
            title: '4K Ultra ayarlarda uçuruyor, muhteşem kablolama',
            comment: 'İçerideki kablo yönetimi sanat eseri gibi. 4K tüm oyunları 140+ FPS açıyor. Soğutma performansı çok başarılı.',
            channel: 'Trendyol',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.98,
            verifiedPurchase: true,
            customerName: 'Oğuzhan T.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Kargo hasarı - Sıvı soğutma radyatör yerinden oynamış', orderValue: 2890.0, returnCost: 75.0, customerNote: 'Ağır kasa kargoda hırpalanmış.' },
          { reason: 'Kasa ön panel USB-C portu çalışmıyor', orderValue: 2890.0, returnCost: 75.0, customerNote: 'Anakart ön panel bağlantı kablosu takılmamış.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Kargo Taşımacılığı Ağır GPU & Radyatör Sabitleme Köpüğü Yetersizliği',
            severity: 'CRITICAL',
            affectedAspect: 'shipping',
            summary: '30kg ağırlığındaki Semruk kasalarında kargo sarsıntısı sonucu ekran kartı ve AIO radyatör vidaları esniyor.',
            rootCause: 'Kasa içi "Instapak" genişleyen köpük dolgusunun radyatör braketini tam kavramaması.',
            estimatedMonthlyLoss: 19200.0,
            evidenceQuote: 'Kargo geldiğinde sıvı soğutma radyatör vidası yerinden çıkmıştı.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Darbe Sensörlü Kutu Mührü & Özel Ahşap Korumalı VIP Kargo Paleti',
            problemStatement: '2890 dolarlık sistemlerin kargo hasarı kaynaklı iadesi şirket için yüksek lojistik maliyeti yaratıyor.',
            hypothesis: 'Kasa içerisine çift katmanlı genişleyen poliüretan destek ve kutu dışına darbe indikatörü etiketi eklenmesi kargo hasarını %85 önleyecektir.',
            expectedMetricImpact: '-%5.2 İade Oranı, +$15,000/Ay Korunan Sermaye',
            status: 'VALIDATED',
            testType: 'Paketleme & Güvenli Lojistik',
            gherkinSpec: 'Feature: Güvenli PC Kargolama\n  Scenario: Masaüstü sistem kargolanırken darbe koruması\n    Given Semruk kasası paketlenirken\n    When GPU ve 360mm radyatör arasına şok emici dolgu yerleştirildiğinde\n    Then 1 metreden düşme simülasyonunda 0 vida gevşemesi sağlanır.',
          },
        ],
      },
    },
  });

  // 4. Monster Pusat Pro Mekanik Klavye & Kablosuz Fare
  const accessories = await prisma.product.create({
    data: {
      name: 'Monster Pusat Pro RGB Kablosuz Mekanik Oyuncu Klavyesi & 26K DPI Fare Seti',
      sku: 'MONS-PST-SET-RGB',
      category: 'Aksesuar & Ekipman',
      price: 119.0,
      cost: 45.0,
      monthlySales: 2400,
      returnRate: 11.2,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      description: 'Hot-swappable kırmızı switchler, 2.4GHz ultra düşük gecikmeli kablosuz dongle ve 26.000 DPI optik sensörlü fare.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'USB 3.0 portunun yanına takınca farede takılma ve atlama oluyor',
            comment: 'Kasanın arkasındaki USB 3.0 flash belleğin yanına dongle taktığımda fare 2 saniyede bir donuyor. Araya uzatma kablosu koyunca düzeldi. Alıcı frekansı parazit yapıyor.',
            channel: 'Trendyol',
            aspect: 'usability',
            sentiment: 'negative',
            sentimentScore: -0.74,
            verifiedPurchase: true,
            customerName: 'Kerem D.',
          },
          {
            rating: 2,
            title: 'Boşluk (Space) tuşunda metal yay çınlaması var',
            comment: 'Klavye switchleri yumuşak ama space tuşuna sert basınca "çınnn" diye metal sesi geliyor. Stabilizer yağlaması eksik yapılmış.',
            channel: 'Amazon TR',
            aspect: 'build',
            sentiment: 'negative',
            sentimentScore: -0.62,
            verifiedPurchase: true,
            customerName: 'Alperen S.',
          },
          {
            rating: 5,
            title: 'Fiyatına göre malzeme kalitesi ve RGB aydınlatması harika',
            comment: 'Pusat yazılımı üzerinden tüm tuşları makro atadım. Pil ömrü RGB açıkken 4 gün gidiyor, gayet yeterli.',
            channel: 'Monster Web',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.92,
            verifiedPurchase: true,
            customerName: 'Ege N.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Kablosuz fare sinyal kopması ve takılma', orderValue: 119.0, returnCost: 12.0, customerNote: 'Oyun ortasında fare bağlantısı kesiliyor.' },
          { reason: 'Space tuşu mekanik yay sesi', orderValue: 119.0, returnCost: 12.0, customerNote: 'Yazarken çınlama sesi çok rahatsız edici.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: '2.4GHz Dongle USB 3.0 RF Parazit Duyarlılığı & Stabilizer Yağlama',
            severity: 'MEDIUM',
            affectedAspect: 'usability',
            summary: 'Aksesuar iadelerinin %55i USB 3.0 portlarından kaynaklanan 2.4GHz sinyal çakışmasından ileri geliyor.',
            rootCause: 'USB 3.0 portlarının yaydığı 2.4GHz radyo frekansı gürültüsünün mini dongle antenini perdelemesi.',
            estimatedMonthlyLoss: 14800.0,
            evidenceQuote: 'USB 3.0 belleğin yanına dongle takınca fare 2 saniyede bir donuyor.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Kutu İçerisine Örgülü USB Uzatma Adaptörü Ekleme & Hızlı Kurulum Rehberi',
            problemStatement: 'Kullanıcılar dongle sinyal çakışmasını donanım arızası sanıp klavye-mouse setini iade ediyor (%11.2 iade oranı).',
            hypothesis: 'Kutu içerisine 15 cm örgü USB uzatma kablosu eklemek ve kutu kapağına "Dongle Konumlandırma İpucu" basmak iadeleri %45 düşürecektir.',
            expectedMetricImpact: '-%4.8 İade Oranı, +$8,200/Ay Kurtarılan Marj',
            status: 'DRAFT',
            testType: 'Kutu İçi Donanım & Onboarding',
            gherkinSpec: 'Feature: Dongle Parazit Önleme\n  Scenario: Kullanıcı aksesuar kutusunu açar\n    Given Paket açıldığında\n    When "En İyi Kablosuz Performans İçin Uzatma Kablosunu Kullanın" uyarısı görüldüğünde\n    Then Kullanıcı dongleı masaya yakın konumlandırır ve sinyal kopması yaşamaz.',
          },
        ],
      },
    },
  });

  console.log('Successfully seeded Monster Notebook & Tech Hardware products, defects, reviews and hypotheses!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
