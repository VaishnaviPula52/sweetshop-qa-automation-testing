# Sweet Shop — Playwright E2E Automation
**QA Learning Series | Vaishnavi Pula | April 2025**

---

## Project Structure
```
sweetshop-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml      ← CI/CD — GitHub Actions
├── fixtures/
│   └── testData.ts             ← All test data centralised
├── pages/                      ← Page Object Model classes
│   ├── NavigationPage.ts
│   ├── SweetsPage.ts
│   ├── LoginPage.ts
│   ├── BasketPage.ts
│   └── AboutPage.ts
├── tests/                      ← Test specs (one per module)
│   ├── 01_navigation.spec.ts   ← TC-001 to TC-008 + Bug #006 proof
│   ├── 02_sweets.spec.ts       ← TC-011 to TC-024 + Bug #002 proof
│   ├── 03_login.spec.ts        ← TC-026 to TC-042 + Bug #001, #003, #004 proofs
│   ├── 04_basket.spec.ts       ← TC-042 to TC-058
│   └── 05_about.spec.ts        ← TC-059 to TC-060
├── playwright.config.ts        ← Playwright + Allure config
├── package.json
└── README.md
```

---

## Setup & Run

### Prerequisites
- Node.js 18+ (https://nodejs.org — download LTS)

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Install Chromium browser
```bash
npx playwright install chromium
```

### Step 3 — Run all tests
```bash
npm test
```

### Step 4 — View HTML report
```bash
npx playwright show-report
```

---

## Run Options

| Command | What it does |
|---------|-------------|
| `npm test` | Run all tests silently |
| `npx playwright test --headed` | Watch browser run tests |
| `npx playwright test --headed --slow-mo=1000` | Slow motion — 1s between each step |
| `npx playwright test --ui` | Interactive UI dashboard |
| `npx playwright test tests/03_login.spec.ts --headed` | Run one file only |
| `npx playwright show-report` | Open HTML report in browser |
| `npm run test:allure` | Run tests + generate Allure report |

---

## Test Coverage

| Spec File | Module | TC IDs | Tests |
|-----------|--------|--------|-------|
| 01_navigation.spec.ts | Navigation | TC-001 to TC-008 | 9 |
| 02_sweets.spec.ts | Sweets / Products | TC-011 to TC-024 | 10 |
| 03_login.spec.ts | Login | TC-026 to TC-042 | 16 |
| 04_basket.spec.ts | Basket | TC-042 to TC-058 | 13 |
| 05_about.spec.ts | About | TC-059 to TC-060 | 2 |
| **TOTAL** | | | **50** |

---

## Bugs Documented by Tests

| Bug ID | Tests | What is Proved |
|--------|-------|----------------|
| BUG-001 | TC-035, TC-036, TC-038 | Login completely broken — no credentials work, no session set |
| BUG-002 | TC-019 | Basket count stays at 0 after Add to Basket |
| BUG-003 | TC-042 | All 3 social media icons link to # |
| BUG-004 | TC-037 | Error references tooltip that does not exist |
| BUG-006 | TC-003b | About nav link has href="/bout" instead of "/about" |

---

## Architecture — Page Object Model

```
Test Spec (.spec.ts)
      ↓  calls methods on
Page Object (.ts in /pages)
      ↓  interacts with
Browser / Sweet Shop App
```

Benefits: locators centralised, tests read like plain English, easy to maintain.

---

## CI/CD — GitHub Actions

Pipeline triggers on every PR to `main` and every push to `main`.

Steps:
1. Checkout code
2. Install Node.js 20
3. npm ci
4. Install Chromium
5. Run all tests
6. Install Java (required for Allure CLI)
7. Generate Allure report
8. Upload Allure report as artifact (kept 30 days)
9. Upload Playwright HTML report (kept 14 days)
10. Upload screenshots/videos on failure (kept 7 days)
