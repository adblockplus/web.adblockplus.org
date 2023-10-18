/* global adblock, eyeo, Paddle */
/**
 * This file is similar to components/AppealForm/controller but some
 * core funcitonality has been wrapped in functions for exporting
 */
import { CONFIGURATION } from "./configuration";
import { toDollarNumber } from "../currency";

const paddleConfig = createPaddleConfig();

adblock.config.paddle = paddleConfig;

const isTestmode = paddleConfig == CONFIGURATION.Paddle.sandbox;

if (isTestmode) Paddle.Environment.set("sandbox");

Paddle.Setup({ vendor: paddleConfig.vendor });

eyeo = eyeo || {};
eyeo.payment = eyeo.payment || {};

function createPaddleConfig() {
  const SANDBOX_HOSTNAMES = [
    /^localhost$/,
    /^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,
    /^dev--adblockplus-org--[\w\-]+.web.app$/,
  ];

  let config = SANDBOX_HOSTNAMES.some((originPattern) => {
    return originPattern.test(location.hostname);
  })
    ? CONFIGURATION.Paddle.sandbox
    : CONFIGURATION.Paddle.live;

  if (
    adblock.searchParameters.has("testmode") ||
    adblock.searchParameters.get("mode") == "test"
  ) {
    config = CONFIGURATION.Paddle.sandbox;
  } else if (adblock.searchParameters.get("mode") == "live") {
    config = CONFIGURATION.Paddle.live;
  }

  return config;
}

function createContributionInfo(data) {
  return JSON.stringify({
    amount: data.amount,
    frequency: data.frequency,
    processor: "paddle",
    currency: data.currency,
    lang: document.documentElement.lang,
    source: eyeo.payment.sourceId || "U",
    clickTs: Date.now(),
  });
}

function createSuccessParameters(data) {
  const successParameters = new URLSearchParams();

  if (eyeo.payment.productId == "ME") {
    successParameters.append("thankyou", 1);
    successParameters.append("var", 1);
    successParameters.append("u", forceGetUserId());
    successParameters.append("from", eyeo.payment.variantName || "null");
    successParameters.append("from__currency", data.currency);
    successParameters.append(
      "from__amount",
      toDollarNumber(data.currency, data.amount)
    );
    successParameters.append("from__frequency", data.frequency);
  }

  return successParameters;
}

function createPassthrough(data, successParameters) {
  return {
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
    success_url: `${
      eyeo.payment.paymentCompleteUrl || "/payment-complete"
    }?${successParameters.toString()}`,
    cancel_url: location.href,
  };
}

function createCheckoutOptions(successParameters, closeCallback) {
  return {
    locale: adblock.settings.language,
    title: adblock.strings["appeal-form-checkout__title"],
    success: `${
      eyeo.payment.paymentCompleteUrl || "/payment-complete"
    }?${successParameters.toString()}`,
    closeCallback,
  };
}

function checkout(product, passthrough, checkoutOptions, onErrorCallback) {
  if (product == "custom") {
    fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passthrough),
    })
      .then((response) => response.json())
      .then((session) => {
        if (session.hasOwnProperty("success") && session.success == false) {
          throw new Error();
        }

        Paddle.Checkout.open(
          Object.assign(checkoutOptions, {
            override: session.url,
          })
        );
      })
      .catch((error) => {
        console.error(error);
        adblock.error(adblock.strings["error--unexpected"]);
        onErrorCallback && onErrorCallback(error);
        appealForm.enable();
      });
  } else {
    Paddle.Checkout.open(
      Object.assign(checkoutOptions, {
        allowQuantity: false,
        passthrough,
        product,
      })
    );
  }
}

export {
  createPaddleConfig,
  createContributionInfo,
  createSuccessParameters,
  createPassthrough,
  createCheckoutOptions,
  checkout,
};
