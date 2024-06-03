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

export function getDollarNumber(currency, centAmountString) {
  const centAmountNumber = parseInt(centAmountString, 10);
  return currency == "JPY" ? centAmountNumber : centAmountNumber / 100;
}

export function getCentNumber(currency, dollarString) {
  const dollarNumber = parseFloat(dollarString);
  return currency == "JPY" ? dollarNumber : dollarNumber * 100;
}

export function getDollarString(currency, centAmountString) {
  const dollarNumber = getDollarNumber(currency, centAmountString);
  const formatOptions = {
    style: 'currency', 
    currency: currency, 
    currencyDisplay: 'narrowSymbol'
  };
  if (dollarNumber % 1 === 0) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }
  const language = String(document.documentElement.lang) || "en";
  return new Intl.NumberFormat(language.replace("_", "-"), formatOptions).format(dollarNumber);
}