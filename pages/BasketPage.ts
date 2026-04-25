// pages/BasketPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BasketPage {
  readonly page:           Page;
  readonly heading:        Locator;
  readonly basketSummary:  Locator;
  readonly collectOption:  Locator;
  readonly shippingOption: Locator;
  readonly promoInput:     Locator;
  readonly redeemButton:   Locator;
  readonly promoError:     Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput:  Locator;
  readonly emailInput:     Locator;
  readonly addressInput:   Locator;
  readonly zipInput:       Locator;
  readonly cardNameInput:  Locator;
  readonly cardNumInput:   Locator;
  readonly expiryInput:    Locator;
  readonly cvvInput:       Locator;
  readonly submitButton:   Locator;

  constructor(page: Page) {
    this.page           = page;
    this.heading        = page.locator('h1');
    this.basketSummary  = page.locator('h4:has-text("Your Basket")');
    this.collectOption  = page.locator('label:has-text("Collect"), input[value="Collect"]');
    this.shippingOption = page.locator('label:has-text("Standard Shipping"), input[value*="Standard"]');
    this.promoInput     = page.locator('input[placeholder*="promo"], input[id*="promo"]');
    this.redeemButton   = page.locator('button:has-text("Redeem")');
    this.promoError     = page.locator('.invalid-feedback, text=Please input a valid promo code');
    this.firstNameInput = page.locator('#firstName, input[placeholder*="First"]');
    this.lastNameInput  = page.locator('#lastName, input[placeholder*="Last"]');
    this.emailInput     = page.locator('#email, input[type="email"]');
    this.addressInput   = page.locator('#address, input[placeholder*="address"], input[placeholder*="Address"]');
    this.zipInput       = page.locator('#zip, input[placeholder*="Zip"], input[placeholder*="zip"]');
    this.cardNameInput  = page.locator('#cc-name, input[placeholder*="Full name"]');
    this.cardNumInput   = page.locator('#cc-number, input[placeholder*="card"], input[placeholder*="Card"]');
    this.expiryInput    = page.locator('#cc-expiration, input[placeholder*="xpir"]');
    this.cvvInput       = page.locator('#cc-cvv, input[placeholder*="cvv"], input[placeholder*="CVV"]');
    this.submitButton   = page.locator('button:has-text("Continue to checkout"), button[type="submit"]');
  }

  async goto()         { await this.page.goto('/basket'); }
  async verifyLoaded() { await expect(this.page).toHaveURL(/basket/); }

  async verifyHeading(text: string) {
    await expect(this.heading).toContainText(text);
  }

  async verifyCollectOptionVisible()   { await expect(this.collectOption.first()).toBeVisible(); }
  async verifyShippingOptionVisible()  { await expect(this.shippingOption.first()).toBeVisible(); }
  async selectShipping()               { await this.shippingOption.first().click(); }

  async enterPromoCode(code: string) {
    await this.promoInput.fill(code);
    await this.redeemButton.click();
  }

  async verifyPromoError() {
    await expect(this.promoError.first()).toBeVisible({ timeout: 5000 });
  }

  async clickSubmit()    { await this.submitButton.click(); }

  async verifyFieldError(field: string) {
    const err = this.page.locator(`.invalid-feedback, .was-validated`).first();
    await expect(err).toBeVisible({ timeout: 5000 });
  }
}
