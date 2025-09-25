import { checkout } from "../modules/paddle.js";
import { getDollarString, getDollarNumber } from "../modules/currency.js";
import { fireGAConversionEvent } from "../modules/conversion.js";

if (adblock.query.has("design")) {
  document.getElementById("premium-checkout")?.classList.add("visible");
  document.documentElement.classList.add("design")
}

////////////////////////////////////////////////////////////////////////////////
// GLOBALS
////////////////////////////////////////////////////////////////////////////////

const paddleEnvironment = location.hostname == "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

const USER_ACCOUNTS_DOMAIN = paddleEnvironment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

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

const defaultCurrency = PRICES.hasOwnProperty(adblock.settings.defaultCurrency)
  ? adblock.settings.defaultCurrency
  : "USD";

let email = "";

let flow = adblock.query.get("premium-checkout__flow") || "none";

const section = document.querySelector(".premium-checkout");

const plansContainer = document.querySelector('.premium-plans');

/** interactive card (parent element to steps below) */
const card = document.querySelector(".premium-checkout-card--interactive");

const isPremiumPage = document.documentElement.dataset.page === "premium";

// Enable pre-selecting monthly/yearly payment options via clicking a
// .premium-cta[data-plan] with an allowlisted plan
const premiumPlans = ['monthly', 'yearly'];

////////////////////////////////////////////////////////////////////////////////
// UTILITIES
////////////////////////////////////////////////////////////////////////////////

/** log an event (always include global userid, email, and flow) */
function checkoutLog(event, data = {}) {
  data.flow = flow;
  console.info(event, data);
  return typeof adblock.log == "function"
  ? adblock.log(event, data)
  : new Promise(resolve => resolve())
}

