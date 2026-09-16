export type AspectCategory =
  | 'thermals'     // Isınma, Fan Sesi, Throttling
  | 'display'      // Işık Sızması, Ölü Piksel, Ghosting, Hz
  | 'build'        // Kasa Kalitesi, Menteşe, Tuş Takımı, Esneme
  | 'software'     // BIOS, MUX Switch, Sürücü, Control Center
  | 'power'        // Batarya, Adaptör, Şarj
  | 'service'      // Garanti, Teknik Servis, Ömür Boyu Bakım
  | 'fit'          // Tekstil / Boyut / Ergonomi
  | 'quality'      // Genel Malzeme & Dayanıklılık
  | 'shipping'     // Kargo & Kutu Hasarı
  | 'price'        // Fiyat / Performans
  | 'usability'    // Kurulum & Kullanım Kolaylığı
  | 'general';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface AspectSentiment {
  aspect: AspectCategory;
  sentiment: SentimentType;
  score: number;
  confidence: number;
  extractedPhrase: string;
}

export interface ReviewAnalysisResult {
  sentiment: SentimentType;
  sentimentScore: number;
  aspects: AspectSentiment[];
  primaryDefect?: string;
  isUrgentReturnRisk: boolean;
}

export interface GeneratedHypothesis {
  title: string;
  problemStatement: string;
  hypothesis: string;
  expectedMetricImpact: string;
  testType: string;
  gherkinSpec: string;
}

export interface PersonaChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
