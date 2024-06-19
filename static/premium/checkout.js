////////////////////////////////////////////////////////////////////////////////
// GLOBALS
////////////////////////////////////////////////////////////////////////////////

const REQUEST_TIMEOUT = parseInt(adblock.query.get("premium-checkout__request-timeout"), 10) || 15000;
const ACTIVATION_DELAY = parseInt(adblock.query.get("premium-checkout__activation-delay"), 10) || 6000;

const PADDLE = adblock.config.paddle = {
  ENVIRONMENTS: {
    LIVE: 164164,
    TEST: 11004
  },
  PRODUCTS: {
    TEST: {
      "USD": {
        "monthly": {
          amount: "400",
          product: 68391,
        },
        "yearly": {
          amount: "4000",
          product: 68392,
        },
      },
      "EUR": {
        "monthly": {
          amount: "400",
          product: 68393,
        },
        "yearly": {
          amount: "4000",
          product: 68394,
        },
      },
      "CAD": {
        "monthly": {
          amount: "400",
          product: 68592,
        },
        "yearly": {
          amount: "4000",
          product: 68593,
        },
      },
      "GBP": {
        "monthly": {
          amount: "400",
          product: 68594,
        },
        "yearly": {
          amount: "4000",
          product: 68595,
        },
      },
      "AUD": {
        "monthly": {
          amount: "400",
          product: 68590,
        },
        "yearly": {
          amount: "4000",
          product: 68591,
        },
      },
      "NZD": {
        "monthly": {
          amount: "400",
          product: 68596,
        },
        "yearly": {
          amount: "4000",
          product: 68597,
        },
      },
      "CHF": {
        "monthly": {
          amount: "400",
          product: 68598,
        },
        "yearly": {
          amount: "4000",
          product: 68599,
        },
      },
      "PLN": {
        "monthly": {
          amount: "1499",
          product: 68604,
        },
        "yearly": {
          amount: "14999",
          product: 68510,
        },
      },
      "JPY": {
        "monthly": {
          amount: "600",
          product: 68600,
        },
        "yearly": {
          amount: "6000",
          product: 68601,
        },
      },
      "RUB": {
        "monthly": {
          amount: "35000",
          product: 68602,
        },
        "yearly": {
          amount: "350000",
          product: 68603,
        },
      }
    },
    LIVE: {
      "USD": {
        "monthly": {
          amount: "400",
          product: 877570,
        },
        "yearly": {
          amount: "4000",
          product: 877572,
        },
      },
      "EUR": {
        "monthly": {
          amount: "400",
          product: 877578,
        },
        "yearly": {
          amount: "4000",
          product: 877579,
        }
      },
      "CAD": {
        "monthly": {
          amount: "400",
          product: 879254,
        },
        "yearly": {
          amount: "4000",
          product: 879263,
        },
      },
      "GBP": {
        "monthly": {
          amount: "400",
          product: 879255,
        },
        "yearly": {
          amount: "4000",
          product: 879264,
        },
      },
      "AUD": {
        "monthly": {
          amount: "400",
          product: 879256,
        },
        "yearly": {
          amount: "4000",
          product: 879265,
        },
      },
      "NZD": {
        "monthly": {
          amount: "400",
          product: 879257,
        },
        "yearly": {
          amount: "4000",
          product: 879266,
        },
      },
      "CHF": {
        "monthly": {
          amount: "400",
          product: 879258,
        },
        "yearly": {
          amount: "4000",
          product: 879267,
        },
      },
      "PLN": {
        "monthly": {
          amount: "1499",
          product: 879259,
        },
        "yearly": {
          amount: "14999",
          product: 879268,
        },
      },
      "JPY": {
        "monthly": {
          amount: "600",
          product: 879260,
        },
        "yearly": {
          amount: "6000",
          product: 879269,
        },
      },
      "RUB": {
        "monthly": {
          amount: "35000",
          product: 879261,
        },
        "yearly": {
          amount: "350000",
          product: 879270,
        },
      }
    }
  },
  // Paddle uses some non-standard/different-stand locale codes
  LOCALES: {
    "zh_CN": "zh-Hans",
    "sv": "da",
    "pt_BR": "pt",
    "ko_KR": "ko",
    "pl_PL": "pl",
    "ca": "en",
    "uk": "en",
  }
};

const language = document.documentElement.getAttribute("lang") || "en";
const environment = adblock.query.has("testmode") ? "TEST" : "LIVE";
const paddleId = PADDLE.ENVIRONMENTS[environment];
const paddleTitle = "Adblock Plus Premium";
const paddleLocale = PADDLE.LOCALES[language] || language;
const paddleProducts = PADDLE.PRODUCTS[environment];
const customAmountServiceURL = "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link";
const defaultCurrency = Object.keys(paddleProducts).includes(adblock.settings.currency)
  ? adblock.settings.currency
  : "USD";

