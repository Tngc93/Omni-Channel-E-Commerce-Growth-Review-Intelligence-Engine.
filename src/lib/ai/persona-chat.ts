import { getAiProvider } from './provider';
import { MockAiEngine } from './mock-engine';
import { PersonaChatMessage } from './types';

export async function chatWithCustomerPersona(
  messages: PersonaChatMessage[],
  personaDescription: string
): Promise<string> {
  const provider = getAiProvider();

  if (provider.type === 'mock') {
    const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content || '';
    return MockAiEngine.simulatePersonaResponse(lastUserMsg, personaDescription);
  }

  try {
    const systemPrompt = `You are roleplaying as an authentic, direct e-commerce customer.
Persona Profile:
${personaDescription}

You purchased this item, experienced issues, and are now chatting with the e-commerce Product Manager/Founder who wants your honest opinion on proposed fixes, size charts, or copy changes.
Be realistic, candid, constructive, and sound like a real shopper. Keep responses under 3 paragraphs.`;

    if (provider.type === 'gemini') {
      const formatted = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      const fullPrompt = `${systemPrompt}\n\nConversation History:\n${formatted}\n\nASSISTANT:`;
      const res = await provider.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
      });
      return res.text || 'Thank you for asking. I hope you improve this product.';
    }

    if (provider.type === 'openai') {
      const res = await provider.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      });
      return res.choices[0]?.message?.content || 'Thank you for following up.';
    }
  } catch (err) {
    console.warn('Persona chat failed, falling back to mock:', err);
  }

  const lastUserMsg = messages.filter((m) => m.role === 'user').pop()?.content || '';
  return MockAiEngine.simulatePersonaResponse(lastUserMsg, personaDescription);
}
