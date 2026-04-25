// tests/03_login.spec.ts
// TC-026 to TC-042 | Group G-04
// UPDATED: Tests now PROVE Bug #001 and Bug #004 with proper assertions

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData, messages, pageContent } from '../fixtures/testData';

test.describe('Login — TC-026 to TC-042', () => {

  test.beforeEach(async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.verifyLoaded();
  });

  // ── UI PRESENCE TESTS ────────────────────────────────────────────────────

  test('TC-026 | Login page heading is visible', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyHeading(pageContent.loginTitle);
  });

  test('TC-027 | Email address field is visible', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyEmailFieldVisible();
  });

  test('TC-028 | Password field is visible', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyPasswordFieldVisible();
  });

  test('TC-029 | Login button is visible', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyLoginButtonVisible();
  });

  test('TC-030 | Instructional text is present', async ({ page }) => {
    await expect(
      page.locator('text=Please enter your email address')
    ).toBeVisible();
  });

  // ── HTML5 VALIDATION TESTS ───────────────────────────────────────────────

  test('TC-031 | Empty form — cannot submit, stays on login page', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.clickLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('TC-032 | Invalid email format — browser blocks submission', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.fillEmail(loginData.badEmailFormat);
    await lp.fillPassword(loginData.invalidPassword);
    await lp.clickLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('TC-033 | Missing password — cannot submit', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.fillEmail(loginData.invalidEmail);
    await lp.clickLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('TC-034 | Valid email format is accepted by the input field', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.fillEmail(loginData.invalidEmail);
    await expect(lp.emailInput).toHaveValue(loginData.invalidEmail);
  });

  // ── BUG #001 PROOF — LOGIN COMPLETELY BROKEN ─────────────────────────────

  test('TC-035 | BUG-001 PROOF — Error message appears on every login attempt', async ({ page }) => {
    const lp = new LoginPage(page);

    await lp.fillEmail('user@sweetshop.com');
    await lp.fillPassword('test1234');
    await lp.clickLogin();

    // PROOF 1: error message IS visible
    const errorMessage = page.locator('.invalid-feedback').first();
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // PROOF 2: exact broken error text confirmed
    await expect(errorMessage).toContainText(
      'Use one of the demo email addresses shown in the tooltip'
    );

    // PROOF 3: still on login page — no redirect happened
    await expect(page).toHaveURL(/login/);

    // PROOF 4: no success state exists anywhere
    await expect(page.locator('text=Welcome')).not.toBeVisible();
    await expect(page.locator('text=My Account')).not.toBeVisible();
    await expect(page.locator('text=Logout')).not.toBeVisible();
  });

  test('TC-036 | BUG-001 PROOF — Every email format fails, none succeed', async ({ page }) => {
    const emailsToTry = [
      'admin@sweetshop.com',
      'demo@sweetshop.com',
      'test@sweetshop.com',
      'user@example.com',
      'hello@sweetshop.netlify.app',
    ];

    const lp = new LoginPage(page);

    for (const email of emailsToTry) {
      await lp.emailInput.clear();
      await lp.passwordInput.clear();
      await lp.fillEmail(email);
      await lp.fillPassword('test1234');
      await lp.clickLogin();

      // Every single attempt must show error — none should succeed
      const errorMessage = page.locator('.invalid-feedback').first();
      await expect(errorMessage).toBeVisible({ timeout: 5000 });
      await expect(page).toHaveURL(/login/);
    }

    // Confirms login is 100% broken for all email formats
    await expect(page).toHaveURL(/login/);
  });

  test('TC-037 | BUG-004 PROOF — Tooltip referenced in error does NOT exist', async ({ page }) => {
    const lp = new LoginPage(page);

    // Step 1: Trigger the error
    await lp.fillEmail('user@sweetshop.com');
    await lp.fillPassword('test1234');
    await lp.clickLogin();

    const errorMessage = page.locator('.invalid-feedback').first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('tooltip');

    // Step 2: Prove the tooltip attribute does NOT exist on email field
    const titleAttr     = await lp.emailInput.getAttribute('title');
    const dataTooltip   = await lp.emailInput.getAttribute('data-tooltip');
    const dataToggle    = await lp.emailInput.getAttribute('data-toggle');
    const dataOrigTitle = await lp.emailInput.getAttribute('data-original-title');

    expect(titleAttr).toBeNull();
    expect(dataTooltip).toBeNull();
    expect(dataToggle).toBeNull();
    expect(dataOrigTitle).toBeNull();

    // Step 3: No tooltip element rendered anywhere on the page
    const tooltipVisible = await page.locator('.tooltip, .tippy-box, [role="tooltip"]')
      .isVisible().catch(() => false);
    expect(tooltipVisible).toBe(false);

    // CONCLUSION: Error says "use tooltip" but tooltip provably does not exist.
    // User has NO way to find the valid credentials. Bug #004 confirmed.
  });

  test('TC-038 | BUG-001 PROOF — No auth cookie or session set after login', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.fillEmail('user@sweetshop.com');
    await lp.fillPassword('test1234');
    await lp.clickLogin();

    // No redirect to any account area
    await expect(page).not.toHaveURL(/account/);
    await expect(page).not.toHaveURL(/dashboard/);
    await expect(page).not.toHaveURL(/profile/);

    // No auth-related cookie set
    const cookies = await page.context().cookies();
    const authCookie = cookies.find(c =>
      c.name.toLowerCase().includes('session') ||
      c.name.toLowerCase().includes('auth') ||
      c.name.toLowerCase().includes('token') ||
      c.name.toLowerCase().includes('user')
    );
    expect(authCookie).toBeUndefined();

    // No logged-in UI elements visible
    await expect(page.locator('text=Logout')).not.toBeVisible();
    await expect(page.locator('text=Sign out')).not.toBeVisible();
  });

  // ── SOCIAL MEDIA ICONS — BUG #003 ────────────────────────────────────────

  test('TC-039 | Twitter icon is visible on login page', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyTwitterIconVisible();
  });

  test('TC-040 | Facebook icon is visible on login page', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyFacebookIconVisible();
  });

  test('TC-041 | LinkedIn icon is visible on login page', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.verifyLinkedInIconVisible();
  });

  test('TC-042 | BUG-003 PROOF — All 3 social icons link to # (broken)', async ({ page }) => {
    const socialLinks = page.locator(
      'a:has(img[src*="twitter"]), a:has(img[src*="facebook"]), a:has(img[src*="linkedin"])'
    );
    const count = await socialLinks.count();

    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      const href = await socialLinks.nth(i).getAttribute('href');
      expect(href).toBe('#');
    }
  });

});
