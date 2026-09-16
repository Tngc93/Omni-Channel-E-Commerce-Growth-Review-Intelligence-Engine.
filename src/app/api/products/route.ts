import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { z } from 'zod';

const ProductCreateSchema = z.object({
  name: z.string().min(2, 'Ürün adı en az 2 karakter olmalıdır.').max(200, 'Ürün adı en fazla 200 karakter olabilir.'),
  sku: z.string().max(100).optional(),
  category: z.string().max(100).optional().default('Consumer Electronics'),
  price: z.coerce.number().min(0, 'Fiyat 0 veya daha büyük olmalıdır.').max(1000000, 'Geçersiz fiyat.'),
  cost: z.coerce.number().min(0, 'Maliyet 0 veya daha büyük olmalıdır.').max(1000000, 'Geçersiz maliyet.').optional().default(0),
  description: z.string().max(2000).optional().default(''),
  imageUrl: z.string().max(1000).optional().default('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80'),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { insights: true, reviews: true, hypotheses: true },
      orderBy: { returnRate: 'desc' },
    });
    return NextResponse.json(products);
  } catch (err: any) {
    console.error('[PRODUCTS GET ERROR]:', err);
    return NextResponse.json({ error: 'Ürün listesi alınamadı.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'client';
    const rateCheck = checkRateLimit(`products:${ip}`, 30, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Çok fazla ürün ekleme isteği gönderildi. Lütfen bekleyin.' },
        { status: 429 }
      );
    }

    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Geçersiz JSON verisi.' }, { status: 400 });
    }

    const parseResult = ProductCreateSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Eksik veya hatalı ürün bilgisi.' },
        { status: 400 }
      );
    }

    const { name, sku, category, price, cost, description, imageUrl } = parseResult.data;
    const finalSku = sku?.trim() ? sku.trim() : `SKU-${Date.now().toString().slice(-6)}`;

    // Check for duplicate SKU to avoid DB unique constraint crash
    const existing = await prisma.product.findUnique({
      where: { sku: finalSku },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Bu SKU kodu (${finalSku}) zaten kullanımda. Lütfen farklı bir SKU giriniz.` },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku: finalSku,
        category,
        price,
        cost,
        description,
        imageUrl,
        monthlySales: 100,
        returnRate: 5.0,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error('[PRODUCTS POST ERROR]:', err);
    return NextResponse.json(
      { error: 'Ürün oluşturulurken bir sunucu hatası meydana geldi.' },
      { status: 500 }
    );
  }
}
