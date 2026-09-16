export interface ScrapedProductInfo {
  url: string;
  channel: string;
  isShopify: boolean;
  extractedTitle?: string;
  extractedDescription?: string;
  extractedImage?: string;
  extractedPrice?: number;
  botProtectionDetected: boolean;
  statusCode: number;
  liveDataExtracted: boolean;
}

export class HybridLiveScraper {
  /**
   * Identifies channel from URL pattern
   */
  static detectChannel(url: string): string {
    const lower = url.toLowerCase();
    if (lower.includes('amazon.')) return 'Amazon Global';
    if (lower.includes('trendyol.com')) return 'Trendyol';
    if (lower.includes('hepsiburada.com')) return 'Hepsiburada';
    if (lower.includes('shopify.com') || lower.includes('myshopify.com') || lower.includes('/products/')) return 'Shopify Direct';
    return 'Web Marketplace';
  }

  /**
   * Cleans extracted raw HTML titles
   */
  static cleanTitle(rawTitle: string): string {
    return rawTitle
      .replace(/\s*:\s*Amazon\.[a-z.]+.*$/i, '')
      .replace(/\s*-\s*Trendyol.*$/i, '')
      .replace(/\s*-\s*Hepsiburada.*$/i, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();
  }

  /**
   * Fetches real live product metadata from any public e-commerce link
   */
  static async fetchProductLive(url: string): Promise<ScrapedProductInfo> {
    const channel = this.detectChannel(url);
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return {
        url,
        channel,
        isShopify: false,
        botProtectionDetected: false,
        statusCode: 400,
        liveDataExtracted: false,
      };
    }

    // 1. Shopify Dedicated Live Ingestion
    const isShopifyProduct = parsedUrl.pathname.includes('/products/');
    if (isShopifyProduct) {
      try {
        const jsonUrl = `${parsedUrl.origin}${parsedUrl.pathname}.json`;
        const shopifyRes = await fetch(jsonUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(6000),
        });

        if (shopifyRes.ok) {
          const shopifyData = await shopifyRes.json();
          const prod = shopifyData.product;
          if (prod && prod.title) {
            return {
              url,
              channel: 'Shopify Direct',
              isShopify: true,
              extractedTitle: prod.title,
              extractedDescription: prod.body_html ? prod.body_html.replace(/<[^>]*>?/gm, '').slice(0, 300) : undefined,
              extractedImage: prod.images?.[0]?.src,
              extractedPrice: parseFloat(prod.variants?.[0]?.price) || undefined,
              botProtectionDetected: false,
              statusCode: 200,
              liveDataExtracted: true,
            };
          }
        }
      } catch {
        // Fall through to general HTML scraper if Shopify JSON is restricted
      }
    }

    // 2. Universal HTML & OpenGraph Live Scraper with Desktop Headers
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: AbortSignal.timeout(8000),
      });

      const statusCode = response.status;
      const html = await response.text();

      // Detect common marketplace anti-scraping defenses
      const lowerHtml = html.toLowerCase();
      const botProtectionDetected =
        statusCode === 403 ||
        statusCode === 503 ||
        lowerHtml.includes('robot check') ||
        lowerHtml.includes('type the characters you see in this image') ||
        lowerHtml.includes('cf-challenge') ||
        lowerHtml.includes('cloudflare ray id') ||
        lowerHtml.includes('challenge-platform') ||
        lowerHtml.includes('access denied');

      let extractedTitle: string | undefined;
      let extractedDescription: string | undefined;
      let extractedImage: string | undefined;

      // Extract OpenGraph Title
      const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:title["']/i);
      if (ogTitleMatch && ogTitleMatch[1]) {
        extractedTitle = this.cleanTitle(ogTitleMatch[1]);
      }

      // Extract Amazon Product Title ID if present
      if (!extractedTitle) {
        const amzTitleMatch = html.match(/id=["']productTitle["'][^>]*>([\s\S]*?)<\/span>/i);
        if (amzTitleMatch && amzTitleMatch[1]) {
          extractedTitle = this.cleanTitle(amzTitleMatch[1].trim());
        }
      }

      // Extract HTML Title tag
      if (!extractedTitle) {
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          const raw = titleMatch[1].trim();
          if (!raw.toLowerCase().includes('robot check') && !raw.toLowerCase().includes('just a moment')) {
            extractedTitle = this.cleanTitle(raw);
          }
        }
      }

      // Extract OpenGraph Image
      const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
      if (ogImageMatch && ogImageMatch[1]) {
        extractedImage = ogImageMatch[1];
      }

      // Extract Meta Description
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                        html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
      if (descMatch && descMatch[1]) {
        extractedDescription = descMatch[1].trim().slice(0, 300);
      }

      return {
        url,
        channel,
        isShopify: false,
        extractedTitle,
        extractedDescription,
        extractedImage,
        botProtectionDetected,
        statusCode,
        liveDataExtracted: Boolean(extractedTitle && extractedTitle.length > 3),
      };
    } catch (err: any) {
      return {
        url,
        channel,
        isShopify: false,
        botProtectionDetected: true,
        statusCode: 504,
        liveDataExtracted: false,
      };
    }
  }
}
