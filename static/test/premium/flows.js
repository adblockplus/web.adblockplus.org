/* global adblock, Paddle */
import { query, parent, log, dom, create, append } from "../utils.js";
import { isTestmode, paddleEnvironment, getPaddleLocale, getPaddleAmount, getPaddleProductId } from "./paddle.js";
import { getLocale, getCurrency, generateUserId, generateTrackingId } from "../user.js";
import { getDollarNumber } from "../currency.js";

function onPaddleLoaded() {

  // Exclude all non test param requests
  if (!query.has("test")) return;

  // Log query for our information in case of console log export
  log("test__query", query.toString());

  //////////////////////////////////////////////////////////////////////////////
  // Environment
  //////////////////////////////////////////////////////////////////////////////

  append(create([
    ["environment__heading", "h2", { textContent: "Set environment" }],
    ["environment__paragraph", "p", { innerHTML: "You can use <a href='https://developer.paddle.com/concepts/payment-methods/credit-debit-card'>test cards</a> in testmode." }],
    ["environment__checkbox", "input", { type: "checkbox", id: "test-environment", checked: isTestmode }],
    ["environment__label", "label", { textContent: "Testmode", htmlFor: "test-environment" }],
  ]));

  // refresh query test__environment on env checkbox change
  dom.environment__checkbox.addEventListener("change", () => {
    if (dom.environment__checkbox.checked) {
      query.set("testmode", true);
    } else {
      query.delete("testmode");
    }
    location.href = `${location.origin}${location.pathname}?${query.toString()}`;
  });

  //////////////////////////////////////////////////////////////////////////////
  // Purchase flow
  //////////////////////////////////////////////////////////////////////////////

  append(create([
    ["purchase__heading", "h2", { textContent: "Purchase flow" }],
    ["purchase__checkout__paragraph-1", "p", { innerHTML: "Don't forget to reinstall first if you want a fresh start." }],
  ]));

  // 1. Checkout ///////////////////////////////////////////////////////////////

  append(create([
    ["purchase__checkout__heading", "h3", { textContent: "1. Checkout" }],
    ["purchase__checkout__paragraph-3", "p", { textContent: "ABP doesn't support VPN or other currencies yet." }],
    ["purchase__checkout__monthly", "button", { textContent: "Checkout monthly" }],
    ["purchase__checkout__yearly", "button", { textContent: "Checkout yearly" }],
    ["purchase__checkout__status", "textarea", { disabled: true }],
  ]));

  function onCheckoutSubmit(frequency, event) {
    event.preventDefault();
    const userid = generateUserId();
    const params = new URLSearchParams();
    params.set("test", true);
    params.set("test__checkout__success", true);
    params.set("test__checkout__userid", userid);
    localStorage.setItem("contributionInfo", JSON.stringify({
      amount: getDollarNumber(getPaddleAmount(frequency)),
      frequency: frequency,
      processor: "paddle",
      currency: getCurrency(),
      lang: getLocale(),
      source: "ME",
      clickTs: Date.now()
    }));
    Paddle.Checkout.open({
      title: "Adblock Plus Premium",
      product: getPaddleProductId(frequency),
      allowQuantity: false,
      success: `${location.origin}${location.pathname}?${params.toString()}`,
      locale: getPaddleLocale(),
      passthrough: {
        "testmode": isTestmode,
        "userid": userid,
        "tracking": generateTrackingId(userid),
        "locale": getLocale(),
        "country": "unknown", // ABP doesn't have generic geo location yet
        "ga_id": "", // ABP doesn't track GA
        "premium": false, // ABP doesn't track premium && cid/sid
        "premium_cid": "0",
        "premium_sid": "0",
        "currency": getCurrency(),
        "recurring": true,
        "subType": frequency,
        "experiment": "", // ABP doesn't support these experiments/variants
        "experiment_id": "",
        "variant": "",
        "variant_index": -1,
        "amount_cents": getPaddleAmount(frequency),
        "cancel_url": location.href,
      },
    });
  }

  if (isTestmode) {
    Paddle.Environment.set('sandbox');
  }
  Paddle.Setup({ 
    vendor: paddleEnvironment.vendorId,
    eventCallback: event => {
      log("purchase__checkout__status", JSON.stringify({ PaddleEvent: event.event }));
    },
  });

  dom.purchase__checkout__monthly.addEventListener("click", event => onCheckoutSubmit("monthly", event));
  dom.purchase__checkout__yearly.addEventListener("click", event => onCheckoutSubmit("yearly", event));

  // 2. Activate ///////////////////////////////////////////////////////////////

  append(create([
    ["purchase__activate__heading", "h3", { textContent: "2. Activation" }],
    ["purchase__activate__paragraph-1", "p", { textContent: "The checkout will redirect back here with test__checkout__success and test__checkout__userid parameters required for this step." }],
    ["purchase__activate__paragraph-2", "p", { textContent: "You'll need to manually remove these parameters afterwards or else this step will be repeated whenever you refresh this page." }],
    ["purchase__activate__status", "textarea", { disabled: true }],
  ]));

  if (query.has("test__checkout__success") && query.has("test__checkout__userid")) {
    const contributionInfo = localStorage.getItem("contributionInfo");
    log("purchase__activate__status", contributionInfo);
    let hasABPResponded = false;
    setTimeout(() => {
      if (!hasABPResponded) log("purchase__activate__status", "timeout");
    }, 10000);
    window.addEventListener("message", response => {
      if (response && response.data && typeof response.data.ack == "boolean") {
        if (response.data.ack) {
          log("purchase__activate__status", "success");
        } else {
          log("purchase__activate__status", "error");
        }
        log("purchase__activate__status", JSON.stringify(response));
        hasABPResponded = true;
      }
    });
    window.postMessage({
      command: "payment_success",
      userId:  query.get("test__checkout__userid"),
      version: 1,
    });
    log("purchase__activate__status", "sent");
  }

  //////////////////////////////////////////////////////////////////////////////
  // Already donated flow
  //////////////////////////////////////////////////////////////////////////////

  append(create([
    ["verify__heading", "h2", { textContent: "Already donated flow" }],
    ["verify__email__paragraph-1", "p", { textContent: "Don't forget to reinstall if you want a fresh start." }],
    ["verify__email__paragraph-2", "p", { innerHTML: "Don't forget to refresh if you reinstall or else you won't be able to reactivate." }],
  ]));

  // 1. Submit email ///////////////////////////////////////////////////////////

  append(create([
    ["verify__email__heading", "h3", { textContent: "1. Submit email" }],
    ["verify__email__input", "input", { placeholder: "Email" }],
    ["verify__email__submit", "button", { textContent: "Submit email" }],
    ["verify__email__status", "textarea", { disabled: true }],
  ]));

  dom.verify__email__submit.addEventListener("click", event => {
    event.preventDefault();
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "already_donated",
        email: dom.verify__email__input.value
      })
    })
    .then(response => response.json())
    .then(response => {
      log("verify__email__status", JSON.stringify(response));
    });
    log("verify__email__status", "sent");
  });

  // 2. Submit code ////////////////////////////////////////////////////////////

  append(create([
    ["verify__code__heading", "h3", { textContent: "2. Submit code" }],
    ["verify__code__paragraph", "p", { textContent: "Find the code in your email." }],
    ["verify__code__input", "input", { placeholder: "Code" }],
    ["verify__code__submit", "button", { textContent: "Submit code" }],
    ["verify__code__status", "textarea", { disabled: true }],
    ["verify__activate__heading", "h3", { textContent: "3. Activation" }],
    ["verify__activate__status", "textarea", { disabled: true }],
  ]));

  dom.verify__code__submit.addEventListener("click", event => {
    event.preventDefault();
    const userid = getUserId();
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "validate_already_donated",
        code: dom.verify__code__input.value,
        userid: userid,
      })
    })
    .then(response => response.json())
    .then(response => {
      log("verify__code__status", JSON.stringify(response));
      if (response.success) {

        // 3. Activate /////////////////////////////////////////////////////////

        let hasABPResponded = false;
        setTimeout(() => {
          if (!hasABPResponded) log("verify__activate__status", "timeout");
        }, 10000);
        window.addEventListener("message", response => {
          if (response && response.data && typeof response.data.ack == "boolean") {
            if (response.data.ack) {
              log("verify__activate__status", "success");
            } else {
              log("verify__activate__status", "error");
            }
            log("verify__activate__status", JSON.stringify(response));
            hasABPResponded = true;
          }
        });
        window.postMessage({
          command: "payment_success",
          userId: userid,
          version: 1,
        });
        log("verify__activate__status", "sent");
      }
    });
    log("verify__code__status", "sent");
  });

  //////////////////////////////////////////////////////////////////////////////
  // Cancel flow
  //////////////////////////////////////////////////////////////////////////////

  append(create([
    ["cancel__heading", "h2", { textContent: "Cancel flow" }],
  ]));

  // Shared between 2. Submit code and 3. Submit cancel below
  let paymentInfo;

  // 1. Submit license /////////////////////////////////////////////////////////

  append(create([
    ["cancel__license__heading", "h3", { textContent: "1. Submit license" }],
    ["cancel__license__paragraph", "p", { innerHTML: "Find your license in the <a href='https://adblock-premium-support.pages.dev/'>support app</a> or the query parameters of the manage subscription link in the extensions options page." }],
    ["cancel__license__input", "input", { placeholder: "License" }],
    ["cancel__license__submit", "button", { textContent: "Submit license" }],
    ["cancel__license__status", "textarea", { disabled: true }],
  ]))

  dom.cancel__license__submit.addEventListener("click", event => {
    event.preventDefault();
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "manage_subscription",
        action: "send_email",
        license: dom.cancel__license__input.value,
        testmode: isTestmode,
      })
    })
    .then(response => response.json())
    .then(response => {
      log("cancel__license__status", JSON.stringify(response));
      if (false == response.licenseSetupComplete) {
        log("cancel__license__status", "error");
      } else if (response.email) {
        log("cancel__license__status", "success")
      }
    });
    log("cancel__license__status", "sent");
  });

  // 2. Submit code ////////////////////////////////////////////////////////////

  append(create([
    ["cancel__code__heading", "h3", { textContent: "2. Submit code" }],
    ["cancel__code__paragraph", "p", { textContent: "Find the code in your email." }],
    ["cancel__code__input", "input", { placeholder: "Code" }],
    ["cancel__code__submit", "button", { textContent: "Submit code" }],
    ["cancel__code__status", "textarea", { disabled: true }],
  ]));

  dom.cancel__code__submit.addEventListener("click", event => {
    event.preventDefault();
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "manage_subscription",
        action: "get_info",
        license: dom.cancel__license__input.value,
        token: dom.cancel__code__input.value,
        testmode: isTestmode,
      })
    })
    .then(response => response.json())
    .then(response => {
      log("cancel__code__status", JSON.stringify(response));
      if (response.paymentInfo) {
        paymentInfo = response.paymentInfo;
        log("cancel__code__status", "success");
        if (response.paymentInfo.cancelled) {
          log("cancel__code__status", "cancelled");
        }
      } else {
        log("cancel__code__status", "error");
      }
    });
    log("cancel__code__status", "sent");
  });

  // 3. Submit cancel //////////////////////////////////////////////////////////

  append(create([
    ["cancel__cancel__heading", "h3", { textContent: "3. Cancel" }],
    ["cancel__cancel__submit", "button", { textContent: "Cancel" }],
    ["cancel__cancel__status", "textarea", { disabled: true }],
  ]))

  dom.cancel__cancel__submit.addEventListener("click", event => {
    event.preventDefault();
    fetch("https://myadblock.licensing.adblockplus.dev/license/api/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cmd: "manage_subscription",
        action: "cancel",
        license: dom.cancel__license__input.value,
        token: dom.cancel__code__input.value,
        transactionId: paymentInfo.subscriptionId,
        processor: paymentInfo.processor,
        testmode: isTestmode,
      })
    })
    .then(response => response.json())
    .then(response => {
      log("cancel__cancel__status", JSON.stringify(response));
      if (response.success) {
        log("cancel__cancel__status", "success");
      } else {
        log("cancel__cancel__status", "error");
      }
    });
    log("cancel__cancel__status", "sent");
  });

  document.body.prepend(parent);

}

const paddleLoading = setInterval(() => {
  if (typeof Paddle != "undefined") {
    clearInterval(paddleLoading);
    onPaddleLoaded();
  }
}, 100);