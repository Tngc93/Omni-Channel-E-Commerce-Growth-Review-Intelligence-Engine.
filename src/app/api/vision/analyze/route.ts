import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { VisionAiEngine } from '@/lib/ai/vision-engine';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { z } from 'zod';

const VisionAnalyzeSchema = z.object({
  imageUrl: z.string().min(5, 'Görsel URL veya Base64 verisi gereklidir.').max(500000, 'Görsel verisi çok büyük.'),
  productId: z.string().max(100).optional(),
  productName: z.string().max(200).optional(),
  reviewComment: z.string().max(2000).optional(),
  saveEvidence: z.boolean().optional().default(false),
});

const ClaimActionSchema = z.object({
  evidenceId: z.string().min(1, 'Evidence ID gereklidir.'),
  action: z.enum(['CARRIER_CLAIM', 'SUPPLIER_CHARGEBACK', 'PACKAGING_REV', 'RESOLVED']),
  note: z.string().max(500).optional(),
});

function isPrivateOrLoopbackHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === 'localhost' || lower === '127.0.0.1' || lower === '::1') return true;
  if (lower.startsWith('10.') || lower.startsWith('192.168.') || lower.startsWith('169.254.')) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(lower)) return true;
  return false;
}

// GET: Fetch visual evidence catalog, product anatomy, and liability stats
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          visualEvidences: {
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!product) {
        return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
      }

      const anatomy = VisionAiEngine.getDefectAnatomy(
        product.name,
        product.id,
        product.visualEvidences.map((e) => ({
          affectedPart: e.affectedPart,
          severity: e.severity as any,
          damageCategory: e.damageCategory,
          liability: e.liability as any,
          focusX: e.focusX,
          focusY: e.focusY,
        }))
      );

      return NextResponse.json({
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          category: product.category,
          imageUrl: product.imageUrl,
          price: product.price,
        },
        evidences: product.visualEvidences,
        anatomy,
      });
    }

    // Default: Return all visual evidences + product list + stats
    const [evidences, products] = await Promise.all([
      prisma.visualEvidence.findMany({
        include: {
          product: {
            select: { id: true, name: true, sku: true, category: true, imageUrl: true, price: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.findMany({
        select: { id: true, name: true, sku: true, category: true, imageUrl: true },
      }),
    ]);

    // Compute liability and severity breakdown
    const liabilityCounts: Record<string, number> = {
      SUPPLIER_FACTORY: 0,
      LOGISTICS_CARRIER: 0,
      PACKAGING_DESIGN: 0,
      CUSTOMER_MISUSE: 0,
    };

    const severityCounts: Record<string, number> = {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
    };

    evidences.forEach((ev) => {
      if (liabilityCounts[ev.liability] !== undefined) {
        liabilityCounts[ev.liability]++;
      }
      if (severityCounts[ev.severity] !== undefined) {
        severityCounts[ev.severity]++;
      }
    });

    const totalEvidences = evidences.length;

    return NextResponse.json({
      evidences,
      products,
      stats: {
        totalEvidences,
        liabilityCounts,
        severityCounts,
        supplierLiabilityPct: totalEvidences > 0 ? Math.round((liabilityCounts.SUPPLIER_FACTORY / totalEvidences) * 100) : 0,
        carrierLiabilityPct: totalEvidences > 0 ? Math.round((liabilityCounts.LOGISTICS_CARRIER / totalEvidences) * 100) : 0,
        packagingLiabilityPct: totalEvidences > 0 ? Math.round((liabilityCounts.PACKAGING_DESIGN / totalEvidences) * 100) : 0,
      },
    });
  } catch (error: any) {
    console.error('Vision API GET error:', error);
    return NextResponse.json({ error: 'Görsel veri analizi getirilemedi.' }, { status: 500 });
  }
}

// POST: Run multimodal visual defect inspection on an image
export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'client';
    const rateCheck = checkRateLimit(`vision:${ip}`, 30, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Çok fazla görsel analiz isteği gönderildi. Lütfen bir süre sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Geçersiz JSON içeriği.' }, { status: 400 });
    }

    const parseResult = VisionAnalyzeSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Geçersiz parametreler.' },
        { status: 400 }
      );
    }

    const { imageUrl, productId, productName, reviewComment, saveEvidence } = parseResult.data;

    // SSRF Check if HTTP(S) URL
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      try {
        const parsed = new URL(imageUrl);
        if (isPrivateOrLoopbackHost(parsed.hostname)) {
          return NextResponse.json({ error: 'Güvenlik kuralı ihlali: Yerel ağ adresleri taranamaz.' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Geçersiz görsel URL adresi.' }, { status: 400 });
      }
    }

    // Resolve product name if only productId is provided
    let resolvedProductName = productName;
    if (productId && !resolvedProductName) {
      const prod = await prisma.product.findUnique({
        where: { id: productId },
        select: { name: true },
      });
      if (prod) resolvedProductName = prod.name;
    }

    // Run Multimodal AI Vision Engine
    const analysis = await VisionAiEngine.analyzeImage({
      imageUrl,
      productName: resolvedProductName,
      reviewComment,
    });

    let savedEvidence = null;
    if (saveEvidence && productId) {
      try {
        savedEvidence = await prisma.visualEvidence.create({
          data: {
            productId,
            imageUrl,
            thumbnailUrl: imageUrl.length > 500 ? null : imageUrl,
            damageCategory: analysis.damageCategory,
            severity: analysis.severity,
            affectedPart: analysis.affectedPart,
            confidenceScore: analysis.confidenceScore,
            liability: analysis.liability,
            rootCause: analysis.rootCause,
            actionRequired: analysis.actionRequired,
            focusX: analysis.focusCoordinates.x,
            focusY: analysis.focusCoordinates.y,
          },
        });
      } catch (dbErr) {
        console.warn('Could not save VisualEvidence to DB:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      analysis,
      savedEvidence,
    });
  } catch (error: any) {
    console.error('Vision API POST error:', error);
    return NextResponse.json({ error: 'Görsel işlenirken bir hata oluştu.' }, { status: 500 });
  }
}

// PATCH: Process 1-click supplier chargeback / carrier claim actions
export async function PATCH(req: Request) {
  try {
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Geçersiz JSON içeriği.' }, { status: 400 });
    }

    const parseResult = ClaimActionSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Geçersiz parametreler.' },
        { status: 400 }
      );
    }

    const { evidenceId, action, note } = parseResult.data;

    const evidence = await prisma.visualEvidence.findUnique({
      where: { id: evidenceId },
      include: { product: true },
    });

    if (!evidence) {
      return NextResponse.json({ error: 'Kanıt kaydı bulunamadı.' }, { status: 404 });
    }

    let updatedActionText = evidence.actionRequired;
    const timestamp = new Date().toLocaleDateString('tr-TR');

    if (action === 'CARRIER_CLAIM') {
      updatedActionText = `[TAZMİNAT DOSYASI AÇILDI - ${timestamp}]: Lojistik firmasına hasar tazminat faturası ve görsel delil gönderildi. ${note || ''}`;
    } else if (action === 'SUPPLIER_CHARGEBACK') {
      updatedActionText = `[CHARGEBACK KESİNTİSİ YAPILDI - ${timestamp}]: Üretici fabrikaya kusurlu parça bedeli hakedişten mahsup edildi. ${note || ''}`;
    } else if (action === 'PACKAGING_REV') {
      updatedActionText = `[AR-GE / AMBALAJ REVİZYONU - ${timestamp}]: Kutu & sönümleme materyali revizyon emri verildi. ${note || ''}`;
    } else if (action === 'RESOLVED') {
      updatedActionText = `[TAMAMLANDI & ÇÖZÜLDÜ - ${timestamp}]: ${note || 'İşlem tamamlandı.'}`;
    }

    const updated = await prisma.visualEvidence.update({
      where: { id: evidenceId },
      data: {
        actionRequired: updatedActionText,
      },
    });

    return NextResponse.json({
      success: true,
      evidence: updated,
      message: 'Aksiyon başarıyla kaydedildi ve yürürlüğe alındı.',
    });
  } catch (error: any) {
    console.error('Vision API PATCH error:', error);
    return NextResponse.json({ error: 'Aksiyon kaydedilemedi.' }, { status: 500 });
  }
}
