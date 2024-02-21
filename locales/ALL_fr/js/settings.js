/* global adblock */
if (!adblock.query.has("legal")) {
  adblock.settings.restrictPremium = true;
  document.documentElement.classList.add("restrict-premium");
}