import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Real-World Amazon & Hepsiburada E-Commerce Catalog...');

  await prisma.visualEvidence.deleteMany();
  await prisma.growthHypothesis.deleteMany();
  await prisma.intelligenceInsight.deleteMany();
  await prisma.returnLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  // 1. Amazon Consumer Electronics: Sony WH-1000XM5
  const sonyHeadphones = await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM5 Kablosuz Gürültü Engelleyici Kulaklık (Gümüş / Siyah)',
      sku: 'AMZ-SONY-WH1000XM5',
      category: 'Consumer Electronics',
      price: 420.0,
      cost: 260.0,
      monthlySales: 1850,
      returnRate: 14.6,
      imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
      description: 'Amazon Bestseller. Çift işlemcili Auto NC Optimizer gürültü engelleme, 8 mikrofonlu kristal netliğinde çağrı kalitesi, 30 saat pil ömrü ve LDAC yüksek çözünürlüklü ses.',
      reviews: {
        create: [
          {
            rating: 2,
            title: 'Auto NC Optimizer gürültü kesme seviyesini kendi kendine değiştiriyor',
            comment: 'Uçakta ve trende kullanırken başımı hafifçe çevirdiğimde veya gözlük taktığımda Auto NC Optimizer seviyeyi aniden düşürüyor, dış sesler içeri doluyor. Eski XM4 modelindeki sabit maksimum ANC ayarı kalkmış, çok rahatsız edici. İade ediyorum.',
            channel: 'Amazon Global',
            aspect: 'software',
            sentiment: 'negative',
            sentimentScore: -0.86,
            verifiedPurchase: true,
            customerName: 'Kerem Y. (Sık Uçan Yolcu)',
          },
          {
            rating: 2,
            title: 'Kafa bandı tepe noktası 2 saat sonra acı veriyor',
            comment: 'Ses kalitesi ve mikrofon performansı sınıfının lideri fakat kafa bandı çok dar ve ince yapılmış. 2 saatlik toplantıdan sonra başımın tepesinde baskı ve sızı yapıyor. XM4 kesinlikle daha rahattı.',
            channel: 'Amazon TR',
            aspect: 'ergonomics',
            sentiment: 'negative',
            sentimentScore: -0.78,
            verifiedPurchase: true,
            customerName: 'Canan O.',
          },
          {
            rating: 5,
            title: 'Mikrofon kalitesi ve ses sahnesi olağanüstü',
            comment: 'Açık ofis ortamında rüzgar ve arka plan seslerini tamamen yok ediyor. Zoom toplantılarında karşı taraf stüdyo mikrofonuyla konuştuğumu zannediyor.',
            channel: 'Amazon Global',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.96,
            verifiedPurchase: true,
            customerName: 'Marcus T. (Audio Engineer)',
          },
          {
            rating: 4,
            title: 'Ses şahane ama menteşeler XM4 gibi içe doğru katlanmıyor',
            comment: 'Kulaklık sadece düz yatabiliyor, eski modeller gibi avuç içine sığacak şekilde katlanmadığı için taşıma çantası sırt çantasında çok fazla yer kaplıyor.',
            channel: 'Amazon TR',
            aspect: 'durability',
            sentiment: 'neutral',
            sentimentScore: 0.25,
            verifiedPurchase: true,
            customerName: 'Deniz S.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Auto NC Optimizer kontrolsüz ANC seviye değişimi', orderValue: 420.0, returnCost: 28.0, customerNote: 'Gürültü engelleme kendi kendine azalıp çoğalıyor.' },
          { reason: 'İnce kafa bandının baş tepesine baskı yapması', orderValue: 420.0, returnCost: 28.0, customerNote: 'Uzun süreli kullanımda baş ağrısı yaptı.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Auto NC Optimizer Adaptasyon Kararsızlığı & Dar Kafa Bandı Baskısı',
            severity: 'HIGH',
            affectedAspect: 'software',
            summary: 'Amazon iadelerinin %62si ortam basıncı ve baş hareketlerinde Auto NC Optimizer algoritmasının ANC seviyesini aniden düşürmesinden ve ince kafa bandı baskısından kaynaklanıyor.',
            rootCause: 'Sony V1 işlemcisindeki otomatik optimizasyon eşik değerinin aşırı hassas ayarlanması ve PDP sayfasında sabit ANC moduna nasıl geçileceğinin anlatılmaması.',
            estimatedMonthlyLoss: 38400.0,
            evidenceQuote: 'Başımı hafifçe çevirdiğimde Auto NC seviyeyi aniden düşürüyor, dış sesler içeri doluyor.',
            status: 'OPEN',
          },
        ],
      },
            visualEvidences: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Ergonomi & Malzeme Kusuru',
            severity: 'HIGH',
            affectedPart: 'Kafa Bandı Tepe Süngeri (Cushion Pad)',
            confidenceScore: 0.94,
            liability: 'SUPPLIER_FACTORY',
            rootCause: 'Dolgu malzemesi yoğunluğunun (foam density) yetersiz olması ve dar genişlik nedeniyle tepe basıncının dağıtılamaması.',
            actionRequired: 'Tedarikçi kalite güvence revizyonu: 45D bellek köpük ve 32mm genişlik revizyonu talep et.',
            focusX: 50.0,
            focusY: 18.0,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Kargo / Taşıma Hasarı',
            severity: 'MEDIUM',
            affectedPart: 'Sağ Kulaklık Dış Kaplama Kabuğu (Right Ear Cup)',
            confidenceScore: 0.88,
            liability: 'LOGISTICS_CARRIER',
            rootCause: 'Amazon FBA dış koli sıkışması ve iç blister ambalaj korumasının darbe sönümleme eksikliği.',
            actionRequired: 'FBA kargo hasar tazminat dosyası aç ($420 birim bedel talep et).',
            focusX: 72.0,
            focusY: 60.0,
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'PDP İnteraktif "Sabit Maksimum ANC Kılavuzu" & Kafa Ergonomi Tablosu',
            problemStatement: 'Müşteriler Headphones Connect uygulamasındaki optimizasyon kapatma ayarını bulamayıp kulaklığı arızalı sanarak iade ediyor (%14.6 iade, $38.4k aylık kayıp).',
            hypothesis: 'Amazon PDP sayfasına 10 saniyelik "Sony Headphones Connect: Sabit Maksimum ANC Nasıl Kilitlenir?" videosu ve kafa bandı pedi aksesuar önerisi eklenmesi iadeleri %32 azaltacaktır.',
            expectedMetricImpact: '-%4.7 İade Oranı, +$24,500/Ay Kurtarılan Ciro',
            status: 'TESTING',
            testType: 'PDP Onboarding & Video Rehberi',
            gherkinSpec: 'Feature: Sony Sabit ANC Kilitleme Rehberi\n  Scenario: Kullanıcı ürün sayfasında ANC ayarlarını inceler\n    Given Kullanıcı Sony WH-1000XM5 detay sayfasındadır\n    When "Gürültü Engelleme Nasıl Çalışır?" sekmesine tıkladığında\n    Then Auto NC sabitleme rehberi gösterilir\n    And İade riski minimize edilir.',
          },
        ],
      },
    },
  });

  // 2. Hepsiburada Home & Kitchen: Philips HD9880/90 Airfryer Combi XXL
  const philipsAirfryer = await prisma.product.create({
    data: {
      name: 'Philips HD9880/90 Airfryer Combi 7000 Serisi XXL Akıllı Sıcak Hava Fritözü',
      sku: 'HB-PHILIPS-HD9880-XXL',
      category: 'Home & Kitchen',
      price: 340.0,
      cost: 190.0,
      monthlySales: 2200,
      returnRate: 15.8,
      imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
      description: 'Hepsiburada Çok Satan. 8.3L dev hazne, entegre gıda pişirme termometresi (prob), NutriU Wi-Fi bağlantılı akıllı tarif entegrasyonu ve Rapid CombiAir sıcak hava akış teknolojisi.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'NutriU uygulaması 2.4 GHz Wi-Fi eşleşmesinde sürekli çöküyor ve kopuyor',
            comment: 'Hepsiburada üzerinden akıllı tarif özelliği için özellikle Combi 7000 modelini tercih ettim. Ancak evdeki modeme bir türlü bağlanmıyor. Uygulama sürekli "Cihaz Çevrimdışı" hatası veriyor, Wi-Fi eşleşmesi 10 kez denemede de koptu. Akılsız model alsam daha iyiydi, iade ettim.',
            channel: 'Hepsiburada',
            aspect: 'software',
            sentiment: 'negative',
            sentimentScore: -0.92,
            verifiedPurchase: true,
            customerName: 'Burak D. (Yazılımcı)',
          },
          {
            rating: 2,
            title: 'Sepet ray mekanizması yerine zor oturuyor ve sürtme yapıyor',
            comment: 'Hazne çok geniş fakat teleskopik ray mekanizması metal aksamda takılma yapıyor. Sıcak hazneyi tek elle geri itmek neredeyse imkansız, tezgaha sürtüyor.',
            channel: 'Hepsiburada',
            aspect: 'durability',
            sentiment: 'negative',
            sentimentScore: -0.81,
            verifiedPurchase: true,
            customerName: 'Ayşe K.',
          },
          {
            rating: 5,
            title: 'Et pişirme probu tam bir şef gibi çalışıyor',
            comment: 'Biftek ve bütün tavuk pişirirken probu takıyorsunuz, iç sıcaklık 68 dereceye geldiğinde kendisi duruyor. Asla kurutmadı, sulu ve tam kıvamında oldu.',
            channel: 'Hepsiburada',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.95,
            verifiedPurchase: true,
            customerName: 'Mert S.',
          },
          {
            rating: 4,
            title: 'Boyutu devasa ama temizliği kolay',
            comment: 'Tezgahta biraz yer kaplıyor ancak parçaları bulaşık makinesinde kolayca yıkanabiliyor. Koku filtresi gerçekten işe yarıyor.',
            channel: 'Trendyol',
            aspect: 'usability',
            sentiment: 'positive',
            sentimentScore: 0.72,
            verifiedPurchase: true,
            customerName: 'Selin B.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'NutriU Wi-Fi kurulum ve bağlantı kopması arızası', orderValue: 340.0, returnCost: 32.0, customerNote: 'Uygulamaya bağlanamıyor, akıllı özellikleri çalışmıyor.' },
          { reason: 'Sepet teleskopik ray sıkışması ve sürtünme', orderValue: 340.0, returnCost: 32.0, customerNote: 'Hazne tek elle yerine oturmuyor.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'NutriU Wi-Fi 2.4GHz Eşleşme Zaman Aşımı & Hazne Rayı Tolerans Sertliği',
            severity: 'CRITICAL',
            affectedAspect: 'software',
            summary: 'Hepsiburada iadelerinin %68i modern 5GHz mesh modemlerle NutriU uygulamasının 2.4GHz bandında eşleşememesi ve ray mandalı sürtünmesinden kaynaklanıyor.',
            rootCause: 'Cihaz Wi-Fi çipinin 5GHz ağları desteklememesi ve kutu açılışında Wi-Fi bant ayrımı talimatının bulunmaması.',
            estimatedMonthlyLoss: 42200.0,
            evidenceQuote: 'Evdeki modeme bir türlü bağlanmıyor, uygulama sürekli Cihaz Çevrimdışı hatası veriyor.',
            status: 'OPEN',
          },
        ],
      },
      visualEvidences: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Üretim & Kaplama Kusuru',
            severity: 'CRITICAL',
            affectedPart: 'İç Pişirme Sepeti Taban Izgarası (PTFE Teflon Mesh)',
            confidenceScore: 0.97,
            liability: 'SUPPLIER_FACTORY',
            rootCause: 'Sepet kaynak köşelerinde PTFE astar yapışma kürleme sıcaklığı hatası; bulaşık deterjanıyla temas anında pul pul dökülme.',
            actionRequired: 'Üreticiye parça başı $18.50 chargeback cezası ve parti geri çağırma uyarısı gönder.',
            focusX: 48.0,
            focusY: 65.0,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Kalıp & Montaj Hatası',
            severity: 'HIGH',
            affectedPart: 'Çekmece Sürgü Rayı ve Kapak Mandalı (Drawer Lock Track)',
            confidenceScore: 0.91,
            liability: 'SUPPLIER_FACTORY',
            rootCause: 'Enjeksiyon kalıbında 1.2mm tırnak payı tolerans sapması; gövdeyi çizerek kapanma direnci yaratıyor.',
            actionRequired: 'Plastik enjeksiyon kalıp revizyon protokolü (Tooling Adjustment Report) iste.',
            focusX: 35.0,
            focusY: 45.0,
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Kutu Kapağı 1 Dakikalık "Wi-Fi & Modem Kurulum QR Kılavuzu" & Ray Yağlama Rehberi',
            problemStatement: 'Kullanıcılar modem frekans ayrımını yapamadığı için 12.000 TLlik cihazı bağlantı bozuk zannedip iade ediyor ($42.2k aylık zarar).',
            hypothesis: 'Kutu kapağının içine parlak "Modeminiz 5GHz mi? 1 Dakikada 2.4GHz Eşleme Rehberi" QR kodu ve animasyonlu kurulum kartı eklenmesi iadeleri %35 azaltacaktır.',
            expectedMetricImpact: '-%5.5 İade Oranı, +$28,800/Ay Kurtarılan Ciro',
            status: 'TESTING',
            testType: 'Kutu İçi Onboarding & QR Setup',
            gherkinSpec: 'Feature: Airfryer Wi-Fi Kolay Kurulum\n  Scenario: Kullanıcı kutuyu açar\n    Given Kullanıcı Philips Airfryer kutusunu açtığında\n    When Kapaktaki 2.4GHz Wi-Fi QR kodunu tarattığında\n    Then Adım adım modem eşleme asistanı açılır ve bağlantı 60 saniyede tamamlanır.',
          },
        ],
      },
    },
  });

  // 3. Amazon Home & Lifestyle: Stanley Quencher H2.0 1.18L
  const stanleyTumbler = await prisma.product.create({
    data: {
      name: 'Stanley The Quencher H2.0 FlowState Paslanmaz Çelik Vakumlu Termos 1.18L',
      sku: 'AMZ-STANLEY-Q118-FLW',
      category: 'Home & Kitchen',
      price: 65.0,
      cost: 22.0,
      monthlySales: 4500,
      returnRate: 11.2,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      description: 'Amazon Bestseller. Çift duvarlı vakum yalıtımı, FlowState 3 pozisyonlu döner kapak, pipet ağzı, araç bardaklıklarına uyumlu ergonomik alt tasarım ve geri dönüştürülmüş paslanmaz çelik gövde.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Çantada yan yatınca pipet kapağından arabanın koltuğuna ve çantama aktı',
            comment: 'Amazon yorumlarına bakarak aldım. Ancak bu termos kesinlikle sızdırmaz değil! Arabada çantamın içine koydum, virajda devrildiğinde FlowState kapağın pipet aralığından tüm su çantama boşaldı. Spor çantası veya sırt çantası için uygun değil, iade ediyorum.',
            channel: 'Amazon Global',
            aspect: 'durability',
            sentiment: 'negative',
            sentimentScore: -0.91,
            verifiedPurchase: true,
            customerName: 'Seda M.',
          },
          {
            rating: 2,
            title: 'Kulp vidaları 2 hafta sonra gevşedi ve oynuyor',
            comment: '1.18L doluyken termos ağırlaşıyor. 2 haftalık kullanımda kulpun üst bağlantı vidası gevşedi, kulp sallanıyor. Vidalamak için özel yıldız tornavida gerekiyor.',
            channel: 'Amazon TR',
            aspect: 'quality',
            sentiment: 'negative',
            sentimentScore: -0.74,
            verifiedPurchase: true,
            customerName: 'Emre C.',
          },
          {
            rating: 5,
            title: 'Buzlar 2 gün sonra bile erimemiş duruyor, araç bardaklığına tam oturuyor',
            comment: 'Yaz sıcağında arabada bıraktım, akşam bindiğimde içindeki buzlar hala duruyordu. 1.2 litrelik devasa hacmine rağmen araba bardaklığına oturması mühendislik harikası.',
            channel: 'Amazon TR',
            aspect: 'formula',
            sentiment: 'positive',
            sentimentScore: 0.98,
            verifiedPurchase: true,
            customerName: 'Hakan V.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'FlowState kapak yan yatışta su sızdırması', orderValue: 65.0, returnCost: 12.0, customerNote: 'Sırt çantamda yan yatınca su akıttı.' },
          { reason: 'Ergonomik kulp vidalarının sallanması', orderValue: 65.0, returnCost: 12.0, customerNote: 'Kulp gevşedi, taşırken güven vermiyor.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'FlowState 3 Kademeli Kapak Yan Yatışta Sızdırma & Kulp Vida Gevşemesi',
            severity: 'HIGH',
            affectedAspect: 'durability',
            summary: 'Stanley iadelerinin %76sı müşterilerin ürünü sızdırmaz seyahat termosu zannederek sırt çantasına yatay koymasından ve pipet deliğinden dökülmesinden kaynaklanıyor.',
            rootCause: 'FlowState kapağın masa başı ve araç içi tasarlanmış olması ancak PDP sayfasında "Dikey Taşıma Termosudur - Çanta İçi Sızdırabilir" uyarısının bulunmaması.',
            estimatedMonthlyLoss: 28600.0,
            evidenceQuote: 'Arabada çantamın içine koydum, virajda devrildiğinde pipet aralığından tüm su çantama boşaldı.',
            status: 'OPEN',
          },
        ],
      },
      visualEvidences: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Ambalaj & Sızdırmazlık Tasarımı',
            severity: 'HIGH',
            affectedPart: 'Döner Kapak Silikon Sızdırmazlık Contası (Silicone Gasket)',
            confidenceScore: 0.95,
            liability: 'PACKAGING_DESIGN',
            rootCause: 'Kapak 3 yönlü döner valf tasarımında yatay pozisyonda pipet dibinden mikro hava ve sıvı kaçağı.',
            actionRequired: 'PDP görseli güncelleme + Ar-Ge sızdırmazlık contası revizyonu (Part No: ST-GSK-2024).',
            focusX: 52.0,
            focusY: 22.0,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Kargo / Düşme Hasarı',
            severity: 'CRITICAL',
            affectedPart: 'Gövde Taban Paslanmaz Çelik Taban Çemberi (Bottom Base)',
            confidenceScore: 0.96,
            liability: 'LOGISTICS_CARRIER',
            rootCause: 'Kargo dağıtım sırasında yüksekten düşme sonucu tabanda derin göçük ve vakum izolasyon kaybı.',
            actionRequired: 'Hepsijet / Kargo firmasına taşıma hasarı tazminat talebi ($48.00).',
            focusX: 50.0,
            focusY: 88.0,
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'PDP "Dikey Araç & Masaüstü Termosu" Rozeti & Kutu İçi Silikon Sızdırmazlık Tıpası',
            problemStatement: 'Müşteriler çantaya atıp akıtınca ürünü kusurlu sanarak iade ediyor (%11.2 iade oranı, $28.6k aylık maliyet).',
            hypothesis: 'Ürün başlığına ve görsel galerisine "Masaüstü & Araç Kullanımı İçindir - Çanta İçi Yatay Kullanmayınız" rozeti eklenmesi ve kutuya sızdırmaz silikon tıpa aksesuarı konulması iadeleri %42 düşürecektir.',
            expectedMetricImpact: '-%4.7 İade Oranı, +$22,100/Ay Kurtarılan Ciro',
            status: 'VALIDATED',
            testType: 'PDP İletişimi & Aksesuar Bundle',
            gherkinSpec: 'Feature: Stanley Kullanım Amacı Bilgilendirmesi\n  Scenario: Müşteri satın alma aşamasındadır\n    Given Müşteri Stanley Quencher ürün sayfasındadır\n    When "Kullanım Rehberi" sekmesini incelediğinde\n    Then Dikey araç bardaklığı tasarımı ve silikon sızdırmazlık tıpası bilgisi gösterilir.',
          },
        ],
      },
    },
  });

  // 4. Hepsiburada Beauty & Skincare: The Ordinary Niacinamide 10% + Zinc 1%
  const theOrdinarySerum = await prisma.product.create({
    data: {
      name: 'The Ordinary Niacinamide 10% + Zinc 1% Leke ve Gözenek Karşıtı Serum 30ml',
      sku: 'HB-ORD-NIACIN-30',
      category: 'Beauty & Skincare',
      price: 16.0,
      cost: 4.5,
      monthlySales: 5200,
      returnRate: 9.8,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
      description: 'Hepsiburada Çok Satan. Cilt tonu düzensizliklerini ve genişlemiş gözenek görünümünü hedefleyen yüksek konsantrasyonlu vitamin ve mineral leke formülü.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Cam damlalık kapağı diş sıyırmış ve kargo poşetine sızmıştı',
            comment: 'Hepsiburada satıcısından sipariş verdim. Baloncuklu zarfın içine serumun üçte biri dökülmüştü. Damlalığın plastik vidalama kapağı diş sıyırmış, yerine oturmuyor ve tam sıkılmıyor. Paketleme çok özensiz.',
            channel: 'Hepsiburada',
            aspect: 'shipping',
            sentiment: 'negative',
            sentimentScore: -0.94,
            verifiedPurchase: true,
            customerName: 'Zeynep A.',
          },
          {
            rating: 2,
            title: 'Makyaj veya nemlendirici altına sürünce soyulup köpürüyor (pilling)',
            comment: 'Serumu sürdükten sonra üzerine güneş kremi sürdüğümde yüzümde silgi tozu gibi topaklanma ve beyaz kalıntılar bıraktı. Formülü ciltle bütünleşmiyor.',
            channel: 'Hepsiburada',
            aspect: 'formula',
            sentiment: 'negative',
            sentimentScore: -0.73,
            verifiedPurchase: true,
            customerName: 'Melis K.',
          },
          {
            rating: 5,
            title: 'Gözenekleri ve T bölgesindeki parlamayı 1 haftada sıfırladı',
            comment: 'Fiyat/performans olarak piyasadaki en iyi leke ve sebum serumu. Nemli cilde 2 damla uygulayıp kurumasını bekleyince harika sonuç veriyor.',
            channel: 'Trendyol',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.97,
            verifiedPurchase: true,
            customerName: 'Duygu R.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Kargoda damlalık gevşemesi ve kutuya sıvı akması', orderValue: 16.0, returnCost: 5.0, customerNote: 'Paket ıslak ve damlalık kapağı bozuk geldi.' },
          { reason: 'Ciltte topaklanma ve pilling şikayeti', orderValue: 16.0, returnCost: 5.0, customerNote: 'Üzerine krem sürülmüyor.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Damlalık Diş Sıyırma Problemi & Makyaj Altında Pilling (Köpürme/Soyulma)',
            severity: 'MEDIUM',
            affectedAspect: 'shipping',
            summary: 'Kozmetik iadelerinin %65i kargo taşımacılığında damlalık vidalama torkunun gevşemesinden ve kullanıcıların nemlendiriciyi çok erken sürüp ürünü topaklandırmasından ileri geliyor.',
            rootCause: 'Kargo kolisinde şişe sabitleyici sünger yuva olmaması ve ürün etiketinde 2 damla kullanım ve kuruma süresinin belirtilmemesi.',
            estimatedMonthlyLoss: 16500.0,
            evidenceQuote: 'Damlalığın vidalama kapağı diş sıyırmış, yerine oturmuyor ve paket ıslak geldi.',
            status: 'OPEN',
          },
        ],
      },
      visualEvidences: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1608248597359-009df13429fa?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1608248597359-009df13429fa?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Kargo & Kırık Cam Hasarı',
            severity: 'CRITICAL',
            affectedPart: 'Cam Damlalık Pipeti & Şişe Boyun Yivi (Dropper Pipette)',
            confidenceScore: 0.98,
            liability: 'LOGISTICS_CARRIER',
            rootCause: 'Balonlu patpat yerine ince zarf ambalaj ile gönderim; sevkiyat sırasında cam damlalık kırılmış ve serum kutuya sızmış.',
            actionRequired: 'Lojistik merkezine çift katmanlı havalı balonlu ambalaj zorunluluğu ve kargo hasar talebi ($11.50).',
            focusX: 48.0,
            focusY: 30.0,
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Kutu Kapağı "3 Adımda Doğru Rutin & Sıfır Pilling" Şeması & Kilitli Damlalık',
            problemStatement: 'Kullanıcılar fazla miktarda sürüp topaklanma yaşayınca ürünü sahte sanarak iade ediyor ($16.5k aylık iade ve kargo zararı).',
            hypothesis: 'Şişe üzerine "Sadece 2 damla uygulayın ve 90 saniye kurumasını bekleyin" ikonografisi eklenmesi ve kilitli conta ambalajı iadeleri %45 düşürecektir.',
            expectedMetricImpact: '-%4.4 İade Oranı, +$13,200/Ay Kurtarılan Sermaye',
            status: 'VALIDATED',
            testType: 'Ambalaj Revizyonu & Rutin Kılavuzu',
            gherkinSpec: 'Feature: Cilt Bakım Rutini Bilgilendirmesi\n  Scenario: Kullanıcı şişe etiketini inceler\n    Given Kullanıcı The Ordinary şişesini eline aldığında\n    When "2 Damla & 90sn Kuruma" ikonunu gördüğünde\n    Then Fazla ürün sürmez, topaklanma yaşamaz ve iade etmez.',
          },
        ],
      },
    },
  });

  // 5. Amazon & Hepsiburada Fashion: Levi's 511 Slim Fit Jeans
  const levisJeans = await prisma.product.create({
    data: {
      name: "Levi's 511 Slim Fit Esnek Denim Erkek Jean Pantolon (Koyu Mavi)",
      sku: 'AMZ-LEVIS-511-SLIM',
      category: 'Fashion & Apparel',
      price: 58.0,
      cost: 20.0,
      monthlySales: 3800,
      returnRate: 21.4,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80',
      description: 'Amazon & Hepsiburada Bestseller. %99 pamuk %1 elastan esnek denim kumaş, bacakları sarmayan modern slim fit kesim, fermuarlı pat ve ikonik arka cep kavisli dikişi.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Üretim menşeine göre kalıp tamamen farklı, bel ölçüsü 3 cm dar geldi',
            comment: "Yıllardır Levi's 511 32/32 giyerim. Ancak bu sefer gelen ürünün beli en az 1 beden dar, içine girmem imkansız. Etikete baktım Mısır üretimi yazıyor, eski aldığım Pakistan üretimiydi. Aynı modelin fabrikalar arası bu kadar ölçü farkı olması kabul edilemez. İade ediyorum.",
            channel: 'Amazon Global',
            aspect: 'fit',
            sentiment: 'negative',
            sentimentScore: -0.93,
            verifiedPurchase: true,
            customerName: 'Tolga B.',
          },
          {
            rating: 2,
            title: 'Paça boyu tabloda yazandan 4 cm daha uzun',
            comment: '30 boy sipariş verdim ama paçaları katlamadan giyilemeyecek kadar uzun geldi. Terzide kestirmek zorunda kalacaktım, uğraşmayıp iade ettim.',
            channel: 'Hepsiburada',
            aspect: 'fit',
            sentiment: 'negative',
            sentimentScore: -0.79,
            verifiedPurchase: true,
            customerName: 'Serhat K.',
          },
          {
            rating: 5,
            title: 'Kumaş esnekliği ve kalitesi tam bir klasik',
            comment: 'Rengi fotoğraftaki gibi çok asil duruyor. %1 elastan payı sayesinde gün boyu otururken hiç rahatsız etmiyor.',
            channel: 'Amazon TR',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.95,
            verifiedPurchase: true,
            customerName: 'Onur A.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Menşei ülke kaynaklı bel ölçüsü dar kalıp hatası', orderValue: 58.0, returnCost: 8.0, customerNote: 'Normalde 32 giyiyorum, beli kapanmadı.' },
          { reason: 'Paça boyunun standart dışı uzun gelmesi', orderValue: 58.0, returnCost: 8.0, customerNote: 'Paça ölçüsü tabloda yazılandan uzun.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Menşei Ülke Kaynaklı Bel ve Paça Ölçü Tolerans Farklılığı (+/- 2.5cm)',
            severity: 'CRITICAL',
            affectedAspect: 'fit',
            summary: 'Giyim iadelerinin %82si farklı tedarikçi fabrikalardan (Mısır / Pakistan / Türkiye) gelen partilerde bel kalıbının 2-3 cm sapmasından kaynaklanıyor.',
            rootCause: 'Üretim tesisleri arası yıkama/çekme toleranslarının kalibre edilmemesi ve PDP sayfasında "Kumaş yıkamasına göre yarım beden dar gelebilir" uyarısının olmaması.',
            estimatedMonthlyLoss: 31200.0,
            evidenceQuote: 'Etikete baktım Mısır üretimi yazıyor, bel ölçüsü en az 1 beden dar.',
            status: 'OPEN',
          },
        ],
      },
            visualEvidences: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
            thumbnailUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&auto=format&fit=crop&q=80',
            damageCategory: 'Tekstil / Kalıp & Beden Sapması',
            severity: 'HIGH',
            affectedPart: 'Bel Kemeri & Basen Dikiş Payı (Waistband & Inseam)',
            confidenceScore: 0.92,
            liability: 'SUPPLIER_FACTORY',
            rootCause: 'Bangladeş fabrikası üretim partisinde W32 etiketi basılmasına rağmen gerçek ölçümün W30 (76cm) çıkması.',
            actionRequired: 'Üretici kalite kontrol denetimi: Seri kesim kalıplarında çekme toleranslarının yeniden kalibrasyonu.',
            focusX: 50.0,
            focusY: 38.0,
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Dinamik Beden Asistanı: "Bel Ölçüm Simülatörü & Menşei Tolerans Rehberi"',
            problemStatement: 'Müşteriler standart bedenlerini seçip bel dar gelince %21.4 iade oranı oluşturuyor ($31.2k aylık marj kaybı).',
            hypothesis: 'Beden seçici alanına "Belinizi mezura ile ölçün: Bu koyu yıkama modelimizde 1 beden büyük tercih eden müşterilerin iade oranı %70 daha düşüktür" uyarısı eklenmesi iadeleri %36 azaltacaktır.',
            expectedMetricImpact: '-%7.7 İade Oranı, +$22,400/Ay Kurtarılan Marj',
            status: 'VALIDATED',
            testType: 'PDP Beden Asistanı & Beden Uyarı Rozeti',
            gherkinSpec: "Feature: Beden Asistanı & Kalıp Önerisi\n  Scenario: Müşteri beden seçimi yapar\n    Given Müşteri Levi's 511 ürün sayfasındadır\n    When \"32 Bel\" seçtiğinde\n    Then \"Koyu yıkama kumaş esnemesi: Rahat kullanım için 33 önerilir\" uyarısı çıkar\n    And Doğru beden sepete eklenir.",
          },
        ],
      },
    },
  });

  console.log('Successfully seeded real-world Amazon & Hepsiburada database:');
  console.log(`1. ${sonyHeadphones.name} (${sonyHeadphones.sku})`);
  console.log(`2. ${philipsAirfryer.name} (${philipsAirfryer.sku})`);
  console.log(`3. ${stanleyTumbler.name} (${stanleyTumbler.sku})`);
  console.log(`4. ${theOrdinarySerum.name} (${theOrdinarySerum.sku})`);
  console.log(`5. ${levisJeans.name} (${levisJeans.sku})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
