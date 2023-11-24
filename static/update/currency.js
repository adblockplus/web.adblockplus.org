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
