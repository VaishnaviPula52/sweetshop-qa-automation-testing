// pages/AboutPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class AboutPage {
  readonly page:         Page;
  readonly heading:      Locator;
  readonly promoBanner:  Locator;
  readonly pageContent:  Locator;

  constructor(page: Page) {
    this.page        = page;
    this.heading     = page.locator('h1, h2').first();
    this.promoBanner = page.locator('.alert-success');
    this.pageContent = page.locator('.container, main, [class*="content"]').first();
  }

  async goto()         { await this.page.goto('/about'); }
  async verifyLoaded() { await expect(this.page).toHaveURL(/about/); }

  async verifyHeadingContains(text: string) {
    await expect(this.heading).toContainText(text);
  }

  async verifyPromoBannerVisible() {
    await expect(this.promoBanner.first()).toContainText('20% Off!');
  }

  async verifyContentVisible() {
    await expect(this.pageContent).toBeVisible();
  }
}
