/* global adblock */
(function(){
  const AppealForm = adblock.lib.AppealForm;

  const premiumAlert = document.getElementById("what-is-included");
  
  const currencySigns = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "AUD": "$",
    "CAD": "$",
    "CHF": "CHF ",
    "JPY": "¥",
    "RUB": "₽",
    "MXN": "$"
  }

  const config = adblock.config.paddle.products;
  
  function updatePremiumAlert() {
    const { currency,  amount, frequency } = adblock.runtime.appealForm.state();
    let durationMonths;
    let i18nId = frequency;
    let i18nDuration;
    if (frequency == "once") {
      const amountNumerator = parseInt(amount, 10);
      const onceDenominator = parseInt(Object.keys(config[currency].once)[2], 10);
      const monthlyDenominator = parseInt(Object.keys(config[currency].monthly)[0], 10);
      if (amountNumerator < onceDenominator) {
        i18nDuration = Math.floor(amountNumerator / monthlyDenominator);
        i18nId = "x-months";
        durationMonths = i18nDuration;
      } else {
        i18nDuration = Math.floor(amountNumerator / onceDenominator);
        i18nId = i18nDuration === 1 ? "one-year" : "x-years";
        durationMonths = 12 * i18nDuration;
      }
    }
    premiumAlert.hidden = false;
    premiumAlert.querySelectorAll("p").forEach(function(paragraph) {
      if (paragraph.id === i18nId) {
        paragraph.hidden = false;
        const duration = paragraph.querySelector(".duration");
        if (duration && i18nDuration) {
          duration.textContent = i18nDuration;
        }
        paragraph.querySelector(".currency").textContent = currencySigns[currency] || "$";
        paragraph.querySelector(".amount").textContent = amount/100;
      } else {
        paragraph.hidden = true;
      }
    });
    localStorage.setItem("planinfo", JSON.stringify({
      plan: "ME",
      durationMonths
    }));
  }

  document.querySelector(".appeal-form__error").after(premiumAlert);
  
  const events = adblock.runtime.appealForm.events;
  const EVENTS = AppealForm.EVENTS;
  events.on(EVENTS.CHANGE_CURRENCY, updatePremiumAlert);
  events.on(EVENTS.AMOUNT_CHANGE. updateFreePremium);
  events.on(EVENTS.SHOW_MINIMUM_AMOUNT_ERROR, () => {
    premiumAlert.hidden = true;
  });
  events.on(EVENTS.HIDE_MINIMUM_AMOUNT_ERROR, updatePremiumAlert);

  updatePremiumAlert();
})();