(function(){
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.
adblock.settings.country = "FR";
adblock.settings.defaultCurrency = "EUR";
adblock.settings.restrictPrivacy = true;
adblock.settings.restrictPremium = true;
const docList = document.documentElement.classList;
docList.add(adblock.settings.country);
if (adblock.settings.restrictPrivacy) docList.add("restrict-privacy");
if (adblock.settings.restrictPremium) docList.add("restrict-premium");

})();