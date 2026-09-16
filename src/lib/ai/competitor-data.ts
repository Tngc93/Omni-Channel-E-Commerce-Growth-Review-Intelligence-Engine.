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
      name: 'ApexPro 16" Creator Laptop',
      brand: 'ApexPro (Bizim Ürünümüz)',
      price: 2450,
      rating: 4.2,
      reviewCount: 420,
      returnRate: 18.2,
    },
    competitorProduct: {
      name: 'MacBook Pro 16" (M3 Max)',
      brand: 'Apple (Pazar Lideri Rakip)',
      price: 3499,
      rating: 4.8,
      reviewCount: 2800,
      returnRate: 6.4,
    },
    radarMetrics: [
      { aspect: 'GPU Render Hızı', ourScore: 96, competitorScore: 88 },
      { aspect: 'Yükseltilebilir RAM/SSD', ourScore: 98, competitorScore: 25 },
      { aspect: 'Ekran Renk Doğruluğu', ourScore: 94, competitorScore: 97 },
      { aspect: 'Fan Akustiği & Sessizlik', ourScore: 54, competitorScore: 96 },
      { aspect: 'Pil Dayanımı', ourScore: 62, competitorScore: 98 },
      { aspect: 'Klavye Yüzey Isısı', ourScore: 58, competitorScore: 92 },
    ],
    moats: [
      {
        title: 'Saf GPU Gücü & Render Başı Maliyet',
        description: 'Blender ve Unreal Engine testlerinde ApexPro 16, $1,050 daha ucuz olmasına rağmen %18 daha yüksek CUDA çıktısı veriyor.',
        advantagePct: 24,
        actionHook: 'Google & Meta reklamlarında: "$1,000 Daha Az Ödeyin, 2 Kat Hızlı Render Alın" kampanyası başlatın.',
      },
      {
        title: 'Modüler Bellek & Donanım Özgürlüğü',
        description: 'Apple anakartına lehimli çipler yerine 64GB DDR5 ve 4TB NVMe SSD yükseltme olanağı en büyük müşteri övgüsü alıyor.',
        advantagePct: 73,
        actionHook: 'PDP üzerine "Geleceğe Hazır: Kendi RAM ve SSD\'nizi İstediğiniz Zaman Yükseltin" rozeti yerleştirin.',
      },
    ],
    blindspots: [
      {
        title: '56dB Fan Gürültüsü & Termal Zafiyet',
        description: 'Rakip 32dB sessizlikte çalışırken, ApexPro ağır yükte fan sesi nedeniyle %18.2 iade oranına maruz kalıyor.',
        deficitPct: 42,
        remediationAction: 'Ar-Ge ekibi Control Center yazılımına "Akıllı Dinamik Sessiz Profil" eklemeli; PDP\'ye desibel kılavuzu konmalı.',
      },
      {
        title: 'Bataryada Ağır Yük Tüketimi',
        description: 'Prizden çekildiğinde performans düşüşü müşteriler tarafından şikayet konusu yapılıyor.',
        deficitPct: 36,
        remediationAction: 'Kutuya 100W hafif GaN seyahat adaptörü eklenmeli ve güç profili optimizasyonu yapılmalı.',
      },
    ],
    aiExecutiveSummary: 'ApexPro 16; saf işlem gücü, çoklu monitör desteği ve yükseltilebilir donanım boyutlarında Apple MacBook Pro\'ya karşı ezici bir fiyat/performans üstünlüğüne sahip. Ancak müşterilerin %18.2\'sinin ürünü geri göndermesinin tek kök nedeni termal akustik (fan gürültüsü). Bu zafiyet çözüldüğünde iade oranı doğrudan tek haneye düşürülebilir.',
  },

  fashion: {
    sectorId: 'fashion',
    sectorName: 'Fashion & Apparel',
    ourProduct: {
      name: 'Merino Wool Minimalist Tailored Blazer',
      brand: 'Sartorial Edge (Bizim Ürünümüz)',
      price: 380,
      rating: 4.1,
      reviewCount: 310,
      returnRate: 21.4,
    },
    competitorProduct: {
      name: 'Structured Wool Suit Jacket',
      brand: 'Massimo Dutti (Sektörel Benchmark)',
      price: 450,
      rating: 4.7,
      reviewCount: 1450,
      returnRate: 11.2,
    },
    radarMetrics: [
      { aspect: 'Kumaş Kalitesi (Merino)', ourScore: 98, competitorScore: 86 },
      { aspect: 'Doğal Döküm & Kırışmazlık', ourScore: 95, competitorScore: 82 },
      { aspect: 'Fiyat / Değer Oranı', ourScore: 90, competitorScore: 78 },
      { aspect: 'Beden Tablosu Doğruluğu', ourScore: 48, competitorScore: 92 },
      { aspect: 'Omuz / Koltukaltı Rahatlığı', ourScore: 52, competitorScore: 90 },
      { aspect: 'Kargo Kutu Sunumu', ourScore: 84, competitorScore: 88 },
    ],
    moats: [
      {
        title: '%100 Avustralya Merino Yünü Üstünlüğü',
        description: 'Rakip cekette sentetik poliester karışımı varken, ürünümüz saf nefes alabilir Merino yünüyle lüks segment hissi veriyor.',
        advantagePct: 16,
        actionHook: 'PDP ana görseline "100% Pure Virgin Merino Wool — Asla Karışım İçermez" kalite mührü ekleyin.',
      },
      {
        title: 'Kırışmaz Seyahat Özelliği',
        description: 'İş seyahatinde bavuldan çıkar çıkmaz giyilebilmesi en çok pozitif yorum alan özellik.',
        advantagePct: 22,
        actionHook: '"Valizden Doğrudan Toplantıya" temalı video reklam kampanyası hazırlayın.',
      },
    ],
    blindspots: [
      {
        title: 'İtalyan Dar Omuz Kesimi Uyuşmazlığı',
        description: 'Massimo Dutti standart kalıp sunarken, bizim cekette omuz genişliği 2cm dar ve beden tablosu bunu belirtmiyor.',
        deficitPct: 44,
        remediationAction: 'Beden tablosunu güncelleyin ve "Dar İtalyan kesimdir, rahat kullanım için 1 beden büyük sipariş ediniz" uyarısı ekleyin.',
      },
    ],
    aiExecutiveSummary: 'Kumaş ve malzeme kalitesinde açık ara öndeyiz. Müşteriler ceketin dokusuna hayran kalıyor ancak iade edenlerin %88\'i "omuzlarım içine sığmadı" diyor. Sadece beden rehberi ve beden tahmin widget\'ı eklenmesi aylık $21,800 kargo ve marj kaybını anında engelleyecektir.',
  },

  beauty: {
    sectorId: 'beauty',
    sectorName: 'Beauty & Skincare',
    ourProduct: {
      name: 'Barrier Repair Peptide Night Serum',
      brand: 'Lumina Derma (Bizim Ürünümüz)',
      price: 78,
      rating: 4.3,
      reviewCount: 520,
      returnRate: 15.6,
    },
    competitorProduct: {
      name: 'Buffet Multi-Peptide Serum',
      brand: 'The Ordinary (Küresel Lider)',
      price: 42,
      rating: 4.6,
      reviewCount: 9400,
      returnRate: 5.1,
    },
    radarMetrics: [
      { aspect: 'Peptit Konsantrasyonu', ourScore: 96, competitorScore: 84 },
      { aspect: 'Cilt Emilim Hızı', ourScore: 94, competitorScore: 78 },
      { aspect: 'Yapışkanlık Bırakmama', ourScore: 92, competitorScore: 68 },
      { aspect: 'Kargo Ambalaj Dayanımı', ourScore: 46, competitorScore: 95 },
      { aspect: 'Damlalık Sızdırmazlığı', ourScore: 50, competitorScore: 92 },
      { aspect: 'Hassas Cilt Uyumu', ourScore: 95, competitorScore: 85 },
    ],
    moats: [
      {
        title: 'İpeksi Doku & Sıfır Yapışkanlık',
        description: 'The Ordinary serumu ciltte yapışkan kalıntı bırakırken, ürünümüz 45 saniyede tamamen emilip kadifemsi his bırakıyor.',
        advantagePct: 24,
        actionHook: 'Sosyal medya için "Yapış yapış hisse son: 45 saniyede emilen saf peptit gücü" karşılaştırma videosu çekin.',
      },
    ],
    blindspots: [
      {
        title: 'Cam Damlalık Kırılması & Taşıma Hasarı',
        description: 'The Ordinary koruyucu karton kalıp kullanırken, bizim cam damlalık kargo esnasında çatlayıp sızdırıyor (%15.6 iade).',
        deficitPct: 49,
        remediationAction: 'Cam pipet yerine kırılmaz hava temassız pompalı şişeye (airless pump) geçin veya iç sünger kalıbını kalınlaştırın.',
      },
    ],
    aiExecutiveSummary: 'Formülasyon ve dermatolojik sonuçlarda pazar liderinden daha yüksek memnuniyet puanına sahibiz. Müşterilerin ürünü iade etmesinin tek sebebi kargo teslimatında yaşanan cam damlalık çatlamaları ve zarfa sızan serumdur. Ambalaj revizyonuyla iade oranı %3 seviyesine çekilebilir.',
  },

  home: {
    sectorId: 'home',
    sectorName: 'Home & Kitchen',
    ourProduct: {
      name: 'BaristaCraft Dual-Boiler Espresso Machine',
      brand: 'BaristaCraft (Bizim Ürünümüz)',
      price: 1650,
      rating: 4.2,
      reviewCount: 290,
      returnRate: 16.8,
    },
    competitorProduct: {
      name: 'Barista Touch Espresso Machine',
      brand: 'Breville (Sektörel Standart)',
      price: 1599,
      rating: 4.7,
      reviewCount: 3800,
      returnRate: 7.2,
    },
    radarMetrics: [
      { aspect: 'Çift Boyler Sıcaklık Dengesi', ourScore: 97, competitorScore: 85 },
      { aspect: 'Buhar Gücü (Süt Köpürtme)', ourScore: 95, competitorScore: 88 },
      { aspect: 'Gövde Malzeme (Paslanmaz Çelik)', ourScore: 96, competitorScore: 89 },
      { aspect: 'Portafiltre Conta Sızdırmazlığı', ourScore: 50, competitorScore: 94 },
      { aspect: 'Kullanım Kılavuzu & QR Video', ourScore: 58, competitorScore: 96 },
      { aspect: 'Isınma Süresi', ourScore: 90, competitorScore: 95 },
    ],
    moats: [
      {
        title: 'Gerçek Ticari Çift Boyler Mimarisi',
        description: 'Aynı anda hem espresso demleyip hem profesyonel güçte süt köpürtme imkanı kahve tutkunlarından tam puan alıyor.',
        advantagePct: 14,
        actionHook: 'Topluluk pazarlamasında "Tek boyler beklemesine son: Aynı anda demleme ve köpürtme" argümanını kullanın.',
      },
    ],
    blindspots: [
      {
        title: '15 Bar Basınç Altında Portafiltre Conta Kaçağı',
        description: 'Breville özel toleranslı silikon conta kullanırken, ürünümüzün fabrikasyon contası yanlış takıldığında su sızdırıyor.',
        deficitPct: 44,
        remediationAction: 'Kutuya ücretsiz yedek gıda uyumlu silikon conta ve contanın nasıl oturtulacağını gösteren Türkçe/İngilizce QR video ekleyin.',
      },
    ],
    aiExecutiveSummary: 'Teknik donanım, boyler kalitesi ve pompa gücünde ticari kahve makineleriyle yarışıyoruz. İadelerin %91\'i contanın doğru oturtulamamasından ve kenardan sıcak su sıçramasından kaynaklanıyor. Kutu içeriğine yedek conta ve kurulum videosu eklemek iadeleri bıçak gibi kesecektir.',
  },
};
