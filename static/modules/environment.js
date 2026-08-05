/* global adblock */
// requires scripts/namespace

/**
 * Which backend environment this page load talks to.
 *
 * Paddle (its client token, sandbox mode and price IDs), the user accounts
 * portal and the user accounts API have to agree within a single page load: a
 * checkout completed against sandbox Paddle can only hand its transaction ID to
 * the QA portal, and a live one only to production. Resolving the switch a
 * second time in a page script is how they come to disagree, so import it here.
 *
 * NOTE: this switch is currently duplicated in five other places:
 *   static/js/premium-checkout-user-accounts.js
 *   static/js/prevent-duplicate-subscription-user-accounts.js
 *   static/update/update-user-accounts.js
 *   static/installed/installed-user-accounts.js
 *   static/adblock-plus-premium/adblock-plus-premium-user-accounts.js
 *
 * This module is the intended single source of truth. Those five were left
 * untouched deliberately: they are live payment paths and de-duplicating them
 * belongs in its own change, with the payment suite run against it. All five
 * currently agree with the value below. `initLoginButton()` in static/js/main.js
 * carries a sixth copy that has to stay hand-kept — it is a classic script, so
 * it cannot import.
 */
export const paddleEnvironment = location.hostname === "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

/** User accounts portal — where a completed checkout hands off. */
export const USER_ACCOUNTS_BASE_URL = paddleEnvironment === "live"
  ? "https://myaccount.adblockplus.org/"
  : "https://abp.ua-qa.eyeo.it/";

/** User accounts API, e.g. the active subscription lookup. */
export const USER_ACCOUNTS_API_BASE_URL = paddleEnvironment === "live"
  ? "https://api.ua.eyeo.it/"
  : "https://api.ua-qa.eyeo.it/";
