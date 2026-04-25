// pages/NavigationPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
  readonly page:        Page;
  readonly logo:        Locator;
  readonly sweetsLink:  Locator;
  readonly aboutLink:   Locator;   // NOTE: href="/bout" in live app — Bug #006
  readonly loginLink:   Locator;
  readonly basketLink:  Locator;
  readonly basketCount: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.logo        = page.locator('.navbar-brand');
    this.sweetsLink  = page.locator('a[href="/sweets"]').first();
    this.aboutLink   = page.locator('a:has-text("About")').first(); // text match — href is broken
    this.loginLink   = page.locator('a[href="/login"]').first();
    this.basketLink  = page.locator('a[href="/basket"]').first();
    this.basketCount = page.locator('a[href="/basket"]');
  }

  async goTo(path: string)  { await this.page.goto(path); }
  async clickLogo()         { await this.logo.click(); }
  async clickSweets()       { await this.sweetsLink.click(); }
  async clickAbout()        { await this.aboutLink.click(); }
  async clickLogin()        { await this.loginLink.click(); }
  async clickBasket()       { await this.basketLink.click(); }

  async verifyOnPage(urlPath: string) {
    await expect(this.page).toHaveURL(new RegExp(urlPath));
  }
}
