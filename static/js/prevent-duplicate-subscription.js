// requires includes/prevent-duplicate-subscription.templ
// requires static/css/prevent-duplicate-subscription.css

// This component overlays the Paddle checkout overlay after the user submits
// their email address and before the users submits their card details. It uses
// the user's email address to determine whether they already have an active
// Premium subscirption and shows them instructions to activate Premium instead
// of purchasing another Premium subscription if they do.

// CAUTION: This feature only supports one inline checkout per page

const hasSubscriptionEndpoint = "https://abp-payments.ey.r.appspot.com/user/has_active_premium_subscription";
const maximumInterventionDelay = 5000;

const interventionOverlay = document.getElementById("account-restore");
const restoreAccountButton = document.getElementById("account-restore-found-buttons__restore");
const interventionCloseButton = document.getElementById("account-restore-found__close");

function showSubscirptionFinding() {
  document.documentElement.dataset.account = "finding";
}

function showSubscriptionFound(email) {
  const urlParams = new URLSearchParams({email});
  restoreAccountButton.href = `/${document.documentElement.lang}/restore-purchase?${urlParams.toString()}`;
  document.documentElement.dataset.account = "found";
  const paddleIframe = document.querySelector(".paddle-frame-inline");
  if (paddleIframe) paddleIframe.hidden = true;
}

function finishIntervention() {
  document.documentElement.dataset.account = "not-found";
}

interventionCloseButton.addEventListener("click", () => {
  finishIntervention();
  Paddle.Checkout.close();
});

let preventionLogged = false;

/**
 * @param {object} data - Paddle checkout overlay event data
 * @see https://developer.paddle.com/paddlejs/events/overview#attributes
 */
function preventDuplicateSubscription(data) {

  if (data.status == "past_due") return;

  // Sometimes the checkout.customer.updated event can fire when filling
  // out the inline form before a valid email address has been entered.
  if (typeof data.customer.email !== "string") return;

  // if the checkout is not inline then we need to move it to the bottom of the
  // DOM so that it can overlay Paddle's overlay
  if (data?.settings?.display_mode != "inline") {
    document.body.appendChild(interventionOverlay);
  }

  showSubscirptionFinding();

  let serviceResponded = false;

  setTimeout(() => {
    if (serviceResponded) return;
    finishIntervention();
    adblock.logServiceError("prevent-duplicate-subscription", {reason: "timeout"});
  }, maximumInterventionDelay);

  let response;

  fetch(hasSubscriptionEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      livemode: !adblock.query.has("testmode"),
      email: data.customer.email,
    })
  })
  .then((_response) => {
    serviceResponded = true;
    response = _response;
    if (response.ok) {
      return response.json();
    } else {
      return response.text();
    }
  })
  .then((result) => {
    if (response.ok) {
      if (result.has_active_premium_sub) {
        if (preventionLogged == false) {
          preventionLogged = true;
          adblock.log("prevented-duplicate-subscription");
        }
        return showSubscriptionFound(data.customer.email);
      }
    } else {
      adblock.logServiceError("prevent-duplicate-subscription", {
        reason: "response",
        status: response.status,
        response: result
      });
    }
    finishIntervention();
  })
  .catch((error) => {
    adblock.logScriptError("prevent-duplicate-subscription", error);
    finishIntervention();
  });

}

adblock.on("checkout.customer.created", preventDuplicateSubscription);
adblock.on("checkout.customer.updated", preventDuplicateSubscription);

adblock.on("checkout.loaded", data => {
  if (data.settings.display_mode != "inline") return;
  document.querySelector(".paddle-frame-inline").after(interventionOverlay);
});

// Fake hasSubscriptionEndpoint responses via URL params
//
// has-subscription=
//    yes - The user has an active subscription
//    no - The user does not have an active subscription
//    error - The API returns an error
//    timeout - The API never responds
//    checking - Force the checking subscirption state
if (adblock.query.has("has-subscription")) {
  const result = adblock.query.get("has-subscription");
  if (result == "finding") {
    adblock.onceAfter("checkout.loaded", showSubscirptionFinding);
  } else if (result == "found") {
    console.log("showing subscription found");
    adblock.onceAfter("checkout.loaded", () => {
      showSubscriptionFound(adblock.query.get("email") || "help@adblockplus.org")
    });
  } else {
    const realFetch = window.fetch;
    window.fetch = function(url, options) {
      if (url != hasSubscriptionEndpoint) return realFetch(url, options);
      if (result == "yes") {
        return new Promise(resolve => setTimeout(
          () => resolve({ok: true, json: () => new Promise(resolve => resolve({has_active_premium_sub:true}))}),
          1000
        ));
      } else if (result == "no") {
        return new Promise(resolve => setTimeout(
          () => resolve({ok: true, json: () => new Promise(resolve => resolve({has_active_premium_sub:false}))}),
          1000
        ));
      } else if (result == "error") {
        return new Promise(resolve => setTimeout(
          () => resolve({ok: false, status: 500, text: () => new Promise(resolve => resolve("something bad happened"))}),
          1000
        ));
      } else if (result == "timeout") {
        return new Promise();
      } else {
        return realFetch(url, options);
      }
    }
  }
}
