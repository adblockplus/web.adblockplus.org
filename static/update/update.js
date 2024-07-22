/* global Paddle, adblock */
import { getDollarString } from "../shared/currency.js";
import { generateUserId, generateTrackingId } from "../shared/user.js";
import "../shared/premium-difference.js";

const paddleConfig = adblock.config.paddle = {
  serviceURL: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
  sandboxVendor: 11004,
  liveVendor: 164164,
  locales: {
    "zh_CN": "zh-Hans",
    "sv": "da",
    "pt_BR": "pt",
    "ko_KR": "ko",
    "pl_PL": "pl",
    "ca": "en",
    "uk": "en",
  },
  products: {
    sandbox: {
      USD: {
        monthly: {
          amount: 400,
          product: 68391,
        },
        yearly: {
          amount: 4000,
          product: 68392,
        },
      },
      EUR: {
        monthly: {
          amount: 400,
          product: 68393,
        },
        yearly: {
          amount: 4000,
          product: 68394,
        },
      },
      CAD: {
        monthly: {
          amount: 400,
          product: 68592,
        },
        yearly: {
          amount: 4000,
          product: 68593,
        },
      },
      GBP: {
        monthly: {
          amount: 400,
          product: 68594,
        },
        yearly: {
          amount: 4000,
          product: 68595,
        },
      },
      AUD: {
        monthly: {
          amount: 400,
          product: 68590,
        },
        yearly: {
          amount: 4000,
          product: 68591,
        },
      },
      NZD: {
        monthly: {
          amount: 400,
          product: 68596,
        },
        yearly: {
          amount: 4000,
          product: 68597,
        },
      },
      CHF: {
        monthly: {
          amount: 400,
          product: 68598,
        },
        yearly: {
          amount: 4000,
          product: 68599,
        },
      },
      PLN: {
        monthly: {
          amount: 1499,
          product: 68604,
        },
        yearly: {
          amount: 14999,
          product: 68510,
        },
      },
      JPY: {
        monthly: {
          amount: 600,
          product: 68600,
        },
        yearly: {
          amount: 6000,
          product: 68601,
        },
      },
      RUB: {
        monthly: {
          amount: 35000,
          product: 68602,
        },
        yearly: {
          amount: 350000,
          product: 68603,
        },
      }
    },
    live: {
      USD: {
        monthly: {
          amount: 400,
          product: 877570,
        },
        yearly: {
          amount: 4000,
          product: 877572,
        },
      },
      EUR: {
        monthly: {
          amount: 400,
          product: 877578,
        },
        yearly: {
          amount: 4000,
          product: 877579,
        }
      },
      CAD: {
        monthly: {
          amount: 400,
          product: 879254,
        },
        yearly: {
          amount: 4000,
          product: 879263,
        },
      },
      GBP: {
        monthly: {
          amount: 400,
          product: 879255,
        },
        yearly: {
          amount: 4000,
          product: 879264,
        },
      },
      AUD: {
        monthly: {
          amount: 400,
          product: 879256,
        },
        yearly: {
          amount: 4000,
          product: 879265,
        },
      },
      NZD: {
        monthly: {
          amount: 400,
          product: 879257,
        },
        yearly: {
          amount: 4000,
          product: 879266,
        },
      },
      CHF: {
        monthly: {
          amount: 400,
          product: 879258,
        },
        yearly: {
          amount: 4000,
          product: 879267,
        },
      },
      PLN: {
        monthly: {
          amount: 1499,
          product: 879259,
        },
        yearly: {
          amount: 14999,
          product: 879268,
        },
      },
      JPY: {
        monthly: {
          amount: 600,
          product: 879260,
        },
        yearly: {
          amount: 6000,
          product: 879269,
        },
      },
      RUB: {
        monthly: {
          amount: 35000,
          product: 879261,
        },
        yearly: {
          amount: 350000,
          product: 879270,
        },
      },
    },
  },
};

function getPaddleProduct({currency, frequency}) {
  try {
    currency = currency || defaultCurrency;
    return paddleConfig.products[environment][currency][frequency].product;
  } catch (error) {
    return undefined;
  }
}

function getPaddleAmount({currency, frequency}) {
  try {
    currency = currency || defaultCurrency;
    return paddleConfig.products[environment][currency][frequency].amount;
  } catch (error) {
    return undefined;
  }
}

