import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { analyzeReviewWithAi } from '@/lib/ai/analyzer';

export async function POST(req: Request) {
  try {
    const { productName, channel, rating, comment } = await req.json();

    let product = await prisma.product.findFirst({
      where: { name: { contains: productName } },
    });

    if (!product) {
      product = await prisma.product.findFirst();
    }

    if (!product) {
      return NextResponse.json({ error: 'No product found' }, { status: 404 });
    }

    const aiResult = await analyzeReviewWithAi(comment, rating, product.name);
    const primaryAspect = aiResult.aspects[0]?.aspect || 'general';

    const review = await prisma.review.create({
      data: {
        productId: product.id,
        rating: Number(rating),
        channel: channel || 'Shopify',
        comment,
        aspect: primaryAspect,
        sentiment: aiResult.sentiment,
        sentimentScore: aiResult.sentimentScore,
        customerName: 'Live Test Customer',
      },
    });

    return NextResponse.json({ success: true, review, aiResult });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
