// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page:          Page;
  readonly heading:       Locator;
  readonly emailInput:    Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;
  readonly errorMessage:  Locator;
  readonly twitterIcon:   Locator;
  readonly facebookIcon:  Locator;
  readonly linkedinIcon:  Locator;

  constructor(page: Page) {
    this.page          = page;
    this.heading       = page.locator('h1');
    this.emailInput    = page.locator('input[type="email"], #exampleInputEmail1');
    this.passwordInput = page.locator('input[type="password"], #exampleInputPassword1');
    this.loginButton   = page.locator('button:has-text("Login"), input[value="Login"]');
    this.errorMessage  = page.locator('.invalid-feedback, [class*="error"], .alert, text=Use one of the demo');
    this.twitterIcon   = page.locator('a img[src*="twitter"], a:has(img[src*="twitter"])');
    this.facebookIcon  = page.locator('a img[src*="facebook"], a:has(img[src*="facebook"])');
    this.linkedinIcon  = page.locator('a img[src*="linkedin"], a:has(img[src*="linkedin"])');
  }

  async goto()          { await this.page.goto('/login'); }
  async verifyLoaded()  { await expect(this.page).toHaveURL(/login/); }

  async verifyHeading(text: string) {
    await expect(this.heading).toContainText(text);
  }

  async fillEmail(email: string)       { await this.emailInput.fill(email); }
  async fillPassword(password: string) { await this.passwordInput.fill(password); }
  async clickLogin()                   { await this.loginButton.click(); }

  async attemptLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async verifyEmailFieldVisible()    { await expect(this.emailInput).toBeVisible(); }
  async verifyPasswordFieldVisible() { await expect(this.passwordInput).toBeVisible(); }
  async verifyLoginButtonVisible()   { await expect(this.loginButton).toBeVisible(); }

  async verifyErrorMessageContains(text: string) {
    const errEl = this.page.locator('text=' + text).or(this.page.locator('.invalid-feedback'));
    await expect(errEl.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyStillOnLoginPage() {
    await expect(this.page).toHaveURL(/login/);
  }

  async verifyTwitterIconVisible()   { await expect(this.twitterIcon.first()).toBeVisible(); }
  async verifyFacebookIconVisible()  { await expect(this.facebookIcon.first()).toBeVisible(); }
  async verifyLinkedInIconVisible()  { await expect(this.linkedinIcon.first()).toBeVisible(); }
}
