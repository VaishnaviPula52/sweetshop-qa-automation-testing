// tests/01_navigation.spec.ts
// TC-001 to TC-008, TC-003b | Group G-02

import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { urls } from '../fixtures/testData';

test.describe('Navigation — TC-001 to TC-008, TC-003b', () => {

  test('TC-001 | Home page loads with correct title', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.home);
    // Sweet Shop title — not SauceDemo
    await expect(page).toHaveTitle(/Sweet Shop/i);
  });

  test('TC-002 | Sweets nav link navigates to sweets page', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.home);
    await nav.clickSweets();
    await expect(page).toHaveURL(/sweets/);
  });

  test('TC-003 | About nav link navigates to about page', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.home);
    await nav.clickAbout();
    await expect(page).toHaveURL(/about/);
  });

  test('TC-004 | Login nav link navigates to login page', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.home);
    await nav.clickLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('TC-005 | Basket nav link navigates to basket page', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.home);
    await nav.clickBasket();
    await expect(page).toHaveURL(/basket/);
  });

  test('TC-006 | Logo navigates to home page from sweets', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.sweets);
    await nav.clickLogo();
    await expect(page).toHaveURL(/sweetshop\.netlify\.app\/?$/);
  });

  test('TC-007 | Logo navigates to home page from login', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.login);
    await nav.clickLogo();
    await expect(page).toHaveURL(/sweetshop\.netlify\.app\/?$/);
  });

  test('TC-008 | Basket shows 0 items on fresh session', async ({ page }) => {
    const nav = new NavigationPage(page);
    await nav.goTo(urls.home);
    // Navbar basket link shows "0 Basket" on fresh load
    await expect(page.locator('a[href="/basket"]')).toContainText('0 Basket');
  });

  test('TC-003b | About nav link href is /about', async ({ page }) => {
    await page.goto('/');
    const aboutHref = await page.locator('a:has-text("About")').first().getAttribute('href');
    expect(aboutHref).toBe('/about');
  });

});
