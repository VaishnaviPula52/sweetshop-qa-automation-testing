# Sweet Shop — Playwright E2E Automation
**QA Learning Series | Vaishnavi Pula | April 2025**

---

## About This Project

This repository contains the end-to-end automation scripts for the [Sweet Shop](https://sweetshop.netlify.app) web application, built using **Playwright** and **TypeScript** as part of a structured QA learning exercise.

The full QA documentation — including the test plan, test strategy, test cases, defect log, and RTM — lives in a dedicated Google Drive folder and is linked below.

---

## QA Artifacts & Links

> All QA outputs for this project are maintained in a single Google Drive folder. The **Main QA Document** is the single entry point — it contains the test plan, strategy, and direct links to all other artifacts.

| Artifact | Link | Format |
|---|---|---|
| 📋 Main QA Document (Plan, Strategy + all links) | [Open Document](https://docs.google.com/document/d/1JEEPAi2YdHGHvdxhvKWjpzN9fnDE83rweK0LITLA0CQ/edit?usp=drive_link) | Google Doc |
| 📁 QA Drive Folder (all artifacts) | [Open Folder](https://drive.google.com/drive/folders/1tvM3iJ6DrtE_Zq561hvlZW8wZfb4l-Rv?usp=sharing) | Google Drive |
| 🧪 Test Cases | Linked inside Main QA Document | Google Sheets |
| 🐛 Defect Log | Linked inside Main QA Document | Google Sheets |
| 🗺️ RTM (Requirements Traceability Matrix) | Linked inside Main QA Document | Google Sheets |
| 📄 Automation Limitations | Linked inside Main QA Document | Google Doc |
| 💻 Automation Scripts | This repository | GitHub |

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
| 01_navigation.spec.ts | Navigation | TC-001 to TC-008, TC-003b | 9 |
| 02_sweets.spec.ts | Sweets / Products | TC-011 to TC-024 | 12 |
| 03_login.spec.ts | Login | TC-026 to TC-042 | 17 |
| 04_basket.spec.ts | Basket | TC-043 to TC-059 | 15 |
| 05_about.spec.ts | About | TC-060 to TC-061 | 2 |
| **TOTAL** | | | **55** |

---

## Bugs Documented by Tests

| Bug ID | Tests | Status | What is Proved |
|--------|-------|--------|----------------|
| BUG-001 | TC-035, TC-036, TC-038 | OPEN | Login completely broken — no credentials work, no session set |
| BUG-003 | TC-042 | OPEN | All 3 social media icons link to # |
| BUG-004 | TC-037 | OPEN | Error references tooltip that does not exist |
| BUG-002 | TC-019 | FIXED | Basket count now updates correctly after Add to Basket |
| BUG-005 | TC-049 | FIXED | Invalid promo code now shows validation error |
| BUG-006 | TC-003b | FIXED | About nav link href corrected to /about |

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


