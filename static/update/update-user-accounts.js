/* global Paddle, adblock */
import { getDollarString, getDollarNumber } from "../modules/currency.js";
import { checkout } from "../modules/paddle.js";
import { fireGAConversionEvent } from "../modules/conversion.js";
import "./premium-difference.js";

const paddleEnvironment = location.hostname == "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

const USER_ACCOUNTS_DOMAIN = paddleEnvironment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

adblock.config = adblock.config || {};

// Set experiment IDs for Paddle checkout tracking
// Read variant directly from localStorage since experiment setup won't run on this page
const variant = localStorage.getItem('EMP');
if (variant) {
   adblock.api.setExperimentId('EMP');
   adblock.api.setExperimentVariantId(variant);
}

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

document.querySelectorAll(".update-premium-checkout-button").forEach((button, index) => {
  const product = "premium";
  const currency = defaultCurrency;
  const frequency = button.dataset.frequency;
  const amount = PRICES[currency][frequency];
  const trigger = `button-${index + 1}`;
  button.dataset.click = JSON.stringify({
    type: "checkout-start",
    currency,
    frequency,
    amount,
    trigger,
  });
  button.addEventListener("click", () => {
    checkout({
      product,
      currency,
      frequency,
      amount,
      trigger,
      settings: {
        successUrl: null // override successUrl as we want to redirect with transaction ID / email from post purchase.
      }
    });
  });
});

document.querySelectorAll(".update-premium-checkout-button-price").forEach(price => {
  const frequency = price.parentElement.dataset.frequency;
  const amount = PRICES[defaultCurrency][frequency];
  price.textContent = getDollarString(defaultCurrency, amount, false, false);
});

document.querySelectorAll(".update-plan-heading-price").forEach(price => {
  const frequency = price.dataset.frequency;
  const amount = PRICES[defaultCurrency][frequency];
  const amountText = getDollarString(defaultCurrency, amount, false, false);
  const amountSignText = amountText.replace(/[\d\,\.]/g, "").trim();
  const amountNumberText = amountText.replace(amountSignText, "").trim();
  price.querySelector(".update-plan-heading-price__final-amount").textContent = amountNumberText;
  price.querySelector(".update-plan-heading-price__final-currency").textContent = amountSignText;
});

// Show block count ////////////////////////////////////////////////////////////

const BLOCK_COUNT_MINIMUM = 1000;
let extensionInfo;
try { extensionInfo = JSON.parse(document.documentElement.dataset.adblockPlusExtensionInfo); }
catch (error) { extensionInfo = {}; }
const blockCount = adblock.query.has("bc") ? parseInt(adblock.query.get("bc"), 10) : extensionInfo.blockCount;
if (blockCount > BLOCK_COUNT_MINIMUM) {
  const adsBlockedContainer = document.querySelector(".update-header-section-1__heading--with-block-count .ads-blocked");

  if (adsBlockedContainer) {
    adsBlockedContainer.textContent = new Intl.NumberFormat(navigator.language).format(blockCount);
    document.documentElement.classList.add("--has-block-count");
  }
}

// Fix plan discount height across languages ///////////////////////////////////

const desktopWidthMediaQuery = window.matchMedia(`(min-width: 992px)`);
const plan1Discount = document.querySelector(".update-plan-1-discount");
const plan2 = document.querySelector(".update-plan-2");
function fixDiscountHeight() {
  if (desktopWidthMediaQuery.matches && plan2.style.marginTop != plan1Discount.offsetHeight) {
    plan2.style.marginTop = plan1Discount.offsetHeight + "px";
  } else if (plan2.style.marginTop != 0) {
    plan2.style.marginTop = 0;
  }
}
window.addEventListener("resize", fixDiscountHeight);
fixDiscountHeight();

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

// Hide placeholders //////////////////////////////////////////////////////////////

// see placeholder API in includes
document.querySelectorAll(".placeholder").forEach(element => {
  element.classList.remove("placeholder");
});
