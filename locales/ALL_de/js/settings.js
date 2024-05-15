/* global adblock */
if (!adblock.query.has("legal")) {
  adblock.settings.restrictPremium = true;
  if (typeof document.documentElement.dataset != "object" || document.documentElement.dataset.page != "update") {
    document.documentElement.classList.add("restrict-premium");    
  }
}