/* global Paddle, adblock */
import { getDollarString } from "../shared/currency.js";
import { checkout } from "../shared/checkout.js"
import "../shared/premium-difference.js";

adblock.config = adblock.config || {};

const PRICES = {
  USD: {
    monthly: 400,
    yearly: 4000,
  },
  EUR: {
    monthly: 400,
    yearly: 4000,
  },
  CAD: {
    monthly: 400,
    yearly: 4000,
  },
  GBP: {
    monthly: 400,
    yearly: 4000,
  },
  AUD: {
    monthly: 400,
    yearly: 4000,
  },
  NZD: {
    monthly: 400,
    yearly: 4000,
  },
  CHF: {
    monthly: 400,
    yearly: 4000,
  },
  PLN: {
    monthly: 1499,
    yearly: 14999,
  },
  JPY: {
    monthly: 600,
    yearly: 6000,
  },
  RUB: {
    monthly: 35000,
    yearly: 350000,
  }
};

const defaultCurrency = adblock.query.get("currency") || adblock.settings.currency || "USD";

document.querySelectorAll(".update-premium-checkout-button").forEach(button => {
  button.addEventListener("click", () => {
    const product = "premium";
    const currency = defaultCurrency;
    const frequency = button.dataset.frequency;
    const amount = PRICES[currency][frequency];
    checkout({product, currency, frequency, amount});
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
  document.querySelector(".update-header-section-1__heading--with-block-count .ads-blocked")
  .textContent = new Intl.NumberFormat(navigator.language).format(blockCount);
  document.documentElement.classList.add("--has-block-count");
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