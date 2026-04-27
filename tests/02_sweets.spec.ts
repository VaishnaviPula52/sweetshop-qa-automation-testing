// tests/02_sweets.spec.ts
// TC-011 to TC-024 | Group G-03

import { test, expect } from '@playwright/test';
import { SweetsPage } from '../pages/SweetsPage';
import { pageContent } from '../fixtures/testData';

test.describe('Sweets / Products — TC-011 to TC-024', () => {

  test.beforeEach(async ({ page }) => {
    const sw = new SweetsPage(page);
    await sw.goto();
    await sw.verifyLoaded();
  });

  test('TC-011 | Sweets page displays Browse sweets heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(pageContent.sweetsTitle);
  });

  test('TC-012 | Exactly 16 products are displayed', async ({ page }) => {
    const sw    = new SweetsPage(page);
    const count = await sw.getProductCount();
    expect(count).toBe(16);
  });

  test('TC-013 | Chocolate Cups is visible at £1.00', async ({ page }) => {
    const sw = new SweetsPage(page);
    await sw.verifyProductVisible('Chocolate Cups');
    await sw.verifyProductPrice('Chocolate Cups', '£1.00');
  });

  test('TC-014 | Sherbert Straws is visible at £0.75', async ({ page }) => {
    const sw = new SweetsPage(page);
    await sw.verifyProductVisible('Sherbert Straws');
    await sw.verifyProductPrice('Sherbert Straws', '£0.75');
  });

  test('TC-015 | Each product has an Add to Basket button', async ({ page }) => {
    const buttons = page.locator('a.btn').filter({ hasText: /add to basket/i });
    const count   = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(16);
  });

  test('TC-016 | All prices display GBP £ symbol', async ({ page }) => {
    const prices = page.locator('.card small.text-muted').filter({ hasText: /£/ });
    const count  = await prices.count();
    expect(count).toBe(16);
  });

  test('TC-017 | Cheapest product Bubbly is at £0.10', async ({ page }) => {
    const sw = new SweetsPage(page);
    await sw.verifyProductVisible('Bubbly');
    await sw.verifyProductPrice('Bubbly', '£0.10');
  });

  test('TC-018 | Most expensive Swansea Mixture is at £1.50', async ({ page }) => {
    const sw = new SweetsPage(page);
    await sw.verifyProductVisible('Swansea Mixture');
    await sw.verifyProductPrice('Swansea Mixture', '£1.50');
  });

  test('TC-019 | Basket count updates after Add to Basket', async ({ page }) => {
    const sw = new SweetsPage(page);
    await sw.addProductToBasket('Chocolate Cups');

    const basketText = await page.locator('a[href="/basket"]').innerText();
    expect(basketText).toContain('1 Basket');
  });

  test('TC-022 | Sweets page loads in acceptable time', async ({ page }) => {
    const start    = Date.now();
    await page.goto('/sweets');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10000);
  });

  test('TC-023 | Products have description text', async ({ page }) => {
    // Each card has a <p> with the product description
    const descriptions = page.locator('.card .card-text, .card p');
    const count        = await descriptions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-024 | No critical JS errors on sweets page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/sweets');
    // Filter out expected network/resource errors
    const jsErrors = errors.filter(e =>
      !e.includes('net::') &&
      !e.includes('Failed to load') &&
      !e.includes('favicon')
    );
    expect(jsErrors).toHaveLength(0);
  });

});
