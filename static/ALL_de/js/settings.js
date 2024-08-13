/* global adblock */

// LEGAL REQUIREMENT: Anything we sell in Germany must be sold in German
// unless the language is explicitly changed by the user
//
// TECHNICAL CAVEAT: This will only work if/when we use paths without language
// e.g. /premium instead of /en/premium. If we stop doing that by default then
// another workaround will need to be developed.
if (window.location.pathname.split("/").length <= 2 && document.documentElement.lang != "de") {
  window.location.href = `${window.location.origin}/de${window.location.pathname}${window.location.search}`;
}

// LEGAL REQUIREMENT: Anything we sell in Germany must be sold in EUR
// unless the currency is explicitly changed by the user
adblock.settings.defaultCurrency = "EUR";