export interface CompetitorComparison {
  sectorId: string;
  sectorName: string;
  ourProduct: {
    name: string;
    brand: string;
    price: number;
    rating: number;
    reviewCount: number;
    returnRate: number;
  };
  competitorProduct: {
    name: string;
    brand: string;
    price: number;
    rating: number;
    reviewCount: number;
    returnRate: number;
  };
  radarMetrics: Array<{
    aspect: string;
    ourScore: number;
    competitorScore: number;
  }>;
  moats: Array<{
    title: string;
    description: string;
    advantagePct: number;
    actionHook: string;
  }>;
  blindspots: Array<{
    title: string;
    description: string;
    deficitPct: number;
    remediationAction: string;
  }>;
  aiExecutiveSummary: string;
}

export const COMPETITOR_BENCHMARKS: Record<string, CompetitorComparison> = {
  tech: {
    sectorId: 'tech',
    sectorName: 'Consumer Electronics',
    ourProduct: {
      name: 'Sony WH-1000XM5 Gürültü Engelleyici Kulaklık',
      brand: 'Sony (Portföy Ürünü)',
      price: 420,
      rating: 4.4,
      reviewCount: 1850,
      returnRate: 14.6,
    },
    competitorProduct: {
      name: 'Apple AirPods Max (Uzay Grisi)',
      brand: 'Apple (Pazar Lideri Rakip)',
      price: 549,
      rating: 4.7,
      reviewCount: 3200,
      returnRate: 6.8,
    },
    radarMetrics: [
      { aspect: 'Ağırlık & Uzun Süreli Taşıma (250g)', ourScore: 98, competitorScore: 68 },
      { aspect: 'Pil Ömrü (30 Saat vs 20 Saat)', ourScore: 96, competitorScore: 72 },
      { aspect: 'LDAC Hi-Res Ses Sahnesi', ourScore: 95, competitorScore: 86 },
      { aspect: 'Sabit ANC İstikrarı', ourScore: 56, competitorScore: 98 },
      { aspect: 'Geniş Kafa Bandı Konforu', ourScore: 60, competitorScore: 94 },
      { aspect: 'Malzeme Hissi & Alüminyum Gövde', ourScore: 78, competitorScore: 96 },
    ],
    moats: [
      {
        title: 'Tüy Gibi Hafiflik (250g) & 30 Saat Kesintisiz Pil',
        description: 'Apple AirPods Max 385 gramlık metal gövdesiyle boyun yorarken, Sony XM5 250 gram ağırlığı ve 30 saat piliyle uzun uçuşların tartışmasız galibi.',
        advantagePct: 35,
        actionHook: 'Amazon sponsorlu reklamlarda: "135 Gram Daha Hafif, 10 Saat Daha Uzun Pil" başlığını kullanın.',
      },
      {
        title: 'LDAC ve Android / Windows Çoklu Cihaz Özgürlüğü',
        description: 'Apple ekosistemine kilitli AAC yerine Sony, Android ve PC kullanıcılarına kayıpsız 990kbps LDAC yüksek çözünürlük sunuyor.',
        advantagePct: 28,
        actionHook: 'PDP sayfasına "Ekosistem Bağımsız: Android, iOS ve Windows ile Kusursuz 2 Cihaz Bağlantısı" rozeti ekleyin.',
      },
    ],
    blindspots: [
      {
        title: 'Auto NC Optimizer Adaptasyon Kararsızlığı',
        description: "Apple sabit ve öngörülebilir gürültü engelleme sağlarken, Sony'nin otomatik algoritması baş hareketlerinde ANC seviyesini aniden düşürerek iadelere yol açıyor.",
        deficitPct: 42,
        remediationAction: 'Sony Headphones Connect uygulamasına sabit ANC kilitleme seçeneği getiren OTA duyurusu ve PDP video rehberi ekleyin.',
      },
      {
        title: 'Dar Kafa Bandı Tepe Baskısı',
        description: "AirPods Max geniş file taç bandıyla ağırlığı dağıtırken, XM5'in ince suni deri bandı 2 saat sonra kafatasında baskı hissi yapıyor.",
        deficitPct: 36,
        remediationAction: 'Kutuya veya PDP paketine ergonomik hafızalı sünger kafa bandı pedi ekleyin.',
      },
    ],
    aiExecutiveSummary: "Sony WH-1000XM5; pil süresi, hafiflik ve LDAC ses kodeğinde Apple AirPods Max'e karşı net bir maliyet ve konfor avantajına sahip. İadelerin tek kök nedeni Auto NC Optimizer'ın ortamda seviye dalgalanması yapmasıdır. Müşteriye sabit ANC kullanım rehberi sunulduğunda iade oranı hızla tek haneye inecektir.",
  },

  fashion: {
    sectorId: 'fashion',
    sectorName: 'Fashion & Apparel',
    ourProduct: {
      name: "Levi's 511 Slim Fit Esnek Denim Jean",
      brand: "Levi's (Portföy Ürünü)",
      price: 58,
      rating: 4.3,
      reviewCount: 3800,
      returnRate: 21.4,
    },
    competitorProduct: {
      name: 'Zara Man Slim Fit Stretch Denim',
      brand: 'Zara (Hızlı Moda Lideri)',
      price: 49,
      rating: 4.6,
      reviewCount: 2200,
      returnRate: 14.2,
    },
    radarMetrics: [
      { aspect: 'Kumaş Dayanımı & Ağ Mukavemeti', ourScore: 96, competitorScore: 68 },
      { aspect: 'İkonik Arka Cep Dikişi & Prestij', ourScore: 98, competitorScore: 70 },
      { aspect: 'Elastan Esnekliği', ourScore: 92, competitorScore: 88 },
      { aspect: 'Partiler Arası Kalıp Tutarlılığı', ourScore: 50, competitorScore: 91 },
      { aspect: 'Beden Tablosu Bel Doğruluğu', ourScore: 55, competitorScore: 93 },
      { aspect: 'Yıkama Sonrası Boy Sabitliği', ourScore: 75, competitorScore: 85 },
    ],
    moats: [
      {
        title: 'Efsanevi Denim Mukavemeti & 150 Yıllık Kalite Mirası',
        description: "Zara jeanler 6 ayda ağ kısmından aşınırken, Levi's 511 ağır pamuk/elastan harmanıyla yıllarca formunu koruyor.",
        advantagePct: 29,
        actionHook: 'Pazaryeri başlıklarında: "Orijinal Kalite: Asla Sarkma ve Ağ Aşınması Yapmaz" güvencesini öne çıkarın.',
      },
    ],
    blindspots: [
      {
        title: 'Menşei Ülke Kaynaklı Bel Kalıbı Sapması',
        description: "Zara tek merkezden kalıp kontrolü yaparken, Levi's Mısır ve Pakistan fabrikaları arasında bel ölçüsünde 2.5cm sapma müşterilerde iade patlaması yaratıyor.",
        deficitPct: 43,
        remediationAction: 'Beden seçiciye "Bu model koyu yıkama gereği yarım beden dar kalıptır, mezura ölçünüze göre 1 beden büyük önerilir" uyarısı ekleyin.',
      },
    ],
    aiExecutiveSummary: "Kumaş ömrü ve denim prestijinde Zara'nın çok önündeyiz. Ancak giyim iadelerimizin %82'si bel darlığından kaynaklanıyor. PDP beden asistanı widget'ı ile iadeler %36 oranında düşürülecektir.",
  },

  beauty: {
    sectorId: 'beauty',
    sectorName: 'Beauty & Skincare',
    ourProduct: {
      name: 'The Ordinary Niacinamide 10% + Zinc 1%',
      brand: 'The Ordinary (Portföy Ürünü)',
      price: 16,
      rating: 4.5,
      reviewCount: 5200,
      returnRate: 9.8,
    },
    competitorProduct: {
      name: "Paula's Choice 10% Niacinamide Booster",
      brand: "Paula's Choice (Premium Benchmark)",
      price: 48,
      rating: 4.8,
      reviewCount: 3100,
      returnRate: 4.2,
    },
    radarMetrics: [
      { aspect: 'Fiyat / Aktif Madde Oranı', ourScore: 99, competitorScore: 45 },
      { aspect: 'Sebum & Gözenek Sıkılaştırma', ourScore: 94, competitorScore: 96 },
      { aspect: 'Formül Saflığı & Vegan', ourScore: 96, competitorScore: 92 },
      { aspect: 'Kargo Kapak Sızdırmazlığı', ourScore: 52, competitorScore: 95 },
      { aspect: 'Makyaj Altında Sıfır Pilling', ourScore: 54, competitorScore: 94 },
      { aspect: 'Hassas Cilt Alışma Kılavuzu', ourScore: 60, competitorScore: 92 },
    ],
    moats: [
      {
        title: 'Rakipsiz Fiyat / Performans ($16 vs $48)',
        description: 'Aynı oranda %10 Niacinamide ve %1 Çinko formülasyonunu 3 kat daha uygun fiyata sunarak kitlesel pazar payına hakimiz.',
        advantagePct: 67,
        actionHook: 'Sosyal medya kampanyasında: "Aynı aktif konsantrasyon, 3 kat akıllı fiyat" temalı tüketici testi yayınlayın.',
      },
    ],
    blindspots: [
      {
        title: 'Damlalık Diş Sıyırması & Makyaj Altında Pilling',
        description: "Paula's Choice akışkan damlatıcı kapağıyla sıfır pilling sağlarken, The Ordinary fazla sürüldüğünde ciltte silgi tozu gibi topaklanıyor.",
        deficitPct: 41,
        remediationAction: 'Kutu kapağına "2 Damla & 90 Saniye Kuruma" piktogramı koyun ve kilitli conta ambalajına geçin.',
      },
    ],
    aiExecutiveSummary: 'Fiyat/performans oranında dünya lideriyiz. İadelerimizin neredeyse tamamı kargoda diş sıyıran damlalık sızıntısından ve yanlış kullanımdan kaynaklanan pilling sorunundan ileri geliyor. Basit bir ambalaj ve etiketleme güncellemesi ile kargo kaybı sıfırlanabilir.',
  },

  home: {
    sectorId: 'home',
    sectorName: 'Home & Kitchen',
    ourProduct: {
      name: 'Philips HD9880/90 Airfryer Combi XXL',
      brand: 'Philips (Portföy Ürünü)',
      price: 340,
      rating: 4.4,
      reviewCount: 2200,
      returnRate: 15.8,
    },
    competitorProduct: {
      name: 'Cosori Dual Blaze 6.4L Smart Airfryer',
      brand: 'Cosori (Pazar Lideri Rakip)',
      price: 249,
      rating: 4.7,
      reviewCount: 6500,
      returnRate: 7.9,
    },
    radarMetrics: [
      { aspect: 'Hazne Kapasitesi (8.3L vs 6.4L)', ourScore: 98, competitorScore: 78 },
      { aspect: 'Entegre Et Termometresi (Prob)', ourScore: 99, competitorScore: 30 },
      { aspect: 'Rapid CombiAir Hava Akışı', ourScore: 96, competitorScore: 84 },
      { aspect: 'Wi-Fi 2.4GHz Eşleşme Kararlılığı', ourScore: 48, competitorScore: 94 },
      { aspect: 'Sepet Ray Mekanizması Kayganlığı', ourScore: 55, competitorScore: 92 },
      { aspect: 'Fiyat / Hacim Dengesi', ourScore: 78, competitorScore: 92 },
    ],
    moats: [
      {
        title: 'Devasa 8.3L Hazne & Entegre Pişirme Probu',
        description: "Cosori'de prob bulunmazken Philips, etin iç ısısını ölçüp tam kıvamında pişince otomatik kapanan profesyonel şef teknolojisi sunuyor.",
        advantagePct: 45,
        actionHook: 'Hepsiburada vitrininde: "Tahmine Son: Entegre Et Probu ile İçi Sulu, Dışı Çıtır Kusursuz Pişirme" vurgusunu öne çıkarın.',
      },
    ],
    blindspots: [
      {
        title: 'NutriU 2.4GHz Wi-Fi Eşleşme Kopmaları',
        description: 'Cosori tek tıkla mesh modemlere bağlanırken, Philips NutriU uygulaması 5GHz modemlerde eşleşme zaman aşımına uğruyor.',
        deficitPct: 46,
        remediationAction: 'Kutu kapağına "Modeminiz 5GHz mi? 60 Saniyede Kolay Wi-Fi Eşleşme Rehberi" QR etiketi ekleyin.',
      },
    ],
    aiExecutiveSummary: "Kapasite ve pişirme kalitesinde sınıfının en iyisiyiz. İadelerimizin %68'i Wi-Fi frekans eşleşmesini yapamayan kullanıcıların ürünü arızalı zannetmesinden ileri geliyor. Hızlı başlangıç QR kılavuzu ile iadeler $28,800 kurtarabilir.",
  },
};
