/** 
 * Cent amount (int) to dollar amount (float) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
export function toDollarNumber(currency, cents) {
  return currency == "JPY" ? cents : cents / 100;
}

/** 
 * Dollar amount (float) to cent amount (int) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} dollar - amount in dollars (for applicable currencies)
 */
export function toCentNumber(currency, dollar) {
  return currency == "JPY" ? dollar : dollar * 100;
}

/** 
 * Cent amount (int) to dollar amount (float) with localised formatting (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
export function toDollarString(currency, cents) {
  return new Intl.NumberFormat(navigator.language, { style: "currency", currency, minimumFractionDigits: 0 }).format(toDollarNumber(currency, cents));
}
