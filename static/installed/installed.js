/* global Paddle, adblock */

import { getDollarString, getDollarNumber, getCentNumber } from "../update/currency.js";
import Events from "../update/events.js";
import { generateUserId, generateTrackingId } from "../update/user.js";

const PREMIUM_ID = generateUserId();

const PAGE = "installed";

const LOCALE = "en";

const COUNTRY = "unknown";

const ENVIRONMENT = adblock.query.has("testmode") ? "SANDBOX" : "LIVE";

const DEFAULT_PAYMENT_FREQUENCY = "yearly";

const EUR_COUNTRIES = [
  "AT","BE","HR","CY","EE","FI","FR","DE","GR","IE","IT","LV","LT","LU","MT",
  "NL","PT","SK","SI","ES","BG","CZ","HU","PL","RO","SE","DK"
];

const CURRENCY_MAP = {
  "GB": "GBP",
  "CH": "CHF",
  "AU": "AUD",
  "CA": "CAD",
  "NZ": "NZD",
  "RU": "RUB",
  "JP": "JPY",
  "MX": "MXN"
};

const DEFAULT_PAYMENT_CURRENCY = CURRENCY_MAP[COUNTRY]
  || (EUR_COUNTRIES.includes(COUNTRY) ? "EUR" : "USD");

const DEFAULT_PAYMENT_OPTION = 3;