if (environment == "TEST") {
  Paddle.Environment.set("sandbox");
}

/** the locale of the paddle checkout */

let userid = adblock.query.get("premium-checkout__userid") || generateUserId();

let email = adblock.query.get("premium-checkout__email") || "";

let flow = adblock.query.get("premium-checkout__flow") || "none";

const section = document.querySelector(".premium-checkout");

/** interactive card (parent element to steps below) */
const card = document.querySelector(".premium-checkout-card--interactive");

////////////////////////////////////////////////////////////////////////////////
// UTILITIES
////////////////////////////////////////////////////////////////////////////////

/** log an event (always include global userid, email, and flow) */
function checkoutLog(event, data = {}) {
  Object.assign(data, {
    userid,
    email,
    flow
  });
  return adblock.log(event, data);
}

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
  return `ME X0G0 F${getBrowser()}O${getOS()}SME ${userid}`;
}

// Return symbol like '$' for given currency code like 'USD'
function getCurrencySymbol(currencyCode) {
  const a = 0;
  return a.toLocaleString("en", {
    style:"currency",
    currency: currencyCode
  }).replace("0.00", "")
}

////////////////////////////////////////////////////////////////////////////////
// PADDLE SETUP
////////////////////////////////////////////////////////////////////////////////
Paddle.Setup({
  vendor: paddleId,
  eventCallback: event => {
    if (typeof event == "object" && event && typeof event.event == "string") {
      if (event.event == "Checkout.Customer.Details") {
        if (typeof event.eventData == "object" && event.eventData && typeof event.eventData.user == "object" && event.eventData.user && event.eventData.user.email) {
          email = event.eventData.user.email;
        }
      } else if (event.event == "Checkout.Loaded") {
        checkoutLog("premium-checkout__paddle-loaded");
      } else if (event.event == "Checkout.Payment.Selection") {
        checkoutLog("premium-checkout__paddle-payment");
      } else if (event.event == "Checkout.Complete") {
        checkoutLog("premium-checkout__paddle-complete");
      }
    }
  },
});

////////////////////////////////////////////////////////////////////////////////
// PROMISIFIED REQUEST WRAPPERS
////////////////////////////////////////////////////////////////////////////////

// CHECKOUT ////////////////////////////////////////////////////////////////////

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
    checkoutLog("premium-checkout__checkout", { product, currency, frequency, amount });
    const clickTimestamp = Date.now();
    localStorage.setItem("contributionInfo", JSON.stringify({
      amount: amount,
      frequency: frequency,
      processor: "paddle",
      currency: currency,
      lang: language,
      source: document.documentElement.getAttribute("data-page"),
      clickTs: clickTimestamp
    }));
    const paddleOptions = {
      title: paddleTitle,
      product: product,
      allowQuantity: false,
      locale: paddleLocale,
      closeCallback: reject,
    };
    const params = new URLSearchParams();
    params.set("premium-checkout__handoff", 1);
    params.set("premium-checkout__flow", document.documentElement.getAttribute("data-page"));
    params.set("premium-checkout__userid", userid);
    params.set("premium-checkout__currency", currency);
    params.set("premium-checkout__amount", amount);
    params.set("premium-checkout__frequency", frequency);
    params.set("premium-checkout__language", language);
    params.set("premium-checkout__timestamp", clickTimestamp);
    if (adblock.query.has("legal")) params.set("legal", 1);
    paddleOptions.success = `https://accounts.adblockplus.org/${language}/premium?${params.toString()}`;
    const adblockOptions = {
      passthrough: {
        "testmode": !!environment === "TEST",
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

// ACTIVATION //////////////////////////////////////////////////////////////////

let resolvePremiumActivation = () => {};
let rejectPremiumActivation = () => {};

window.addEventListener("message", response => {
  if (
    typeof response == "object" 
    && typeof response.data == "object" 
    && typeof response.data.ack == "boolean"
  ) {
    if (response.data.ack) {
      resolvePremiumActivation(response.data);
    } else {
      rejectPremiumActivation(response.data);
    }
  }
});

/**
 * Activate premium for the current user via globally set or generated userid
 * @returns {Promise}
 * @todo import from shared source
 * @todo add retries
 */
function activatePremium() {
  checkoutLog("premium-checkout__activate");
  return new Promise((resolve, reject) => {
    if (adblock.query.has("premium-checkout__fake-activation")) {
      return resolve();
    }
    resolvePremiumActivation = resolve;
    rejectPremiumActivation = reject;
    window.postMessage({
      command: "payment_success",
      userId:  userid,
      version: 1,
    });
    setTimeout(() => reject({ reason: "timeout" }), REQUEST_TIMEOUT);
  });
}

// ALREADY CONTRIBUTED EMAIL ///////////////////////////////////////////////////

/**
 * Verify email for already contributed flow
 * @param {string} email validated using native html validation
 * @returns {Promise}
 * @todo import from shared source
 * @todo add retries
 */
function verifyEmail(email) {
  checkoutLog("premium-checkout__email");
  return new Promise((resolve, reject) => {
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "already_donated",
        email: email
      })
    })
    .then(response => response.json())
    .then(response => {
      if (typeof response == "object" && response.success) {
        resolve();
      } else {
        reject(response);
      }
    })
    .catch(reject);
    setTimeout(reject, REQUEST_TIMEOUT);
  });
}

