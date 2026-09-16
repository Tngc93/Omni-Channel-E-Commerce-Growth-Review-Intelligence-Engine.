import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import {
  ACTIVE_DEFECT_ALERTS,
  buildSlackBlockKitPayload,
  buildDiscordEmbedPayload,
} from '@/lib/alerts/anomaly-engine';
import { z } from 'zod';

const WebhookDispatchSchema = z.object({
  alertId: z.string().default('alert-spk-001'),
  platform: z.enum(['slack', 'discord']).default('slack'),
  webhookUrl: z.string().url('Geçerli bir webhook URL giriniz.').optional().or(z.literal('')),
  customNote: z.string().max(500).optional(),
});

function isPrivateOrLoopbackHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === 'localhost' || lower === '127.0.0.1' || lower === '::1') return true;
  if (lower.startsWith('10.') || lower.startsWith('192.168.') || lower.startsWith('169.254.')) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(lower)) return true;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'client';
    const rateCheck = checkRateLimit(`webhook:${ip}`, 20, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Çok fazla webhook isteği gönderildi. Lütfen bekleyin.' },
        { status: 429 }
      );
    }

    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Geçersiz JSON içeriği.' }, { status: 400 });
    }

    const parseResult = WebhookDispatchSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Geçersiz parametreler.' },
        { status: 400 }
      );
    }

    const { alertId, platform, webhookUrl, customNote } = parseResult.data;

    const alert = ACTIVE_DEFECT_ALERTS.find((a) => a.id === alertId) || ACTIVE_DEFECT_ALERTS[0];

    const payload =
      platform === 'slack'
        ? buildSlackBlockKitPayload(alert, customNote)
        : buildDiscordEmbedPayload(alert, customNote);

    // If a live webhook URL is provided, validate against SSRF and attempt fetch
    if (webhookUrl && webhookUrl.trim().length > 0) {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(webhookUrl);
      } catch {
        return NextResponse.json({ error: 'Geçersiz webhook adresi.' }, { status: 400 });
      }

      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
        return NextResponse.json({ error: 'Yalnızca HTTP/HTTPS webhookları desteklenir.' }, { status: 400 });
      }

      if (isPrivateOrLoopbackHost(parsedUrl.hostname)) {
        return NextResponse.json(
          { error: 'İç ağ veya yerel adreslere webhook gönderimi engellendi (SSRF Koruması).' },
          { status: 403 }
        );
      }

      try {
        const dispatchRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        return NextResponse.json({
          success: true,
          mode: 'LIVE_DISPATCH',
          statusCode: dispatchRes.status,
          alertTitle: alert.defectName,
          platform,
          payload,
        });
      } catch (err: any) {
        console.warn('Live webhook dispatch failed, returning preview:', err.message);
        return NextResponse.json({
          success: false,
          error: `Webhook uç noktasına ulaşılamadı: ${err.message}`,
          payload,
        }, { status: 502 });
      }
    }

    // Simulated sandbox mode
    return NextResponse.json({
      success: true,
      mode: 'SIMULATION_SANDBOX',
      message: 'Test bildirimi başarıyla oluşturuldu ve simüle edildi.',
      alertTitle: alert.defectName,
      platform,
      payload,
    });
  } catch (err: any) {
    console.error('[WEBHOOK ROUTE ERROR]:', err);
    return NextResponse.json(
      { error: 'Webhook işlemi sırasında bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
