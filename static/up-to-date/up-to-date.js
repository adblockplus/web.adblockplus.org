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
  UPDATE_PAYMENT_PRODUCTS: {
    TEST: {
      "USD": {
        "once": {
          "1000": 46028,
          "1500": 46029,
          "2000": 46030,
          "3500": 46031,
          "5000": 46032,
          "custom": 3500
        },
        "monthly": {
          "199": 46074,
          "299": 46075,
          "399": 46076,
          "499": 46077,
          "999": 46078,
          "custom": 499
        },
        "yearly": {
          "1000": 46079,
          "1500": 46080,
          "2000": 46081,
          "3500": 46082,
          "5000": 46083,
          "custom": 3500
        }
      },
      "AUD": {
        "once": {
          "1000": 46033,
          "1500": 46034,
          "2000": 46035,
          "3500": 46036,
          "5000": 46037,
          "custom": 3500
        },
        "monthly": {
          "199": 46084,
          "299": 46085,
          "399": 46086,
          "499": 46087,
          "999": 46088,
          "custom": 499
        },
        "yearly": {
          "1000": 46089,
          "1500": 46090,
          "2000": 46091,
          "3500": 46092,
          "5000": 46093,
          "custom": 3500
        }
      },
      "CAD": {
        "once": {
          "1000": 46038,
          "1500": 46039,
          "2000": 46040,
          "3500": 46041,
          "5000": 46042,
          "custom": 3500
        },
        "monthly": {
          "199": 46094,
          "299": 46095,
          "399": 46096,
          "499": 46097,
          "999": 46098,
          "custom": 499
        },
        "yearly": {
          "1000": 46099,
          "1500": 46181,
          "2000": 46182,
          "3500": 46183,
          "5000": 46184,
          "custom": 3500
        }
      },
      "EUR": {
        "once": {
          "1000": 46048,
          "1500": 46049,
          "2000": 46050,
          "3500": 46051,
          "5000": 46052,
          "custom": 3500
        },
        "monthly": {
          "199": 46195,
          "299": 46196,
          "399": 46197,
          "499": 46198,
          "999": 46199,
          "custom": 499
        },
        "yearly": {
          "1000": 46200,
          "1500": 46201,
          "2000": 46202,
          "3500": 46203,
          "5000": 46204,
          "custom": 3500
        }
      },
      "GBP": {
        "once": {
          "1000": 46053,
          "1500": 46054,
          "2000": 46055,
          "3500": 46056,
          "5000": 46057,
          "custom": 3500
        },
        "monthly": {
          "199": 46205,
          "299": 46206,
          "399": 46207,
          "499": 46208,
          "999": 46209,
          "custom": 499
        },
        "yearly": {
          "1000": 46210,
          "1500": 46211,
          "2000": 46212,
          "3500": 46213,
          "5000": 46214,
          "custom": 3500
        }
      },
      "JPY": {
        "once": {
          "1500": 46064,
          "2000": 46065,
          "2500": 46066,
          "3500": 46067,
          "5000": 46068,
          "custom": 3500
        },
        "monthly": {
          "200": 46225,
          "300": 46226,
          "500": 46227,
          "1000": 46228,
          "1500": 46229,
          "custom": 1000
        },
        "yearly": {
          "1500": 46230,
          "2000": 46231,
          "2500": 46232,
          "3500": 46233,
          "5000": 46234,
          "custom": 3500
        }
      },
      "NZD": {
        "once": {
          "1000": 46058,
          "1500": 46059,
          "2000": 46060,
          "3500": 46062,
          "5000": 46063,
          "custom": 3500
        },
        "monthly": {
          "199": 46215,
          "299": 46216,
          "399": 46217,
          "499": 46218,
          "999": 46219,
          "custom": 499
        },
        "yearly": {
          "1000": 46220,
          "1500": 46221,
          "2000": 46222,
          "3500": 46223,
          "5000": 46224,
          "custom": 3500
        }
      },
      "CHF": {
        "once": {
          "1000": 46043,
          "1500": 46044,
          "2000": 46045,
          "3500": 46046,
          "5000": 46047,
          "custom": 3500
        },
        "monthly": {
          "199": 46185,
          "299": 46186,
          "399": 46187,
          "499": 46188,
          "999": 46189,
          "custom": 499
        },
        "yearly": {
          "1000": 46190,
          "1500": 46191,
          "2000": 46192,
          "3500": 46193,
          "5000": 46194,
          "custom": 3500
        }
      },
      "RUB": {
        "once": {
          "25000": 46069,
          "50000": 46070,
          "100000": 46071,
          "250000": 46072,
          "500000": 46073,
          "custom": 250000
        },
        "monthly": {
          "15000": 46235,
          "25000": 46236,
          "40000": 46237,
          "50000": 46238,
          "100000": 46239,
          "custom": 50000
        },
        "yearly": {
          "25000": 46240,
          "50000": 46241,
          "100000": 46242,
          "250000": 46243,
          "500000": 46244,
          "custom": 250000
        }
      },
    },
    LIVE: {
      "USD": {
        "once": {
          "1000": 816549,
          "1500": 816550,
          "2000": 816551,
          "3500": 816552,
          "5000": 816553,
          "custom": 3500
        },
        "monthly": {
          "199": 816774,
          "299": 816775,
          "399": 816776,
          "499": 816777,
          "999": 816778,
          "custom": 499
        },
        "yearly": {
          "1000": 816779,
          "1500": 816780,
          "2000": 816781,
          "3500": 816782,
          "5000": 816783,
          "custom": 3500
        }
      },
      "AUD": {
        "once": {
          "1000": 816522,
          "1500": 816523,
          "2000": 816524,
          "3500": 816525,
          "5000": 816526,
          "custom": 3500
        },
        "monthly": {
          "199": 816692,
          "299": 816693,
          "399": 816694,
          "499": 816696,
          "999": 816697,
          "custom": 499
        },
        "yearly": {
          "1000": 816699,
          "1500": 816700,
          "2000": 816702,
          "3500": 816703,
          "5000": 816705,
          "custom": 3500
        }
      },
      "CAD": {
        "once": {
          "1000": 816528,
          "1500": 816529,
          "2000": 816530,
          "3500": 816531,
          "5000": 816532,
          "custom": 3500
        },
        "monthly": {
          "199": 816706,
          "299": 816708,
          "399": 816710,
          "499": 816711,
          "999": 816712,
          "custom": 499
        },
        "yearly": {
          "1000": 816714,
          "1500": 816715,
          "2000": 816716,
          "3500": 816717,
          "5000": 816718,
          "custom": 3500
        }
      },
      "EUR": {
        "once": {
          "1000": 816517,
          "1500": 816518,
          "2000": 816519,
          "3500": 816520,
          "5000": 816521,
          "custom": 3500
        },
        "monthly": {
          "199": 816681,
          "299": 816682,
          "399": 816683,
          "499": 816684,
          "999": 816686,
          "custom": 499
        },
        "yearly": {
          "1000": 816687,
          "1500": 816688,
          "2000": 816689,
          "3500": 816690,
          "5000": 816691,
          "custom": 3500
        }
      },
      "GBP": {
        "once": {
          "1000": 816538,
          "1500": 816539,
          "2000": 816540,
          "3500": 816541,
          "5000": 816542,
          "custom": 3500
        },
        "monthly": {
          "199": 816734,
          "299": 816735,
          "399": 816736,
          "499": 816737,
          "999": 816738,
          "custom": 499
        },
        "yearly": {
          "1000": 816739,
          "1500": 816740,
          "2000": 816741,
          "3500": 816743,
          "5000": 816744,
          "custom": 3500
        }
      },
      "JPY": {
        "once": {
          "1500": 816554,
          "2000": 816555,
          "2500": 816556,
          "3500": 816557,
          "5000": 816558,
          "custom": 3500
        },
        "monthly": {
          "200": 816784,
          "300": 816785,
          "500": 816786,
          "1000": 816787,
          "1500": 816788,
          "custom": 1000
        },
        "yearly": {
          "1500": 816789,
          "2000": 816791,
          "2500": 816792,
          "3500": 816794,
          "5000": 816795,
          "custom": 3500
        }
      },
      "NZD": {
        "once": {
          "1000": 816543,
          "1500": 816544,
          "2000": 816545,
          "3500": 816547,
          "5000": 816548,
          "custom": 3500
        },
        "monthly": {
          "199": 816760,
          "299": 816762,
          "399": 816764,
          "499": 816766,
          "999": 816768,
          "custom": 499
        },
        "yearly": {
          "1000": 816769,
          "1500": 816770,
          "2000": 816771,
          "3500": 816772,
          "5000": 816773,
          "custom": 3500
        }
      },
      "CHF": {
        "once": {
          "1000": 816533,
          "1500": 816535,
          "2000": 816534,
          "3500": 816536,
          "5000": 816537,
          "custom": 3500
        },
        "monthly": {
          "199": 816720,
          "299": 816722,
          "399": 816723,
          "499": 816725,
          "999": 816726,
          "custom": 499
        },
        "yearly": {
          "1000": 816727,
          "1500": 816728,
          "2000": 816730,
          "3500": 816731,
          "5000": 816733,
          "custom": 3500
        }
      },
      "RUB": {
        "once": {
          "25000": 816559,
          "50000": 816560,
          "100000": 816561,
          "250000": 816562,
          "500000": 816563,
          "custom": 250000
        },
        "monthly": {
          "15000": 816796,
          "25000": 816797,
          "40000": 816799,
          "50000": 816800,
          "100000": 816801,
          "custom": 50000
        },
        "yearly": {
          "25000": 816802,
          "50000": 816803,
          "100000": 816804,
          "250000": 816805,
          "500000": 816806,
          "custom": 250000
        }
      },
    }
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
const updatePaymentProducts = PADDLE.UPDATE_PAYMENT_PRODUCTS[environment];
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
    const onceDenominator = parseInt(Object.keys(updatePaymentProducts[currency].once)[2], 10);
    const monthlyDenominator = parseInt(Object.keys(updatePaymentProducts[currency].monthly)[0], 10);
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