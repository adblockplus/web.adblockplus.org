
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.
adblock.settings.country = "DE";
adblock.settings.defaultCurrency = "EUR";
adblock.settings.restrictPrivacy = false;
adblock.settings.restrictPremium = false;
const docList = document.documentElement.classList;
docList.add(adblock.settings.country);
if (adblock.settings.restrictPrivacy) docList.add("restrict-privacy");
if (adblock.settings.restrictPremium) docList.add("restrict-premium");
// EXCEPTION: Redirect all DE country to DE language when language is not specified; overriding browser preferred language.
const pathSplit = location.pathname.split("/");
const pathLanguage = /^[a-z]{2}[-_]{0,1}[A-Z]{0,2}$/.test(pathSplit[1]) ? pathSplit[1] : null;
const pageLanguage = document.documentElement.lang;
if (pageLanguage != "de" && pathLanguage == null) location.href = location.origin + "/de" + location.pathname + location.search + location.hash;

