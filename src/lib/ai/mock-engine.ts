import { AspectCategory, ReviewAnalysisResult, GeneratedHypothesis } from './types';

export class MockAiEngine {
  static analyzeReview(comment: string, rating: number): ReviewAnalysisResult {
    const lower = comment.toLowerCase();
    
    // Default based on rating
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    let sentimentScore = 0.0;
    if (rating >= 4) {
      sentiment = 'positive';
      sentimentScore = 0.75 + (rating === 5 ? 0.2 : 0.0);
    } else if (rating <= 2) {
      sentiment = 'negative';
      sentimentScore = -0.7 - (rating === 1 ? 0.25 : 0.0);
    }

    const aspects: Array<{ aspect: AspectCategory; sentiment: 'positive' | 'neutral' | 'negative'; score: number; confidence: number; extractedPhrase: string }> = [];

    // Aspect detection rules
    if (lower.includes('size') || lower.includes('tight') || lower.includes('small') || lower.includes('large') || lower.includes('fit') || lower.includes('chest')) {
      const isNegative = lower.includes('tight') || lower.includes('small') || lower.includes('narrow') || lower.includes('off') || lower.includes('misleading');
      aspects.push({
        aspect: 'fit',
        sentiment: isNegative ? 'negative' : 'positive',
        score: isNegative ? -0.85 : 0.8,
        confidence: 0.95,
        extractedPhrase: 'fit and sizing evaluation',
      });
    }

    if (lower.includes('battery') || lower.includes('broken') || lower.includes('stitch') || lower.includes('shrank') || lower.includes('quality') || lower.includes('leaked')) {
      const isNegative = lower.includes('dies') || lower.includes('shattered') || lower.includes('broken') || lower.includes('shrank') || lower.includes('leaked');
      aspects.push({
        aspect: 'quality',
        sentiment: isNegative ? 'negative' : 'positive',
        score: isNegative ? -0.9 : 0.85,
        confidence: 0.92,
        extractedPhrase: 'quality and durability observation',
      });
    }

    if (lower.includes('shipping') || lower.includes('arrived') || lower.includes('package') || lower.includes('dropper') || lower.includes('box')) {
      aspects.push({
        aspect: 'shipping',
        sentiment: lower.includes('shattered') || lower.includes('damaged') ? 'negative' : 'neutral',
        score: lower.includes('shattered') ? -0.8 : 0.2,
        confidence: 0.88,
        extractedPhrase: 'packaging and transit condition',
      });
    }

    if (aspects.length === 0) {
      aspects.push({
        aspect: 'general',
        sentiment,
        score: sentimentScore,
        confidence: 0.75,
        extractedPhrase: 'general sentiment',
      });
    }

    return {
      sentiment,
      sentimentScore,
      aspects,
      primaryDefect: aspects.find(a => a.sentiment === 'negative')?.aspect,
      isUrgentReturnRisk: rating <= 2,
    };
  }

  static generateHypothesis(productName: string, topDefect: string, returnRate: number): GeneratedHypothesis {
    return {
      title: `AI-Guided PDP Optimizer for ${productName}`,
      problemStatement: `Elevated return rate of ${returnRate}% primarily triggered by chronic "${topDefect}" complaints on PDP.`,
      hypothesis: `Implementing targeted conversational sizing guidance and visual defect-prevention badges on the product detail page will reduce return volume by at least 25% without sacrificing checkout conversion.`,
      expectedMetricImpact: `-5.4% Return Rate, +$8,400 Retained Monthly Margin`,
      testType: 'A/B Test / PDP Copy & Sizing UI',
      gherkinSpec: `Feature: AI Size & Fit Defect Prevention\n  As an e-commerce customer\n  I want dynamic fit guidance on ${productName}\n  So that I purchase the correct size on first attempt.\n\n  Scenario: Customer visits PDP with history of sizing defects\n    Given the user selects a size\n    When the defect probability exceeds 30%\n    Then display the recommendation modal: "Customers with your measurements recommend sizing up."`,
    };
  }

  static simulatePersonaResponse(userMessage: string, customerContext: string): string {
    return `Look, as a customer who bought this: ${userMessage.toLowerCase().includes('size') ? 'The size chart on your page was completely misleading. I ordered my normal Medium and could not even raise my arms! If you want to fix this, put a bold banner saying "RUNS 1 SIZE SMALL" right next to the Add to Cart button, not buried in small print.' : 'I like the product design, but when the package arrived broken/damaged, customer support took 4 days to reply. We need clearer instructions and sturdier packaging.'}`;
  }
}
