/* global adblock, Paddle */

const discountedPlan = document.getElementsByClassName("premium-plan discount")[0];
const discountedButton = discountedPlan.getElementsByClassName("discount")[0];

document.body.addEventListener('mouseenter', function(event) {
  if (event.target.getAttribute('data-plan') === 'monthly') {
    discountedButton.classList.add('not-chosen');
  }
}, true);

document.body.addEventListener('mouseleave', function(event) {
  if (event.target.getAttribute('data-plan') === 'monthly') {
    discountedButton.classList.remove('not-chosen');
  }
}, true);

const CHECKOUT_TITLE = "Adblock Plus Premium";

const PADDLE = {
  test: {
    vendorId: 11004,
    monthly: { amount: 200, productId: 55427 },
    yearly: { amount: 2000, productId: 55428 },
  },
  live: {
    vendorId: 164164,
    monthly: { amount: 200, productId: 842007 },
    yearly: { amount: 2000, productId: 842011 },
  },
  // Paddle uses some non-standard/different-stand locale codes
  locales: {
    "zh_CN": "zh-Hans",
    "sv": "da",
    "pt_BR": "pt",
    "ko_KR": "ko",
    "pl_PL": "pl",
    "ca": "en",
    "uk": "en",
  }
};

/** should we use the Paddle sandbox instead of the live environment? */
const isTestmode = adblock.query.has("testmode");

/** manually set language > page language > browser language */
const language = adblock.settings.language || document.documentElement.lang || navigator.language;

const paddleEnvironment = isTestmode
  ? PADDLE.test
  : PADDLE.live;

/** the locale of the paddle checkout */
const paddleLocale = PADDLE.locales[language] || language;

const userid = generateUserId();

/** convert a cent number to a dollar number in relevant supported currencies */
function getDollarNumber(currency, amount) {
  return currency == "JPY" ? amount : amount / 100;
}

/** convert a cent number to a locally formatted dollar string in relevant supported currencies */
function getDollarString(currency, centAmountString) {
  const dollarNumber = getDollarNumber(currency, centAmountString);
  const formatOptions = {
    style: 'currency', 
    currency: currency, 
    currencyDisplay: 'narrowSymbol'
  };
  if (dollarNumber % 1 === 0) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }
  return new Intl.NumberFormat(language.replace("_", "-"), formatOptions).format(dollarNumber);
}

/** 
 * AdBlock's userid generation function (refactored) 
 * @todo import from shared source
 */
function generateUserId() {
  const suffix = (Date.now()) % 1e8; // 8 digits from end of timestamp
  const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
  let chars = "";
  for (let i = 0; i < 8; i++) 
    chars += allowed[Math.floor(Math.random() * allowed.length)]
  return chars + suffix;
}

/** 
 * AdBlock's browser detection code generation function (refactored) 
 * @todo import from shared source
 */
function getBrowser() {
  const chrome = navigator.userAgent.includes("Chrome");
  const opera = navigator.userAgent.includes("OPR");
  const edg = navigator.userAgent.includes("Edg");
  const edge = navigator.userAgent.includes("Edge");
  const safari = navigator.userAgent.includes("Safari");
  const firefox = navigator.userAgent.includes("Firefox");
  const samsung = navigator.userAgent.includes("Samsung");
  const trident = navigator.userAgent.includes("Trident");
  return chrome && !opera && !samsung && !edg && !edge ? "E"
    : safari && !opera && !samsung && !edg && !edge ? "S"
    : firefox ? "F"
    : opera ? "O"
    : edge ? "M"
    : edg ? "CM"
    : navigator.appName == 'Microsoft Internet Explorer' || trident ? "T"
    : samsung ? "G"
    : "U";
}

/**
 * AdBlock's os detection code generation function (refactored)
 * @todo import from shared source
 */
function getOS() {
  const appVersion = navigator.appVersion || "";
  const userAgent = navigator.userAgent || "";
  return appVersion.includes("Win") ? "W"
    : userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("iPod") ? "I"
    : appVersion.includes("Mac") ? "M"
    : appVersion.includes("X11") || appVersion.includes("Linux") ? "L"
    : "U";
}

/**
 * AdBlock's tracking id generation function (refactored, specialised)
 * @todo import from shared source
 */
function generateTrackingId() {
  return `ME X0G0 F${getBrowser()}O${getOS()}SD ${userid}`;
}

if (isTestmode) {
  Paddle.Environment.set('sandbox');
}

Paddle.Setup({ vendor: paddleEnvironment.vendorId });

/**
 * Checkout with Paddle
 * @param {string} product paddle product id
 * @param {string} currency 3 letter currency
 * @param {string} frequency yearly, monthly, once
 * @param {string} amount cent amount
 * @returns {Promise}
 * @todo import from shared source
 * @todo add retries
 */
function checkout(product, currency, frequency, amount) {
  return new Promise((resolve, reject) => {
    if (typeof adblock == "object" && typeof adblock.log == "function") {
      adblock.log("black-friday-2023__checkout", { product, currency, frequency, amount });
    }
    const contributionInfo = {
      amount: amount,
      frequency: frequency,
      processor: "paddle",
      currency: currency,
      lang: language,
      source: "D",
      clickTs: Date.now()
    };
    if (frequency == "yearly") {
      contributionInfo.coupon = "SAVE50";
    }
    localStorage.setItem("contributionInfo", JSON.stringify(contributionInfo));
    const paddleOptions = {
      title: CHECKOUT_TITLE,
      product: product,
      allowQuantity: false,
      locale: paddleLocale,
      closeCallback: reject,
    };
    if (frequency == "yearly") {
      paddleOptions.coupon = "SAVE50";
    }
    const params = new URLSearchParams();
    params.set("premium-checkout__activate", true);
    params.set("premium-checkout__flow", "black-friday-2023");
    params.set("premium-checkout__userid", userid);
    params.set("premium-checkout__currency", currency);
    params.set("premium-checkout__amount", amount);
    params.set("premium-checkout__frequency", frequency);
    paddleOptions.success = `https://accounts.adblockplus.org/premium?${params.toString()}`;
    const adblockOptions = {
      passthrough: {
        "testmode": isTestmode,
        "userid": userid,
        "tracking": generateTrackingId(userid),
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
        "cancel_url": location.href,
      }
    };
    Paddle.Checkout.open(Object.assign({}, paddleOptions, adblockOptions));
  });
}

document.querySelectorAll(".premium-cta").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    const frequency = event.target.getAttribute("data-plan");
    const currency = "USD";
    const amount = paddleEnvironment[frequency].amount;
    const productId = paddleEnvironment[frequency].productId;
    checkout(productId, currency, frequency, amount).catch(() => {
      // silence is golden
    });
  });
});