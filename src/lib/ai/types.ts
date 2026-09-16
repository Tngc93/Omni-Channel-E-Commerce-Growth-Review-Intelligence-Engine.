export type AspectCategory =
  | 'fit'          // Sizing, Cut, Shoulders, Taper
  | 'thermals'     // Heat, Fan Noise, Throttling
  | 'display'      // Screen, Panel Glow, Dead Pixels, Refresh Rate
  | 'formula'      // Skin reaction, Retinol, Scent, Texture
  | 'durability'   // Gasket, Portafilter, Hardware build, Wear
  | 'software'     // Drivers, BIOS, App crashes
  | 'power'        // Battery, Charger brick, Power delivery
  | 'shipping'     // Transit impact, Broken glass, Crushed box
  | 'quality'      // General craftsmanship & materials
  | 'price'        // Price-to-value ratio
  | 'usability'    // Manual, setup clarity, interface
  | 'service'      // Warranty, returns, support responsiveness
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
