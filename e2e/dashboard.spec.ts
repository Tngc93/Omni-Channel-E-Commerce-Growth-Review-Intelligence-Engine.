import { test, expect } from '@playwright/test';

test.describe('E-Commerce Growth Intelligence Dashboard', () => {
  test('should load executive dashboard and display key metrics', async ({ page }) => {
    await page.goto('/');

    // Verify title and headers
    await expect(page.locator('h1')).toContainText('E-Commerce Growth & Review Intelligence');
    
    // Verify executive cards
    await expect(page.getByText('Est. Monthly Return Waste')).toBeVisible();
    await expect(page.getByText('Avg Catalog Return Rate')).toBeVisible();
    await expect(page.getByText('Reviews & Returns Analyzed')).toBeVisible();
    await expect(page.getByText('Chronic Product Defects')).toBeVisible();

    // Verify Radar chart section
    await expect(page.getByText('Aspect Defect & Return Vulnerability Radar')).toBeVisible();

    // Verify Leaking Products
    await expect(page.getByText('Top Revenue Leaks by Product')).toBeVisible();
  });

  test('should navigate to products catalog and detail view', async ({ page }) => {
    await page.goto('/products');

    await expect(page.locator('h1')).toContainText('Product Intelligence Catalog');
    await expect(page.getByText('Signature Slim Fit Oxford Shirt')).toBeVisible();

    // Click inspect SKU
    await page.click('text=Inspect SKU >> nth=0');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('AI Chronic Defect Diagnosis & Root Causes')).toBeVisible();
  });

  test('should load Growth & A/B Lab with Gherkin specs', async ({ page }) => {
    await page.goto('/hypotheses');

    await expect(page.locator('h1')).toContainText('AI Product Manager & Growth Experimentation Lab');
    await expect(page.getByText('Developer & QA Gherkin Specification:').first()).toBeVisible();
  });
});
