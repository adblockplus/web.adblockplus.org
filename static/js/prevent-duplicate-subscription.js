// requires includes/prevent-duplicate-subscription.templ
// requires static/css/prevent-duplicate-subscription.css
import { checkoutEvents } from "../modules/paddle.js";

// This component overlays the Paddle checkout overlay after the user submits
// their email address and before the users submits their card details. It uses
// the user's email address to determine whether they already have an active
// Premium subscirption and shows them instructions to activate Premium instead 
// of purchasing another Premium subscription if they do.

const hasSubscriptionEndpoint = "https://abp-payments.ey.r.appspot.com/user/has_active_premium_subscription";
const maximumInterventionDelay = 5000;

const interventionOverlay = document.getElementById("account-restore");
const restoreAccountButton = document.getElementById("account-restore-found-buttons__restore");
const interventionCloseButton = document.getElementById("account-restore-found__close");
 
// Fake hasSubscriptionEndpoint responses via URL params
//
// has-subscription-response=
//    yes - The user has an active subscription
//    no - The user does not have an active subscription
//    error - The API returns an error
//    timeout - The API never responds
if (adblock.query.has("has-subscription-response")) {
  const realFetch = window.fetch;
  window.fetch = function(url, options) {
    if (url != hasSubscriptionEndpoint) return realFetch(url, options);
    const result = adblock.query.get("has-subscription-response");
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
    }
  }
}

function startIntervention() {
  // Moving overlay below the Paddle iframe in the DOM so that it can
  // display on top of the Paddle iframe which also has the maximum z-index
  document.body.appendChild(interventionOverlay);
}

function showInterventionLoading() {
  document.documentElement.classList.add("--finding-account");
}

function showSubscriptionFound(email) {
  const urlParams = new URLSearchParams({email});
  restoreAccountButton.href = `/${document.documentElement.lang}/restore-purchase?${urlParams.toString()}`;
  document.documentElement.classList.remove("--finding-account");
  document.documentElement.classList.add("--found-account");
}

function finishIntervention(closePaddle) {
  document.documentElement.classList.remove("--finding-account", "--found-account");
  if (closePaddle) Paddle.Checkout.close();
}

interventionCloseButton.addEventListener("click", () => finishIntervention(true));

/** 
 * @param {object} event - Paddle checkout overlay event
 * @see https://developer.paddle.com/paddlejs/events/overview#attributes
 */
function preventDuplicateSubscription(event) {

  startIntervention();
  showInterventionLoading();

  let finished = false;

  setTimeout(() => {
    if (finished) return;
    finishIntervention(false);
    adblock.logServiceError("prevent-duplicate-subscription", {reason: "timeout"});
  }, maximumInterventionDelay);

  let response;

  fetch(hasSubscriptionEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      livemode: !adblock.query.has("testmode"),
      email: event.customer.email,
    })
  })
  .then((_response) => {
    finished = true;
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
        adblock.log("prevented-duplicate-subscription");
        return showSubscriptionFound(event.customer.email);
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

checkoutEvents.on("checkout.customer.created", preventDuplicateSubscription);
checkoutEvents.on("checkout.customer.updated", preventDuplicateSubscription);