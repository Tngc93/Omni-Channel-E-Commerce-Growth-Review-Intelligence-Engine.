import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { MockAiEngine } from '@/lib/ai/mock-engine';

export async function POST(req: Request) {
  try {
    const { url, limit = 10, targetProduct } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Geçerli bir ürün URL\'si giriniz.' }, { status: 400 });
    }

    let channel = 'Web Marketplace';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('amazon')) channel = 'Amazon Global';
    else if (lowerUrl.includes('trendyol')) channel = 'Trendyol';
    else if (lowerUrl.includes('hepsiburada')) channel = 'Hepsiburada';
    else if (lowerUrl.includes('shopify') || lowerUrl.includes('myshopify')) channel = 'Shopify Direct';

    // Find or pick a target product to associate with
    let product = await prisma.product.findFirst({
      where: targetProduct ? { name: { contains: targetProduct } } : undefined,
    });

    if (!product) {
      product = await prisma.product.findFirst();
    }

    if (!product) {
      return NextResponse.json({ error: 'Sistemde kayıtlı ürün bulunamadı.' }, { status: 404 });
    }

    // Generate context-aware scraped reviews based on product category
    const category = product.category.toLowerCase();
    const scrapedSamples: Array<{ comment: string; rating: number }> = [];

    if (category.includes('tech') || category.includes('laptop')) {
      scrapedSamples.push(
        { comment: 'Ağır render işlerinde fanlar 56 dB ile aşırı ses yapıyor, 94 derece sıcaklık gördüm.', rating: 2 },
        { comment: 'Ekran renkleri ve OLED panel muhteşem fakat adaptör taşıyamayacak kadar ağır.', rating: 3 },
        { comment: 'Oyun performansı ve FPS değerleri harika! Ömür boyu bakım desteği çok iyi.', rating: 5 },
        { comment: 'Control Center yazılımı çöküyor ve MUX switch geçişinde takılıyor.', rating: 2 },
        { comment: 'Klavye tuş basım hissi ve malzeme kalitesi gayet sağlam.', rating: 4 }
      );
    } else if (category.includes('fashion') || category.includes('blazer')) {
      scrapedSamples.push(
        { comment: 'Kumaşı %100 merino yün ve çok kaliteli ama omuzları inanılmaz dar kalıp.', rating: 2 },
        { comment: 'Beden tablosu yanıltıcı, 1 beden büyük sipariş etmek gerekiyor. İade ettim.', rating: 1 },
        { comment: 'Dökümü harika, valizden çıkarıp kırışıksız giyebildim. Çok şık.', rating: 5 },
        { comment: 'Koltuk altı dikimi sıkıyor, kolları kaldırmak zor.', rating: 2 }
      );
    } else if (category.includes('beauty') || category.includes('serum')) {
      scrapedSamples.push(
        { comment: 'Kargo paketinde cam damlalık kırılmış ve kutunun içine dökülmüştü.', rating: 1 },
        { comment: 'Ciltte yapışkanlık bırakmıyor ve 1 haftada kızarıklıkları yatıştırdı, harika.', rating: 5 },
        { comment: 'Cam şişe kapağı sızdırıyor, seyahatte çantaya aktı.', rating: 2 }
      );
    } else {
      scrapedSamples.push(
        { comment: '15 bar basınç altında portafiltre contası kenardan su sızdırıyor.', rating: 2 },
        { comment: 'Çift boyler sıcaklık dengesi çok iyi, harika espresso kreması veriyor.', rating: 5 },
        { comment: 'Buhar çubuğu gücü çok yüksek, süt köpürtme performansı şahane.', rating: 5 }
      );
    }

    const reviewsToInsert = scrapedSamples.slice(0, Number(limit) || 10);
    const createdReviews = [];

    for (const item of reviewsToInsert) {
      const analysis = MockAiEngine.analyzeReview(item.comment, item.rating);
      const topAspect = analysis.aspects[0]?.aspect || 'quality';

      const rev = await prisma.review.create({
        data: {
          productId: product.id,
          channel,
          rating: item.rating,
          comment: item.comment,
          sentiment: analysis.sentiment.toUpperCase(),
          sentimentScore: analysis.sentimentScore,
          aspect: topAspect,
        },
      });
      createdReviews.push(rev);
    }

    return NextResponse.json({
      success: true,
      channel,
      scrapedCount: createdReviews.length,
      associatedProduct: product.name,
      sampleReview: createdReviews[0]?.comment,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
