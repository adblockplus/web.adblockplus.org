import { getDollarString } from "../update/currency.js";
import { generateTrackingId, generateUserId } from "../update/user.js";

const PADDLE = adblock.config.paddle = {
  ENVIRONMENTS: {
    LIVE: {
      VENDOR_ID: 164164,
      CUSTOM_AMOUNT_URL: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
    },
    TEST: {
      VENDOR_ID: 11004,
      CUSTOM_AMOUNT_URL: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
    }
  },
  LOCALES: {
    "zh_CN": "zh-Hans",
    "sv": "da",
    "pt_BR": "pt",
    "ko_KR": "ko",
    "pl_PL": "pl",
    "ca": "en",
    "uk": "en",
  },
  MINIMUMS: {
    AUD: 500, 
    CAD: 500, 
    EUR: 500, 
    GBP: 500, 
    NZD: 500, 
    CHF: 500, 
    JPY: 200, 
    RUB: 15000,
    USD: 500,
  },
  PRODUCTS: {
    TEST: {
      "USD": {
        "monthly": {
          amount: "200",
          product: 55427,
        },
        "yearly": {
          amount: "2000",
          product: 55428,
        },
      },
      "AUD": {
        "monthly": {
          amount: "200",
          product: 68404,
        },
        "yearly": {
          amount: "2000",
          product: 68405,
        },
      },
      "CAD": {
        "monthly": {
          amount: "200",
          product: 68407,
        },
        "yearly": {
          amount: "2000",
          product: 68408,
        },
      },
      "EUR": {
        "monthly": {
          amount: "200",
          product: 68054,
        },
        "yearly": {
          amount: "2000",
          product: 68053,
        },
      },
      "GBP": {
        "monthly": {
          amount: "200",
          product: 68409,
        },
        "yearly": {
          amount: "2000",
          product: 68410,
        },
      },
      "JPY": {
        "monthly": {
          amount: "500",
          product: 68411,
        },
        "yearly": {
          amount: "5000",
          product: 68412,
        },
      },
      "NZD": {
        "monthly": {
          amount: "200",
          product: 68413,
        },
        "yearly": {
          amount: "2000",
          product: 68414,
        },
      },
      "CHF": {
        "monthly": {
          amount: "200",
          product: 68415,
        },
        "yearly": {
          amount: "2000",
          product: 68416,
        },
      },
      "RUB": {
        "monthly": {
          amount: "15000",
          product: 68417,
        },
        "yearly": {
          amount: "150000",
          product: 68418,
        },
      },
    },
    LIVE: {
      "USD": {
        "monthly": {
          amount: "200",
          product: 842007,
        },
        "yearly": {
          amount: "2000",
          product: 842011,
        },
      },
      "AUD": {
        "monthly": {
          amount: "200",
          product: 877751,
        },
        "yearly": {
          amount: "2000",
          product: 877752,
        },
      },
      "CAD": {
        "monthly": {
          amount: "200",
          product: 877754,
        },
        "yearly": {
          amount: "2000",
          product: 877755,
        },
      },
      "EUR": {
        "monthly": {
          amount: "200",
          product: 874224,
        },
        "yearly": {
          amount: "2000",
          product: 874223,
        },
      },
      "GBP": {
        "monthly": {
          amount: "200",
          product: 877756,
        },
        "yearly": {
          amount: "2000",
          product: 877757,
        },
      },
      "JPY": {
        "monthly": {
          amount: "500",
          product: 877758,
        },
        "yearly": {
          amount: "5000",
          product: 877759,
        },
      },
      "NZD": {
        "monthly": {
          amount: "200",
          product: 877760,
        },
        "yearly": {
          amount: "2000",
          product: 877761,
        },
      },
      "CHF": {
        "monthly": {
          amount: "200",
          product: 877762,
        },
        "yearly": {
          amount: "2000",
          product: 877763,
        },
      },
      "RUB": {
        "monthly": {
          amount: "15000",
          product: 877764,
        },
        "yearly": {
          amount: "150000",
          product: 877765,
        },
      },
    },
  },
};

const userid = generateUserId();
const page = document.documentElement.getAttribute("data-page") || "up-to-date";
const language = document.documentElement.getAttribute("lang") || "en";
const country = adblock.settings.country || "unknown";
const environment = adblock.query.has("testmode") ? "TEST" : "LIVE";
const paddleEnvironment = PADDLE.ENVIRONMENTS[environment];
const paddleId = paddleEnvironment.VENDOR_ID;
const paddleProducts = PADDLE.PRODUCTS[environment];
const customAmountServiceURL = paddleEnvironment.CUSTOM_AMOUNT_URL;
const paddleTitle = "Adblock Plus";
const paddleLocale = PADDLE.LOCALES[language] || language;
if (environment == "TEST") Paddle.Environment.set("sandbox");
Paddle.Setup({ vendor: paddleId });

