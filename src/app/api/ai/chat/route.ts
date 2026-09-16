import { NextResponse } from 'next/server';
import { chatWithCustomerPersona } from '@/lib/ai/persona-chat';

export async function POST(req: Request) {
  try {
    const { messages, personaDescription } = await req.json();
    const reply = await chatWithCustomerPersona(messages, personaDescription);
    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
