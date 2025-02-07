(()=>{
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.
const documentClassList = document.documentElement.classList;

const country = adblock.settings.country = adblock.query.get("country") || "SX";
documentClassList.add(adblock.settings.country.toLowerCase());

const eurCountries = ["AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","ME","MT","NL","NO","PL","PT","RO","SE","SI","SK","XK"];

adblock.settings.restrictPrivacy = adblock.query.get("restrictPrivacy") || eurCountries.includes(country);
if (adblock.settings.restrictPrivacy) documentClassList.add("restrict-privacy");

const uniqueCurrencies = {"AU":"AUD","CA":"CAD","CH":"CHF","GB":"GBP","JP":"JPY","NZ":"NZD","RU":"RUB"};
adblock.settings.defaultCurrency = adblock.query.get("defaultCurrency") || uniqueCurrencies[country] || (eurCountries.includes(country) ? "EUR" : "USD");

const vatInclusiveCurrencies = ["GBP","EUR","PLN","CHF"];
adblock.api.updateVATState = currency => {
  if (eurCountries.includes(country)) {
    if (vatInclusiveCurrencies.includes(currency)) {
      documentClassList.add("vat-inclusive");
      documentClassList.remove("vat-exclusive");
    } else {
      documentClassList.add("vat-exclusive");     
      documentClassList.remove("vat-inclusive");
    }
  } else {
    documentClassList.remove("vat-exclusive");
    documentClassList.remove("vat-inclusive");
  }
}
adblock.api.updateVATState(adblock.settings.defaultCurrency);

// EXCEPTION: Redirect all DE country to DE language when language is not specified; overriding browser preferred language.
if (country == "DE") {
  const pathSplit = location.pathname.split("/");
  const pathLanguage = /^[a-z]{2}[-_]{0,1}[A-Z]{0,2}$/.test(pathSplit[1]) ? pathSplit[1] : null;
  if (document.documentElement.lang != "de" && pathLanguage == null && adblock.query.has("DE_EXCEPTION") == false) {
    adblock.query.set("DE_EXCEPTION",1);
    location.href = location.origin + "/de" + location.pathname + "?" + adblock.query.toString() + location.hash;
  }
}
})();