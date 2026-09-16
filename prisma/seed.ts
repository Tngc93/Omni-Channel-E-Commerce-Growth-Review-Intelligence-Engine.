import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Brand-Agnostic, Multi-Category E-Commerce Growth Database...');

  await prisma.growthHypothesis.deleteMany();
  await prisma.intelligenceInsight.deleteMany();
  await prisma.returnLog.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  // 1. Consumer Electronics: ApexPro 16" Studio & Gaming Laptop
  const laptop = await prisma.product.create({
    data: {
      name: 'ApexPro 16" Creator & Gaming Laptop (Intel i9, RTX 4070, 32GB RAM, 165Hz OLED)',
      sku: 'TECH-APX-16-4070',
      category: 'Consumer Electronics',
      price: 1650.0,
      cost: 1100.0,
      monthlySales: 540,
      returnRate: 16.4,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
      description: 'Ultra-thin magnesium-alloy chassis, 165Hz OLED Studio display, and high-performance dedicated graphics for creators and gamers.',
      reviews: {
        create: [
          {
            rating: 2,
            title: '4K video render ve oyunlarda fanlar 56 dB e ulaşıyor, klavye ısınıyor',
            comment: 'Ekran kalitesi ve OLED renkler büyüleyici ama render alırken fan sesi uçak motoru gibi 56 desibele çıkıyor. Klavyenin sol yüzeyi 94 dereceye kadar ısınıyor, rahatsız olup iade ettim.',
            channel: 'Shopify Store',
            aspect: 'thermals',
            sentiment: 'negative',
            sentimentScore: -0.88,
            verifiedPurchase: true,
            customerName: 'Kaan B. (Video Editor)',
          },
          {
            rating: 5,
            title: 'OLED ekran renk doğruluğu ve hafif tasarım muazzam',
            comment: 'DCI-P3 %100 renk gamı fotoğraf işleme için piyasadaki en iyi panel. Ofis modunda tamamen sessiz çalışıyor.',
            channel: 'Amazon Global',
            aspect: 'display',
            sentiment: 'positive',
            sentimentScore: 0.96,
            verifiedPurchase: true,
            customerName: 'Marcus T.',
          },
          {
            rating: 1,
            title: 'Control Center yazılımı çöküyor ve pil şarjda değilken 1 saatte bitiyor',
            comment: 'Yazılım optimizasyonu zayıf. Pil ömrü yüksek performans modunda 55 dakikada tükendi. Taşınabilir kullanım için elverişli değil.',
            channel: 'Trendyol',
            aspect: 'software',
            sentiment: 'negative',
            sentimentScore: -0.9,
            verifiedPurchase: true,
            customerName: 'Deniz S.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Aşırı fan gürültüsü ve render sırasında klavye ısınması', orderValue: 1650.0, returnCost: 45.0, customerNote: 'Ofis ortamında fan sesi çok yüksek.' },
          { reason: 'Beklenenden kısa batarya süresi', orderValue: 1650.0, returnCost: 45.0, customerNote: 'Dışarıda çalışırken şarjı hemen bitiyor.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Render Yükü Altında Agresif Fan Akustiği (56dB) ve Yüzey Isınması',
            severity: 'CRITICAL',
            affectedAspect: 'thermals',
            summary: 'İadelerin %64ü ağır iş yüklerinde fan gürültüsünün 55dB üzerine çıkmasından kaynaklanıyor.',
            rootCause: 'Kompakt magnezyum kasada buhar odası soğutucusunun fabrika fan eğrisinin aşırı agresif kalibre edilmesi.',
            estimatedMonthlyLoss: 32400.0,
            evidenceQuote: 'Render alırken fan sesi 56 desibele çıkıyor, klavye ısınıyor. İade etmek zorunda kaldım.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'PDP İnteraktif Fan Desibel Simülatörü & "Creator Sessiz Mod" Rehberi',
            problemStatement: 'Müşteriler cihazın ağır moddaki fan sesini bilmeden alıp iade sürecine giriyor (%16.4 iade oranı, $32.4k aylık maliyet).',
            hypothesis: 'Ürün sayfasına interaktif "Sessiz Mod (24dB) vs Performans Modu (56dB)" desibel karşılaştırıcısı eklenmesi iadeleri %30 azaltacaktır.',
            expectedMetricImpact: '-%4.9 İade Oranı, +$21,000/Ay Korunan Ciro',
            status: 'TESTING',
            testType: 'PDP UX / Akustik Simülatörü',
            gherkinSpec: 'Feature: Laptop Fan Akustik Simülasyonu\n  Scenario: Kullanıcı ürün sayfasında fan sesini dinler\n    Given Kullanıcı ApexPro 16 ürün detay sayfasındadır\n    When "Ofis Sessiz Modu (24dB)" seçildiğinde\n    Then Gerçek desibel ses kaydı dinletilir\n    And "Performans modunda kulaklık kullanımı önerilir" uyarısı gösterilir.',
          },
        ],
      },
    },
  });

  // 2. Fashion & Apparel: Merino Wool Tailored Blazer
  const blazer = await prisma.product.create({
    data: {
      name: 'Merino Wool Minimalist Tailored Blazer (Slim Fit, Charcoal Grey)',
      sku: 'FASH-BLZ-MRN-01',
      category: 'Fashion & Apparel',
      price: 185.0,
      cost: 55.0,
      monthlySales: 1420,
      returnRate: 22.8,
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      description: '100% Australian Merino wool single-breasted blazer with Italian structured shoulders and unlined breathable back.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Omuzlar aşırı dar ve kalıp tamamen yanıltıcı',
            comment: 'Kumaş kalitesi muazzam ancak kalıp kesinlikle standart Medium değil! Omuz dikişleri kollarıma yapıştı, kollarımı kaldıramadım. Beden tablosu en az 1 beden dar gösteriyor.',
            channel: 'Shopify Store',
            aspect: 'fit',
            sentiment: 'negative',
            sentimentScore: -0.92,
            verifiedPurchase: true,
            customerName: 'Elena R. (Moda Alıcısı)',
          },
          {
            rating: 5,
            title: '1 beden büyük alınca üzerime dikilmiş gibi oturdu',
            comment: 'Yorumları okuyup normal bedenimden bir beden büyük (L) sipariş verdim. Kumaş dökümü ve dikişleri lüks markalar ayarında.',
            channel: 'Hepsiburada',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.95,
            verifiedPurchase: true,
            customerName: 'Barış C.',
          },
          {
            rating: 2,
            title: 'Kuru temizleme sonrası astar büzüştü',
            comment: 'Kumaş yün olduğu için talimata uygun temizlettim fakat kol astarı büzüldü ve kol kısmı kastı.',
            channel: 'Trendyol',
            aspect: 'quality',
            sentiment: 'negative',
            sentimentScore: -0.7,
            verifiedPurchase: true,
            customerName: 'Selin G.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Omuz ve koltuk altı aşırı dar / kalıp hatası', orderValue: 185.0, returnCost: 18.0, customerNote: 'Normalde M giyiyorum, içine giremedim.' },
          { reason: 'Beden tablosu ile ürün ölçüsü uyumsuz', orderValue: 185.0, returnCost: 18.0, customerNote: 'Göğüs ölçüsü tabloda yazandan 4 cm dar.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'İtalyan Slim-Cut Omuz Genişliği Mis-Kalibrasyonu & Beden Rehberi Hatası',
            severity: 'CRITICAL',
            affectedAspect: 'fit',
            summary: 'Giyim iadelerinin %78i omuz genişliğinin standart e-ticaret ölçülerinden dar olmasından ileri geliyor.',
            rootCause: 'Tasarım kalıbının İtalyan dar kesim olmasına karşın PDP beden tablosunda standart global ölçülerin yayınlanması.',
            estimatedMonthlyLoss: 26800.0,
            evidenceQuote: 'Omuzlar aşırı dar ve kalıp tamamen yanıltıcı. Kollarımı kaldıramadım.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Dinamik Beden Asistanı & "Kalıp 1 Beden Dardır" Akıllı Rozeti',
            problemStatement: 'Müşteriler standart bedenlerini seçip %22.8 iade oranı ve aylık $26.8k marj sızıntısı oluşturuyor.',
            hypothesis: 'Beden seçici üzerinde belirgin "Kalıbımız Dar Kesimdir - Müşterilerin %84ü 1 Beden Büyük Öneriyor" uyarısı eklenmesi iadeleri %38 azaltacaktır.',
            expectedMetricImpact: '-%8.6 İade Oranı, +$19,400/Ay Kurtarılan Marj',
            status: 'VALIDATED',
            testType: 'PDP Beden Asistanı & Uyarı Rozeti',
            gherkinSpec: 'Feature: Akıllı Beden Kılavuzu\n  Scenario: Kullanıcı standart bedenini seçtiğinde\n    Given Kullanıcı Blazer ürün detay sayfasındadır\n    When Beden seçiciden "M" seçtiğinde\n    Then "İtalyan dar kalıp: Rahat kullanım için L beden önerilir" uyarısı açılır\n    And Tek tıkla doğru beden sepete eklenir.',
          },
        ],
      },
    },
  });

  // 3. Beauty & Skincare: Botanical Barrier Repair Peptide Night Serum
  const serum = await prisma.product.create({
    data: {
      name: 'Botanical Barrier Repair Peptide Night Serum (30ml, Air-Free Pipette)',
      sku: 'BEAU-SRM-BTR-30',
      category: 'Beauty & Skincare',
      price: 48.0,
      cost: 12.0,
      monthlySales: 3100,
      returnRate: 8.5,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
      description: 'Triple-ceramide and copper-peptide restorative night serum designed for sensitive, compromised skin barriers.',
      reviews: {
        create: [
          {
            rating: 1,
            title: 'Cam damlalık kargoda çatlamış ve serum zarfa akmıştı',
            comment: 'Paketi açtığımda cam damlalığın boynu kırılmıştı ve serumun yarısı baloncuklu zarfın içine sızmıştı. Tehlikeli ambalajlama, cam kırıklarıyla dolu geldi.',
            channel: 'Amazon TR',
            aspect: 'shipping',
            sentiment: 'negative',
            sentimentScore: -0.95,
            verifiedPurchase: true,
            customerName: 'Sophie L. (Cilt Bakım Sever)',
          },
          {
            rating: 5,
            title: 'Hassas cildimi 1 haftada toparladı, koku ve yapısı mükemmel',
            comment: 'Kızarıklıklarımı tamamen yatıştırdı. Asla yapışkanlık hissi bırakmıyor. Düzenli sipariş vereceğim.',
            channel: 'Shopify Store',
            aspect: 'formula',
            sentiment: 'positive',
            sentimentScore: 0.98,
            verifiedPurchase: true,
            customerName: 'Zeynep A.',
          },
          {
            rating: 2,
            title: 'Damlalık kapağı hava sızdırıyor, ürün çabuk oksitlendi',
            comment: 'Şişe kapağı tam sıkılmıyor, yan yatınca sızdırıyor. 2 haftada serumun rengi sarardı.',
            channel: 'Trendyol',
            aspect: 'durability',
            sentiment: 'negative',
            sentimentScore: -0.68,
            verifiedPurchase: true,
            customerName: 'Melis T.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Kargoda kırık cam damlalık ve sıvı sızıntısı', orderValue: 48.0, returnCost: 11.0, customerNote: 'Zarfın içine dökülmüş halde geldi.' },
          { reason: 'Kapak sızdırmazlık arızası', orderValue: 48.0, returnCost: 11.0, customerNote: 'Damlalık vidalama kısmından kaçırıyor.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Kırılgan Cam Damlalık Boyun Mukavemeti & Kargo Titreşim Sızıntısı',
            severity: 'MEDIUM',
            affectedAspect: 'shipping',
            summary: 'Kozmetik iadelerinin %71i formülden değil, kargo taşımacılığındaki cam damlalık kırılmasından kaynaklanıyor.',
            rootCause: 'Şişe kargo kutusunda iç koruyucu sünger yuva olmaması ve damlalık kauçuk başlığının sarsıntıda gevşemesi.',
            estimatedMonthlyLoss: 14200.0,
            evidenceQuote: 'Paketi açtığımda damlalık kırılmıştı, serum zarfa akmıştı.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Havasız Pompalı (Airless Pump) Şişeye Geçiş ve Darbe Korumalı Kutu',
            problemStatement: 'Damlalık kırılması ve sızıntı sebebiyle aylık 260+ adet ürün iade/çöp oluyor ($14.2k aylık zarar).',
            hypothesis: 'Geleneksel cam damlalık yerine hava geçirmez basmalı pompa (Airless Pump) ambalajına geçmek kargo hasarlarını %92 oranında ortadan kaldıracaktır.',
            expectedMetricImpact: '-%6.1 İade Oranı, +$12,800/Ay Kurtarılan Sermaye',
            status: 'VALIDATED',
            testType: 'Ambalaj Revizyonu / Airless Pump',
            gherkinSpec: 'Feature: Ambalaj Sızdırmazlık & Darbe Dayanıklılığı\n  Scenario: 1.5 metre kargo düşme simülasyonu\n    Given Ürün Airless Pump şişesinde paketlendiğinde\n    When 1.5 metreden serbest düşme testine tabi tutulduğunda\n    Then Sıfır çatlak ve sıfır sıvı sızıntısı elde edilir.',
          },
        ],
      },
    },
  });

  // 4. Home & Kitchen: BaristaCraft Precision Dual-Boiler Espresso Machine
  const espresso = await prisma.product.create({
    data: {
      name: 'BaristaCraft Precision Dual-Boiler Smart Espresso Machine (15 Bar, PID Temp)',
      sku: 'HOME-ESP-BC-900',
      category: 'Home & Kitchen',
      price: 590.0,
      cost: 280.0,
      monthlySales: 390,
      returnRate: 12.1,
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
      description: 'Italian commercial-grade rotary pump, independent dual boilers for simultaneous brewing and steaming, with precision digital PID temperature control.',
      reviews: {
        create: [
          {
            rating: 2,
            title: '15 bar basınçta portafiltre kenarından sıcak kahve damlatıyor',
            comment: 'Makinenin ısıtma hızı harika ama portafiltreyi ne kadar sıksam da basınç yükselince kenardan kahve sızıyor. Silikon conta tam oturmuyor gibi. İade ettim.',
            channel: 'Amazon Global',
            aspect: 'durability',
            sentiment: 'negative',
            sentimentScore: -0.84,
            verifiedPurchase: true,
            customerName: 'Marco V. (Kahve Tutkunu)',
          },
          {
            rating: 5,
            title: 'Kafe kalitesinde espresso ve kusursuz süt kreması',
            comment: 'Dual boiler sayesinde espresso akarken aynı anda süt köpürtebiliyorum. Basınç göstergesi çok hassas ve tutarlı.',
            channel: 'Shopify Store',
            aspect: 'quality',
            sentiment: 'positive',
            sentimentScore: 0.94,
            verifiedPurchase: true,
            customerName: 'David K.',
          },
          {
            rating: 2,
            title: 'Kullanım kılavuzu çok karmaşık, ilk kurulumda su pompası hava yaptı',
            comment: 'Kutudan çıkan kılavuzda kazan ilk dolum talimatı net yazılmamış. Pompa ses yaptı ama su çekmedi. Müşteri hizmetlerini aramak zorunda kaldım.',
            channel: 'Trendyol',
            aspect: 'usability',
            sentiment: 'negative',
            sentimentScore: -0.65,
            verifiedPurchase: true,
            customerName: 'Ahmet T.',
          },
        ],
      },
      returns: {
        create: [
          { reason: 'Portafiltre conta sızıntısı ve basınç kaybı', orderValue: 590.0, returnCost: 35.0, customerNote: 'Kahve yaparken kenarlardan sıcak su fışkırıyor.' },
          { reason: 'İlk kurulum karmaşası / su pompalamama', orderValue: 590.0, returnCost: 35.0, customerNote: 'Kullanımı çok karmaşık geldi.' },
        ],
      },
      insights: {
        create: [
          {
            defectType: 'Grup Başlığı Silikon Conta Toleransı & Yüksek Basınç Sızıntısı',
            severity: 'HIGH',
            affectedAspect: 'durability',
            summary: 'İadelerin %58i portafiltre sıkma açısının kullanıcılar tarafından tam kavranamaması ve contanın basınç kaçırmasından kaynaklanıyor.',
            rootCause: 'Fabrika montajında 58mm grup başlığı contasının sert kauçuktan yapılması ve kilitlenme açısının sert olması.',
            estimatedMonthlyLoss: 18600.0,
            evidenceQuote: 'Portafiltreyi ne kadar sıksam da kenardan sıcak su sızıyor.',
            status: 'OPEN',
          },
        ],
      },
      hypotheses: {
        create: [
          {
            title: 'Gıda Uyumlu Yumuşak Silikon Conta Değişimi & Kutu Kapağında 1 Dakikalık Kurulum Kılavuzu',
            problemStatement: 'Kullanıcılar conta sızıntısını cihaz arızası zannedip $590lık ürünü iade ediyor (%12.1 iade oranı).',
            hypothesis: 'Kutu içerisine yüksek esneklikte yedek silikon conta eklemek ve kutu kapağına "Portafiltre Kilit Açısı Kılavuzu" basmak iadeleri %35 azaltacaktır.',
            expectedMetricImpact: '-%4.2 İade Oranı, +$13,500/Ay Kurtarılan Kâr',
            status: 'TESTING',
            testType: 'Kutu İçi Onboarding & Conta İyileştirmesi',
            gherkinSpec: 'Feature: Espresso Makinesi İlk Kurulum Rehberi\n  Scenario: Kullanıcı kutuyu açar\n    Given Makine kutusundan çıkarıldığında\n    When Kutu kapağındaki "1 Dakikalık Hızlı Kurulum & Conta Oturtma" şeması incelendiğinde\n    Then Kullanıcı grup başlığını doğru açıyla kilitler ve sıfır sızıntı ile kahve demler.',
          },
        ],
      },
    },
  });

  console.log('Successfully seeded multi-category (Consumer Electronics, Fashion, Beauty, Home) database!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
