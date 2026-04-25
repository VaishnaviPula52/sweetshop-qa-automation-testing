// pages/SweetsPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class SweetsPage {
  readonly page:        Page;
  readonly heading:     Locator;
  readonly productCards:Locator;
  readonly basketLink:  Locator;

  constructor(page: Page) {
    this.page         = page;
    this.heading      = page.locator('h1');
    this.productCards = page.locator('.card, .product-item, [class*="col"]:has(button)');
    this.basketLink   = page.locator('a[href="/basket"]');
  }

  async goto()                  { await this.page.goto('/sweets'); }
  async verifyLoaded()          { await expect(this.page).toHaveURL(/sweets/); }
  async verifyHeading(text: string) { await expect(this.heading.first()).toContainText(text); }

  getAddToBasketButton(productName: string): Locator {
    return this.page.locator(`text=${productName}`).locator('..').locator('..').locator('button, a:has-text("Add to Basket")');
  }

  async addProductToBasket(productName: string) {
    const btn = this.page.locator('.card').filter({ hasText: productName }).locator('button, a').filter({ hasText: /add to basket/i });
    await btn.click();
  }

  async getProductCount(): Promise<number> {
    const items = this.page.locator('.card');
    return await items.count();
  }

  async verifyProductVisible(name: string) {
    await expect(this.page.locator('.card').filter({ hasText: name })).toBeVisible();
  }

  async verifyProductPrice(name: string, price: string) {
    const card = this.page.locator('.card').filter({ hasText: name });
    await expect(card).toContainText(price);
  }
}
