/* global Paddle, adblock */
import { getDollarString, getDollarNumber } from "../modules/currency.js";
import { checkout } from "../modules/paddle.js";
import { matchHeights } from "../modules/responsive.js";
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

function initReactivationLinks() {
  document.querySelector(".premium-checkout__user-accounts-sign-in-link").addEventListener("click", event => {
    event.preventDefault();
    // Redirect to user accounts portal login flow, which
    // also handles extension reactivation.
    window.location.href = `${USER_ACCOUNTS_DOMAIN}?premium=false&s=abp-w`
  });

  // Show sign-in link
  const oldPremiumReactivationLink = document.querySelector('.premium-plans__already-contributed');
  const newPremiumReactivationLink = document.querySelector('.premium-plans__already-purchased-sign-in');

  if (oldPremiumReactivationLink && newPremiumReactivationLink) {
    oldPremiumReactivationLink.hidden = true;
    newPremiumReactivationLink.hidden = false;
  }
}

initReactivationLinks();

matchHeights(document.querySelectorAll(".price"), 782);

matchHeights(document.querySelectorAll(".description"), 782);

// see placeholder API in includes
document.querySelectorAll(".placeholder").forEach(element => {
  element.classList.remove("placeholder");
});
