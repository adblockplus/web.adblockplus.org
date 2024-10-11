import "/js/vendor/NumberFormat.min.js";
import { getDollarString } from "../shared/currency.js";
import { checkout, checkoutEvents } from "../shared/checkout.js"

const PAYMENT_CONFIG = {
  USD: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  AUD: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  CAD: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  EUR: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  GBP: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  JPY: {
    once: [1500,2000,2500,3500,5000,],
    monthly: [200,300,500,1000,1500,],
    yearly: [1500,2000,2500,3500,5000,],
  },
  NZD: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  CHF: {
    once: [1000,1500,2000,3500,5000,],
    monthly: [199,299,399,499,999,],
    yearly: [1000,1500,2000,3500,5000,],
  },
  RUB: {
    once: [25000,50000,100000,250000,500000,],
    monthly: [15000,25000,40000,50000,100000,],
    yearly: [25000,50000,100000,250000,500000,],
  },
  PLN: {
    once: [3999,5999,7999,13999,19999,],
    monthly: [799,1199,1599,1999,3999,],
    yearly: [3999,5999,7999,13999,19999,],
  },
};

const defaultCurrency = adblock.settings.defaultCurrency || "USD";

const paymentForm = document.querySelector(".installed-payment");
const paymentCurrency = paymentForm.querySelector(".installed-payment-header__select");

function constructPaymentCurrencies() {
  for (const currency in PAYMENT_CONFIG) {
    const option = document.createElement("option");
    option.textContent = currency;
    paymentCurrency.appendChild(option);
  }
  paymentCurrency.value = defaultCurrency;
}
paymentCurrency.innerHTML = "";
constructPaymentCurrencies();

function getSelectedCurrency() {
  return paymentCurrency.value;
}

function getSelectedFrequency(selected) {
  return selected.closest(".installed-payment-frequency").dataset.frequency;
}

function getSelectedAmount(selected) {
  return selected.value;
}

function updatePaymentAmounts(currency) {
  const paymentFrequencies = paymentForm.querySelectorAll(".installed-payment-frequency");
  paymentFrequencies.forEach(paymentFrequency => {
    const frequency = paymentFrequency.dataset.frequency;
    const frequencyAmounts = paymentFrequency.querySelectorAll(".installed-payment-amount--fixed");
    frequencyAmounts.forEach((amountLabel, amountIndex) => {
      const amount = PAYMENT_CONFIG[currency][frequency][amountIndex];
      amountLabel.querySelector(".installed-payment-amount__radio").value = amount;
      amountLabel.querySelector(".installed-payment-amount__text").textContent = getDollarString(currency, amount);
    });
  });
}

updatePaymentAmounts(defaultCurrency);

paymentCurrency.addEventListener("change", () => updatePaymentAmounts(paymentCurrency.value));

paymentForm.addEventListener("submit", event => {
  event.preventDefault();
  const product = "contribution";
  const selected = paymentForm.querySelector(".installed-payment-amount__radio:checked");
  const currency = getSelectedCurrency();
  const frequency = getSelectedFrequency(selected)
  const amount = getSelectedAmount(selected);
  disablePaymentForm();
  checkout({product, currency, frequency, amount});
});

checkoutEvents.on("checkout.closed", enablePaymentForm);

function disablePaymentForm() {
  paymentForm.classList.add("installed-payment--disabled");
  paymentForm.querySelectorAll("input, button").forEach(field => { field.disabled = true; });
}

function enablePaymentForm() {
  paymentForm.classList.remove("installed-payment--disabled");
  paymentForm.querySelectorAll("input, button").forEach(field => { field.disabled = false; });
}

const applicationPlatform = adblock.query.get('ap');
const applicationVersion = adblock.query.get('av');
if (applicationPlatform == "firefox" && /^[0-9]+(\.[0-9])?(\.[0-9])?$/.test(applicationVersion)) {
  const [currentMajor, currentMinor, currentPatch] = applicationVersion.split(".");
  const [startingMajor, startingMinor, startingPatch] = "3.21.1".split(".");
  if (
    currentMajor > startingMajor
    || currentMajor == startingMajor && currentMinor > startingMinor
    || currentMajor == startingMajor && currentMinor == startingMinor && currentPatch >= startingPatch
  ) {
    document.getElementById('fx-data-collection').style.display = 'block';
  }
}