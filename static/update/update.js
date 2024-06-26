/* global Paddle, adblock */
import { getDollarNumber, getCentNumber, getDollarString } from "./currency.js";
import { matchHeights } from "./responsive.js";
import { generateTrackingId, generateUserId, getUserId } from "./user.js";
import Events from "./events.js";
import UpdatePaymentView from "./UpdatePaymentView.js";

// Adding exports to namespace for third parties (aka conversion.com)
adblock.lib.Events = Events;
adblock.lib.matchHeights = matchHeights;
adblock.lib.getDollarNumber = getDollarNumber;
adblock.lib.getCentNumber = getCentNumber;
adblock.lib.getDollarString = getDollarString;
adblock.lib.UpdatePaymentView = UpdatePaymentView;

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
    AUD: { once: 500, monthly: 199, yearly: 500 },
    CAD: { once: 500, monthly: 199, yearly: 500 },
    EUR: { once: 500, monthly: 199, yearly: 500 },
    GBP: { once: 500, monthly: 199, yearly: 500 },
    NZD: { once: 500, monthly: 199, yearly: 500 },
    CHF: { once: 500, monthly: 199, yearly: 500 },
    JPY: { once: 500, monthly: 200, yearly: 500 },
    RUB: { once: 25000, monthly: 15000, yearly: 25000 },
    USD: { once: 500, monthly: 199, yearly: 500 }
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
  }
};

const userid = getUserId() || generateUserId();
const page = document.documentElement.getAttribute("data-page") || "update";
const language = document.documentElement.getAttribute("lang") || "en";
const country = adblock.settings.country || "unknown";
const environment = adblock.query.has("testmode") ? "TEST" : "LIVE";
const paddleEnvironment = PADDLE.ENVIRONMENTS[environment];
const paddleId = paddleEnvironment.VENDOR_ID;
const customAmountServiceURL = paddleEnvironment.CUSTOM_AMOUNT_URL;
const paddleTitle = "Adblock Plus";
const paddleLocale = PADDLE.LOCALES[language] || language;
const updatePaymentProducts = PADDLE.UPDATE_PAYMENT_PRODUCTS[environment];

if (environment == "TEST") {
  Paddle.Environment.set("sandbox");
}

/** a proxy to Paddle's Setup eventCallback */
const paddleEvents = new Events();

Paddle.Setup({
  vendor: paddleId,
  eventCallback: event => paddleEvents.fire(event.name, event)
});

adblock.runtime.paddle = { events: paddleEvents };

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
const defaultCurrency = adblock.settings.defaultCurrency
  || adblock.settings.currency
  || CURRENCY_MAP[country]
  || (EUR_COUNTRIES.includes(country) ? "EUR" : "USD");

const defaultFrequency = adblock.settings.defaultFrequency || "monthly";

function getSecondDescendingAmount(currency, frequency) {
  // Must be sorted because objects don't garantee key order
  return Object.keys(updatePaymentProducts[currency][frequency]).sort((a, b) => {
    return parseFloat(b) - parseFloat(a) // Descending order
  })[1]; // Choosing the second sorted amount
}

const defaultAmount = adblock.settings.defaultAmount || getSecondDescendingAmount(defaultCurrency, defaultFrequency);

const updatePaymentView = adblock.runtime.updatePaymentView = new UpdatePaymentView(
  document.querySelector(".update-payment"),
  {
    products: updatePaymentProducts,
    minimums: PADDLE.MINIMUMS,
    defaultCurrency,
    defaultFrequency,
    defaultAmount
  }
);

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
  const currency = updatePaymentView.currency;
  const frequency = updatePaymentView.frequency;
  const amount = updatePaymentView.amount;
  const frequencySuffixes = {
    "once": "",
    "monthly": adblock.strings["suffix__monthly"],
    "yearly": adblock.strings["suffix__yearly"],
  };
  const plan = "ME";
  const planName = adblock.strings["product__premium"];
  const suffix = frequencySuffixes[frequency];
  const durationMonths = getRewardDuration(currency, frequency, amount);
  if (frequency == "once") {
    if (amount >= PADDLE.MINIMUMS[currency][frequency]) {
      updatePaymentView.setRewardDuration(durationMonths);
    } else {
      updatePaymentView.hideRewardDuration();
    }
  } else {
    updatePaymentView.setRewardDuration(0);
  }
  localStorage.setItem("planinfo", JSON.stringify({ durationMonths, plan }));
  localStorage.setItem("purchaseinfo", JSON.stringify({ amount, frequency, plan, suffix, planName }));
}

