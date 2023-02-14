/* global eyeo */
(function(doc, _, ns, i18n){

var queryParameters = new URLSearchParams(window.location.search);

var stripeConfig = {
  providers: ["visa", "mastercard", "amex"],
  live: {
    key: "pk_live_Nlfxy49RuJeHqF1XOAtUPUXg00fH7wpfXs",
    endpoint: "https://donation.adblock-org.workers.dev/"
  },
  test: {
    key: "pk_test_qZJPIgNMdOMferLFulcfPvXO007x2ggldN",
    endpoint: "https://donation-staging.adblock-org.workers.dev"
  }
}

var paypalConfig = {
  live: {
    business: "till@adblockplus.org",
    action: "https://www.paypal.com/cgi-bin/webscr"
  },
  test: {
    business: "abp-sandbox@adblockplus.org",
    action: "https://www.sandbox.paypal.com/cgi-bin/webscr"
  }
}

var paymentEnvironment = queryParameters.get('mode');

if (paymentEnvironment && (!stripeConfig[paymentEnvironment || !paypalConfig[paymentEnvironment]]))
  alert('Invalid payment mode: ' + mode);

if (!paymentEnvironment) {
  paymentEnvironment = (
    window.location.hostname == "adblockplus.org"
    || window.location.hostname.endsWith(".adblockplus.org")
  ) ? "live" : "test";
}

var defaultTrackingID = "X0G0 FEOWSI unknown";

var session;

function onDOMReady()
{
  session = ns.getSession();

  var script = doc.createElement("script");
  script.onload = onConfigLoad;
  script.onerror = onConfigLoad;
  
  var URLParams = new URLSearchParams(location.search);
  
  var report = new URLSearchParams({
    an: URLParams.get('an'), // addon name
    av: URLParams.get('av'), // addon version
    ap: URLParams.get('ap'), // browser name
    apv: URLParams.get('apv'), // browser version
    p: URLParams.get('p'), // engine name
    pv: URLParams.get('pv'), // engine version
    bl: doc.documentElement.lang, // browser language
    cid: session.slice(2,3), // payment page id
    sid: session // payment session id
  }).toString();
  
  script.src = "/js/payment/config/load.js?" + report;
  doc.body.appendChild(script);
}

var form;

var stripeCardModal;

function onConfigLoad()
{
  document.documentElement.classList.add("payment-form-loaded");
  
  form = ns.setupForm(ns.config);
  form.onSubmit(onFormSubmit);

  stripeCardModal = ns.setupStripeCardModal({
    key: stripeConfig[paymentEnvironment].key,
    endpoint: stripeConfig[paymentEnvironment].endpoint,
    supportedCardBrands: stripeConfig.providers
  });
  stripeCardModal.onSubmit(onStripeConfirm);

  eyeo.beacon({
    paymentSetup: true,
    paymentSetupTime: parseInt(performance.now(), 10),
  });

  eyeo.log("payment_setup", {
    session: session,
    referrer: queryParameters.get('an')
  });
}

var hasIntendedPayment = false;

function onFormSubmit(data)
{
  if (!hasIntendedPayment) {
    hasIntendedPayment = true;
    eyeo.beacon({
      paymentIntended: true,
      paymentIntendedTime: parseInt(performance.now(), 10)
    });
  }

  eyeo.log("payment_intention", {
    currency: data.currency,
    frequency: data.frequency,
    amount: data.amount,
    provider: data.provider
  });

  // Storing information to be consumed by optimizely and hotjar experiments
  if (ns.shouldStoreContributionInfo) {
    localStorage.setItem("contributionInfo", JSON.stringify({
      "amount": data.amount,
      "frequency": data.frequency,
      "processor": data.provider,
      "currency": data.currency,
      "lang": doc.documentElement.lang,
      "source": ns.sourceId || "U",
      "clickTs": Date.now()
    }));
  }

  data.custom = session;

  if (data.provider == "paypal")
    onPayPalIntent(data);
  else
    onStripeIntent(data);
}

function onPayPalIntent(data)
{
  data.item_number = defaultTrackingID; // payment-server tracking string

  if (data.frequency == "once")
    ns.paypalButtonPayment(paypalConfig[paymentEnvironment], data);
  else
    ns.paypalButtonSubscription(paypalConfig[paymentEnvironment], data);
}

function onStripeIntent(data)
{
  stripeCardModal.show(data);
}

function onStripeConfirm()
{
  var data = _.extend(
    {custom: session},
    form.data("stripe"),
    stripeCardModal.data()    
  );

  switch (data.frequency) {
    case "once":
      data.type = "donation";
      break;
    case "monthly":
      data.type = "monthly-subscription";
      break;
    case "yearly":
      data.type = "yearly-subscription";
      break;
  }

  var payment;

  if (data.frequency == "once")
    payment = ns.stripeCardPayment(data);
  else
    payment = ns.stripeCardSubscription(data);
  
  return payment
  .then(onStripeComplete)
  .catch(onStripeError)
}

function onStripeComplete()
{
  var params = new URLSearchParams({
    pp: "stripe", // payment processor
    sid: session // session id
  });

  window.location.href = window.location.origin + ns.paymentCompleteUrl + "?" + params.toString();
}

function onStripeError(error)
{
  var message = i18n["error_unexpected"];

  if (typeof error == "object")
    if (error.code && i18n["error_" + error.code])
      message = i18n["error_" + error.code];
    else if (error.status == 402)
      message = i18n["error_declined"];
    else if (typeof error.message == "string" && error.message.length)
      message = error.message;
  
  stripeCardModal.showError(message);
}

if (
  doc.readyState === "complete" 
  || doc.readyState === "loaded" 
  || doc.readyState === "interactive"
) {
  onDOMReady();
} else {
  doc.addEventListener("DOMContentLoaded", onDOMReady);
}

})(document, _, path("payment"), path("i18n.payment.stripe.cardModal"));