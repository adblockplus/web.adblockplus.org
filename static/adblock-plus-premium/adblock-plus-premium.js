/* global Paddle, adblock */
import { getDollarString } from "../modules/currency.js";
import { checkout } from "../modules/checkout.js";
import { matchHeights } from "../modules/responsive.js";

const PRICES = {
  "USD": {
    "monthly": 400,
    "yearly": 4000,
  },
  "EUR": {
    "monthly": 350,
    "yearly": 3500,
  },
  "CAD": {
    "monthly": 500,
    "yearly": 5000,
  },
  "GBP": {
    "monthly": 350,
    "yearly": 3500,
  },
  "AUD": {
    "monthly": 600,
    "yearly": 6000,
  },
  "NZD": {
    "monthly": 600,
    "yearly": 6000,
  },
  "CHF": {
    "monthly": 400,
    "yearly": 4000,
  },
  "PLN": {
    "monthly": 1499,
    "yearly": 14999,
  },
  "JPY": {
    "monthly": 600,
    "yearly": 6000,
  },
  "RUB": {
    "monthly": 35000,
    "yearly": 350000,
  }
};

// CAUTION: These need to be added to and retrieved from the page to be translated
const FREQUENCY_STRINGS = {
  "monthly": "Billed Monthly",
  "yearly": "Billed Annually",
};

const defaultCurrency = adblock.settings.defaultCurrency || "USD";

let frequency = "yearly";

const amountText = getDollarString(defaultCurrency, PRICES[defaultCurrency]["yearly"]/12, false, false);
const amountSignText = amountText.replace(/[\d\,\.]/g, "").trim();
const amountNumberText = amountText.replace(amountSignText, "").trim();
document.getElementById("header-amount").textContent = getDollarString(defaultCurrency, PRICES[defaultCurrency]["monthly"], false, false);
document.getElementById("price-amount").textContent = amountNumberText;
document.getElementById("price-sign").textContent = amountSignText;
document.querySelectorAll(".plan-savings").forEach(element => {
  element.textContent = Math.round((1 - (PRICES[defaultCurrency]["yearly"] / (PRICES[defaultCurrency]["monthly"] * 12)))*100) + "%";
});

function updateFrequency(value) {
  if (value) frequency = value
  else frequency = frequency == "yearly" ? "monthly" : "yearly";
  document.getElementById("billed-frequency").textContent = FREQUENCY_STRINGS[frequency];
  document.getElementById("frequency-switch").dataset.frequency = frequency;
  const amountText = getDollarString(
    defaultCurrency, 
    frequency == "yearly" 
      ? PRICES[defaultCurrency]["yearly"]/12
      : PRICES[defaultCurrency]["monthly"], 
    false, 
    false
  );
  const amountNumberText = amountText.replace(amountSignText, "").trim();
  document.getElementById("price-amount").textContent = amountNumberText;
}

document.getElementById("frequency-switch-monthly").addEventListener("click", event => {
  updateFrequency(event.target.tagName == "A" ? "monthly" : false);
});

document.getElementById("frequency-switch-yearly").addEventListener("click", event => {
  updateFrequency(event.target.tagName == "A" ? "yearly" : false);
});

document.querySelectorAll(".cta").forEach(button => {
  button.addEventListener("click", () => {
    const product = "premium";
    const currency = defaultCurrency;
    const amount = PRICES[currency][frequency];
    checkout({product, currency, frequency, amount});
  });
});

matchHeights(document.querySelectorAll(".price"), 782);

matchHeights(document.querySelectorAll(".description"), 782);

// see skeleton API in globals
document.querySelectorAll(".skeleton").forEach(element => {
  element.classList.remove("skeleton");
});