const language = adblock.settings.language || "en";
const isTestmode = location.hostname == "localhost" || adblock.query.has("testmode");
const environment = isTestmode ? "sandbox" : "live";
const page = adblock.settings.page || "update";
const defaultCurrency = adblock.settings.currency || "USD";
let premiumId;
try { premiumId = adblock.extensions.adblockPlus.premiumId || generateUserId(); }
catch (error) { premiumId = generateUserId(); }
const trackingId = generateTrackingId("ME", premiumId);

if (isTestmode) Paddle.Environment.set("sandbox");

Paddle.Setup({ vendor: isTestmode ? paddleConfig.sandboxVendor : paddleConfig.liveVendor });

const checkout = adblock.api.checkout = function checkout({currency, frequency, amount}) {

  let paddleProduct;
  if (amount == undefined) {
    paddleProduct = getPaddleProduct({currency, frequency});
    amount = getPaddleAmount({currency, frequency});
  }

  const clickTimestamp = Date.now();

  const params = new URLSearchParams();
  params.set("premium-checkout__handoff", 1);
  params.set("premium-checkout__flow", page);
  params.set("premium-checkout__userid", premiumId);
  params.set("premium-checkout__currency", currency);
  params.set("premium-checkout__amount", amount);
  params.set("premium-checkout__frequency", frequency);
  params.set("premium-checkout__language", language);
  params.set("premium-checkout__timestamp", clickTimestamp);

  localStorage.setItem("contributionInfo", JSON.stringify({
    amount: amount,
    frequency: frequency,
    processor: "paddle",
    currency: currency,
    lang: language,
    source: page,
    clickTs: clickTimestamp
  }));

  const paddleMetadata = {
    "testmode": isTestmode,
    "userid": premiumId,
    "tracking": trackingId,
    "locale": language,
    "country": "unknown", // ABP doesn't have generic geo location yet
    "ga_id": "", // ABP doesn't track GA
    "premium": false, // ABP doesn't track premium && cid/sid
    "premium_cid": "0", // ^
    "premium_sid": "0", // ^
    "currency": currency,
    "recurring": true,
    "subType": frequency,
    "experiment": "", // ABP doesn't support these experiments/variants
    "experiment_id": "", // ^
    "variant": "", // ^
    "variant_index": -1, // ^
    "amount_cents": amount,
    "success_url": `https://accounts.adblockplus.org/${language}/premium?${params.toString()}`,
    "cancel_url": location.href,
  };

  const paddleTitle = "Adblock Plus Premium";
  const paddleLocale = paddleConfig.locales[language] || language;

  if (paddleProduct) {
    Paddle.Checkout.open({
      title: paddleTitle,
      product: paddleProduct,
      allowQuantity: false,
      success: paddleMetadata.success_url,
      locale: paddleLocale,
      passthrough: paddleMetadata,
    });
  } else {
    fetch(paddleConfig.serviceURL, {
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
    .catch(() => {
      adblock.error(adblock.strings["error--unexpected"]);
    });
  }
}

document.querySelectorAll(".update-premium-checkout-button").forEach(button => {
  button.addEventListener("click", () => {
    const currency = button.dataset.currency || defaultCurrency;
    const frequency = button.dataset.frequency;
    const amount = button.dataset.amount || undefined;
    checkout({currency, frequency, amount})
  });
});

document.querySelectorAll(".update-premium-checkout-button-price").forEach(price => {
  const frequency = price.parentElement.dataset.frequency;
  const amount = getPaddleAmount({currency: defaultCurrency, frequency});
  price.textContent = getDollarString(defaultCurrency, amount);
});

document.querySelectorAll(".update-plan-heading-price").forEach(price => {
  const frequency = price.dataset.frequency;
  const amount = getPaddleAmount({currency: defaultCurrency, frequency});
  const amountText = getDollarString(defaultCurrency, amount);
  const amountSignText = amountText.replace(/[\d\,\.]/g, "").trim();
  const amountNumberText = amountText.replace(amountSignText, "").trim();
  price.querySelector(".update-plan-heading-price__final-amount").textContent = amountNumberText;
  price.querySelector(".update-plan-heading-price__final-currency").textContent = amountSignText;
});

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