const PADDLE = adblock.config.paddle = {
  TITLE: "Adblock Plus",
  CUSTOM_AMOUNT_SERVICE: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
  LIVE_VENDOR_ID: 151630,
  SANDBOX_VENDOR_ID: 7645,
  LOCALE: ({
    "zh_CN": "zh-Hans",
    "sv": "da",
    "pt_BR": "pt",
    "ko_KR": "ko",
    "pl_PL": "pl",
    "ca": "en",
    "uk": "en",
  }[LOCALE] || LOCALE),
  MINIMUMS: {
    USD: { monthly: 199, yearly: 500, },
    AUD: { monthly: 199, yearly: 500, },
    CAD: { monthly: 199, yearly: 500, },
    EUR: { monthly: 199, yearly: 500, },
    GBP: { monthly: 199, yearly: 500, },
    JPY: { monthly: 200, yearly: 500, },
    NZD: { monthly: 199, yearly: 500, },
    CHF: { monthly: 199, yearly: 500, },
    RUB: { monthly: 15000, yearly: 25000, },
  },
  PRODUCTS: {
    SANDBOX: {
      USD: {
        monthly: [
          [199, 46074],
          [299, 46075],
          [399, 46076],
          [499, 46077],
          [999, 46078],
        ],
        yearly: [
          [1000, 46079],
          [1500, 46080],
          [2000, 46081],
          [3500, 46082],
          [5000, 46083],
        ],
      },
      AUD: {
        monthly: [
          [199, 46084],
          [299, 46085],
          [399, 46086],
          [499, 46087],
          [999, 46088],
        ],
        yearly: [
          [1000, 46089],
          [1500, 46090],
          [2000, 46091],
          [3500, 46092],
          [5000, 46093],
        ],
      },
      CAD: {
        monthly: [
          [199, 46094],
          [299, 46095],
          [399, 46096],
          [499, 46097],
          [999, 46098],
        ],
        yearly: [
          [1000, 46099],
          [1500, 46181],
          [2000, 46182],
          [3500, 46183],
          [5000, 46184],
        ],
      },
      EUR: {
        monthly: [
          [199, 46195],
          [299, 46196],
          [399, 46197],
          [499, 46198],
          [999, 46199],
        ],
        yearly: [
          [1000, 46200],
          [1500, 46201],
          [2000, 46202],
          [3500, 46203],
          [5000, 46204],
        ],
      },
      GBP: {
        monthly: [
          [199, 46205],
          [299, 46206],
          [399, 46207],
          [499, 46208],
          [999, 46209],
        ],
        yearly: [
          [1000, 46210],
          [1500, 46211],
          [2000, 46212],
          [3500, 46213],
          [5000, 46214],
        ],
      },
      JPY: {
        monthly: [
          [200, 46225],
          [300, 46226],
          [500, 46227],
          [1000, 46228],
          [1500, 46229],
        ],
        yearly: [
          [1500, 46230],
          [2000, 46231],
          [2500, 46232],
          [3500, 46233],
          [5000, 46234],
        ],
      },
      NZD: {
        monthly: [
          [199, 46215],
          [299, 46216],
          [399, 46217],
          [499, 46218],
          [999, 46219],
        ],
        yearly: [
          [1000, 46220],
          [1500, 46221],
          [2000, 46222],
          [3500, 46223],
          [5000, 46224],
        ],
      },
      CHF: {
        monthly: [
          [199, 46185],
          [299, 46186],
          [399, 46187],
          [499, 46188],
          [999, 46189],
        ],
        yearly: [
          [1000, 46190],
          [1500, 46191],
          [2000, 46192],
          [3500, 46193],
          [5000, 46194],
        ],
      },
      RUB: {
        monthly: [
          [15000, 46235],
          [25000, 46236],
          [40000, 46237],
          [50000, 46238],
          [100000, 46239],
        ],
        yearly: [
          [25000, 46240],
          [50000, 46241],
          [100000, 46242],
          [250000, 46243],
          [500000, 46244],
        ],
      },
    },
    LIVE: {
      USD: {
        monthly: [
          [199, 816774],
          [299, 816775],
          [399, 816776],
          [499, 816777],
          [999, 816778],
        ],
        yearly: [
          [1000, 816779],
          [1500, 816780],
          [2000, 816781],
          [3500, 816782],
          [5000, 816783],
        ],
      },
      AUD: {
        monthly: [
          [199, 816692],
          [299, 816693],
          [399, 816694],
          [499, 816696],
          [999, 816697],
        ],
        yearly: [
          [1000, 816699],
          [1500, 816700],
          [2000, 816702],
          [3500, 816703],
          [5000, 816705],
        ],
      },
      CAD: {
        monthly: [
          [199, 816706],
          [299, 816708],
          [399, 816710],
          [499, 816711],
          [999, 816712],
        ],
        yearly: [
          [1000, 816714],
          [1500, 816715],
          [2000, 816716],
          [3500, 816717],
          [5000, 816718],
        ],
      },
      EUR: {
        monthly: [
          [199, 816681],
          [299, 816682],
          [399, 816683],
          [499, 816684],
          [999, 816686],
        ],
        yearly: [
          [1000, 816687],
          [1500, 816688],
          [2000, 816689],
          [3500, 816690],
          [5000, 816691],
        ],
      },
      GBP: {
        monthly: [
          [199, 816734],
          [299, 816735],
          [399, 816736],
          [499, 816737],
          [999, 816738],
        ],
        yearly: [
          [1000, 816739],
          [1500, 816740],
          [2000, 816741],
          [3500, 816743],
          [5000, 816744],
        ],
      },
      JPY: {
        monthly: [
          [200, 816784],
          [300, 816785],
          [500, 816786],
          [1000, 816787],
          [1500, 816788],
        ],
        yearly: [
          [1500, 816789],
          [2000, 816791],
          [2500, 816792],
          [3500, 816794],
          [5000, 816795],
        ],
      },
      NZD: {
        monthly: [
          [199, 816760],
          [299, 816762],
          [399, 816764],
          [499, 816766],
          [999, 816768],
        ],
        yearly: [
          [1000, 816769],
          [1500, 816770],
          [2000, 816771],
          [3500, 816772],
          [5000, 816773],
        ],
      },
      CHF: {
        monthly: [
          [199, 816720],
          [299, 816722],
          [399, 816723],
          [499, 816725],
          [999, 816726],
        ],
        yearly: [
          [1000, 816727],
          [1500, 816728],
          [2000, 816730],
          [3500, 816731],
          [5000, 816733],
        ],
      },
      RUB: {
        monthly: [
          [15000, 816796],
          [25000, 816797],
          [40000, 816799],
          [50000, 816800],
          [100000, 816801],
        ],
        yearly: [
          [25000, 816802],
          [50000, 816803],
          [100000, 816804],
          [250000, 816805],
          [500000, 816806],
        ],
      },
    },
  },
};

