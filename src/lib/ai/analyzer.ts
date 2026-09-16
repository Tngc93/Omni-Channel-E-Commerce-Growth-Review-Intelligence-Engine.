import { getAiProvider } from './provider';
import { MockAiEngine } from './mock-engine';
import { ReviewAnalysisResult } from './types';

export async function analyzeReviewWithAi(
  comment: string,
  rating: number,
  productName?: string
): Promise<ReviewAnalysisResult> {
  const provider = getAiProvider();

  // If mock or keys not set, use Mock Engine
  if (provider.type === 'mock') {
    return MockAiEngine.analyzeReview(comment, rating);
  }

  try {
    const prompt = `You are an expert E-Commerce Customer Intelligence & QA Analyst.
Analyze the following e-commerce review for product "${productName || 'Product'}".
Review Rating: ${rating} / 5
Review Text: "${comment}"

Return a valid JSON object ONLY with the exact following schema:
{
  "sentiment": "positive" | "neutral" | "negative",
  "sentimentScore": number (float between -1.0 and 1.0),
  "aspects": [
    {
      "aspect": "fit" | "quality" | "shipping" | "price" | "usability" | "service" | "general",
      "sentiment": "positive" | "neutral" | "negative",
      "score": number (-1.0 to 1.0),
      "confidence": number (0.0 to 1.0),
      "extractedPhrase": string
    }
  ],
  "primaryDefect": string or null,
  "isUrgentReturnRisk": boolean
}`;

    if (provider.type === 'gemini') {
      const response = await provider.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      const text = response.text || '{}';
      return JSON.parse(text) as ReviewAnalysisResult;
    }

    if (provider.type === 'openai') {
      const response = await provider.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });
      const content = response.choices[0]?.message?.content || '{}';
      return JSON.parse(content) as ReviewAnalysisResult;
    }
  } catch (err) {
    console.warn('AI Provider failed, falling back to local heuristic engine:', err);
  }

  return MockAiEngine.analyzeReview(comment, rating);
}
