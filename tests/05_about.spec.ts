// tests/05_about.spec.ts
// TC-059 to TC-060 | Group G-06

import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/AboutPage';
import { pageContent } from '../fixtures/testData';

test.describe('About Page — TC-059 to TC-060', () => {

  test('TC-059 | About page loads with correct heading', async ({ page }) => {
    const ap = new AboutPage(page);
    await ap.goto();
    await ap.verifyLoaded();
    await ap.verifyHeadingContains(pageContent.aboutTitle);
  });

  test('TC-060 | Promotional banner is visible on about page', async ({ page }) => {
    const ap = new AboutPage(page);
    await ap.goto();
    await ap.verifyLoaded();
    await ap.verifyPromoBannerVisible();
  });

});