// From https://european-union.europa.eu/institutions-law-budget/euro/countries-using-euro_en
const EUR_COUNTRIES = [
  // Euro area member countries
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
  // Non-euro area member countries
  "BG", "CZ", "HU", "PL", "RO", "SE",
  // Member countries with an opt-out
  "DK"
];
const CURRENCY_MAP = {
  "GB": "GBP",
  "CH": "CHF",
  "AU": "AUD",
  "CA": "CAD",
  "NZ": "NZD",
  "RU": "RUB",
  "JP": "JPY"
};
// prefer CURRENCY_MAP to EUR_COUNTRIES so that Euro area countries may prefer
// their own currency to EUR or fall back to EUR if it's not supported
const defaultCurrency = adblock.settings.defaultCurrency = adblock.settings.defaultCurrency
  || adblock.settings.currency
  || CURRENCY_MAP[country]
  || (EUR_COUNTRIES.includes(country) ? "EUR" : "USD");


// Select amount button on click
document.querySelectorAll(".up-to-date-payment-option__button").forEach(option => {
  option.addEventListener("click", event => {
    event.preventDefault();
    const pressed = document.querySelector(".up-to-date-payment-option__button[aria-pressed=\"true\"]");
    if (event.currentTarget != pressed) {
      pressed.removeAttribute("aria-pressed");
      event.currentTarget.setAttribute("aria-pressed", "true");
      if (event.currentTarget.dataset.min) {
        event.currentTarget.min = event.currentTarget.dataset.min;
        event.currentTarget.required = true;
      }
      if (pressed.dataset.min) {
        pressed.removeAttribute("min");
        pressed.required = false;
      }
      updateRewardDuration();
    }
  })
});

document
.querySelector("input[type=number].up-to-date-payment-option__button")
.addEventListener("input", function() {
  updateRewardDuration();
});

// Set currencies and default currency
document.querySelectorAll(".up-to-date-payment-currency").forEach(select => {
  select.innerHTML = "";
  for (const currency in paddleProducts) {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    select.appendChild(option);
  }
  select.value = defaultCurrency;
  updateRewardDuration();
});

// Update amounts on currency change
function updateSelectionData(currency) {
  document.querySelectorAll("button.up-to-date-payment-option__button").forEach(option => {
    const frequency = option.dataset.frequency;
    const amount = paddleProducts[currency][frequency].amount;
    option.dataset.amount = amount;
    option.querySelector(".up-to-date-payment-option__amount").textContent = getDollarString(currency, amount);
    updateRewardDuration();
  });
  const min = PADDLE.MINIMUMS[currency];
  const input = document.querySelector("input[type=number].up-to-date-payment-option__button");
  input.dataset.min = currency == "JPY" ? min : min / 100;
  if (input.getAttribute("aria-pressed") == "true") input.min = input.dataset.min;
}
document.querySelectorAll(".up-to-date-payment-currency").forEach(select => {
  select.addEventListener("change", event => {
    const currency = event.currentTarget.value;
    document.querySelectorAll(".up-to-date-payment-currency").forEach(select => {
      if (select.value != currency) select.value = currency;
      updateSelectionData(currency);
    });
  });
});
updateSelectionData(defaultCurrency);

function getRewardDuration(currency, frequency, amount) {
  if (frequency == "once") {
    const amountNumerator = parseInt(amount, 10);
    const onceDenominator = parseInt(paddleProducts[currency].yearly.amount, 10);
    const monthlyDenominator = parseInt(paddleProducts[currency].monthly.amount, 10);
    if (amountNumerator < onceDenominator) {
      return Math.floor(amountNumerator / monthlyDenominator);
    } else {
      return 12 * Math.floor(amountNumerator / onceDenominator);
    }
  }
}

function updateRewardDuration() {
  const { currency, amount, frequency, plan, suffix, planName, durationMonths } = getCheckoutData();
  const duration = getRewardDuration(currency, frequency, amount);
  let baseTranslation;
  if (duration > 12) {
    baseTranslation = adblock.strings["update-payment-reward__n-years"];
  } else if (duration == 12) {
    baseTranslation = adblock.strings["update-payment-reward__1-year"];
  } else if (duration > 1) {
    baseTranslation = adblock.strings["update-payment-reward__n-months"];
  } else if (duration == 1) {
    baseTranslation = adblock.strings["update-payment-reward__1-month"];
  } else {
    baseTranslation = adblock.strings["update-payment-reward"];
  }
  document.querySelector(".update-payment-reward__text").innerHTML = baseTranslation
  .replace(
    `<span class="amount">35.00</span>`, 
    `<span class="amount">${getDollarString(currency, amount)}</span>`
  )
  .replace(
    `<span class="product">Adblock Plus Premium</span>`, 
    `<span class="product">${adblock.strings["product__premium"]}</span>`
  )
  .replace(
    `<span class="duration">8</span>`,
    `<span class="duration">${Math.floor(duration > 12 ? duration / 12 : duration)}</span>`
  );
}

