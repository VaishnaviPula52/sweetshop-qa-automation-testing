// tests/05_about.spec.ts
// TC-060 to TC-061 | Group G-06

import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/AboutPage';
import { pageContent } from '../fixtures/testData';

test.describe('About Page — TC-060 to TC-061', () => {

  test('TC-060 | About page loads with correct heading', async ({ page }) => {
    const ap = new AboutPage(page);
    await ap.goto();
    await ap.verifyLoaded();
    await ap.verifyHeadingContains(pageContent.aboutTitle);
  });

  test('TC-061 | Promotional banner content is present on about page', async ({ page }) => {
    const ap = new AboutPage(page);
    await ap.goto();
    await ap.verifyLoaded();
    await ap.verifyPromoBannerVisible();
  });

});
