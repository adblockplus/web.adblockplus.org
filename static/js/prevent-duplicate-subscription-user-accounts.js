// requires includes/prevent-duplicate-subscription.templ
// requires static/css/prevent-duplicate-subscription.css

// This component overlays the Paddle checkout overlay after the user submits
// their email address and before the users submits their card details. It uses
// the user's email address to determine whether they already have an active
// Premium subscirption and shows them instructions to activate Premium instead
// of purchasing another Premium subscription if they do.

// CAUTION: This feature only supports one inline checkout per page

const paddleEnvironment = location.hostname == "localhost" ? "test"
  : location.hostname.endsWith(".web.app") ? "test"
  : adblock.query.has("testmode") ? "test" : "live";

const USER_ACCOUNTS_DOMAIN = paddleEnvironment === "live" ? "https://myaccount.adblockplus.org/" : "https://abp.ua-qa.eyeo.it/";

const apiEndpoint = paddleEnvironment === "live" ? "https://api.ua.eyeo.it/" : "https://api.ua-qa.eyeo.it/";
const hasSubscriptionEndpoint = `${apiEndpoint}v1/subscriptions/abp/has-active`;
const maximumInterventionDelay = 10000;

const interventionOverlay = document.getElementById("account-restore");
const restoreAccountButton = document.getElementById("account-restore-found-buttons__restore");
const interventionCloseButton = document.getElementById("account-restore-found__close");

function showSubscriptionFinding() {
  document.documentElement.dataset.account = "finding";
}

function showSubscriptionFound(email) {
  let emailParam = "";

  if (email) {
    const param = new URLSearchParams({email});
    emailParam = `&${param}`;
  }

  restoreAccountButton.href = `${USER_ACCOUNTS_DOMAIN}?premium=false&s=abp-w${emailParam}`;
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

  // Check that we have a valid customer ID
  if (typeof data.customer.id !== "string") return;

  // if the checkout is not inline then we need to move it to the bottom of the
  // DOM so that it can overlay Paddle's overlay
  if (data?.settings?.display_mode != "inline") {
    document.body.appendChild(interventionOverlay);
  }

  showSubscriptionFinding();

  let serviceResponded = false;

  setTimeout(() => {
    if (serviceResponded) return;
    finishIntervention();
    adblock.logServiceError("prevent-duplicate-subscription", {reason: "timeout"});
  }, maximumInterventionDelay);

  let response;

  const customerId = data.customer.id;
  const url = `${hasSubscriptionEndpoint}?customerId=${customerId}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Application-ID": "255aedf9e8ae7054977dd7c68acddf79"
    }
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
      if (result.hasActiveSubscription) {
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
if (adblock.query.has("has-subscription")) {
  const result = adblock.query.get("has-subscription");
  const realFetch = window.fetch;
  window.fetch = function(url, options) {
    if (!url.startsWith(hasSubscriptionEndpoint)) return realFetch(url, options);
    if (result == "yes") {
      return new Promise(resolve => setTimeout(
        () => resolve({ok: true, json: () => new Promise(resolve => resolve({hasActiveSubscription:true}))}),
        1000
      ));
    } else if (result == "no") {
      return new Promise(resolve => setTimeout(
        () => resolve({ok: true, json: () => new Promise(resolve => resolve({hasActiveSubscription:false}))}),
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
