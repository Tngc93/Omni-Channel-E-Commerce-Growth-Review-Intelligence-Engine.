import { NextResponse } from 'next/server';
import { chatWithCustomerPersona } from '@/lib/ai/persona-chat';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { z } from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1, 'Mesaj boş olamaz.').max(3000, 'Mesaj çok uzun.'),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1, 'En az 1 mesaj bulunmalıdır.').max(30, 'Mesaj geçmişi çok uzun.'),
  personaDescription: z.string().min(1, 'Persona tanımı gereklidir.').max(2000, 'Persona tanımı çok uzun.'),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'client';
    const rateCheck = checkRateLimit(`chat:${ip}`, 30, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Çok fazla sohbet isteği yapıldı. Lütfen biraz bekleyin.' },
        { status: 429 }
      );
    }

    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Geçersiz JSON içeriği.' }, { status: 400 });
    }

    const parseResult = ChatRequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Geçersiz sohbet formatı.' },
        { status: 400 }
      );
    }

    const { messages, personaDescription } = parseResult.data;
    const reply = await chatWithCustomerPersona(messages, personaDescription);
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('[AI CHAT API ERROR]:', err);
    return NextResponse.json(
      { error: 'Müşteri personası yanıt üretirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
