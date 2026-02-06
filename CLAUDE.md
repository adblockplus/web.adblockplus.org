# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the adblockplus.org website repository, a static site built using the eyeo CMS (Content Management System) and deployed to Firebase Hosting and Google Cloud Run. The site serves multiple languages, handles premium subscriptions, and includes extensive Playwright-based automated testing.

## Development Setup

### Running the Development Server

**Fast mode (CMS test server):**
```bash
npm run fast
```
- Requires eyeo/cms repository cloned locally
- Set `PYTHONPATH` in your shell config: `export PYTHONPATH="$HOME/<path>/cms:$PYTHONPATH"`
- Access at `http://127.0.0.1:8000` (use 127.0.0.1 if localhost doesn't work on macOS)
- Does NOT support .htaccess features (redirects, geoip)

**Slow mode (Apache2):**
```bash
npm run slow
```
- Generates static pages and runs via Apache2
- Supports all .htaccess features (redirects, geoip)
- Access at configured Apache port

### Testing

**Initial setup:**
```bash
npm install
npx playwright install
```

**Run tests:**
```bash
# All tests on Chromium (excludes third-party and visual regression)
npx playwright test --project chromium --grep-invert "@third_party_link|@all_browsers|@visual_regression"

# All browser tests (tests that differ across browsers)
npx playwright test --grep @all_browsers

# Specific browser
npx playwright test --project firefox
npx playwright test --project webkit  # Safari
npx playwright test --project "Google Chrome"
npx playwright test --project "Microsoft Edge"

# All tests on all browsers (slow)
npx playwright test

# Run on staging URL
STAGING=1 STAGING_URL=any_url_here npx playwright test --project chromium
```

**Available test tags:**
- `@all_browsers` - Tests with browser-specific behavior
- `@third_party_link` - Tests that can fail due to external sites
- `@visual_regression` - Screenshot comparison tests

**Visual regression tests:**
```bash
# Run visual regression tests
npx playwright test --grep @visual_regression

# Update snapshots after intentional UI changes
npx playwright test --grep @visual_regression --update-snapshots
```

**Debugging test failures:**
- Download artifacts from failed GitLab pipeline jobs
- Use trace.zip from test-results folder at https://trace.playwright.dev

### Other Scripts

```bash
npm run rename-service-ids  # Rename service IDs in Firebase config
```

## Architecture

### CMS-Based Static Site Generation

This website uses the eyeo CMS system (https://gitlab.com/eyeo/websites/cms.git) to generate static HTML from:
- **Pages** (`pages/`) - Content pages (.html, .md, .tmpl files)
- **Templates** (`templates/`) - Layout templates (default.tmpl, minimal.tmpl, modern.tmpl, fixed-toc.tmpl, raw.tmpl)
- **Includes** (`includes/`) - Reusable components (navbar, footer, header, scripts, etc.)
- **Locales** (`locales/`) - Translation JSON files organized by language code
- **Static assets** (`static/`) - JS, CSS, images, fonts

The build process (via `python3 -m cms.bin.generate_static_pages`) generates the final site into `services/firebase/public/`.

### Template System

Four main templates with optional components controlled by `no${component}` page attributes:
- **minimal** - navbar, footer, no body container (for landing pages)
- **modern** - navbar, spaced body container, footer (for modern content pages)
- **default** - navbar, header, toc, body container, footer (for legacy content pages)
- **fixed-toc** - navbar, fixed left toc, content right, header, footer (for documentation)

### Deployment Architecture

**Environments:**
- **production/** - Live site at adblockplus.org (deployed from master)
- **staging/** - Staging copy (deployed from master to Firebase dev project)
- **review/** - Feature branch previews via Firebase Hosting preview channels

**Deployment flow:**
1. Build static site with CMS
2. Deploy to Firebase Hosting
3. Deploy backend services to Google Cloud Run
4. Firebase rewrites route dynamic requests to Cloud Run (service IDs are renamed to branch name at deploy time)

**Key directories:**
- `services/firebase/` - Firebase Hosting configuration and utils
- `services/cloudrun/` - Google Cloud Run backend services

### JavaScript Architecture

- **Main entry point:** `static/js/main.js`
- **Page-specific JS:** `static/js/pages/`
- **Utilities:** `static/js/utils/`
- **Vendor libraries:** `static/js/vendor/`
- **Key modules:**
  - `premium-checkout.js` - Premium subscription checkout flow
  - `premium-checkout-user-accounts.js` - User account integration
  - `prevent-duplicate-subscription.js` - Subscription management
  - `install-button.js` - Browser-specific extension install handling

### Testing Utilities

**Extension mocking:**
```javascript
import { ExtensionHelper } from './test-helpers/extension-helper.js';
await ExtensionHelper.mockExtensionData(page, '4.31.0', false);  // version, isPremium
```

**Test page helpers:**
- `test-helpers/extension-helper.js` - Mock extension data for tests
- `test-helpers/visual-regression-helper.js` - Visual regression test utilities
- `test-pages/` - Test-specific page variants

## Configuration Files

- **settings.ini** - CMS configuration (site URL, locales, subscriptions repo)
- **playwright.config.js** - Test configuration
- **.gitlab-ci.yml** - CI/CD pipeline definition
- **localhost.conf** - Local Apache configuration

## Important Query Parameters

**Sitewide:**
- `variant` - Experiment variant to apply
- `country` - 2-letter country code override
- `defaultCurrency` - 3-letter currency code
- `restrictPremium` - Disable buying premium
- `restrictPrivacy` - Disable some 3rd party services
- `sid` - Session ID for log correlation
- `s` - Traffic source for marketing
- `dev` - Development mode flag
- `design` - Design mode flag

**Premium/Payment pages:**
- `testmode` - Use sandbox payment environment
- `has-subscription` - Mock subscription states (yes/no/error/timeout/finding/found)
- `premium-checkout__*` - Premium checkout flow parameters (handoff, flow, page, product, premiumId, currency, frequency, amount, country, locale, timestamp)
- `reenroll` - Show alternative CTA for re-enrollment

**Special behaviors:**
- `DE_EXCEPTION` - Forces German language in Germany unless language explicitly selected

## CI/CD Pipeline

**Automated test jobs:**
- `browser_tests` - Subset of tests on all browsers (Chromium, Edge, Chrome, Safari, Firefox)
- `chromium_tests` - All remaining tests (except third-party/visual) on Chromium only
- `all_website_tests` - Full test suite on all browsers (scheduled daily)

**Manual test jobs:**
- `platform_tests` - Downstream pipeline for platform team tests
- `visual_regression_tests` - Screenshot comparison tests

## Language and Localization

**Supported locales:** ar, bg, cs, de, en, es, es_MX, fr, el, he, hu, it, ja, ko, lt, nl, ms, pl, pt, pt_BR, ru, sk, tr, th, vi, zh_CN, zh_TW

**RTL languages:** ar, he

**Locale structure:**
- Translations stored in `locales/<lang>/<page>.json`
- Crowdin project: `webadblockplusorg`
- Default locale: en

## Key Development Notes

- The website requires Python (CMS), Node.js (build tools), and optionally Apache2
- Static assets organized by country code in `static/ALL_*` directories for geo-targeting
- Premium subscription flow integration with user accounts system
- Extension detection via `data-adblock-plus-extension-info` attribute on html element
- Firefox users on v3.21.1+ see data collection message on installed page
