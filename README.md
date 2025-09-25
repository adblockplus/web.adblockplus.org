# adblockplus.org website

This repository contains [VSCode development container](https://code.visualstudio.com/docs/remote/containers) config to help you get started.

If you prefer not to use VSCode or Docker then you can see `.devcontainer/Dockerfile` and `.devcontainer/postcreate.sh` for config and build instructions.

There are two ways to "run" this website:

1. The "fast" way: via eyeo/cms development test server
    - clone [cms server](https://gitlab.com/eyeo/websites/cms.git) 
    - in your `.zshrc` set path to your cms project `export PYTHONPATH="$HOME/<path>/cms:$PYTHONPATH"`
    - `npm run fast`
1. The "slow" way: via apache2
    - `npm run slow`

.htaccess features (e.g. redirect, geoip) only work the "slow" way.

Try `127.0.0.1` if `localhost` doesn't work (effects the fast way on macOS).

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
- `has-subscription` string - Fake "prevent duplicate subscirption" intervention states and outcomes
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
- `reenroll` flag - used to show an alternative premium CTA for reenrolling.

### Installed page

#### Installed data collection

`ap` of `firefox` and `av` of greater or equal to `3.21.1` are used to show a message about data collection to Firefox users on the installed page.

#### Install and activate redirection

When premium is purchased before ABP is installed then `premium-checkout__install` is used to trigger storing values in the browser to cause the post-install page to redirect to the premium activation page.

## Automated tests

### Pipeline test runs

The following test jobs run in the GitLab pipeline:
- all_browsers - this is a subset of tests that run for all browsers (Chromium, Edge, Chrome, Safari, and Firefox)
- chromium_tests - this is all of the remaining tests (except third party link tests) run on Chromium only
- platform_tests - this runs a downstream pipeline of the https://gitlab.com/eyeo/browser-extensions-and-premium/user-accounts/platform-team-tests and will eventually be phased out

Additionally there is a daily scheduled run of all tests on all browsers.

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
  - firefox
  - webkit - this will run tests on Safari

### Available test tags

Can also run tests only for specific tags:
- Run for a specific tag: `npx playwright test --grep @all_browsers`
- Exclude specific tags and only run on Chromium: `npx playwright test --project chromium --grep-invert "@third_party_link|@all_browsers"`

Available tags:
- @all_browsers - these tests have different behaviour on different browsers
- @third_party_link - these tests can fail due to third party sites being down