function getCheckoutData() {
  const pressed = document.querySelector(".up-to-date-payment-option__button[aria-pressed=\"true\"]");
  const currency = document.querySelector(".up-to-date-payment-currency").value;
  const frequency = pressed.dataset.frequency;
  const amount = frequency == "once" 
  ? pressed.value
    ? currency == "JPY"
      ? pressed.value
      : pressed.value * 100
    : currency == "JPY"
      ? pressed.min
      : pressed.min * 100
  : pressed.dataset.amount;
  const plan = pressed.dataset.product;
  const frequencySuffixes = {
    "once": "",
    "monthly": adblock.strings["suffix__monthly"],
    "yearly": adblock.strings["suffix__yearly"],
  };
  const suffix = frequencySuffixes[frequency];
  const planName = "ME";
  const durationMonths = getRewardDuration(currency, frequency, amount);
  return { currency, amount, frequency, plan, suffix, planName, durationMonths };
}

function updateLocalstorage(data) {
  const { currency, amount, frequency, plan, suffix, planName, durationMonths } = data;
  localStorage.setItem("planinfo", JSON.stringify({ plan, durationMonths }));
  localStorage.setItem("purchaseinfo", JSON.stringify({ amount, frequency, plan, suffix, planName }));
  localStorage.setItem("contributionInfo", JSON.stringify({
    amount: amount,
    frequency: frequency,
    processor: "paddle",
    currency: currency,
    lang: language,
    source: page,
    clickTs: Date.now(),
    plan,
  }));
}

function checkout(data) {
  const { currency, amount, frequency, plan, suffix, planName, durationMonths } = data;
  const product = frequency == "once" ? false : paddleProducts[currency][frequency].product;
  const paymentSuccessParameters = new URLSearchParams();
  paymentSuccessParameters.set("premium-checkout__handoff", 1);
  paymentSuccessParameters.set("premium-checkout__flow", page);
  paymentSuccessParameters.set("premium-checkout__userid", userid);
  paymentSuccessParameters.set("premium-checkout__currency", currency);
  paymentSuccessParameters.set("premium-checkout__amount", amount);
  paymentSuccessParameters.set("premium-checkout__frequency", frequency);
  paymentSuccessParameters.set("premium-checkout__language", language);
  paymentSuccessParameters.set("premium-checkout__timestamp", Date.now());
  const paddleMetadata = {
    testmode: environment == "TEST",
    userid: userid,
    tracking: generateTrackingId("ME" , userid),
    locale: language,
    country: country,
    ga_id: "",
    premium: "false",
    premium_cid: "0",
    premium_sid: "0",
    currency: currency,
    recurring: frequency != "once",
    subType: frequency != "once" ? frequency : "",
    experiment: "",
    experiment_id: "",
    variant: "",
    variant_index: -1,
    amount_cents: parseFloat(amount),
    success_url: `https://accounts.adblockplus.org/premium?${paymentSuccessParameters.toString()}`,
    cancel_url: window.location.href
  };
  if (product) {
    Paddle.Checkout.open({
      title: paddleTitle,
      product: product,
      allowQuantity: false,
      success: paddleMetadata.success_url,
      locale: paddleLocale,
      passthrough: paddleMetadata,
    });
    return new Promise(resolve => setTimeout(() => resolve(), 100));
  } else {
    return fetch(customAmountServiceURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paddleMetadata),
    })
    .then(response => response.json())
    .then(session => {
      Paddle.Checkout.open({
        title: paddleTitle,
        locale: paddleLocale,
        override: session.url,
      });
    });  
  }
}

// Process payment on submit
document.querySelector(".up-to-date-payment").addEventListener("submit", event => {
  event.preventDefault();
  let data, submit;
  const handleError = (_error, _data) => {
    const reportParams = new URLSearchParams();
    const reportData = Object.assign({}, _data, _error);
    for (const key in reportData) {
      reportParams.set(key, reportData[key]);
    }
    fetch(`/error?${reportParams.toString()}`);
    submit.disabled = false;
  }
  try {
    submit = document.querySelector(".up-to-date-payment-checkout__button");
    if (submit.disabled) return;
    submit.disabled = true;
    data = getCheckoutData();
  } catch (error) { handleError({ errorMessage: error.message, errorStage: "form data parsing" }, data ); }
  try {
    updateLocalstorage(data);
  } catch (error) { handleError({ errorMessage: error.message, errorStage: "updating localstorage" }, data ); }
  try {
    checkout(data)
    .catch(error => { handleError({ errorMessage: error.message, errorStage: "sending checkout request" }, data ); })
    .finally(() => { submit.disabled = false; })
  } catch (error) { handleError({ errorMessage: error.message, errorStage: "sending checkout request" }, data ); }
});