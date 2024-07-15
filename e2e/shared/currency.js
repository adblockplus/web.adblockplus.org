import { getAccountingNumber, getDollarNumber } from "../../static/shared/currency";

export async function formatAmount(page, {locale, currency, centAmount, dollarAmount, narrowSymbol, showTrailingZeros}) {
  let dollarNumber;
  if (centAmount != undefined) dollarNumber = getDollarNumber(currency, centAmount);
  else if (dollarAmount != undefined) dollarNumber = getAccountingNumber(dollarAmount);
  const formatOptions = {
    style: 'currency',
    currency: currency,
  };
  if (narrowSymbol) {
    formatOptions.currencyDisplay = 'narrowSymbol';
  }
  if (!showTrailingZeros && dollarNumber % 1 == 0) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }
  return await page.evaluate(({locale, formatOptions, dollarNumber}) => {
    return new Intl.NumberFormat(locale.replace("_", "-"), formatOptions).format(dollarNumber);
  },{locale, formatOptions, dollarNumber});
}
