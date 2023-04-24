import { toIntlLanguage } from "../languages.js";

export const toDollarNumber = (currency, cents) => currency == "JPY" ? cents : cents / 100;

export const toDollarString = (language, currency, cents) => {
  const options = {
    style: "currency", 
    currency, 
    minimumFractionDigits: 0
  };  
  return new Intl.NumberFormat(toIntlLanguage(language), options).format(
    toDollarNumber(currency, cents)
  );
};
