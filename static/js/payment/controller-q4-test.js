/* global eyeo */
(function(doc, _, ns, i18n){

var siteURL = doc.documentElement.getAttribute("data-siteurl") 
  || "https://adblockplus.org"; 

// May be overriden by setting ns.stripeAPIConfig
var stripeConfig = {
  supportedCardBrands: ["visa", "mastercard", "amex"],
  apiConfig: ns.stripeAPIConfig || {
    test: {
      key: "pk_test_qZJPIgNMdOMferLFulcfPvXO007x2ggldN",
      endpoint: "https://donation-staging.adblock-org.workers.dev"
    },
    live: {
      key: "pk_live_Nlfxy49RuJeHqF1XOAtUPUXg00fH7wpfXs",
      endpoint: "https://donation.adblock-org.workers.dev/"
    }
  }
}

var stripeAPIConfig = stripeConfig.apiConfig;

var stripeEnv = (
  window.location.hostname == "adblockplus.org" 
  || window.location.hostname.endsWith(".adblockplus.org")
) ? "live" : "test";

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
    key: stripeAPIConfig[stripeEnv].key,
    endpoint: stripeAPIConfig[stripeEnv].endpoint,
    supportedCardBrands: stripeConfig.supportedCardBrands
  });
  stripeCardModal.onSubmit(onStripeConfirm);
}

function onFormSubmit(data)
{
  data.custom = session;
  data.tracking = recordTracking();

  if (data.provider == "paypal")
    onPayPalIntent(data);
  else
    onStripeIntent(data);
}

function onPayPalIntent(data)
{
  if (data.frequency == "once")
    ns.paypalButtonPayment(data);
  else
    ns.paypalButtonSubscription(data);
}

function onStripeIntent(data)
{
  stripeCardModal.show(data);
}

function onStripeConfirm()
{
  var data = _.extend(
    {custom: session, tracking: recordTracking() },
    form.data(),
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

  window.location.href = siteURL + "/payment-complete?" + params.toString();
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