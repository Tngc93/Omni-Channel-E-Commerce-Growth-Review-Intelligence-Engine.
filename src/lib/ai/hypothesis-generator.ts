import { getAiProvider } from './provider';
import { MockAiEngine } from './mock-engine';
import { GeneratedHypothesis } from './types';

export async function generateGrowthHypothesis(
  productName: string,
  category: string,
  topDefects: string[],
  returnRate: number,
  recentNegativeReviews: string[]
): Promise<GeneratedHypothesis> {
  const provider = getAiProvider();

  if (provider.type === 'mock') {
    return MockAiEngine.generateHypothesis(productName, topDefects[0] || 'Quality defect', returnRate);
  }

  try {
    const prompt = `You are a Senior E-Commerce Product Manager and Growth Experimentation Lead.
Create a structured A/B Test and Product Improvement Hypothesis to resolve chronic customer complaints and cut return rates.

Product: ${productName} (Category: ${category})
Current Return Rate: ${returnRate}%
Top Chronic Complaints: ${topDefects.join(', ')}
Recent Customer Feedback Samples:
${recentNegativeReviews.slice(0, 4).map((r, i) => `${i + 1}. "${r}"`).join('\n')}

Return a valid JSON object ONLY with the following schema:
{
  "title": string,
  "problemStatement": string,
  "hypothesis": string,
  "expectedMetricImpact": string (e.g. "-22% Returns, +$12,000 monthly margin"),
  "testType": "PDP UX & Copy" | "Size Guide Overhaul" | "Packaging Redesign" | "Onboarding Flow",
  "gherkinSpec": string (A full Gherkin user story with Feature, Scenario, Given, When, Then)
}`;

    if (provider.type === 'gemini') {
      const res = await provider.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      return JSON.parse(res.text || '{}') as GeneratedHypothesis;
    }

    if (provider.type === 'openai') {
      const res = await provider.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });
      return JSON.parse(res.choices[0]?.message?.content || '{}') as GeneratedHypothesis;
    }
  } catch (err) {
    console.warn('Hypothesis AI failed, falling back to local generator:', err);
  }

  return MockAiEngine.generateHypothesis(productName, topDefects[0] || 'Fit calibration issue', returnRate);
}
