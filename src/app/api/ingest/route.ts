import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { analyzeReviewWithAi } from '@/lib/ai/analyzer';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { z } from 'zod';

const IngestRequestSchema = z.object({
  productName: z.string().max(200).optional(),
  channel: z.string().max(100).optional().default('Shopify Direct'),
  rating: z.coerce.number().int().min(1, 'Puan 1 ile 5 arasında olmalıdır.').max(5, 'Puan 1 ile 5 arasında olmalıdır.'),
  comment: z.string().min(3, 'Yorum en az 3 karakter olmalıdır.').max(4000, 'Yorum metni en fazla 4000 karakter olabilir.'),
});

export async function POST(req: Request) {
  try {
    // Rate Limiting Protection (30 requests per minute)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'client';
    const rateCheck = checkRateLimit(`ingest:${ip}`, 30, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Çok fazla yorum gönderme isteği yapıldı. Lütfen biraz bekleyin.' },
        { status: 429 }
      );
    }

    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Geçersiz JSON içeriği.' }, { status: 400 });
    }

    const parseResult = IngestRequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Geçersiz form verisi.' },
        { status: 400 }
      );
    }

    const { productName, channel, rating, comment } = parseResult.data;

    let product = await prisma.product.findFirst({
      where: productName ? { name: { contains: productName } } : undefined,
    });

    if (!product) {
      product = await prisma.product.findFirst();
    }

    if (!product) {
      return NextResponse.json({ error: 'Sistemde kayıtlı ürün bulunamadı.' }, { status: 404 });
    }

    const aiResult = await analyzeReviewWithAi(comment, rating, product.name);
    const primaryAspect = aiResult.aspects[0]?.aspect || 'general';

    const review = await prisma.review.create({
      data: {
        productId: product.id,
        rating,
        channel: channel || 'Shopify Direct',
        comment,
        aspect: primaryAspect,
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        customerName: 'Doğrulanmış Müşteri',
      },
    });

    return NextResponse.json({ success: true, review, aiResult });
  } catch (err: any) {
    console.error('[INGEST API ERROR]:', err);
    return NextResponse.json(
      { error: 'Yorum kaydedilirken bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
