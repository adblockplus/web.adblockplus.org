/**
 * Adblock Plus Premium price table, in minor currency units (cents).
 *
 * NOTE: This table is currently duplicated in four other places:
 *   static/js/premium-checkout-user-accounts.js
 *   static/update/update-user-accounts.js
 *   static/installed/installed-user-accounts.js
 *   static/adblock-plus-premium/adblock-plus-premium-user-accounts.js
 *
 * This module is the intended single source of truth. Those four were left
 * untouched deliberately: they are live payment paths and de-duplicating them
 * belongs in its own change, with the payment suite run against it.
 */

export const PRICES = {
  "USD": { "monthly": 400, "yearly": 4000 },
  "EUR": { "monthly": 350, "yearly": 3500 },
  "CAD": { "monthly": 500, "yearly": 5000 },
  "GBP": { "monthly": 350, "yearly": 3500 },
  "AUD": { "monthly": 600, "yearly": 6000 },
  "NZD": { "monthly": 600, "yearly": 6000 },
  "CHF": { "monthly": 400, "yearly": 4000 },
  "PLN": { "monthly": 1499, "yearly": 14999 },
  "JPY": { "monthly": 600, "yearly": 6000 },
  "RUB": { "monthly": 35000, "yearly": 350000 },
};

/**
 * Currencies whose amounts render long enough to need a smaller price type
 * size (e.g. "¥600", "35 000 ₽", "14,99 zł").
 */
export const LONG_AMOUNT_CURRENCIES = ["JPY", "RUB", "PLN"];

/**
 * Resolve the currency to charge in, falling back to USD when settings.js
 * reports a currency we have no price for.
 *
 * @returns {string} three letter currency code
 */
export function getCurrency() {
  const currency = adblock.settings.defaultCurrency;
  return Object.prototype.hasOwnProperty.call(PRICES, currency) ? currency : "USD";
}

/**
 * Percentage saved by paying yearly rather than twelve months at the monthly
 * rate, rounded down so the figure is never overstated.
 *
 * @param {string} currency - three letter currency code
 * @returns {number} whole percent, e.g. 16
 */
export function getYearlySavingsPercent(currency) {
  const { monthly, yearly } = PRICES[currency];
  return Math.floor((1 - (yearly / 12) / monthly) * 100);
}
