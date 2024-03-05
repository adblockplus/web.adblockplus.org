path("payment.config", {
  defaultCurrency: 'EUR'
});
if (!adblock.query.has("legal")) {
  document.documentElement.classList.add('de');
}