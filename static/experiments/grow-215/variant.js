/* global Paddle, adblock */
import { getDollarString } from "../../modules/currency.js";
import { checkout } from "../../modules/paddle.js"
import "../../update/premium-difference.js";

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
const modal = document.getElementById("variant-1");
modal.querySelector(".inline-checkout-modal__close").addEventListener("click", () => {
  modal.hidden = true;
  delete document.documentElement.dataset.account;
  const contentContainer = document.getElementById("inline-checkout-content");
  if (contentContainer) contentContainer.classList.add("placeholder");
  const paddleIframe = document.querySelector(".paddle-frame-inline");
  if (paddleIframe) paddleIframe.hidden = false;

  adblock.trigger("checkout.closed");
  adblock.log("checkout.closed");
})

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

document.querySelectorAll(".update-premium-checkout-button").forEach((button, index) => {
  const frequency = button.dataset.frequency;
  const currency = defaultCurrency;
  const amount = PRICES[currency][frequency];
  const trigger = `button-${index + 1}`;

  button.dataset.click = JSON.stringify({
    type: "checkout-start",
    currency,
    frequency,
    amount,
    trigger,
  });

  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Show modal
    modal.hidden = false;

    checkout({
      product: "premium",
      currency,
      frequency,
      amount,
      trigger,
      settings: {
        displayMode: "inline",
        variant: "one-page",
        frameTarget: "inline-checkout-form",
        frameInitialHeight: "450",
        frameStyle: "width: 100%; min-width: 312px; background-color: transparent; border: none; zoom: 0.8;"
      }
    });
  });
});

function formatAmount({amount, trailingZeros = false, narrowSymbol = true}) {
  const formatOptions = {
    style: 'currency',
    currency: defaultCurrency,
  };
  if (narrowSymbol) formatOptions.currencyDisplay = 'narrowSymbol';
  if (trailingZeros == false && amount % 1 == 0) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }
  return new Intl.NumberFormat(
    adblock.settings.locale.replace("_", "-"),
    formatOptions
  ).format(amount);
}

const isTaxInclusive = !!document.documentElement.classList.contains("vat-inclusive");

function updateTotals(data) {
  console.log("updateTotals", data);
  const contentContainer = document.getElementById("inline-checkout-content");
  const totalPrice = document.getElementById("inline-checkout-total");
  const subtotalPrice = document.getElementById("inline-checkout-subtotal");
  const taxInclusive = document.getElementById("inline-checkout-tax--inclusive");
  const taxExclusive = document.getElementById("inline-checkout-tax--exclusive");
  const taxPrice = document.getElementById("inline-checkout-tax");
  const frequency = document.getElementById("inline-checkout-frequency");

  const summaryTotalPrice = document.getElementById("inline-checkout-summary-total");
  const summarySubtotalPrice = document.getElementById("inline-checkout-summary-subtotal");
  const summaryTaxPrice = document.getElementById("inline-checkout-summary-tax");
  const summaryNextPayment = document.getElementById("inline-checkout-summary-next");
  const summaryNextPaymentDate = document.getElementById("inline-checkout-summary-next--date");
  const summaryTotalPriceNext = document.getElementById("inline-checkout-summary-total--next");

  const nextPaymentDate = calculateNextPayment(data.custom_data.sub_type);
  if (nextPaymentDate === null) {
    summaryNextPayment.hidden = true;
  } else {
    const formattedDate = nextPaymentDate.toLocaleDateString(navigator.language, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    summaryNextPayment.hidden = false;
    summaryNextPaymentDate.textContent = `Due on ${formattedDate}`;
    summaryTotalPriceNext.textContent = formatAmount({amount: data.totals.total});
  }

  if (isTaxInclusive || data.totals.tax == 0) {
    subtotalPrice.textContent = formatAmount({amount: data.totals.total});
  } else {
    subtotalPrice.textContent = formatAmount({amount: data.totals.subtotal});
  }
  if (isTaxInclusive) {
    taxExclusive.hidden = true;
    taxInclusive.hidden = false;
  } else if (data.totals.tax == 0) {
    taxExclusive.hidden = true;
    taxInclusive.hidden = true;
    summaryTaxPrice.textContent = formatAmount({amount: 0});
  } else {
    taxPrice.textContent = formatAmount({amount: data.totals.tax});
    taxInclusive.hidden = true;
    taxExclusive.hidden = false;
  }

  summarySubtotalPrice.textContent = formatAmount({amount: data.totals.subtotal});
  summaryTaxPrice.textContent = formatAmount({amount: data.totals.tax});
  totalPrice.textContent = formatAmount({amount: data.totals.total});
  summaryTotalPrice.textContent = formatAmount({amount: data.totals.total});
  frequency.textContent = data.custom_data.sub_type;

  contentContainer.classList.remove("placeholder");
}

function calculateNextPayment(frequency) {  const today = new Date();
  const nextPayment = new Date(today);

  switch (frequency) {
    case 'monthly':
      nextPayment.setMonth(today.getMonth() + 1);
      break;
    case 'yearly':
      nextPayment.setFullYear(today.getFullYear() + 1);
      break;
    default:
      return null;
  }

  return nextPayment;


}

adblock.on("checkout.loaded", updateTotals);
adblock.on("checkout.customer.updated", updateTotals);

function removePaddlePlaceholder() {
  const form = document.getElementById("inline-checkout-form");
  form.classList.remove("placeholder");
  form.style.minHeight = "320px";
}

adblock.on("checkout.loaded", () => setTimeout(removePaddlePlaceholder, 100));

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

const desktopWidthMediaQuery = window.matchMedia(`(min-width: 992px)`);
const plan1Discount = document.querySelector(".update-plan-1-discount");
const plan2 = document.querySelector(".update-plan-2");
function fixDiscountHeight() {
  if (desktopWidthMediaQuery.matches && plan2?.style.marginTop != plan1Discount?.offsetHeight) {
    plan2.style.marginTop = plan1Discount?.offsetHeight + "px";
  } else if (plan2?.style.marginTop != 0) {
    plan2.style.marginTop = 0;
  }
}
window.addEventListener("resize", fixDiscountHeight);
fixDiscountHeight();


// Hide placeholders
document.querySelectorAll(".placeholder:not(.inline-checkout-modal .placeholder)").forEach(element => {
  element.classList.remove("placeholder");
});
