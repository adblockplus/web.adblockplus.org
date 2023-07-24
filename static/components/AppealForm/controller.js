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
  return eyeo.payment.paymentCompleteUrl && eyeo.payment.paymentCompleteUrl.startsWith("http")
    ? `${location.origin}${eyeo.payment.paymentCompleteUrl || '/payment-complete'}`
    : `${eyeo.payment.paymentCompleteUrl || '/payment-complete'}`;
}

appealForm.events.on(AppealForm.EVENTS.SUBMIT, (data) => {

  appealForm.disable();

  // Storing information to be consumed by optimizely and hotjar experiments
  if (eyeo.payment.shouldStoreContributionInfo) {
    localStorage.setItem("contributionInfo", JSON.stringify({
      amount: data.amount,
      frequency: data.frequency,
      processor: "paddle",
      currency: data.currency,
      lang: document.documentElement.lang,
      source: eyeo.payment.sourceId || "U",
      clickTs: Date.now(),
    }));
  }

  const omitUserId = true;

  const tracking = recordTracking(omitUserId);
  const successParameters = new URLSearchParams();
  if (tracking.startsWith("ME ")) {
    const trackingParts = tracking.split(" ");
    successParameters.append("thankyou", 1);
    successParameters.append("var", 1);
    successParameters.append("u", trackingParts[trackingParts.length - 1]);
    successParameters.append("from", eyeo.payment.variant_name || "null");
    successParameters.append("from__amount", toDollarNumber(data.amount));
    successParameters.append("from__frequency", data.frequency);
  }

  const passthrough = {
    testmode: isTestmode,
    userid: "",
    tracking: recordTracking(omitUserId),
    locale: "",
    country: "unknown",
    ga_id: "",
    premium: "false",
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
    success_url: `${getCompletedUrl()}?${successParameters.toString()}`,
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