// ALREADY CONTRIBUTED CODE ////////////////////////////////////////////////////

/**
 * Verify code for already contributed flow
 * @param {string} code
 * @returns {Promise}
 * @todo import from shared source
 * @todo add retries
 */
function verifyCode(code) {
  checkoutLog("premium-checkout__code", { userid, code });
  return new Promise((resolve, reject) => {
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "validate_already_donated",
        code: code,
        userid,
      })
    })
    .then(response => response.json())
    .then(response => {
      if (typeof response == "object" && response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    })
    .catch(reject);
    setTimeout(reject, REQUEST_TIMEOUT);
  });
}

////////////////////////////////////////////////////////////////////////////////
// FLOW STEPS
////////////////////////////////////////////////////////////////////////////////

/**
 * Generic user flow step
 * 
 * - Gets it's DOM from a (probably hidden) element on the page
 * - Has a name for reporting purposes
 * - Has a simple on/fire event system
 * - Has a simple render/show/hide transition system
 */
class Step {

  constructor(element, name) {
    this.element = element.cloneNode(true);
    this.transitionDuration = 300;
    this.name = name;
    this._events = {};
  }

  on(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  }

  fire(event, data) {
    if (this._events[event])
      for (const callback of this._events[event]) callback(data);
  }

  render() {
    this.element.classList.add("premium-checkout-step--active");
  }

  show() {
    this.element.classList.add("premium-checkout-step--transition");
    return new Promise(resolve => setTimeout(resolve, this.transitionDuration));
  }

  hide() {
    this.element.classList.remove("premium-checkout-step--transition");
    return new Promise(resolve => setTimeout(() => {
      this.element.classList.remove("premium-checkout-step--active");
      resolve();
    }, this.transitionDuration));
  }

}

class PurchaseStep extends Step {

  /**
   * - Populates currencies in currency select
   * - Sets default currency in currency select
   * - Listens to currency selection to update currency
   * - Listens to price button click to toggle checkout buttons
   * - Listens to form submit to trigger custom submit event
   * - Listens to already contributed link click to trigger custom already-contributed event
   */
  constructor(element, name) {

    super(element, name);

    const currencySelect = this.element.querySelector(".premium-checkout-header__select");
    for (const currency in paddleProducts) {
      const currencyOption = document.createElement("option");
      currencyOption.textContent = currency;
      currencyOption.value = currency;
      currencySelect.append(currencyOption);
    }
    currencySelect.value = defaultCurrency;

    this._onCurrencyChange({currentTarget: currencySelect});
    currencySelect.addEventListener("change", event => this._onCurrencyChange(event));

    this.element
    .querySelectorAll(".premium-checkout-purchase-price")
    .forEach(option => {
      option.addEventListener("click", event => this._onOptionPress(event));
    });

    this.element.addEventListener("submit", event => {
      event.preventDefault();
      this.fire("checkout-now");
    });

    this.element.querySelector(".premium-checkout-purchase__already-contributed-link")
    .addEventListener("click", event => {
      event.preventDefault();
      this.fire("already-contributed");
    });

  }

  _onOptionPress(event) {
    event.preventDefault();
    const clickedPrice = event.currentTarget;
    const pressedPrice = this.element.querySelector(".premium-checkout-purchase-price[aria-pressed='true']");
    if (pressedPrice != clickedPrice) {
      pressedPrice.setAttribute("aria-pressed", false);
      clickedPrice.setAttribute("aria-pressed", true);
    }
  }

