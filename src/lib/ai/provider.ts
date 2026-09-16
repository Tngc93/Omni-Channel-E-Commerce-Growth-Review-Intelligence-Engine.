import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { MockAiEngine } from './mock-engine';

export function getAiProvider() {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (geminiKey && geminiKey.trim().length > 5) {
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    return { type: 'gemini' as const, client: ai };
  }

  if (openaiKey && openaiKey.trim().length > 5) {
    const ai = new OpenAI({ apiKey: openaiKey });
    return { type: 'openai' as const, client: ai };
  }

  return { type: 'mock' as const, client: MockAiEngine };
}