function initGlobalEventHandlers() {
  if (!isPremiumPage) return;

  window.addEventListener("click", event => {
    if (
      event.target.classList
      && event.target.classList.contains('premium-cta')
      && event.target.dataset
      && event.target.dataset.plan
    ) {
      plansContainer.classList.remove('hovered');
      plansContainer.classList.add('has-selection');
      event.target.classList.add('selected');
      const plan = event.target.dataset.plan;
      if (premiumPlans.indexOf(plan) === -1) return;
      document
        .querySelector(`.premium-checkout-purchase-price[value="${plan}"]`)
        .click();

      steps.purchase.fire("checkout-now");
    }
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
   * - Listens to already contributed link click to trigger custom restore-purchase event
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
    adblock.api.updateVATState(currency);
  }

  /** get the pressed amount value */
  getSelectedValue() {
    return this.element.querySelector(".premium-checkout-purchase-price[aria-pressed='true']").value;
  }

  getCurrency() {
    return this.element.querySelector(".premium-checkout-header__select").value;
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
    this.element.querySelector(".premium-checkout-error__code").textContent = `${email}:${adblock.sid}`;
  }

}

////////////////////////////////////////////////////////////////////////////////
// STEP CONSTRUCTION
////////////////////////////////////////////////////////////////////////////////

/** steps initialised based on (probably hidden) dom elements */
const steps = {
  purchase: new PurchaseStep(section.querySelector(".premium-checkout-purchase"), "purchase"),
  loading: new Step(section.querySelector(".premium-checkout-loading"), "loading"),
  error: new ErrorStep(section.querySelector(".premium-checkout-error"), "error")
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

// creating a fake last step so that we can always assume a last step in goto below
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
  try {
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
  } finally {
    lastStep = nextStep;
  }
}

// PURCHASE FLOW ///////////////////////////////////////////////////////////////

// steps.purchase "checkout-now" event begins the "purchase" flow
steps.purchase.on("checkout-now", async () => {
  try {
    flow = "purchase";
    const frequency = steps.purchase.getSelectedValue();
    const currency = steps.purchase.getCurrency();
    const amount = PRICES[currency][frequency];
    const product = "premium";
    await goto(steps.loading);
    checkoutLog("premium-checkout__checkout", { product, currency, frequency, amount });
    checkout({
      product,
      currency,
      frequency,
      amount,
      flow,
      settings: {
        successUrl: null // override successUrl as we want to redirect with transaction ID / email from post purchase.
      }
    });
  } catch (error) {
    adblock.logScriptError("premium.checkout", error);
    document.getElementById("premium-checkout").classList.add("visible");
    await goto(steps.error);
    card.scrollIntoView();
  }
});

adblock.on("checkout.closed", async () => goto(steps.purchase));
adblock.on("checkout.customer.created", data => email = data.customer.email);
adblock.on("checkout.customer.updated", data => email = data.customer.email);
adblock.on("checkout.loaded", () => checkoutLog("premium-checkout__paddle-loaded"));
adblock.on("checkout.payment.selected", () => checkoutLog("premium-checkout__paddle-payment"));
adblock.on("checkout.completed", async (data) => {
  if (!data.transaction_id || !data.customer.email) {
    return;
  }

  /**
   * Show the account loading spinner. Ideally we could separate out
   * the spinner from the duplicate subscription CSS into its own
   * component. But for now we can re-use it.
   */
  try {
    const accountRestore = document.getElementById("account-restore");

    if (accountRestore) {
      document.documentElement.dataset.account = "finding";
      document.body.appendChild(document.getElementById(accountRestore));
    }
  } catch (e) {
    // do nothing
  }

  // Send purchase data to GA is present
  try {
    const frequency = data.custom_data.sub_type;
    const currency = data.custom_data.currency;
    const amount = data.custom_data.amount_cents;

    if (frequency && currency && amount) {
      const value = getDollarNumber(currency, amount) + "";
      fireGAConversionEvent(frequency, currency, value);
    }
  } catch (e) {
    // do nothing
  }

  // Forward transaction ID / email to user accounts portal.
  const transaction_id = encodeURIComponent(data.transaction_id);
  const email = encodeURIComponent(data.customer.email);
  const successUrl = `${USER_ACCOUNTS_DOMAIN}?transaction_id=${transaction_id}&email=${email}&s=abp-w`;
  checkoutLog("premium-checkout__paddle-complete");
  window.location.href = successUrl;
});

// Set the initial page state to steps.purchase
try {
  await goto(steps.purchase, undefined, false);
} catch (error) {
  adblock.logScriptError("premium.purchase", error);
  document.getElementById("premium-checkout").classList.add("visible");
  await goto(steps.error);
  card.scrollIntoView();
}

adblock.on("checkout.loaded", () => {
  goto(steps.purchase, undefined, false);
});

function initReactivationLinks() {
  document.querySelector(".premium-checkout__user-accounts-sign-in-link").addEventListener("click", event => {
    event.preventDefault();
    // Redirect to user accounts portal login flow, which
    // also handles extension reactivation.
    window.location.href = `${USER_ACCOUNTS_DOMAIN}?premium=false&s=abp-w`
  });

  // Show sign-in link on /premium page
  const oldPremiumReactivationLink = document.querySelector('.premium-plans__already-contributed');
  const newPremiumReactivationLink = document.querySelector('.premium-plans__already-purchased-sign-in');

  if (oldPremiumReactivationLink && newPremiumReactivationLink) {
    oldPremiumReactivationLink.hidden = true;
    newPremiumReactivationLink.hidden = false;
  }

  // show sign-in linnk on checkout card
  const oldCheckouCardReactivationLink = document.querySelector('.premium-checkout-card-footer-column__already-contributed');
  const newCheckouCardReactivationLink = document.querySelector('.premium-checkout-card-footer-column__already-purchased-sign-in');

  if (oldCheckouCardReactivationLink && newCheckouCardReactivationLink) {
    oldCheckouCardReactivationLink.hidden = true;
    newCheckouCardReactivationLink.hidden = false;
  }
}

document.querySelectorAll(".placeholder").forEach(element => {
  element.classList.remove("placeholder");
});

initGlobalEventHandlers();
initReactivationLinks();

export default steps;