  _onCurrencyChange(event) {
    const currencySelect = event.currentTarget;
    const currency = currencySelect.value;
    this.element.querySelectorAll(".premium-checkout-purchase-price").forEach(priceButton => {
      const frequency = priceButton.value;
      priceButton.querySelector(".premium-checkout-purchase-price__amount").textContent = getDollarString(
        currency, 
        paddleProducts[currency][frequency].amount
      );
    });
    this.fire("currency-change", currency);
  }

  /** get the pressed amount value */
  getSelectedValue() {
    return this.element.querySelector(".premium-checkout-purchase-price[aria-pressed='true']").value;
  }

  getCurrency() {
    return this.element.querySelector(".premium-checkout-header__select").value;
  }

}

class ActivatedStep extends Step {

  /** renders the activation step dom with the passed frequency and amount */
  render({ currency, frequency, amount }) {
    super.render();
    this.element
    .querySelector(".premium-checkout-activated__plan")
    .innerHTML = adblock.strings[`premium-checkout-activated__${frequency}`];
    this.element
    .querySelector(".premium-checkout-activated__amount")
    .textContent = getDollarString(currency, amount);
  }

}

class ErrorStep extends Step {

  /**
   * - Listens to close button click to trigger custom close event
   */
  constructor(element, name) {

    super(element, name);

    this.element
    .querySelector(".premium-checkout-card-header__close-button")
    .addEventListener("click", event => {
      event.preventDefault();
      this.fire("close");
    });

  }

  /** renders the activation step dom with the global email and userid */
  render() {
    super.render();
    this.element.querySelector(".premium-checkout-error__code").textContent = email ? `${email}:${userid}` : userid;
  }

}

class VerifyStep extends Step {

  /**
   * - Has a generic UI with input, submit button, and close button
   * - Listens to form submit to trigger custom submit event
   * - Listens to close button click to trigger custom close event
   */
  constructor(element, name) {

    super(element, name);

    this.element.addEventListener("submit", event => {
      event.preventDefault();
      this.fire("submit");
    });

    this.element
    .querySelector(".premium-checkout-card-header__close-button")
    .addEventListener("click", event => {
      event.preventDefault();
      this.fire("close");
    });

  }

  /** get input value */
  getValue() {
    return this.element.querySelector(".premium-checkout-verify__input").value;
  }

  /** show prerendered error (if applicable) */
  showError() {
    this.element.querySelector(".premium-checkout-verify__error").hidden = false;
  }

}

////////////////////////////////////////////////////////////////////////////////
// STEP CONSTRUCTION
////////////////////////////////////////////////////////////////////////////////

/** steps initialised based on (probably hidden) dom elements */
const steps = {
  purchase: new PurchaseStep(section.querySelector(".premium-checkout-purchase"), "purchase"),
  loading: new Step(section.querySelector(".premium-checkout-loading"), "loading"),
  activated: new ActivatedStep(section.querySelector(".premium-checkout-activated"), "activated"),
  error: new ErrorStep(section.querySelector(".premium-checkout-error"), "error"),
  verifyEmail: new VerifyStep(section.querySelector(".premium-checkout-verify-email"), "verify-email"),
  verifyCode: new VerifyStep(section.querySelector(".premium-checkout-verify-code"), "verify-code"),
  reactivated: new Step(section.querySelector(".premium-checkout-reactivated"), "reactivated")
};

// adding step elements to the interactive card
for (const step of Object.values(steps)) {
  card.append(step.element);
}

////////////////////////////////////////////////////////////////////////////////
// PAGE CONSTRUCTION
////////////////////////////////////////////////////////////////////////////////

class Page {

  constructor() {
    this.setCurrency(defaultCurrency);
  }

  setCurrency(currency) {
    document.querySelectorAll(".premium-plan-price").forEach(price => {
      const amount = paddleProducts[currency][price.dataset.frequency].amount;
      price.textContent = getDollarString(currency, amount);
    });
  }

}

const page = new Page();
steps.purchase.on("currency-change", currency => page.setCurrency(currency));

////////////////////////////////////////////////////////////////////////////////
// FLOW CONSTRUCTION
////////////////////////////////////////////////////////////////////////////////

// creating a fake last step so that we can always assume a las step in goto below
let lastStep = {
  name: flow,
  hide: () => new Promise(resolve => resolve())
};

/**
 * log flow progress and transition from lastStep to nextStep
 * @param {Step} nextStep 
 * @param {object} [state]
 */
async function goto(nextStep, state, log) {
  if (log !== false) {
    checkoutLog("premium-checkout__step", {
      last: lastStep.name,
      next: nextStep.name,
    });
  }
  await lastStep.hide();
  await nextStep.render(state);
  await new Promise(resolve => setTimeout(resolve, 100));
  await nextStep.show();
  lastStep = nextStep;
}

