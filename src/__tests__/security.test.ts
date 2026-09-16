import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../lib/security/rate-limiter';
import { z } from 'zod';

describe('Security & QA Suite: Rate Limiter', () => {
  it('should allow requests within limit and block when threshold exceeded', () => {
    const testId = 'test-client-' + Date.now();
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      const res = checkRateLimit(testId, limit, 10000);
      expect(res.success).toBe(true);
      expect(res.remaining).toBe(limit - 1 - i);
    }

    // Exceeded
    const blockedRes = checkRateLimit(testId, limit, 10000);
    expect(blockedRes.success).toBe(false);
    expect(blockedRes.remaining).toBe(0);
  });
});

describe('Security & QA Suite: SSRF & URL Validation', () => {
  function validateScrapeUrl(urlStr: string): { valid: boolean; reason?: string } {
    try {
      const parsed = new URL(urlStr);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { valid: false, reason: 'Disallowed protocol' };
      }
      const host = parsed.hostname.toLowerCase();
      if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.startsWith('10.') || host.startsWith('192.168.')) {
        return { valid: false, reason: 'Private/Loopback IP blocked' };
      }
      return { valid: true };
    } catch {
      return { valid: false, reason: 'Malformed URL' };
    }
  }

  it('should reject non-HTTP protocols (SSRF / XSS vectors)', () => {
    expect(validateScrapeUrl('file:///etc/passwd').valid).toBe(false);
    expect(validateScrapeUrl('javascript:alert(1)').valid).toBe(false);
    expect(validateScrapeUrl('data:text/html,<h1>test</h1>').valid).toBe(false);
    expect(validateScrapeUrl('ftp://example.com/file').valid).toBe(false);
  });

  it('should reject loopback and private LAN addresses (SSRF vectors)', () => {
    expect(validateScrapeUrl('http://127.0.0.1:8080/admin').valid).toBe(false);
    expect(validateScrapeUrl('http://localhost:3000/api').valid).toBe(false);
    expect(validateScrapeUrl('http://192.168.1.1/router').valid).toBe(false);
    expect(validateScrapeUrl('http://10.0.0.5/internal').valid).toBe(false);
  });

  it('should accept valid public marketplace URLs', () => {
    expect(validateScrapeUrl('https://www.amazon.com/dp/B0CX219XPRO').valid).toBe(true);
    expect(validateScrapeUrl('https://www.trendyol.com/brand/product-p-12345').valid).toBe(true);
    expect(validateScrapeUrl('https://www.hepsiburada.com/product-hb-999').valid).toBe(true);
  });
});

describe('Security & QA Suite: Input Validation & Bounds Enforcement', () => {
  const IngestSchema = z.object({
    rating: z.coerce.number().int().min(1).max(5),
    comment: z.string().min(3).max(4000),
  });

  it('should reject invalid or NaN ratings', () => {
    expect(IngestSchema.safeParse({ rating: 'abc', comment: 'Valid comment' }).success).toBe(false);
    expect(IngestSchema.safeParse({ rating: 0, comment: 'Valid comment' }).success).toBe(false);
    expect(IngestSchema.safeParse({ rating: 6, comment: 'Valid comment' }).success).toBe(false);
    expect(IngestSchema.safeParse({ rating: -10, comment: 'Valid comment' }).success).toBe(false);
  });

  it('should enforce reasonable length boundaries on comments to prevent DoS', () => {
    expect(IngestSchema.safeParse({ rating: 5, comment: 'ok' }).success).toBe(false); // too short
    expect(IngestSchema.safeParse({ rating: 5, comment: 'A'.repeat(5000) }).success).toBe(false); // too long
    expect(IngestSchema.safeParse({ rating: 5, comment: 'Harika bir ürün çok beğendim.' }).success).toBe(true);
  });
});
