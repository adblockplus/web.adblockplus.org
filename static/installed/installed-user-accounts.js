/* global Paddle, adblock */
import { getDollarString, getDollarNumber } from "../modules/currency.js";
import { checkout } from "../modules/paddle.js";
import { fireGAConversionEvent } from "../modules/conversion.js";

const paddleEnvironment = location.hostname == "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

const USER_ACCOUNTS_DOMAIN = paddleEnvironment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

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
  document.querySelector(".installed-header-1-subheading__frequency").innerHTML = (adblock.strings[`installed-header-subheading__frequency--${getSelectedFrequency()}`])
}

// set option prices
document.querySelectorAll(".installed-payment-option__price").forEach(price => {
  price.textContent = getDollarString(defaultCurrency, PRICES[defaultCurrency][price.parentElement.dataset.frequency], false, false);
});

// set yearly discount
document.getElementById("discount__number").textContent = Math.floor((1 - (PRICES[defaultCurrency]["yearly"] / (PRICES[defaultCurrency]["monthly"] * 12))) * 100) + "%";

updateHeaderPrice();
updateHeaderFrequency();

// see placeholder api in includes
document.querySelectorAll(".placeholder").forEach(element => {
  element.classList.remove("placeholder");
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
  checkout({
    product,
    currency,
    frequency,
    amount,
    settings: {
      successUrl: null // override successUrl as we want to redirect with transaction ID / email from post purchase.
    }
  });
});

adblock.on("checkout.completed", async (data) => {
  if (!data.transaction_id || !data.customer.email) {
    return;
  }

  /**
   * Show the account loading spinner. Ideally we could separate out
   * the spinner from the duplicate subscription CSS into its own
   * component. But for now we can re-use it.
   */
  try {
    const accountRestore = document.getElementById("account-restore");

    if (accountRestore) {
      document.documentElement.dataset.account = "finding";
      document.body.appendChild(document.getElementById(accountRestore));
    }
  } catch (e) {
    // do nothing
  }

  // Send purchase data to GA is present
  try {
    const frequency = data.custom_data.sub_type;
    const currency = data.custom_data.currency;
    const amount = data.custom_data.amount_cents;

    if (frequency && currency && amount) {
      const value = getDollarNumber(currency, amount) + "";
      fireGAConversionEvent(frequency, currency, value);
    }
  } catch (e) {
    // do nothing
  }

  // Forward transaction ID / email to user accounts portal.
  const transaction_id = encodeURIComponent(data.transaction_id);
  const email = encodeURIComponent(data.customer.email);
  const successUrl = `${USER_ACCOUNTS_DOMAIN}?transaction_id=${transaction_id}&email=${email}&s=abp-w`;
  window.location.href = successUrl;
});
