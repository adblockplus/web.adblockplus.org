# adblockplus.org website

## Hosting

This website is hosted on [Firebase](https://console.firebase.google.com/project/www-adblockplus-org/overview). A small number of dynamic endpoints (robots.txt, redirects, locale routing) are handled by a [Cloud Run](https://console.cloud.google.com/) service.

- `services/firebase/firebase.json` — Firebase Hosting config (redirects, rewrites, headers)
- `services/firebase/.firebaserc` — Firebase project aliases (`staging` and `production`)
- `services/cloudrun/index.js` — Cloud Run Express app (dynamic endpoint handlers)
- `services/cloudrun/handlers/` — Individual route handlers (e.g. legacy redirects)

> **Note:** The repository still contains some legacy Apache-era files (`.htaccess` etc.) that are no longer used in production and still require cleaning up.

## Running locally

### Prerequisites

1. Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Install Python 3.9 (required by the CMS). [pyenv](https://github.com/pyenv/pyenv) is recommended:
   ```sh
   pyenv install 3.9
   pyenv local 3.9
   ```
3. Clone the [CMS server](https://gitlab.com/eyeo/websites/cms.git) somewhere on your machine
4. Add it to your Python path, e.g. in your `.zshrc`:
   ```sh
   export PYTHONPATH="$HOME/path/to/cms:$PYTHONPATH"
   ```
5. Install dependencies:
   ```sh
   npm install
   ```

### Start the dev server

```sh
npm run fast
```

This starts the CMS test server on `http://localhost:8000`. Use `127.0.0.1` instead of `localhost` if you have issues on macOS.

> **Note:** `npm run slow` also exists but relies on a legacy Apache setup that is no longer used. You can mostly ignore it.

> **VSCode Dev Container:** A dev container config exists in `.devcontainer/` but is not actively supported. See `.devcontainer/Dockerfile` and `.devcontainer/postcreate.sh` if you want to try it.

## Making changes

### Development workflow

1. Create a branch from `master` and make your changes
2. Push your branch and open a **merge request** in GitLab
3. The CI pipeline will automatically build and deploy a **preview site** on a temporary Firebase Hosting channel — the URL will appear in the MR environment
4. Automated Playwright tests (Chromium + cross-browser) run against the preview URL
5. Review your changes on the preview site before merging

### Deploying to production

Merging to `master` triggers an automatic deployment to **production** (`adblockplus.org`). There is no manual gate — **merge with care**.

The pipeline deploys in this order:
1. Static pages are generated via the CMS
2. The Cloud Run service is deployed (`services/cloudrun/`)
3. Firebase Hosting is updated (`services/firebase/`)

### Rolling back a production change

If a bad change reaches production, create a revert commit and open a merge request so the fix goes through the normal review and preview pipeline:

```sh
git revert <commit-hash>
git push origin my-revert-branch
# then open an MR in GitLab
```

Once the MR is merged to `master`, the pipeline will deploy the reverted state to production. For an immediate static-only rollback, you can also revert to a previous Firebase Hosting release directly from the [Firebase console](https://console.firebase.google.com/project/www-adblockplus-org/hosting), but note that this won't revert Cloud Run changes.

## Country-specific settings

Pages load `/settings.js` (via `includes/late-head-scripts.html`) which sets the visitor's country, default currency, privacy restrictions, and VAT state. Firebase serves a different version of this file per country using its [i18n rewrites](https://firebase.google.com/docs/hosting/i18n-rewrites) feature.

**How it works:**

1. `scripts/generate-settings.mjs` pre-generates a `settings.js` for every country code into `static/ALL_{cc}/settings.js` (e.g. `static/ALL_de/settings.js` hard-codes `country = "DE"`). A fallback is generated at `static/ALL_all/settings.js` with `country = "unknown"`.
2. The `i18n.root` setting in `firebase.json` tells Firebase Hosting to look for country-specific static files in `ALL_{cc}/` subdirectories, selected automatically based on the visitor's IP.
3. The `Cache-Control: no-cache` header on `settings.js` (in `firebase.json`) ensures visitors always get fresh country data.

To regenerate these files after editing the template:

```sh
node scripts/generate-settings.mjs
```

## Event logging

Pages send analytics events to `/access?{params}` via the `adblock.log()` function defined in `includes/scripts/analytics-functions.html`. Each event includes a session ID, page name, locale, and a `logVersion` field (currently `2.1.1`) for schema versioning.

### Example Event types

| Event | Source file | Purpose |
|-------|------------|---------|
| `load` | `includes/scripts/load-tracking.html` | Page load with browser/OS detection, screen size, timing |
| `click` | `includes/scripts/click-tracking.html` | Clicks on `.track-click` or `[data-click]` elements |
| `script-error` | `includes/scripts/error-reporting.html` | JavaScript errors with stack traces |
| `service-error` | `includes/scripts/error-reporting.html` | API/service call failures |
| `experiment.loaded` | `includes/scripts/frontend-experiments.html` | A/B test variant assignments |

### Where the data goes

Request logs from the `/access` endpoint flow through Cloud Logging into [BigQuery](https://console.cloud.google.com/bigquery?project=www-adblockplus-org&ws=) where they can be queried for analytics and debugging. Website events are stored in the `www-adblockplus-org.firebase_hosting_reqs.firebasehosting_googleapis_com_webrequests` table.

### Google Analytics and cookie consent

Google Analytics, Google Tag Manager, and the cookie consent banner are loaded conditionally based on the visitor's country. All pages load `js/testing/setup.js` via `includes/google/analytics.tmpl`. Firebase's i18n rewrites serve different versions of this file per country:

| Region | Countries | Behaviour |
|--------|-----------|-----------|
| EEA/GDPR | AT, BE, BG, CY, CZ, DE, DK, EE, ES, FI, FR, GB, GR, HR, HU, IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO, SE, SI | No tracking. `setup.js` is replaced with a no-op comment. |
| Default | All other countries (incl. US, AU, CA, NZ) | GA and GTM load immediately. A cookie banner (`js/cookie-prompt.js`) is shown on first visit but tracking starts regardless of consent. |

Key files:
- `static/js/testing/setup.js` — default GA/GTM/cookie-prompt loader
- `static/ALL_{cc}/js/testing/setup.js` — per-country overrides (GDPR countries get a no-op)
- `static/js/cookie-prompt.js` — cookie consent banner UI

> **Note:** The repository also contains `static/js/testing/pre-approved.js` and `includes/pre-approved-analytics.tmpl`. These were part of a three-tier consent system under the legacy Apache setup but are no longer used — `pre-approved-analytics.tmpl` is not included by any template.

Users can opt out via the `eyeo-ga-opt-out` cookie. Individual pages can suppress the banner by setting `prevent_cookie_prompt` in their page attributes.

## Locale translations

The site supports 24 languages configured in `settings.ini` (under `[langnames]`). English (`en`) is the default locale.

### How it works

- Translation strings live in `locales/{locale}/{section}.json` using Chrome i18n JSON format:
  ```json
  {
    "follow-us-header": {
      "message": "Follow us on",
      "description": "Optional context for translators"
    }
  }
  ```
- Templates reference strings with `{{ get_string("key-name", "section") }}` where `section` maps to the JSON filename (e.g. `"footer"` reads from `footer.json`).
- The CMS automatically determines which locales are available for each page based on whether a matching JSON file exists in that locale directory.
- URLs are locale-prefixed (e.g. `/de/download`, `/fr/premium`). The navbar language dropdown is generated from the available locales for the current page.

### Adding or changing translated content

1. Add the English string to `locales/en/{section}.json`
2. Reference it in your template with `get_string("your-key", "section")`
3. Translations for other languages are handled via Crowdin — import/export scripts are in `scripts/`:
   - `scripts/export-locale-from-html.mjs` — export strings for translation
   - `scripts/import-locale-strings.mjs` — import translations from a Crowdin export
   - `scripts/copy-locale-strings.mjs` — copy strings between locales

### RTL support

Arabic (`ar`) and Hebrew (`he`) are configured as right-to-left languages in `settings.ini` under `[rtl]`.

## Templates

The **navbar**, **header**, **toc**, **footer** components mentioned below are optionally disabled via `no${component}` page attributes.

- **minimal**: contains navbar, footer, and no body container. Meant for landing pages.
- **modern**: contains navbar, spaced body container, and footer. Meant for modern content pages.
- **default**: contains navbar, spaced body container, header, toc, and footer. Meant for legacy content pages.
- **fixed-toc**: contains navbar, fixed left toc, content right, header, and footer. Meant for documentation pages.

## Supported query parameters

A "flag" type below counts as "true" regardless of the query param value.

### Sitewide

- `variant` number - experiment variant to apply
- `country` string - 2 letter country code
- `defaultCurrency` string - 3 letter currency code
- `restrictPremium` boolean - used to disable buying premium
- `restrictPrivacy` boolean - used to disable some 3rd party services
- `sid` string - 32 char unique id used to associate access logs with one another
- `s` string - traffic source name for marketing purposes
- `dev` flag - used for development purposes
- `design` flag - used for development purpsoses

#### DE_EXCEPTION

Unless a language is provided in the URL (e.g. via selecting language in the navbar dropdown) `DE_EXCEPTION` is used as part of an exception that forces German language in Germany despite browser preferences.

### Payment pages

- `testmode` flag - changes the payment environment from "live" to "sandbox".
- `has-subscription` string - Fake "prevent duplicate subscription" intervention states and outcomes
    - `yes` - The client will always have a subscription
    - `no` - The client will never have a subscription
    - `error` - The subscription check will always fail
    - `timeout` - The subscription check will always timeout
    - `finding` - Show the subscription finding state
    - `found` - Show the subscription found state

### Update page

- `bc` number - show alternate CTA with block count

### Premium page

- `premium-checkout__handoff` flag - used to communicate premium checkout handoff from one page to another
- `premium-checkout__flow` string - used to name a flow that a premium checkout handoff is completing
- `premium-checkout__page` string - used to name a page that a premium checkout handoff is coming from
- `premium-checkout__product` string - product name being purchased by premium checkout
- `premium-checkout__premiumId` string - unique id for premium subscription (sometimes called userid)
- `premium-checkout__currency` string - 3 letter currency code of premium checkout
- `premium-checkout__frequency` string - premium checkout subscription frequency once|monthly|yearly
- `premium-checkout__amount` number - premium checkout amount in cents
- `premium-checkout__country` string - 2 letter country code from premium checkout
- `premium-checkout__locale` string - 2-5 letter language code from premium checkout
- `premium-checkout__timestamp` number - datetime stamp from premium checkout
- `reenroll` flag - used to show an alternative premium CTA for re-enrolling.

### Installed page

#### Installed data collection

`ap` of `firefox` and `av` of greater or equal to `3.21.1` are used to show a message about data collection to Firefox users on the installed page.

#### Install and activate redirection

When premium is purchased before ABP is installed then `premium-checkout__install` is used to trigger storing values in the browser to cause the post-install page to redirect to the premium activation page.

## Automated tests

### Pipeline test runs

These test jobs run automatically in the GitLab pipeline:
- browser_tests - this is a subset of tests that run for all browsers (Chromium, Edge, Chrome, Safari, and Firefox)
- chromium_tests - this is all of the remaining tests (except third party link and visual regression tests) run on Chromium only

These test jobs are available in the Gitlab pipeline to be manually run as needed:
- platform_tests - this runs a downstream pipeline of https://gitlab.com/eyeo/browser-extensions-and-premium/user-accounts/platform-team-tests and will eventually be phased out
- visual_regression_tests - these compare snapshots of pages against baseline snapshots

Additionally there is a daily scheduled run of all tests on all browsers. Test failures are reported in the `#infrastructure-alerts` Slack channel.

## Investigating pipeline test fails

Can download the artifacts for any test fails and use the trace.zip file from the test-results folder with https://trace.playwright.dev to view detailed results.

### Running tests locally

Initial Playwright installation in Terminal from adblockplus.org folder:
- `npm install`
- `npx playwright install`

Running tests in Terminal from adblockplus.org folder:
- `npx playwright test --project chromium`
- To run on a staging URL: `STAGING=1 STAGING_URL=any_url_here npx playwright test --project chromium`
- Can run the tests on all browsers using simply `npx playwright test`, but this will take longer to run
  - Running on all browsers may also require installation of Chrome/Edge: `npx playwright install chrome msedge`
- Possible projects currently:
  - chromium
  - "Google Chrome"
  - "Microsoft Edge"
  - firefox
  - webkit - this will run tests on Safari

### Available test tags

Can also run tests only for specific tags:
- Run for a specific tag: `npx playwright test --grep @all_browsers`
- Exclude specific tags and only run on Chromium: `npx playwright test --project chromium --grep-invert "@third_party_link|@all_browsers"`

Available tags:
- @all_browsers - these tests have different behavior on different browsers
- @third_party_link - these tests can fail due to third party sites being down
- @visual_regression - compares snapshots for each page against an approved baseline snapshot

## Updating visual regression snapshots

Currently visual regression snapshots are only included in the repository for Linux Chromium. In order to update these snapshots can download the visual_regression_tests:archive artifact after the test job has failed. Rename the actual file to be simply the browser name and then replace the existing file in the linux folder for the page.

If running snapshot tests locally and no existing snapshot exists, Playwright will automatically create the baseline snapshot. These can then be used as the baseline for future runs locally. If running locally and there are snapshot differences and want to confirm new changes can run `npx playwright test --grep @visual_regression --update-snapshots` to update all snapshots for that environment.

For some visual regression tests it can be useful to open the page for a specific country to control changing details such as currency and pricing. Can use the ?country=DE parameter in the URL as shown in premium.spec.js: `await premiumPage.openPage('country=DE');`

## Mocking the extension data

It is possible to mock the extension data for tests that require the extension to be installed. `mockExtensionData` can be found in /test-helpers/extension-helper.js and there is an example of it in use in /premium.spec.js.

Simply use `await ExtensionHelper.mockExtensionData(page, '4.31.0', false);` before opening the page to insert the relevant extension data into the page. You can include any extension version that may be needed, and true or false to indicate whether Premium should be enabled.

Some tests may require full extension installation, for example for links that open extension pages. This is not yet set up for the Adblock Plus website, but the AdBlock website has this enabled as a testWithExtension fixture in extension-helper.js so it would be easy to copy this example for Adblock Plus tests when needed. Mocking the extension data is preferable when suitable for faster test runs.
