/* global Paddle, adblock */

import { checkout } from "../../modules/paddle.js";

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

document.getElementById("variant-1").hidden = false;

const currency = adblock.settings.defaultCurrency || "USD";

checkout({
  product: "premium",
  currency: currency,
  frequency: "yearly",
  amount: PRICES[currency]["yearly"],
  settings: {
    displayMode: "inline",
    variant: "one-page",
    frameTarget: "inline-checkout-form",
    frameInitialHeight: "450",
    frameStyle: "width: 100%; min-width: 312px; background-color: transparent; border: none; zoom: 0.8;"
  }
});

function formatAmount({amount, trailingZeros = false, narrowSymbol = true}) {
  const formatOptions = {
    style: 'currency',
    currency: currency,
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
  const totalsContainer = document.getElementById("inline-checkout-totals");
  const totalPrice = document.getElementById("inline-checkout-total");
  const subtotalPrice = document.getElementById("inline-checkout-subtotal");
  const taxInclusive = document.getElementById("inline-checkout-tax--inclusive");
  const taxExclusive = document.getElementById("inline-checkout-tax--exclusive");
  const taxPrice = document.getElementById("inline-checkout-tax");
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
  } else {
    taxPrice.textContent = formatAmount({amount: data.totals.tax});
    taxInclusive.hidden = true;
    taxExclusive.hidden = false;
  }
  totalPrice.textContent = formatAmount({amount: data.totals.total});
  totalsContainer.classList.remove("placeholder");
}

adblock.on("checkout.loaded", updateTotals);
adblock.on("checkout.customer.updated", updateTotals);

function removePaddlePlaceholder() {
  const form = document.getElementById("inline-checkout-form");
  form.classList.remove("placeholder");
  form.style.minHeight = "initial";
}

adblock.on("checkout.loaded", () => setTimeout(removePaddlePlaceholder, 100));

function updateBlockCount() {
  const blockCount = adblock.adblockPlus?.blockCount || parseInt(adblock.query.get("bc"), 10);
  if (blockCount > 1000 ) {
    document.getElementById("block-count").textContent = blockCount.toLocaleString();
    document.getElementById("update-heading").hidden = true;
    document.getElementById("update-heading--block-count").hidden = false;
  } else {
    document.getElementById("update-heading-placeholder").classList.remove("placeholder");
  }
}

adblock.afterAdblockPlusDetected(updateBlockCount, true);