if (ENVIRONMENT == "SANDBOX") {
  Paddle.Environment.set("sandbox");
}

Paddle.Setup({ 
  vendor: ENVIRONMENT == "SANDBOX" ? PADDLE.SANDBOX_VENDOR_ID : PADDLE.LIVE_VENDOR_ID,
});

class PaymentForm extends Events {

  constructor(parent, options) {

    super();
    this.parent = parent;
    
    // add currency options and listen to currency change
    const currencySelect = parent.querySelector(".installed-payment-currency__select");
    for (const currency in options) {
      // the default currency option should be present already
      if (currency == DEFAULT_PAYMENT_CURRENCY) continue;
      const option = document.createElement("option");
      option.textContent = currency;
      currencySelect.appendChild(option);
    }
    currencySelect.addEventListener("change", () => {
      this._updateAmounts(currencySelect.value, options[currencySelect.value]);
    });

    // listen to amount option button presses
    parent.querySelectorAll(".installed-payment-option").forEach(optionButton => {
      // using "focus" instead of "click" captures tab key AND click
      optionButton.addEventListener("focus", event => {
        event.preventDefault();
        this._selectAmount(optionButton.dataset.frequency, optionButton.dataset.option);
        this._updateReward(currencySelect.value, optionButton.dataset.amount);
      });
    });
    parent.querySelectorAll(".installed-payment-option--input").forEach(optionInput => {
      optionInput.addEventListener("input", () => {
        const currency = currencySelect.value;
        this._updateReward(currency, getCentNumber(currency, optionInput.value));
      });
    });

    // fire submit event with data from form on submit
    parent.addEventListener("submit", event => {
      event.preventDefault();
      const amount = parent.querySelector(".installed-payment-option--active");
      this.fire("submit", {
        currency: this.parent.querySelector(".installed-payment-currency__select").value,
        frequency: amount.dataset.frequency,
        option: amount.dataset.option,
        amount: amount.dataset.amount || amount.value, // button OR custom input
      });
    });

    // set defaults
    this._updateAmounts(DEFAULT_PAYMENT_CURRENCY, options[DEFAULT_PAYMENT_CURRENCY]);
    this._selectAmount(DEFAULT_PAYMENT_FREQUENCY, DEFAULT_PAYMENT_OPTION);
    this._updateReward(DEFAULT_PAYMENT_CURRENCY, options[DEFAULT_PAYMENT_CURRENCY][DEFAULT_PAYMENT_FREQUENCY[DEFAULT_PAYMENT_OPTION]])
  }

  _updateAmounts(currency, amounts) {
    // update fixed amounts
    for (const frequency in amounts) {
      for (const option in amounts[frequency]) {
        const amount = amounts[frequency][option][0];
        const button = this.parent.querySelector(`.installed-payment-option[data-frequency="${frequency}"][data-option="${option}"]`);
        button.textContent = getDollarString(currency, amount);
        button.dataset.amount = amount;
      }
    }
    // update custom amounts
    for (const frequency in amounts) {
      this.parent.querySelector(`.installed-payment-option--input[data-frequency="${frequency}"]`).dataset.min = getDollarNumber(currency, PADDLE.MINIMUMS[currency][frequency]);
    }
  }

