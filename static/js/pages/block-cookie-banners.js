/* global Paddle, adblock */
import { getDollarString } from "../../update/currency.js";
import { generateTrackingId, generateUserId, getUserId } from "../../update/user.js";

const PADDLE = adblock.config.paddle = {
  ENVIRONMENTS: {
    LIVE: 164164,
    TEST: 11004
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
          "199": 46074,
        },
        "yearly": {
          "2000": 46081,
        }
      },
      "AUD": {
        "monthly": {
          "199": 46084,
        },
        "yearly": {
          "2000": 46091,
        }
      },
      "CAD": {
        "monthly": {
          "199": 46094,
        },
        "yearly": {
          "2000": 46182,
        }
      },
      "EUR": {
        "monthly": {
          "199": 46195,
        },
        "yearly": {
          "2000": 46202,
        }
      },
      "GBP": {
        "monthly": {
          "199": 46205,
        },
        "yearly": {
          "2000": 46212,
        }
      },
      "JPY": {
        "monthly": {
          "200": 46225,
        },
        "yearly": {
          "2500": 46232,
        }
      },
      "NZD": {
        "monthly": {
          "199": 46215,
        },
        "yearly": {
          "2000": 46222,
        }
      },
      "CHF": {
        "monthly": {
          "199": 46185,
        },
        "yearly": {
          "2000": 46192,
        }
      },
      "RUB": {
        "monthly": {
          "15000": 46235,
        },
        "yearly": {
          "100000": 46242,
        }
      },
    },
    LIVE: {
      "USD": {
        "monthly": {
          "199": 816774,
        },
        "yearly": {
          "2000": 816781,
        }
      },
      "AUD": {
        "monthly": {
          "199": 816692,
        },
        "yearly": {
          "2000": 816702,
        }
      },
      "CAD": {
        "monthly": {
          "199": 816706,
        },
        "yearly": {
          "2000": 816716,
        }
      },
      "EUR": {
        "monthly": {
          "199": 816681,
        },
        "yearly": {
          "2000": 816689,
        }
      },
      "GBP": {
        "monthly": {
          "199": 816734,
        },
        "yearly": {
          "2000": 816741,
        }
      },
      "JPY": {
        "monthly": {
          "200": 816784,
        },
        "yearly": {
          "2500": 816792,
        }
      },
      "NZD": {
        "monthly": {
          "199": 816760,
        },
        "yearly": {
          "2000": 816771,
        }
      },
      "CHF": {
        "monthly": {
          "199": 816720,
        },
        "yearly": {
          "2000": 816730,
        }
      },
      "RUB": {
        "monthly": {
          "15000": 816796,
        },
        "yearly": {
          "100000": 816804,
        }
      }
    }
  }
};

const userid = getUserId() || generateUserId();
const page = "block-cookie-banners"
const language = document.documentElement.getAttribute("lang") || "en";
const environment = adblock.query.has("testmode") ? "TEST" : "LIVE";
const paddleId = PADDLE.ENVIRONMENTS[environment];
const paddleTitle = "Adblock Plus";
const paddleLocale = PADDLE.LOCALES[language] || language;
const products = PADDLE.PRODUCTS[environment];

if (environment == "TEST") {
  Paddle.Environment.set("sandbox");
}

Paddle.Setup({ vendor: paddleId });

const $currencies = document.querySelector(".premium-checkout-header__select");

// Populate currencies
for (const currency in products) {
  const $currency = document.createElement("option");
  $currency.textContent = currency;
  $currencies.append($currency);
}

// Update option amounts on currency change
function onCurrencyChange() {
  const currency = $currencies.value;
  document
  .querySelectorAll(".premium-checkout-card-body-option__button")
  .forEach(button => {
    const frequency = button.dataset.frequency;
    const amount = Object.keys(products[currency][frequency])[0];
    button.querySelector(".amount").textContent = getDollarString(currency, amount);
  });
}

$currencies.addEventListener("change", onCurrencyChange);

// Set default currency
if (adblock.settings.currency) {
  $currencies.value = adblock.settings.currency;
  onCurrencyChange();
}

// Update selected option on option click
document
.querySelectorAll(".premium-checkout-card-body-option__button")
.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    document
    .querySelector(".premium-checkout-card-body-option__button[aria-pressed=\"true\"]")
    .setAttribute("aria-pressed", "false");
    button.setAttribute("aria-pressed", "true");
  });
});

// Handoff to Paddle and premium flow on submit
document
.querySelector(".premium-checkout")
.addEventListener("submit", event => {
  event.preventDefault();
  const currency = $currencies.value;
  const frequency = document
  .querySelector(".premium-checkout-card-body-option__button[aria-pressed=\"true\"]")
  .dataset.frequency;
  const [ amount, product ] = Object.entries(products[currency][frequency])[0];
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
  const productId = "ME";
  const successURL = `https://accounts.adblockplus.org/premium?${paymentSuccessParameters.toString()}`;
  const paddleMetadata = {
    testmode: environment == "TEST",
    userid: userid,
    tracking: generateTrackingId(productId , userid),
    locale: language,
    country: "unknown",
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
  Paddle.Checkout.open({
    title: paddleTitle,
    product: product,
    allowQuantity: false,
    success: paddleMetadata.success_url,
    locale: paddleLocale,
    passthrough: paddleMetadata,
  });
});