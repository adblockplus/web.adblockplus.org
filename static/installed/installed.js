/* global Paddle, adblock */
import { getDollarString } from "../modules/currency.js";
import { checkout } from "../modules/checkout.js"

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

const defaultCurrency = adblock.settings.defaultCurrency || "USD";

function getSelectedFrequency() {
  return document.querySelector(".installed-payment-option__button[aria-pressed=\"true\"]").dataset.frequency;
}

function updateHeaderPrice() {
  const selectedFrequency = getSelectedFrequency();
  document.querySelector(".installed-header-1-subheading__price").textContent = getDollarString(defaultCurrency, PRICES[defaultCurrency][selectedFrequency], false, false);
}

function updateHeaderFrequency() {
  document.querySelector(".installed-header-1-subheading__frequency").textContent = adblock.strings[`installed-header-subheading__frequency--${getSelectedFrequency()}`]
}

// set option prices
document.querySelectorAll(".installed-payment-option__price").forEach(price => {
  price.textContent = getDollarString(defaultCurrency, PRICES[defaultCurrency][price.parentElement.dataset.frequency], false, false);
});

// set yearly discount
document.getElementById("discount__number").textContent = Math.floor((1 - (PRICES[defaultCurrency]["yearly"] / (PRICES[defaultCurrency]["monthly"] * 12))) * 100) + "%";

updateHeaderPrice();
updateHeaderFrequency();

// remove placeholders, see skeleton api in inline-globals
document.querySelectorAll(".skeleton").forEach(element => {
  element.classList.remove("skeleton");
});

document.querySelectorAll(".installed-payment-option__button").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    document.querySelectorAll(".installed-payment-option__button").forEach(button => {
      if (button == event.currentTarget) button.setAttribute("aria-pressed", "true");
      else button.setAttribute("aria-pressed", "false");
    });  
    updateHeaderPrice();
    updateHeaderFrequency();
  });
});

document.getElementById("purchase").addEventListener("submit", event => {
  event.preventDefault();
  const product = "premium";
  const currency = defaultCurrency;
  const frequency = getSelectedFrequency();
  const amount = PRICES[currency][frequency];
  checkout({product, currency, frequency, amount});
});
