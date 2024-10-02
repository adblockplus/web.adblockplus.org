import { checkout, checkoutEvents } from "../shared/checkout.js";
import { getDollarString } from "../shared/currency.js";

////////////////////////////////////////////////////////////////////////////////
// GLOBALS
////////////////////////////////////////////////////////////////////////////////

const REQUEST_TIMEOUT = parseInt(adblock.query.get("premium-checkout__request-timeout"), 10) || 15000;
const ACTIVATION_DELAY = parseInt(adblock.query.get("premium-checkout__activation-delay"), 10) || 6000;

const PRICES = {
  "USD": {
    "monthly": 400,
    "yearly": 4000,
  },
  "EUR": {
    "monthly": 400,
    "yearly": 4000,
  },
  "CAD": {
    "monthly": 400,
    "yearly": 4000,
  },
  "GBP": {
    "monthly": 400,
    "yearly": 4000,
  },
  "AUD": {
    "monthly": 400,
    "yearly": 4000,
  },
  "NZD": {
    "monthly": 400,
    "yearly": 4000,
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

const defaultCurrency = PRICES.hasOwnProperty(adblock.settings.currency)
  ? adblock.settings.currency
  : "USD";

let userid = adblock.query.get("premium-checkout__premiumId") || adblock.settings.premiumId;

let email = "";

let flow = adblock.query.get("premium-checkout__flow") || "none";

const section = document.querySelector(".premium-checkout");

/** interactive card (parent element to steps below) */
const card = document.querySelector(".premium-checkout-card--interactive");

////////////////////////////////////////////////////////////////////////////////
// UTILITIES
////////////////////////////////////////////////////////////////////////////////

/** log an event (always include global userid, email, and flow) */
function checkoutLog(event, data = {}) {
  adblock.data.flow = flow;
  return adblock.log(event, data);
}

////////////////////////////////////////////////////////////////////////////////
// PROMISIFIED REQUEST WRAPPERS
////////////////////////////////////////////////////////////////////////////////

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
  checkoutLog("premium-checkout__code");
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
    for (const currency in PRICES) {
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
        PRICES[currency][frequency]
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
    this.element.querySelector(".premium-checkout-error__code").textContent = `${email}:${userid}:${adblock.sid}`;
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

  show() {
    const showAnimation = super.show();
    showAnimation.then(() => {
      this.element.querySelector(".premium-checkout-verify__input").focus();
    });
    return showAnimation;
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
      const amount = PRICES[currency][price.dataset.frequency];
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
  const amount = PRICES[currency][frequency];
  const product = "premium";
  await goto(steps.loading);
  try {
    checkoutLog("premium-checkout__checkout", { product, currency, frequency, amount });
    checkout({product, currency, frequency, amount, flow});
  } catch (error) {
    goto(steps.error);
  }
});

checkoutEvents.on("checkout.closed", async () => goto(steps.purchase));
checkoutEvents.on("checkout.customer.created", data => email = data.customer.email);
checkoutEvents.on("checkout.customer.updated", data => email = data.customer.email);
checkoutEvents.on("checkout.loaded", () => checkoutLog("premium-checkout__paddle-loaded"));
checkoutEvents.on("checkout.payment.selected", () => checkoutLog("premium-checkout__paddle-payment"));
checkoutEvents.on("checkout.completed", () => checkoutLog("premium-checkout__paddle-complete"));

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
    flow = "none";
    goto(steps.purchase)
  });
});

// ACTIVATION HANDOFF FLOW /////////////////////////////////////////////////////

// you can hand a purchase flow on another page off to this page via the
// checkout__flow parameter to begin the "activation-handoff" flow.
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
  userid = adblock.query.get("premium-checkout__premiumId") || userid;
  card.scrollIntoView();
  goto(steps.error);
} else if (adblock.query.has("premium-checkout__flow")) {
  flow = adblock.query.get("premium-checkout__flow") || "activation-handoff";
  userid = adblock.query.get("premium-checkout__premiumId") || userid;
  const currency = adblock.query.get("premium-checkout__currency");
  const frequency = adblock.query.get("premium-checkout__frequency");
  const amount = adblock.query.get("premium-checkout__amount");
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
} else if (adblock.query.has("already-contributed")) {
  flow = "already-contributed";
  card.scrollIntoView();
  goto(steps.verifyEmail);
} else {
  goto(steps.purchase, undefined, false);
}