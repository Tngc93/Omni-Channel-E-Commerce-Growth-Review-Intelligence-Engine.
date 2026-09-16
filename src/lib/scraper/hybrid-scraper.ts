export interface ScrapedReviewItem {
  comment: string;
  rating: number;
  author?: string;
}

export interface ScrapedProductInfo {
  url: string;
  channel: string;
  isShopify: boolean;
  extractedTitle?: string;
  extractedDescription?: string;
  extractedImage?: string;
  extractedPrice?: number;
  detectedCategory: string;
  scrapedReviews: ScrapedReviewItem[];
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
   * Classifies product category dynamically from title and description keywords
   */
  static classifyCategory(title: string = '', description: string = ''): string {
    const text = `${title} ${description}`.toLowerCase();

    const techKeywords = [
      'laptop', 'bilgisayar', 'kulaklık', 'headphone', 'earphone', 'oled', 'intel', 'amd', 'rtx', 'phone',
      'telefon', 'klavye', 'keyboard', 'mouse', 'charger', 'şarj', 'speaker', 'hoparlör', 'bluetooth',
      'wireless', 'kablosuz', 'gaming', 'oyun', 'tablet', 'monitör', 'ekran', 'display', 'smartwatch', 'saat'
    ];
    if (techKeywords.some((kw) => text.includes(kw))) {
      return 'Consumer Electronics';
    }

    const fashionKeywords = [
      'blazer', 'ceket', 'jacket', 'pantolon', 'pants', 'shirt', 'gömlek', 'dress', 'elbise', 'ayakkabı',
      'shoe', 'sneaker', 'wool', 'yün', 'kumaş', 'fabric', 'beden', 'size', 'slim fit', 'oversize', 't-shirt',
      'çanta', 'bag', 'deri', 'leather', 'mont', 'coat', 'suit', 'takım'
    ];
    if (fashionKeywords.some((kw) => text.includes(kw))) {
      return 'Fashion & Apparel';
    }

    const beautyKeywords = [
      'serum', 'krem', 'cream', 'lotion', 'losyon', 'cilt', 'skin', 'skincare', 'peptide', 'peptit',
      'parfüm', 'perfume', 'shampoo', 'şampuan', 'maske', 'mask', 'tonik', 'damlalık', 'makyaj', 'makeup',
      'lipstick', 'ruj', 'anti-aging', 'nemlendirici', 'göz', 'saç', 'hair'
    ];
    if (beautyKeywords.some((kw) => text.includes(kw))) {
      return 'Beauty & Skincare';
    }

    const homeKeywords = [
      'espresso', 'kahve', 'coffee', 'makine', 'machine', 'tencere', 'pot', 'tava', 'pan', 'blender',
      'mutfak', 'kitchen', 'conta', 'gasket', 'vacuum', 'süpürge', 'airfryer', 'fırın', 'oven', 'çay',
      'tea', 'kettle', 'toaster', 'tost', 'robot', 'bulaşık', 'çamaşır', 'ütü', 'iron'
    ];
    if (homeKeywords.some((kw) => text.includes(kw))) {
      return 'Home & Kitchen';
    }

    return 'General Marketplace';
  }

  /**
   * Extracts real customer reviews from HTML pages
   */
  static extractReviewsFromHtml(html: string): ScrapedReviewItem[] {
    const reviews: ScrapedReviewItem[] = [];

    // 1. Amazon Review Parsing Regex
    // Amazon review body: data-hook="review-body"
    const amazonBodyRegex = /data-hook=["']review-body["'][^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi;
    let match: RegExpExecArray | null;

    while ((match = amazonBodyRegex.exec(html)) !== null && reviews.length < 15) {
      let rawComment = match[1].replace(/<[^>]*>?/gm, '').trim();
      if (rawComment.length > 15) {
        reviews.push({
          comment: rawComment,
          rating: 4, // default, will refine if star rating matches
          author: 'Doğrulanmış Amazon Müşterisi',
        });
      }
    }

    // If Amazon star ratings can be paired
    const starRegex = /data-hook=["']review-star-rating["'][^>]*>[\s\S]*?<span[^>]*>([0-9.,]+)/gi;
    let starIdx = 0;
    while ((match = starRegex.exec(html)) !== null && starIdx < reviews.length) {
      const parsed = parseFloat(match[1].replace(',', '.'));
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        reviews[starIdx].rating = Math.round(parsed);
      }
      starIdx++;
    }

    // 2. Generic / Shopify Review App Parsing (Judge.me, Loox, Native)
    if (reviews.length === 0) {
      const genericRegex = /(?:class=["'](?:jdgm-rev__body|spr-review-body|loox-review-content|comment-text)["'][^>]*>)([\s\S]*?)<\/(?:div|p)>/gi;
      while ((match = genericRegex.exec(html)) !== null && reviews.length < 15) {
        let rawComment = match[1].replace(/<[^>]*>?/gm, '').trim();
        if (rawComment.length > 15) {
          reviews.push({
            comment: rawComment,
            rating: 4,
            author: 'Doğrulanmış Mağaza Müşterisi',
          });
        }
      }
    }

    return reviews;
  }

  /**
   * Fetches real live product metadata and reviews from any public e-commerce link
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
        detectedCategory: 'General Marketplace',
        scrapedReviews: [],
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
            const desc = prod.body_html ? prod.body_html.replace(/<[^>]*>?/gm, '').slice(0, 300) : '';
            const category = this.classifyCategory(prod.title, desc);
            return {
              url,
              channel: 'Shopify Direct',
              isShopify: true,
              extractedTitle: prod.title,
              extractedDescription: desc || undefined,
              extractedImage: prod.images?.[0]?.src,
              extractedPrice: parseFloat(prod.variants?.[0]?.price) || undefined,
              detectedCategory: category,
              scrapedReviews: [],
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

      // Extract real reviews if present in HTML
      const scrapedReviews = this.extractReviewsFromHtml(html);

      // Classify category from extracted title and description
      const detectedCategory = this.classifyCategory(extractedTitle, extractedDescription);

      return {
        url,
        channel,
        isShopify: false,
        extractedTitle,
        extractedDescription,
        extractedImage,
        detectedCategory,
        scrapedReviews,
        botProtectionDetected,
        statusCode,
        liveDataExtracted: Boolean(extractedTitle && extractedTitle.length > 3),
      };
    } catch {
      return {
        url,
        channel,
        isShopify: false,
        detectedCategory: 'General Marketplace',
        scrapedReviews: [],
        botProtectionDetected: true,
        statusCode: 504,
        liveDataExtracted: false,
      };
    }
  }
}