// PURCHASE FLOW ///////////////////////////////////////////////////////////////

// steps.purchase "checkout-now" event begins the "purchase" flow
//
// the "purchase" flow goes:
// 1. steps.loading
// 2. steps.activated
//
// with steps.error on error.
steps.purchase.on("checkout-now", async () => {
  flow = "purchase";
  const frequency = steps.purchase.getSelectedValue();
  const currency = steps.purchase.getCurrency();
  const amount = paddleProducts[currency][frequency].amount;
  const productId = paddleProducts[currency][frequency].product;
  await goto(steps.loading);
  checkout(productId, currency, frequency, amount)
  .then(
    async () => {
      await new Promise(resolve => setTimeout(resolve, ACTIVATION_DELAY));
      activatePremium()
      .then(
        () => goto(steps.activated, { currency, frequency, amount }),
        () => goto(steps.error)
      );
    },
    () => {
      checkoutLog("premium-checkout__checkout-rejected", { productId, currency, frequency, amount });
      goto(steps.purchase);
    }
  )
});

// ALREADY CONTRIBUTED FLOW ////////////////////////////////////////////////////

// steps.purchase "already-contributed" event begins the "already-contributed" flow
//
// the "already-contributed" flow goes:
// 1. steps.verifyEmail
// 2. steps.verifyCode
// 3. steps.reactivated
//
// with loading steps in between and error steps on error.
steps.purchase.on("already-contributed", () => {
  flow = "already-contributed";
  goto(steps.verifyEmail);
});

steps.verifyEmail.on("submit", async () => {
  await goto(steps.loading);
  email = steps.verifyEmail.getValue();
  verifyEmail(email)
  .then(() => goto(steps.verifyCode))
  .catch(() => goto(steps.error))
});

steps.verifyCode.on("submit", async () => {
  await goto(steps.loading);
  verifyCode(steps.verifyCode.getValue())
  .then(
    () => activatePremium()
      .then(() => goto(steps.reactivated))
      .catch(() => goto(steps.error)),
    async error => {
      if (typeof error == "object" && error.code == "data-invalid") {
        await goto(steps.verifyCode);
        steps.verifyCode.showError();
      } else {
        goto(steps.error);
      }
    }
  );
});

[steps.error, steps.verifyEmail, steps.verifyCode].forEach(step => {
  step.on("close", () => {
    checkoutLog("premium-checkout__close");
    flow = "none";
    goto(steps.purchase)
  });
});

// ACTIVATION HANDOFF FLOW /////////////////////////////////////////////////////

// you can hand a purchase flow on another page off to this page via the
// premium-checkout__handoff parameter to begin the "activation-handoff" flow.
// 
// you can optionally name the handoff flow via premium-checkout__flow parameter.
//
// premium-checkout__(currency, frequency, and amount) are required paramaters
// for steps.activated. If they are not included then steps.reactivated will 
// render instead.
//
// the "activation-handoff" flow goes:
// 1. steps.loading
// 2. steps.activated OR steps.reactivated (depending on currency, frequency, and amount parameters)
//
// with steps.error on error.
if (adblock.query.has("premium-checkout__fake-error")) {
  email = adblock.query.get("premium-checkout__email") || "";
  userid = adblock.query.get("premium-checkout__userid") || userid;
  card.scrollIntoView();
  goto(steps.error);
} else if (adblock.query.has("premium-checkout__handoff")) {
  flow = adblock.query.get("premium-checkout__flow") || "activation-handoff";
  email = adblock.query.get("premium-checkout__email") || "";
  userid = adblock.query.get("premium-checkout__userid") || userid;
  const currency = adblock.query.get("premium-checkout__currency");
  const frequency = adblock.query.get("premium-checkout__frequency");
  let amount = adblock.query.get("premium-checkout__amount");
  let discount = adblock.query.get("premium-checkout__discount");
  discount = parseFloat(discount) || 1;
  amount = amount * discount;
  card.scrollIntoView();
  await goto(steps.loading);
  await new Promise(resolve => setTimeout(resolve, ACTIVATION_DELAY));
  activatePremium().then(
    () => {
      if (currency && frequency && amount) {
        goto(steps.activated, { currency, frequency, amount });
      } else {
        goto(steps.reactivated);
      }
    },
    () => goto(steps.error)
  );
} else {
  // if you don't begin an activation-handoff flow on load then the default
  // flow is "none" and the default step is steps.purchase
  if (flow != "none") {
    checkoutLog("premium-checkout__handover");
  }
  goto(steps.purchase, undefined, false);
}