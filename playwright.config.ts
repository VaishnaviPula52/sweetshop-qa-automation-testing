import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir:       './tests',
  fullyParallel: false,
  forbidOnly:    !!process.env.CI,
  retries:       process.env.CI ? 1 : 0,
  workers:       1,

  reporter: [
    ['list'],
    ['html',  { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail:       true,
      outputFolder: 'allure-results',
      suiteTitle:   true,
    }],
  ],

  use: {
    baseURL:           'https://sweetshop.netlify.app',
    screenshot:        'only-on-failure',
    video:             'retain-on-failure',
    trace:             'on-first-retry',
    viewport:          { width: 1280, height: 720 },
    actionTimeout:     10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
  ],

  timeout: 60_000,
  expect:  { timeout: 5_000 },
});
