
export function getNumber(string) {
  return getAccountingNumber(parseFloat(string.replace(/\D/g, "").trim()));
}

export function getAccountingNumber(number) {
  return parseFloat(parseFloat(number).toFixed(2));
}

export function getDollarNumber(currency, centAmountString) {
  const centAmountNumber = parseInt(centAmountString, 10);
  return currency == "JPY" ? centAmountNumber : getAccountingNumber(centAmountNumber / 100);
}

export function getCentNumber(currency, dollarString) {
  const dollarNumber = getAccountingNumber(dollarString);
  return currency == "JPY" ? dollarNumber : getAccountingNumber(dollarNumber * 100);
}

export function getDollarString(currency, centAmountString, showTrailingZeros = false, narrowSymbol = true) {
  const dollarNumber = getDollarNumber(currency, centAmountString);
  const formatOptions = {
    style: 'currency',
    currency: currency,
  };
  if (narrowSymbol) formatOptions.currencyDisplay = 'narrowSymbol';
  if (!showTrailingZeros && dollarNumber % 1 == 0) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }
  return new Intl.NumberFormat(adblock.settings.locale.replace("_", "-"), formatOptions).format(dollarNumber);
}