  _selectAmount(frequency, amount) {
    // select frequency container
    let lastFrequency = this.parent.querySelector(".installed-payment-frequency--active");
    if (lastFrequency.dataset.frequency != frequency) {
      lastFrequency.classList.remove("installed-payment-frequency--active");
      this.parent.querySelector(`.installed-payment-frequency[data-frequency="${frequency}"]`).classList.add("installed-payment-frequency--active");
    }
    // select amount option
    const lastOption = this.parent.querySelector(".installed-payment-option--active");
    const nextOption = this.parent.querySelector(`.installed-payment-option[data-frequency="${frequency}"][data-option="${amount}"]`);
    if (lastOption != nextOption) {
      lastOption.classList.remove("installed-payment-option--active");
      nextOption.classList.add("installed-payment-option--active");

      // Setting and unsetting min and required enables the custom amount
      // to be required and have a minimum when it's selected and not otherwise
      if (lastOption.classList.contains("installed-payment-option--input")) {
        lastOption.min = null;
        lastOption.required = false;
      }
      if (nextOption.classList.contains("installed-payment-option--input")) {
        nextOption.min = nextOption.dataset.min;
        nextOption.required = true;
      }
    }
  }

  _updateReward(currency, amount) {
    // undefined amount case for when custom amount is selected without input
    if (!amount) return;
    this.parent.querySelector(".payment-reward__text").innerHTML = adblock.strings["payment-reward"]
    .replace(
      `<span>35.00</span>`, 
      `<span class="amount">${getDollarString(currency, amount)}</span>`
    );
  }

  enable() {
    this.parent.querySelector(".installed-payment-checkout__button").disabled = false;
  }

  disable() {
    this.parent.querySelector(".installed-payment-checkout__button").disabled = true;
  }


}

const paymentForm = new PaymentForm(
  document.querySelector(".installed-payment"),
  PADDLE.PRODUCTS[ENVIRONMENT]
);

paymentForm.on("submit", ({currency, frequency, option, amount}) => {

  let paddleProductId;
  try {
    paddleProductId = PADDLE.PRODUCTS[ENVIRONMENT][currency][frequency][option][1];
  } catch (error) {
    // fall back to custom amount when product is not in config
  }

  // construct premium activaton handoff params
  const paymentSuccessParameters = new URLSearchParams();
  paymentSuccessParameters.set("premium-checkout__handoff", 1);
  paymentSuccessParameters.set("premium-checkout__flow", PAGE);
  paymentSuccessParameters.set("premium-checkout__userid", PREMIUM_ID);
  paymentSuccessParameters.set("premium-checkout__currency", currency);
  paymentSuccessParameters.set("premium-checkout__amount", amount);
  paymentSuccessParameters.set("premium-checkout__frequency", frequency);
  if (adblock.query.has("legal")) paymentSuccessParameters.set("legal", 1);

  const adblockProductId = adblock.settings.restrictPremium ? "" : "ME";

  // construct premium payment data
  const paddleMetadata = {
    testmode: ENVIRONMENT == "SANDBOX",
    userid: PREMIUM_ID,
    tracking: generateTrackingId(adblockProductId , PREMIUM_ID),
    locale: LOCALE,
    country: COUNTRY,
    ga_id: "",
    premium: "false",
    premium_cid: "0",
    premium_sid: "0",
    currency: currency,
    recurring: true,
    subType: frequency,
    experiment: "",
    experiment_id: "",
    variant: "",
    variant_index: -1,
    amount_cents: parseFloat(amount),
    success_url: `https://accounts.adblockplus.org/premium?${paymentSuccessParameters.toString()}`,
    cancel_url: window.location.href
  };

  if (paddleProductId) {
    // open paddle payment modal with paddle product ID (fastest)
    Paddle.Checkout.open({
      title: PADDLE.TITLE,
      product: paddleProductId,
      allowQuantity: false,
      success: paddleMetadata.success_url,
      locale: PADDLE.LOCALE,
      passthrough: paddleMetadata,
    });
  } else {
    // or use custom amount service and open paddle payment modal with custom amount (slower)
    paymentForm.disable();
    fetch(PADDLE.CUSTOM_AMOUNT_SERVICE, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paddleMetadata),
    })
    .then(response => response.json())
    .then(session => {
      Paddle.Checkout.open({
        title: PADDLE.TITLE,
        locale: PADDLE.LOCALE,
        override: session.url,
      });
    })
    .catch(error => {
      alert(adblock.strings.errorUnexpected);
    })
    .finally(() => {
      paymentForm.enable();
    });
  }
});
