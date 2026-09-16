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

  it('should accurately classify product categories from title and description', () => {
    expect(HybridLiveScraper.classifyCategory('Apple MacBook Pro M3 Max', '16-inch Retina laptop')).toBe('Consumer Electronics');
    expect(HybridLiveScraper.classifyCategory('Oversized Yün Blazer Ceket', 'Kumaş ceket takım')).toBe('Fashion & Apparel');
    expect(HybridLiveScraper.classifyCategory('Hyaluronic Acid Cilt Serumu', 'Nemlendirici peptide serum')).toBe('Beauty & Skincare');
    expect(HybridLiveScraper.classifyCategory('Paslanmaz Çelik Espresso Kahve Makinesi', 'Basınçlı filtre kahve')).toBe('Home & Kitchen');
    expect(HybridLiveScraper.classifyCategory('Generic Item 123', 'No category keywords')).toBe('General Marketplace');
  });

  it('should extract reviews and star ratings from Amazon-style HTML snippets', () => {
    const mockHtml = `
      <div class="a-section review">
        <span data-hook="review-star-rating" class="a-icon-alt"><span>5,0</span></span>
        <span data-hook="review-body">
          <span>Harika bir bilgisayar, render hızı inanılmaz ve şarjı çok uzun gidiyor.</span>
        </span>
      </div>
      <div class="a-section review">
        <span data-hook="review-star-rating" class="a-icon-alt"><span>2,0</span></span>
        <span data-hook="review-body">
          <span>Ağır kullanımda fanlar çok ses yapıyor ve ısınıyor maalesef.</span>
        </span>
      </div>
    `;

    const reviews = HybridLiveScraper.extractReviewsFromHtml(mockHtml);
    expect(reviews.length).toBe(2);
    expect(reviews[0].comment).toContain('Harika bir bilgisayar');
    expect(reviews[0].rating).toBe(5);
    expect(reviews[1].comment).toContain('fanlar çok ses yapıyor');
    expect(reviews[1].rating).toBe(2);
  });

  it('should extract reviews from Shopify / Generic review app HTML snippets', () => {
    const mockHtml = `
      <div class="jdgm-rev__body">Kumaş kalitesi harika fakat omuz kısmı biraz dar geldi.</div>
      <p class="loox-review-content">Paketleme çok özenliydi, ürün ertesi gün elime ulaştı.</p>
    `;

    const reviews = HybridLiveScraper.extractReviewsFromHtml(mockHtml);
    expect(reviews.length).toBe(2);
    expect(reviews[0].comment).toContain('Kumaş kalitesi harika');
    expect(reviews[1].comment).toContain('Paketleme çok özenliydi');
  });

  it('should handle malformed URLs gracefully without crashing', async () => {
    const res = await HybridLiveScraper.fetchProductLive('not-a-valid-url');
    expect(res.liveDataExtracted).toBe(false);
    expect(res.statusCode).toBe(400);
  });
});
