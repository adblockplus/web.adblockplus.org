
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.
adblock.settings.country = "TF";
adblock.settings.defaultCurrency = "USD";
adblock.settings.restrictPrivacy = false;
adblock.settings.restrictPremium = false;
const docList = document.documentElement.classList;
docList.add(adblock.settings.country);
if (adblock.settings.restrictPrivacy) docList.add("restrict-privacy");
if (adblock.settings.restrictPremium) docList.add("restrict-premium");

