(function(){
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.
adblock.settings.country = "IS";
adblock.settings.defaultCurrency = "EUR";
adblock.settings.restrictPrivacy = true;
adblock.settings.restrictPremium = false;
const docList = document.documentElement.classList;
docList.add(adblock.settings.country);
if (adblock.settings.restrictPrivacy) docList.add("restrict-privacy");
if (adblock.settings.restrictPremium) docList.add("restrict-premium");

})();