updatePaymentView.events.on("amount", updateRewardDuration);
document.addEventListener("DOMContentLoaded", updateRewardDuration);

function onPaymentSubmit(view, options) {
  const currency = options.currency;
  const frequency = options.frequency;
  const amount = options.amount;
  let product = options.product;
  if (!product) {
    try {
      product = updatePaymentProducts[currency][frequency][amount];
    } catch (error) {
      // no big deal, it's just a custom amount or an amount we haven't created 
      // a product for yet configured above
    }
  }

  const clickTimestamp = Date.now();

  localStorage.setItem("contributionInfo", JSON.stringify({
    amount: amount,
    frequency: frequency,
    processor: "paddle",
    currency: currency,
    lang: language,
    source: page,
    clickTs: clickTimestamp
  }));

  const paymentSuccessParameters = new URLSearchParams();
  paymentSuccessParameters.set("premium-checkout__handoff", 1);
  paymentSuccessParameters.set("premium-checkout__flow", page);
  paymentSuccessParameters.set("premium-checkout__userid", userid);
  paymentSuccessParameters.set("premium-checkout__currency", currency);
  paymentSuccessParameters.set("premium-checkout__amount", amount);
  paymentSuccessParameters.set("premium-checkout__frequency", frequency);
  paymentSuccessParameters.set("premium-checkout__language", language);
  paymentSuccessParameters.set("premium-checkout__timestamp", clickTimestamp);
  if (adblock.query.has("legal")) paymentSuccessParameters.set("legal", 1);

  const productId = adblock.settings.restrictPremium ? "" : "ME";
  const successURL = adblock.settings.restrictPremium
    ? "https://adblockplus.org/update-payment-complete"
    : `https://accounts.adblockplus.org/premium?${paymentSuccessParameters.toString()}`;

  const paddleMetadata = {
    testmode: environment == "TEST",
    userid: userid,
    tracking: generateTrackingId(productId , userid),
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
    success_url: successURL,
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
  } else {
    view.setSubmitting(true);
    fetch(customAmountServiceURL, {
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
    })
    .catch(error => {
      alert(adblock.strings.errorUnexpected);
    })
    .finally(() => {
      view.setSubmitting(false);
    });
  }
}

updatePaymentView.events.on("submit", data => onPaymentSubmit(updatePaymentView,  data));

(function() {
  const notification = document.querySelector(".update-motivation-notification");

  setTimeout(() => {
    notification.classList.add("fade-in");
    notification.style.display = "block";
  }, 3000);

  const modal = document.querySelector(".update-motivation-slider");

  modal.addEventListener("click", event => {
    if (event.target == modal) modal.style.display = "none";
  });

  const modalCloseButton = document.querySelector(".update-motivation-slider-modal-header__close");
  modalCloseButton.addEventListener("click", () => modal.style.display = "none");

  notification.addEventListener("click", event => {
    if (event.target.closest(".update-motivation-notification-header__close")) {
      notification.style.display = "none";
    } else {
      modal.style.display = "flex";
    }
  });

  const modalBody = document.querySelector(".update-motivation-slider-modal-body");
  const button = document.querySelector(".update-motivation-silder-modal-slider__button");
  const slider = document.querySelector(".update-motivation-silder-modal-slider");
  const image = document.querySelector(".update-motivation-slider-modal-image--after");

  let sliding = false;

  function onMove(event) {
    if (sliding) {
      const touchX = (event.clientX || event.touches[0].clientX);
      const imageX = image.getBoundingClientRect().left;
      const modalWidth = modalBody.offsetWidth;
      let slidePercentage = (((touchX - imageX) / modalWidth)*100);
      if (slidePercentage < 0) slidePercentage = 0;
      if (slidePercentage > 100) slidePercentage = 100;
      slider.style.left = slidePercentage + "%";
      image.style.width = slidePercentage + "%";
    }
  }

  function onStart (event) {
    event.preventDefault();
    if (!sliding) sliding = true;
  }

  function onEnd (event) {
    if (sliding) sliding = false;
  }

  button.addEventListener("mousedown", onStart);
  button.addEventListener("touchstart", onStart);
  document.addEventListener("mouseup", onEnd);
  document.addEventListener("touchend", onEnd);
  modalBody.addEventListener("mousemove", onMove);
  modalBody.addEventListener("touchmove", onMove);
})();
