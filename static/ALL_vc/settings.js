(function(){
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.

adblock.settings.country = "VC";
adblock.settings.defaultCurrency = "USD";
adblock.settings.restrictPrivacy = false;
adblock.settings.restrictPremium = false;

const docList = document.documentElement.classList;
docList.add(adblock.settings.country.toLowerCase());
if (adblock.settings.restrictPrivacy) docList.add("restrict-privacy");
if (adblock.settings.restrictPremium) docList.add("restrict-premium");

adblock.settings.VAT_COUNTRIES = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","CH","TR","GB"];
adblock.settings.VAT_CURRENCIES = ["GBP","EUR","PLN","CHF"];
adblock.api.setVATExclusive = currency => {
  if (adblock.settings.VAT_COUNTRIES.includes(adblock.settings.country) && !adblock.settings.VAT_CURRENCIES.includes(currency)) {
    docList.add("vat-exclusive");
  } else {
    docList.remove("vat-exclusive");
  }
}


})();