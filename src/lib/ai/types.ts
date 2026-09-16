export type AspectCategory =
  | 'fit'
  | 'quality'
  | 'shipping'
  | 'price'
  | 'usability'
  | 'service'
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
