import { describe, it, expect } from 'vitest';
import { HybridLiveScraper } from '../lib/scraper/hybrid-scraper';

describe('Hybrid Live Scraper Engine', () => {
  it('should accurately detect marketplace channels from URLs', () => {
    expect(HybridLiveScraper.detectChannel('https://www.amazon.com/dp/B0CX219XPRO')).toBe('Amazon Global');
    expect(HybridLiveScraper.detectChannel('https://www.trendyol.com/brand/product-p-12345')).toBe('Trendyol');
    expect(HybridLiveScraper.detectChannel('https://www.hepsiburada.com/product-p-HB999')).toBe('Hepsiburada');
    expect(HybridLiveScraper.detectChannel('https://allbirds.com/products/wool-runner')).toBe('Shopify Direct');
    expect(HybridLiveScraper.detectChannel('https://mybrand.myshopify.com/products/item')).toBe('Shopify Direct');
    expect(HybridLiveScraper.detectChannel('https://generic-store.com/item')).toBe('Web Marketplace');
  });

  it('should clean Amazon and Trendyol title suffixes properly', () => {
    const rawAmz = 'Apple MacBook Pro 16" (M3 Max, 36GB RAM) : Amazon.com.tr: Bilgisayar';
    expect(HybridLiveScraper.cleanTitle(rawAmz)).toBe('Apple MacBook Pro 16" (M3 Max, 36GB RAM)');

    const rawTrendyol = 'Minimalist Slim Fit Blazer Ceket - Trendyol';
    expect(HybridLiveScraper.cleanTitle(rawTrendyol)).toBe('Minimalist Slim Fit Blazer Ceket');

    const rawHtmlEntities = 'Pro &amp; Max &#39;Special Edition&#39;';
    expect(HybridLiveScraper.cleanTitle(rawHtmlEntities)).toBe("Pro & Max 'Special Edition'");
  });

  it('should handle malformed URLs gracefully without crashing', async () => {
    const res = await HybridLiveScraper.fetchProductLive('not-a-valid-url');
    expect(res.success).toBeUndefined(); // or liveDataExtracted is false
    expect(res.liveDataExtracted).toBe(false);
    expect(res.statusCode).toBe(400);
  });
});
