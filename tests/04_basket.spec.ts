// tests/04_basket.spec.ts
// TC-043 to TC-059 | Group G-05

import { test, expect } from '@playwright/test';
import { BasketPage } from '../pages/BasketPage';
import { basketData, pageContent } from '../fixtures/testData';

test.describe('Basket — TC-043 to TC-059', () => {

  test.beforeEach(async ({ page }) => {
    const bp = new BasketPage(page);
    await bp.goto();
    await bp.verifyLoaded();
  });

  test('TC-043 | Basket page loads with Your Basket heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(pageContent.basketTitle);
  });

  test('TC-044 | Empty basket shows 0 items', async ({ page }) => {
    // h4 contains "Your Basket 0" — matches actual DOM
    await expect(page.locator('h4').filter({ hasText: /Your Basket/ }))
      .toContainText('0');
  });

  test('TC-045 | Collect (FREE) delivery option is visible', async ({ page }) => {
    await expect(
      page.locator('label').filter({ hasText: /Collect/ })
    ).toBeVisible();
  });

  test('TC-046 | Standard Shipping (£1.99) option is visible', async ({ page }) => {
    await expect(
      page.locator('label').filter({ hasText: /Standard Shipping/ })
    ).toBeVisible();
  });

  test('TC-047 | Standard Shipping option can be selected', async ({ page }) => {
    const shippingRadio = page.locator('#exampleRadios2');
    await page.locator('label[for="exampleRadios2"]').click();
    await expect(shippingRadio).toBeChecked();
  });

  test('TC-048 | Promo code input field is visible', async ({ page }) => {
    const bp = new BasketPage(page);
    await expect(bp.promoInput).toBeVisible();
  });

  test('TC-049 | Invalid promo code shows validation error', async ({ page }) => {
    const bp = new BasketPage(page);
    await bp.promoInput.fill(basketData.invalidPromoCode);
    await bp.redeemButton.click();
    await expect(
      page.locator('.invalid-feedback').filter({ hasText: /promo/i }).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('TC-050 | Empty promo code shows validation message', async ({ page }) => {
    // Click Redeem without entering a code
    await page.locator('button:has-text("Redeem")').click();
    await expect(
      page.locator('.invalid-feedback').filter({ hasText: /promo/ }).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('TC-051 | Billing first name required validation fires on submit', async ({ page }) => {
    await page.locator('button:has-text("Continue to checkout")').click();
    await expect(
      page.locator('.invalid-feedback').filter({ hasText: /first name/i }).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('TC-052 | Billing last name required validation fires', async ({ page }) => {
    const bp = new BasketPage(page);
    await bp.firstNameInput.fill(basketData.validBilling.firstName);
    await page.locator('button:has-text("Continue to checkout")').click();
    await expect(
      page.locator('.invalid-feedback').filter({ hasText: /last name/i }).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('TC-055 | Country dropdown is present with United Kingdom option', async ({ page }) => {
    const dropdown = page.locator('select').first();
    await expect(dropdown).toBeVisible();
    await expect(dropdown.locator('option:has-text("United Kingdom")')).toHaveCount(1);
  });

  test('TC-056 | City dropdown has Bristol, Cardiff, Swansea options', async ({ page }) => {
    const cityDropdown = page.locator('select').nth(1);
    await expect(cityDropdown).toBeVisible();
    await expect(cityDropdown.locator('option:has-text("Bristol")')).toHaveCount(1);
    await expect(cityDropdown.locator('option:has-text("Cardiff")')).toHaveCount(1);
    await expect(cityDropdown.locator('option:has-text("Swansea")')).toHaveCount(1);
  });

  test('TC-057 | Payment card name field is visible', async ({ page }) => {
    const bp = new BasketPage(page);
    await expect(bp.cardNameInput).toBeVisible();
  });

  test('TC-058 | Payment card number field is visible', async ({ page }) => {
    await expect(
      page.locator('#cc-number, input[placeholder*="card" i]').first()
    ).toBeVisible();
  });

  test('TC-059 | Payment CVV field is visible', async ({ page }) => {
    await expect(
      page.locator('#cc-cvv, input[placeholder*="CVV" i], input[placeholder*="cvv" i]').first()
    ).toBeVisible();
  });

});
