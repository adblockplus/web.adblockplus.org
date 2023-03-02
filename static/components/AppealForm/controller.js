/* global adblock, eyeo, Paddle */

import { CONFIGURATION } from "./configuration.js";
import { AppealForm } from "./AppealForm.js";

let paddleConfiguration = CONFIGURATION.Paddle.live;

const queryParameters = new URLSearchParams(location.search);

if (queryParameters.get("testmode")) {
  paddleConfiguration = CONFIGURATION.Paddle.sandbox;
}

if (paddleConfiguration == CONFIGURATION.Paddle.sandbox) {
  Paddle.Environment.set("sandbox");
}

Paddle.Setup({ vendor: paddleConfiguration.vendor });

const appealForm = new AppealForm({
  paddleConfiguration,
  formConfiguration: CONFIGURATION.AppealForm,
  placeholder: document.querySelector(".appeal-form"),
});

appealForm.onSubmit((data) => {

  appealForm.disable();

  // Storing information to be consumed by optimizely and hotjar experiments
  if (eyeo && eyeo.payment && eyeo.payment.shouldStoreContributionInfo) {
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

  const passthrough = {
    testmode: false,
    userid: "",
    tracking: recordTracking(true),
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
    success_url: `${location.origin}/payment-complete`,
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
    fetch("https://getadblock.appspot.com/paddle/generate-pay-link", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passthrough),
    })
    .then(response => response.json())
    .then(session => {
      Paddle.Checkout.open(Object.assign(checkoutOptions, {
        override: session.url,
      }));
    })
    .catch(error => adblock.error(error));
  } else {
    Paddle.Checkout.open(Object.assign(checkoutOptions, {
      allowQuantity: false,
      passthrough,
      product,
    }));
  }
  
});