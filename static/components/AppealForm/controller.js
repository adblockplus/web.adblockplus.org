/* global adblock, eyeo, Paddle */

import { CONFIGURATION } from "./configuration.js";
import { AppealForm } from "./AppealForm.js";
import { toDollarNumber } from "../currency.js";

const SANDBOX_HOSTNAMES = [
  /^localhost$/,
  /^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,
  /^dev--adblockplus-org--[\w\-]+.web.app$/,
];

let paddleConfig = SANDBOX_HOSTNAMES.some((originPattern) => { return originPattern.test(location.hostname) }) ? CONFIGURATION.Paddle.sandbox : CONFIGURATION.Paddle.live;

if (adblock.searchParameters.has("testmode") || adblock.searchParameters.get("mode") == "test") {
  paddleConfig = CONFIGURATION.Paddle.sandbox;
} else if (adblock.searchParameters.get("mode") == "live") {
  paddleConfig = CONFIGURATION.Paddle.live;
}

adblock.config.paddle = paddleConfig;

const isTestmode = paddleConfig == CONFIGURATION.Paddle.sandbox;

if (isTestmode) Paddle.Environment.set("sandbox");

Paddle.Setup({ vendor: paddleConfig.vendor });

const placeholder = document.querySelector(".appeal-form");
const formConfig = CONFIGURATION.AppealForm;
const appealForm = adblock.runtime.appealForm = new AppealForm({ paddleConfig, formConfig, placeholder });

eyeo = eyeo || {};
eyeo.payment = eyeo.payment || {};

function getCompletedUrl() {
  if (typeof eyeo != "object" || typeof eyeo.payment != "object" || typeof eyeo.payment.paymentCompleteUrl != "string" ) {
    return "/payment-complete";
  } else {
    return eyeo.payment.paymentCompleteUrl;
  }
}

appealForm.events.on(AppealForm.EVENTS.SUBMIT, (data) => {

  appealForm.disable();

  const language = document.documentElement.lang || "en";

  const clickTimestamp = Date.now();

  const contributionInfo = JSON.stringify({
    amount: data.amount,
    frequency: data.frequency,
    processor: "paddle",
    currency: data.currency,
    lang: document.documentElement.lang,
    source: document.documentElement.getAttribute("data-page"),
    clickTs: clickTimestamp
  });

  const successParameters = new URLSearchParams();
  if (eyeo.payment.productId == "ME") {
    const _userid = forceGetUserId();
    successParameters.set("premium-checkout__handoff", 1);
    successParameters.set("premium-checkout__flow", document.documentElement.getAttribute("data-page"));
    successParameters.set("premium-checkout__userid", _userid);
    successParameters.set("premium-checkout__currency", data.currency);
    successParameters.set("premium-checkout__amount", data.amount);
    successParameters.set("premium-checkout__frequency", data.frequency);
    successParameters.set("premium-checkout__language", language);
    successParameters.set("premium-checkout__timestamp", clickTimestamp);
  }

  // Storing information to be consumed by optimizely and hotjar experiments
  if (eyeo.payment.shouldStoreContributionInfo) {
    localStorage.setItem("contributionInfo", contributionInfo);
  }

  let successURL = eyeo.payment.paymentCompleteUrl || "/payment-complete";
  if (false == successURL.startsWith("https://")) successURL = `/${language}/${successURL}`

  const passthrough = {
    testmode: isTestmode,
    userid: eyeo.payment.productId == "ME" ? forceGetUserId() : "",
    tracking: recordTracking(),
    locale: "",
    country: "unknown",
    ga_id: "",
    premium: eyeo.payment.productId == "ME" ? "true" : "false",
    premium_cid: "0",
    premium_sid: "0",
    currency: data.currency,
    recurring: data.frequency != "once",
    subType: data.frequency != "once" ? data.frequency : "",
    experiment: "",
    experiment_id: "",
    variant: "",
    variant_index: -1,
    amount_cents: parseInt(data.amount, 10),
    success_url: `${successURL}?${successParameters.toString()}`,
    cancel_url: location.href,
  };

  const product = data.product;

  const checkoutOptions = {
    locale: adblock.settings.language,
    title: adblock.strings["appeal-form-checkout__title"],
    success: passthrough.success_url,
    closeCallback: () => { appealForm.enable(); },
  };

  if (product == "custom") {
    fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passthrough),
    })
    .then(response => response.json())
    .then(session => {
      if (session.hasOwnProperty("success") && session.success == false) {
        throw new Error();
      }
      Paddle.Checkout.open(Object.assign(checkoutOptions, {
        override: session.url,
      }));
    })
    .catch((error) => {
      adblock.error(adblock.strings["error--unexpected"]);
      appealForm.enable();
    });
  } else {
    Paddle.Checkout.open(Object.assign(checkoutOptions, {
      allowQuantity: false,
      passthrough,
      product,
    }));
  }
  
});

/* temporarily adding the update premium reward feature to installed for testing
 ******************************************************************************/

adblock.config.upsellPremium = () => {
  if (document.documentElement.getAttribute("data-page") != "installed") return false;
  eyeo.payment.productId = "ME";
  eyeo.payment.paymentCompleteUrl = "https://accounts.adblockplus.org/premium";
  document.querySelector(".update-payment-reward").removeAttribute("hidden");
  return true;
}

if (adblock.query.has("upsellPremium")) adblock.config.upsellPremium();

const rewardController = adblock.runtime.rewardController = {};

const getReward = rewardController.getReward = (currency, frequency, amount) => {
  let plan = "ME";
  let months;
  if (frequency == "once") {
    const amountNumerator = parseInt(amount, 10);
    const onceDenominator = parseInt(Object.keys(paddleConfig.products[currency].once)[2], 10);
    const monthlyDenominator = parseInt(Object.keys(paddleConfig.products[currency].monthly)[0], 10);
    if (amountNumerator < onceDenominator) {
      months = Math.floor(amountNumerator / monthlyDenominator);
    } else {
      months = 12 * Math.floor(amountNumerator / onceDenominator);
    }
  }
  return { plan, months };
}

const updateReward = rewardController.renderReward = () => {
  if (eyeo.payment.productId != "ME") return;
  const { currency, frequency, product, amount } = appealForm.state();
  const frequencySuffixes = {
    "once": "",
    "monthly": adblock.strings["suffix__monthly"],
    "yearly": adblock.strings["suffix__yearly"],
  };
  const { plan, months } = getReward(currency, frequency, amount)
  const planName = adblock.strings["adblock__premium"];
  const suffix = frequencySuffixes[frequency];
  appealForm.setRewardDuration(currency, amount, months);
  localStorage.setItem("planinfo", JSON.stringify({ durationMonths: months, plan }));
  localStorage.setItem("purchaseinfo", JSON.stringify({ amount, frequency, plan, suffix, planName }));
}

appealForm.events.on(AppealForm.EVENTS.AMOUNT_CHANGE, updateReward);
document.addEventListener("DOMContentLoaded", updateReward);