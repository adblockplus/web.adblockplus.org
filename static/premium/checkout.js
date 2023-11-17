/* global adblock, Paddle */
async function onPaddleLoaded() {

  ////////////////////////////////////////////////////////////////////////////////
  // SETUP DEV ENVIRONMENT
  ////////////////////////////////////////////////////////////////////////////////
  if (!adblock.query.has("dev")) return;
  document.getElementById("payments").hidden = true;
  const section = document.querySelector(".premium-checkout");
  section.hidden = false;
  section.scrollIntoView();

  ////////////////////////////////////////////////////////////////////////////////
  // GLOBALS
  ////////////////////////////////////////////////////////////////////////////////

  const REQUEST_TIMEOUT = adblock.query.get("premium-checkout__request-timeout") || 30000;
  const ACTIVATION_DELAY = adblock.query.get("premium-checkout__activation-delay") || 3000;

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

  const isTestmode = adblock.query.has("testmode");

  const language = adblock.settings.language || document.documentElement.lang || navigator.language;

  const paddleEnvironment = isTestmode
    ? PADDLE.test
    : PADDLE.live;

  const paddleLocale = PADDLE.locales[language] || language;

  ////////////////////////////////////////////////////////////////////////////////
  // UTILITIES
  ////////////////////////////////////////////////////////////////////////////////

  // CAUTION may not support future currencies
  function getDollarNumber(currency, amount) {
    return currency == "JPY" ? amount : amount / 100;
  }

  // CAUTION uses language from globals above
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

  // CAUTION must be AdBlock compatible
  function generateUserId() {
    const suffix = (Date.now()) % 1e8; // 8 digits from end of timestamp
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
    let chars = "";
    for (let i = 0; i < 8; i++) 
      chars += allowed[Math.floor(Math.random() * allowed.length)]
    return chars + suffix;
  }

  const userid = adblock.query.get("premium-checkout__userid") || generateUserId();

  // CAUTION must be AdBlock compatible
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

  // CAUTION must be AdBlock compatible
  function getOS() {
    const appVersion = navigator.appVersion || "";
    const userAgent = navigator.userAgent || "";
    return appVersion.includes("Win") ? "W"
      : userAgent.includes("iPhone") || userAgent.includes("iPad") || userAgent.includes("iPod") ? "I"
      : appVersion.includes("Mac") ? "M"
      : appVersion.includes("X11") || appVersion.includes("Linux") ? "L"
      : "U";
  }

  // CAUTION must be AdBlock compatible
  // CAUTION the experiment and page source parts of this ID are hard coded
  function generateTrackingId() {
    return `ME X0G0 F${getBrowser()}O${getOS()}SME ${userid}`;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // PADDLE SETUP
  ////////////////////////////////////////////////////////////////////////////////

  if (isTestmode) {
    Paddle.Environment.set('sandbox');
  }

  Paddle.Setup({ vendor: paddleEnvironment.vendorId });

  ////////////////////////////////////////////////////////////////////////////////
  // PROMISIFIED REQUEST WRAPPERS
  ////////////////////////////////////////////////////////////////////////////////

  function checkout(userid, product, currency, frequency, amount) {
    adblock.log("premium-checkout__checkout-open", { userid, product, currency, frequency, amount });
    return new Promise((resolve, reject) => {
      const checkoutOptions = {
        title: "Adblock Plus Premium",
        product: product,
        allowQuantity: false,
        locale: paddleLocale,
        closeCallback: reject,
        passthrough: {
          "testmode": isTestmode,
          "userid": userid,
          "tracking": generateTrackingId(userid),
          "locale": language,
          "country": "unknown", // ABP doesn't have generic geo location yet
          "ga_id": "", // ABP doesn't track GA
          "premium": false, // ABP doesn't track premium && cid/sid
          "premium_cid": "0",
          "premium_sid": "0",
          "currency": currency,
          "recurring": true,
          "subType": frequency,
          "experiment": "", // ABP doesn't support these experiments/variants
          "experiment_id": "",
          "variant": "",
          "variant_index": -1,
          "amount_cents": amount,
          "cancel_url": location.href,
        },
      };
      if (location.origin == "https://accounts.adblockplus.org" && location.pathname.endsWith("/premium")) {
        checkoutOptions.successCallback = resolve;
      } else {
        const params = new URLSearchParams();
        params.set("premium-checkout__activate", true);
        params.set("premium-checkout__flow", adblock.settings.premiumCheckoutFlow || "purchase");
        params.set("premium-checkout__userid", userid);
        params.set("premium-checkout__currency", currency);
        params.set("premium-checkout__amount", amount);
        params.set("premium-checkout__frequency", frequency);
        checkoutOptions.success = `https://accounts.adblockplus.org/premium?${params.toString()}`;
      }
      localStorage.setItem("contributionInfo", JSON.stringify({
        amount: getDollarNumber(currency, amount),
        frequency: frequency,
        processor: "paddle",
        currency: currency,
        lang: language,
        source: "ME",
        clickTs: Date.now()
      }));
      Paddle.Checkout.open(checkoutOptions);
    });
  }

  let resolvePremiumActivation = () => {};
  let rejectPremiumActivation = () => {};

  window.addEventListener("message", response => {
    if (response && response.data && typeof response.data.ack == "boolean") {
      if (response.data.ack) {
        resolvePremiumActivation(response.data);
      } else {
        rejectPremiumActivation(response.data);
      }
    }
  });

  function activatePremium(userid) {
    adblock.log("premium-checkout__premium-activate", { userid });
    return new Promise((resolve, reject) => {
      window.postMessage({
        command: "payment_success",
        userId:  userid,
        version: 1,
      });
      resolvePremiumActivation = resolve;
      rejectPremiumActivation = reject;
      setTimeout(() => reject({ reason: "timeout" }), REQUEST_TIMEOUT);
    });
  }

  function verifyEmail(email) {
    adblock.log("premium-checkout__verify-email", { userid, email });
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

  function verifyCode(userid, code) {
    adblock.log("premium-checkout__verify-code", { userid, code });
    return new Promise((resolve, reject) => {
      fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cmd: "validate_already_donated",
          code: code,
          userid: userid,
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

    constructor(element, name) {

      super(element, name);

      this.element
      .querySelectorAll(".premium-checkout-purchase-price")
      .forEach(clickedPrice => clickedPrice.addEventListener("click", event => {
        event.preventDefault();
        const pressedPrice = this.element.querySelector(".premium-checkout-purchase-price[aria-pressed='true']");
        if (pressedPrice != clickedPrice) {
          pressedPrice.ariaPressed = false;
          clickedPrice.ariaPressed = true;
        }
      }));

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

    getSelectedValue() {
      return this.element.querySelector(".premium-checkout-purchase-price[aria-pressed='true']").value;
    }

  }

  class ActivatedStep extends Step {

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

    constructor(element, name) {

      super(element, name);

      this.element
      .querySelector(".premium-checkout-card-header__close-button")
      .addEventListener("click", event => {
        event.preventDefault();
        this.fire("close");
      });

    }

    render() {
      super.render();
      this.element.querySelector(".premium-checkout-error__code").textContent = userid;
    }

  }

  class VerifyStep extends Step {

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

    getValue() {
      return this.element.querySelector(".premium-checkout-verify__input").value;
    }

    showError() {
      this.element.querySelector(".premium-checkout-verify__error").hidden = false;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  // FLOW DEFINITION
  ////////////////////////////////////////////////////////////////////////////////

  const card = document.querySelector(".premium-checkout-card--interactive");

  const steps = {
    purchase: new PurchaseStep(section.querySelector(".premium-checkout-purchase"), "purchase"),
    loading: new Step(section.querySelector(".premium-checkout-loading"), "loading"),
    activated: new ActivatedStep(section.querySelector(".premium-checkout-activated"), "activated"),
    error: new ErrorStep(section.querySelector(".premium-checkout-error"), "error"),
    verifyEmail: new VerifyStep(section.querySelector(".premium-checkout-verify-email"), "verify-email"),
    verifyCode: new VerifyStep(section.querySelector(".premium-checkout-verify-code"), "verify-code"),
    reactivated: new Step(section.querySelector(".premium-checkout-reactivated"), "reactivated")
  };

  for (const step of Object.values(steps)) {
    card.append(step.element);
  }

  let lastStep = {
    name: "none",
    hide: () => new Promise(resolve => resolve())
  };

  async function goto(nextStep, options = { flow: "none", log: true }) {
    if (options.log !== false) {
      adblock.log("premium-checkout__step", {
        last: lastStep.name, 
        next: nextStep.name, 
        flow: options.flow, 
        userid: userid
      });  
    }
    await lastStep.hide();
    await nextStep.render(options);
    await new Promise(resolve => setTimeout(resolve, 100));
    await nextStep.show();
    lastStep = nextStep;
  }

  let flow = "purchase";

  steps.purchase.on("checkout-now", async () => {
    flow = "purchase";
    const frequency = steps.purchase.getSelectedValue();
    const currency = "USD";
    const amount = paddleEnvironment[frequency].amount;
    const productId = paddleEnvironment[frequency].productId;
    await goto(steps.loading, { log: false });
    checkout(userid, productId, currency, frequency, amount)
    .then(
      async () => {
        await new Promise(resolve => setTimeout(ACTIVATION_DELAY, resolve));
        activatePremium(userid)
        .then(
          () => goto(steps.activated, { flow, currency, frequency, amount }),
          () => goto(steps.error, { flow })
        );
      },
      () => {
        adblock.log("premium-checkout__checkout-close", { userid: userid, productId, currency, frequency, amount });
        goto(steps.purchase, { log: false });
      }
    )
  });  

  steps.purchase.on("already-contributed", () => {
    flow = "already-contributed";
    goto(steps.verifyEmail, { flow });
  });

  steps.verifyEmail.on("submit", async () => {
    await goto(steps.loading, { log: false });
    verifyEmail(steps.verifyEmail.getValue())
    .then(() => goto(steps.verifyCode, { flow }))
    .catch(() => goto(steps.error, { flow }))
  });

  steps.verifyCode.on("submit", async () => {
    await goto(steps.loading, { log: false });
    verifyCode(userid, steps.verifyCode.getValue())
    .then(
      () => activatePremium(userid)
        .then(() => goto(steps.reactivated, { flow }))
        .catch(() => goto(steps.error, { flow }))
    )
    .catch(async error => {
      if (typeof error == "object" && error.code == "data-invalid") {
        await goto(steps.verifyCode, { log: false });
        steps.verifyCode.showError();
      } else {
        goto(steps.error, { flow });
      }
    });
  });

  [steps.error, steps.verifyEmail, steps.verifyCode].forEach(step => {
    step.on("close", () => goto(steps.purchase, { flow }));
  });

  if (adblock.query.has("premium-checkout__activate")) {
    const flow = adblock.query.get("premium-checkout__flow");
    const userid = adblock.query.get("premium-checkout__userid");
    const currency = adblock.query.get("premium-checkout__currency");
    const frequency = adblock.query.get("premium-checkout__frequency");
    const amount = adblock.query.get("premium-checkout__amount");
    card.scrollIntoView();
    await goto(steps.loading, { log: false });
    await new Promise(resolve => setTimeout(ACTIVATION_DELAY, resolve));
    activatePremium(userid).then(
      () => goto(steps.activated, { flow, currency, frequency, amount }),
      () => goto(steps.error, { flow })
    );
  } else {
    goto(steps.purchase, { log: false });
  }
}

const paddleLoading = setInterval(() => {
  if (typeof Paddle != "undefined") {
    clearInterval(paddleLoading);
    onPaddleLoaded();
  }
}, 100);